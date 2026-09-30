# Conditional Rendering у React

**Conditional rendering** — це відображення різного UI залежно від певної умови.

У React conditional rendering базується на звичайному JavaScript:

- `if / else`
- `if`
- ternary operator `condition ? A : B`
- logical AND `condition && A`
- logical OR `condition || A`
- `switch`
- змінні, які містять JSX
- функції, що повертають JSX

Основна ідея:

    condition
        ↓
    ┌───────────────┐
    │               │
    true           false
    │               │
    ▼               ▼
    UI A            UI B

Наприклад:

    function Status({ isOnline }) {
      return (
        <p>
          {isOnline ? "Online" : "Offline"}
        </p>
      );
    }

Якщо:

    isOnline === true

отримаємо:

    Online

Якщо:

    isOnline === false

отримаємо:

    Offline

---

# 1. Що потрібно знати

Основні поняття цієї теми:

- conditional rendering
- `if`
- `if / else`
- early return
- ternary operator
- logical `&&`
- logical `||`
- `null`
- `undefined`
- boolean values у JSX
- conditional attributes
- conditional `className`
- conditional components
- nested conditions
- `switch`
- variables containing JSX
- helper functions
- conditional rendering lists
- loading / error / empty states
- authentication UI
- common mistakes
- truthy / falsy values
- `0` у JSX
- `&&` та falsy values
- composition замість складних умов

---

# 2. Що таке Conditional Rendering

У звичайному JavaScript ми часто пишемо:

    if (isLoggedIn) {
      console.log("Welcome");
    } else {
      console.log("Please login");
    }

У React ідея та сама, але результатом умови може бути JSX.

    if (isLoggedIn) {
      return <h1>Welcome</h1>;
    }

або:

    return isLoggedIn
      ? <h1>Welcome</h1>
      : <Login />;

Тобто React не має окремої спеціальної системи умов.

Використовується звичайний JavaScript.

---

# 3. Чому Conditional Rendering важливий

Реальний UI майже ніколи не є статичним.

Наприклад:

    user logged in
        ↓
    show dashboard

    user logged out
        ↓
    show login

Або:

    data loading
        ↓
    show spinner

    data loaded
        ↓
    show content

    request failed
        ↓
    show error

Або:

    products.length > 0
        ↓
    show products

    products.length === 0
        ↓
    show "No products"

Типова модель:

    DATA
      ↓
    CONDITION
      ↓
    UI

---

# 4. `if`

Найпростіший варіант — звичайний `if`.

Наприклад:

    function Greeting({ isLoggedIn }) {
      if (isLoggedIn) {
        return <h1>Welcome!</h1>;
      }

      return <h1>Please log in.</h1>;
    }

Якщо:

    isLoggedIn === true

компонент повертає:

    <h1>Welcome!</h1>

Інакше:

    <h1>Please log in.</h1>

---

# 5. `if / else`

Можна явно використовувати `else`.

    function Greeting({ isLoggedIn }) {
      if (isLoggedIn) {
        return <h1>Welcome!</h1>;
      } else {
        return <h1>Please log in.</h1>;
      }
    }

Це коректний JavaScript.

Але якщо кожна гілка робить `return`, часто `else` вже не потрібен:

    function Greeting({ isLoggedIn }) {
      if (isLoggedIn) {
        return <h1>Welcome!</h1>;
      }

      return <h1>Please log in.</h1>;
    }

Другий варіант часто читається простіше.

---

# 6. Early return

**Early return** — один із найзручніших способів conditional rendering.

Наприклад:

    function Dashboard({ user }) {
      if (!user) {
        return <Login />;
      }

      return (
        <main>
          <h1>Dashboard</h1>
          <p>Welcome, {user.name}</p>
        </main>
      );
    }

Спочатку перевіряється особливий випадок:

    if (!user) {
      return <Login />;
    }

Після цього основний код може працювати так, ніби `user` існує.

---

# 7. Early return для loading

Дуже поширений патерн:

    function UsersPage({ isLoading, users }) {
      if (isLoading) {
        return <p>Loading...</p>;
      }

      return (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      );
    }

Спочатку перевіряємо:

    isLoading

Якщо `true` — повертаємо loading UI.

Інакше продовжуємо rendering.

---

# 8. Early return для error

    function UsersPage({
      isLoading,
      error,
      users
    }) {
      if (isLoading) {
        return <p>Loading...</p>;
      }

      if (error) {
        return <p>Error: {error}</p>;
      }

      return (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      );
    }

Це дуже поширена структура:

    loading
      ↓
    error
      ↓
    content

---

# 9. Ternary operator

Ternary operator має форму:

    condition ? valueIfTrue : valueIfFalse

У React:

    function Greeting({ isLoggedIn }) {
      return (
        <h1>
          {isLoggedIn ? "Welcome!" : "Please log in."}
        </h1>
      );
    }

Якщо:

    isLoggedIn === true

отримаємо:

    Welcome!

Інакше:

    Please log in.

---

# 10. Ternary з JSX

Ternary можна використовувати для вибору JSX.

    function UserStatus({ isOnline }) {
      return (
        <div>
          {isOnline ? (
            <Online />
          ) : (
            <Offline />
          )}
        </div>
      );
    }

