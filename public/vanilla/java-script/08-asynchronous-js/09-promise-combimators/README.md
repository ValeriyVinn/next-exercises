# 09. Promise Combinators

**Promise combinators** — це методи `Promise`, які дозволяють працювати з **кількома Promise одночасно** та визначати, як обробляти їхні результати.

У реальних застосунках часто потрібно виконати декілька асинхронних операцій:

- завантажити користувача та його пости;
- отримати дані з декількох API;
- виконати декілька незалежних запитів;
- дочекатися завершення всіх операцій;
- отримати перший успішний результат;
- отримати перший завершений Promise;
- зібрати результати як успішних, так і невдалих операцій.

Основні Promise combinators:

- `Promise.all()`
- `Promise.allSettled()`
- `Promise.race()`
- `Promise.any()`

Також важливо розуміти:

- iterable;
- fulfillment;
- rejection;
- short-circuit behavior;
- порядок результатів;
- concurrency vs sequential execution;
- `AggregateError`.

---

# Ключові поняття

- ✅ `Promise.all()`
- ✅ `Promise.allSettled()`
- ✅ `Promise.race()`
- ✅ `Promise.any()`
- ✅ `Promise.all` vs `Promise.allSettled`
- ✅ `Promise.race` vs `Promise.any`
- ✅ fulfilled
- ✅ rejected
- ✅ pending
- ✅ short-circuit
- ✅ `AggregateError`
- ✅ порядок результатів
- ✅ паралельний запуск Promise
- ✅ незалежні асинхронні операції
- ✅ обробка помилок
- ✅ timeout pattern
- ✅ fallback API
- ✅ first response
- ✅ `async/await`

---

# Що потрібно пам'ятати

- `Promise.all()` чекає на **всі успішні Promise** або завершується помилкою при першому rejection.
- `Promise.allSettled()` чекає на **всі Promise незалежно від результату**.
- `Promise.race()` повертає результат **першого Promise, який завершився** — успішно або з помилкою.
- `Promise.any()` повертає **перший успішний Promise**.
- Якщо всі Promise у `Promise.any()` rejected, він повертає `AggregateError`.
- `Promise.all()` зберігає порядок результатів відповідно до порядку вхідного масиву.
- Promise combinators не обов'язково запускають операції послідовно.
- Якщо Promise вже створені, їхня робота може початися ще до виклику combinator.
- `Promise.all()` добре підходить для незалежних операцій, які потрібні всі разом.
- `Promise.allSettled()` підходить, коли failure однієї операції не повинен зупиняти інші.
- `Promise.race()` часто використовують для timeout.
- `Promise.any()` зручний для fallback або декількох альтернативних серверів.
- Combinators працюють з iterable, найчастіше — масивом Promise.
- `Promise.all()` не скасовує інші Promise автоматично після rejection.
- `Promise.race()` також не скасовує Promise, які програли гонку.
- Для реального скасування асинхронної операції потрібні окремі механізми, наприклад `AbortController`.

---

# 1. Навіщо потрібні Promise combinators

Припустимо, потрібно завантажити:

    users
    posts
    comments

Можна виконувати запити послідовно:

    const users = await loadUsers();
    const posts = await loadPosts();
    const comments = await loadComments();

Це означає:

    loadUsers()
        ↓
    loadPosts()
        ↓
    loadComments()

Якщо операції незалежні, це може бути непотрібно повільно.

---

# 2. Паралельний запуск

Можна запустити операції одночасно:

    const usersPromise = loadUsers();
    const postsPromise = loadPosts();
    const commentsPromise = loadComments();

    const users = await usersPromise;
    const posts = await postsPromise;
    const comments = await commentsPromise;

Ще зручніше:

    const [
        users,
        posts,
        comments,
    ] = await Promise.all([
        loadUsers(),
        loadPosts(),
        loadComments(),
    ]);

Тепер концептуально:

    loadUsers()    ────────┐
    loadPosts()    ────────┤
    loadComments() ────────┤
                           ↓
                       Promise.all()
                           ↓
                         result

---

# 3. Promise.all()

`Promise.all()` використовується, коли потрібно:

**успішно завершити всі операції.**

Синтаксис:

    Promise.all(iterable)

Наприклад:

    const results = await Promise.all([
        promise1,
        promise2,
        promise3,
    ]);

---

# 4. Promise.all() — базовий приклад

    const promise1 = Promise.resolve(10);
    const promise2 = Promise.resolve(20);
    const promise3 = Promise.resolve(30);

    const result = await Promise.all([
        promise1,
        promise2,
        promise3,
    ]);

    console.log(result);

Результат:

    [10, 20, 30]

---

# 5. Promise.all() повертає масив

Якщо всі Promise успішні:

    const result = await Promise.all([
        Promise.resolve('A'),
        Promise.resolve('B'),
        Promise.resolve('C'),
    ]);

