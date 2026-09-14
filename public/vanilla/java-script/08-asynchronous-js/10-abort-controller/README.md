# 10. AbortController

`AbortController` — це Web API для **скасування асинхронних операцій**, зокрема `fetch()`.

У попередньому розділі ми розглядали:

    Promise.race()

Він дозволяє сказати:

    "Я більше не хочу чекати на цей Promise."

Але важлива проблема:

**`Promise.race()` не скасовує саму операцію.**

Для реального скасування `fetch()` використовується:

    AbortController

Це особливо важливо для сучасних frontend-застосунків, де користувач може:

- перейти на іншу сторінку;
- змінити пошуковий запит;
- натиснути Cancel;
- закрити модальне вікно;
- почати новий запит до завершення попереднього;
- залишити компонент;
- втратити потребу в результаті запиту.

---

# Ключові поняття

- ✅ `AbortController`
- ✅ `AbortSignal`
- ✅ `controller.signal`
- ✅ `controller.abort()`
- ✅ `signal.aborted`
- ✅ `signal.reason`
- ✅ `fetch(..., { signal })`
- ✅ `AbortError`
- ✅ скасування `fetch()`
- ✅ cancellation
- ✅ timeout
- ✅ `AbortSignal.timeout()`
- ✅ `AbortSignal.any()`
- ✅ повторне використання controller
- ✅ один signal для декількох операцій
- ✅ cancellation propagation
- ✅ cleanup
- ✅ user cancellation
- ✅ timeout cancellation
- ✅ request cancellation
- ✅ race conditions

---

# Що потрібно пам'ятати

- `AbortController` створює механізм скасування.
- `controller.signal` передається асинхронній операції.
- `controller.abort()` сигналізує, що операцію потрібно скасувати.
- `fetch()` підтримує `AbortSignal`.
- Після `abort()` `signal.aborted` стає `true`.
- Скасований `fetch()` завершується rejection.
- Типовою причиною є `AbortError`.
- `AbortController` не "вбиває" JavaScript-код примусово.
- Операція повинна підтримувати `AbortSignal`, щоб реагувати на скасування.
- Один `signal` можна передати декільком операціям.
- Один `AbortController` можна використати для групового скасування.
- Після `abort()` controller вже не можна повернути в активний стан.
- Для нової операції потрібен новий controller.
- `AbortController` особливо корисний разом із `fetch()`.
- `Promise.race()` і `AbortController` вирішують різні задачі.
- `Promise.race()` визначає результат гонки.
- `AbortController` дозволяє реально сигналізувати операції про скасування.
- `AbortSignal.timeout()` дозволяє зручно створити timeout signal.
- `AbortSignal.any()` дозволяє об'єднати декілька сигналів.
- Скасування — це нормальна частина async flow, а не обов'язково "помилка програми".

---

# 1. Що таке AbortController

`AbortController` — це об'єкт, який дозволяє повідомити одну або декілька асинхронних операцій:

    "Скасуйтеся."

Створення:

    const controller = new AbortController();

Він має:

    controller.signal

та метод:

    controller.abort()

---

# 2. Основна модель

Можна уявити:

    AbortController
          │
          │ signal
          ↓
    async operation
          │
          │
          ↓
    controller.abort()
          │
          ↓
    operation cancelled

Тобто controller керує сигналом, а операція слухає цей сигнал.

---

# 3. AbortSignal

`AbortSignal` — це об'єкт, через який асинхронна операція отримує інформацію про скасування.

Наприклад:

    const controller = new AbortController();

    const signal = controller.signal;

    console.log(signal.aborted);

Результат:

    false

Після:

    controller.abort();

стан:

    console.log(signal.aborted);

буде:

    true

---

# 4. controller.signal

Основна схема:

    const controller = new AbortController();

    const signal = controller.signal;

`signal` передається операції.

Наприклад:

    fetch('/api/users', {
        signal,
    });

Тепер `fetch()` знає про цей signal.

---

# 5. controller.abort()

Скасування:

    controller.abort();

Наприклад:

    const controller = new AbortController();

    fetch('/api/users', {
        signal: controller.signal,
    });

    controller.abort();

Після `abort()` `fetch()` буде скасовано.

---