Це дуже поширений React-патерн.

---

# 11. Ternary для двох компонентів

Наприклад:

    function Page({ isLoggedIn }) {
      return (
        <main>
          {isLoggedIn ? (
            <Dashboard />
          ) : (
            <Login />
          )}
        </main>
      );
    }

Умова визначає, який компонент буде відображений.

---

# 12. Ternary для тексту

Не обов'язково повертати JSX.

    <p>
      {isOnline ? "Online" : "Offline"}
    </p>

Це також conditional rendering.

---

# 13. Ternary для атрибутів

Наприклад:

    <button
      className={isActive ? "active" : "inactive"}
    >
      Save
    </button>

Або:

    <button
      disabled={isSaving ? true : false}
    >
      Save
    </button>

У випадку boolean часто ternary взагалі не потрібен:

    <button disabled={isSaving}>
      Save
    </button>

Тому не потрібно використовувати ternary там, де значення вже є boolean.

---

# 14. Ternary та `className`

Дуже поширений приклад:

    function Button({ isActive }) {
      return (
        <button
          className={isActive ? "active" : "inactive"}
        >
          Button
        </button>
      );
    }

З CSS Modules:

    import styles from "./Button.module.css";

    function Button({ isActive }) {
      return (
        <button
          className={
            isActive
              ? styles.active
              : styles.inactive
          }
        >
          Button
        </button>
      );
    }

---

# 15. Logical AND `&&`

Ще один дуже важливий патерн:

    condition && <Component />

Наприклад:

    function Notification({ hasNotification }) {
      return (
        <div>
          {hasNotification && (
            <NotificationBadge />
          )}
        </div>
      );
    }

Якщо:

    hasNotification === true

React відобразить:

    <NotificationBadge />

Якщо:

    hasNotification === false

нічого не буде відображено.

---

# 16. Коли використовувати `&&`

`&&` добре підходить, коли є тільки два варіанти:

    condition
       ↓
    true  → показати
    false → нічого

Наприклад:

    {isAdmin && <AdminPanel />}

або:

    {hasError && <ErrorMessage />}

або:

    {isLoggedIn && <LogoutButton />}

---

# 17. `&&` проти ternary

Якщо потрібно:

> показати компонент або нічого

можна:

    {isAdmin && <AdminPanel />}

Якщо потрібно:

> показати A або B

потрібен ternary:

    {isAdmin ? <AdminPanel /> : <UserPanel />}

Отже:

    condition && A

означає:

    true  → A
    false → nothing

А:

    condition ? A : B

означає:

    true  → A
    false → B

---

# 18. Важлива особливість `&&`

Потрібно знати, що JavaScript повертає не обов'язково boolean.

Наприклад:

    0 && <Message />

результатом JavaScript expression буде:

    0

А React може відобразити `0`.

Тому такий код:

    {items.length && <ItemList items={items} />}

може дати несподіваний результат.

Якщо:

    items.length === 0

може бути відображено:

    0

---

# 19. Правильніше перевіряти boolean

Замість:

    {items.length && (
      <ItemList items={items} />
    )}

можна:

    {items.length > 0 && (
      <ItemList items={items} />
    )}

Тепер умова:

    items.length > 0

завжди boolean.

---

# 20. `&&` та інші falsy values

У JavaScript falsy values включають:

    false
    0
    -0
    0n
    ""
    null
    undefined
    NaN

При використанні `&&` потрібно пам'ятати, що React поводиться з різними значеннями по-різному.

Зокрема:

    false
    null
    undefined

не відображаються як текст.

А:

    0

відображається.

Тому для умов краще використовувати явні boolean expressions:

    count > 0

замість:

    count

якщо результат повинен бути саме boolean.

---

# 21. Logical OR `||`

Можна використовувати:

    value || fallback

Наприклад:

    function UserName({ name }) {
      return (
        <h2>
          {name || "Unknown user"}
        </h2>
      );
    }

Якщо `name` truthy — використовується `name`.

Якщо falsy — `"Unknown user"`.

---

# 22. `||` для fallback

Наприклад:

    <p>
      {user.nickname || user.name}
    </p>

Якщо nickname існує — показуємо його.

Якщо nickname falsy — показуємо name.

Але потрібно пам'ятати про всі falsy values.

Наприклад:

    0 || 10

дасть:

    10

Якщо `0` є валідним значенням, це може бути неправильно.

---

# 23. Nullish coalescing `??`

Для fallback іноді краще використовувати:

    ??

Наприклад:

    value ?? fallback

Різниця:

    0 || 10

дає:

    10

А:

    0 ?? 10

дає:

    0

`??` спрацьовує лише для:

    null
    undefined

Наприклад:

    function Price({ price }) {
      return (
        <p>
          {price ?? "Price unavailable"}
        </p>
      );
    }

Якщо:

    price === 0

буде показано:

    0

---

# 24. `if` vs ternary

Обидва підходи правильні.

### `if`

    function Page({ isLoggedIn }) {
      if (!isLoggedIn) {
        return <Login />;
      }

      return <Dashboard />;
    }

### Ternary

    function Page({ isLoggedIn }) {
      return isLoggedIn
        ? <Dashboard />
        : <Login />;
    }

