# 08. Error Handling

Обробка помилок (**Error Handling**) — це спосіб правильно реагувати на ситуації, коли JavaScript-код не може виконати заплановану операцію.

У синхронному коді помилка може зупинити виконання функції або програми.

В асинхронному JavaScript помилки особливо важливі, тому що вони можуть виникати під час:

- `fetch()`;
- роботи з API;
- Promise;
- `async/await`;
- таймерів;
- роботи з файлами;
- базами даних;
- зовнішніми сервісами;
- користувацьким введенням;
- мережевих операцій.

Мета обробки помилок — не просто "не дати програмі впасти", а:

1. виявити помилку;
2. правильно її передати;
3. визначити тип помилки;
4. повідомити користувача, якщо потрібно;
5. записати помилку для розробника;
6. виконати альтернативну дію;
7. коректно завершити асинхронну операцію.

---

## Ключові поняття

- ✅ `Error`
- ✅ `throw`
- ✅ `try`
- ✅ `catch`
- ✅ `finally`
- ✅ `error.message`
- ✅ `error.name`
- ✅ `error.stack`
- ✅ `instanceof Error`
- ✅ `TypeError`
- ✅ `ReferenceError`
- ✅ `SyntaxError`
- ✅ `RangeError`
- ✅ `URIError`
- ✅ `AggregateError`
- ✅ власні помилки
- ✅ `class CustomError extends Error`
- ✅ Promise rejection
- ✅ `.catch()`
- ✅ `async/await`
- ✅ `try/catch` з `async/await`
- ✅ `Promise.reject()`
- ✅ `unhandled rejection`
- ✅ `window` / `globalThis` error handling
- ✅ мережеві помилки
- ✅ HTTP-помилки
- ✅ graceful degradation
- ✅ валідація даних
- ✅ логування помилок

---

# Що потрібно пам'ятати

- `throw` створює ситуацію помилки та передає її назовні.
- `try` містить код, виконання якого ми хочемо контролювати.
- `catch` перехоплює помилку.
- `finally` виконується незалежно від того, була помилка чи ні.
- `Error` — стандартний об'єкт для представлення помилки.
- `throw` може передати будь-яке значення, але краще кидати саме `Error`.
- `Promise` може перейти у стан `rejected`.
- `.catch()` обробляє rejection Promise.
- `async`-функція повертає Promise.
- `throw` всередині `async`-функції перетворюється на rejected Promise.
- `try/catch` може перехопити помилку з `await`.
- HTTP `404` або `500` — це не те саме, що мережева помилка.
- `fetch()` зазвичай не відхиляє Promise лише через HTTP `404` або `500`.
- Не слід ховати всі помилки через порожній `catch`.
- Помилка повинна або бути оброблена, або передана далі.
- `finally` зручно використовувати для очищення ресурсів.
- Користувачу не потрібно показувати технічний `stack trace`.
- Розробнику важливо мати достатньо інформації для діагностики.

---

# 1. Що таке помилка

Помилка (**error**) — це ситуація, коли JavaScript не може виконати операцію так, як очікувалося.

Наприклад:

    const user = null;

    console.log(user.name);

JavaScript не може прочитати `name` у `null`.

Виникає:

    TypeError

---

## Помилка не завжди означає помилку програми

Деякі помилки є очікуваними ситуаціями.

Наприклад:

- користувач ввів неправильний email;
- сервер повернув `404`;
- API тимчасово недоступне;
- файл не знайдено;
- користувач скасував операцію;
- запит перевищив timeout.

Тому важливо розділяти:

**очікувані помилки**

та

**неочікувані програмні помилки**.

---

# 2. Основна конструкція try/catch

Базовий синтаксис:

    try {
        // код, який може завершитися помилкою
    } catch (error) {
        // обробка помилки
    }

Приклад:

    try {
        const result = riskyOperation();
        console.log(result);
    } catch (error) {
        console.error(error);
    }

Якщо всередині `try` виникне помилка, виконання переходить до `catch`.

---

# 3. Як працює try/catch

Наприклад:

    try {
        console.log('1');

        throw new Error('Щось пішло не так');

        console.log('2');
    } catch (error) {
        console.log('3');
    }

Результат:

    1
    3

Після `throw` виконання `try` припиняється.

Код після `throw` не виконується.

---

# 4. try без catch

`try` повинен мати `catch` або `finally`.

Наприклад:

    try {
        doSomething();
    }

Так робити не можна.

Правильно:

    try {
        doSomething();
    } catch (error) {
        console.error(error);
    }

або:

    try {
        doSomething();
    } finally {
        cleanup();
    }

---

# 5. catch

`catch` отримує інформацію про помилку.

    try {
        throw new Error('Database connection failed');
    } catch (error) {
        console.log(error);
    }

`error` — це об'єкт помилки.

Зазвичай він містить:

- `name`;
- `message`;
- `stack`.

---

# 6. error.message

Найчастіше потрібний користувачу або програмі текст помилки:

    try {
        throw new Error('User not found');
    } catch (error) {
        console.log(error.message);
    }

Результат:

    User not found

---

# 7. error.name

Назва типу помилки:

    try {
        throw new TypeError('Expected a number');
    } catch (error) {
        console.log(error.name);
    }

Результат:

    TypeError

---

# 8. error.stack

`stack` містить інформацію про місце виникнення помилки та стек викликів.

    try {
        throw new Error('Something went wrong');
    } catch (error) {
        console.log(error.stack);
    }

`stack` особливо корисний розробнику під час debugging.

Користувачу показувати `stack` зазвичай не потрібно.

---

# 9. Об'єкт Error

Створення стандартної помилки:

    const error = new Error('Something went wrong');

    console.log(error.name);
    console.log(error.message);
    console.log(error.stack);

Типово:

    Error
    Something went wrong
    ...

---

# 10. throw