# 6. Базовий приклад

    const controller = new AbortController();

    fetch('/api/users', {
        signal: controller.signal,
    })
        .then(response => response.json())
        .then(users => {
            console.log(users);
        })
        .catch(error => {
            console.error(error);
        });

Скасування:

    controller.abort();

---

# 7. AbortController з async/await

Це основний практичний варіант:

    async function loadUsers() {
        const controller = new AbortController();

        try {
            const response = await fetch('/api/users', {
                signal: controller.signal,
            });

            const users = await response.json();

            return users;
        } catch (error) {
            console.error(error);
        }
    }

Але controller у такому прикладі створений всередині функції, тому зовнішній код не має доступу до:

    controller.abort()

Для реального cancel потрібен інший дизайн.

---

# 8. Передача signal у функцію

Кращий варіант:

    async function loadUsers(signal) {
        const response = await fetch('/api/users', {
            signal,
        });

        return response.json();
    }

Тепер controller створюється зовні:

    const controller = new AbortController();

    loadUsers(controller.signal);

І за потреби:

    controller.abort();

---

# 9. Практичний шаблон

    const controller = new AbortController();

    try {
        const response = await fetch('/api/users', {
            signal: controller.signal,
        });

        const users = await response.json();

        console.log(users);
    } catch (error) {
        console.error(error);
    }

Для скасування:

    controller.abort();

---

# 10. Що відбувається після abort()

До скасування:

    signal.aborted
    ↓
    false

Викликаємо:

    controller.abort()

Після:

    signal.aborted
    ↓
    true

Сигнал більше не повертається до:

    false

---

# 11. AbortController одноразовий

Це дуже важливо.

Після:

    controller.abort();

цей controller залишається aborted.

Не можна зробити:

    controller.abort();
    // somehow restore controller

Такого механізму немає.

Для нової операції потрібно створити новий:

    const controller = new AbortController();

---

# 12. Перевірка signal.aborted

Можна перевірити:

    if (signal.aborted) {
        console.log('Operation was cancelled');
    }

Наприклад:

    async function loadData(signal) {
        if (signal.aborted) {
            return;
        }

        const response = await fetch('/api/data', {
            signal,
        });

        return response.json();
    }

---

# 13. AbortError

Коли `fetch()` скасовано через `AbortController`, Promise зазвичай завершується rejection з помилкою типу:

    AbortError

Наприклад:

    try {
        const response = await fetch('/api/users', {
            signal: controller.signal,
        });
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Request cancelled');
        } else {
            console.error(error);
        }
    }

---

# 14. Краще перевіряти причину скасування

Скасування не обов'язково означає помилку програми.

Наприклад:

    catch (error) {
        if (error.name === 'AbortError') {
            console.log('User cancelled request');
            return;
        }

        console.error('Unexpected error:', error);
    }

Це важлива частина UX.

Якщо користувач натиснув:

    Cancel

не потрібно показувати:

    "Something went wrong!"

---

# 15. Cancellation ≠ Error

Скасування часто є **нормальною подією**, а не помилкою.

Наприклад:

    User clicks Cancel
        ↓
    controller.abort()
        ↓
    fetch rejected
        ↓
    AbortError
        ↓
    ignore / cleanup

Це відрізняється від:

    Server crashed
        ↓
    HTTP 500

або:

    Network unavailable
        ↓
    network error

---

# 16. Відмінність трьох ситуацій

## Success

    request
      ↓
    response
      ↓
    success

## Failure

    request
      ↓
    network / HTTP / parsing error
      ↓
    error

## Cancellation

    request
      ↓
    abort()
      ↓
    AbortError

Ці сценарії потрібно розрізняти.

---

# 17. AbortController і fetch

`fetch()` приймає `signal` через options:

    fetch(url, {
        signal: controller.signal,
    });

Повна форма:

    const controller = new AbortController();

    const response = await fetch('/api/data', {
        method: 'GET',
        signal: controller.signal,
    });

Потім:

    controller.abort();

---

# 18. Cancel button

Це один із найкращих практичних прикладів.

HTML:

    <button id="load">
        Load
    </button>

    <button id="cancel">
        Cancel
    </button>

JavaScript:

    let controller;

    async function loadData() {
        controller = new AbortController();

        try {
            const response = await fetch('/api/data', {
                signal: controller.signal,
            });

            const data = await response.json();

            console.log(data);
        } catch (error) {
            if (error.name === 'AbortError') {
                console.log('Cancelled');
                return;
            }

            console.error(error);
        }
    }

    document.querySelector('#load')
        .addEventListener('click', loadData);

    document.querySelector('#cancel')
        .addEventListener('click', () => {
            controller?.abort();
        });

