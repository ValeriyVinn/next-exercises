# ♻️ React — Reusable Components

## 📁 Розділ

`react/05-component-composition-patterns/06-reusable-components`

---

# 1. Що таке Reusable Components

**Reusable Component (повторно використовуваний компонент)** — це React-компонент, який спроєктований так, щоб його можна було використовувати **в різних місцях застосунку** з різними даними та, за потреби, різною поведінкою.

Наприклад, замість створення окремих компонентів:

    UserButton
    AdminButton
    TeacherButton
    StudentButton

можна створити один універсальний:

    Button

і передавати йому потрібні властивості:

    <Button variant="primary">Зберегти</Button>
    <Button variant="danger">Видалити</Button>
    <Button variant="secondary">Скасувати</Button>

Головна ідея:

> **Reusable Component = один компонент + параметри + повторне використання**

---

# 2. Навіщо потрібні reusable components

Повторне використання компонентів дозволяє:

- не дублювати код;
- підтримувати єдиний UI;
- централізовано виправляти помилки;
- швидше створювати нові сторінки;
- спростити підтримку проєкту;
- зробити компоненти передбачуваними;
- побудувати власну UI-бібліотеку;
- легше масштабувати застосунок.

Наприклад, якщо в застосунку 30 кнопок, не варто створювати 30 різних реалізацій кнопки.

Краще мати один базовий компонент:

    Button

і налаштовувати його через props.

---

# 3. Основний принцип

Reusable Component повинен бути:

    Generic
        ↓
    Configurable
        ↓
    Predictable
        ↓
    Reusable

Тобто компонент повинен:

1. мати чітку відповідальність;
2. приймати дані через props;
3. не залежати від конкретної сторінки;
4. не містити зайвої бізнес-логіки;
5. мати зрозумілий API.

---

# 4. Поганий приклад — дублювання

Уявімо, що нам потрібні три кнопки.

    function SaveButton() {
      return (
        <button className="button button-primary">
          Зберегти
        </button>
      );
    }

    function DeleteButton() {
      return (
        <button className="button button-danger">
          Видалити
        </button>
      );
    }

    function CancelButton() {
      return (
        <button className="button button-secondary">
          Скасувати
        </button>
      );
    }

Тут багато повторюваного коду.

У всіх трьох компонентах:

- `<button>`;
- CSS-класи;
- структура;
- подальша поведінка.

---

# 5. Кращий варіант

Створюємо один компонент:

    type ButtonProps = {
      children: React.ReactNode;
      variant?: "primary" | "secondary" | "danger";
      onClick?: () => void;
    };

    export function Button({
      children,
      variant = "primary",
      onClick,
    }: ButtonProps) {
      return (
        <button
          className={`button button-${variant}`}
          onClick={onClick}
        >
          {children}
        </button>
      );
    }

Тепер його можна використовувати багато разів:

    <Button>Зберегти</Button>

    <Button variant="danger">
      Видалити
    </Button>

    <Button variant="secondary">
      Скасувати
    </Button>

---

# 6. Reusability через props

Найважливіший інструмент повторного використання — **props**.

Наприклад:

    type GreetingProps = {
      name: string;
    };

    function Greeting({ name }: GreetingProps) {
      return <h2>Привіт, {name}!</h2>;
    }

Використання:

    <Greeting name="Валерій" />
    <Greeting name="Олена" />
    <Greeting name="Андрій" />

Один компонент працює з різними даними.

---

# 7. Reusability через children

`children` дозволяє зробити компонент ще більш універсальним.

Наприклад:

    type CardProps = {
      children: React.ReactNode;
    };

    function Card({ children }: CardProps) {
      return (
        <article className="card">
          {children}
        </article>
      );
    }

Тепер всередину можна передавати різний контент:

    <Card>
      <h2>Профіль</h2>
      <p>Інформація про користувача.</p>
    </Card>

    <Card>
      <h2>Новини</h2>
      <p>Останні новини сайту.</p>
    </Card>

    <Card>
      <img src="/photo.jpg" alt="Фото" />
    </Card>

Компонент відповідає тільки за оболонку.

---

# 8. Composition як основа reusable components

Один із головних принципів React:

> **Не намагайся передбачити весь вміст компонента — дозволяй передавати його ззовні.**

Погано:

    function Card() {
      return (
        <article>
          <h2>Завжди один заголовок</h2>
          <p>Завжди один текст</p>
          <button>Завжди одна кнопка</button>
        </article>
      );
    }

Краще:

    function Card({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <article className="card">
          {children}
        </article>
      );
    }

Тепер `Card` відповідає тільки за структуру.

---

# 9. Reusable Button

Кнопка — один із найкращих прикладів reusable component.

## Базовий компонент

    type ButtonProps = {
      children: React.ReactNode;
      variant?: "primary" | "secondary" | "danger";
      size?: "small" | "medium" | "large";
      disabled?: boolean;
      onClick?: () => void;
    };

    function Button({
      children,
      variant = "primary",
      size = "medium",
      disabled = false,
      onClick,
    }: ButtonProps) {
      return (
        <button
          className={`button button-${variant} button-${size}`}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </button>
      );
    }

Використання:

    <Button>
      Зберегти
    </Button>

    <Button variant="danger">
      Видалити
    </Button>

    <Button
      variant="secondary"
      size="small"
    >
      Скасувати
    </Button>

    <Button
      variant="primary"
      size="large"
      disabled
    >
      Недоступно
    </Button>

---

# 10. Не роби компонент надто універсальним

Reusable не означає:

> "Компонент повинен підтримувати абсолютно все."

