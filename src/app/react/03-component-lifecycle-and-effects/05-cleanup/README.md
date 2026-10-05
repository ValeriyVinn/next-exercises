# React — Component Lifecycle and Effects

## 05. Cleanup

---

# 1. Що таке Cleanup

**Cleanup function** — це функція, яку повертає `useEffect()` для очищення того, що Effect створив або підключив.

Базовий синтаксис:

    useEffect(() => {
        // setup

        return () => {
            // cleanup
        };
    }, []);

Ментальна модель:

    Effect
      ↓
    setup
      ↓
    external resource
      ↓
    cleanup

Наприклад:

    setup:
    addEventListener()

    cleanup:
    removeEventListener()

---

# 2. Навіщо потрібен Cleanup

Effect може створювати або підключати ресурси:

- `setInterval()`;
- `setTimeout()`;
- `addEventListener()`;
- subscriptions;
- WebSocket connections;
- API subscriptions;
- timers;
- сторонні бібліотеки;
- DOM observers;
- media listeners;
- зовнішні connections.

Коли цей ресурс більше не потрібний, його потрібно прибрати.

Наприклад:

    useEffect(() => {
        const timerId = setInterval(() => {
            console.log("Tick");
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

Тут:

    setInterval()
        ↓
    створив timer

    clearInterval()
        ↓
    знищив timer

---

# 3. Setup → Cleanup

Найважливіша модель:

    setup
      ↓
    resource active
      ↓
    cleanup

Наприклад:

    addEventListener()
      ↓
    listener active
      ↓
    removeEventListener()

Або:

    connect()
      ↓
    connection active
      ↓
    disconnect()

Або:

    subscribe()
      ↓
    subscription active
      ↓
    unsubscribe()

---

# 4. Cleanup — це не "очистити React state"

Дуже важливо:

**Cleanup не призначений для очищення state компонента.**

Наприклад:

    return () => {
        setCount(0);
    };

це не типовий спосіб використання cleanup.

Cleanup потрібен для:

> **припинення або скасування зовнішньої роботи, яку Effect запустив.**

---

# 5. Коли виконується Cleanup

Cleanup виконується у двох основних ситуаціях.

## 5.1. Перед повторним запуском Effect

Якщо dependency змінилася:

    old dependency
          ↓
    cleanup old Effect
          ↓
    setup new Effect

---

## 5.2. При unmount компонента

Коли компонент видаляється з React tree:

    component
       ↓
    unmount
       ↓
    cleanup

---

# 6. Основна схема

Для Effect із dependencies:

    render
      ↓
    commit
      ↓
    setup

Потім dependency змінюється:

    render
      ↓
    commit
      ↓
    cleanup
      ↓
    setup

При unmount:

    unmount
      ↓
    cleanup

---

# 7. Простий приклад

    useEffect(() => {
        console.log("Setup");

        return () => {
            console.log("Cleanup");
        };
    }, []);

Концептуально:

    mount
      ↓
    Setup

    ...

    unmount
      ↓
    Cleanup

У development `StrictMode` також може додатково показати:

    Setup
      ↓
    Cleanup
      ↓
    Setup

Це нормальна development-перевірка.

---

# 8. Cleanup з timer

Один із найпростіших прикладів.

    useEffect(() => {
        const timerId = setInterval(() => {
            console.log("Tick");
        }, 1000);

        return () => {
            clearInterval(timerId);
        };
    }, []);

Що відбувається:

    Effect starts
        ↓
    setInterval()
        ↓
    timer працює
        ↓
    component unmount
        ↓
    clearInterval()
        ↓
    timer stopped

---

# 9. Чому timer потрібно очищати

Без cleanup:

    useEffect(() => {
        setInterval(() => {
            console.log("Tick");
        }, 1000);
    }, []);

може залишитися активний timer.

Якщо компонент зник:

    Component
       ↓
    unmount

але timer продовжує працювати:

    timer
       ↓
    console.log()
    console.log()
    console.log()

Компонента вже немає, а зовнішня робота продовжується.

---

# 10. Cleanup з setTimeout

Cleanup працює також із `setTimeout()`.

    useEffect(() => {
        const timerId = setTimeout(() => {
            console.log("Hello");
        }, 3000);

        return () => {
            clearTimeout(timerId);
        };
    }, []);

Якщо компонент unmount відбудеться раніше:

    component unmount
          ↓
    clearTimeout()
          ↓
    callback не виконується

---

# 11. Cleanup з event listener

Наприклад:

    useEffect(() => {
        function handleResize() {
            console.log(window.innerWidth);
        }

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );
        };
    }, []);

Setup:

    addEventListener()

Cleanup:

    removeEventListener()

---

# 12. Дуже важливий момент з event listener

Cleanup повинен передати **ту саму function reference**, яка була передана під час setup.

Правильно:

    useEffect(() => {
        function handleResize() {
            console.log(window.innerWidth);
        }

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );
        };
    }, []);

Тут:

    handleResize

має ту саму reference для:

    addEventListener()

і:

    removeEventListener()

---

# 13. Поганий варіант event listener

Не варто писати:

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => {
                console.log(window.innerWidth);
            }
        );

        return () => {
            window.removeEventListener(
                "resize",
                () => {
                    console.log(window.innerWidth);
                }
            );
        };
    }, []);

Це дві різні anonymous functions.

Умовно:

    function #1
        ↓
    addEventListener()

    function #2
        ↓
    removeEventListener()

Вони не є тією самою reference.

---

# 14. Правильний шаблон для listener

Використовуй named function:

    useEffect(() => {
        function handleResize() {
            console.log(window.innerWidth);
        }

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );
        };
    }, []);

Модель:

    handleResize
        ↓
    add
        ↓
    listener active
        ↓
    remove
        ↓
    listener gone

---

# 15. Cleanup з subscription

Уявімо API:

    subscribeToMessages()

який повертає:

    unsubscribe()

Тоді:

    useEffect(() => {
        const unsubscribe = subscribeToMessages(
            message => {
                console.log(message);
            }
        );

        return () => {
            unsubscribe();
        };
    }, []);