Результат:

    ['A', 'B', 'C']

---

# 6. Порядок результатів

Дуже важливо:

`Promise.all()` повертає результати **в тому самому порядку, у якому Promise були передані**.

Наприклад:

    const slow = new Promise(resolve => {
        setTimeout(() => resolve('slow'), 1000);
    });

    const fast = new Promise(resolve => {
        setTimeout(() => resolve('fast'), 100);
    });

    const result = await Promise.all([
        slow,
        fast,
    ]);

Результат:

    ['slow', 'fast']

Навіть якщо `fast` завершився першим.

---

# 7. Promise.all() не означає послідовне виконання

Це важлива відмінність.

    Promise.all([
        loadUsers(),
        loadPosts(),
        loadComments(),
    ]);

Функції викликаються незалежно.

Концептуально:

    loadUsers()    ────────────┐
    loadPosts()    ───────┐    │
    loadComments() ───────┼────┘
                          ↓
                     all complete

---

# 8. Promise.all() та rejection

Якщо один Promise rejected:

    const result = await Promise.all([
        Promise.resolve('A'),
        Promise.reject(new Error('Failed')),
        Promise.resolve('C'),
    ]);

`Promise.all()` буде rejected.

Типовий результат:

    Error: Failed

---

# 9. Promise.all() з try/catch

    try {
        const [users, posts] = await Promise.all([
            loadUsers(),
            loadPosts(),
        ]);

        console.log(users);
        console.log(posts);
    } catch (error) {
        console.error(error);
    }

Якщо будь-яка операція завершується rejection, виконання переходить у `catch`.

---

# 10. Short-circuit у Promise.all()

`Promise.all()` завершується rejected, коли отримує rejection.

Наприклад:

    const result = await Promise.all([
        Promise.resolve('A'),
        Promise.reject(new Error('Failed')),
        Promise.resolve('C'),
    ]);

Тут не буде нормального результату:

    ['A', ..., 'C']

Замість цього весь `Promise.all()` стає rejected.

---

# 11. Promise.all() не скасовує інші Promise

Це дуже важливий момент.

Наприклад:

    const slow = new Promise(resolve => {
        setTimeout(() => {
            console.log('slow finished');
            resolve('slow');
        }, 3000);
    });

    const failed = Promise.reject(
        new Error('failed')
    );

    try {
        await Promise.all([
            slow,
            failed,
        ]);
    } catch (error) {
        console.error(error);
    }

`Promise.all()` завершиться з помилкою швидко.

Але `slow` Promise сам по собі не буде автоматично скасований.

---

# 12. Коли використовувати Promise.all()

Використовуй `Promise.all()`, коли:

- потрібні всі результати;
- операції незалежні;
- failure однієї операції означає, що загальний результат не потрібен.

Наприклад:

    const [user, posts, comments] = await Promise.all([
        loadUser(),
        loadPosts(),
        loadComments(),
    ]);

Якщо всі три потрібні для сторінки — `Promise.all()` дуже природний вибір.

---

# 13. Promise.allSettled()

`Promise.allSettled()` чекає на завершення **всіх Promise**.

Не має значення:

- fulfilled;
- rejected.

Синтаксис:

    Promise.allSettled(iterable)

---

# 14. Promise.allSettled() — базовий приклад

    const results = await Promise.allSettled([
        Promise.resolve('A'),
        Promise.reject(new Error('Failed')),
        Promise.resolve('C'),
    ]);

Результат буде приблизно таким:

    [
        {
            status: 'fulfilled',
            value: 'A'
        },
        {
            status: 'rejected',
            reason: Error(...)
        },
        {
            status: 'fulfilled',
            value: 'C'
        }
    ]

---

# 15. fulfilled result

Для успішного Promise:

    {
        status: 'fulfilled',
        value: ...
    }

Наприклад:

    {
        status: 'fulfilled',
        value: 42
    }

---

# 16. rejected result

Для невдалого Promise:

    {
        status: 'rejected',
        reason: ...
    }

Наприклад:

    {
        status: 'rejected',
        reason: Error('Failed')
    }

---

# 17. Перевірка allSettled()

Наприклад:

    const results = await Promise.allSettled([
        loadUsers(),
        loadPosts(),
        loadComments(),
    ]);

    results.forEach(result => {
        if (result.status === 'fulfilled') {
            console.log('Success:', result.value);
        } else {
            console.error('Failed:', result.reason);
        }
    });

---

# 18. allSettled() не зупиняється через помилку

Наприклад:

    const results = await Promise.allSettled([
        Promise.resolve('Users'),
        Promise.reject(new Error('Posts failed')),
        Promise.resolve('Comments'),
    ]);

У результаті ми все одно отримаємо інформацію про:

    Users
    Posts failed
    Comments