Наприклад, поганий API:

    <Button
      color="red"
      background="blue"
      fontSize={20}
      borderRadius={10}
      margin="10px"
      padding="20px"
      shadow
      animation
      variant="..."
      customStyle="..."
    >
      Кнопка
    </Button>

Компонент стає складним.

Краще мати обмежений API:

    <Button variant="danger" size="medium">
      Видалити
    </Button>

---

# 11. Хороший API компонента

API компонента — це набір props, через які компонент взаємодіє з батьківським кодом.

Наприклад:

    type ButtonProps = {
      children: React.ReactNode;
      variant?: "primary" | "secondary" | "danger";
      size?: "small" | "medium" | "large";
      disabled?: boolean;
      onClick?: () => void;
    };

Його API:

    children
    variant
    size
    disabled
    onClick

Хороший API повинен бути:

- зрозумілим;
- невеликим;
- передбачуваним;
- типізованим;
- стабільним.

---

# 12. Default Props через default values

Для reusable components часто потрібні значення за замовчуванням.

Наприклад:

    type ButtonProps = {
      children: React.ReactNode;
      variant?: "primary" | "secondary";
      size?: "small" | "medium" | "large";
    };

    function Button({
      children,
      variant = "primary",
      size = "medium",
    }: ButtonProps) {
      return (
        <button
          className={`button button-${variant} button-${size}`}
        >
          {children}
        </button>
      );
    }

Тепер:

    <Button>Зберегти</Button>

автоматично означає:

    variant = "primary"
    size = "medium"

---

# 13. Типізація variant

TypeScript особливо корисний для reusable components.

Погано:

    type ButtonProps = {
      variant?: string;
    };

Тоді можна випадково написати:

    <Button variant="red-button" />

і TypeScript не повідомить про проблему.

Краще:

    type ButtonVariant =
      | "primary"
      | "secondary"
      | "danger";

    type ButtonProps = {
      children: React.ReactNode;
      variant?: ButtonVariant;
    };

Тепер:

    <Button variant="primary">
      Зберегти
    </Button>

правильно.

А:

    <Button variant="red-button">
      Зберегти
    </Button>

дасть помилку TypeScript.

---

# 14. Reusable Input

Reusable components потрібні не тільки для кнопок.

Наприклад, створимо `Input`.

    type InputProps = {
      label: string;
      name: string;
      type?: "text" | "email" | "password";
      placeholder?: string;
      value: string;
      onChange: (
        event: React.ChangeEvent<HTMLInputElement>
      ) => void;
    };

    function Input({
      label,
      name,
      type = "text",
      placeholder,
      value,
      onChange,
    }: InputProps) {
      return (
        <div className="input-field">
          <label htmlFor={name}>
            {label}
          </label>

          <input
            id={name}
            name={name}
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
          />
        </div>
      );
    }

Використання:

    <Input
      label="Ім'я"
      name="name"
      value={name}
      onChange={(event) => setName(event.target.value)}
    />

    <Input
      label="Email"
      name="email"
      type="email"
      value={email}
      onChange={(event) => setEmail(event.target.value)}
    />

---

# 15. Reusable Card

Створимо універсальну картку.

    type CardProps = {
      children: React.ReactNode;
      className?: string;
    };

    function Card({
      children,
      className = "",
    }: CardProps) {
      return (
        <article className={`card ${className}`}>
          {children}
        </article>
      );
    }

Використання:

    <Card>
      <h2>Користувач</h2>
      <p>Інформація про користувача.</p>
    </Card>

    <Card>
      <h2>Новина</h2>
      <p>Текст новини.</p>
    </Card>

---

# 16. Reusable List

Іноді reusable component може приймати масив даних.