Практичне правило:

- складна логіка → `if`;
- простий вибір A/B → ternary;
- показати або нічого → `&&`.

---

# 25. `if` не можна поставити безпосередньо всередині JSX

Не можна:

    return (
      <div>
        if (isLoggedIn) {
          <Dashboard />
        }
      </div>
    );

Причина: JSX expression `{...}` очікує JavaScript expression, а `if` є statement.

Потрібно використовувати:

    {isLoggedIn && <Dashboard />}

або:

    {isLoggedIn ? <Dashboard /> : <Login />}

або підготувати JSX перед `return`.

---

# 26. Змінна, яка містить JSX

Якщо умова складніша, можна підготувати JSX у змінній.

    function Page({ isLoggedIn, isAdmin }) {
      let content;

      if (!isLoggedIn) {
        content = <Login />;
      } else if (isAdmin) {
        content = <AdminDashboard />;
      } else {
        content = <UserDashboard />;
      }

      return (
        <main>
          {content}
        </main>
      );
    }

Це корисний підхід для складнішого conditional rendering.

---

# 27. `switch`

Для великої кількості взаємовиключних варіантів можна використовувати `switch`.

Наприклад:

    function Status({ status }) {
      switch (status) {
        case "loading":
          return <Loading />;

        case "success":
          return <Success />;

        case "error":
          return <Error />;

        default:
          return null;
      }
    }

Це може бути зрозуміліше, ніж довгий ланцюг ternary.

---

# 28. `switch` з JSX variable

Можна також:

    function Status({ status }) {
      let content;

      switch (status) {
        case "loading":
          content = <Loading />;
          break;

        case "success":
          content = <Success />;
          break;

        case "error":
          content = <Error />;
          break;

        default:
          content = null;
      }

      return (
        <section>
          {content}
        </section>
      );
    }

---

# 29. Nested ternary

Можна написати:

    return isLoading
      ? <Loading />
      : hasError
        ? <Error />
        : <Content />;

Технічно це працює.

Але при збільшенні кількості умов код швидко стає важким для читання.

Наприклад:

    return isLoading
      ? <Loading />
      : hasError
        ? <Error />
        : isEmpty
          ? <Empty />
          : isAdmin
            ? <Admin />
            : <Content />;

Такий код краще переписати через `if`, `switch` або окрему функцію.

---

# 30. Практичне правило для ternary

Добре:

    {isOnline ? "Online" : "Offline"}

Добре:

    {isAdmin ? <AdminPanel /> : <UserPanel />}

Потенційно погано:

    {a ? b : c ? d : e}

Якщо умова перестає читатися з першого погляду — краще змінити структуру.

---

# 31. Helper function для conditional rendering

Складну логіку можна винести у функцію.

    function renderContent(status) {
      if (status === "loading") {
        return <Loading />;
      }

      if (status === "error") {
        return <Error />;
      }

      return <Content />;
    }

Потім:

    function Page({ status }) {
      return (
        <main>
          {renderContent(status)}
        </main>
      );
    }

Це може зробити основний JSX значно чистішим.

---

# 32. Функція, яка повертає JSX

Можна використовувати окрему функцію:

    function getStatusContent(status) {
      switch (status) {
        case "loading":
          return <Loading />;

        case "error":
          return <Error />;

        case "success":
          return <Success />;

        default:
          return null;
      }
    }

    function Page({ status }) {
      return (
        <main>
          {getStatusContent(status)}
        </main>
      );
    }

---

# 33. `null` як результат rendering

React дозволяє компоненту нічого не відображати, повернувши `null`.

Наприклад:

    function AdminPanel({ isAdmin }) {
      if (!isAdmin) {
        return null;
      }

      return <section>Admin panel</section>;
    }

Якщо:

    isAdmin === false

компонент нічого не рендерить.

Це дуже корисно для компонентів, які повинні бути умовними.

---

# 34. `null` vs empty element

Можна написати:

    return null;

або:

    return <div />;

Це не одне й те саме.

`null` означає:

> компонент не відображає React node.

А:

    <div />

створює DOM-елемент.

Якщо нічого не потрібно показувати, краще:

    return null;

---

# 35. Conditional rendering компонента

Наприклад:

    function App({ isLoggedIn }) {
      return (
        <main>
          {isLoggedIn && <Dashboard />}
        </main>
      );
    }

React вирішує, чи включати `Dashboard` у render tree.

---

# 36. Conditional rendering HTML element

Умова може визначати сам HTML:

    function Message({ isError }) {
      return isError ? (
        <strong>Error</strong>
      ) : (
        <p>Everything is OK</p>
      );
    }

---

# 37. Conditional rendering атрибутів

Наприклад:

    <button
      disabled={isLoading}
    >
      {isLoading ? "Saving..." : "Save"}
    </button>

Тут одночасно умовні:

- `disabled`;
- текст кнопки.

---

# 38. Conditional `className`

    function Button({ isActive }) {
      return (
        <button
          className={
            isActive
              ? "button active"
              : "button"
          }
        >
          Button
        </button>
      );
    }