Модель:

    subscribe
       ↓
    receive messages
       ↓
    unsubscribe

---

# 16. Cleanup з WebSocket

Наприклад:

    useEffect(() => {
        const socket = new WebSocket(
            "wss://example.com/socket"
        );

        socket.onmessage = event => {
            console.log(event.data);
        };

        return () => {
            socket.close();
        };
    }, []);

Setup:

    new WebSocket()

Cleanup:

    socket.close()

---

# 17. WebSocket з dependency

Наприклад, чат залежить від:

    roomId

Тоді:

    useEffect(() => {
        const socket = new WebSocket(
            `wss://example.com/rooms/${roomId}`
        );

        return () => {
            socket.close();
        };
    }, [roomId]);

Якщо:

    roomId = "general"

підключається:

    general

Якщо:

    roomId = "react"

React спочатку виконує:

    close general

потім:

    connect react

---

# 18. Cleanup при зміні dependency

Це одна з найважливіших речей у цій темі.

Розглянемо:

    useEffect(() => {
        const connection = connect(roomId);

        return () => {
            connection.disconnect();
        };
    }, [roomId]);

Спочатку:

    roomId = "general"

    setup
      ↓
    connect("general")

Потім:

    roomId = "react"

    cleanup
      ↓
    disconnect("general")

    setup
      ↓
    connect("react")

---

# 19. Cleanup працює зі старим Effect

Це важливий момент.

Якщо dependency змінилася:

    old Effect
        ↓
    cleanup old Effect
        ↓
    new Effect

Cleanup закриває ресурс, який був створений старим setup.

Наприклад:

    roomId = "general"

    const connection =
        connect("general");

Cleanup має доступ до:

    connection

який був створений саме для `"general"`.

---

# 20. Closure і Cleanup

Cleanup є closure.

Наприклад:

    useEffect(() => {
        const connection = connect(roomId);

        return () => {
            connection.disconnect();
        };
    }, [roomId]);

Cleanup "пам'ятає":

    connection

з конкретного render/effect setup.

Тому cleanup може правильно закрити старий ресурс.

---

# 21. Cleanup і dependency sequence

Уявімо:

    roomId = "A"

Перший setup:

    connect("A")

Потім:

    roomId = "B"

React робить:

    disconnect("A")
        ↓
    connect("B")

Потім:

    roomId = "C"

React робить:

    disconnect("B")
        ↓
    connect("C")

Потім component unmount:

    disconnect("C")

---

# 22. Повний lifecycle Effect

Можна записати:

    setup A
       ↓
    cleanup A
       ↓
    setup B
       ↓
    cleanup B
       ↓
    setup C
       ↓
    cleanup C

Cleanup завжди відноситься до попереднього setup.

---

# 23. Cleanup при unmount

Наприклад:

    function ChatRoom() {
        useEffect(() => {
            const connection = connect();

            return () => {
                connection.disconnect();
            };
        }, []);

        return <h1>Chat</h1>;
    }

Коли компонент існує:

    connection active

Коли компонент видаляється:

    unmount
       ↓
    cleanup
       ↓
    disconnect()

---

# 24. Conditional rendering і Cleanup

Наприклад:

    function App() {
        const [showChat, setShowChat] = useState(true);

        return (
            <>
                <button
                    onClick={() => setShowChat(false)}
                >
                    Close
                </button>

                {showChat && <ChatRoom />}
            </>
        );
    }

Коли:

    showChat = true

`ChatRoom` mounted.

Коли:

    showChat = false

`ChatRoom` unmounted.

Отже:

    ChatRoom
       ↓
    unmount
       ↓
    cleanup

---

# 25. Cleanup при зміні key

Зміна `key` може створити нову component identity.

Наприклад:

    <ChatRoom key={roomId} />

Якщо:

    roomId = "general"

потім:

    roomId = "react"

React може розглядати це як:

    old ChatRoom
        ↓
    unmount
        ↓
    cleanup

і:

    new ChatRoom
        ↓
    mount
        ↓
    setup

Це відрізняється від звичайної зміни dependency всередині того самого компонента.

---

# 26. Cleanup при dependency change vs unmount

### Dependency change

    same component instance
          ↓
    cleanup old Effect
          ↓
    setup new Effect

### Unmount

    component instance removed
          ↓
    cleanup
          ↓
    component gone

---

# 27. Cleanup не виконується після кожного render

Це важливо.

Якщо:

    useEffect(() => {
        return () => {
            console.log("cleanup");
        };
    }, [count]);

і:

    count

не змінився, звичайний rerender не означає:

    cleanup
      ↓
    setup

Cleanup + setup пов'язані з повторним запуском конкретного Effect, а не з кожним render.

---

# 28. Без dependency array

Якщо:

    useEffect(() => {
        console.log("setup");

        return () => {
            console.log("cleanup");
        };
    });

Effect виконується після кожного commit.

Тому перед наступним Effect setup React виконує попередній cleanup.

Умовно:

    render
      ↓
    commit
      ↓
    setup

Наступний update:

    render
      ↓
    commit
      ↓
    cleanup
      ↓
    setup

---

# 29. Cleanup не означає "component unmount"

Це дуже важлива відмінність.

Наприклад:

    useEffect(() => {
        const connection = connect(roomId);

        return () => {
            connection.disconnect();
        };
    }, [roomId]);

Cleanup може виконатися через:

    roomId changed

ще до того, як компонент unmount.

Тому:

> Cleanup Effect ≠ component unmount.

---

# 30. Effect cleanup vs component unmount

Компонент:

    mount
      ↓
    update
      ↓
    update
      ↓
    unmount

Effect:

    setup
      ↓
    cleanup
      ↓
    setup
      ↓
    cleanup
      ↓
    setup
      ↓
    cleanup

Effect може мати багато циклів setup/cleanup протягом життя одного компонента.

---

# 31. Cleanup і StrictMode

У development `StrictMode` React може перевірити Effect приблизно так:

    setup
      ↓
    cleanup
      ↓
    setup

Це допомагає виявити Effects, які неправильно керують зовнішніми ресурсами.

Наприклад:

    useEffect(() => {
        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );
        };
    }, []);