Наприклад:

    type User = {
      id: number;
      name: string;
    };

    type UserListProps = {
      users: User[];
    };

    function UserList({ users }: UserListProps) {
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

Використання:

    const users = [
      { id: 1, name: "Олена" },
      { id: 2, name: "Андрій" },
      { id: 3, name: "Марія" },
    ];

    <UserList users={users} />

---

# 17. Render Props як спосіб повторного використання

Іноді reusable component повинен повторно використовувати не тільки UI, а й логіку.

Для цього можна використовувати render prop.

Наприклад:

    type DataProviderProps<T> = {
      data: T;
      render: (data: T) => React.ReactNode;
    };

    function DataProvider<T>({
      data,
      render,
    }: DataProviderProps<T>) {
      return (
        <section>
          {render(data)}
        </section>
      );
    }

Використання:

    <DataProvider
      data={user}
      render={(user) => (
        <div>
          <h2>{user.name}</h2>
        </div>
      )}
    />

Головна ідея:

    component
        ↓
    отримує data
        ↓
    передає data
        ↓
    render function
        ↓
    UI

---

# 18. Reusable Components і custom hooks

Не вся повторювана логіка повинна знаходитися всередині компонента.

Наприклад, якщо кілька компонентів використовують одну й ту саму логіку:

    useToggle()

можна винести її в custom hook.

    function useToggle(initialValue = false) {
      const [value, setValue] = useState(initialValue);

      const toggle = () => {
        setValue((current) => !current);
      };

      return {
        value,
        toggle,
      };
    }

Тоді різні компоненти можуть використовувати одну логіку:

    function Menu() {
      const { value: isOpen, toggle } = useToggle();

      return (
        <>
          <button onClick={toggle}>
            Меню
          </button>

          {isOpen && <nav>...</nav>}
        </>
      );
    }

    function Modal() {
      const { value: isOpen, toggle } = useToggle();

      return (
        <>
          <button onClick={toggle}>
            Відкрити
          </button>

          {isOpen && <div>Modal</div>}
        </>
      );
    }

Тут:

    Reusable Component
        → повторне використання UI

    Custom Hook
        → повторне використання логіки

---

# 19. Component vs Custom Hook

Важливо розуміти різницю.

## Component

Використовуємо, коли потрібно повторно використовувати:

- UI;
- структуру;
- поведінку + UI.

Наприклад:

    Button
    Card
    Modal
    Input
    Navbar

## Custom Hook

Використовуємо, коли потрібно повторно використовувати:

- state logic;
- effects;
- event logic;
- data fetching;
- іншу React-логіку.

Наприклад:

    useToggle
    useForm
    useFetch
    useLocalStorage

---

# 20. Smart і Presentational Components

Reusable components часто добре працюють разом із розділенням:

    Container / Smart Component
        ↓
    data + logic
        ↓
    Presentational Component
        ↓
    UI

Наприклад:

    function UserContainer() {
      const user = getUser();

      return (
        <UserCard user={user} />
      );
    }

А `UserCard` відповідає тільки за відображення:

    type UserCardProps = {
      user: User;
    };

    function UserCard({ user }: UserCardProps) {
      return (
        <article>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </article>
      );
    }

`UserCard` легко повторно використовувати в інших місцях.

---

# 21. Не прив'язуй reusable component до конкретної сторінки

Погано:

    function HomePageUserCard() {
      // компонент знає про HomePage
    }

Краще:

    function UserCard() {
      // компонент нічого не знає про HomePage
    }

Тоді:

    HomePage
        ↓
    UserCard

    ProfilePage
        ↓
    UserCard

    AdminPage
        ↓
    UserCard

---

# 22. Reusable component повинен отримувати дані ззовні

Погано:

    function UserCard() {
      const user = {
        name: "Валерій",
        email: "example@gmail.com",
      };

      return (
        <article>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </article>
      );
    }

Такий компонент важко повторно використовувати.

Краще:

    type User = {
      name: string;
      email: string;
    };

    type UserCardProps = {
      user: User;
    };

    function UserCard({ user }: UserCardProps) {
      return (
        <article>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
        </article>
      );
    }

Тепер:

    <UserCard
      user={{
        name: "Валерій",
        email: "valeriy@example.com",
      }}
    />

    <UserCard
      user={{
        name: "Олена",
        email: "olena@example.com",
      }}
    />

---

# 23. Не змішуй UI та бізнес-логіку без необхідності

Reusable UI-компонент краще робити максимально незалежним.

Наприклад, `Button` не повинен знати:

- що таке користувач;
- як видаляється користувач;
- який API викликається;
- яка сторінка зараз відкрита.

Погано:

    function DeleteUserButton() {
      const deleteUser = async () => {
        await fetch("/api/users/123", {
          method: "DELETE",
        });
      };

      return (
        <button onClick={deleteUser}>
          Видалити користувача
        </button>
      );
    }

Це вже спеціалізований компонент.

Краще мати:

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

А бізнес-логіку залишити батьківському компоненту:

    function UserActions() {
      const handleDelete = async () => {
        await fetch("/api/users/123", {
          method: "DELETE",
        });
      };

      return (
        <Button
          variant="danger"
          onClick={handleDelete}
        >
          Видалити
        </Button>
      );
    }

---

# 24. Reusable Modal

Modal — хороший приклад композиції.

    type ModalProps = {
      children: React.ReactNode;
      isOpen: boolean;
      onClose: () => void;
    };

    function Modal({
      children,
      isOpen,
      onClose,
    }: ModalProps) {
      if (!isOpen) {
        return null;
      }

      return (
        <div className="modal-backdrop">
          <div className="modal">
            <button onClick={onClose}>
              ×
            </button>

            {children}
          </div>
        </div>
      );
    }

Використання:

    <Modal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
    >
      <h2>Видалення</h2>

      <p>
        Ви впевнені, що хочете видалити запис?
      </p>

      <Button variant="danger">
        Видалити
      </Button>
    </Modal>

Той самий `Modal` можна використовувати для:

    підтвердження видалення
    форми
    повідомлення
    налаштувань
    перегляду інформації

---

# 25. Reusable компоненти і композиція

Найсильніший підхід:

    маленькі компоненти
          +
    props
          +
    children
          +
    composition
          =
    reusable UI

Наприклад:

    <Card>
      <CardHeader>
        <h2>Профіль</h2>
      </CardHeader>

      <CardBody>
        <p>Інформація про користувача.</p>
      </CardBody>

      <CardFooter>
        <Button>Редагувати</Button>
      </CardFooter>
    </Card>

Тут кожна частина має окрему відповідальність.

---

# 26. Reusable Components і Compound Components

Compound Components, які ми розглядали раніше, є одним із способів створення reusable API.

Наприклад:

    <Tabs>
      <Tabs.List>
        <Tabs.Tab value="profile">
          Профіль
        </Tabs.Tab>

        <Tabs.Tab value="settings">
          Налаштування
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="profile">
        Профіль
      </Tabs.Panel>

      <Tabs.Panel value="settings">
        Налаштування
      </Tabs.Panel>
    </Tabs>

Цей API можна використовувати в різних частинах застосунку.

---

# 27. Reusable Component Library

У великому застосунку можна створити власну бібліотеку компонентів.

Наприклад:

    components/
    ├── Button/
    │   ├── Button.tsx
    │   ├── Button.module.css
    │   └── index.ts
    │
    ├── Input/
    │   ├── Input.tsx
    │   ├── Input.module.css
    │   └── index.ts
    │
    ├── Card/
    │   ├── Card.tsx
    │   ├── Card.module.css
    │   └── index.ts
    │
    ├── Modal/
    │   ├── Modal.tsx
    │   ├── Modal.module.css
    │   └── index.ts
    │
    └── Spinner/
        ├── Spinner.tsx
        ├── Spinner.module.css
        └── index.ts

Такі компоненти можуть використовуватися по всьому застосунку.

---

# 28. Barrel exports

Для зручності імпорту можна використовувати `index.ts`.

Наприклад:

    components/Button/index.ts

    export { Button } from "./Button";

Тоді замість:

    import { Button } from "./components/Button/Button";

можна:

    import { Button } from "./components/Button";

Або створити загальний `components/index.ts`:

    export { Button } from "./Button";
    export { Input } from "./Input";
    export { Card } from "./Card";
    export { Modal } from "./Modal";

Тоді:

    import {
      Button,
      Input,
      Card,
      Modal,
    } from "@/components";

---

# 29. Reusable Component і HTML attributes

Для універсальних HTML-компонентів часто потрібно дозволити стандартні атрибути.

Наприклад, `Button` може підтримувати:

    type
    disabled
    title
    aria-label
    name
    value

Замість того щоб описувати кожен prop вручну, можна розширити тип HTML-кнопки.

    type ButtonProps =
      React.ButtonHTMLAttributes<HTMLButtonElement> & {
        variant?: "primary" | "secondary" | "danger";
        size?: "small" | "medium" | "large";
      };

Тоді компонент може приймати стандартні атрибути:

    function Button({
      children,
      variant = "primary",
      size = "medium",
      ...props
    }: ButtonProps) {
      return (
        <button
          className={`button button-${variant} button-${size}`}
          {...props}
        >
          {children}
        </button>
      );
    }

Використання:

    <Button
      variant="danger"
      type="button"
      title="Видалити запис"
      aria-label="Видалити запис"
    >
      Видалити
    </Button>

---

# 30. Що означає `...props`

У reusable components часто використовується:

    ...props

Наприклад:

    function Button({
      children,
      ...props
    }: ButtonProps) {
      return (
        <button {...props}>
          {children}
        </button>
      );
    }

Якщо передати:

    <Button
      disabled
      type="button"
      title="Зберегти"
    >
      Зберегти
    </Button>

то props:

    disabled
    type
    title

будуть передані до `<button>`.

---

# 31. Не передавай всі props бездумно

`...props` — корисний інструмент, але потрібно розуміти, що саме передається.

Наприклад:

    <div {...props} />

може бути небезпечним, якщо в `props` потрапляють непотрібні або некоректні атрибути.

Краще використовувати `...props` тоді, коли компонент дійсно є абстракцією конкретного HTML-елемента.

Наприклад:

    Button → <button>
    Input → <input>
    Label → <label>

---

# 32. Reusable Input з HTML attributes

Можна зробити більш універсальний `Input`.

    type InputProps =
      React.InputHTMLAttributes<HTMLInputElement> & {
        label: string;
      };

    function Input({
      label,
      id,
      ...props
    }: InputProps) {
      return (
        <div className="input-field">
          <label htmlFor={id}>
            {label}
          </label>

          <input
            id={id}
            {...props}
          />
        </div>
      );
    }

Використання:

    <Input
      id="email"
      label="Email"
      type="email"
      placeholder="Введіть email"
      required
    />

---

# 33. Accessibility у reusable components

Reusable components повинні одразу враховувати accessibility.

Наприклад, reusable `Input` повинен правильно зв'язувати:

    label
        ↓
    htmlFor
        ↓
    input id

Приклад:

    <label htmlFor="email">
      Email
    </label>

    <input
      id="email"
      type="email"
    />

Не варто створювати reusable component, який вимагає від кожного розробника вручну виправляти accessibility.

Хороший reusable component:

> має правильну поведінку за замовчуванням.

---

# 34. Не створюй reusable component занадто рано

Це дуже важливий принцип.

Не потрібно одразу після першого використання робити:

    <UniversalComponent />

Іноді краще спочатку написати простий локальний компонент.

Наприклад:

    ProfilePage
        ↓
    ProfileCard

Пізніше з'ясувалося, що така сама картка потрібна:

    Dashboard
    AdminPage
    UsersPage

Тоді можна винести її в reusable component:

    components/UserCard

---

# 35. Правило трьох використань

Практичне правило:

> Якщо код повторюється один раз — це ще не обов'язково проблема.
>
> Якщо повторюється кілька разів — шукай спільну абстракцію.
>
> Якщо повторюється систематично — створюй reusable component.

Умовно:

    1 use
        ↓
    local component

    2 uses
        ↓
    подумати про abstraction

    3+ similar uses
        ↓
    reusable component

Це не жорстке правило, а практичний орієнтир.

---

# 36. DRY і reusable components

`DRY`:

> Don't Repeat Yourself

означає:

> Не дублюй одну й ту саму логіку без необхідності.

Наприклад, якщо в 10 компонентах однакова кнопка:

    <button className="primary-button">
      ...
    </button>

краще створити:

    <Button variant="primary">
      ...
    </Button>

Але DRY не означає:

> "Будь-який схожий код потрібно негайно об'єднати."

Надмірна абстракція теж створює проблеми.

---

# 37. Reusable ≠ Universal

Дуже важливо:

    reusable
        ≠
    universal

Reusable component може мати конкретне призначення.

Наприклад:

    UserCard

є reusable, якщо використовується в:

    UsersPage
    Dashboard
    AdminPage

Він не повинен перетворюватися на:

    UniversalCard

яка намагається відображати будь-які можливі дані.

---

# 38. Хороший рівень абстракції

Потрібно знайти баланс між:

    дублюванням
          ↕
    надмірною абстракцією

Погано:

    копіювати один і той самий компонент 10 разів.

Але також погано:

    UniversalComponent
      + 25 props
      + 15 boolean props
      + 10 callbacks
      + складні умови

Хороший компонент має:

    чітку відповідальність
    +
    невеликий API
    +
    зрозуміле використання

---

# 39. Boolean props і reusable components

Обережно з великою кількістю boolean props.

Наприклад:

    <Button
      primary
      large
      rounded
      outlined
      loading
      fullWidth
      icon
      disabled
    >
      Зберегти
    </Button>

Це може стати складним.

Краще іноді використовувати варіанти:

    <Button
      variant="primary"
      size="large"
      loading
    >
      Зберегти
    </Button>

---

# 40. Loading state

Reusable Button може мати `loading`.

    type ButtonProps = {
      children: React.ReactNode;
      loading?: boolean;
      disabled?: boolean;
    };

    function Button({
      children,
      loading = false,
      disabled = false,
    }: ButtonProps) {
      return (
        <button
          disabled={disabled || loading}
        >
          {loading ? "Завантаження..." : children}
        </button>
      );
    }

Використання:

    <Button loading>
      Зберегти
    </Button>

Компонент сам відповідає за відображення стану.

---

# 41. Reusable components повинні бути передбачуваними

Якщо написано:

    <Button disabled>
      Зберегти
    </Button>

користувач компонента очікує:

    button.disabled === true

Якщо написано:

    <Button variant="danger">
      Видалити
    </Button>

очікується небезпечний/деструктивний стиль.

API повинен бути інтуїтивним.

---

# 42. Controlled і reusable components

Reusable input часто є controlled component.

Батьківський компонент зберігає state:

    function Form() {
      const [email, setEmail] = useState("");

      return (
        <Input
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
      );
    }

Reusable `Input` тільки відображає значення і повідомляє про зміни.

    Input
      ↓
    onChange
      ↓
    Parent
      ↓
    setState
      ↓
    value
      ↓
    Input

---

# 43. Reusable component не повинен приховувати важливу поведінку

Погано, якщо компонент робить щось неочевидне.

Наприклад:

    <Button onClick={save} />

а всередині компонент раптом:

    fetch("/api/delete")
    localStorage.clear()
    redirect()
    alert()

Це робить компонент непередбачуваним.

Краще:

    <Button onClick={save}>
      Зберегти
    </Button>

і саме `save` визначає бізнес-логіку.

---

# 44. Reusable Components у реальному проєкті

Наприклад, для навчального LMS:

    components/
    ├── Button/
    ├── Input/
    ├── Select/
    ├── Card/
    ├── Modal/
    ├── Spinner/
    ├── Alert/
    ├── Badge/
    ├── Table/
    ├── Pagination/
    └── FormField/

А бізнес-компоненти:

    features/
    ├── users/
    │   ├── UserCard/
    │   ├── UserList/
    │   └── UserForm/
    │
    ├── courses/
    │   ├── CourseCard/
    │   ├── CourseList/
    │   └── CourseForm/
    │
    └── lessons/
        ├── LessonCard/
        └── LessonList/

Тут важливо розрізняти:

    components/
        ↓
    загальні reusable компоненти

    features/
        ↓
    компоненти конкретної предметної області

---

# 45. Generic reusable components

TypeScript дозволяє створювати reusable компоненти, які працюють із різними типами даних.

Наприклад, універсальний список:

    type ListProps<T> = {
      items: T[];
      renderItem: (item: T) => React.ReactNode;
      getKey: (item: T) => string | number;
    };

    function List<T>({
      items,
      renderItem,
      getKey,
    }: ListProps<T>) {
      return (
        <ul>
          {items.map((item) => (
            <li key={getKey(item)}>
              {renderItem(item)}
            </li>
          ))}
        </ul>
      );
    }

Тепер його можна використовувати для користувачів:

    <List
      items={users}
      getKey={(user) => user.id}
      renderItem={(user) => (
        <span>{user.name}</span>
      )}
    />

або курсів:

    <List
      items={courses}
      getKey={(course) => course.id}
      renderItem={(course) => (
        <span>{course.title}</span>
      )}
    />

Це вже більш просунутий рівень reusable components.

---

# 46. Коли generic component справді потрібен

Не потрібно використовувати generics просто заради generics.

Вони корисні, коли:

    один компонент
        ↓
    працює з різними типами даних
        ↓
    але структура його поведінки однакова

Наприклад:

    List<User>
    List<Course>
    List<Product>

---

# 47. Reusable Components і separation of concerns

Хороший компонент має одну основну відповідальність.

Наприклад:

    Button
        → кнопка

    Input
        → поле введення

    Modal
        → модальне вікно

    UserCard
        → відображення користувача

    UserForm
        → форма користувача

Не варто створювати:

    UserButtonWithApiAndModalAndValidationAndNavigation

Краще розділити відповідальності.

---

# 48. Приклад правильної композиції

Маємо сторінку користувача:

    function UserPage() {
      const [isModalOpen, setIsModalOpen] = useState(false);

      const handleDelete = async () => {
        // business logic
      };

      return (
        <>
          <UserCard>
            <Button
              variant="danger"
              onClick={() => setIsModalOpen(true)}
            >
              Видалити
            </Button>
          </UserCard>

          <Modal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          >
            <h2>Підтвердження</h2>

            <Button
              variant="danger"
              onClick={handleDelete}
            >
              Підтвердити
            </Button>
          </Modal>
        </>
      );
    }

Тут:

    UserPage
        ↓
    business logic

    UserCard
        ↓
    reusable UI

    Button
        ↓
    reusable UI

    Modal
        ↓
    reusable UI

---

# 49. Як зрозуміти, що компонент можна зробити reusable

Постав собі питання:

### 1. Чи повторюється структура?

    Так → можливо reusable component.

### 2. Чи змінюються тільки дані?

    Так → props.

### 3. Чи змінюється внутрішній контент?

    Так → children / composition.

### 4. Чи повторюється тільки логіка?

    Так → custom hook.

### 5. Чи компонент прив'язаний до конкретної сторінки?

    Так → можливо, він ще не reusable.

### 6. Чи має він надто багато props?

    Так → можливо, абстракція занадто складна.

---

# 50. Алгоритм створення reusable component

## Крок 1. Знайди повторення

Наприклад:

    <button className="primary">
      Зберегти
    </button>

повторюється багато разів.

---

## Крок 2. Знайди спільну структуру

    <button>
      {children}
    </button>

---

## Крок 3. Знайди змінні частини

Наприклад:

    children
    variant
    size
    disabled
    onClick

---

## Крок 4. Перетвори їх на props

    type ButtonProps = {
      children: React.ReactNode;
      variant?: "primary" | "secondary" | "danger";
      size?: "small" | "medium" | "large";
      disabled?: boolean;
      onClick?: () => void;
    };

---

## Крок 5. Створи компонент

    function Button({
      children,
      variant = "primary",
      size = "medium",
      disabled = false,
      onClick,
    }: ButtonProps) {
      return (
        <button
          className={`button button-${variant} button-${size}`}
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </button>
      );
    }

---

## Крок 6. Перевір різні сценарії

    <Button>Зберегти</Button>

    <Button variant="danger">
      Видалити
    </Button>

    <Button
      variant="secondary"
      size="small"
    >
      Скасувати
    </Button>

---

# 51. Типові помилки

## ❌ Помилка 1 — надмірна універсальність

    UniversalComponent

з десятками props.

### Краще:

    Button
    Input
    Card
    Modal

Кожен компонент має конкретну відповідальність.

---

## ❌ Помилка 2 — компонент знає про бізнес-логіку

    Button
      ↓
    fetch("/api/users")
      ↓
    delete user

### Краще:

    Parent
      ↓
    handleDelete
      ↓
    Button

---

## ❌ Помилка 3 — hardcoded data

Погано:

    function UserCard() {
      const user = {
        name: "Валерій",
      };

      ...
    }

Краще:

    function UserCard({ user }: UserCardProps) {
      ...
    }

---

## ❌ Помилка 4 — надто багато props

    <Component
      prop1
      prop2
      prop3
      prop4
      prop5
      prop6
      prop7
      prop8
      prop9
      prop10
    />

Це може бути ознакою поганої абстракції.

---

## ❌ Помилка 5 — неправильний рівень abstraction

Якщо компонент використовується тільки один раз і має дуже специфічну логіку, не обов'язково робити його глобальним reusable component.

---

## ❌ Помилка 6 — дублювання компонентів

Погано:

    PrimaryButton
    SaveButton
    SubmitButton
    ConfirmButton

якщо вони відрізняються лише текстом.

Краще:

    <Button variant="primary">
      Зберегти
    </Button>

    <Button variant="primary">
      Підтвердити
    </Button>

---

# 52. Reusable Components vs Page Components

Це важливе розділення.

## Page Component

Зазвичай відповідає за:

- конкретну сторінку;
- отримання даних;
- композицію компонентів;
- routing;
- бізнес-логіку сторінки.

Наприклад:

    UsersPage

## Reusable Component

Зазвичай відповідає за:

- повторюваний UI;
- окрему поведінку;
- presentation;
- чіткий API.

Наприклад:

    Button
    Card
    Modal
    UserCard

---

# 53. Reusable Components і дизайн-система

Коли reusable components стає багато, вони можуть утворити основу Design System.

Наприклад:

    Design System
        ↓
    Button
    Input
    Select
    Checkbox
    Modal
    Card
    Alert
    Badge
    Table

Усі компоненти мають:

- однакові правила;
- однакові стилі;
- однакові назви;
- однакові принципи API;
- accessibility;
- TypeScript types.

---

# 54. Рівні reusable components

Корисно мислити рівнями.

    Level 1
    ─────────────
    Button
    Input
    Badge


    Level 2
    ─────────────
    Card
    Modal
    FormField


    Level 3
    ─────────────
    UserCard
    CourseCard
    ProductCard


    Level 4
    ─────────────
    UserForm
    CourseForm
    CheckoutForm


    Level 5
    ─────────────
    UserManagement
    CourseManagement
    Dashboard

Чим вище рівень, тим більше компонент залежить від конкретної предметної області.

---

# 55. Що має бути максимально reusable

Зазвичай найбільш reusable:

    Button
    Input
    Label
    Card
    Modal
    Spinner
    Alert
    Badge
    Container

Менш reusable:

    UserCard
    CourseCard
    LessonCard
    UserForm

Ще менш reusable:

    UserManagementPage
    CourseManagementPage
    Dashboard

Це нормально.

Не потрібно робити кожен компонент універсальним.

---

# 56. Практичний приклад — маленька UI-бібліотека

Можна створити:

    components/
    ├── Button/
    │   ├── Button.tsx
    │   └── Button.module.css
    │
    ├── Input/
    │   ├── Input.tsx
    │   └── Input.module.css
    │
    ├── Card/
    │   ├── Card.tsx
    │   └── Card.module.css
    │
    ├── Modal/
    │   ├── Modal.tsx
    │   └── Modal.module.css
    │
    └── Spinner/
        ├── Spinner.tsx
        └── Spinner.module.css

Потім:

    app/
    ├── users/
    ├── courses/
    └── dashboard/

усі використовують одну систему компонентів.

---

# 57. Практичний міні-проєкт

Створи просту сторінку:

    User Management

Вона повинна мати:

    UserCard
    Button
    Input
    Modal

Структура:

    UserPage
        │
        ├── Input
        │
        ├── UserCard
        │     ├── Button
        │     └── Button
        │
        └── Modal
              └── Button

---

# 58. Крок 1 — Button

    type ButtonProps = {
      children: React.ReactNode;
      variant?: "primary" | "danger";
      onClick?: () => void;
    };

    function Button({
      children,
      variant = "primary",
      onClick,
    }: ButtonProps) {
      return (
        <button
          className={`button button-${variant}`}
          onClick={onClick}
        >
          {children}
        </button>
      );
    }

---

# 59. Крок 2 — UserCard

    type User = {
      id: number;
      name: string;
      email: string;
    };

    type UserCardProps = {
      user: User;
      onDelete: (id: number) => void;
    };

    function UserCard({
      user,
      onDelete,
    }: UserCardProps) {
      return (
        <article>
          <h2>{user.name}</h2>

          <p>{user.email}</p>

          <Button
            variant="danger"
            onClick={() => onDelete(user.id)}
          >
            Видалити
          </Button>
        </article>
      );
    }

---

# 60. Крок 3 — використання

    function UserPage() {
      const users: User[] = [
        {
          id: 1,
          name: "Олена",
          email: "olena@example.com",
        },
        {
          id: 2,
          name: "Андрій",
          email: "andriy@example.com",
        },
      ];

      const handleDelete = (id: number) => {
        console.log("Delete:", id);
      };

      return (
        <main>
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
              onDelete={handleDelete}
            />
          ))}
        </main>
      );
    }