Або CSS Modules:

    import styles from "./Button.module.css";

    function Button({ isActive }) {
      return (
        <button
          className={
            isActive
              ? styles.active
              : styles.button
          }
        >
          Button
        </button>
      );
    }

---

# 39. Conditional styles

Можна змінювати inline styles:

    function Status({ isError }) {
      return (
        <p
          style={{
            color: isError
              ? "red"
              : "green"
          }}
        >
          Status
        </p>
      );
    }

Для більших UI-проєктів зазвичай краще використовувати CSS classes або CSS Modules, але сам принцип conditional rendering тут той самий.

---

# 40. Conditional attributes

Наприклад:

    function Link({ isExternal }) {
      return (
        <a
          href="/profile"
          target={
            isExternal
              ? "_blank"
              : undefined
          }
        >
          Profile
        </a>
      );
    }

Або:

    <input
      disabled={isDisabled}
      readOnly={isReadOnly}
    />

Boolean props/attributes можна безпосередньо отримувати з умов.

---

# 41. Conditional rendering тексту

Найпростіший випадок:

    <p>
      {isLoading ? "Loading..." : "Loaded"}
    </p>

Або:

    <p>
      {count === 1
        ? "1 item"
        : `${count} items`}
    </p>

---

# 42. Conditional rendering і `map`

Conditional rendering часто комбінується зі списками.

    function UserList({ users }) {
      if (users.length === 0) {
        return <p>No users.</p>;
      }

      return (
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      );
    }

Це хороший приклад:

    condition
       ↓
    empty state
       ↓
    map
       ↓
    list

---

# 43. Empty state

Для списків дуже важливо обробляти порожній стан.

Наприклад:

    function ProductList({ products }) {
      if (products.length === 0) {
        return (
          <p>
            No products found.
          </p>
        );
      }

      return (
        <ul>
          {products.map(product => (
            <li key={product.id}>
              {product.name}
            </li>
          ))}
        </ul>
      );
    }

Не варто покладатися тільки на:

    products.map(...)

Користувач повинен отримувати зрозумілий UI, коли список порожній.

---

# 44. Loading state

Типовий компонент:

    function ProductsPage({
      isLoading,
      products
    }) {
      if (isLoading) {
        return <p>Loading products...</p>;
      }

      return (
        <ProductList
          products={products}
        />
      );
    }

---

# 45. Error state

    function ProductsPage({
      isLoading,
      error,
      products
    }) {
      if (isLoading) {
        return <p>Loading...</p>;
      }

      if (error) {
        return (
          <p>
            Failed to load products.
          </p>
        );
      }

      return (
        <ProductList
          products={products}
        />
      );
    }

---

# 46. Loading + error + empty + success

У реальному застосунку часто існує щонайменше чотири UI states:

    loading
    error
    empty
    success

Наприклад:

    function ProductsPage({
      isLoading,
      error,
      products
    }) {
      if (isLoading) {
        return <Loading />;
      }

      if (error) {
        return <ErrorMessage />;
      }

      if (products.length === 0) {
        return <EmptyState />;
      }

      return (
        <ProductList
          products={products}
        />
      );
    }

Це один із найважливіших практичних патернів conditional rendering.

---

# 47. Authentication UI

Conditional rendering часто використовується для authentication.

    function App({ user }) {
      if (!user) {
        return <LoginPage />;
      }

      return <Dashboard user={user} />;
    }

Або:

    function Navigation({ user }) {
      return (
        <nav>
          {user ? (
            <UserMenu user={user} />
          ) : (
            <LoginButton />
          )}
        </nav>
      );
    }

---

# 48. Role-based UI

Наприклад:

    function Dashboard({ user }) {
      return (
        <main>
          <UserContent />

          {user.role === "admin" && (
            <AdminPanel />
          )}
        </main>
      );
    }

Або:

    function Dashboard({ user }) {
      if (user.role === "admin") {
        return <AdminDashboard />;
      }

      return <UserDashboard />;
    }

Conditional rendering часто є частиною authorization UI.

Важливо: приховування UI не є заміною серверної перевірки permissions. Реальна authorization повинна перевірятися на відповідному backend/API рівні.

---

# 49. Permission-based UI

Наприклад:

    function UserActions({ canDelete }) {
      return (
        <div>
          <button>Edit</button>

          {canDelete && (
            <button>Delete</button>
          )}
        </div>
      );
    }

Тут:

    canDelete

визначає, чи показувати кнопку.

---

# 50. Conditional rendering у формах

Наприклад:

    function Form({ isSubmitting, error }) {
      return (
        <form>
          {error && (
            <p>{error}</p>
          )}

          <input />

          <button
            disabled={isSubmitting}
          >
            {isSubmitting
              ? "Saving..."
              : "Save"}
          </button>
        </form>
      );
    }

Тут використовуються одразу:

- `&&`;
- ternary;
- boolean prop.

---

# 51. Conditional rendering та disabled

Якщо треба просто зробити кнопку недоступною:

    <button disabled={isLoading}>
      Save
    </button>

Не потрібно:

    <button
      disabled={
        isLoading
          ? true
          : false
      }
    >
      Save
    </button>

Другий варіант працює, але є зайвим.

---

# 52. Conditional rendering та visibility

Не завжди потрібно видаляти компонент з UI tree.