---

# 19. Коли використовувати Promise.allSettled()

Використовуй `Promise.allSettled()`, коли:

- операції незалежні;
- потрібно отримати результат кожної;
- failure однієї операції не повинен зупиняти інші;
- потрібно показати частково завантажені дані;
- потрібно виконати batch operations;
- потрібно отримати звіт про всі операції.

---

# 20. Приклад: dashboard

Уявімо dashboard:

    users
    statistics
    notifications
    recommendations

Необов'язково, щоб failure recommendations ламав весь dashboard.

    const results = await Promise.allSettled([
        loadUsers(),
        loadStatistics(),
        loadNotifications(),
        loadRecommendations(),
    ]);

Можна показати:

    users          → success
    statistics     → success
    notifications  → success
    recommendations → unavailable

Це хороший сценарій для `Promise.allSettled()`.

---

# 21. Promise.race()

`Promise.race()` повертає результат **першого Promise, який settled**.

Тобто перший:

    fulfilled

або:

    rejected

Синтаксис:

    Promise.race(iterable)

---

# 22. Promise.race() — базовий приклад

    const result = await Promise.race([
        Promise.resolve('A'),
        Promise.resolve('B'),
    ]);

Результат залежить від того, який Promise був settled першим.

---

# 23. race() з таймерами

Класичний приклад:

    const fast = new Promise(resolve => {
        setTimeout(() => {
            resolve('Fast');
        }, 100);
    });

    const slow = new Promise(resolve => {
        setTimeout(() => {
            resolve('Slow');
        }, 1000);
    });

    const result = await Promise.race([
        fast,
        slow,
    ]);

Результат:

    Fast

---

# 24. race() може повернути rejection

Це принципова відмінність від `Promise.any()`.

Наприклад:

    const failed = new Promise((resolve, reject) => {
        setTimeout(() => {
            reject(new Error('Failed'));
        }, 100);
    });

    const slow = new Promise(resolve => {
        setTimeout(() => {
            resolve('Success');
        }, 1000);
    });

    try {
        const result = await Promise.race([
            failed,
            slow,
        ]);
    } catch (error) {
        console.error(error);
    }

Оскільки rejection стався першим, `race()` rejected.

---

# 25. Коли використовувати Promise.race()

`Promise.race()` підходить, коли нас цікавить:

**хто завершиться першим.**

Наприклад:

- timeout;
- перша відповідь;
- гонка між операціями;
- обмеження часу очікування;
- конкурентні джерела.

---

# 26. Promise.race() для timeout

Класичний патерн:

    const timeout = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('Timeout'));
        }, 5000);
    });

    const request = fetch('/api/users');

    const response = await Promise.race([
        request,
        timeout,
    ]);

Якщо timeout завершиться першим, `race()` буде rejected.

---

# 27. Важливе обмеження timeout через race

`Promise.race()` не скасовує програвший Promise.

Наприклад:

    const request = fetch('/api/users');

    const timeout = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error('Timeout'));
        }, 5000);
    });

    await Promise.race([
        request,
        timeout,
    ]);

Якщо timeout переміг, сам `fetch()` може продовжувати виконуватися.

Для реального скасування запиту потрібен:

    AbortController

Це буде окрема тема:

    10-abort-controller

---

# 28. Promise.any()

`Promise.any()` повертає **перший успішний Promise**.

Це дуже важливо.

На відміну від `Promise.race()`:

`race()`:

    перший settled

`any()`:

    перший fulfilled

---

# 29. Promise.any() — базовий приклад

    const result = await Promise.any([
        Promise.reject(new Error('Failed 1')),
        Promise.resolve('Success'),
        Promise.resolve('Another success'),
    ]);

Результат:

    Success

Перший Promise rejected, але це не проблема.

`Promise.any()` продовжує чекати на перший успішний результат.

---

# 30. Promise.any() і кілька помилок

Наприклад:

    const result = await Promise.any([
        Promise.reject(new Error('Server 1 failed')),
        Promise.reject(new Error('Server 2 failed')),
        Promise.resolve('Server 3 success'),
    ]);

Результат:

    Server 3 success

---

# 31. Якщо всі Promise rejected

Тоді:

    Promise.any([
        Promise.reject(new Error('A')),
        Promise.reject(new Error('B')),
        Promise.reject(new Error('C')),
    ]);

завершиться:

    AggregateError

---

# 32. AggregateError

`AggregateError` містить інформацію про всі помилки.

Наприклад:

    try {
        await Promise.any([
            Promise.reject(new Error('Server A')),
            Promise.reject(new Error('Server B')),
            Promise.reject(new Error('Server C')),
        ]);
    } catch (error) {
        console.log(error instanceof AggregateError);
        console.log(error.errors);
    }

`error.errors` містить масив причин rejection.

---