Тут добре видно розділення:

    UserPage
        ↓
    data + logic

    UserCard
        ↓
    user presentation

    Button
        ↓
    generic UI

---

# 61. Основна архітектурна ідея

У хорошому React-застосунку можна поступово рухатися від:

    конкретного UI

до:

    reusable component

а потім:

    reusable component library

Схема:

    Повторення
        ↓
    Props
        ↓
    Composition
        ↓
    Reusable Component
        ↓
    Component Library
        ↓
    Design System

---

# 62. Reusable Components і React API design

Створення reusable component — це фактично створення маленького API.

Наприклад:

    <Button
      variant="danger"
      size="small"
      onClick={handleDelete}
    >
      Видалити
    </Button>

Тут API компонента — це:

    variant
    size
    onClick
    children

Розробник не повинен знати, як саме всередині реалізований Button.

Це називається **абстракцією**.

---

# 63. Інкапсуляція

Reusable component приховує деталі реалізації.

Наприклад:

    <Modal
      isOpen={isOpen}
      onClose={handleClose}
    >
      ...
    </Modal>

Батьківському компоненту не потрібно знати:

- як створюється backdrop;
- як стилізується modal;
- як організований layout;
- як обробляється close button.

Він знає тільки API:

    isOpen
    onClose
    children