Є різниця між:

    {isVisible && <Panel />}

та CSS-підходом, наприклад:

    className={isVisible ? styles.visible : styles.hidden}

У першому випадку компонент може не бути присутнім у render tree.

У другому DOM-елемент може залишатися, але бути прихованим через CSS.

Це різні задачі.

---

# 53. Conditional rendering vs CSS

Потрібно розрізняти:

> Чи елемент повинен існувати?

і:

> Чи елемент повинен бути видимим?

Якщо:

    {isOpen && <Modal />}

модалка не рендериться, коли `isOpen === false`.

Якщо елемент завжди потрібен у DOM, але повинен лише візуально приховуватися, можна використовувати CSS.

Вибір залежить від задачі.

---

# 54. Conditional rendering і Fragment

Можна умовно повернути кілька елементів:

    function UserInfo({ isAdmin }) {
      return isAdmin ? (
        <>
          <h2>Admin</h2>
          <AdminPanel />
        </>
      ) : (
        <>
          <h2>User</h2>
          <UserPanel />
        </>
      );
    }

Fragment дозволяє згрупувати кілька React elements без зайвого DOM-елемента.

---

# 55. Conditional rendering і component composition

Іноді замість складних умов краще розділити компоненти.

Замість:

    function Dashboard({ role }) {
      if (role === "admin") {
        // 100 рядків
      } else {
        // ще 100 рядків
      }
    }

можна:

    function Dashboard({ role }) {
      return role === "admin"
        ? <AdminDashboard />
        : <UserDashboard />;
    }

Тепер кожен компонент відповідає за свою частину UI.

Це часто покращує читабельність.

---

# 56. Умови та відповідальність компонента

Якщо компонент містить:

    if (...)
    else if (...)
    else if (...)
    else if (...)

і кожна гілка містить великий UI, можливо, компонент робить занадто багато.

Наприклад:

    AdminDashboard
    UserDashboard
    GuestDashboard

можуть бути окремими компонентами.

Parent може вирішити, який із них показати.

---

# 57. Multiple conditions

Можна комбінувати умови.

    function Status({
      isLoading,
      hasError,
      isEmpty
    }) {
      if (isLoading) {
        return <Loading />;
      }

      if (hasError) {
        return <Error />;
      }

      if (isEmpty) {
        return <Empty />;
      }

      return <Content />;
    }

Це часто краще, ніж один великий ternary.

---

# 58. Порядок умов

Порядок перевірок має значення.

Наприклад:

    if (isLoading) {
      return <Loading />;
    }

    if (error) {
      return <Error />;
    }

    if (items.length === 0) {
      return <Empty />;
    }

    return <List items={items} />;

Це читається як послідовність станів:

    1. Loading?
    2. Error?
    3. Empty?
    4. Content

---

# 59. Guard clauses

Early return часто називають guard clauses.

Наприклад:

    function Profile({ user }) {
      if (!user) {
        return <Login />;
      }

      if (!user.isActive) {
        return <InactiveAccount />;
      }

      return <ProfileContent user={user} />;
    }

Це дозволяє відразу відсікти спеціальні випадки.

---

# 60. Не плутати `if` і expression

У JSX можна:

    {isLoggedIn && <Dashboard />}

тому що:

    isLoggedIn && <Dashboard />

є expression.

А:

    if (isLoggedIn) {
      ...
    }

є statement.

Саме тому `if` не можна вставити безпосередньо всередину `{}`.

---

# 61. JavaScript expressions у JSX

У JSX можна використовувати expressions:

    {user.name}

    {count + 1}

    {getTitle()}

    {isActive ? "Active" : "Inactive"}

    {items.map(item => (
      <li key={item.id}>
        {item.name}
      </li>
    ))}

Але не можна безпосередньо вставляти statements:

    if (...)

    for (...)

    switch (...)

Для них використовують відповідну JavaScript-структуру до `return`, helper function або expression-підхід.

---

# 62. Conditional rendering та `return`

Можна повернути JSX через `return`:

    function Page({ isLoggedIn }) {
      if (!isLoggedIn) {
        return <Login />;
      }

      return <Dashboard />;
    }

Це часто найчистіший варіант для великих умов.

---

# 63. Parentheses при multiline JSX

При великому JSX краще використовувати дужки:

    return (
      <main>
        <h1>Hello</h1>
        <p>Welcome.</p>
      </main>
    );

Особливо важливо не робити:

    return
      (
        <main>
          <h1>Hello</h1>
        </main>
      );

Через правила автоматичної вставки `;` JavaScript може трактувати це як:

    return;

Тому після `return` multiline JSX пишемо одразу в дужках:

    return (
      ...
    );

---

# 64. Умовний JSX у змінній

Наприклад:

    function UserPage({ user }) {
      let content;

      if (!user) {
        content = <Login />;
      } else {
        content = <Profile user={user} />;
      }

      return (
        <main>
          {content}
        </main>
      );
    }

Це хороший компроміс між `if` і складним JSX.

---

# 65. Conditional rendering через функцію

Можна винести логіку:

    function renderContent(status) {
      if (status === "loading") {
        return <Loading />;
      }

      if (status === "error") {
        return <Error />;
      }

      return <Content />;
    }

    function Page({ status }) {
      return (
        <main>
          {renderContent(status)}
        </main>
      );
    }