Правильний cleanup дозволяє безпечно пройти цю перевірку.

---

# 32. Чому StrictMode корисний для Cleanup

Якщо немає cleanup:

    setup
      ↓
    listener added

StrictMode може показати проблему:

    setup
      ↓
    setup

і listener може бути підключений повторно.

Якщо є cleanup:

    setup
      ↓
    cleanup
      ↓
    setup

ресурс залишається правильно керованим.

---

# 33. Правило "Mirror"

Корисна ментальна модель:

> Cleanup повинен бути логічним дзеркалом setup.

Наприклад:

    setup:
    addEventListener()

    cleanup:
    removeEventListener()

---

    setup:
    setInterval()

    cleanup:
    clearInterval()

---

    setup:
    connect()

    cleanup:
    disconnect()

---

    setup:
    subscribe()

    cleanup:
    unsubscribe()

---

    setup:
    createObserver()

    cleanup:
    disconnectObserver()

---

# 34. Resource ownership

Effect можна розглядати як власника ресурсу.

Наприклад:

    Effect
      ↓
    створює subscription
      ↓
    Effect відповідає за cleanup

Тобто:

> Якщо Effect створив зовнішній ресурс, він повинен знати, як його правильно звільнити.

---

# 35. Cleanup як "release resource"

Можна мислити:

    acquire resource
          ↓
    use resource
          ↓
    release resource

У React:

    useEffect
       ↓
    acquire
       ↓
    external resource
       ↓
    cleanup
       ↓
    release

---

# 36. Cleanup і memory leaks

Якщо зовнішній ресурс продовжує існувати після того, як він більше не потрібен, це може призвести до:

- зайвого використання пам'яті;
- зайвих listeners;
- зайвих timers;
- зайвих connections;
- дублювання subscriptions;
- зайвої роботи CPU;
- неочікуваних callbacks.

Тому cleanup — важлива частина управління ресурсами.

---

# 37. Event listener без cleanup

Погано:

    useEffect(() => {
        window.addEventListener(
            "scroll",
            handleScroll
        );
    }, []);

Якщо component lifecycle або Effect lifecycle призводить до повторного setup, можуть накопичуватися listeners.