---

# 64. Reusable component як "чорний ящик"

Корисна модель:

    ┌─────────────────────────┐
    │       Button            │
    │                         │
    │   внутрішня реалізація  │
    │        прихована        │
    └─────────────────────────┘
          ↑             ↓
        props          UI

Батьківський компонент працює тільки з API.

---

# 65. Як не перетворити reusable component на "God Component"

Поганий компонент:

    UniversalFormComponent

який одночасно:

- отримує дані;
- робить fetch;
- валідовує;
- зберігає;
- відкриває modal;
- показує notification;
- змінює URL;
- рендерить таблицю;
- керує pagination.

Краще розділити:

    Form
    Input
    Button
    Modal
    Alert
    Table
    Pagination

і композицією зібрати потрібний екран.

---

# 66. Головне правило reusable components

> **Компонент повинен бути достатньо загальним для повторного використання, але достатньо конкретним, щоб його API залишався простим.**

Тобто:

    не надто specific
          ↕
    не надто generic
          ↓
    правильний abstraction level

---

# 67. Коли використовувати props, children, composition або hook

| Потрібно повторно використовувати | Інструмент |
|---|---|
| Дані | props |
| Текст / контент | props / children |
| Внутрішню структуру | children / composition |
| UI | component |
| Логіку | custom hook |
| Складну взаємодію компонентів | Context / Compound Components |
| Типи даних | TypeScript generics |
| HTML attributes | `...props` |