Але не потрібно автоматично створювати helper function для кожної маленької умови.

---

# 66. Простий вибір: ternary

Добре:

    function Status({ isOnline }) {
      return (
        <span>
          {isOnline ? "Online" : "Offline"}
        </span>
      );
    }

---

# 67. Показати або нічого: `&&`

Добре:

    function UserMenu({ isAdmin }) {
      return (
        <nav>
          <HomeLink />

          {isAdmin && (
            <AdminLink />
          )}
        </nav>
      );
    }

---

# 68. Складна логіка: `if`

Добре:

    function Page({
      isLoading,
      error,
      data
    }) {
      if (isLoading) {
        return <Loading />;
      }

      if (error) {
        return <Error />;
      }

      if (!data) {
        return <Empty />;
      }

      return <Content data={data} />;
    }

---

# 69. Багато взаємовиключних станів: `switch`

Наприклад:

    function PaymentStatus({ status }) {
      switch (status) {
        case "pending":
          return <Pending />;

        case "paid":
          return <Paid />;

        case "failed":
          return <Failed />;

        case "refunded":
          return <Refunded />;

        default:
          return <Unknown />;
      }
    }

---

# 70. Коли `&&` не підходить

Не треба використовувати:

    {isAdmin && <Admin /> || <User />}

для складної логіки, якщо простіше:

    {isAdmin ? <Admin /> : <User />}

Ternary тут чіткіше виражає:

    true → Admin
    false → User

---

# 71. Не використовувати `!!` без необхідності

Іноді можна побачити:

    {!!value && <Component />}

Це перетворює значення на boolean.

Але якщо умова і так зрозуміла:

    {user && <UserInfo user={user} />}

можна залишити її так.

`!!` корисний у конкретних випадках, але не повинен використовуватися механічно.

---

# 72. Truthy / falsy

Conditional rendering сильно залежить від JavaScript truthy/falsy.

Truthy:

    "hello"
    1
    []
    {}
    true

Falsy:

    false
    0
    ""
    null
    undefined
    NaN

Наприклад:

    {name && <Greeting />}

Якщо:

    name = "Valeriy"

показується `Greeting`.

Якщо:

    name = ""

нічого не буде відображено.

Але з `0` потрібно бути уважним:

    {count && <Counter />}

при:

    count = 0

може відобразитися `0`.

---

# 73. Безпечні перевірки

Якщо потрібна перевірка кількості:

    {count > 0 && (
      <Counter />
    )}

Якщо потрібна перевірка масиву:

    {items.length > 0 && (
      <ItemList items={items} />
    )}

Якщо потрібен boolean:

    {isActive && (
      <ActiveBadge />
    )}

Це робить умови більш явними.

---

# 74. Optional chaining та conditional rendering

JavaScript optional chaining може бути корисним:

    {user?.profile?.name}

Якщо `user` або `profile` відсутні, expression поверне `undefined`.

React не відобразить `undefined` як текст.

Але якщо потрібен fallback:

    {user?.profile?.name ?? "Unknown"}

Тут:

- `?.` — безпечний доступ;
- `??` — fallback для `null`/`undefined`.

---

# 75. Conditional rendering у реальному API flow

Типова структура frontend:

    API request
         ↓
    loading
         ↓
    ┌───────────────┐
    │               │
    error          success
    │               │
    ▼               ▼
    Error          data
                    │
             ┌──────┴──────┐
             │             │
           empty         data
             │             │
             ▼             ▼
           Empty          List

У React це може виглядати:

    function UsersPage({
      isLoading,
      error,
      users
    }) {
      if (isLoading) {
        return <Loading />;
      }

      if (error) {
        return <ErrorMessage />;
      }

      if (users.length === 0) {
        return <EmptyState />;
      }

      return <UserList users={users} />;
    }

Це одна з моделей, яку дуже важливо навчитися писати без підказок.

---

# 76. Conditional rendering у Next.js

У Next.js conditional rendering працює так само, як у React.

Наприклад:

    export default function Page() {
      const isLoggedIn = true;

      return (
        <main>
          {isLoggedIn ? (
            <Dashboard />
          ) : (
            <Login />
          )}
        </main>
      );
    }

Next.js додає свої механізми:

- Server Components;
- Client Components;
- loading UI;
- error UI;
- routing;
- server-side data fetching.

Але базова JavaScript-логіка conditional rendering залишається React/JavaScript.

---

# 77. Conditional rendering та Server Components

У Server Component також можна використовувати звичайний JavaScript:

    export default async function Page() {
      const user = await getUser();

      if (!user) {
        return <Login />;
      }

      return <Dashboard user={user} />;
    }

Тобто:

    if
    ternary
    &&
    switch

не є специфічними для Client Components.

---

# 78. Conditional rendering та Client Components

У Client Component можна використовувати state:

    "use client";

    function Menu() {
      const [isOpen, setIsOpen] = useState(false);

      return (
        <div>
          <button
            onClick={() => setIsOpen(!isOpen)}
          >
            Menu
          </button>

          {isOpen && (
            <nav>
              <a href="/">Home</a>
            </nav>
          )}
        </div>
      );
    }