---

# 19. Чому потрібен `?.`

У момент натискання Cancel:

    controller

може ще не існувати.

Тому:

    controller?.abort();

безпечніший за:

    controller.abort();

Optional chaining дозволяє не отримати помилку, якщо controller ще `undefined`.

---

# 20. Cancel попереднього request

Дуже практичний сценарій:

користувач швидко змінює пошуковий запит.

Наприклад:

    cat
    ↓
    cats
    ↓
    cats ukraine
    ↓
    cats ukraine adoption

Не потрібно залишати всі попередні запити активними.

Можна скасувати попередній:

    let controller = null;

    async function search(query) {
        controller?.abort();

        controller = new AbortController();

        try {
            const response = await fetch(
                `/api/search?q=${encodeURIComponent(query)}`,
                {
                    signal: controller.signal,
                }
            );

            return await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                return;
            }

            throw error;
        }
    }

---

# 21. Race condition у search

Без cancellation може виникнути проблема:

    request A: "cat"
        ↓
    request B: "cats"

Можливо:

    B завершився першим
        ↓
    UI показав "cats"

А потім:

    A завершився пізніше
        ↓
    UI показав старі "cat" results

Це race condition.

---

# 22. AbortController допомагає уникати stale requests

Схема:

    request A
        ↓
    user changes query
        ↓
    abort request A
        ↓
    request B
        ↓
    B result
        ↓
    update UI

Тепер старий запит не повинен продовжувати роботу, якщо він підтримує cancellation.

---

# 23. Але AbortController не вирішує всі race conditions

Важливо:

`AbortController` — інструмент cancellation.

Він не гарантує автоматично правильність усієї логіки UI.

Наприклад:

    request A
    request B

Потрібно також правильно визначити:

- який результат актуальний;
- коли оновлювати UI;
- як обробляти помилки;
- чи потрібно кешувати результат.

Cancellation — частина рішення, а не універсальна заміна state management.

---

# 24. AbortSignal.timeout()

Для timeout сучасний JavaScript має:

    AbortSignal.timeout()

Наприклад:

    const signal = AbortSignal.timeout(5000);

    const response = await fetch('/api/data', {
        signal,
    });

Якщо операція не завершиться протягом заданого часу, signal буде aborted.

---

# 25. Timeout через AbortSignal.timeout()

Замість старого патерну:

    Promise.race([
        fetch('/api/data'),
        timeout(5000),
    ]);

можна використовувати:

    const response = await fetch('/api/data', {
        signal: AbortSignal.timeout(5000),
    });

Це безпосередньо пов'язує timeout із cancellation signal.

---

# 26. Promise.race vs AbortSignal.timeout

### Promise.race()

    const response = await Promise.race([
        fetch('/api/data'),
        timeout(5000),
    ]);

Визначає:

    хто завершиться першим

Але програвший Promise не скасовується автоматично.

### AbortSignal.timeout()

    const response = await fetch('/api/data', {
        signal: AbortSignal.timeout(5000),
    });

Створює signal, який після timeout переходить у aborted state.

Для `fetch()` це природний cancellation mechanism.

---

# 27. Обробка timeout

Наприклад:

    try {
        const response = await fetch('/api/data', {
            signal: AbortSignal.timeout(5000),
        });

        const data = await response.json();

        return data;
    } catch (error) {
        console.error(error);
    }

У конкретному середовищі варто враховувати причину/тип помилки timeout та cancellation.

---

# 28. Власний AbortController + timeout

Іноді потрібні і ручне скасування, і timeout.

Наприклад:

    const controller = new AbortController();

    const timeoutId = setTimeout(() => {
        controller.abort();
    }, 5000);

    try {
        const response = await fetch('/api/data', {
            signal: controller.signal,
        });

        return await response.json();
    } finally {
        clearTimeout(timeoutId);
    }

Тут:

- користувач може викликати `controller.abort()`;
- timeout теж може викликати `abort()`;
- `finally` очищає timer.

---

# 29. AbortSignal.any()

`AbortSignal.any()` дозволяє об'єднати декілька сигналів.