---

# 68. Міні-шпаргалка

    Reusable Component
        ↓
    компонент, який можна використовувати повторно

    Props
        ↓
    передача даних і налаштувань

    children
        ↓
    передача довільного контенту

    Composition
        ↓
    складання складного UI з простих компонентів

    Custom Hook
        ↓
    повторне використання логіки

    TypeScript
        ↓
    безпечний API компонента

    ...props
        ↓
    передача стандартних HTML attributes

    Design System
        ↓
    система reusable UI-компонентів

---

# 69. Що потрібно запам'ятати

### 1.

Reusable component — це компонент, який можна використовувати в різних місцях.

### 2.

Основний інструмент налаштування reusable component — `props`.

### 3.

Для довільного контенту використовуй `children`.

### 4.

Для складного UI використовуй composition.

### 5.

Для повторного використання логіки використовуй custom hooks.

### 6.

Reusable component не повинен знати зайву бізнес-логіку.

### 7.

Не роби компонент універсальним заради універсальності.

### 8.

Хороший reusable component має маленький і зрозумілий API.

### 9.

TypeScript допомагає зробити API компонента безпечним.

### 10.

Accessibility краще закладати безпосередньо в reusable component.

### 11.

Reusable ≠ universal.

### 12.

Не потрібно абстрагувати компонент занадто рано.