Тут:

    state
      ↓
    condition
      ↓
    conditional UI

---

# 79. Conditional rendering та state

Це одна з фундаментальних моделей React:

    state
      ↓
    render
      ↓
    condition
      ↓
    UI

Наприклад:

    const [isOpen, setIsOpen] = useState(false);

    return (
      <>
        <button
          onClick={() => setIsOpen(true)}
        >
          Open
        </button>

        {isOpen && (
          <Modal />
        )}
      </>
    );

State змінюється → React виконує render → умова змінюється → UI змінюється.

---

# 80. Controlled UI

Наприклад:

    function Form() {
      const [isSubmitting, setIsSubmitting] =
        useState(false);

      return (
        <form>
          <button disabled={isSubmitting}>
            {isSubmitting
              ? "Saving..."
              : "Save"}
          </button>
        </form>
      );
    }

Тут UI є функцією від state:

    UI = f(state)

Це дуже важлива концепція React.

---

# 81. Типові помилки

## Помилка 1 — `if` безпосередньо в JSX

Неправильно:

    <div>
      if (isLoggedIn) {
        <Dashboard />
      }
    </div>

Правильно:

    <div>
      {isLoggedIn && <Dashboard />}
    </div>

---

## Помилка 2 — `0` через `&&`

Проблема:

    {items.length && <List />}

При:

    items.length === 0

може з'явитися `0`.

Краще:

    {items.length > 0 && <List />}

---

## Помилка 3 — надто багато ternary

Погано для читання:

    {a
      ? <A />
      : b
        ? <B />
        : c
          ? <C />
          : <D />}

Краще використати `if`, `switch` або окремі компоненти.

---

## Помилка 4 — ternary для простого boolean

Зайве:

    <button
      disabled={isLoading ? true : false}
    >
      Save
    </button>

Простіше:

    <button disabled={isLoading}>
      Save
    </button>

---

## Помилка 5 — `||` замість `??`

Якщо `0` є валідним значенням:

    {price || "N/A"}

може бути неправильним.

Краще:

    {price ?? "N/A"}

---

## Помилка 6 — компонент повертає `undefined`

Погано:

    function Panel({ isVisible }) {
      if (!isVisible) {
        return;
      }

      return <div>Panel</div>;
    }

Для "нічого не відображати" краще:

    function Panel({ isVisible }) {
      if (!isVisible) {
        return null;
      }

      return <div>Panel</div>;
    }

---

# 82. Порівняння основних способів

| Спосіб | Коли використовувати |
|---|---|
| `if` | складна логіка |
| `if / else` | дві великі гілки |
| early return | guard clauses, loading/error/auth |
| ternary | простий A/B |
| `&&` | показати або нічого |
| `||` | fallback для truthy/falsy |
| `??` | fallback лише для `null`/`undefined` |
| `switch` | багато взаємовиключних станів |
| JSX variable | складна логіка перед return |
| helper function | складний повторюваний render logic |

---

# 83. Практична таблиця

### Ситуація

Показати dashboard або login:

    {isLoggedIn
      ? <Dashboard />
      : <Login />}

---

### Ситуація

Показати admin panel або нічого:

    {isAdmin && <AdminPanel />}

---

### Ситуація

Показати loading:

    if (isLoading) {
      return <Loading />;
    }

---

### Ситуація

Показати error:

    if (error) {
      return <ErrorMessage />;
    }

---

### Ситуація

Fallback:

    {name ?? "Unknown"}

---

### Ситуація

Багато статусів:

    switch (status) {
      ...
    }

---

# 84. Практична вправа №1 — Greeting

Створити компонент:

    Greeting

який отримує:

    isLoggedIn

Якщо користувач авторизований:

    Welcome!

Інакше:

    Please log in.

Використати ternary.

---

# 85. Практична вправа №2 — AdminPanel

Створити:

    AdminPanel

який отримує:

    isAdmin

Якщо:

    true

показувати:

    Admin panel

Якщо:

    false

нічого не показувати.

Використати:

    &&

---

# 86. Практична вправа №3 — UserStatus

Створити компонент:

    UserStatus

Props:

    isOnline

Відображати:

    Online

або:

    Offline

Використати ternary.

---

# 87. Практична вправа №4 — Loading / Error / Content

Створити компонент:

    DataPage

Props:

    isLoading
    error
    data

Логіка:

    loading → Loading
    error → Error
    data → Content

Використати early returns.

---

# 88. Практична вправа №5 — Empty state

Створити:

    ProductList

який отримує:

    products

Якщо масив порожній:

    No products found.

Якщо є продукти:

    відобразити список.

---

# 89. Практична вправа №6 — Status

Створити:

    OrderStatus

Props:

    status

Можливі значення:

    "pending"
    "paid"
    "shipped"
    "cancelled"

Для кожного status показати відповідний текст.

Спробувати два варіанти:

1. `switch`;
2. об'єкт mapping.

---

# 90. Практична вправа №7 — Button

Створити кнопку:

    Button

Props:

    isLoading
    onClick
    children

Логіка:

    isLoading === true
        ↓
    "Saving..."

    isLoading === false
        ↓
    children

