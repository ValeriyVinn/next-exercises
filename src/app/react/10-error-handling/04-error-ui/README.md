# React — Error UI

> `react/10-error-handling/04-error-ui`

## Зміст

1. [Що таке Error UI](#1-що-таке-error-ui)
2. [Навіщо потрібен Error UI](#2-навіщо-потрібен-error-ui)
3. [Error state → Error UI](#3-error-state--error-ui)
4. [Основні елементи Error UI](#4-основні-елементи-error-ui)
5. [Повідомлення про помилку](#5-повідомлення-про-помилку)
6. [User-friendly errors](#6-user-friendly-errors)
7. [Технічні та користувацькі повідомлення](#7-технічні-та-користувацькі-повідомлення)
8. [Inline Error](#8-inline-error)
9. [Form Error](#9-form-error)
10. [Page Error](#10-page-error)
11. [Section Error](#11-section-error)
12. [Error Page](#12-error-page)
13. [Retry](#13-retry)
14. [Dismiss / Close](#14-dismiss--close)
15. [Loading → Error → Retry](#15-loading--error--retry)
16. [Empty State ≠ Error State](#16-empty-state--error-state)
17. [Not Found ≠ Server Error](#17-not-found--server-error)
18. [HTTP status і Error UI](#18-http-status-і-error-ui)
19. [Error UI для форм](#19-error-ui-для-форм)
20. [Error UI для API](#20-error-ui-для-api)
21. [Error UI для мережі](#21-error-ui-для-мережі)
22. [Error UI для авторизації](#22-error-ui-для-авторизації)
23. [Error UI для permission errors](#23-error-ui-для-permission-errors)
24. [Accessible Error UI](#24-accessible-error-ui)
25. [`role="alert"`](#25-rolealert)
26. [`aria-live`](#26-aria-live)
27. [Error UI і focus](#27-error-ui-і-focus)
28. [Повторне завантаження](#28-повторне-завантаження)
29. [Централізований компонент ErrorMessage](#29-централізований-компонент-errormessage)
30. [Reusable ErrorState](#30-reusable-errorstate)
31. [Error UI component composition](#31-error-ui-component-composition)
32. [Типізація Error UI](#32-типізація-error-ui)
33. [Error object vs UI message](#33-error-object-vs-ui-message)
34. [Не показуй `error.message` бездумно](#34-не-показуй-errormessage-бездумно)
35. [Логування та Error UI](#35-логування-та-error-ui)
36. [Error UI та Error Boundary](#36-error-ui-та-error-boundary)
37. [Error UI та async errors](#37-error-ui-та-async-errors)
38. [Error UI та event errors](#38-error-ui-та-event-errors)
39. [Поширені помилки](#39-поширені-помилки)
40. [Практичний шаблон](#40-практичний-шаблон)
41. [Питання на співбесіді](#41-питання-на-співбесіді)
42. [Рівні знань](#42-рівні-знань)
43. [Міні-шпаргалка](#43-міні-шпаргалка)
44. [Головне](#44-головне)

---

# 1. Що таке Error UI

**Error UI** — це частина інтерфейсу, яка повідомляє користувачу, що певна операція або частина застосунку не змогла виконатися.

Наприклад:

    Не вдалося завантажити користувачів.

або:

    Не вдалося зберегти зміни.

або:

    Сторінку не знайдено.

Error UI — це не сама JavaScript-помилка.

Наприклад:

    Error: Failed to fetch

це технічна інформація.

А:

    Не вдалося завантажити дані.
    Перевірте підключення до Інтернету та спробуйте ще раз.

це **Error UI**.

---

# 2. Навіщо потрібен Error UI

Якщо помилка сталася, але UI нічого не повідомляє:

    User
      ↓
    click
      ↓
    request
      ↓
    error
      ↓
    ???

Користувач може подумати, що:

- кнопка не працює;
- застосунок завис;
- натискання не зареєструвалося;
- дані ще завантажуються;
- нічого не відбулося.

Хороший Error UI пояснює:

1. **Що сталося?**
2. **Що користувач може зробити?**
3. **Чи можна повторити операцію?**
4. **Чи потрібно перейти на іншу сторінку?**
5. **Чи потрібно звернутися до адміністратора?**

---

# 3. Error state → Error UI

У React Error UI зазвичай залежить від state.

Наприклад:

    const [error, setError] = useState<string | null>(null);

Початковий стан:

    error === null

означає:

> помилки немає.

Після помилки:

    setError("Не вдалося завантажити дані");

React робить re-render.

    error state
        ↓
    re-render
        ↓
    Error UI

Наприклад:

    {error && (
      <p>{error}</p>
    )}

---

# 4. Основні елементи Error UI

Хороший Error UI може містити:

- заголовок;
- короткий опис;
- причину;
- рекомендацію;
- кнопку Retry;
- кнопку Close;
- кнопку Back;
- кнопку Login;
- support information;
- код помилки;
- technical details для development.

Наприклад:

    Не вдалося завантажити дані

    Сервер тимчасово недоступний.
    Спробуйте ще раз через кілька секунд.

    [ Спробувати ще раз ]

---

# 5. Повідомлення про помилку

Error message повинен бути:

- коротким;
- зрозумілим;
- конкретним;
- корисним;
- без зайвої технічної інформації.

---

## Погано

    Error

Занадто мало інформації.

---

## Також погано

    TypeError: Cannot read properties of undefined
    (reading 'map')

Для користувача це технічний шум.

---

## Краще

    Не вдалося завантажити список користувачів.

---

## Ще краще

    Не вдалося завантажити список користувачів.
    Перевірте підключення до Інтернету та спробуйте ще раз.

    [ Спробувати ще раз ]

---

# 6. User-friendly errors

Користувачеві не обов'язково знати:

    HTTP 500
    TypeError
    DOMException
    AbortError
    Promise rejection
    stack trace

Це інформація для розробника.

Користувачу потрібно пояснити:

    що сталося
        +
    що робити далі

---

## Формула

Корисна модель:

    Що сталося?
        +
    Що можна зробити?

Наприклад:

    Не вдалося зберегти зміни.

    Перевірте підключення до Інтернету
    та спробуйте ще раз.

---

# 7. Технічні та користувацькі повідомлення

У застосунку часто потрібно мати два рівні інформації.

## Для користувача

    Не вдалося завантажити профіль.

## Для розробника

    Error: HTTP 500
    endpoint: /api/profile
    userId: 123
    requestId: abc123

Тобто:

    developer information
        ↓
    logs / monitoring

    user information
        ↓
    UI

Не потрібно показувати весь developer information у UI.

---

# 8. Inline Error

**Inline Error** — помилка безпосередньо біля елемента, який її спричинив.

Наприклад:

    Email
    [ invalid-email ]

    Некоректний формат email.

Це дуже добре підходить для:

- form validation;
- input errors;
- password errors;
- field-level errors.

---

## Приклад

    function EmailField() {
      const [error, setError] = useState<string | null>(null);

      return (
        <div>
          <label htmlFor="email">
            Email
          </label>

          <input
            id="email"
            type="email"
          />

          {error && (
            <p role="alert">
              {error}
            </p>
          )}
        </div>
      );
    }

---

# 9. Form Error

Форма може мати:

- field errors;
- form-level error;
- server error.

Наприклад:

    Email
    [ user@example.com ]

    Password
    [ ******** ]

    Не вдалося виконати вхід.
    Перевірте email та пароль.

    [ Увійти ]

---

## Field error

    Password
    [ 123 ]

    Пароль повинен містити щонайменше 8 символів.

---

## Form-level error

    Не вдалося створити обліковий запис.

---

# 10. Page Error

**Page Error** — помилка, яка стосується всієї сторінки.

Наприклад:

    Не вдалося завантажити сторінку.

    Спробуйте ще раз.

    [ Retry ]

Це доречно, коли без даних сторінка фактично не може працювати.

---

# 11. Section Error

Не завжди потрібно блокувати всю сторінку.

Наприклад, dashboard:

    ┌─────────────────────────────┐
    │ Dashboard                  │
    ├─────────────────────────────┤
    │ Profile                     │
    │                             │
    ├─────────────────────────────┤
    │ Statistics                  │
    │                             │
    │ Failed to load statistics   │
    │ [ Retry ]                   │
    │                             │
    ├─────────────────────────────┤
    │ Recent orders               │
    │                             │
    │ Order #123                  │
    │ Order #124                  │
    └─────────────────────────────┘

Якщо статистика не завантажилася, не обов'язково ховати весь dashboard.

---

# 12. Error Page

Для повної помилки сторінки можна використовувати окремий компонент.

Наприклад:

    function ErrorPage() {
      return (
        <main>
          <h1>Щось пішло не так</h1>

          <p>
            Не вдалося завантажити сторінку.
          </p>

          <button>
            Спробувати ще раз
          </button>
        </main>
      );
    }

---

# 13. Retry

**Retry** — повторна спроба виконати невдалу операцію.

Це одна з найкорисніших дій у Error UI.

Наприклад:

    {error && (
      <div>
        <p>{error}</p>

        <button onClick={loadUsers}>
          Спробувати ще раз
        </button>
      </div>
    )}

---

## Retry flow

    request
       ↓
    error
       ↓
    Error UI
       ↓
    Retry
       ↓
    request
       ↓
    success

---

## Перед Retry

Корисно очистити стару помилку:

    async function loadUsers() {
      setError(null);
      setLoading(true);

      try {
        ...
      } catch (error) {
        setError(getErrorMessage(error));
      } finally {
        setLoading(false);
      }
    }

---

# 14. Dismiss / Close

Не всі помилки повинні залишатися на екрані.

Наприклад:

    Не вдалося зберегти зміни.

    [ Закрити ]

Можна зробити:

    const [error, setError] = useState<string | null>(null);

    {error && (
      <div>
        <p>{error}</p>

        <button onClick={() => setError(null)}>
          Закрити
        </button>
      </div>
    )}

---

# 15. Loading → Error → Retry

Типовий flow:

    idle
      ↓
    loading
      ↓
    request
      ↓
    ┌──────────────┐
    │              │
    ↓              ↓
    success       error
                   ↓
                Error UI
                   ↓
                 Retry
                   ↓
                loading

---

## Приклад

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/data");

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();

        setData(data);
      } catch (error) {
        setError("Не вдалося завантажити дані");
      } finally {
        setLoading(false);
      }
    }

---

# 16. Empty State ≠ Error State

Це дуже важлива відмінність.

## Empty State

Запит успішний, але даних немає.

    request
       ↓
    success
       ↓
    data = []

UI:

    Користувачів поки немає.

---

## Error State

Запит не завершився успішно.

    request
       ↓
    error

UI:

    Не вдалося завантажити користувачів.

---

## Не можна змішувати

Погано:

    users.length === 0

і показувати:

    Немає користувачів.

якщо насправді API request завершився помилкою.

Потрібно розрізняти:

    loading
    error
    empty
    success

---

# 17. Not Found ≠ Server Error

Так само потрібно розрізняти різні причини.

Наприклад:

    404
    ↓
    Ресурс не знайдено.

і:

    500
    ↓
    Сервер тимчасово недоступний.

Це різні ситуації.

---

## 404

Можна показати:

    Користувача не знайдено.

    [ Повернутися ]

---

## 500

Можна показати:

    Сервер тимчасово недоступний.

    [ Спробувати ще раз ]

---

# 18. HTTP status і Error UI

Приклад відповідності:

    400
    ↓
    Некоректний запит.

    401
    ↓
    Потрібно увійти в систему.

    403
    ↓
    У вас немає доступу.

    404
    ↓
    Ресурс не знайдено.

    409
    ↓
    Дані конфліктують з існуючими.

    422
    ↓
    Дані не пройшли перевірку.

    429
    ↓
    Забагато запитів. Спробуйте пізніше.

    500
    ↓
    Помилка сервера.

    503
    ↓
    Сервіс тимчасово недоступний.

Це не жорстке правило для кожного API, але корисна базова модель.

---

# 19. Error UI для форм

Форма може мати кілька рівнів помилок.

    Form
      │
      ├── field error
      │
      ├── field error
      │
      └── form error

Наприклад:

    Email
    [ wrong-email ]

    Некоректний email.

    Password
    [ 123 ]

    Пароль занадто короткий.

    Не вдалося виконати операцію.

---

## Field-level error

    {emailError && (
      <p role="alert">
        {emailError}
      </p>
    )}

---

## Form-level error

    {formError && (
      <div role="alert">
        {formError}
      </div>
    )}

---

# 20. Error UI для API

API error краще перетворити на UI-friendly message.

Наприклад:

    async function loadUsers() {
      try {
        const response = await fetch("/api/users");

        if (!response.ok) {
          throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();

        setUsers(data);
      } catch (error) {
        setError(
          "Не вдалося завантажити користувачів."
        );
      }
    }

---

## Користувач бачить

    Не вдалося завантажити користувачів.

    [ Спробувати ще раз ]

---

## Developer бачить

    HTTP 500
    /api/users

Тобто UI та debugging information розділені.

---

# 21. Error UI для мережі

Network error може виникнути через:

- відсутність Інтернету;
- DNS problem;
- server unavailable;
- connection interruption;
- timeout;
- firewall;
- інші network conditions.

UI може бути:

    Не вдалося підключитися до сервера.

    Перевірте підключення до Інтернету
    та спробуйте ще раз.

    [ Спробувати ще раз ]

---

# 22. Error UI для авторизації

Наприклад, сервер повернув `401`.

Замість:

    HTTP 401

краще:

    Ваша сесія завершилася.

    Увійдіть знову, щоб продовжити.

    [ Увійти ]

---

# 23. Error UI для permission errors

Наприклад:

    403 Forbidden

Користувачу:

    У вас немає дозволу для перегляду
    цієї сторінки.

Можна запропонувати:

    [ На головну ]

або:

    [ Повернутися ]

---

# 24. Accessible Error UI

Error UI повинен бути доступним.

Потрібно враховувати користувачів, які використовують:

- screen readers;
- keyboard navigation;
- assistive technologies.

Наприклад:

    <p role="alert">
      Не вдалося завантажити дані.
    </p>

---

# 25. `role="alert"`

`role="alert"` повідомляє assistive technologies, що з'явилася важлива інформація.

Наприклад:

    {error && (
      <p role="alert">
        {error}
      </p>
    )}

Це особливо корисно для:

- form errors;
- operation failures;
- важливих повідомлень.

---

## Але не потрібно ставити `role="alert"` всюди

Не кожне повідомлення має бути терміновим.

Наприклад, якщо на сторінці постійно присутній великий error block, можна вибрати іншу семантику.

---

# 26. `aria-live`

Для динамічних повідомлень можна використовувати:

    aria-live="polite"

Наприклад:

    <p aria-live="polite">
      {statusMessage}
    </p>

`polite` означає, що повідомлення можна оголосити користувачу без негайного переривання поточної озвучки.

---

## `assertive`

Для дуже важливих повідомлень:

    aria-live="assertive"

Але використовувати його потрібно обережно.

Не кожна помилка повинна агресивно переривати screen reader.

---

# 27. Error UI і focus

Для важливих помилок іноді потрібно перевести focus на error message або error summary.

Наприклад, після submit:

    [Submit]
       ↓
    validation errors
       ↓
    focus → error summary

Це особливо важливо для складних форм.

---

## Приклад

    const errorRef = useRef<HTMLDivElement>(null);

Після появи помилки:

    errorRef.current?.focus();

Error container:

    <div
      ref={errorRef}
      tabIndex={-1}
      role="alert"
    >
      Не вдалося виконати операцію.
    </div>

---

# 28. Повторне завантаження

Для помилок завантаження даних дуже корисний Retry.

Наприклад:

    function ErrorState({
      message,
      onRetry,
    }: {
      message: string;
      onRetry: () => void;
    }) {
      return (
        <div>
          <p role="alert">
            {message}
          </p>

          <button onClick={onRetry}>
            Спробувати ще раз
          </button>
        </div>
      );
    }

---

## Використання

    <ErrorState
      message="Не вдалося завантажити користувачів."
      onRetry={loadUsers}
    />

Це вже reusable component.

---

# 29. Централізований компонент `ErrorMessage`

Можна створити простий компонент:

    type ErrorMessageProps = {
      message: string;
    };

    function ErrorMessage({
      message,
    }: ErrorMessageProps) {
      return (
        <p role="alert">
          {message}
        </p>
      );
    }

Використання:

    {error && (
      <ErrorMessage message={error} />
    )}

---

## Перевага

Усі помилки можуть мати однакову:

- структуру;
- accessibility;
- стилі;
- spacing;
- typography.

---

# 30. Reusable `ErrorState`

Для більших error blocks:

    type ErrorStateProps = {
      title?: string;
      message: string;
      onRetry?: () => void;
    };

    function ErrorState({
      title = "Щось пішло не так",
      message,
      onRetry,
    }: ErrorStateProps) {
      return (
        <div role="alert">
          <h2>{title}</h2>

          <p>{message}</p>

          {onRetry && (
            <button onClick={onRetry}>
              Спробувати ще раз
            </button>
          )}
        </div>
      );
    }

---

## Використання

    <ErrorState
      title="Не вдалося завантажити дані"
      message="Перевірте підключення та спробуйте ще раз."
      onRetry={loadData}
    />

---

# 31. Error UI component composition

Error UI також добре підходить для композиції компонентів.

Наприклад:

    <ErrorState>
      <ErrorIcon />
      <ErrorTitle />
      <ErrorMessage />
      <RetryButton />
    </ErrorState>

Або:

    <ErrorState
      title="Не вдалося завантажити дані"
      message="Спробуйте ще раз."
      onRetry={loadData}
    />

Головна ідея:

> Error UI повинен бути reusable, а не копіюватися в кожному компоненті.

---

# 32. Типізація Error UI

Наприклад:

    type ErrorStateProps = {
      message: string;
      title?: string;
      onRetry?: () => void;
    };

Це дозволяє використовувати:

    <ErrorState
      message="Не вдалося завантажити дані."
    />

або:

    <ErrorState
      title="Помилка сервера"
      message="Спробуйте пізніше."
      onRetry={loadData}
    />

---

## Callback може бути async

Наприклад:

    type ErrorStateProps = {
      message: string;
      onRetry?: () => void;
    };

Навіть якщо callback запускає async operation:

    <ErrorState
      message="Request failed"
      onRetry={loadData}
    />

Сам компонент `ErrorState` не обов'язково повинен знати, як саме працює `loadData`.

---

# 33. Error object vs UI message

Не потрібно передавати всю технічну помилку в UI.

Наприклад, замість:

    <ErrorState
      error={error}
    />

часто краще:

    <ErrorState
      message="Не вдалося завантажити дані."
    />

А технічний error:

    console.error(error);

залишається для debugging.

---

## Можна мати обидва рівні

    catch (error) {
      console.error(error);

      setError(
        "Не вдалося завантажити дані."
      );
    }

---

# 34. Не показуй `error.message` бездумно

Наприклад:

    catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    }

Це технічно можливо, але не завжди правильно.

`error.message` може бути:

    Failed to fetch

або:

    HTTP 500

або:

    Cannot read properties of undefined

Це не завжди хороший user-facing текст.

---

## Краще

    catch (error) {
      console.error(error);

      setError(
        "Не вдалося завантажити дані."
      );
    }

Тобто:

    technical error
          ↓
       developer
          │
          └── logs

    user-friendly message
          ↓
        user
          │
          └── UI

---

# 35. Логування та Error UI

Error UI не замінює logging.

Хороший flow:

    error
      ├──→ log/report
      │
      └──→ user-friendly UI

Наприклад:

    catch (error) {
      console.error(error);

      setError(
        "Не вдалося виконати операцію."
      );
    }

У production замість простого `console.error` може використовуватися система error monitoring.

---

# 36. Error UI та Error Boundary

Ці поняття потрібно розрізняти.

## Error Boundary

Відповідає за перехоплення певних React errors.

Умовно:

    React error
       ↓
    Error Boundary
       ↓
    fallback UI

---

## Error UI

Це сам UI:

    Something went wrong.

    [ Try again ]

Тобто:

    Error Boundary
         ↓
    determines that error occurred

    Error UI
         ↓
    shows useful interface

---

## Приклад

    <ErrorBoundary
      fallback={<ErrorState />}
    >
      <App />
    </ErrorBoundary>

Тут:

    Error Boundary
        ↓
    catches supported React error
        ↓
    renders ErrorState

---

# 37. Error UI та async errors

Для async error flow:

    fetch()
      ↓
    rejected Promise
      ↓
    catch
      ↓
    setError(...)
      ↓
    re-render
      ↓
    Error UI

Наприклад:

    try {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error("Request failed");
      }

      const data = await response.json();

      setUsers(data);
    } catch (error) {
      setError(
        "Не вдалося завантажити користувачів."
      );
    }

---

# 38. Error UI та event errors

Event handler також повинен самостійно оновити UI.

Наприклад:

    async function handleSave() {
      setError(null);

      try {
        await saveData();
      } catch (error) {
        setError(
          "Не вдалося зберегти зміни."
        );
      }
    }

UI:

    {error && (
      <ErrorMessage message={error} />
    )}

Flow:

    click
      ↓
    handleSave()
      ↓
    async operation
      ↓
    error
      ↓
    setError()
      ↓
    Error UI

---

# 39. Поширені помилки

## 39.1. Показувати просто `Error`

Погано:

    <p>Error</p>

Користувач не знає, що сталося.

---

## 39.2. Показувати stack trace

Погано:

    TypeError: Cannot read properties of undefined
    at UserList.tsx:42
    at renderWithHooks...
    at ...

Це developer information.

---

## 39.3. Не давати користувачу наступної дії

Погано:

    Не вдалося завантажити дані.

Краще:

    Не вдалося завантажити дані.

    [ Спробувати ще раз ]

якщо retry має сенс.

---

## 39.4. Показувати Retry там, де він не допоможе

Наприклад:

    403 Forbidden

Безглуздо постійно пропонувати:

    [ Retry ]

якщо проблема полягає у відсутності permission.

Краще:

    У вас немає доступу до цього ресурсу.

    [ Повернутися ]

---

## 39.5. Змішувати Empty і Error

Погано:

    users.length === 0
        ↓
    "Нічого не знайдено"

якщо запит насправді завершився помилкою.

---

## 39.6. Ховати помилку після невдалого запиту

Якщо API не відповів, не варто просто показувати:

    []

або:

    Loading...

назавжди.

Потрібно показати відповідний error state.

---

## 39.7. Забувати про accessibility

Погано:

    <div>
      Error message
    </div>

Для важливих динамічних помилок потрібно продумати:

- `role="alert"`;
- `aria-live`;
- keyboard navigation;
- focus.

---

# 40. Практичний шаблон

Ось хороший базовий компонент:

    type ErrorStateProps = {
      title?: string;
      message: string;
      onRetry?: () => void;
    };

    function ErrorState({
      title = "Щось пішло не так",
      message,
      onRetry,
    }: ErrorStateProps) {
      return (
        <section
          role="alert"
          aria-labelledby="error-title"
        >
          <h2 id="error-title">
            {title}
          </h2>

          <p>{message}</p>

          {onRetry && (
            <button onClick={onRetry}>
              Спробувати ще раз
            </button>
          )}
        </section>
      );
    }

---

## Використання

    function Users() {
      const [users, setUsers] = useState<User[]>([]);
      const [loading, setLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      async function loadUsers() {
        setLoading(true);
        setError(null);

        try {
          const response = await fetch("/api/users");

          if (!response.ok) {
            throw new Error(
              `HTTP ${response.status}`
            );
          }

          const data = await response.json();

          setUsers(data);
        } catch (error) {
          console.error(error);

          setError(
            "Не вдалося завантажити користувачів."
          );
        } finally {
          setLoading(false);
        }
      }

      useEffect(() => {
        loadUsers();
      }, []);

      if (loading) {
        return <p>Завантаження...</p>;
      }

      if (error) {
        return (
          <ErrorState
            title="Помилка завантаження"
            message={error}
            onRetry={loadUsers}
          />
        );
      }

      return (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      );
    }

---

# 41. Практичний шаблон із різними станами

Зручно мислити про UI як про набір станів:

    idle
    loading
    success
    empty
    error

Наприклад:

    if (loading) {
      return <Loading />;
    }

    if (error) {
      return (
        <ErrorState
          message={error}
          onRetry={loadData}
        />
      );
    }

    if (data.length === 0) {
      return <EmptyState />;
    }

    return <DataList data={data} />;

Це дуже важливий React pattern.

---

# 42. Практичний шаблон для dashboard

Наприклад:

    function Dashboard() {
      return (
        <main>
          <Header />

          <Profile />

          <Statistics />

          <RecentOrders />

          <Notifications />
        </main>
      );
    }

Кожна секція може мати власний стан:

    Statistics
        ↓
    loading / success / error

    RecentOrders
        ↓
    loading / success / error

Це часто краще, ніж блокувати весь dashboard через помилку однієї секції.

---

# 43. Page-level vs component-level Error UI

## Page-level

Вся сторінка не може нормально працювати.

    <ErrorPage />

---

## Component-level

Помилка стосується лише одного блоку.

    <StatisticsError />

---

## Field-level

Помилка стосується конкретного input.

    <FieldError />

Тобто:

    Application
        │
        ├── Page Error
        │
        ├── Section Error
        │
        ├── Component Error
        │
        └── Field Error

Це допомагає не показувати надмірно великий error UI для маленької проблеми.

---

# 44. Error UI як частина UX

Error handling — це не лише технічна задача.

Це також UX.

Користувач повинен розуміти:

    Що сталося?
         ↓
    Чи це моя помилка?
         ↓
    Чи потрібно щось зробити?
         ↓
    Що саме зробити?
         ↓
    Чи можна продовжити роботу?

---

## Хороше повідомлення

    Не вдалося зберегти зміни.

    Перевірте підключення до Інтернету
    та спробуйте ще раз.

    [ Спробувати ще раз ]

---

## Погане повідомлення

    Error 500.

---

# 45. Не звинувачуй користувача

Погано:

    Ви неправильно виконали операцію.

Краще:

    Не вдалося виконати операцію.

Або конкретніше:

    Пароль повинен містити щонайменше
    8 символів.

Помилка повинна допомагати користувачу, а не просто повідомляти про проблему.

---

# 46. Error UI і дизайн

Error UI повинен бути помітним, але не руйнівним.

Важливо:

- чітка ієрархія;
- хороший контраст;
- зрозумілий текст;
- зрозуміла кнопка дії;
- достатній spacing;
- accessibility.

Не обов'язково робити кожну помилку величезним червоним блоком.

---

# 47. Error UI і кольори

Колір може допомогти:

    error → red
    warning → yellow/orange
    success → green
    info → blue

Але:

> Не покладайся тільки на колір.

Наприклад, замість:

    🔴

краще мати:

    Помилка

або:

    Не вдалося зберегти зміни.

Так інформація залишається зрозумілою навіть без сприйняття кольорів.

---

# 48. Error UI і кнопки

Текст кнопки повинен описувати дію.

Погано:

    [ OK ]

Краще:

    [ Спробувати ще раз ]

або:

    [ Повернутися ]

або:

    [ Увійти ]

або:

    [ Закрити ]

Користувач повинен розуміти, що станеться після натискання.

---

# 49. Retry не завжди доречний

Retry добре підходить для:

- network errors;
- temporary server errors;
- loading failures;
- transient errors.

Retry може бути недоречним для:

- validation errors;
- permission errors;
- authentication errors;
- not found;
- invalid user input.

Наприклад:

    403
      ↓
    Retry
      ↓
    403
      ↓
    Retry
      ↓
    403

це не вирішує проблему.

Потрібна інша дія:

    [ Увійти ]

або:

    [ Повернутися ]

---

# 50. Retry і idempotency

Для складних операцій важливо розуміти, що повторення не завжди безпечне.

Наприклад:

    POST /orders

може створити замовлення.

Якщо клієнт не знає, чи сервер уже виконав операцію, автоматичний retry може створити дубль.

Тому:

> Retry — це не просто "виконати request ще раз".

Потрібно враховувати тип операції та backend behavior.

---

# 51. Error UI і optimistic updates

При optimistic update UI може спочатку показати:

    Saved!

але сервер може відповісти помилкою.

Тоді потрібно:

    optimistic update
         ↓
       error
         ↓
    rollback
         ↓
    show Error UI

Наприклад:

    Favorite ❤️

Користувач натиснув:

    ❤️

UI одразу змінився.

Потім:

    API error

Потрібно:

    rollback
       +
    повідомити користувача

---

# 52. Error UI і form submission

Типовий flow:

    submit
      ↓
    validation
      ↓
    valid?
      │
      ├── no → field errors
      │
      └── yes
           ↓
         loading
           ↓
         API
           ↓
       ┌───┴───┐
       ↓       ↓
    success   error
                ↓
             form error
                ↓
              retry

Це дуже корисна модель для реальних застосунків.

---

# 53. Error UI і server validation

Frontend validation не гарантує, що сервер прийме дані.

Наприклад:

    email = user@example.com

Frontend:

    valid

Server:

    email already exists

Тоді backend може повернути:

    409 Conflict

UI:

    Користувач із таким email уже існує.

Тому server errors також повинні мати зрозумілий Error UI.

---

# 54. Error UI і глобальний fallback

У великих applications можуть існувати кілька рівнів:

    Field Error
        ↓
    Form Error
        ↓
    Section Error
        ↓
    Page Error
        ↓
    Application Error

Чим вище рівень, тим більша частина UI не працює.

---

# 55. Питання на співбесіді

## 1. Що таке Error UI?

Це UI, який повідомляє користувачу про помилку та, за можливості, пропонує спосіб відновлення.

---

## 2. Чим Error UI відрізняється від Error Boundary?

Error Boundary — механізм React для перехоплення певних помилок у React tree.

Error UI — інтерфейс, який показує інформацію про помилку користувачу.

---

## 3. Чим Error UI відрізняється від Error state?

Error state — дані про стан помилки.

Error UI — візуальне представлення цього стану.

Наприклад:

    error = "Request failed"

це state.

А:

    <ErrorState message={error} />

це UI.

---

## 4. Що краще показати користувачу: `error.message` чи власний текст?

У більшості випадків — власний user-friendly текст.

Технічну помилку краще логувати окремо.

---

## 5. Що таке Empty State?

Стан, коли операція успішна, але даних немає.

Це не помилка.

---

## 6. Коли використовувати Retry?

Коли повторення операції потенційно може вирішити проблему.

Наприклад:

- network failure;
- temporary server error.

---

## 7. Чи треба показувати Retry для `403`?

Зазвичай ні.

Потрібна інша дія:

- login;
- request access;
- go back.

---

## 8. Для чого `role="alert"`?

Для повідомлення assistive technologies про важливу динамічну інформацію.

---

## 9. Чому не варто показувати stack trace користувачу?

Тому що це developer information, яка незрозуміла користувачу та може розкривати зайві технічні деталі.

---

## 10. Чому Error UI має бути reusable?

Щоб:

- не дублювати код;
- мати єдиний дизайн;
- мати однакову accessibility behavior;
- спростити підтримку.

---

# 56. Рівні знань

## 🟢 Core

Потрібно знати:

- що таке Error UI;
- error state;
- loading state;
- empty state;
- Retry;
- user-friendly messages;
- `role="alert"`;
- різницю між error і empty.

---

# 57. 🟢 Junior

Потрібно вміти:

- створити `ErrorMessage`;
- створити `ErrorState`;
- додати Retry;
- показати loading/error/success;
- обробити API error;
- не показувати технічні повідомлення користувачу;
- розрізняти `404`, `401`, `403`, `500`;
- правильно працювати з form errors.

---

# 58. 🟡 Middle

Потрібно розуміти:

- page-level vs component-level errors;
- reusable error components;
- error classification;
- retry strategy;
- accessibility;
- focus management;
- optimistic update rollback;
- server validation;
- error mapping;
- API error normalization.

---

# 59. 🔴 Senior

Потрібно проектувати систему:

    API errors
        ↓
    normalized error model
        ↓
    application state
        ↓
    reusable Error UI
        ↓
    recovery action
        ↓
    logging / monitoring

І розуміти:

- UX;
- accessibility;
- retryability;
- idempotency;
- optimistic updates;
- error boundaries;
- global error handling;
- monitoring;
- error recovery;
- fault isolation.

---

# 60. Міні-шпаргалка

## Error state

    const [error, setError] = useState<string | null>(null);

---

## Show error

    {error && (
      <p role="alert">
        {error}
      </p>
    )}

---

## Clear error

    setError(null);

---

## Set error

    setError(
      "Не вдалося завантажити дані."
    );

---

## Retry

    <button onClick={loadData}>
      Спробувати ще раз
    </button>

---

## Error component

    function ErrorMessage({
      message,
    }: {
      message: string;
    }) {
      return (
        <p role="alert">
          {message}
        </p>
      );
    }

---

## Reusable ErrorState

    type ErrorStateProps = {
      message: string;
      onRetry?: () => void;
    };

    function ErrorState({
      message,
      onRetry,
    }: ErrorStateProps) {
      return (
        <section role="alert">
          <p>{message}</p>

          {onRetry && (
            <button onClick={onRetry}>
              Спробувати ще раз
            </button>
          )}
        </section>
      );
    }

---

## Async + Error UI

    async function loadData() {
      setLoading(true);
      setError(null);

      try {
        const response = await fetch("/api/data");

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();

        setData(data);
      } catch (error) {
        console.error(error);

        setError(
          "Не вдалося завантажити дані."
        );
      } finally {
        setLoading(false);
      }
    }

---

## Основні UI states

    idle
    loading
    success
    empty
    error

---

## Основні рівні Error UI

    field error
    form error
    component error
    section error
    page error
    application error

---

# 61. Головне

Error UI — це не просто напис:

    Error

Хороший Error UI повинен відповісти на два основних питання:

    Що сталося?
        +
    Що робити далі?

---

## Базова модель

    async operation
         ↓
       success
         │
         └──→ normal UI

    async operation
         ↓
        error
         ↓
    classify error
         ↓
    user-friendly message
         ↓
       Error UI
         ↓
    recovery action

---

## Запам'ятай

> **Error state — це стан React, Error UI — його представлення.**

> **Не плутай Error, Error Boundary та Error UI.**

> **Empty State — не Error State.**

> **404, 403, 401 і 500 — різні ситуації та можуть вимагати різних дій користувача.**

> **Не показуй користувачу сирі технічні помилки.**

> **Показуй не тільки проблему, а й можливий наступний крок.**

> **Retry повинен мати сенс для конкретного типу помилки.**

> **Для важливих динамічних помилок враховуй accessibility: `role="alert"`, `aria-live`, focus.**

> **Error UI краще робити reusable component, а не копіювати markup по всьому application.**

> **Великий застосунок повинен ізолювати помилки: помилка однієї секції не обов'язково повинна ламати всю сторінку.**

---

## Найпростіша модель для React

    const [error, setError] = useState<string | null>(null);

    async function loadData() {
      setError(null);

      try {
        const response = await fetch("/api/data");

        if (!response.ok) {
          throw new Error("Request failed");
        }

        const data = await response.json();

        setData(data);
      } catch (error) {
        console.error(error);

        setError(
          "Не вдалося завантажити дані."
        );
      }
    }

    return (
      <>
        {error ? (
          <ErrorState
            message={error}
            onRetry={loadData}
          />
        ) : (
          <DataView />
        )}
      </>
    );

Це одна з базових моделей, яку варто добре розуміти перед переходом до складніших систем error handling.

---

# 62. Зв'язок з іншими темами

Ця тема логічно пов'язана з:

    10-error-handling/
    │
    ├── 01-error-boundaries
    │      ↓
    │   React render errors
    │
    ├── 02-event-errors
    │      ↓
    │   errors in event handlers
    │
    ├── 03-async-errors
    │      ↓
    │   Promise / fetch / async errors
    │
    └── 04-error-ui
           ↓
        how to show errors to the user

Тобто:

    error occurs
         ↓
    determine type
         ↓
    handle error
         ↓
    create appropriate UI
         ↓
    give user recovery action

> **Головна ідея Error UI: помилка не повинна бути кінцевою точкою. Хороший інтерфейс перетворює помилку на зрозумілий стан застосунку та, якщо можливо, дає користувачу шлях для відновлення роботи.**