### 13.

Composition часто краща за складну систему props.

### 14.

Маленькі reusable components легше тестувати та підтримувати.

---

# 70. Питання для самоперевірки

1. Що таке reusable component?
2. Навіщо потрібні reusable components?
3. Яку роль відіграють props?
4. Для чого потрібен `children`?
5. Що таке composition?
6. Чим reusable component відрізняється від page component?
7. Коли краще використовувати custom hook?
8. Що таке component API?
9. Що означає хороший API компонента?
10. Чому не варто створювати `UniversalComponent`?
11. Що таке over-abstraction?
12. Коли корисно використовувати `...props`?
13. Як типізувати reusable component у TypeScript?
14. Як зробити reusable `Button`?
15. Як зробити reusable `Input`?
16. Як передати бізнес-логіку в reusable component?
17. Чому reusable component не повинен містити зайву бізнес-логіку?
18. Що таке Design System?
19. Чим component відрізняється від custom hook?
20. Коли варто створювати reusable component?
21. Чому `children` часто робить компонент більш reusable?
22. Що таке controlled reusable component?
23. Навіщо використовувати TypeScript generics у reusable components?
24. Що таке Compound Components?
25. Як reusable components пов'язані з композицією?

---

# 71. Практичні завдання

## Завдання 1

Створи:

    Button