`throw` дозволяє явно створити помилкову ситуацію.

    throw new Error('Something went wrong');

Після `throw` JavaScript припиняє нормальне виконання поточної операції та шукає найближчий відповідний обробник помилки.

---

# 11. throw new Error()

Найкращий стандартний варіант:

    function divide(a, b) {
        if (b === 0) {
            throw new Error('Cannot divide by zero');
        }

        return a / b;
    }

Використання:

    try {
        console.log(divide(10, 0));
    } catch (error) {
        console.error(error.message);
    }

---

# 12. throw може передати будь-що

JavaScript технічно дозволяє:

    throw 'Something went wrong';

або:

    throw 404;

або:

    throw { message: 'Something went wrong' };

Але так робити не рекомендується.

Краще:

    throw new Error('Something went wrong');

Тоді ми отримуємо стандартну структуру:

- `name`;
- `message`;
- `stack`.

---

# 13. Чому краще кидати Error

Погано:

    throw 'Database error';

Проблема:

    catch (error) {
        console.log(error.stack);
    }

У рядка немає стандартного `stack`.

Краще:

    throw new Error('Database error');

Тепер:

    catch (error) {
        console.error(error.message);
        console.error(error.stack);
    }

---

# 14. finally

`finally` виконується незалежно від того, була помилка чи ні.

    try {
        doSomething();
    } catch (error) {
        console.error(error);
    } finally {
        console.log('Finished');
    }

---

## finally без помилки

    try {
        console.log('Success');
    } finally {
        console.log('Cleanup');
    }

Результат:

    Success
    Cleanup

---

## finally з помилкою

    try {
        throw new Error('Failed');
    } catch (error) {
        console.log(error.message);
    } finally {
        console.log('Cleanup');
    }

Результат:

    Failed
    Cleanup

---

# 15. Для чого потрібен finally

`finally` особливо корисний для cleanup-операцій:

- закриття ресурсу;
- завершення loading;
- розблокування UI;
- очищення тимчасового стану;
- завершення транзакції;
- скидання прапорця.

Наприклад:

    let isLoading = true;

    try {
        await loadData();
    } catch (error) {
        console.error(error);
    } finally {
        isLoading = false;
    }

---

# 16. try/catch/finally

Повна конструкція:

    try {
        // основний код
    } catch (error) {
        // обробка помилки
    } finally {
        // код, який виконується завжди
    }

---

# 17. Вкладений try/catch

`try/catch` можна вкладати.

    try {
        try {
            throw new Error('Inner error');
        } catch (error) {
            console.log('Inner catch');
            throw error;
        }
    } catch (error) {
        console.log('Outer catch');
    }

Це демонструє важливу ідею:

**помилку можна перехопити, обробити і передати далі.**

---

# 18. Передача помилки далі

Не кожен `catch` повинен повністю вирішувати проблему.

Наприклад:

    function loadUser() {
        try {
            // ...
        } catch (error) {
            console.error('Logging error:', error);
            throw error;
        }
    }

Тут:

1. помилка перехоплюється;
2. записується в log;
3. передається далі через `throw`.

Це називається **rethrow**.

---

# 19. Коли потрібно rethrow

Rethrow корисний, коли поточний рівень може:

- додати інформацію;
- записати log;
- очистити ресурс;
- але не може остаточно вирішити проблему.

Наприклад:

    try {
        await saveUser(user);
    } catch (error) {
        console.error('Failed to save user:', error);
        throw error;
    }

Вищий рівень може вже показати відповідне повідомлення користувачу.

---

# 20. Типи стандартних помилок

JavaScript має декілька стандартних типів помилок.

Основні:

- `Error`
- `TypeError`
- `ReferenceError`
- `SyntaxError`
- `RangeError`
- `URIError`
- `EvalError`
- `AggregateError`

Найчастіше в реальній frontend/backend практиці зустрічатимуться:

- `Error`;
- `TypeError`;
- `ReferenceError`;
- `SyntaxError`;
- `RangeError`;
- `AggregateError`.

---

# 21. TypeError

`TypeError` виникає, коли значення має неправильний тип для операції.

Наприклад:

    const user = null;

    user.name;

Або:

    const value = 10;

    value.toUpperCase();

---

# 22. ReferenceError

`ReferenceError` виникає, коли JavaScript не може знайти змінну або інший identifier.

    console.log(username);

Якщо `username` не оголошена, виникне:

    ReferenceError

---

# 23. SyntaxError

`SyntaxError` означає неправильний синтаксис JavaScript.