# 33. Promise.any() — fallback servers

Уявімо, що є три сервери:

    serverA
    serverB
    serverC

Потрібен будь-який доступний сервер.

    const response = await Promise.any([
        fetch('https://server-a.example.com/data'),
        fetch('https://server-b.example.com/data'),
        fetch('https://server-c.example.com/data'),
    ]);

Тут неважливо, який сервер відповість першим.

Потрібен:

**перший успішний результат.**

---

# 34. Promise.any() — fallback API

Наприклад:

    const data = await Promise.any([
        loadFromPrimaryApi(),
        loadFromBackupApi(),
        loadFromCacheApi(),
    ]);

Якщо primary API не працює, можна отримати результат від backup.

---

# 35. Чотири основні combinators

| Метод | Чого чекає | Якщо один rejected | Результат |
|---|---|---|---|
| `Promise.all()` | усі fulfilled | весь Promise rejected | масив values |
| `Promise.allSettled()` | усі settled | не зупиняється | масив результатів |
| `Promise.race()` | перший settled | якщо перший rejected → rejected | перший результат |
| `Promise.any()` | перший fulfilled | продовжує чекати | перший success |

Цю таблицю варто знати напам'ять.

---

# 36. all vs allSettled

Головне питання:

**Чи потрібні мені всі успішні результати?**

Якщо так:

    Promise.all()

Якщо потрібно знати результат кожної операції:

    Promise.allSettled()

---

# 37. race vs any

Головне питання:

**Мене цікавить перший завершений чи перший успішний?**

Перший завершений:

    Promise.race()

Перший успішний:

    Promise.any()

---

# 38. Візуальна модель

## Promise.all()

    A ─────────── success ──┐
    B ───── success ───────┤
    C ───────── success ───┤
                           ↓
                         ALL
                           ↓
                      [A, B, C]

Якщо один rejected:

    A ───── success
    B ───── rejected ─────→ ALL rejected
    C ─────────────── success

---

## Promise.allSettled()

    A ───── success ───────┐
    B ───── rejected ──────┤
    C ───── success ──────┤
                          ↓
                     ALL SETTLED
                          ↓
                    [success,
                     rejected,
                     success]

---

## Promise.race()

    A ───────── success ──→ RACE RESULT

    B ──────────────────────

    C ──────────────────────

Цікавить перший settled.

---

## Promise.any()

    A ───── rejected ──────┐
    B ───── rejected ──────┤
    C ───── success ──────→ ANY RESULT

Цікавить перший fulfilled.

---

# 39. Promise combinators та async/await

Усі combinators чудово поєднуються з `async/await`.

Наприклад:

    async function loadDashboard() {
        const [users, posts, stats] = await Promise.all([
            loadUsers(),
            loadPosts(),
            loadStats(),
        ]);

        return {
            users,
            posts,
            stats,
        };
    }

---

# 40. Combinators та destructuring

`Promise.all()` часто використовують разом із destructuring:

    const [
        users,
        posts,
        comments,
    ] = await Promise.all([
        loadUsers(),
        loadPosts(),
        loadComments(),
    ]);

Це один із найпрактичніших патернів.

---

# 41. Послідовне vs паралельне виконання

## Послідовно

    const users = await loadUsers();
    const posts = await loadPosts();
    const comments = await loadComments();

Якщо кожен запит займає приблизно 1 секунду:

    ~3 секунди

---

## Паралельно

    const [users, posts, comments] = await Promise.all([
        loadUsers(),
        loadPosts(),
        loadComments(),
    ]);

Приблизно:

    ~1 секунда

Це спрощена модель, реальний час залежить від мережі, сервера та інших факторів.

---

# 42. Важлива умова для паралельного виконання

Паралельний запуск підходить, якщо операції **незалежні**.

Наприклад:

    loadUsers()
    loadPosts()
    loadComments()

можуть бути незалежними.

Але якщо:

    const user = await loadUser();

і тільки після цього можна:

    loadUserPosts(user.id);

то `Promise.all()` не допоможе.

Тут є залежність:

    loadUser()
        ↓
    user.id
        ↓
    loadUserPosts()

---

# 43. Promise.all() та залежності

Неправильно:

    const [user, posts] = await Promise.all([
        loadUser(),
        loadUserPosts(user.id),
    ]);

`user` ще не існує в момент створення другого Promise.

Правильно:

    const user = await loadUser();

    const posts = await loadUserPosts(user.id);

---

# 44. Combinators не замінюють логіку залежностей

Важливо розуміти:

`Promise.all()` — не "запускай усе завжди паралельно".

Він потрібен для:

**незалежних операцій.**

Якщо одна операція потребує результат іншої — спочатку потрібно отримати першу.

---

# 45. Promise.all() з функціями