з props:

    children
    variant
    size
    disabled
    onClick

---

## Завдання 2

Створи:

    Input

з props:

    label
    value
    onChange
    placeholder
    type

---

## Завдання 3

Створи:

    Card

який підтримує:

    children

і може використовуватися для:

    User
    Course
    Lesson
    News

---

## Завдання 4

Створи:

    Modal

з:

    isOpen
    onClose
    children

---

## Завдання 5

Створи:

    UserCard

з:

    user
    onDelete
    onEdit

---

## Завдання 6

Винеси спільну логіку відкриття/закриття в:

    useToggle()

---

## Завдання 7

Створи generic:

    List<T>

який приймає:

    items
    renderItem
    getKey

---

# 72. Навчальний шлях

## 🟢 Junior

Потрібно впевнено знати:

    props
    children
    reusable components
    composition
    TypeScript props
    default values
    event callbacks

Вміти створити:

    Button
    Input
    Card
    Modal
    UserCard

---

## 🟡 Strong Junior

Додатково:

    custom hooks
    controlled components
    HTML attribute types
    ...props
    Compound Components
    accessibility
    component API design

---

## 🟠 Middle

Додатково:

    component libraries
    design systems
    generic components
    advanced composition
    render props
    compound components
    abstraction boundaries
    testing reusable components

---

## 🔴 Senior

Глибоко розуміти:

    API design
    abstraction
    scalability
    design systems
    accessibility
    component architecture
    dependency boundaries
    composability
    maintainability
    backward compatibility

---

# 73. Зв'язок із попередніми темами

Ця тема об'єднує багато попередніх концепцій React.

    Components
        ↓
    Props
        ↓
    Children
        ↓
    Composition
        ↓
    Compound Components
        ↓
    Reusable Components

А для логіки:

    State
        ↓
    Effects
        ↓
    Hooks
        ↓
    Custom Hooks
        ↓
    Reusable Logic

У результаті:

    UI + Props + Composition + Hooks
                    ↓
          Reusable Components

---

# 74. Найважливіша модель мислення

Коли бачиш повторюваний UI, не думай одразу:

    "Як скопіювати цей компонент?"

Думай:

    Що тут спільне?
          ↓
    Що тут змінюється?
          ↓
    Чи можна змінне передати через props?
          ↓
    Чи потрібен children?
          ↓
    Чи потрібна composition?
          ↓
    Чи повторюється тільки логіка?
          ↓
    Можливо, потрібен custom hook.
          ↓
    Створюємо простий reusable API.

---

# 75. Підсумкова схема

    ┌─────────────────────────────┐
    │      Reusable Component     │
    └──────────────┬──────────────┘
                   │
          ┌────────┼────────┐
          ↓        ↓        ↓
       Props    Children  Composition
          │        │        │
          └────────┼────────┘
                   ↓
            Flexible UI
                   │
                   ↓
          Reusable Component
                   │
          ┌────────┴────────┐
          ↓                 ↓
       UI logic          Custom Hook
          │                 │
          ↓                 ↓
      Component        Reusable Logic

---

# 76. Головне

> **Reusable Component — це не просто компонент, який використовується кілька разів. Це компонент із добре продуманим API, чіткою відповідальністю та можливістю працювати з різними даними й контекстами.**

Найважливіша формула:

    Reusable Component
        =
    чітка відповідальність
        +
    props
        +
    children
        +
    composition
        +
    передбачуваний API
        +
    TypeScript
        +
    accessibility

І головний принцип React:

    Не дублюй UI.
    Не ховай зайву бізнес-логіку.
    Не роби UniversalComponent.
    Створюй маленькі компоненти
    з простим API
    і комбінуй їх через composition.

Саме це поступово приводить від:

    простих React-компонентів

до:

    reusable components

до:

    component library

і далі:

    design system