Наприклад:

    const controller = new AbortController();

    const timeoutSignal = AbortSignal.timeout(5000);

    const signal = AbortSignal.any([
        controller.signal,
        timeoutSignal,
    ]);

Тепер `signal` буде aborted, якщо:

- користувач викличе `controller.abort()`;
- або завершиться timeout.

---

# 30. Manual cancel + timeout

Практичний pattern:

    const controller = new AbortController();

    const timeoutSignal = AbortSignal.timeout(5000);

    const signal = AbortSignal.any([
        controller.signal,
        timeoutSignal,
    ]);

    try {
        const response = await fetch('/api/data', {
            signal,
        });

        return await response.json();
    } catch (error) {
        console.error(error);
    }

Ручне скасування:

    controller.abort();

Автоматичний timeout:

    AbortSignal.timeout(5000)

---

# 31. signal.reason

Signal може містити причину скасування.

Наприклад:

    const controller = new AbortController();

    controller.abort('User cancelled');

    console.log(controller.signal.reason);

Результат:

    User cancelled

---

# 32. abort(reason)

`abort()` може отримати причину:

    controller.abort('User cancelled');

або:

    controller.abort(
        new Error('Operation cancelled')
    );

Після цього:

    controller.signal.reason

містить передану причину.

Це дозволяє відрізняти різні причини cancellation.

---

# 33. Перевірка signal.reason

    const controller = new AbortController();

    controller.abort('User cancelled');

    console.log(controller.signal.aborted);
    console.log(controller.signal.reason);

Результат концептуально:

    true
    User cancelled

---

# 34. signal.throwIfAborted()

`AbortSignal` має метод:

    signal.throwIfAborted();

Він перевіряє, чи signal уже aborted.

Якщо так — буде кинуто причину скасування.

Наприклад:

    function processData(signal) {
        signal.throwIfAborted();

        // continue processing
    }

Це особливо корисно у власних асинхронних функціях.

---

# 35. Власна функція з підтримкою cancellation

Не тільки `fetch()` може використовувати signal.

Можна створити власну функцію:

    async function processData(signal) {
        signal.throwIfAborted();

        const data = await loadData();

        signal.throwIfAborted();

        return process(data);
    }

Тепер caller може контролювати cancellation.

---

# 36. Передача signal через service layer

Це дуже важливо для full-stack/frontend архітектури.

Наприклад:

    async function getUsers(signal) {
        const response = await fetch('/api/users', {
            signal,
        });

        return response.json();
    }

Компонент:

    const controller = new AbortController();

    getUsers(controller.signal);

Пізніше:

    controller.abort();

Таким чином cancellation проходить через service layer.

---

# 37. Cancellation propagation

Схема:

    UI
     ↓
    controller
     ↓
    signal
     ↓
    service
     ↓
    fetch
     ↓
    API

Скасування:

    UI
     ↓
    controller.abort()
     ↓
    signal aborted
     ↓
    fetch cancelled

Це називається **cancellation propagation**.

---

# 38. Один signal для декількох операцій

Один signal можна передати декільком підтримуваним операціям.

Наприклад:

    const controller = new AbortController();

    const signal = controller.signal;

    const usersPromise = fetch('/api/users', {
        signal,
    });

    const postsPromise = fetch('/api/posts', {
        signal,
    });

Потім:

    controller.abort();

Обидва запити отримають сигнал cancellation.

---

# 39. Group cancellation

Це корисно, коли декілька операцій належать до однієї задачі.

Наприклад:

    Page
      ↓
    load user
    load posts
    load comments

Якщо користувач залишив сторінку:

    controller.abort()

можна скасувати всі пов'язані запити.

---

# 40. AbortController та Promise.all()

Наприклад:

    const controller = new AbortController();

    const signal = controller.signal;

    try {
        const [users, posts] = await Promise.all([
            fetch('/api/users', { signal }),
            fetch('/api/posts', { signal }),
        ]);

        console.log(users, posts);
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Requests cancelled');
        } else {
            console.error(error);
        }
    }

Скасування:

    controller.abort();

Один controller може вплинути на обидва `fetch()`.

---

# 41. AbortController та Promise.allSettled()

Можна використовувати той самий signal:

    const controller = new AbortController();

    const results = await Promise.allSettled([
        fetch('/api/users', {
            signal: controller.signal,
        }),
        fetch('/api/posts', {
            signal: controller.signal,
        }),
    ]);