Розглянемо:

    const promises = [
        loadUsers(),
        loadPosts(),
        loadComments(),
    ];

    const results = await Promise.all(promises);

Promise вже створені та запущені.

---

# 46. Promise та функції — не одне й те саме

Можна зберігати функції:

    const loaders = [
        loadUsers,
        loadPosts,
        loadComments,
    ];

А потім:

    const promises = loaders.map(loader => loader());

    const results = await Promise.all(promises);

Тепер виклик відбувається в `map()`.

Це корисно для динамічних batch operations.

---

# 47. Promise.all() з масивом

Наприклад, потрібно завантажити декілька користувачів:

    const ids = [1, 2, 3, 4, 5];

    const users = await Promise.all(
        ids.map(id => loadUser(id))
    );

Тепер:

    users

містить результати всіх запитів.

---

# 48. Batch requests

Це дуже поширений патерн:

    const ids = [10, 20, 30];

    const users = await Promise.all(
        ids.map(id => fetch(`/api/users/${id}`))
    );

У реальному коді потрібно також обробити:

- HTTP status;
- JSON;
- network errors;
- rate limits;
- concurrency limits.

---

# 49. Promise.allSettled() для batch operations

Якщо потрібно отримати інформацію про кожен запит:

    const results = await Promise.allSettled(
        ids.map(id => loadUser(id))
    );

Тепер можна визначити:

    success
    failure
    success
    success
    failure

Це корисно для масових операцій.

---

# 50. Обробка часткових помилок

Наприклад:

    const results = await Promise.allSettled([
        loadProfile(),
        loadPosts(),
        loadRecommendations(),
    ]);

Потім:

    const successful = results
        .filter(result => result.status === 'fulfilled')
        .map(result => result.value);

Можна отримати тільки успішні результати.

---

# 51. Відокремлення success та failure

    const results = await Promise.allSettled([
        operation1(),
        operation2(),
        operation3(),
    ]);

    const successful = results.filter(
        result => result.status === 'fulfilled'
    );

    const failed = results.filter(
        result => result.status === 'rejected'
    );

Тепер маємо дві групи:

    successful
    failed

---

# 52. Retry та Promise combinators

Combinators самі по собі не реалізують retry.

Наприклад:

    Promise.any([
        request1(),
        request2(),
        request3(),
    ]);

Це не те саме, що:

    retry request1
    retry request1
    retry request1

Retry — окрема логіка.

---

# 53. Promise.race() як timeout pattern

Базовий патерн:

    function timeout(ms) {
        return new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('Timeout'));
            }, ms);
        });
    }

Потім:

    const response = await Promise.race([
        fetch('/api/data'),
        timeout(5000),
    ]);

Це означає:

    request
       VS
    timeout

Хто завершиться першим — той і визначає результат `race()`.

---

# 54. Promise.race() — не cancellation

Це потрібно запам'ятати:

    Promise.race()
        ≠
    cancellation

`race()` лише визначає, який Promise буде результатом combinator.

Програвший Promise може продовжити виконання.

Для скасування:

    AbortController

---

# 55. Promise.any() та fallback

Наприклад:

    const data = await Promise.any([
        loadFromCache(),
        loadFromPrimaryApi(),
        loadFromBackupApi(),
    ]);

Це може бути корисним, якщо будь-яке джерело підходить.

Але важливо:

якщо cache повертає застарілі дані, "перший успішний" не завжди означає "найкращий".

Combinator не знає бізнес-логіку.

---

# 56. Combinator вибирається за бізнес-логікою

Постав питання:

### Потрібні всі результати?

    Promise.all()

### Потрібні результати всіх операцій незалежно від помилок?

    Promise.allSettled()

### Потрібен перший завершений?

    Promise.race()

### Потрібен перший успішний?

    Promise.any()

Це найпростіший спосіб запам'ятати API.

---

# 57. Помилки та Promise.all()

Наприклад:

    try {
        const [users, posts] = await Promise.all([
            loadUsers(),
            loadPosts(),
        ]);

        render(users, posts);
    } catch (error) {
        showError('Failed to load dashboard');
    }

Якщо один запит failed, загальний dashboard не рендериться.

Це добре, якщо dashboard неможливий без обох ресурсів.

---

# 58. Помилки та Promise.allSettled()

Якщо dashboard може працювати частково:

    const results = await Promise.allSettled([
        loadUsers(),
        loadPosts(),
    ]);

    if (results[0].status === 'fulfilled') {
        renderUsers(results[0].value);
    }

    if (results[1].status === 'fulfilled') {
        renderPosts(results[1].value);
    }

Тут один failure не блокує інший компонент.

---

# 59. Типовий frontend-сценарій

Уявімо сторінку:

    User profile
    Posts
    Recommendations

Можна:

    const results = await Promise.allSettled([
        loadProfile(),
        loadPosts(),
        loadRecommendations(),
    ]);

