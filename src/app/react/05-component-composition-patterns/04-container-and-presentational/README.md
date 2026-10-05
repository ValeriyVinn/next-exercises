# 04. Container and Presentational Components

`Container and Presentational` — це архітектурний патерн React, який допомагає розділити компонент на дві відповідальності:

- **Container Component** — відповідає за дані, стан, логіку та взаємодію з API.
- **Presentational Component** — відповідає переважно за відображення UI.

Основна ідея:

    Container
        ↓
    data + state + logic
        ↓
    Presentational
        ↓
    UI

Наприклад:

    UserPage
       │
       ▼
    UserContainer
       │
       ├── отримує users
       ├── керує loading
       ├── керує error
       └── передає props
              │
              ▼
          UserList
              │
              └── відображає users

Цей підхід особливо корисний для розуміння **separation of concerns**, повторного використання компонентів і побудови масштабованого React-коду.

---

## Зміст

- [Що таке Container and Presentational](#що-таке-container-and-presentational)
- [Навіщо потрібен цей патерн](#навіщо-потрібен-цей-патерн)
- [Основна ідея](#основна-ідея)
- [Presentational Component](#presentational-component)
- [Container Component](#container-component)
- [Простий приклад](#простий-приклад)
- [Розділення відповідальностей](#розділення-відповідальностей)
- [Приклад із state](#приклад-із-state)
- [Приклад із формою](#приклад-із-формою)
- [Приклад із API](#приклад-із-api)
- [Loading і Error](#loading-і-error)
- [Container передає props](#container-передає-props)
- [Presentational не знає про API](#presentational-не-знає-про-api)
- [Container не повинен займатися розміткою](#container-не-повинен-займатися-розміткою)
- [Children і composition](#children-і-composition)
- [Custom Hooks замість Container](#custom-hooks-замість-container)
- [Container + Custom Hook](#container--custom-hook)
- [Коли патерн корисний](#коли-патерн-корисний)
- [Коли патерн може бути зайвим](#коли-патерн-може-бути-зайвим)
- [Сучасний React і Container/Presentational](#сучасний-react-і-containerpresentational)
- [Типові помилки](#типові-помилки)
- [Практична структура](#практична-структура)
- [Питання для співбесіди](#питання-для-співбесіди)
- [Послідовність вивчення](#послідовність-вивчення)
- [Міні-шпаргалка](#міні-шпаргалка)
- [Головне](#головне)

---

# Що таке Container and Presentational

Container and Presentational — це патерн, у якому компонент розділяється на:

    Container
    +
    Presentational

Container відповідає за:

    data
    state
    business logic
    event handlers
    API
    loading
    error

Presentational відповідає за:

    JSX
    layout
    styles
    displaying data
    user interaction через props

Наприклад:

    UserContainer
          │
          │ users
          │ loading
          │ error
          │ onDelete
          ▼
    UserList
          │
          ▼
       UI

---

# Навіщо потрібен цей патерн

Без розділення один компонент може дуже швидко стати великим:

    function UsersPage() {
      // fetch users

      // loading

      // error

      // search

      // filtering

      // sorting

      // delete user

      // form state

      // JSX

      // styles

      // many handlers

      return (
        // hundreds of lines of JSX
      );
    }

Проблема не в самому розмірі файлу.

Проблема в тому, що один компонент одночасно відповідає за багато різних речей.

Наприклад:

    data fetching
          +
    state management
          +
    business logic
          +
    presentation
          +
    styling

Container/Presentational допомагає розділити ці відповідальності.

---

# Основна ідея

Головний принцип:

    Container
    ↓
    "Що потрібно зробити?"

    Presentational
    ↓
    "Як це показати?"

Наприклад:

    Container:

    отримати користувачів
    перевірити loading
    обробити error
    видалити користувача

    Presentational:

    показати список
    показати loading
    показати error
    показати кнопку Delete

---

# Presentational Component

Presentational Component — компонент, головна задача якого полягає у відображенні UI.

Наприклад:

    interface User {
      id: number;
      name: string;
      email: string;
    }

    interface UserListProps {
      users: User[];
    }

    function UserList({
      users,
    }: UserListProps) {
      return (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <strong>
                {user.name}
              </strong>

              <span>
                {user.email}
              </span>
            </li>
          ))}
        </ul>
      );
    }

Цей компонент:

    не отримує users з API
    не знає URL API
    не виконує fetch
    не керує глобальним станом
    не знає, звідки прийшли дані

Він отримує:

    users

і відображає їх.

---

# Властивості Presentational Component

Типовий Presentational Component:

- отримує дані через props;
- отримує callback-функції через props;
- повертає JSX;
- відповідає за UI;
- може містити локальну UI-логіку;
- не повинен знати зайвих деталей отримання даних.

Наприклад:

    interface UserCardProps {
      name: string;
      email: string;
      onDelete: () => void;
    }

    function UserCard({
      name,
      email,
      onDelete,
    }: UserCardProps) {
      return (
        <article>
          <h2>{name}</h2>

          <p>{email}</p>

          <button onClick={onDelete}>
            Delete
          </button>
        </article>
      );
    }

Компонент не знає:

    хто викличе API
    який URL використовується
    як видаляється user
    де зберігається users

Він лише викликає:

    onDelete

коли користувач натискає кнопку.

---

# Container Component

Container відповідає за логіку.

Наприклад:

    function UserContainer() {
      const [users, setUsers] = useState<User[]>([]);

      function handleDelete(id: number) {
        // delete user
      }

      return (
        <UserList
          users={users}
          onDelete={handleDelete}
        />
      );
    }

Тут:

    UserContainer

займається:

    state
    data
    logic

А:

    UserList

займається:

    UI

---

# Простий приклад

Розглянемо список користувачів.

## Container

    interface User {
      id: number;
      name: string;
    }

    function UserContainer() {
      const users: User[] = [
        {
          id: 1,
          name: "Valeriy",
        },
        {
          id: 2,
          name: "Olena",
        },
      ];

      return (
        <UserList users={users} />
      );
    }

## Presentational

    interface UserListProps {
      users: User[];
    }

    function UserList({
      users,
    }: UserListProps) {
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

Схема:

    UserContainer
         │
         │ users
         ▼
      UserList
         │
         ▼
        UI

---

# Розділення відповідальностей

Корисно розділити відповідальність таким чином.

## Container

    data
    state
    effects
    API
    business logic
    event handlers
    transformations

## Presentational

    JSX
    layout
    styling
    displaying data
    UI events

Наприклад:

    Container
       │
       ├── fetchUsers()
       ├── deleteUser()
       ├── search
       ├── loading
       └── error
              │
              ▼
       Presentational
              │
              ├── UserList
              ├── SearchInput
              ├── Loading
              └── ErrorMessage

---

# Приклад із state

Уявімо список користувачів із можливістю вибору.

Container:

    interface User {
      id: number;
      name: string;
    }

    function UserContainer() {
      const [selectedId, setSelectedId] =
        useState<number | null>(null);

      const users: User[] = [
        {
          id: 1,
          name: "Valeriy",
        },
        {
          id: 2,
          name: "Olena",
        },
      ];

      return (
        <UserList
          users={users}
          selectedId={selectedId}
          onSelect={setSelectedId}
        />
      );
    }

Presentational:

    interface UserListProps {
      users: User[];
      selectedId: number | null;
      onSelect: (id: number) => void;
    }

    function UserList({
      users,
      selectedId,
      onSelect,
    }: UserListProps) {
      return (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <button
                type="button"
                onClick={() => onSelect(user.id)}
              >
                {user.name}

                {selectedId === user.id && (
                  <span>
                    {" "}
                    ✓
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      );
    }

Тут:

    UserContainer

володіє state.

А:

    UserList

лише використовує state через props.

---

# Приклад із формою

Container може володіти станом форми:

    function LoginContainer() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      function handleSubmit(
        event: React.FormEvent<HTMLFormElement>
      ) {
        event.preventDefault();

        console.log({
          email,
          password,
        });
      }

      return (
        <LoginForm
          email={email}
          password={password}
          onEmailChange={setEmail}
          onPasswordChange={setPassword}
          onSubmit={handleSubmit}
        />
      );
    }

Presentational component:

    interface LoginFormProps {
      email: string;
      password: string;
      onEmailChange: (
        value: string
      ) => void;
      onPasswordChange: (
        value: string
      ) => void;
      onSubmit: (
        event: React.FormEvent<HTMLFormElement>
      ) => void;
    }

    function LoginForm({
      email,
      password,
      onEmailChange,
      onPasswordChange,
      onSubmit,
    }: LoginFormProps) {
      return (
        <form onSubmit={onSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) =>
              onEmailChange(event.target.value)
            }
          />

          <input
            type="password"
            value={password}
            onChange={(event) =>
              onPasswordChange(event.target.value)
            }
          />

          <button type="submit">
            Login
          </button>
        </form>
      );
    }

Тут форма не знає, що відбувається після:

    onSubmit

Вона просто повідомляє контейнер:

    "Користувач натиснув Submit."

---

# Container може передавати callbacks

Один із найважливіших механізмів:

    Container
        │
        ├── data
        │
        └── callbacks
              │
              ▼
       Presentational

Наприклад:

    <UserList
      users={users}
      onDelete={handleDelete}
    />

Presentational:

    <button
      onClick={() => onDelete(user.id)}
    >
      Delete
    </button>

Container:

    function handleDelete(id: number) {
      // business logic
    }

Таким чином Presentational Component не повинен знати, **що саме відбувається після натискання кнопки**.

---

# Приклад із API

Тепер розглянемо реальніший приклад.

Container:

    function UserContainer() {
      const [users, setUsers] = useState<User[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        async function loadUsers() {
          try {
            setLoading(true);

            const response = await fetch("/api/users");

            if (!response.ok) {
              throw new Error("Failed to load users");
            }

            const data: User[] =
              await response.json();

            setUsers(data);
          } catch (error) {
            setError("Не вдалося завантажити користувачів");
          } finally {
            setLoading(false);
          }
        }

        loadUsers();
      }, []);

      return (
        <UserList
          users={users}
          loading={loading}
          error={error}
        />
      );
    }

Presentational:

    interface UserListProps {
      users: User[];
      loading: boolean;
      error: string | null;
    }

    function UserList({
      users,
      loading,
      error,
    }: UserListProps) {
      if (loading) {
        return <p>Loading...</p>;
      }

      if (error) {
        return <p>{error}</p>;
      }

      if (users.length === 0) {
        return <p>No users found.</p>;
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

Тепер відповідальність чітко розділена.

---

# Loading і Error

Container часто керує трьома основними станами:

    loading
    error
    data

Наприклад:

    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

Presentational отримує їх:

    <UserList
      users={users}
      loading={loading}
      error={error}
    />

Але не знає, як саме вони отримуються.

---

# Presentational не знає про API

Це важливий принцип.

Не потрібно робити:

    function UserList() {
      const response = await fetch(
        "/api/users"
      );

      // ...
    }

якщо ми хочемо, щоб цей компонент був чистим Presentational Component.

Краще:

    function UserList({
      users,
    }: UserListProps) {
      return (
        <ul>
          {users.map(...)}
        </ul>
      );
    }

API залишається в:

    Container
    або
    Custom Hook
    або
    service

---

# Container не повинен займатися розміткою

Погано, якщо Container перетворюється на величезний JSX:

    function UserContainer() {
      // fetch
      // state
      // filtering
      // sorting
      // business logic

      return (
        <div>
          <header>
            ...
          </header>

          <main>
            ...
          </main>

          <footer>
            ...
          </footer>

          {/* hundreds of lines */}
        </div>
      );
    }

Container може містити невеликий orchestration JSX:

    return (
      <UserList
        users={users}
        loading={loading}
        error={error}
      />
    );

Це набагато простіше читати.

---

# Container як "координатор"

Container часто можна уявляти як координатор.

Він зв'язує:

    API
     │
     ▼
    state
     │
     ▼
    handlers
     │
     ▼
    Presentational Component

Наприклад:

    UserContainer
        │
        ├── useUsers()
        │
        ├── handleDelete()
        │
        ├── handleSelect()
        │
        └── handleSearch()
                 │
                 ▼
             UserList

Container не обов'язково повинен містити всю бізнес-логіку сам.

---

# Children і composition

Container/Presentational добре комбінується з композицією.

Наприклад:

    interface UserPageProps {
      children: React.ReactNode;
    }

    function UserPageContainer({
      children,
    }: UserPageProps) {
      const users = useUsers();

      return (
        <UserPage
          users={users}
        >
          {children}
        </UserPage>
      );
    }

Це дозволяє комбінувати:

    data logic
    +
    composition

Але не потрібно штучно використовувати `children`, якщо звичайні props роблять API зрозумілішим.

---

# Container + Presentational + Custom Hook

У сучасному React часто зустрічається ще один рівень.

Замість:

    Container
      ├── state
      ├── effects
      ├── API
      └── UI

можна зробити:

    Custom Hook
      ├── state
      ├── effects
      └── data

            ↓

    Container
      └── orchestration

            ↓

    Presentational
      └── UI

Наприклад:

    function useUsers() {
      const [users, setUsers] = useState<User[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState<string | null>(null);

      useEffect(() => {
        async function loadUsers() {
          try {
            const response =
              await fetch("/api/users");

            if (!response.ok) {
              throw new Error("Failed");
            }

            const data: User[] =
              await response.json();

            setUsers(data);
          } catch {
            setError("Failed to load users");
          } finally {
            setLoading(false);
          }
        }

        loadUsers();
      }, []);

      return {
        users,
        loading,
        error,
      };
    }

Тепер Container:

    function UserContainer() {
      const {
        users,
        loading,
        error,
      } = useUsers();

      return (
        <UserList
          users={users}
          loading={loading}
          error={error}
        />
      );
    }

Це часто чистіше.

---

# Чому Custom Hooks змінили цей патерн

У старому React-коді часто зустрічалася структура:

    UserContainer
        ↓
    UserPresentation

де Container містив багато логіки.

У сучасному React логіку часто виносять у:

    Custom Hooks

Наприклад:

    useUsers()
    useProducts()
    useOrders()
    useAuth()
    useForm()

Тому зараз можна зустріти:

    useUsers
       ↓
    UserPage
       ↓
    UserList

а не обов'язково класичну пару:

    UserContainer
       ↓
    UserList

Тобто сам принцип розділення відповідальностей залишається, навіть якщо назви `Container` вже немає.

---

# Сучасний варіант

Наприклад:

    function UsersPage() {
      const {
        users,
        loading,
        error,
      } = useUsers();

      return (
        <UserList
          users={users}
          loading={loading}
          error={error}
        />
      );
    }

Тут:

    useUsers

відповідає за data logic.

А:

    UserList

відповідає за UI.

Формально `UsersPage` може бути не "класичним Container Component", але архітектурна ідея залишається.

---

# Логічне розділення

Можна мислити не стільки категоріями:

    Container
    Presentational

скільки:

    Logic
    +
    Presentation

Наприклад:

    useUsers()
       │
       ├── fetching
       ├── state
       ├── error
       └── actions
              │
              ▼
          UsersPage
              │
              ▼
          UserList
              │
              ▼
             UI

Це важливо для сучасного React.

---

# Presentational Component може мати state

Назва "Presentational" не означає:

    state === 0

і не означає:

    hooks === 0

Наприклад, UI-компонент може мати локальний стан для purely visual behavior.

    function Dropdown() {
      const [open, setOpen] =
        useState(false);

      return (
        <div>
          <button
            onClick={() =>
              setOpen((value) => !value)
            }
          >
            Menu
          </button>

          {open && (
            <div>
              ...
            </div>
          )}
        </div>
      );
    }

Це може бути абсолютно нормальним.

Важливе питання:

    Яка відповідальність цього state?

Якщо це:

    відкрито / закрито dropdown

це UI state.

Якщо це:

    список користувачів з API

це вже data/application state і його часто краще відокремити.

---

# Presentational Component може мати логіку

Presentational не означає повну відсутність логіки.

Наприклад:

    function Price({
      value,
    }: PriceProps) {
      const formatted =
        new Intl.NumberFormat(
          "uk-UA",
          {
            style: "currency",
            currency: "UAH",
          }
        ).format(value);

      return (
        <span>
          {formatted}
        </span>
      );
    }

Тут є логіка форматування.

Але це логіка **presentation**, а не отримання даних.

---

# Presentation Logic vs Business Logic

Це дуже важливе розділення.

## Presentation Logic

Наприклад:

    чи показувати меню
    як форматувати дату
    який CSS class використати
    чи показувати spinner
    як відображати помилку

## Business Logic

Наприклад:

    чи може користувач видалити замовлення
    як розрахувати ціну
    як змінити статус замовлення
    чи дозволена операція
    як відправити дані на сервер

Не обов'язково всю presentation logic виносити з UI.

Головне — не змішувати UI з великою кількістю application/business logic.

---

# Приклад розділення business logic

Погано:

    function OrderList() {
      function handleCancel(order) {
        if (
          order.status === "paid" &&
          order.userRole !== "admin"
        ) {
          // complicated business rules
        }

        // API
        // state
        // UI
      }

      return (
        // huge JSX
      );
    }

Краще:

    function OrdersContainer() {
      const orders = useOrders();

      function handleCancel(orderId: number) {
        // business logic
      }

      return (
        <OrderList
          orders={orders}
          onCancel={handleCancel}
        />
      );
    }

А `OrderList`:

    function OrderList({
      orders,
      onCancel,
    }: OrderListProps) {
      return (
        <ul>
          {orders.map((order) => (
            <li key={order.id}>
              {order.title}

              <button
                onClick={() =>
                  onCancel(order.id)
                }
              >
                Cancel
              </button>
            </li>
          ))}
        </ul>
      );
    }

---

# Container може трансформувати дані

Container може підготувати дані для UI.

Наприклад API повертає:

    {
      first_name: "Valeriy",
      last_name: "Svystun"
    }

А UI хоче:

    {
      fullName: "Valeriy Svystun"
    }

Container може виконати transformation:

    const viewModels = users.map((user) => ({
      id: user.id,
      fullName:
        `${user.first_name} ${user.last_name}`,
    }));

І передати:

    <UserList users={viewModels} />

Presentational component не повинен знати деталі API response.

---

# View Model

У складніших компонентах можна створити view model.

Наприклад:

    interface UserViewModel {
      id: number;
      displayName: string;
      displayEmail: string;
      isActive: boolean;
    }

Container:

    const userViewModels =
      users.map((user) => ({
        id: user.id,
        displayName:
          `${user.firstName} ${user.lastName}`,
        displayEmail:
          user.email,
        isActive:
          user.status === "active",
      }));

Presentational:

    <UserList
      users={userViewModels}
    />

Це допомагає відокремити:

    API model

від:

    UI model

---

# Container and Presentational у Next.js

У Next.js цей принцип особливо добре видно при розділенні:

    Server Component
    +
    Client Component

Наприклад, серверний компонент може отримати дані:

    async function UsersPage() {
      const users = await getUsers();

      return (
        <UserList users={users} />
      );
    }

А `UserList` може відповідати за UI.

Якщо потрібна інтерактивність:

    "use client";

    function UserList({
      users,
    }: UserListProps) {
      // client-side UI logic
    }

Це не те саме, що класичний Container/Presentational pattern, але принцип separation of concerns дуже схожий.

---

# Container and Presentational у великих проєктах

У реальному проєкті структура може виглядати так:

    users/
    ├── components/
    │   ├── UserList.tsx
    │   ├── UserCard.tsx
    │   └── UserForm.tsx
    │
    ├── hooks/
    │   └── useUsers.ts
    │
    ├── services/
    │   └── usersApi.ts
    │
    ├── types/
    │   └── user.ts
    │
    └── page.tsx

Тут відповідальності можуть бути розділені:

    services
        ↓
    API

    hooks
        ↓
    state + data logic

    components
        ↓
    UI

    page
        ↓
    composition

Це більш сучасний і масштабований варіант того самого принципу.

---

# Практична структура для навчального проєкту

Для невеликого навчального проєкту можна почати просто:

    users/
    ├── UserContainer.tsx
    ├── UserList.tsx
    └── UserCard.tsx

Потім, коли логіка збільшується:

    users/
    ├── components/
    │   ├── UserList.tsx
    │   └── UserCard.tsx
    │
    ├── hooks/
    │   └── useUsers.ts
    │
    ├── services/
    │   └── usersApi.ts
    │
    └── page.tsx

Не потрібно відразу створювати складну архітектуру.

---

# Коли патерн корисний

Container/Presentational особливо корисний, коли:

- компонент стає занадто великим;
- є багато state;
- є API;
- є складна бізнес-логіка;
- UI потрібно повторно використовувати;
- один UI повинен працювати з різними джерелами даних;
- потрібно легко тестувати presentation;
- потрібно відокремити data fetching від UI.

---

# Коли патерн може бути зайвим

Для маленького компонента:

    function Button({
      children,
      onClick,
    }: ButtonProps) {
      return (
        <button onClick={onClick}>
          {children}
        </button>
      );
    }

не потрібно створювати:

    ButtonContainer
    ButtonPresentation

Це буде зайва абстракція.

Так само:

    UserCard.tsx

може цілком нормально містити просту presentation logic.

Не потрібно розділяти кожен компонент лише тому, що існує такий патерн.

---

# Overengineering

Погано:

    ButtonContainer
        ↓
    ButtonPresenter
        ↓
    ButtonView
        ↓
    ButtonUI
        ↓
    StyledButton

якщо весь компонент має 15 рядків.

Архітектура повинна допомагати, а не створювати додаткову складність.

Хороше правило:

    Якщо розділення робить код зрозумілішим —
    використовуйте його.

    Якщо розділення лише додає файли —
    не використовуйте його.

---

# Типові помилки

## 1. Container містить весь JSX

Якщо Container має сотні рядків JSX, він перестає бути хорошим координатором.

Краще винести UI в окремий компонент.

---

## 2. Presentational викликає API

Наприклад:

    function UserList() {
      fetch("/api/users");
    }

Це змішує data fetching та presentation.

Краще:

    Container
      ↓
    users
      ↓
    UserList

---

## 3. Presentational знає структуру API

Погано:

    function UserList({
      users,
    }: Props) {
      return (
        <div>
          {users.map((user) => (
            <p>
              {user.user_profile.first_name}
            </p>
          ))}
        </div>
      );
    }

Якщо API постійно повертає складні структури, UI стає залежним від backend.

Краще підготувати view model.

---

## 4. Container займається CSS

Container не повинен містити:

    className="..."
    style={{ ... }}

без необхідності.

Це переважно відповідальність presentation layer.

---

## 5. Надмірне розділення

Не кожен компонент повинен мати:

    Container
    Presenter
    Hook
    Service
    Adapter
    Repository

Іноді достатньо:

    Component

---

## 6. Неправильне розуміння Presentational

Presentational не означає:

    "компонент без жодної логіки"

Правильніше:

    "компонент, відповідальний переважно за presentation"

---

## 7. Змішування business logic і UI logic

Наприклад:

    if (user.balance > 1000 &&
        user.subscription === "premium" &&
        order.status !== "cancelled") {
      ...
    }

Якщо така логіка розростається всередині JSX, її краще винести в окрему функцію, hook або container/service.

---

# Як зрозуміти, що компонент пора розділити

Зверни увагу на такі сигнали:

### Компонент має багато state

    useState(...)
    useState(...)
    useState(...)
    useState(...)

### Багато useEffect

    useEffect(...)
    useEffect(...)
    useEffect(...)

### Багато API-запитів

    fetch(...)
    fetch(...)
    fetch(...)

### Дуже багато event handlers

    handleSubmit
    handleDelete
    handleEdit
    handleSearch
    handleSort
    handleFilter

### Дуже багато JSX

    300+ lines

### Один компонент робить занадто багато

Наприклад:

    fetch data
    ↓
    transform data
    ↓
    manage state
    ↓
    validate
    ↓
    render table
    ↓
    render modal
    ↓
    render form

Це хороший сигнал для рефакторингу.

---

# Алгоритм розділення компонента

Якщо є великий компонент:

    UsersPage

спочатку знайди:

    1. Data fetching
    2. State
    3. Business logic
    4. Event handlers
    5. JSX

Потім:

    Data fetching
         ↓
    Container / Hook

    State
         ↓
    Container / Hook

    Business logic
         ↓
    Container / Hook / Service

    JSX
         ↓
    Presentational Component

Отримаємо:

    UsersContainer
         │
         ├── users
         ├── loading
         ├── error
         └── handlers
                │
                ▼
             UserList
                │
                ├── UserCard
                ├── UserCard
                └── UserCard

---

# Крок 1 — знайти data

Було:

    function UsersPage() {
      const [users, setUsers] = useState<User[]>([]);

      // ...
    }

Data залишається в Container.

---

# Крок 2 — знайти state

Наприклад:

    const [selectedUserId, setSelectedUserId] =
      useState<number | null>(null);

Це також може залишитися в Container, якщо state впливає на application behavior.

---

# Крок 3 — знайти handlers

Наприклад:

    function handleDelete(id: number) {
      // ...
    }

Handler залишається в Container.

---

# Крок 4 — винести JSX

Було:

    return (
      <div>
        ...
      </div>
    );

Створюємо:

    function UserList(props: UserListProps) {
      return (
        <div>
          ...
        </div>
      );
    }

---

# Крок 5 — передати props

Container:

    return (
      <UserList
        users={users}
        selectedUserId={selectedUserId}
        onSelect={handleSelect}
        onDelete={handleDelete}
      />
    );

Presentational:

    interface UserListProps {
      users: User[];
      selectedUserId: number | null;
      onSelect: (id: number) => void;
      onDelete: (id: number) => void;
    }

Тепер межа відповідальності стала явною.

---

# Контракт між Container і Presentational

Props можна розглядати як контракт.

Container каже:

    Ось дані.

    users

    Ось стан.

    selectedUserId

    Ось дії.

    onDelete
    onSelect

Presentational каже:

    Добре.
    Я покажу ці дані
    і викличу callbacks
    у відповідний момент.

Це дуже важлива модель мислення.

---

# Unidirectional Data Flow

Container/Presentational добре узгоджується з одностороннім потоком даних React.

Схема:

    Container
        │
        │ props
        ▼
    Presentational
        │
        │ callback
        ▼
    Container

Наприклад:

    users
      ↓
    UserList
      ↓
    onDelete(id)
      ↓
    Container
      ↓
    deleteUser(id)
      ↓
    setUsers(...)

Дані рухаються вниз.

Події повідомляють батьківський компонент угору.

---

# Приклад повного циклу

    function UsersContainer() {
      const [users, setUsers] =
        useState<User[]>([]);

      function handleDelete(id: number) {
        setUsers((currentUsers) =>
          currentUsers.filter(
            (user) => user.id !== id
          )
        );
      }

      return (
        <UserList
          users={users}
          onDelete={handleDelete}
        />
      );
    }

Presentational:

    function UserList({
      users,
      onDelete,
    }: UserListProps) {
      return (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              <span>
                {user.name}
              </span>

              <button
                type="button"
                onClick={() =>
                  onDelete(user.id)
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      );
    }

Потік:

    users
      ↓
    UserList
      ↓
    click Delete
      ↓
    onDelete(id)
      ↓
    handleDelete(id)
      ↓
    setUsers(...)
      ↓
    re-render
      ↓
    UserList

---

# Тестування Presentational Components

Окремий плюс розділення — тестування.

Якщо:

    UserList

отримує:

    users
    onDelete

його можна тестувати незалежно від API.

Наприклад, логічно перевірити:

    чи відображаються users

    чи показується ім'я

    чи натискання Delete
    викликає onDelete

Не потрібно піднімати реальний API.

---

# Тестування Container

Container можна тестувати окремо з точки зору:

    data fetching
    state changes
    callbacks
    error handling

Таким чином testing surface стає більш контрольованим.

---

# Presentational Components як reusable UI

Якщо компонент не знає, звідки прийшли дані, його легше використовувати повторно.

Наприклад:

    <UserList
      users={usersFromApi}
    />

Або:

    <UserList
      users={usersFromMock}
    />

Або:

    <UserList
      users={usersFromLocalStorage}
    />

Або:

    <UserList
      users={usersFromServerComponent}
    />

Сам `UserList` не змінюється.

---

# Container може змінюватися, UI — ні

Наприклад, сьогодні:

    UserContainer
       ↓
    REST API
       ↓
    UserList

Завтра:

    UserContainer
       ↓
    GraphQL
       ↓
    UserList

Або:

    UserPage
       ↓
    Server Component
       ↓
    UserList

`UserList` може залишатися таким самим.

Це одна з головних переваг розділення.

---

# Container and Presentational та TypeScript

TypeScript особливо добре допомагає визначати контракт.

Наприклад:

    interface User {
      id: number;
      name: string;
      email: string;
    }

    interface UserListProps {
      users: User[];
      loading: boolean;
      error: string | null;
      onDelete: (id: number) => void;
    }

Тепер Presentational Component точно знає, що він отримує.

А Container отримує compile-time перевірку props.

---

# Не використовуй `any`

Погано:

    interface UserListProps {
      users: any;
      onDelete: any;
    }

Краще:

    interface User {
      id: number;
      name: string;
    }

    interface UserListProps {
      users: User[];
      onDelete: (id: number) => void;
    }

Це особливо важливо для component contracts.

---

# Container and Presentational та реальний production code

У production-проєктах не обов'язково побачиш файли з назвами:

    UserContainer.tsx
    UserPresentation.tsx

Замість цього можуть бути:

    page.tsx
    UserList.tsx
    UserCard.tsx
    useUsers.ts
    usersApi.ts

Але концептуально все одно присутнє розділення:

    data
    ↓
    logic
    ↓
    presentation

Тому важливо вивчити **принцип**, а не запам'ятати конкретні назви файлів.

---

# Сучасне бачення патерну

Класична модель:

    Container
        │
        ▼
    Presentational

Сучасніша модель:

    Data / API
        │
        ▼
    Custom Hook / Server Component
        │
        ▼
    Page / Container
        │
        ▼
    Presentational Components

Наприклад:

    usersApi.ts
         ↓
    useUsers.ts
         ↓
    UsersPage.tsx
         ↓
    UserList.tsx
         ↓
    UserCard.tsx

Це не означає, що старий патерн "неправильний".

Він просто став частиною ширшого принципу:

    Separation of Concerns

---

# Практична вправа 1 — User List

Створи:

    UserContainer.tsx

і:

    UserList.tsx

Container повинен:

    зберігати users
    зберігати selectedUserId
    обробляти select

Presentational повинен:

    показувати users
    показувати selected user
    викликати onSelect

---

# Практична вправа 2 — Todo List

Створи:

    TodoContainer
    TodoList
    TodoItem

Container:

    todos
    addTodo
    toggleTodo
    deleteTodo

Presentational:

    TodoList
    TodoItem

Потік:

    TodoContainer
        ↓
    TodoList
        ↓
    TodoItem

---

# Практична вправа 3 — API

Створи:

    UserContainer

який:

    fetch("/api/users")

і передає:

    users
    loading
    error

до:

    UserList

`UserList` не повинен робити `fetch`.

---

# Практична вправа 4 — Form

Створи:

    LoginContainer
    LoginForm

Container:

    email
    password
    submit

Presentational:

    inputs
    button
    error message

---

# Практична вправа 5 — Refactoring

Візьми великий компонент:

    UsersPage.tsx

і знайди:

    state
    effects
    handlers
    API
    JSX

Після цього спробуй розділити:

    UsersPage
         ↓
    useUsers
         ↓
    UserList
         ↓
    UserCard

Це дуже хороша практична вправа для переходу від навчальних прикладів до реального React-коду.

---

# Поширені запитання

## Чи повинен Presentational Component бути повністю stateless?

Ні.

Він може мати локальний UI state.

Головне — яка відповідальність цього state.

---

## Чи повинен Container завжди називатися Container?

Ні.

У сучасному React це часто:

    Page
    Screen
    Feature
    Controller
    Hook
    Server Component

Назва не головне.

Головне — розділення відповідальностей.

---

## Чи потрібно завжди використовувати цей патерн?

Ні.

Для маленьких компонентів це може бути зайво.

---

## Чи можна використовувати Custom Hooks замість Container?

Так.

У сучасному React це дуже поширений підхід.

Наприклад:

    useUsers()

може містити data/state logic, а UI-компонент залишається окремим.

---

## Чи може Container використовувати Presentational Component?

Так.

Це типовий сценарій:

    Container
       ↓
    Presentational

---

## Чи може Presentational Component викликати callback?

Так.

Наприклад:

    <button
      onClick={() => onDelete(id)}
    >
      Delete
    </button>

Він не знає, що відбувається після callback.

---

# Питання для співбесіди

### 1. Що таке Container Component?

Компонент, який переважно відповідає за:

    data
    state
    business logic
    side effects
    event handlers

і передає результати presentation-компонентам.

---

### 2. Що таке Presentational Component?

Компонент, який переважно відповідає за відображення UI та отримує необхідні дані й callbacks через props.

---

### 3. Яка головна ідея патерну?

    Separation of Concerns

Розділити:

    logic

і:

    presentation

---

### 4. Чи є цей патерн обов'язковим у React?

Ні.

Це архітектурний патерн, а не вимога React.

---

### 5. Чи актуальний він у сучасному React?

Так, як концепція separation of concerns.

Але класичне розділення:

    Container
    +
    Presentational

часто замінюється або доповнюється:

    Custom Hooks
    Server Components
    data-fetching libraries
    feature-based architecture

---

### 6. Чи може Presentational Component мати state?

Так.

Наприклад, локальний UI state:

    open
    closed
    hover
    selected tab

---

### 7. Чим Container передає дані Presentational Component?

Через props.

Наприклад:

    <UserList
      users={users}
      loading={loading}
      onDelete={handleDelete}
    />

---

### 8. Хто повинен знати про API?

Зазвичай data layer, service, hook або container.

Presentational Component не повинен залежати від деталей API без необхідності.

---

### 9. Яка перевага такого розділення?

Компоненти стають:

    простішими
    тестованішими
    повторно використовуваними
    легшими для підтримки
    менш залежними один від одного

---

### 10. Що прийшло на зміну класичному Container pattern?

Не одна конкретна технологія.

У сучасному React логіку часто виносять у:

    Custom Hooks
    Server Components
    API services
    data-fetching libraries

але сам принцип separation of concerns залишається.

---

# Послідовність вивчення

## 🟢 Core

Спочатку потрібно добре знати:

    components
    props
    children
    state
    events
    conditional rendering

---

## 🔵 Junior

Потім:

    Container
    Presentational
    callbacks
    API data
    loading
    error
    controlled components

---

## 🟠 Middle

Далі:

    Custom Hooks
    separation of concerns
    business logic
    view models
    reusable UI
    testing
    feature-based architecture

---

## 🔴 Senior

На більш високому рівні:

    architecture
    data layer
    domain logic
    server/client boundaries
    design systems
    component APIs
    scalability
    maintainability
    avoiding overengineering

---

# Міні-шпаргалка

## Container

    function UserContainer() {
      const users = useUsers();

      function handleDelete(id: number) {
        // logic
      }

      return (
        <UserList
          users={users}
          onDelete={handleDelete}
        />
      );
    }

---

## Presentational

    interface UserListProps {
      users: User[];
      onDelete: (id: number) => void;
    }

    function UserList({
      users,
      onDelete,
    }: UserListProps) {
      return (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}

              <button
                onClick={() =>
                  onDelete(user.id)
                }
              >
                Delete
              </button>
            </li>
          ))}
        </ul>
      );
    }

---

## Основний потік

    API
      ↓
    Container / Hook
      ↓
    props
      ↓
    Presentational
      ↓
    UI

---

## Події

    User
      ↓
    click
      ↓
    Presentational
      ↓
    callback
      ↓
    Container
      ↓
    state update
      ↓
    re-render

---

## Класичний підхід

    Container
       │
       ├── data
       ├── state
       ├── logic
       └── handlers
              │
              ▼
       Presentational
              │
              └── UI

---

## Сучасний підхід

    API / Server
          ↓
    Custom Hook / Data Layer
          ↓
    Page / Feature
          ↓
    Presentational Components

---

# Головне

1. **Container and Presentational — це патерн розділення відповідальностей.**

2. **Container відповідає переважно за data, state та logic.**

3. **Presentational Component відповідає переважно за UI.**

4. **Container передає дані через props.**

5. **Container передає дії через callback props.**

6. **Presentational Component не повинен знати зайві деталі API.**

7. **Presentational Component може мати локальний UI state.**

8. **Presentational Component не означає "компонент без жодної логіки".**

9. **Business logic краще не змішувати з великим JSX.**

10. **Custom Hooks часто дозволяють винести logic із компонента.**

11. **У сучасному React класичний `Container → Presentational` не є обов'язковою структурою.**

12. **Найважливіше — не назви `Container` і `Presentational`, а separation of concerns.**

13. **Хороший компонент має зрозумілу відповідальність.**

14. **Не потрібно розділяти кожен маленький компонент. Це може призвести до overengineering.**

15. **Якщо компонент одночасно отримує дані, керує складним state, виконує бізнес-логіку і містить сотні рядків JSX — це хороший кандидат для рефакторингу.**

16. **Типовий сучасний напрямок:**

        API / Server
             ↓
        Custom Hook / Data Layer
             ↓
        Page / Container
             ↓
        Presentational
             ↓
            UI

17. **Головний принцип, який потрібно винести з цієї теми:**

        Logic
          +
        Presentation

        ↓

        краще розділяти,
        коли це робить код
        простішим і зрозумілішим.

18. **Container відповідає більше за "що відбувається", а Presentational — за "як це виглядає".**