Після:

    controller.abort();

операції, які ще виконуються та підтримують signal, отримають cancellation.

---

# 42. AbortController не скасовує Promise довільно

Це дуже важливо.

Не можна зробити:

    const promise = someFunction();

    controller.abort();

і очікувати, що будь-який Promise автоматично зупиниться.

Функція повинна:

- підтримувати `AbortSignal`;
- перевіряти `signal`;
- або використовувати API, яке підтримує cancellation.

---

# 43. Підтримка signal у власному коді

Наприклад:

    async function doWork(signal) {
        signal.throwIfAborted();

        await someOperation();

        signal.throwIfAborted();

        return result;
    }

Caller:

    const controller = new AbortController();

    try {
        const result = await doWork(
            controller.signal
        );
    } catch (error) {
        // ...
    }

Cancel:

    controller.abort();

---

# 44. Cancellation та cleanup

При cancellation потрібно правильно виконувати cleanup.

Наприклад:

    async function loadData(signal) {
        showLoading();

        try {
            const response = await fetch('/api/data', {
                signal,
            });

            return await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                return;
            }

            throw error;
        } finally {
            hideLoading();
        }
    }

`finally` виконується і при cancellation.

---

# 45. Cancellation та UI

Приклад:

    async function search(query, signal) {
        try {
            const response = await fetch(
                `/api/search?q=${encodeURIComponent(query)}`,
                {
                    signal,
                }
            );

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            return await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                return;
            }

            throw error;
        }
    }

При cancellation:

    не показувати error message
    не показувати "request failed"
    cleanup UI
    чекати на актуальний request

---

# 46. Search-as-you-type

Типовий frontend flow:

    user types "j"
        ↓
    request A

    user types "ja"
        ↓
    abort A
        ↓
    request B

    user types "jav"
        ↓
    abort B
        ↓
    request C

    user stops typing
        ↓
    C finishes
        ↓
    show results

Це один із найкращих прикладів практичного використання `AbortController`.

---

# 47. AbortController та component lifecycle

У сучасному frontend:

    component starts
        ↓
    create controller
        ↓
    start request
        ↓
    component removed
        ↓
    abort request

Це дозволяє не залишати непотрібні network operations.

У React ця ідея часто реалізується через cleanup функцію `useEffect`.

---

# 48. Приклад концепції cleanup

Умовно:

    const controller = new AbortController();

    startRequest(controller.signal);

    // cleanup
    controller.abort();

Ідея проста:

**коли задача більше не потрібна — скасовуємо її.**

---

# 49. AbortController та memory/resource management

Cancellation може допомогти:

- не витрачати bandwidth;
- не обробляти непотрібні responses;
- не виконувати непотрібну роботу;
- зменшити навантаження;
- уникати зайвих UI updates;
- контролювати lifecycle операції.

Але cancellation не гарантує миттєвого звільнення всіх ресурсів на сервері.

---

# 50. Client cancellation vs server cancellation

Це важлива full-stack відмінність.

Frontend:

    controller.abort()

може скасувати client-side `fetch`.

Але це не означає автоматично:

    server stops all work

Сервер міг уже:

- отримати request;
- почати database query;
- виконувати обчислення;
- викликати інший API.

Тому cancellation на frontend і cancellation backend operation — не завжди одне й те саме.

---

# 51. HTTP request cancellation

У браузері:

    controller.abort()

може припинити очікування/обробку `fetch()`.

Але потрібно розуміти повний flow:

    Browser
       ↓
    HTTP request
       ↓
    Server
       ↓
    Database

Скасування на browser side не гарантує автоматичного rollback усієї серверної операції.

---

# 52. AbortController та HTTP errors

Це різні речі.

Наприклад:

    HTTP 404

не означає cancellation.

А:

    controller.abort()

означає cancellation signal.

Можливі три різні результати:

    success

    HTTP error

    cancellation

Їх потрібно обробляти окремо.

---

# 53. AbortController та network error

Так само:

    network error
        ≠
    abort

Наприклад:

    server unavailable

і:

    user clicked Cancel

можуть обидва потрапити в `catch`, але це різні ситуації.

Тому:

    if (error.name === 'AbortError') {
        // cancellation
    } else {
        // actual failure
    }

---