Кнопка повинна бути disabled під час loading.

---

# 91. Практична вправа №8 — User Dashboard

Створити:

    Dashboard

Props:

    user

Якщо:

    user === null

показувати:

    Login

Якщо user існує:

    Dashboard

Якщо:

    user.role === "admin"

додатково показувати:

    AdminPanel

---

# 92. Практична вправа №9 — Modal

Створити:

    Modal

Props:

    isOpen
    children
    onClose

Якщо:

    isOpen === false

повертати:

    null

Якщо:

    isOpen === true

відображати modal.

---

# 93. Практична вправа №10 — API state

Створити компонент:

    UsersPage

з такими станами:

    loading
    error
    empty
    success

UI:

    loading → Loading...

    error → Failed to load users.

    empty → No users.

    success → список users

Це одна з найкорисніших вправ перед вивченням REST API.

---

# 94. Що варто вміти після цієї теми

Після завершення теми ти повинен без підказки вміти написати:

    if (condition) {
      return <Component />;
    }

    return <OtherComponent />;

і:

    {condition ? (
      <ComponentA />
    ) : (
      <ComponentB />
    )}

і:

    {condition && (
      <Component />
    )}

а також розуміти:

    condition || fallback

та:

    value ?? fallback

---

# 95. Core

На рівні Core потрібно знати:

- що таке conditional rendering;
- `if`;
- `if / else`;
- early return;
- ternary;
- `&&`;
- `||`;
- `??`;
- `null`;
- truthy/falsy;
- умовний текст;
- умовний JSX;
- conditional `className`;
- conditional attributes.

---

# 96. Junior

На рівні Junior потрібно вміти:

- будувати loading state;
- будувати error state;
- будувати empty state;
- будувати success state;
- використовувати early returns;
- комбінувати props і conditions;
- комбінувати state і conditions;
- працювати з `&&`;
- розуміти проблему `0 && ...`;
- використовувати `switch`;
- уникати nested ternary;
- створювати reusable conditional components;
- будувати authentication UI;
- будувати role-based UI;
- розділяти складні UI states на компоненти.

---

# 97. Middle

На рівні Middle потрібно розуміти:

- складні state machines для UI;
- discriminated unions у TypeScript;
- state modeling;
- compound components;
- conditional composition;
- render props;
- controlled/uncontrolled components;
- error boundaries;
- Suspense;
- streaming UI;
- loading/error patterns у Next.js;
- server/client rendering differences;
- performance implications conditional trees;
- accessibility при динамічному UI.

---

# 98. Міні-шпаргалка

## `if`

    if (condition) {
      return <A />;
    }

    return <B />;

---

## `if / else`

    if (condition) {
      return <A />;
    } else {
      return <B />;
    }

---

## Early return

    if (!user) {
      return <Login />;
    }

    return <Dashboard />;

---

## Ternary

    {condition ? <A /> : <B />}

---

## `&&`

    {condition && <A />}

---

## Fallback

    {value || "Default"}

---

## Nullish fallback

    {value ?? "Default"}

---

## `switch`

    switch (status) {
      case "loading":
        return <Loading />;

      case "success":
        return <Success />;

      default:
        return null;
    }

---

## JSX variable

    let content;

    if (condition) {
      content = <A />;
    } else {
      content = <B />;
    }

    return <main>{content}</main>;

---

## Нічого не відображати

    return null;

---

## Conditional class

    className={
      isActive
        ? styles.active
        : styles.inactive
    }

---

## Conditional attribute

    <button disabled={isLoading}>
      Save
    </button>

---

# 99. Головне

Conditional rendering у React — це не окрема магічна система.

Це використання **звичайного JavaScript для визначення того, який UI повинен бути повернутий компонентом**.

Основна модель:

    DATA
      ↓
    CONDITION
      ↓
    JSX
      ↓
    UI

Для простих умов:

    condition ? A : B

Для "показати або нічого":

    condition && A

Для складної логіки:

    if (...)
      return ...

Для багатьох взаємовиключних станів:

    switch (...)

Для складного render logic:

    JSX variable
    або
    helper function

Особливо важливо навчитися бачити UI не як один статичний екран, а як набір можливих станів:

    LOADING
       ↓
    ERROR
       ↓
    EMPTY
       ↓
    SUCCESS

або:

    GUEST
       ↓
    USER
       ↓
    ADMIN

або:

    CLOSED
       ↓
    OPEN

або:

    DISABLED
       ↓
    ENABLED

React-компонент фактично описує:

    state/data
        ↓
    condition
        ↓
    UI

Тому хороше розуміння conditional rendering є фундаментом для наступних тем:

    Events
    State
    Forms
    Effects
    Data Fetching
    Authentication
    Authorization
    React Router
    Next.js
    Error Handling

Найважливіше практичне правило:

> **Проста умова повинна залишатися простою. Якщо conditional rendering стає складним для читання, спочатку спробуй early return, `switch`, helper function або розділення UI на окремі компоненти.**

І ще одна ключова ідея:

> **Не пиши складний JSX заради самої умови. Спочатку визнач стан UI, а потім вибери найпростішу JavaScript-конструкцію, яка його описує.**