Краще:

    useEffect(() => {
        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

---

# 38. Timer без cleanup

Погано:

    useEffect(() => {
        const id = setInterval(() => {
            console.log("tick");
        }, 1000);
    }, []);

Краще:

    useEffect(() => {
        const id = setInterval(() => {
            console.log("tick");
        }, 1000);

        return () => {
            clearInterval(id);
        };
    }, []);

---

# 39. Subscription без cleanup

Погано:

    useEffect(() => {
        subscribe(handleMessage);
    }, []);

Краще:

    useEffect(() => {
        const unsubscribe =
            subscribe(handleMessage);

        return () => {
            unsubscribe();
        };
    }, []);

---

# 40. WebSocket без cleanup

Погано:

    useEffect(() => {
        const socket = new WebSocket(url);

        socket.onmessage = handleMessage;
    }, [url]);

Краще:

    useEffect(() => {
        const socket = new WebSocket(url);

        socket.onmessage = handleMessage;

        return () => {
            socket.close();
        };
    }, [url]);

---

# 41. Cleanup для fetch

Для `fetch()` cleanup має іншу форму.

Сам Promise не має:

    unsubscribe()

Але можна використовувати:

    AbortController

Наприклад:

    useEffect(() => {
        const controller = new AbortController();

        fetch("/api/users", {
            signal: controller.signal
        })
            .then(response => response.json())
            .then(data => {
                setUsers(data);
            })
            .catch(error => {
                if (error.name !== "AbortError") {
                    console.error(error);
                }
            });

        return () => {
            controller.abort();
        };
    }, []);

Модель:

    fetch
      ↓
    request active
      ↓
    cleanup
      ↓
    abort()

---

# 42. Fetch і dependency

Наприклад:

    useEffect(() => {
        const controller = new AbortController();

        fetch(`/api/users/${userId}`, {
            signal: controller.signal
        })
            .then(response => response.json())
            .then(data => {
                setUser(data);
            });

        return () => {
            controller.abort();
        };
    }, [userId]);

Якщо:

    userId = 1

починається:

    request 1

Якщо до завершення запиту:

    userId = 2

React робить:

    abort request 1
          ↓
    request 2

Це хороший приклад зв'язку:

    dependency
        +
    cleanup
        +
    external request

---

# 43. Cleanup і race conditions

Cleanup може допомогти уникати ситуацій, коли старий asynchronous operation повертає результат після того, як dependency вже змінилася.

Наприклад:

    userId = 1
        ↓
    request A

Потім:

    userId = 2
        ↓
    request B

Якщо A завершується після B, його результат може бути вже неактуальним.

Abort:

    cleanup A
        ↓
    abort A

допомагає припинити стару operation.

---

# 44. Cleanup не завжди може "скасувати" async operation

Не кожну асинхронну операцію можна фізично скасувати.

Наприклад, деякі Promise вже неможливо зупинити.

У таких випадках можна використовувати:

- `AbortController`, якщо API підтримує cancellation;
- flags;
- request IDs;
- ignore stale results;
- спеціальні бібліотеки.

Але головна ідея:

> старий Effect не повинен неконтрольовано впливати на новий стан.

---

# 45. Ignore stale result

У деяких випадках можна використати локальний прапорець:

    useEffect(() => {
        let ignore = false;

        fetch("/api/users")
            .then(response => response.json())
            .then(data => {
                if (!ignore) {
                    setUsers(data);
                }
            });

        return () => {
            ignore = true;
        };
    }, []);

Cleanup тут не скасовує Promise.

Він лише повідомляє:

> "Результат більше не актуальний."

---

# 46. AbortController vs ignore flag

### AbortController

Може реально скасувати операцію, якщо API підтримує abort signal.

    controller.abort();

### Ignore flag

Не скасовує Promise.

Він лише не дозволяє результату вплинути на state.

    if (!ignore) {
        setData(data);
    }

Це різні механізми.

---

# 47. Cleanup і DOM observers

Наприклад:

    useEffect(() => {
        const observer = new ResizeObserver(() => {
            console.log("Resize");
        });

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

Setup:

    observer.observe()

Cleanup:

    observer.disconnect()

---

# 48. Cleanup і MutationObserver

Аналогічно:

    useEffect(() => {
        const observer = new MutationObserver(
            mutations => {
                console.log(mutations);
            }
        );

        observer.observe(element, {
            childList: true,
            subtree: true
        });

        return () => {
            observer.disconnect();
        };
    }, []);

---

# 49. Cleanup і сторонні бібліотеки

Наприклад:

    useEffect(() => {
        const chart = createChart(
            container,
            data
        );

        return () => {
            chart.destroy();
        };
    }, [data]);

Setup:

    createChart()

Cleanup:

    chart.destroy()

---

# 50. Cleanup і media events

Наприклад:

    useEffect(() => {
        function handlePlay() {
            console.log("Playing");
        }

        video.addEventListener(
            "play",
            handlePlay
        );

        return () => {
            video.removeEventListener(
                "play",
                handlePlay
            );
        };
    }, []);

Setup:

    addEventListener()

Cleanup:

    removeEventListener()

---

# 51. Cleanup і subscriptions

Типовий pattern:

    useEffect(() => {
        const subscription = service.subscribe(
            value => {
                setValue(value);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

Цей pattern зустрічається у:

- WebSocket;
- Firebase;
- event buses;
- custom services;
- RxJS;
- external stores.

---

# 52. Cleanup з RxJS

Концептуально:

    useEffect(() => {
        const subscription = observable.subscribe(
            value => {
                console.log(value);
            }
        );

        return () => {
            subscription.unsubscribe();
        };
    }, []);

Модель:

    subscribe()
      ↓
    subscription
      ↓
    unsubscribe()

---

# 53. Cleanup не повинен бути async

Не потрібно:

    useEffect(() => {
        return async () => {
            await cleanupSomething();
        };
    }, []);

React не очікує Promise від cleanup function.

Cleanup повинен бути синхронною функцією.

Якщо cleanup потребує асинхронної операції, її потрібно організувати інакше.

---

# 54. Cleanup повинен бути idempotent

Бажано, щоб cleanup був безпечним, якщо його виконують у development перевірках або в складніших lifecycle сценаріях.

Наприклад:

    return () => {
        connection.disconnect();
    };

Код повинен коректно працювати з життєвим циклом:

    setup
      ↓
    cleanup
      ↓
    setup

---

# 55. StrictMode і подвійний setup

У development з `StrictMode` можна побачити:

    setup
      ↓
    cleanup
      ↓
    setup

Це не означає, що production React просто "двічі виконує Effect".

React перевіряє, чи Effect правильно поводиться при повторному setup.

---

# 56. Хороший Effect у StrictMode

Наприклад:

    useEffect(() => {
        const timerId = setInterval(
            () => {
                console.log("Tick");
            },
            1000
        );

        return () => {
            clearInterval(timerId);
        };
    }, []);

StrictMode:

    setup
      ↓
    setInterval

    cleanup
      ↓
    clearInterval

    setup
      ↓
    setInterval

У результаті залишається один актуальний timer.

---

# 57. Поганий Effect у StrictMode

Наприклад:

    useEffect(() => {
        window.addEventListener(
            "resize",
            handleResize
        );
    }, []);

Якщо setup повториться, а listener не буде прибраний, можуть накопичуватися registrations.

Cleanup:

    return () => {
        window.removeEventListener(
            "resize",
            handleResize
        );
    };

вирішує проблему.

---

# 58. Cleanup і resource leak

Можна уявити проблему:

    render
      ↓
    Effect
      ↓
    subscribe
      ↓
    render
      ↓
    Effect
      ↓
    subscribe
      ↓
    render
      ↓
    Effect
      ↓
    subscribe

Без cleanup:

    subscription #1
    subscription #2
    subscription #3

У результаті одна подія може оброблятися багато разів.

---

# 59. Правильний цикл

З cleanup:

    Effect
      ↓
    subscribe #1

Наступний Effect:

    cleanup #1
      ↓
    subscribe #2

Наступний:

    cleanup #2
      ↓
    subscribe #3

Отже, активною залишається одна актуальна subscription.

---

# 60. Cleanup і dependency design

Cleanup особливо важливий, коли Effect має dependencies.

Наприклад:

    useEffect(() => {
        const subscription =
            subscribeToRoom(roomId);

        return () => {
            subscription.unsubscribe();
        };
    }, [roomId]);

`roomId` визначає:

    яку subscription потрібно мати активною.

Cleanup визначає:

    яку стару subscription потрібно видалити.

---

# 61. Effect як synchronization process

Наприклад:

    roomId
      ↓
    subscription

Effect підтримує правило:

> "Підписка повинна відповідати поточному roomId."

Якщо:

    roomId = A

активна:

    subscription A

Якщо:

    roomId = B

після cleanup:

    subscription B

Це і є synchronization.

---

# 62. Cleanup і "latest state"

Не потрібно використовувати cleanup для того, щоб просто прочитати latest state.

Cleanup належить конкретному Effect setup.

Наприклад:

    useEffect(() => {
        const connection = connect(roomId);

        return () => {
            connection.disconnect();
        };
    }, [roomId]);

Cleanup працює з connection, створеним цим Effect.

Це набагато надійніше, ніж намагатися вручну шукати "поточний" connection.

---

# 63. Cleanup і state updates

У сучасному React не потрібно використовувати cleanup як спосіб "запобігти setState після unmount" для кожного async request.

Старий pattern:

    let mounted = true;

    useEffect(() => {
        fetchData().then(data => {
            if (mounted) {
                setData(data);
            }
        });

        return () => {
            mounted = false;
        };
    }, []);

може бути потрібним у певних сценаріях для ігнорування застарілого результату, але cleanup не є способом "скасувати" сам Promise.

Якщо API підтримує cancellation, краще використовувати відповідний механізм.

---

# 64. Cleanup і React 18+

У сучасному React не потрібно орієнтуватися на стару ідею:

> "React завжди видасть warning, якщо я зроблю setState після unmount."

Головна проблема тут не сам факт виклику `setState`, а:

> чи продовжується непотрібна зовнішня робота і чи може її результат вплинути на актуальний UI.

Тому правильне питання:

> "Чи потрібно мені скасувати або ігнорувати цю операцію?"

---

# 65. Cleanup для animation frame

Якщо Effect створює animation frame:

    useEffect(() => {
        const frameId = requestAnimationFrame(
            () => {
                console.log("Frame");
            }
        );

        return () => {
            cancelAnimationFrame(frameId);
        };
    }, []);

Setup:

    requestAnimationFrame()

Cleanup:

    cancelAnimationFrame()

---

# 66. Cleanup для interval

    useEffect(() => {
        const intervalId = setInterval(() => {
            console.log("Tick");
        }, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

Формула:

    setInterval()
        ↕
    clearInterval()

---

# 67. Cleanup для timeout

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            console.log("Done");
        }, 3000);

        return () => {
            clearTimeout(timeoutId);
        };
    }, []);

Формула:

    setTimeout()
        ↕
    clearTimeout()

---

# 68. Cleanup для event listener

    useEffect(() => {
        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

Формула:

    addEventListener()
        ↕
    removeEventListener()

---

# 69. Cleanup для subscription

    useEffect(() => {
        const subscription =
            subscribe(handleValue);

        return () => {
            subscription.unsubscribe();
        };
    }, []);

Формула:

    subscribe()
        ↕
    unsubscribe()

---

# 70. Cleanup для connection

    useEffect(() => {
        const connection =
            connect(serverUrl);

        return () => {
            connection.disconnect();
        };
    }, [serverUrl]);

Формула:

    connect()
        ↕
    disconnect()

---

# 71. Cleanup для observer

    useEffect(() => {
        const observer =
            new ResizeObserver(handleResize);

        observer.observe(element);

        return () => {
            observer.disconnect();
        };
    }, []);

Формула:

    observe()
        ↕
    disconnect()

---

# 72. Cleanup для fetch

    useEffect(() => {
        const controller =
            new AbortController();

        fetch(url, {
            signal: controller.signal
        });

        return () => {
            controller.abort();
        };
    }, [url]);

Формула:

    fetch()
        ↕
    abort()

---

# 73. Загальна таблиця

| Resource | Setup | Cleanup |
|---|---|---|
| Interval | `setInterval()` | `clearInterval()` |
| Timeout | `setTimeout()` | `clearTimeout()` |
| Event listener | `addEventListener()` | `removeEventListener()` |
| Subscription | `subscribe()` | `unsubscribe()` |
| WebSocket | `new WebSocket()` | `close()` |
| Connection | `connect()` | `disconnect()` |
| Observer | `observe()` | `disconnect()` |
| Animation frame | `requestAnimationFrame()` | `cancelAnimationFrame()` |
| Fetch | `fetch()` + `AbortController` | `abort()` |
| External library | `create()` / `init()` | `destroy()` |

---

# 74. Коли Cleanup не потрібен

Не кожен Effect повинен мати cleanup.

Наприклад:

    useEffect(() => {
        document.title = `Count: ${count}`;
    }, [count]);

Тут ми просто синхронізуємо:

    document.title

Немає ресурсу, який потрібно звільняти.

Тому cleanup не потрібен.

---

# 75. Ще один приклад без cleanup

    useEffect(() => {
        localStorage.setItem(
            "theme",
            theme
        );
    }, [theme]);

Немає subscription:

    subscribe()

немає timer:

    setInterval()

немає listener:

    addEventListener()

Тому cleanup не потрібен.

---

# 76. Cleanup потрібен не через "useEffect"

Не існує правила:

> "Кожен useEffect повинен мати cleanup."

Правильне правило:

> **Cleanup потрібен, якщо Effect створює або підключає щось, що потрібно припинити, скасувати, від'єднати або знищити.**

---

# 77. Cleanup decision tree

Запитай:

### Effect створює зовнішній ресурс?

    НІ
      ↓
    cleanup може не бути потрібен

    ТАК
      ↓
    Як його зупинити?
      ↓
    cleanup

---

# 78. Приклад decision tree

    setInterval()
        ↓
    clearInterval()

    addEventListener()
        ↓
    removeEventListener()

    subscribe()
        ↓
    unsubscribe()

    connect()
        ↓
    disconnect()

    WebSocket
        ↓
    close()

    fetch()
        ↓
    abort() / ignore stale result

---

# 79. Cleanup і чистота Effect

Хороший Effect:

    useEffect(() => {
        const resource = createResource();

        return () => {
            resource.destroy();
        };
    }, [dependency]);

Тут легко побачити:

    setup
        ↕
    cleanup

Це значно краще, ніж Effect із великою кількістю непов'язаних дій.

---

# 80. Один Effect — один ресурс

Якщо можливо, корисно тримати Effect логічно сфокусованим.

Наприклад:

    useEffect(() => {
        const subscription =
            subscribe(userId);

        return () => {
            subscription.unsubscribe();
        };
    }, [userId]);

Це зрозумілий synchronization process.

---

# 81. Не змішуй різні ресурси без потреби

Менш зрозуміло:

    useEffect(() => {
        const subscription =
            subscribe(userId);

        const timerId = setInterval(
            refresh,
            5000
        );

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {
            subscription.unsubscribe();
            clearInterval(timerId);
            window.removeEventListener(
                "resize",
                handleResize
            );
        };
    }, [userId]);

Це може працювати, але тут три різні synchronization processes.

Часто краще:

    useEffect(() => {
        // subscription
    }, [userId]);

    useEffect(() => {
        // timer
    }, []);

    useEffect(() => {
        // resize listener
    }, []);

---

# 82. Cleanup і separation of concerns

Окремі Effects дозволяють:

- мати різні dependencies;
- мати різний cleanup;
- легше тестувати;
- легше читати;
- легше знаходити bugs.

---

# 83. Поганий cleanup

Cleanup не повинен робити непов'язані дії.

Наприклад:

    useEffect(() => {
        const connection = connect();

        return () => {
            connection.disconnect();
            localStorage.clear();
            setCount(0);
            document.body.innerHTML = "";
        };
    }, []);

Це дуже небезпечна структура.

Cleanup повинен прибирати те, що було створено відповідним Effect.

---

# 84. Принцип ownership

Effect:

    creates resource

тому Effect:

    owns resource

і повинен:

    cleanup resource

Наприклад:

    Effect
      ↓
    create subscription
      ↓
    Effect owns subscription
      ↓
    cleanup subscription

---

# 85. Cleanup та dependency changes

Найкращий приклад:

    useEffect(() => {
        const connection =
            connect(roomId);

        return () => {
            connection.disconnect();
        };
    }, [roomId]);

Тут dependency:

    roomId

визначає resource:

    connection

Cleanup:

    disconnect()

забезпечує, що resource відповідає актуальному `roomId`.

---

# 86. Cleanup — це частина Effect

Не потрібно думати:

    Effect
      +
    окремо Cleanup

Краще:

    Effect synchronization process
      ├── setup
      └── cleanup

Наприклад:

    useEffect(() => {
        const connection = connect(roomId);

        return () => {
            connection.disconnect();
        };
    }, [roomId]);

Це одна логічна одиниця.

---

# 87. Повний приклад ChatRoom

    function ChatRoom({ roomId }) {
        useEffect(() => {
            const connection =
                createConnection(roomId);

            connection.connect();

            return () => {
                connection.disconnect();
            };
        }, [roomId]);

        return (
            <h1>
                Room: {roomId}
            </h1>
        );
    }

Lifecycle:

    mount
      ↓
    connect(roomId)

    roomId changes
      ↓
    disconnect(old connection)
      ↓
    connect(new room)

    unmount
      ↓
    disconnect(current connection)

---

# 88. Повний приклад Timer

    function Timer() {
        const [count, setCount] = useState(0);

        useEffect(() => {
            const intervalId = setInterval(() => {
                setCount(
                    previousCount =>
                        previousCount + 1
                );
            }, 1000);

            return () => {
                clearInterval(intervalId);
            };
        }, []);

        return <p>{count}</p>;
    }

Модель:

    mount
      ↓
    setInterval()

    every second
      ↓
    setCount()

    unmount
      ↓
    clearInterval()

---

# 89. Повний приклад Resize

    function WindowWidth() {
        const [width, setWidth] = useState(
            window.innerWidth
        );

        useEffect(() => {
            function handleResize() {
                setWidth(window.innerWidth);
            }

            window.addEventListener(
                "resize",
                handleResize
            );

            return () => {
                window.removeEventListener(
                    "resize",
                    handleResize
                );
            };
        }, []);

        return (
            <p>
                Width: {width}px
            </p>
        );
    }

---

# 90. Повний приклад API + AbortController

    function User({ userId }) {
        const [user, setUser] = useState(null);

        useEffect(() => {
            const controller =
                new AbortController();

            async function loadUser() {
                try {
                    const response = await fetch(
                        `/api/users/${userId}`,
                        {
                            signal:
                                controller.signal
                        }
                    );

                    const data =
                        await response.json();

                    setUser(data);
                } catch (error) {
                    if (
                        error instanceof DOMException &&
                        error.name === "AbortError"
                    ) {
                        return;
                    }

                    console.error(error);
                }
            }

            loadUser();

            return () => {
                controller.abort();
            };
        }, [userId]);

        if (!user) {
            return <p>Loading...</p>;
        }

        return <p>{user.name}</p>;
    }

Потік:

    userId = 1
       ↓
    request 1

    userId = 2
       ↓
    abort request 1
       ↓
    request 2

---

# 91. Common Mistake №1 — немає cleanup

    useEffect(() => {
        const intervalId =
            setInterval(doSomething, 1000);
    }, []);

Проблема:

    interval

може залишитися активним.

Правильно:

    useEffect(() => {
        const intervalId =
            setInterval(doSomething, 1000);

        return () => {
            clearInterval(intervalId);
        };
    }, []);

---

# 92. Common Mistake №2 — неправильна function reference

Погано:

    useEffect(() => {
        window.addEventListener(
            "resize",
            () => handleResize()
        );

        return () => {
            window.removeEventListener(
                "resize",
                () => handleResize()
            );
        };
    }, []);

Правильно:

    useEffect(() => {
        function handleResize() {
            // ...
        }

        window.addEventListener(
            "resize",
            handleResize
        );

        return () => {
            window.removeEventListener(
                "resize",
                handleResize
            );
        };
    }, []);

---

# 93. Common Mistake №3 — cleanup не відповідає setup

Погано:

    useEffect(() => {
        const timerId = setInterval(
            doSomething,
            1000
        );

        return () => {
            clearTimeout(timerId);
        };
    }, []);

Тут:

    setInterval()

повинен очищатися через:

    clearInterval()

Правильно:

    return () => {
        clearInterval(timerId);
    };

---

# 94. Common Mistake №4 — неправильний cleanup для listener

Погано:

    useEffect(() => {
        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () => {
            window.removeEventListener(
                "resize",
                handleScroll
            );
        };
    }, []);

Setup:

    "scroll"

Cleanup:

    "resize"

Це різні events.

Правильно:

    useEffect(() => {
        window.addEventListener(
            "scroll",
            handleScroll
        );

        return () => {
            window.removeEventListener(
                "scroll",
                handleScroll
            );
        };
    }, []);

---

# 95. Common Mistake №5 — cleanup очищає не той ресурс

Наприклад:

    useEffect(() => {
        const connection =
            connect(roomId);

        return () => {
            otherConnection.disconnect();
        };
    }, [roomId]);

Cleanup повинен закрити саме ресурс, створений setup:

    return () => {
        connection.disconnect();
    };

---

# 96. Common Mistake №6 — cleanup як "reset state"

Погано:

    useEffect(() => {
        return () => {
            setData(null);
        };
    }, []);

Cleanup не призначений для звичайного reset state.

Спочатку потрібно зрозуміти:

> Який зовнішній ресурс я прибираю?

---

# 97. Common Mistake №7 — async cleanup

Погано:

    useEffect(() => {
        return async () => {
            await disconnect();
        };
    }, []);

Cleanup не повинен повертати Promise.

Краще використовувати API, яке дозволяє синхронно ініціювати cleanup, або окремо організувати async operation.

---

# 98. Common Mistake №8 — cleanup без setup

Наприклад:

    useEffect(() => {
        return () => {
            clearInterval(timerId);
        };
    }, []);

Якщо Effect не створює цей timer, незрозуміло, чому саме цей Effect повинен його очищати.

Краще дотримуватися:

    setup resource
        +
    cleanup same resource

---

# 99. Common Mistake №9 — один великий cleanup

Погано:

    return () => {
        unsubscribe();
        clearInterval(timerId);
        removeResizeListener();
        disconnectSocket();
        destroyChart();
    };

Якщо всі ці ресурси створені в одному Effect без необхідності, код важко підтримувати.

Краще розділити незалежні synchronization processes.

---

# 100. Як перевірити Cleanup

Для кожного Effect постав собі питання:

    Що створює setup?

    ↓

    Як це зупинити?

    ↓

    Чи cleanup робить саме це?

    ↓

    Що буде при dependency change?

    ↓

    Що буде при unmount?

    ↓

    Що буде в StrictMode?

---

# 101. Cleanup Checklist

    [ ] Чи створює Effect зовнішній ресурс?

    [ ] Чи потрібно його зупиняти?

    [ ] Чи є cleanup?

    [ ] Чи cleanup є дзеркалом setup?

    [ ] Чи використовується та сама function reference?

    [ ] Чи правильний тип cleanup?

    [ ] Чи cleanup працює при dependency change?

    [ ] Чи cleanup працює при unmount?

    [ ] Чи Effect нормально проходить
        setup → cleanup → setup?

    [ ] Чи немає зайвих ресурсів?

---

# 102. Найважливіша таблиця

| Setup | Cleanup |
|---|---|
| `setInterval()` | `clearInterval()` |
| `setTimeout()` | `clearTimeout()` |
| `addEventListener()` | `removeEventListener()` |
| `subscribe()` | `unsubscribe()` |
| `connect()` | `disconnect()` |
| `new WebSocket()` | `close()` |
| `observe()` | `disconnect()` |
| `requestAnimationFrame()` | `cancelAnimationFrame()` |
| `fetch()` | `AbortController.abort()` |
| `create()` | `destroy()` |

---

# 103. Головна ментальна модель

Effect:

    useEffect(() => {

        // SETUP

        return () => {

            // CLEANUP

        };

    }, [dependencies]);

Можна читати так:

> "Коли потрібно синхронізуватися — створи ресурс. Коли ця synchronization більше не потрібна — прибери ресурс."

---

# 104. Lifecycle одного Effect

    ┌─────────────────────┐
    │       setup         │
    └──────────┬──────────┘
               │
               ↓
        resource active
               │
               ↓
      dependency changes?
          │          │
         NO         YES
          │          │
          │          ↓
          │       cleanup
          │          │
          │          ↓
          │        setup
          │
          ↓
       component
        unmount
          │
          ↓
       cleanup

---

# 105. Lifecycle component + Effect

    COMPONENT

    mount
      ↓
    render
      ↓
    commit
      ↓
    Effect setup
      ↓
    component active
      ↓
    update
      ↓
    render
      ↓
    commit
      ↓
    Effect cleanup
      ↓
    Effect setup
      ↓
    component active
      ↓
    unmount
      ↓
    Effect cleanup

---

# 106. Важливе уточнення

Не кожен update призводить до:

    cleanup
      ↓
    setup

Це відбувається тоді, коли конкретний Effect повинен повторно синхронізуватися.

Наприклад:

    useEffect(() => {
        // ...
    }, [roomId]);

Якщо змінився:

    theme

але:

    roomId

залишився тим самим, цей Effect не повинен перезапускатися тільки через зміну `theme`.

---

# 107. Cleanup і правильні dependencies

Dependencies та cleanup тісно пов'язані.

Наприклад:

    useEffect(() => {
        const connection =
            connect(roomId);

        return () => {
            connection.disconnect();
        };
    }, [roomId]);

Якщо dependency правильна:

    [roomId]

то synchronization lifecycle правильний:

    room A
      ↓
    connect A

    room B
      ↓
    disconnect A
      ↓
    connect B

---

# 108. Cleanup і reference identity

Для listeners та subscriptions важливо правильно зберігати references.

Наприклад:

    function handleResize() {
        // ...
    }

Setup:

    addEventListener(
        "resize",
        handleResize
    );

Cleanup:

    removeEventListener(
        "resize",
        handleResize
    );

Одна й та сама:

    handleResize

reference використовується в обох місцях.

---

# 109. Cleanup і closures

Cleanup може отримувати доступ до значень конкретного Effect.

Наприклад:

    useEffect(() => {
        const id = createResource(userId);

        return () => {
            destroyResource(id);
        };
    }, [userId]);

Cleanup має доступ до:

    id

який був створений цим конкретним setup.

Це одна з причин, чому cleanup природно пишеться поруч із setup.

---

# 110. Чому cleanup знаходиться всередині useEffect

Замість:

    useEffect(setup);

    // десь далеко
    cleanup();

React дозволяє:

    useEffect(() => {
        const resource = setup();

        return () => {
            cleanup(resource);
        };
    }, []);

Тобто setup і cleanup знаходяться разом.

Це робить ownership очевидним.

---

# 111. Cleanup як частина контракту Effect

Effect має контракт:

    INPUT:
    dependencies

    ACTION:
    synchronize

    OUTPUT:
    optional cleanup

Наприклад:

    [roomId]

        ↓

    connect(roomId)

        ↓

    return disconnect()

---

# 112. Практичний алгоритм

## Крок 1

Знайди зовнішню систему:

    timer
    DOM
    event
    API
    WebSocket
    subscription
    library

## Крок 2

Створи setup.

## Крок 3

Знайди спосіб зупинити setup.

## Крок 4

Напиши cleanup.

## Крок 5

Визнач dependencies.

## Крок 6

Перевір:

    dependency change
    +
    unmount
    +
    StrictMode

---

# 113. Що потрібно запам'ятати

1. **Cleanup — це функція, яку повертає `useEffect`.**

2. **Cleanup потрібен для очищення зовнішніх ресурсів.**

3. **Cleanup не є способом очищення React state.**

4. **Cleanup виконується перед повторним setup при зміні dependencies.**

5. **Cleanup виконується при unmount.**

6. **Cleanup може виконуватися багато разів протягом життя одного компонента.**

7. **Cleanup ≠ unmount.**

8. **Не кожен Effect потребує cleanup.**

9. **Якщо Effect створив resource, він часто повинен мати cleanup.**

10. **Setup і cleanup повинні бути логічною парою.**

11. **`setInterval()` ↔ `clearInterval()`.**

12. **`setTimeout()` ↔ `clearTimeout()`.**

13. **`addEventListener()` ↔ `removeEventListener()`.**

14. **`subscribe()` ↔ `unsubscribe()`.**

15. **`connect()` ↔ `disconnect()`.**

16. **WebSocket ↔ `close()`.**

17. **Observer ↔ `disconnect()`.**

18. **`requestAnimationFrame()` ↔ `cancelAnimationFrame()`.**

19. **Fetch може використовувати `AbortController`.**

20. **Cleanup повинен прибирати саме той ресурс, який створив setup.**

21. **Для event listener важлива та сама function reference.**

22. **StrictMode у development може перевіряти Effect через setup → cleanup → setup.**

23. **Хороший Effect повинен бути безпечним для повторної synchronization.**

---

# 114. Питання для самоперевірки

### Теорія

- Що таке cleanup?
- Для чого потрібна cleanup function?
- Коли React виконує cleanup?
- Чи виконується cleanup при кожному render?
- Чим cleanup відрізняється від unmount?
- Чи кожен Effect повинен мати cleanup?
- Який cleanup потрібен для `setInterval()`?
- Який cleanup потрібен для `setTimeout()`?
- Як очистити event listener?
- Чому важлива function reference?
- Як очистити subscription?
- Як закрити WebSocket?
- Як скасувати `fetch()`?
- Що таке `AbortController`?
- Що відбувається з cleanup при зміні dependency?
- Як працює cleanup у `StrictMode`?
- Чому cleanup важливий для resource management?
- Чи можна робити cleanup `async`?
- Чому не варто використовувати cleanup просто для reset state?

---

# 115. Практичні завдання

## Завдання 1 — Timer

Створи компонент:

    Timer

Використай:

    setInterval()

Забезпеч cleanup через:

    clearInterval()

---

## Завдання 2 — Timeout

Створи компонент:

    DelayedMessage

Через 3 секунди показуй повідомлення.

Якщо компонент unmount до завершення 3 секунд:

    clearTimeout()

---

## Завдання 3 — Resize listener

Створи:

    WindowWidth

Підписуйся на:

    resize

і правильно очищай listener.

---

## Завдання 4 — Scroll listener

Створи:

    ScrollPosition

Показуй:

    window.scrollY

Очисти listener при unmount.

---

## Завдання 5 — Subscription

Уяви API:

    subscribeToMessages(callback)

яке повертає:

    unsubscribe()

Створи Effect із правильним cleanup.

---

## Завдання 6 — Chat Room

Створи:

    ChatRoom({ roomId })

При зміні `roomId`:

    disconnect old room
        ↓
    connect new room

---

## Завдання 7 — Fetch cancellation

Створи:

    User({ userId })

Використай:

    AbortController

При зміні `userId` старий request повинен бути скасований.

---

# 116. Міні-шпаргалка

    useEffect(() => {
        // setup

        return () => {
            // cleanup
        };
    }, [dependency]);

---

    setup
      ↓
    resource created
      ↓
    dependency changes
      ↓
    cleanup
      ↓
    new setup

---

    component unmount
      ↓
    cleanup

---

# 117. Формула Cleanup

    SETUP

        ↓

    external resource

        ↓

    resource active

        ↓

    CLEANUP

        ↓

    resource released

---

# 118. Головне правило

> **Cleanup повинен бути дзеркалом setup.**

Наприклад:

    addEventListener()
        ↕
    removeEventListener()

    setInterval()
        ↕
    clearInterval()

    subscribe()
        ↕
    unsubscribe()

    connect()
        ↕
    disconnect()

    observe()
        ↕
    disconnect()

    create()
        ↕
    destroy()

---

# 119. Підсумок

`useEffect()` дозволяє React взаємодіяти із зовнішніми системами.

Але якщо Effect створює зовнішній ресурс, цього недостатньо.

Потрібно також визначити:

> **Як цей ресурс буде припинений, скасований або знищений?**

Саме для цього існує cleanup.

Модель:

    useEffect(() => {

        // SETUP
        // створюємо / підключаємо ресурс

        return () => {

            // CLEANUP
            // прибираємо / відключаємо ресурс

        };

    }, [dependencies]);

---

# 120. Найважливіша схема всієї теми

    React state / props
            │
            ↓
        dependency
            │
            ↓
          Effect
            │
            ↓
          SETUP
            │
            ↓
    external resource
            │
            │
      dependency changes
            │
            ↓
         CLEANUP
            │
            ↓
        new SETUP


    component unmount
            │
            ↓
         CLEANUP

---

# 121. Фінальна ментальна модель

Не думай:

> "Cleanup — це код, який запускається, коли компонент закривається."

Це неповне визначення.

Краще:

> **Cleanup — це завершення конкретного synchronization process, який був створений Effect.**

Тому:

    Effect
      ↓
    setup
      ↓
    resource
      ↓
    cleanup

А при зміні dependency:

    old synchronization
          ↓
       cleanup
          ↓
    new synchronization

Саме ця модель дозволяє правильно працювати з:

- timers;
- event listeners;
- subscriptions;
- WebSocket;
- API requests;
- observers;
- browser APIs;
- сторонніми бібліотеками;
- будь-якими іншими зовнішніми ресурсами.

І головна формула:

    SETUP ↔ CLEANUP

    create ↔ destroy
    connect ↔ disconnect
    subscribe ↔ unsubscribe
    add ↔ remove
    start ↔ stop
    acquire ↔ release