# 54. Типовий production-style flow

    async function loadUsers(signal) {
        try {
            const response = await fetch('/api/users', {
                signal,
            });

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            return await response.json();
        } catch (error) {
            if (error.name === 'AbortError') {
                return;
            }

            throw error;
        }
    }

Caller:

    const controller = new AbortController();

    try {
        const users = await loadUsers(
            controller.signal
        );

        renderUsers(users);
    } catch (error) {
        showError(
            'Не вдалося завантажити користувачів'
        );
    }

Cancel:

    controller.abort();

---

# 55. Типові помилки

## 55.1. Плутати race та cancellation

Погано думати:

    Promise.race()
        =
    cancel request

Ні.

`Promise.race()` лише вибирає перший settled Promise.

---

## 55.2. Повторно використовувати aborted controller

Погано:

    const controller = new AbortController();

    controller.abort();

    fetch('/api/data', {
        signal: controller.signal,
    });

Цей signal вже aborted.

Для нової операції:

    const controller = new AbortController();

---

## 55.3. Показувати cancellation як error

Погано:

    catch (error) {
        showError('Request failed');
    }

якщо користувач сам натиснув Cancel.

Краще:

    catch (error) {
        if (error.name === 'AbortError') {
            return;
        }

        showError('Request failed');
    }

---

## 55.4. Вважати, що abort зупиняє сервер

    controller.abort()

не означає автоматично:

    server.stop()

Це різні рівні системи.

---

## 55.5. Не передавати signal вниз

Погано:

    async function loadUsers(signal) {
        return fetch('/api/users');
    }

Тут `signal` фактично не використовується.

Правильно:

    async function loadUsers(signal) {
        return fetch('/api/users', {
            signal,
        });
    }

---

# 56. Практична вправа №1 — базовий abort

Створити:

    const controller = new AbortController();

    fetch('/api/data', {
        signal: controller.signal,
    });

Через кілька секунд:

    controller.abort();

Перевірити `catch`.

---

# 57. Практична вправа №2 — перевірка aborted

    const controller = new AbortController();

    console.log(controller.signal.aborted);

    controller.abort();

    console.log(controller.signal.aborted);

Очікувано:

    false
    true

---

# 58. Практична вправа №3 — AbortError

Створити fetch:

    try {
        await fetch('/api/data', {
            signal: controller.signal,
        });
    } catch (error) {
        console.log(error.name);
    }

Скасувати request.

Перевірити:

    AbortError

---

# 59. Практична вправа №4 — Cancel button

Створити два buttons:

    Load
    Cancel

`Load` запускає fetch.

`Cancel` викликає:

    controller.abort();

При cancellation не показувати повідомлення про помилку.

---

# 60. Практична вправа №5 — search cancellation

Створити поле:

    <input id="search">

При кожній зміні input:

    abort previous request
        ↓
    create new controller
        ↓
    fetch new query

Мета:

навчитися уникати зайвих запитів та stale results.

---

# 61. Практична вправа №6 — timeout

Використати:

    AbortSignal.timeout(3000)

Разом із:

    fetch()

Перевірити поведінку при довгому запиті.

---

# 62. Практична вправа №7 — manual cancel + timeout

Створити:

    const controller = new AbortController();

    const signal = AbortSignal.any([
        controller.signal,
        AbortSignal.timeout(5000),
    ]);

Використати signal для:

    fetch()

Тепер операція повинна завершитися cancellation:

- при ручному `controller.abort()`;
- або після timeout.

---

# 63. Практична вправа №8 — group cancellation

Створити:

    const controller = new AbortController();

Запустити:

    fetch('/api/users', {
        signal: controller.signal,
    });

    fetch('/api/posts', {
        signal: controller.signal,
    });

Потім:

    controller.abort();

Перевірити, що обидві операції отримали cancellation.

---

# 64. Практична вправа №9 — Promise.all + AbortController

Створити:

    const controller = new AbortController();

    try {
        const responses = await Promise.all([
            fetch('/api/users', {
                signal: controller.signal,
            }),
            fetch('/api/posts', {
                signal: controller.signal,
            }),
        ]);

        console.log(responses);
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Cancelled');
        }
    }

Потім додати кнопку Cancel.

---

# 65. Практична вправа №10 — власна async function