Потім незалежно від результатів:

    profile
        ↓
    show or error

    posts
        ↓
    show or error

    recommendations
        ↓
    show or error

Це створює більш стійкий UI.

---

# 60. Типовий full-stack сценарій

Frontend:

    Promise.all([
        fetch('/api/users'),
        fetch('/api/posts'),
    ])

Backend:

    API
      ↓
    database
      ↓
    multiple queries
      ↓
    results

Але backend може використовувати Promise combinators лише тоді, коли операції справді незалежні.

---

# 61. Promise.all() та database operations

Наприклад, концептуально:

    const [users, posts] = await Promise.all([
        userRepository.findAll(),
        postRepository.findAll(),
    ]);

Якщо ці запити незалежні, їх можна виконувати конкурентно.

Але якщо друга операція залежить від першої:

    const user = await findUser();

    const posts = await findPostsByUser(
        user.id
    );

послідовність необхідна.

---

# 62. Promise.all() та ресурси

Не потрібно бездумно запускати сотні або тисячі операцій:

    await Promise.all(
        thousandsOfItems.map(item => process(item))
    );

Це може створити:

- надмірне навантаження;
- занадто багато HTTP-запитів;
- перевищення rate limit;
- проблеми з пам'яттю;
- навантаження на database.

У таких випадках потрібне **обмеження concurrency**.

Це вже більш просунутий рівень.

---

# 63. Concurrency limit

Замість:

    1000 requests at once

можна організувати:

    10 requests
        ↓
    next 10
        ↓
    next 10
        ↓
    ...

Для цього часто використовують:

- черги;
- worker pools;
- concurrency limiters;
- власну async-логіку.

Сам `Promise.all()` такого обмеження не дає.

---

# 64. Часті помилки

## 64.1. Виконувати незалежні операції послідовно

Погано:

    const users = await loadUsers();
    const posts = await loadPosts();
    const comments = await loadComments();

Якщо вони незалежні, можна:

    const [users, posts, comments] = await Promise.all([
        loadUsers(),
        loadPosts(),
        loadComments(),
    ]);

---

## 64.2. Використовувати Promise.all(), коли потрібен partial success

Якщо один ресурс необов'язковий:

    Promise.all()

може бути занадто суворим.

Краще розглянути:

    Promise.allSettled()

---

## 64.3. Плутати race та any

    Promise.race()

це:

    first settled

А:

    Promise.any()

це:

    first fulfilled

---

## 64.4. Думати, що race скасовує інші Promise

Ні.

    Promise.race()
        ≠
    cancellation

---

## 64.5. Думати, що all скасовує інші Promise

Також ні.

Якщо один Promise rejected, інші операції можуть продовжити виконуватися.

---

## 64.6. Забувати про AggregateError

Для:

    Promise.any()

якщо всі Promise rejected, потрібно бути готовим до:

    AggregateError

---

# 65. Типовий pattern для Promise.all()

    async function loadDashboard() {
        const [
            users,
            posts,
            statistics,
        ] = await Promise.all([
            loadUsers(),
            loadPosts(),
            loadStatistics(),
        ]);

        return {
            users,
            posts,
            statistics,
        };
    }

---

# 66. Типовий pattern для Promise.allSettled()

    async function loadDashboard() {
        const results = await Promise.allSettled([
            loadUsers(),
            loadPosts(),
            loadStatistics(),
        ]);

        return results;
    }

Потім:

    results.forEach(result => {
        if (result.status === 'fulfilled') {
            console.log(result.value);
        } else {
            console.error(result.reason);
        }
    });

---

# 67. Типовий pattern для Promise.race()

    async function loadWithTimeout() {
        return Promise.race([
            loadData(),
            timeout(5000),
        ]);
    }

Це базова модель timeout.

---

# 68. Типовий pattern для Promise.any()

    async function loadFromAnySource() {
        return Promise.any([
            loadFromPrimary(),
            loadFromBackup(),
            loadFromCache(),
        ]);
    }

Це базова модель fallback.

---

# 69. Практична вправа №1 — Promise.all()

Створити три Promise:

    const p1 = Promise.resolve('Users');
    const p2 = Promise.resolve('Posts');
    const p3 = Promise.resolve('Comments');

Отримати всі результати через:

    Promise.all()

Очікуваний результат:

    ['Users', 'Posts', 'Comments']

---

# 70. Практична вправа №2 — порядок

Створити:

    const slow = new Promise(resolve => {
        setTimeout(() => resolve('Slow'), 1000);
    });

    const fast = new Promise(resolve => {
        setTimeout(() => resolve('Fast'), 100);
    });

Виконати:

    const result = await Promise.all([
        slow,
        fast,
    ]);

Перевірити:

    ['Slow', 'Fast']

Пояснити собі:

**чому Fast завершився першим, але стоїть другим у результаті?**

---

# 71. Практична вправа №3 — Promise.all rejection

Створити:

    const result = await Promise.all([
        Promise.resolve('A'),
        Promise.reject(new Error('B failed')),
        Promise.resolve('C'),
    ]);

Обгорнути в:

    try/catch

і подивитися результат.

---

# 72. Практична вправа №4 — Promise.allSettled()

Створити:

    const results = await Promise.allSettled([
        Promise.resolve('A'),
        Promise.reject(new Error('B failed')),
        Promise.resolve('C'),
    ]);

Вивести:

    fulfilled
    rejected

окремо.

---

# 73. Практична вправа №5 — Promise.race()

Створити два Promise:

    fast
    slow

Використати:

    Promise.race()

Перевірити, який результат повернеться.

Потім зробити так, щоб першим був rejection.

Подивитися, що станеться.

---

# 74. Практична вправа №6 — Promise.any()

Створити:

    Promise.reject(...)
    Promise.reject(...)
    Promise.resolve(...)

Використати:

    Promise.any()

Переконатися, що результатом буде перший успішний Promise.

---

# 75. Практична вправа №7 — AggregateError

Зробити так, щоб усі Promise були rejected:

    try {
        await Promise.any([
            Promise.reject(new Error('A')),
            Promise.reject(new Error('B')),
            Promise.reject(new Error('C')),
        ]);
    } catch (error) {
        console.log(error instanceof AggregateError);
        console.log(error.errors);
    }

Зрозуміти:

    error.errors

містить причини всіх rejection.

---

# 76. Практична вправа №8 — Promise.all + fetch

Виконати декілька незалежних API-запитів:

    const responses = await Promise.all([
        fetch('/api/users'),
        fetch('/api/posts'),
        fetch('/api/comments'),
    ]);

Потім для кожної відповіді:

    response.ok

та:

    response.json()

У реальному коді також потрібно врахувати HTTP errors.

---

# 77. Практична вправа №9 — dashboard

Створити простий dashboard:

    users
    posts
    statistics

Завантажувати їх через:

    Promise.all()

Потім змінити реалізацію на:

    Promise.allSettled()

і зробити так, щоб dashboard міг частково відображатися при помилці одного API.

Це дуже хороша практична вправа для розуміння різниці між двома combinators.

---

# 78. Практична вправа №10 — timeout

Створити:

    function timeout(ms) {
        return new Promise((_, reject) => {
            setTimeout(() => {
                reject(new Error('Timeout'));
            }, ms);
        });
    }

Використати:

    await Promise.race([
        fetch('/api/data'),
        timeout(3000),
    ]);

Потім дослідити:

**чому timeout не скасовує сам `fetch()`?**

Відповідь приведе до:

    10-abort-controller

---

# 79. Як вибрати combinator

Постав собі одне питання.

### Потрібні всі?

    Promise.all()

### Потрібно знати результат кожного?

    Promise.allSettled()

### Потрібен перший завершений?

    Promise.race()

### Потрібен перший успішний?

    Promise.any()

Це головна шпаргалка цього розділу.

---

# 80. Порівняльна таблиця

| Combinator | Успіх | Rejection | Типовий use case |
|---|---|---|---|
| `Promise.all()` | усі fulfilled | один rejection → весь результат rejected | dashboard, залежні від результату всі ресурси |
| `Promise.allSettled()` | після завершення всіх | rejection не зупиняє | partial success, batch |
| `Promise.race()` | перший settled | перший може бути rejection | timeout, first response |
| `Promise.any()` | перший fulfilled | лише якщо всі rejected | fallback, backup servers |

---

# 81. Рівні знань

## 🟢 Core

Потрібно знати:

- що таке Promise combinators;
- `Promise.all()`;
- `Promise.allSettled()`;
- `Promise.race()`;
- `Promise.any()`;
- різницю між ними;
- fulfilled/rejected;
- порядок результатів `Promise.all()`;
- базову обробку помилок.

---

## 🔵 Junior

Потрібно вміти:

- використовувати `Promise.all()` з `async/await`;
- використовувати destructuring;
- паралельно завантажувати незалежні ресурси;
- використовувати `Promise.allSettled()` для partial success;
- використовувати `Promise.race()` для timeout;
- розуміти різницю `race()` та `any()`;
- обробляти `AggregateError`;
- розуміти, що combinators не скасовують Promise автоматично;
- розуміти залежності між асинхронними операціями;
- застосовувати combinators у frontend/API задачах.

---

## 🟠 Middle

Потрібно розуміти:

- concurrency;
- concurrency limits;
- batch processing;
- retry;
- backoff;
- timeout;
- cancellation;
- fallback strategies;
- partial failure;
- graceful degradation;
- конкурентний доступ до API;
- rate limits;
- resource management.