Наприклад:

    const user = {

Такого коду JavaScript не може правильно розібрати.

Важливо:

**SyntaxError часто виникає ще до нормального виконання програми**, тому `try/catch` не завжди може його перехопити.

---

# 24. RangeError

`RangeError` виникає, коли значення виходить за допустимий діапазон.

Наприклад:

    new Array(-1);

Це може спричинити:

    RangeError

---

# 25. AggregateError

`AggregateError` використовується, коли потрібно представити декілька помилок одночасно.

Особливо актуальний разом із Promise combinators.

Наприклад, `Promise.any()` може завершитися `AggregateError`, якщо всі Promise були rejected.

    try {
        await Promise.any([
            Promise.reject(new Error('Server 1')),
            Promise.reject(new Error('Server 2')),
        ]);
    } catch (error) {
        console.log(error instanceof AggregateError);
        console.log(error.errors);
    }

---

# 26. instanceof Error

Можна перевірити, чи є значення помилкою:

    try {
        throw new Error('Something went wrong');
    } catch (error) {
        console.log(error instanceof Error);
    }

Результат:

    true

Це корисно, коли тип значення невідомий.

---

# 27. Перевірка типу помилки

Можна перевірити конкретний тип:

    try {
        doSomething();
    } catch (error) {
        if (error instanceof TypeError) {
            console.log('Type error');
        }
    }

---

# 28. Кілька типів помилок

Можна обробляти різні типи по-різному:

    try {
        doSomething();
    } catch (error) {
        if (error instanceof TypeError) {
            console.log('Wrong type');
        } else if (error instanceof ReferenceError) {
            console.log('Variable not found');
        } else {
            console.log('Unknown error');
        }
    }

---

# 29. Власні типи помилок

У реальних застосунках стандартного `Error` іноді недостатньо.

Наприклад, нам можуть знадобитися:

- `ValidationError`;
- `AuthenticationError`;
- `AuthorizationError`;
- `NotFoundError`;
- `DatabaseError`;
- `NetworkError`.

---

# 30. Створення власної помилки

Наприклад:

    class ValidationError extends Error {
        constructor(message) {
            super(message);
            this.name = 'ValidationError';
        }
    }

Використання:

    throw new ValidationError('Email is invalid');

---

# 31. Обробка власної помилки

    try {
        throw new ValidationError('Email is invalid');
    } catch (error) {
        if (error instanceof ValidationError) {
            console.log('Validation problem');
        }
    }

---

# 32. Власні властивості помилки

Можна додати додаткову інформацію:

    class ApiError extends Error {
        constructor(message, status) {
            super(message);

            this.name = 'ApiError';
            this.status = status;
        }
    }

Використання:

    throw new ApiError('User not found', 404);

Обробка:

    try {
        loadUser();
    } catch (error) {
        console.log(error.message);
        console.log(error.status);
    }

---

# 33. Помилки та функції

Функція може повідомити про неможливість виконання через `throw`.

    function getUser(id) {
        if (!id) {
            throw new Error('User ID is required');
        }

        // ...
    }

Тоді код, який викликає функцію, вирішує, що робити з помилкою.

---

# 34. Валідація через throw

Один із найпоширеніших сценаріїв:

    function createUser(name) {
        if (!name) {
            throw new Error('Name is required');
        }

        if (name.length < 2) {
            throw new Error('Name is too short');
        }

        return {
            name,
        };
    }

---

# 35. Помилки в асинхронному JavaScript

У цьому розділі особливо важливі:

- Promise;
- `.catch()`;
- `async`;
- `await`;
- `try/catch`.

Асинхронна помилка не завжди перехоплюється так само, як синхронна.

---

# 36. Promise rejection

Promise може бути:

    pending

    fulfilled

    rejected

Якщо асинхронна операція завершилася помилкою, Promise може перейти у:

    rejected

Наприклад:

    const promise = Promise.reject(
        new Error('Request failed')
    );

---

# 37. Обробка Promise через catch

    Promise.reject(new Error('Request failed'))
        .catch(error => {
            console.error(error.message);
        });

`.catch()` використовується для обробки rejected Promise.

---

# 38. Promise.resolve та Promise.reject

Створення успішного Promise:

    Promise.resolve('Success');

Створення rejected Promise:

    Promise.reject(new Error('Failed'));

Це корисно для розуміння внутрішньої моделі Promise.

---

# 39. Помилка в Promise chain

Наприклад:

    Promise.resolve(10)
        .then(value => {
            throw new Error('Something went wrong');
        })
        .then(value => {
            console.log('This will not execute');
        })
        .catch(error => {
            console.error(error.message);
        });

Якщо `.then()` кидає помилку, chain переходить у rejected state.

---

# 40. catch у Promise chain

Типовий патерн:

    fetch('/api/users')
        .then(response => response.json())
        .then(users => {
            console.log(users);
        })
        .catch(error => {
            console.error(error);
        });

Помилки з попередніх `.then()` можуть потрапити до `.catch()`.

---

# 41. async/await і помилки

`async/await` робить асинхронний код схожим на синхронний.

Для обробки помилок використовується `try/catch`.

    async function loadUsers() {
        try {
            const response = await fetch('/api/users');

            const users = await response.json();

            return users;
        } catch (error) {
            console.error(error);
        }
    }

---

# 42. throw всередині async function

Якщо `async`-функція виконує:

    throw new Error('Something went wrong');

її Promise буде rejected.

Наприклад:

    async function test() {
        throw new Error('Failed');
    }

Фактично результат:

    test()
        .catch(error => {
            console.error(error.message);
        });

---

# 43. try/catch з await

Це один із найважливіших патернів асинхронного JavaScript:

    async function loadData() {
        try {
            const response = await fetch('/api/data');

            return await response.json();
        } catch (error) {
            console.error('Loading failed:', error);
        }
    }

---

# 44. Помилка в await

Наприклад:

    async function test() {
        try {
            await Promise.reject(
                new Error('Request failed')
            );

            console.log('Success');
        } catch (error) {
            console.log('Error:', error.message);
        }
    }

Результат:

    Error: Request failed

---

# 45. Важлива відмінність fetch і HTTP errors

`fetch()` має важливу особливість.

HTTP:

    404 Not Found

або:

    500 Internal Server Error

не обов'язково означають rejected Promise.

Наприклад:

    try {
        const response = await fetch('/api/users/999');

        console.log(response.status);
    } catch (error) {
        console.error(error);
    }

Якщо сервер відповів `404`, запит може успішно отримати HTTP response.

Тому часто потрібно перевіряти:

    if (!response.ok) {
        throw new Error(`HTTP error: ${response.status}`);
    }

Це важлива межа між:

**мережевою помилкою**

і

**HTTP-помилкою**.

---

# 46. Network error vs HTTP error

Це дуже важливо для frontend-розробника.

### Network error

Наприклад:

- немає з'єднання;
- DNS не працює;
- сервер недоступний;
- з'єднання було перервано.

У такій ситуації `fetch()` може завершитися rejected Promise.

### HTTP error

Наприклад:

    404
    401
    403
    500

Сервер відповів.

Тобто HTTP response існує, але повідомляє про проблему.

---

# 47. Обробка HTTP помилки

Типовий код:

    async function loadUser(id) {
        try {
            const response = await fetch(`/api/users/${id}`);

            if (!response.ok) {
                throw new Error(
                    `HTTP error: ${response.status}`
                );
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to load user:', error);
            throw error;
        }
    }

---

# 48. Не ховати помилки

Погано:

    try {
        await loadData();
    } catch (error) {
    }

Такий `catch` нічого не робить.

Помилка фактично губиться.

---

# 49. Порожній catch

Порожній `catch` майже завжди погана ідея:

    catch (error) {}

Якщо помилку справді потрібно ігнорувати, це повинно бути свідомим рішенням і бажано бути очевидним із коду.

---

# 50. Логування помилки

Мінімальний варіант:

    catch (error) {
        console.error(error);
    }

Краще додати контекст:

    catch (error) {
        console.error('Failed to load users:', error);
    }

Це допомагає зрозуміти, яка саме операція завершилася помилкою.

---

# 51. Не показувати технічну помилку користувачу

Погано:

    alert(error.stack);

або:

    element.textContent = error.stack;

Користувачеві краще показати зрозуміле повідомлення:

    element.textContent =
        'Не вдалося завантажити дані. Спробуйте ще раз.';

А технічну інформацію залишити для developer log.

---

# 52. Розділення помилки та UI

Хороша архітектура:

    try {
        const users = await loadUsers();

        renderUsers(users);
    } catch (error) {
        console.error(error);

        showError(
            'Не вдалося завантажити користувачів'
        );
    }

Тут:

- `loadUsers()` працює з даними;
- `catch` працює з помилкою;
- UI показує користувачу зрозумілий результат.

---

# 53. Помилки у функціях нижчого рівня

Наприклад:

    async function loadUsers() {
        const response = await fetch('/api/users');

        if (!response.ok) {
            throw new Error('Failed to load users');
        }

        return response.json();
    }

Функція не вирішує, як показувати помилку.

Вона просто передає її вище.

---

# 54. Обробка помилки на верхньому рівні

    async function init() {
        try {
            const users = await loadUsers();

            renderUsers(users);
        } catch (error) {
            console.error(error);

            showError(
                'Не вдалося завантажити користувачів'
            );
        }
    }

Це часто краща архітектура, ніж обробляти одну й ту саму помилку на кожному рівні.

---

# 55. Error propagation

Помилка може пройти через декілька рівнів:

    UI
      ↓
    service
      ↓
    API
      ↓
    fetch
      ↓
    network

Наприклад:

    async function apiRequest() {
        // помилка виникає тут
    }

    async function loadUsers() {
        return apiRequest();
    }

    async function init() {
        try {
            await loadUsers();
        } catch (error) {
            // обробка тут
        }
    }

Помилка може "піднятися" до рівня, де її можна правильно обробити.

---

# 56. Не ловити помилку занадто рано

Погано:

    async function loadUsers() {
        try {
            return await apiRequest();
        } catch (error) {
            console.error(error);
            return [];
        }
    }

Тут справжня помилка перетворюється на порожній масив.

Вищий рівень уже не знає, що сталася проблема.

Іноді це правильно, але часто це приховує реальну проблему.

---

# 57. Graceful degradation

Іноді програма може продовжити роботу в спрощеному режимі.

Наприклад:

    try {
        const recommendations = await loadRecommendations();
        renderRecommendations(recommendations);
    } catch (error) {
        console.error(error);

        renderDefaultRecommendations();
    }

Основна функція програми продовжує працювати.

---

# 58. Валідація — перша лінія захисту

Не всі проблеми потрібно вирішувати через `try/catch`.

Наприклад, якщо користувач ввів порожнє ім'я:

    if (!name.trim()) {
        showError('Введіть імʼя');
        return;
    }

Це очікувана ситуація, а не аварійна помилка.

Тому:

**валідація → для очікуваного неправильного вводу**

**throw/catch → для помилкових ситуацій виконання**

---

# 59. Очікувані та неочікувані помилки

### Очікувана ситуація

Користувач:

    не ввів email

Краще:

    showValidationError();

### Очікувана HTTP-ситуація

Сервер:

    404 Not Found

Можна показати:

    'Користувача не знайдено'

### Неочікувана програмна помилка

Наприклад:

    Cannot read properties of null

Її потрібно логувати та виправляти в коді.

---

# 60. Обробка різних HTTP-помилок

Можна створити спеціальну помилку:

    class HttpError extends Error {
        constructor(status, message) {
            super(message);

            this.name = 'HttpError';
            this.status = status;
        }
    }

Використання:

    if (!response.ok) {
        throw new HttpError(
            response.status,
            `HTTP error: ${response.status}`
        );
    }

---

# 61. Різна реакція на HTTP status

    try {
        const response = await fetch('/api/user');

        if (!response.ok) {
            throw new HttpError(
                response.status,
                'Request failed'
            );
        }

        return await response.json();
    } catch (error) {
        if (error instanceof HttpError) {
            if (error.status === 404) {
                console.log('User not found');
            } else if (error.status === 401) {
                console.log('Authentication required');
            } else if (error.status >= 500) {
                console.log('Server problem');
            }
        }
    }

---

# 62. Помилки авторизації

Типовий HTTP-поділ:

    401 Unauthorized

означає, що запит не має правильної автентифікації.

Наприклад:

- token відсутній;
- token недійсний;
- session expired.

`403 Forbidden` означає, що сервер відмовляє в доступі.

Ці статуси часто використовуються у frontend/backend взаємодії.

---

# 63. Promise.all та помилки

Якщо один Promise у `Promise.all()` rejected, весь `Promise.all()` стає rejected.

    try {
        const [users, posts] = await Promise.all([
            loadUsers(),
            loadPosts(),
        ]);
    } catch (error) {
        console.error(error);
    }

Для детальнішого розгляду Promise combinators дивись:

    09-promise-combinators

---

# 64. Promise.allSettled та помилки

`Promise.allSettled()` дозволяє отримати результат кожної операції, навіть якщо деякі завершилися помилкою.

    const results = await Promise.allSettled([
        loadUsers(),
        loadPosts(),
        loadComments(),
    ]);

Після цього можна перевірити:

    results.forEach(result => {
        if (result.status === 'fulfilled') {
            console.log(result.value);
        } else {
            console.error(result.reason);
        }
    });

Це корисно, коли незалежні операції не повинні блокувати одна одну.

---

# 65. Unhandled Promise rejection

Погано:

    Promise.reject(
        new Error('Something went wrong')
    );

Якщо rejection ніхто не обробляє, виникає **unhandled rejection**.

Тому Promise повинен мати обробку помилки там, де це необхідно.

Наприклад:

    someAsyncOperation()
        .catch(error => {
            console.error(error);
        });

---

# 66. async function теж може створити unhandled rejection

Наприклад:

    async function loadData() {
        throw new Error('Failed');
    }

    loadData();

Якщо returned Promise не обробити, rejection залишиться необробленим.

Краще:

    loadData()
        .catch(error => {
            console.error(error);
        });

або:

    async function main() {
        try {
            await loadData();
        } catch (error) {
            console.error(error);
        }
    }

---

# 67. Глобальна обробка помилок

У браузері можна реагувати на необроблені помилки:

    window.addEventListener('error', event => {
        console.error(event.error);
    });

Для необроблених Promise rejection:

    window.addEventListener(
        'unhandledrejection',
        event => {
            console.error(event.reason);
        }
    );

Це може бути корисним для глобального monitoring/logging.

Але глобальний handler не повинен замінювати локальну правильну обробку помилок.

---

# 68. Node.js і глобальні помилки

У Node.js існують глобальні механізми для:

- `uncaughtException`;
- `unhandledRejection`.

Вони корисні переважно для аварійного logging та контролю процесу.

Не слід використовувати їх як основний механізм нормальної обробки помилок.

Правильніше обробляти помилку якомога ближче до місця, де відомо, що з нею робити.

---

# 69. Error boundary як концепція

У frontend-застосунках корисно мати рівні, на яких помилки ізолюються.

Наприклад:

    API error
        ↓
    service layer
        ↓
    component
        ↓
    UI error message

У React для помилок під час rendering існує окремий механізм:

    Error Boundary

Це вже наступний рівень вивчення React, але концепція важлива:

**помилка одного компонента не повинна обов'язково зламати весь UI.**

---

# 70. Логування

Мінімально:

    console.error(error);

З контекстом:

    console.error(
        'Failed to load user:',
        error
    );

У production-застосунках помилки часто передаються у спеціальні системи monitoring/logging.

Наприклад:

- error tracking;
- server logs;
- monitoring;
- observability systems.

---

# 71. Що має містити хороший error log

Корисно знати:

- що сталося;
- де сталося;
- коли сталося;
- яка операція виконувалась;
- який тип помилки;
- HTTP status;
- request ID, якщо використовується;
- stack trace;
- додатковий безпечний контекст.

Наприклад:

    console.error('Failed to load user', {
        userId,
        status: error.status,
        message: error.message,
        stack: error.stack,
    });

Не слід записувати в log секрети:

- passwords;
- access tokens;
- private keys;
- інші чутливі дані.

---

# 72. Error message

Повідомлення повинно бути:

- коротким;
- зрозумілим;
- конкретним;
- корисним.

Погано:

    Error!

Краще:

    Не вдалося завантажити список користувачів.

Для developer log:

    Failed to load users: HTTP 500

---

# 73. Не використовувати помилки для звичайного control flow

Не варто робити:

    try {
        const user = findUser(id);

        if (!user) {
            throw new Error('Not found');
        }
    } catch (error) {
        return null;
    }

Якщо відсутність користувача є нормальною очікуваною ситуацією, краще передбачити це в API функції.

Наприклад:

    const user = findUser(id);

    if (!user) {
        return null;
    }

`throw` краще використовувати для справді exceptional situations.

---

# 74. Помилки та return

Це різні механізми.

    function findUser(id) {
        if (!id) {
            return null;
        }

        // ...
    }

Тут відсутність результату — частина нормальної логіки.

Інший випадок:

    function connectDatabase() {
        if (connectionFailed) {
            throw new Error('Database connection failed');
        }
    }

Тут виникла проблема виконання операції.

---

# 75. Помилки та контроль потоку

Зручно мислити так:

    return
        ↓
    нормальний результат

    throw
        ↓
    exceptional result

Наприклад:

    function parseUser(data) {
        if (!data) {
            throw new Error('Invalid data');
        }

        return {
            name: data.name,
        };
    }

---

# 76. try/catch не виправляє помилку

Важливе правило:

`try/catch` не робить неправильний код правильним.

Він лише дозволяє:

- перехопити проблему;
- обробити її;
- повідомити користувача;
- записати log;
- виконати fallback;
- передати помилку далі.

Якщо постійно ловити одну й ту саму помилку, але не розуміти причину, проблема залишається.

---

# 77. Типовий асинхронний шаблон

Для frontend/API:

    async function loadUsers() {
        try {
            const response = await fetch('/api/users');

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            return await response.json();
        } catch (error) {
            console.error('loadUsers failed:', error);
            throw error;
        }
    }

Виклик:

    async function init() {
        try {
            const users = await loadUsers();

            renderUsers(users);
        } catch (error) {
            showError(
                'Не вдалося завантажити користувачів'
            );
        }
    }

---

# 78. finally у реальному UI

Один із дуже практичних випадків:

    async function loadUsers() {
        isLoading = true;

        try {
            const response = await fetch('/api/users');

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            return await response.json();
        } catch (error) {
            showError('Не вдалося завантажити дані');
            throw error;
        } finally {
            isLoading = false;
        }
    }

`finally` гарантує, що loading state буде скинуто.

---

# 79. Обробка помилки на кількох рівнях

Наприклад:

    async function request() {
        const response = await fetch('/api/users');

        if (!response.ok) {
            throw new Error(`HTTP ${response.status}`);
        }

        return response.json();
    }

    async function loadUsers() {
        try {
            return await request();
        } catch (error) {
            console.error('API request failed:', error);
            throw error;
        }
    }

    async function init() {
        try {
            const users = await loadUsers();

            renderUsers(users);
        } catch (error) {
            showError('Не вдалося завантажити дані');
        }
    }

Тут кожен рівень виконує свою роль:

    request()
        ↓
    технічна HTTP-операція

    loadUsers()
        ↓
    service-level logging

    init()
        ↓
    UI-level handling

---

# 80. Перетворення низькорівневої помилки

Іноді корисно створити більш змістовну помилку.

Наприклад:

    class UserLoadError extends Error {
        constructor(message, cause) {
            super(message);

            this.name = 'UserLoadError';
            this.cause = cause;
        }
    }

Потім:

    async function loadUsers() {
        try {
            const response = await fetch('/api/users');

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            return await response.json();
        } catch (error) {
            throw new UserLoadError(
                'Failed to load users',
                error
            );
        }
    }

`cause` дозволяє зберегти оригінальну причину.

---

# 81. Error cause

JavaScript підтримує `cause` для збереження першопричини.

Наприклад:

    try {
        await databaseOperation();
    } catch (error) {
        throw new Error(
            'Failed to load user',
            {
                cause: error,
            }
        );
    }

Потім:

    catch (error) {
        console.error(error);
        console.error(error.cause);
    }

Це корисно при побудові багаторівневої архітектури.

---

# 82. Error handling architecture

У full-stack застосунку помилки можуть проходити приблизно так:

    Database
        ↓
    Backend service
        ↓
    API controller
        ↓
    HTTP response
        ↓
    Frontend fetch
        ↓
    Frontend service
        ↓
    UI

Кожен рівень повинен відповідати за свою частину.

---

# 83. Frontend error handling

Frontend повинен уміти обробляти:

- неправильний input;
- network failure;
- timeout;
- HTTP errors;
- invalid JSON;
- authentication failure;
- authorization failure;
- unexpected data;
- cancelled request.

---

# 84. Backend error handling

Backend додатково працює з:

- database errors;
- validation errors;
- authentication;
- authorization;
- external API errors;
- filesystem errors;
- business logic errors;
- unexpected runtime errors.

Frontend і backend можуть використовувати однакову концепцію:

    success
    ↓
    normal result

    error
    ↓
    explicit error path

---

# 85. Не передавати stack trace клієнту

Погано:

    return response.json({
        error: error.stack,
    });

Це може розкрити внутрішню структуру сервера.

Краще:

    return response.status(500).json({
        error: 'Internal server error',
    });

А повний stack trace залишається в server log.

---

# 86. Структуровані API errors

У full-stack API корисно мати передбачуваний формат:

    {
        "error": {
            "code": "USER_NOT_FOUND",
            "message": "User not found"
        }
    }

Frontend тоді може реагувати на:

    error.code

а не на текст:

    error.message

Текст повідомлення може змінюватися або локалізуватися.

---

# 87. Error code vs message

Наприклад:

    {
        "code": "EMAIL_ALREADY_EXISTS",
        "message": "Email is already registered"
    }

Frontend може перевірити:

    if (error.code === 'EMAIL_ALREADY_EXISTS') {
        showError('Цей email вже зареєстрований');
    }

Це надійніше, ніж:

    if (error.message === 'Email is already registered') {
        // ...
    }

---

# 88. Error handling та локалізація

Якщо застосунок підтримує декілька мов, backend краще не змушувати frontend аналізувати англійський текст помилки.

Наприклад:

    {
        "code": "USER_NOT_FOUND"
    }

Frontend може показати:

    українська:
    'Користувача не знайдено'

    English:
    'User not found'

Це особливо корисно у великих застосунках.

---

# 89. Практична вправа №1 — try/catch

Створити функцію:

    function divide(a, b) {
        if (b === 0) {
            throw new Error('Cannot divide by zero');
        }

        return a / b;
    }

Перевірити:

    try {
        console.log(divide(10, 2));
        console.log(divide(10, 0));
    } catch (error) {
        console.error(error.message);
    }

---

# 90. Практична вправа №2 — власна помилка

Створити:

    class ValidationError extends Error {
        constructor(message) {
            super(message);
            this.name = 'ValidationError';
        }
    }

Функція:

    function validateAge(age) {
        if (typeof age !== 'number') {
            throw new ValidationError(
                'Age must be a number'
            );
        }

        if (age < 0) {
            throw new ValidationError(
                'Age cannot be negative'
            );
        }

        return true;
    }

Обробити її через `instanceof`.

---

# 91. Практична вправа №3 — Promise rejection

Створити:

    function loadData() {
        return Promise.reject(
            new Error('Failed to load data')
        );
    }

Обробити:

    loadData()
        .then(data => {
            console.log(data);
        })
        .catch(error => {
            console.error(error.message);
        });

---

# 92. Практична вправа №4 — async/await

Створити:

    async function loadData() {
        try {
            const data = await Promise.reject(
                new Error('Failed')
            );

            return data;
        } catch (error) {
            console.error(error.message);
        }
    }

Зрозуміти різницю між:

    .then()
    .catch()

та:

    try
    catch

---

# 93. Практична вправа №5 — fetch

Виконати запит:

    async function loadUser() {
        try {
            const response = await fetch(
                'https://example.com/api/user'
            );

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            return await response.json();
        } catch (error) {
            console.error(error);
        }
    }

Головна мета вправи:

**розділити network error та HTTP error.**

---

# 94. Практична вправа №6 — loading state

Створити простий UI:

    let isLoading = false;

    async function loadUsers() {
        isLoading = true;

        try {
            const response = await fetch('/api/users');

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            return await response.json();
        } catch (error) {
            showError('Помилка завантаження');
        } finally {
            isLoading = false;
        }
    }

Мета:

зрозуміти практичну роль `finally`.

---

# 95. Типові помилки

## 95.1. Порожній catch

Погано:

    try {
        doSomething();
    } catch (error) {}

Помилка губиться.

---

## 95.2. Catch без обробки

Погано:

    try {
        await loadData();
    } catch (error) {
        console.log('error');
    }

Не зрозуміло:

- що сталося;
- де;
- чому;
- що робити далі.

---

## 95.3. Показ stack користувачу

Погано:

    showError(error.stack);

`stack` — інформація для розробника.

---

## 95.4. Вважати 404 network error

Неправильно.

    404

означає, що HTTP response отримано.

Network error — інша ситуація.

---

## 95.5. Забувати про response.ok

Наприклад:

    const response = await fetch('/api/users');

    const data = await response.json();

Не завжди достатньо.

Потрібно враховувати:

    if (!response.ok) {
        throw new Error(
            `HTTP ${response.status}`
        );
    }

---

## 95.6. Ловити все і повертати null

Погано:

    try {
        return await loadData();
    } catch {
        return null;
    }

Це може приховати серйозну проблему.

---

## 95.7. Використовувати throw для звичайної валідації

Не кожен неправильний input повинен бути exception.

Для очікуваного input:

    if (!email) {
        showValidationError();
        return;
    }

---

## 95.8. Втрачати оригінальну помилку

Погано:

    catch (error) {
        throw new Error('Something went wrong');
    }

Оригінальна причина може бути втрачена.

Краще використовувати `cause` або зберігати оригінальну помилку.

---

# 96. Debugging error

Коли бачиш помилку, не поспішай одразу додавати `try/catch`.

Спочатку з'ясуй:

1. де виникла помилка;
2. який її тип;
3. яке значення спричинило проблему;
4. який був викликаний метод;
5. чи є проблема в даних;
6. чи є проблема в логіці;
7. чи це network/API проблема;
8. чи потрібно цю помилку обробляти.

---

# 97. Алгоритм роботи з помилкою

Практичний алгоритм:

    1. Read error message
           ↓
    2. Identify error type
           ↓
    3. Find stack location
           ↓
    4. Inspect input/data
           ↓
    5. Determine expected behavior
           ↓
    6. Fix root cause
           ↓
    7. Add handling if necessary
           ↓
    8. Test failure case

Головне:

**не маскувати проблему — знайти її причину.**

---

# 98. Error handling checklist

Перед завершенням функції запитай себе:

- Чи може ця функція завершитися помилкою?
- Чи є ця помилка очікуваною?
- Хто повинен її обробити?
- Чи потрібно зробити `throw`?
- Чи потрібен `try/catch`?
- Чи потрібен `finally`?
- Чи потрібно логувати помилку?
- Що повинен побачити користувач?
- Чи не губиться оригінальна причина?
- Чи не передається користувачу технічна інформація?

---

# 99. Error handling у повному async flow

Типовий flow:

    User action
        ↓
    async function
        ↓
    service
        ↓
    fetch
        ↓
    HTTP request
        ↓
    server
        ↓
    HTTP response
        ↓
    response.ok
        ↓
    response.json()
        ↓
    success
        ↓
    UI

При помилці:

    User action
        ↓
    async function
        ↓
    service
        ↓
    error
        ↓
    catch
        ↓
    log
        ↓
    user-friendly message

---

# 100. Зв'язок з попередніми темами

Цей розділ об'єднує попередні теми:

    01-sync-vs-async
        ↓
    02-callbacks
        ↓
    03-promises
        ↓
    04-promise-chaining
        ↓
    05-async-await
        ↓
    06-fetch
        ↓
    07-http-basics
        ↓
    08-error-handling

Тепер потрібно вміти не тільки виконувати асинхронну операцію, а й правильно реагувати на її невдале завершення.

---

# 101. Зв'язок з наступними темами

Після `08-error-handling` логічно переходити до:

    09-promise-combinators

де потрібно навчитися обробляти декілька асинхронних операцій.

Потім:

    10-abort-controller

для скасування асинхронних операцій.

Потім:

    11-event-loop

для глибшого розуміння механізму виконання асинхронного JavaScript.

І нарешті:

    12-api-crud-project

де всі ці концепції об'єднуються в реальному застосунку.

---

# 102. Рівні знань

## 🟢 Core

Потрібно вміти:

- розуміти, що таке Error;
- використовувати `throw`;
- використовувати `try/catch`;
- використовувати `finally`;
- читати `error.message`;
- знати `TypeError`;
- знати `ReferenceError`;
- знати `SyntaxError`;
- знати Promise rejection;
- використовувати `.catch()`;
- використовувати `try/catch` з `async/await`.

---

## 🔵 Junior

Потрібно вміти:

- розрізняти expected/unexpected errors;
- використовувати `instanceof`;
- створювати власні Error classes;
- правильно обробляти `fetch`;
- розуміти HTTP error vs network error;
- перевіряти `response.ok`;
- використовувати `finally`;
- робити rethrow;
- не губити помилки;
- показувати користувачу зрозуміле повідомлення;
- логувати технічну інформацію;
- розуміти `Promise.all` error behavior.

---

## 🟠 Middle

Потрібно розуміти:

- error propagation;
- error boundaries;
- error handling architecture;
- custom error hierarchy;
- `cause`;
- structured API errors;
- централізовану обробку помилок;
- logging/monitoring;
- graceful degradation;
- error handling на frontend/backend;
- authentication/authorization errors;
- retry strategies;
- timeout/cancellation;
- `Promise.allSettled()`.

---

## 🔴 Senior

Потрібно розуміти:

- error taxonomy;
- domain errors;
- infrastructure errors;
- error boundaries;
- distributed error handling;
- observability;
- structured logging;
- correlation/request IDs;
- retry/backoff;
- circuit breaker;
- idempotency;
- partial failures;
- graceful shutdown;
- fault tolerance;
- security implications of error messages;
- production error monitoring.

---

# 103. Питання для співбесіди

### Базові

**Що робить `try/catch`?**

Перехоплює runtime-помилки, які виникають у контрольованому коді.

**Для чого потрібен `throw`?**

Щоб явно передати помилкову ситуацію.

**Для чого потрібен `finally`?**

Для коду, який повинен виконатися незалежно від результату `try/catch`.

**Що таке `Error`?**

Стандартний об'єкт JavaScript для представлення помилки.

**Чим `throw new Error()` кращий за `throw 'error'`?**

Він має стандартну структуру та debugging information, зокрема `name`, `message` і `stack`.

---

### Async JavaScript

**Як обробити помилку Promise?**

Через `.catch()` або через `try/catch` разом з `await`.

**Що станеться, якщо `async`-функція виконає `throw`?**

Її Promise стане rejected.

**Чи перехопить `try/catch` помилку з `await`?**

Так.

**Чи є HTTP 404 network error?**

Ні. Сервер повернув HTTP response зі статусом `404`.

**Чи відхиляє `fetch()` Promise через HTTP 404?**

Зазвичай ні. Потрібно перевіряти `response.ok` або `response.status`.

**Що таке unhandled rejection?**

Rejected Promise, для якого не було встановлено відповідного обробника.

---

### Практичні

**Коли потрібно робити rethrow?**

Коли поточний рівень може додати контекст або виконати cleanup, але не може остаточно обробити помилку.

**Чому не потрібно використовувати порожній catch?**

Тому що помилка може бути непомітно втрачена.

**Чи потрібно всі помилки обробляти через try/catch?**

Ні. Потрібно обробляти помилки там, де відомо, що з ними робити.

**Коли краще повернути `null`, а коли зробити `throw`?**

`null` може бути нормальною частиною API функції, якщо відсутність результату очікувана. `throw` — для exceptional situations.

**Для чого потрібні custom errors?**

Щоб розрізняти різні категорії помилок і обробляти їх відповідно до їхнього призначення.

---

# 104. Міні-шпаргалка

## Error

    const error = new Error('Something went wrong');

## throw

    throw new Error('Something went wrong');

## try/catch

    try {
        riskyOperation();
    } catch (error) {
        console.error(error);
    }

## finally

    try {
        riskyOperation();
    } catch (error) {
        console.error(error);
    } finally {
        cleanup();
    }

## Error properties

    error.name
    error.message
    error.stack
    error.cause

## Type checking

    error instanceof Error

## Custom Error

    class ValidationError extends Error {
        constructor(message) {
            super(message);
            this.name = 'ValidationError';
        }
    }

## Promise

    somePromise()
        .catch(error => {
            console.error(error);
        });

## async/await

    async function loadData() {
        try {
            const response = await fetch('/api/data');

            if (!response.ok) {
                throw new Error(
                    `HTTP ${response.status}`
                );
            }

            return await response.json();
        } catch (error) {
            console.error(error);
            throw error;
        }
    }

## finally

    try {
        await loadData();
    } catch (error) {
        handleError(error);
    } finally {
        stopLoading();
    }

---

# 105. Головне

Запам'ятай головну модель:

    нормальний результат
        ↓
    return / resolve
        ↓
    success

    помилкова ситуація
        ↓
    throw / reject
        ↓
    catch
        ↓
    handle / log / rethrow

Для асинхронного JavaScript:

    Promise rejection
        ↓
    .catch()

або:

    await
        ↓
    try/catch

Для HTTP:

    network failure
        ↓
    fetch rejection

    HTTP 404 / 401 / 403 / 500
        ↓
    HTTP response
        ↓
    перевірка response.ok / status

Для UI:

    technical error
        ↓
    log for developer

    user-facing error
        ↓
    understandable message

---

# 106. Найважливіший практичний шаблон

Для поточного рівня JavaScript достатньо добре засвоїти цей шаблон:

    async function loadData() {
        try {
            const response = await fetch('/api/data');

            if (!response.ok) {
                throw new Error(
                    `HTTP error: ${response.status}`
                );
            }

            const data = await response.json();

            return data;
        } catch (error) {
            console.error('Failed to load data:', error);

            throw error;
        }
    }

І використовувати його на верхньому рівні:

    async function init() {
        try {
            const data = await loadData();

            render(data);
        } catch (error) {
            showError(
                'Не вдалося завантажити дані'
            );
        }
    }

Це вже хороший базовий патерн для реальної SPA/full-stack практики.

---

# 107. Підсумок

Після цього розділу потрібно впевнено розуміти:

    Error
      ↓
    throw
      ↓
    try
      ↓
    catch
      ↓
    finally

та асинхронну модель:

    Promise
      ↓
    rejected
      ↓
    .catch()

або:

    async
      ↓
    await
      ↓
    try/catch

А для роботи з API:

    fetch()
      ↓
    network error?
      ↓
    response
      ↓
    response.ok?
      ↓
    response.status
      ↓
    response.json()
      ↓
    success / error

Головний принцип:

> **Не намагайся просто "зловити" помилку. Визнач, де вона повинна бути оброблена, що саме потрібно зробити з нею і чи потрібно передати її далі.**