Створити:

    async function processData(signal) {
        signal.throwIfAborted();

        const data = await loadData();

        signal.throwIfAborted();

        return process(data);
    }

Ззовні:

    const controller = new AbortController();

    processData(controller.signal);

Скасування:

    controller.abort();

Мета:

зрозуміти, що cancellation можна передавати не тільки `fetch()`, а й власним функціям.

---

# 66. Практичний pattern: reusable API function

Хороший варіант для майбутньої frontend-практики:

    async function getUsers({
        signal,
    } = {}) {
        const response = await fetch('/api/users', {
            signal,
        });

        if (!response.ok) {
            throw new Error(
                `HTTP ${response.status}`
            );
        }

        return response.json();
    }

Тепер можна викликати:

    const controller = new AbortController();

    const users = await getUsers({
        signal: controller.signal,
    });

А за потреби:

    controller.abort();

---

# 67. Optional signal

Можна зробити `signal` необов'язковим:

    async function getUsers({
        signal,
    } = {}) {
        const response = await fetch('/api/users', {
            signal,
        });

        return response.json();
    }

Тоді працюватиме:

    getUsers();

і:

    const controller = new AbortController();

    getUsers({
        signal: controller.signal,
    });

Це зручно для reusable service functions.

---

# 68. Cancellation як частина API функції

Якщо функція підтримує cancellation, це варто враховувати в її API:

    async function loadData({
        signal,
    } = {}) {
        // ...
    }

Це дозволяє caller вирішувати:

- коли почати;
- коли скасувати;
- скільки чекати.

---

# 69. Загальна архітектура cancellation

    UI
     │
     │ creates
     ↓
    AbortController
     │
     │ signal
     ↓
    service function
     │
     │ signal
     ↓
    fetch
     │
     ↓
    API

При cancel:

    UI
     ↓
    controller.abort()
     ↓
    signal.aborted
     ↓
    fetch rejects
     ↓
    AbortError
     ↓
    cleanup

---

# 70. Зв'язок з попереднім розділом

У попередній темі:

    09-promise-combinators

ми розглядали:

    Promise.race()

Наприклад:

    Promise.race([
        fetch('/api/data'),
        timeout(5000),
    ]);

Проблема:

`race()` не скасовує fetch.

Тепер:

    AbortController

дозволяє передати cancellation signal безпосередньо `fetch()`.

---

# 71. Зв'язок із наступними темами

Після `AbortController` важливо зрозуміти:

    11-event-loop

Там ми розберемо:

- call stack;
- task queue;
- microtask queue;
- Promise callbacks;
- timers;
- event loop;
- порядок виконання async code.

Після цього:

    12-api-crud-project

де можна об'єднати:

    fetch
    HTTP
    error handling
    Promise combinators
    AbortController
    async/await

в один практичний API CRUD проєкт.

---

# 72. Рівні знань

## 🟢 Core

Потрібно знати:

- що таке `AbortController`;
- що таке `AbortSignal`;
- `controller.signal`;
- `controller.abort()`;
- `signal.aborted`;
- як скасувати `fetch()`;
- що cancellation викликає rejection;
- що таке `AbortError`.

---

## 🔵 Junior

Потрібно вміти:

- передавати `signal` у `fetch()`;
- обробляти `AbortError`;
- створювати Cancel button;
- скасовувати попередній request;
- використовувати `AbortSignal.timeout()`;
- використовувати `AbortSignal.any()`;
- використовувати один signal для декількох requests;
- правильно робити cleanup;
- відрізняти cancellation від network/HTTP error;
- передавати `signal` через service functions.

---

## 🟠 Middle

Потрібно розуміти:

- cancellation propagation;
- request lifecycle;
- race conditions;
- stale requests;
- component lifecycle;
- group cancellation;
- timeout architecture;
- cancellation у service layer;
- client vs server cancellation;
- concurrency control;
- retry + cancellation;
- cleanup strategies.

---

## 🔴 Senior

Потрібно розуміти:

- cancellation propagation у великих системах;
- distributed cancellation;
- request deadlines;
- timeout propagation;
- cancellation tokens;
- resource management;
- backpressure;
- graceful shutdown;
- server-side cancellation;
- database query cancellation;
- cascading cancellation;
- observability cancellation events.

---

# 73. Питання для співбесіди

### Базові

**Що таке AbortController?**

API для створення механізму скасування асинхронних операцій.