---

## 🔴 Senior

Потрібно розуміти:

- concurrency architecture;
- worker pools;
- queues;
- backpressure;
- distributed systems;
- fault tolerance;
- circuit breakers;
- retries with exponential backoff;
- idempotency;
- partial failures;
- hedged requests;
- request racing;
- cancellation propagation;
- resource exhaustion;
- distributed timeout design.

---

# 82. Питання для співбесіди

### Базові

**Що таке Promise combinators?**

Методи `Promise`, які дозволяють координувати декілька Promise.

**Які основні Promise combinators?**

    Promise.all()
    Promise.allSettled()
    Promise.race()
    Promise.any()

---

**Чим `Promise.all()` відрізняється від `Promise.allSettled()`?**

`Promise.all()` rejected, якщо один Promise rejected.

`Promise.allSettled()` чекає на завершення всіх і повертає результат кожного.

---

**Чим `Promise.race()` відрізняється від `Promise.any()`?**

`race()` повертає перший settled Promise.

`any()` повертає перший fulfilled Promise.

---

**Що станеться, якщо один Promise rejected у `Promise.all()`?**

Весь `Promise.all()` стане rejected.

---

**Що станеться, якщо всі Promise rejected у `Promise.any()`?**

Виникне `AggregateError`.

---

### Практичні

**Чи зберігає `Promise.all()` порядок результатів?**

Так. Результати відповідають порядку вхідних Promise, незалежно від того, в якому порядку вони завершилися.

---

**Чи скасовує `Promise.all()` інші Promise після rejection?**

Ні.

---

**Чи скасовує `Promise.race()` програвші Promise?**

Ні.

---

**Коли використовувати `Promise.all()`?**

Коли потрібні всі результати і операції незалежні.

---

**Коли використовувати `Promise.allSettled()`?**

Коли потрібно отримати результат кожної операції незалежно від success/failure.

---

**Коли використовувати `Promise.race()`?**

Коли потрібен перший завершений результат, наприклад timeout.

---

**Коли використовувати `Promise.any()`?**

Коли потрібен перший успішний результат, наприклад fallback між декількома джерелами.

---

**Чому `Promise.all()` може бути швидшим за послідовний `await`?**

Тому що незалежні асинхронні операції можуть виконуватися конкурентно, а не чекати одна одну.

---

**Чи завжди потрібно використовувати `Promise.all()` для декількох запитів?**

Ні. Якщо операції мають залежність одна від одної або concurrency потрібно обмежити, інший підхід може бути правильнішим.

---

# 83. Міні-шпаргалка

## Promise.all()

    const results = await Promise.all([
        promise1,
        promise2,
        promise3,
    ]);

**Усі повинні бути успішними.**

---

## Promise.allSettled()

    const results = await Promise.allSettled([
        promise1,
        promise2,
        promise3,
    ]);

**Отримуємо результат кожного.**

---

## Promise.race()

    const result = await Promise.race([
        promise1,
        promise2,
        promise3,
    ]);

**Перший settled.**

---

## Promise.any()

    const result = await Promise.any([
        promise1,
        promise2,
        promise3,
    ]);

**Перший fulfilled.**

---

## AggregateError

    try {
        await Promise.any([
            Promise.reject(new Error('A')),
            Promise.reject(new Error('B')),
        ]);
    } catch (error) {
        console.log(error.errors);
    }

---

# 84. Найкоротша пам'ятка

    all
    ↓
    ALL must succeed

    allSettled
    ↓
    ALL must finish

    race
    ↓
    FIRST to finish

    any
    ↓
    FIRST to succeed

Або ще коротше:

    Promise.all()
        → всі успішні

    Promise.allSettled()
        → всі завершені

    Promise.race()
        → перший завершений

    Promise.any()
        → перший успішний

---

# 85. Головне

Promise combinators потрібні тоді, коли в програмі є **декілька асинхронних операцій**, які потрібно правильно скоординувати.

Основна модель:

    independent operations
            ↓
       choose strategy
            ↓
    ┌────────┼─────────┬──────────┐
    ↓        ↓         ↓          ↓
    all   allSettled   race       any
    ↓        ↓         ↓          ↓
   all      all      first      first
  success  finish    settled    success

Найважливіше правило вибору:

> **`Promise.all()` — потрібні всі успішні результати.**

> **`Promise.allSettled()` — потрібно знати результат кожної операції.**

> **`Promise.race()` — потрібен перший завершений результат.**

> **`Promise.any()` — потрібен перший успішний результат.**

І ще одна дуже важлива річ:

> **Promise combinator координує Promise, але не скасовує їх автоматично.**

Тому після цього розділу логічний наступний крок:

    10-abort-controller

де потрібно розібрати, як **реально скасовувати асинхронні операції**, зокрема `fetch()`.