---

**Що таке AbortSignal?**

Об'єкт, через який асинхронна операція отримує сигнал про cancellation.

---

**Як скасувати fetch?**

    const controller = new AbortController();

    fetch(url, {
        signal: controller.signal,
    });

    controller.abort();

---

**Що станеться з fetch після abort?**

Його Promise буде rejected, зазвичай із `AbortError`.

---

**Що таке signal.aborted?**

Boolean, який показує, чи був signal aborted.

---

### Практичні

**Чи можна повторно використовувати aborted AbortController?**

Ні. Для нової операції потрібно створити новий controller.

---

**Чи скасовує Promise.race() програвший Promise?**

Ні.

---

**Чи скасовує AbortController серверну операцію?**

Не обов'язково. Client-side cancellation не гарантує автоматичної зупинки вже розпочатої роботи на сервері.

---

**Чи є AbortError звичайною програмною помилкою?**

Не обов'язково. Cancellation часто є очікуваною подією.

---

**Для чого потрібен AbortSignal.timeout()?**

Для створення signal, який автоматично переходить у aborted state після заданого часу.

---

**Для чого потрібен AbortSignal.any()?**

Для створення signal, який буде aborted, коли буде aborted хоча б один із переданих signals.

---

**Чи може один signal використовуватися декількома fetch?**

Так.

---

# 74. Міні-шпаргалка

## Створити controller

    const controller = new AbortController();

## Отримати signal

    const signal = controller.signal;

## Передати у fetch

    fetch('/api/data', {
        signal,
    });

## Скасувати

    controller.abort();

## Перевірити

    signal.aborted

## Причина

    signal.reason

## Обробити cancellation

    try {
        await fetch('/api/data', {
            signal,
        });
    } catch (error) {
        if (error.name === 'AbortError') {
            console.log('Cancelled');
        } else {
            console.error(error);
        }
    }

## Timeout

    fetch('/api/data', {
        signal: AbortSignal.timeout(5000),
    });

## Manual cancel + timeout

    const controller = new AbortController();

    const signal = AbortSignal.any([
        controller.signal,
        AbortSignal.timeout(5000),
    ]);

## Передати signal у власну функцію

    async function loadData(signal) {
        signal.throwIfAborted();

        // async work
    }

---

# 75. Найкоротша пам'ятка

    AbortController
        ↓
    creates
        ↓
    AbortSignal
        ↓
    passed to operation
        ↓
    controller.abort()
        ↓
    signal.aborted === true
        ↓
    operation cancels
        ↓
    AbortError / cancellation reason

Для `fetch()`:

    const controller = new AbortController();

    try {
        const response = await fetch('/api/data', {
            signal: controller.signal,
        });

        return await response.json();
    } catch (error) {
        if (error.name === 'AbortError') {
            return;
        }

        throw error;
    }

Пізніше:

    controller.abort();

---

# 76. Головне

У попередньому розділі ми навчилися координувати Promise:

    Promise.all()
    Promise.allSettled()
    Promise.race()
    Promise.any()

Тепер додаємо ще одну важливу можливість:

    cancellation

Основна модель:

    start operation
          ↓
    pass signal
          ↓
    operation running
          ↓
    controller.abort()
          ↓
    operation receives signal
          ↓
    cancellation
          ↓
    cleanup

Найважливіша відмінність:

> **`Promise.race()` визначає, який Promise буде результатом гонки. `AbortController` дозволяє сигналізувати операції, що її потрібно скасувати.**

Для frontend-розробника особливо важливі три сценарії:

    1. User cancellation
       ↓
       Cancel button

    2. Timeout
       ↓
       AbortSignal.timeout()

    3. Stale request cancellation
       ↓
       abort previous search/request

І ще одне правило:

> **Cancellation — це не обов'язково помилка. Якщо користувач сам скасував операцію, це нормальний сценарій, який потрібно коректно обробити.**

Після цього розділу асинхронна модель JavaScript уже виглядає значно повніше:

    async/await
        ↓
    Promise
        ↓
    fetch
        ↓
    HTTP
        ↓
    error handling
        ↓
    Promise combinators
        ↓
    cancellation
        ↓
    event loop

А наступний крок:

    11-event-loop

допоможе зрозуміти, **що саме відбувається всередині JavaScript під час виконання всього цього асинхронного коду**.