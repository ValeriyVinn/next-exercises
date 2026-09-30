# Props та Children у React

**Props (properties)** — це дані, які компонент отримує від батьківського компонента.

**Children** — це спеціальний prop, який містить те, що передано всередину JSX-тега компонента.

Props дозволяють:

- передавати дані від батьківського компонента до дочірнього;
- налаштовувати поведінку та вигляд компонента;
- робити компоненти повторно використовуваними;
- передавати функції як callback;
- передавати JSX та інші React-елементи;
- створювати композицію компонентів через `children`.

Основна модель:

    Parent
       │
       │ props
       ▼
    Child

Наприклад:

    function UserCard({ name }) {
      return <h2>{name}</h2>;
    }

    export default function App() {
      return <UserCard name="Valeriy" />;
    }

Тут:

- `App` — батьківський компонент;
- `UserCard` — дочірній компонент;
- `name="Valeriy"` — prop;
- `name` всередині `UserCard` — отримане значення prop.

---

# 1. Що потрібно знати

Основні поняття цієї теми:

- `props`
- `children`
- передача props
- отримання props
- destructuring
- default values
- props різних типів
- boolean props
- function props
- callback props
- JSX як prop
- `children`
- `ReactNode`
- props — read-only
- односпрямований потік даних
- composition
- spread props
- пропси та TypeScript
- типові помилки

---

# 2. Props

## 2.1. Що таке props

Props — це параметри компонента.

Як функція отримує аргументи:

    function add(a, b) {
      return a + b;
    }

    add(2, 3);

так React-компонент отримує props:

    function User({ name }) {
      return <h2>{name}</h2>;
    }

    <User name="Valeriy" />;

Можна думати про компонент як про функцію:

    Component(props)

Наприклад:

    function User(props) {
      return <h2>{props.name}</h2>;
    }

    <User name="Valeriy" />;

React передає компоненту приблизно такий об'єкт:

    {
      name: "Valeriy"
    }

Тому:

    props.name

містить:

    "Valeriy"

---

# 3. Передача props

Props передаються через JSX-атрибути.

    <User
      name="Valeriy"
      age={56}
      city="Vinnytsia"
    />

Компонент може отримати всі ці значення:

    function User(props) {
      return (
        <div>
          <h2>{props.name}</h2>
          <p>Age: {props.age}</p>
          <p>City: {props.city}</p>
        </div>
      );
    }

---

# 4. Props як значення JavaScript

У JSX існує два основні способи передачі значень.

## 4.1. Рядок через лапки

    <User name="Valeriy" />

Це передає string:

    "Valeriy"

---

## 4.2. JavaScript expression через `{}`

    <User age={56} />

Тут `56` — number.

Так само можна передати змінну:

    const userName = "Valeriy";

    <User name={userName} />

Або результат виразу:

    <User age={50 + 6} />

Або значення функції:

    <User name={getUserName()} />

---

# 5. Важлива різниця: `"42"` і `{42}`

Це різні типи даних.

    <User age="42" />

Передається:

    "42"

тобто `string`.

А тут:

    <User age={42} />

передається:

    42

тобто `number`.

Те саме стосується boolean:

    <Button disabled="false" />

це string `"false"`.

А:

    <Button disabled={false} />

це boolean `false`.

Тому не потрібно використовувати лапки для JavaScript-значень.

---

# 6. Отримання props

Є два основні способи.

## 6.1. Через `props`

    function User(props) {
      return (
        <div>
          <h2>{props.name}</h2>
          <p>{props.age}</p>
        </div>
      );
    }

Цей варіант добре показує саму структуру props.

---

## 6.2. Через destructuring

У React-коді часто використовують destructuring:

    function User({ name, age }) {
      return (
        <div>
          <h2>{name}</h2>
          <p>{age}</p>
        </div>
      );
    }

Це еквівалентно:

    function User(props) {
      const { name, age } = props;

      return (
        <div>
          <h2>{name}</h2>
          <p>{age}</p>
        </div>
      );
    }

Destructuring зазвичай робить компонент коротшим і читабельнішим.

---

# 7. Props — це об'єкт

Наприклад:

    <User
      name="Valeriy"
      age={56}
      city="Vinnytsia"
    />

Концептуально props виглядають так:

    {
      name: "Valeriy",
      age: 56,
      city: "Vinnytsia"
    }

Тому можна звертатися:

    props.name
    props.age
    props.city

або:

    const { name, age, city } = props;

---

# 8. Типи даних у props

Props можуть містити практично будь-які значення, які можна передати як JavaScript expression.

## 8.1. String

    <User name="Valeriy" />

---

## 8.2. Number

    <User age={56} />

---

## 8.3. Boolean

    <Button disabled={true} />

або коротше:

    <Button disabled />

---

## 8.4. Boolean shorthand

Запис:

    <Button disabled />

означає:

    <Button disabled={true} />

Наприклад:

    function Button({ disabled }) {
      return (
        <button disabled={disabled}>
          Save
        </button>
      );
    }

---

## 8.5. Array

    const skills = ["HTML", "CSS", "JavaScript"];

    <User skills={skills} />

У компоненті:

    function User({ skills }) {
      return (
        <ul>
          {skills.map(skill => (
            <li key={skill}>{skill}</li>
          ))}
        </ul>
      );
    }

Тема `map()` та `key` детальніше розглядається у:

    01-components-and-rendering/05-list-and-keys

---

## 8.6. Object

    const user = {
      name: "Valeriy",
      age: 56
    };

    <User user={user} />

У компоненті:

    function User({ user }) {
      return (
        <div>
          <h2>{user.name}</h2>
          <p>{user.age}</p>
        </div>
      );
    }

---

## 8.7. Function

Функцію також можна передати як prop.

    function App() {
      function handleSave() {
        console.log("Saved");
      }

      return <SaveButton onSave={handleSave} />;
    }

---

# 9. Function props

Передача функцій — один із найважливіших патернів React.

Наприклад:

    function Button({ onClick }) {
      return (
        <button onClick={onClick}>
          Save
        </button>
      );
    }

Батьківський компонент:

    function App() {
      function handleSave() {
        console.log("Saved");
      }

      return <Button onClick={handleSave} />;
    }

Тут:

    onClick={handleSave}

передає **посилання на функцію**.

---

# 10. Не плутати `handleClick` і `handleClick()`

Правильно:

    <button onClick={handleClick}>
      Click
    </button>

Тут функція передається React.

Неправильно для звичайного event handler:

    <button onClick={handleClick()}>
      Click
    </button>

Тут функція викликається під час рендерингу.

Тобто:

    handleClick

означає:

> передати функцію

а:

    handleClick()

означає:

> викликати функцію зараз

---

# 11. Callback props

Функція, яку батьківський компонент передає дочірньому компоненту, часто називається callback.

Наприклад:

    function Child({ onMessage }) {
      return (
        <button onClick={() => onMessage("Hello")}>
          Send message
        </button>
      );
    }

Батьківський компонент:

    function Parent() {
      function handleMessage(message) {
        console.log(message);
      }

      return <Child onMessage={handleMessage} />;
    }

Схема:

    Parent
       │
       │ onMessage={handleMessage}
       ▼
    Child
       │
       │ onMessage("Hello")
       ▼
    Parent callback

Це дозволяє дочірньому компоненту повідомити батьківський компонент про подію.

---

# 12. Props передають дані вниз

Основний напрямок даних у React:

    Parent
       ↓
    Child
       ↓
    Grandchild

Наприклад:

    function App() {
      const userName = "Valeriy";

      return <User name={userName} />;
    }

    function User({ name }) {
      return <Profile name={name} />;
    }

    function Profile({ name }) {
      return <h2>{name}</h2>;
    }

Дані рухаються зверху вниз.

Це називається:

**one-way data flow**

або

**односпрямований потік даних**.

---

# 13. Props не повинні змінюватися компонентом

Props є read-only для компонента, який їх отримує.

Наприклад:

    function User({ name }) {
      // Не робимо так:
      // name = "Other name";

      return <h2>{name}</h2>;
    }

Компонент не повинен змінювати отримані props.

Натомість батьківський компонент може передати нове значення:

    function App() {
      const name = "Valeriy";

      return <User name={name} />;
    }

Якщо дані повинні змінюватися в результаті взаємодії користувача, для цього використовують state.

Тема state розглядається у:

    02-events-state-and-forms

---

# 14. Props і state — різниця

Props:

- приходять від батьківського компонента;
- компонент їх отримує;
- компонент не повинен їх змінювати;
- використовуються для конфігурації та передачі даних.

State:

- належить компоненту;
- може змінюватися;
- зміна state викликає повторний render;
- використовується для даних, які змінюються під час роботи компонента.

Спрощено:

    props → external input

    state → internal component data

Наприклад:

    function User({ name }) {
      const [isOnline, setIsOnline] = useState(false);

      return (
        <div>
          <h2>{name}</h2>
          <p>{isOnline ? "Online" : "Offline"}</p>
        </div>
      );
    }

`name` — prop.

`isOnline` — state.

---

# 15. Default values у props

Можна задати значення за замовчуванням через destructuring.

    function User({ name = "Unknown" }) {
      return <h2>{name}</h2>;
    }

Якщо:

    <User />

то:

    name === "Unknown"

Якщо:

    <User name="Valeriy" />

то:

    name === "Valeriy"

---

# 16. Default values та `null`

Важливо розуміти, що default value спрацьовує, коли значення `undefined`.

Наприклад:

    function User({ name = "Unknown" }) {
      return <h2>{name}</h2>;
    }

При:

    <User />

отримаємо:

    "Unknown"

Але:

    <User name={null} />

передає `null`, тому default value не застосовується.

---

# 17. Props у вигляді об'єкта

Якщо компонент має багато пов'язаних даних, можна передати об'єкт.

    const user = {
      name: "Valeriy",
      age: 56,
      city: "Vinnytsia"
    };

    <User user={user} />

Компонент:

    function User({ user }) {
      return (
        <article>
          <h2>{user.name}</h2>
          <p>Age: {user.age}</p>
          <p>City: {user.city}</p>
        </article>
      );
    }

Але не варто автоматично об'єднувати всі props в один об'єкт.

Наприклад, якщо компонент логічно має:

    <Button
      variant="primary"
      disabled={false}
      onClick={handleClick}
    />

то такі окремі props часто зрозуміліші.

---

# 18. JSX як prop

Props можуть містити не тільки дані, але й JSX.

Наприклад:

    function Card({ title, icon }) {
      return (
        <article>
          <div>{icon}</div>
          <h2>{title}</h2>
        </article>
      );
    }

Батьківський компонент:

    function App() {
      return (
        <Card
          title="Settings"
          icon={<span>⚙️</span>}
        />
      );
    }

Тут:

    icon={<span>⚙️</span>}

передає React element як prop.

---

# 19. `children`

`children` — спеціальний prop.

Він містить те, що знаходиться між відкриваючим і закриваючим тегами компонента.

Наприклад:

    <Card>
      <h2>Hello</h2>
      <p>Some text</p>
    </Card>

У компоненті:

    function Card({ children }) {
      return (
        <article>
          {children}
        </article>
      );
    }

У результаті:

    children

містить переданий JSX.

---

# 20. Чому `children` важливий

`children` дозволяє створювати компоненти-контейнери.

Наприклад:

    function Card({ children }) {
      return (
        <article className="card">
          {children}
        </article>
      );
    }

Тепер можна використовувати один `Card` для різного вмісту:

    <Card>
      <h2>User</h2>
      <p>Information about user.</p>
    </Card>

    <Card>
      <h2>Settings</h2>
      <button>Save</button>
    </Card>

Сам `Card` не знає заздалегідь, що саме буде всередині.

Він відповідає за контейнер.

---

# 21. `children` як React composition

Це один із фундаментальних патернів React.

Замість створення великої кількості спеціалізованих компонентів:

    UserCard
    ProductCard
    SettingsCard
    MessageCard

можна мати універсальний:

    Card

і передавати різний вміст через `children`.

    function Card({ children }) {
      return (
        <article className="card">
          {children}
        </article>
      );
    }

Використання:

    <Card>
      <h2>User</h2>
      <p>Valeriy</p>
    </Card>

    <Card>
      <h2>Settings</h2>
      <button>Save</button>
    </Card>

Це називається:

**composition**

---

# 22. `children` не обов'язково є одним елементом

Можна передати кілька елементів:

    <Card>
      <h2>Title</h2>
      <p>Description</p>
      <button>Open</button>
    </Card>

`children` представляє весь переданий вміст.

Тому компонент:

    function Card({ children }) {
      return <article>{children}</article>;
    }

може відобразити всі ці елементи.

---

# 23. `children` може бути текстом

Наприклад:

    <Button>
      Save
    </Button>

Компонент:

    function Button({ children }) {
      return <button>{children}</button>;
    }

Тут `children` — текст:

    "Save"

---

# 24. `children` може бути JSX

Наприклад:

    <Button>
      <strong>Save</strong>
    </Button>

Тут `children` — React element.

---

# 25. `children` може бути expression

Наприклад:

    function App() {
      const userName = "Valeriy";

      return (
        <Card>
          <h2>{userName}</h2>
        </Card>
      );
    }

Всередині `children` буде JSX, який містить значення `userName`.

---

# 26. Props і `children` разом

Дуже поширений компонент:

    function Card({ title, children }) {
      return (
        <article className="card">
          <h2>{title}</h2>
          <div>{children}</div>
        </article>
      );
    }

Використання:

    <Card title="User information">
      <p>Name: Valeriy</p>
      <p>Age: 56</p>
    </Card>

Тут:

    title

— звичайний prop.

    children

— спеціальний prop для вкладеного JSX.

---

# 27. `children` не обов'язково існує

Компонент може використовуватися без children:

    <Card />

Тоді `children` не буде передано як звичайний вміст.

Наприклад:

    function Card({ children }) {
      return (
        <article>
          {children}
        </article>
      );
    }

Це допустимо.

---

# 28. `ReactNode`

У TypeScript для props, які можуть містити React-вміст, часто використовується тип `ReactNode`.

Наприклад:

    import type { ReactNode } from "react";

    type CardProps = {
      title: string;
      children: ReactNode;
    };

    function Card({ title, children }: CardProps) {
      return (
        <article>
          <h2>{title}</h2>
          {children}
        </article>
      );
    }

`ReactNode` охоплює різні значення, які React може відобразити як children.

Наприклад:

- JSX elements;
- strings;
- numbers;
- `null`;
- `undefined`;
- boolean;
- collections of React nodes.

Для звичайного контейнерного компонента `children: ReactNode` — типовий варіант.

---

# 29. Props у TypeScript

У TypeScript props бажано типізувати.

Наприклад:

    type UserProps = {
      name: string;
      age: number;
    };

    function User({ name, age }: UserProps) {
      return (
        <div>
          <h2>{name}</h2>
          <p>{age}</p>
        </div>
      );
    }

Використання:

    <User
      name="Valeriy"
      age={56}
    />

TypeScript перевіряє типи props.

---

# 30. Не використовувати `any` для props

Не варто робити:

    type UserProps = {
      name: any;
      age: any;
    };

Краще:

    type UserProps = {
      name: string;
      age: number;
    };

Це дає:

- автодоповнення;
- перевірку типів;
- помилки під час розробки;
- зрозумілий API компонента.

---

# 31. Optional props

Prop може бути необов'язковим.

    type UserProps = {
      name: string;
      age?: number;
    };

Тепер допустимі обидва варіанти:

    <User name="Valeriy" />

і:

    <User
      name="Valeriy"
      age={56}
    />

У компоненті можна задати default:

    function User({
      name,
      age = 0
    }: UserProps) {
      return (
        <div>
          <h2>{name}</h2>
          <p>{age}</p>
        </div>
      );
    }

---

# 32. Function props у TypeScript

Функції також потрібно типізувати.

Наприклад:

    type ButtonProps = {
      onClick: () => void;
      children: ReactNode;
    };

    function Button({
      onClick,
      children
    }: ButtonProps) {
      return (
        <button onClick={onClick}>
          {children}
        </button>
      );
    }

---

# 33. Callback з параметром

Наприклад:

    type UserProps = {
      name: string;
      onSelect: (name: string) => void;
    };

    function User({
      name,
      onSelect
    }: UserProps) {
      return (
        <button onClick={() => onSelect(name)}>
          {name}
        </button>
      );
    }

Батьківський компонент:

    function App() {
      function handleSelect(name: string) {
        console.log(name);
      }

      return (
        <User
          name="Valeriy"
          onSelect={handleSelect}
        />
      );
    }

---

# 34. Props для HTML attributes

Власні компоненти часто передають props до звичайних HTML-елементів.

Наприклад:

    function Button({ disabled, children }) {
      return (
        <button disabled={disabled}>
          {children}
        </button>
      );
    }

Це дозволяє створити власну абстракцію над HTML-елементом.

У TypeScript для складніших компонентів можна використовувати типи HTML attributes з React, наприклад:

    import type { ButtonHTMLAttributes } from "react";

    type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

Це вже більш просунутий варіант і потребує розуміння TypeScript та React DOM types.

---

# 35. Spread props

JSX підтримує spread syntax.

Наприклад:

    const buttonProps = {
      disabled: true,
      type: "button"
    };

    <button {...buttonProps}>
      Save
    </button>

Це приблизно означає передачу властивостей:

    <button
      disabled={true}
      type="button"
    >
      Save
    </button>

---

# 36. Spread props для компонентів

Наприклад:

    const userProps = {
      name: "Valeriy",
      age: 56
    };

    <User {...userProps} />

Це зручно, коли props вже знаходяться в об'єкті.

---

# 37. Порядок props зі spread

Порядок має значення.

Наприклад:

    const props = {
      disabled: true
    };

    <Button
      {...props}
      disabled={false}
    />

Останній prop має пріоритет.

Тобто:

    disabled={false}

перезапише значення з:

    {...props}

Навпаки:

    <Button
      disabled={false}
      {...props}
    />

`props.disabled` перезапише попереднє значення.

Тому потрібно уважно стежити за порядком spread props.

---

# 38. Не зловживати spread props

Такий код:

    <Button {...props} />

може бути зручним.

Але:

    <Button {...someHugeObject} />

може зробити API компонента менш зрозумілим.

Краще явно передавати важливі props, коли це робить компонент зрозумілішим:

    <Button
      variant="primary"
      disabled={isSaving}
      onClick={handleSave}
    />

---

# 39. Props та CSS Modules

У Next.js + React + CSS Modules часто передають className як prop.

Наприклад:

    type CardProps = {
      className?: string;
      children: ReactNode;
    };

    function Card({
      className,
      children
    }: CardProps) {
      return (
        <article className={className}>
          {children}
        </article>
      );
    }

Використання:

    import styles from "./Card.module.css";

    <Card className={styles.card}>
      <h2>User</h2>
    </Card>

Це дозволяє компоненту залишатися багаторазовим.

---

# 40. Dynamic props

Props можуть залежати від даних.

    function App() {
      const isActive = true;

      return (
        <Button
          variant={isActive ? "primary" : "secondary"}
        />
      );
    }

Або:

    <User
      name={user.name}
      age={user.age}
    />

JSX expression дозволяє передавати будь-який відповідний JavaScript expression.

---

# 41. Props і conditional rendering

Props часто використовуються для зміни UI.

Наприклад:

    function Status({ isOnline }) {
      return (
        <span>
          {isOnline ? "Online" : "Offline"}
        </span>
      );
    }

Використання:

    <Status isOnline={true} />

або:

    <Status isOnline={user.isOnline} />

Повна тема conditional rendering розглядається окремо:

    01-components-and-rendering/04-conditional-rendering

---

# 42. Props і списки

Props часто використовуються для передачі елементів списку:

    function UserList({ users }) {
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

Батьківський компонент:

    function App() {
      const users = [
        { id: 1, name: "Valeriy" },
        { id: 2, name: "Anna" }
      ];

      return <UserList users={users} />;
    }

Детальніше:

    01-components-and-rendering/05-list-and-keys

---

# 43. Composition через props

`children` — не єдиний спосіб композиції.

Можна передавати JSX через звичайні props.

Наприклад:

    function Layout({
      header,
      sidebar,
      children
    }) {
      return (
        <div>
          <header>{header}</header>

          <aside>{sidebar}</aside>

          <main>{children}</main>
        </div>
      );
    }

Використання:

    <Layout
      header={<Header />}
      sidebar={<Sidebar />}
    >
      <MainContent />
    </Layout>

Це дозволяє створювати гнучкі компоненти-контейнери.

---

# 44. `children` проти звичайного JSX prop

Ці два підходи можуть вирішувати схожі задачі.

Через `children`:

    <Card>
      <User />
    </Card>

Через prop:

    <Card content={<User />} />

У компоненті:

    function Card({ content }) {
      return (
        <article>
          {content}
        </article>
      );
    }

`children` зазвичай природніше читається для основного вкладеного вмісту.

Іменовані JSX props корисні, коли компонент має кілька окремих слотів:

    header
    sidebar
    footer
    actions
    content

---

# 45. Props як API компонента

Компонент можна розглядати як маленький API.

Наприклад:

    type ButtonProps = {
      variant: "primary" | "secondary";
      disabled?: boolean;
      onClick: () => void;
      children: ReactNode;
    };

API компонента:

    <Button
      variant="primary"
      disabled={false}
      onClick={handleSave}
    >
      Save
    </Button>

Чим краще спроєктовані props, тим зрозумілішим буде використання компонента.

---

# 46. Назви props

Назви props повинні описувати їх призначення.

Добре:

    onClick
    onSave
    onDelete
    isActive
    isLoading
    disabled
    title
    children
    items

Гірше:

    data1
    value1
    func
    x
    temp

Особливо для callback props поширений патерн:

    onSomething

Наприклад:

    onSave
    onCancel
    onSelect
    onDelete

---

# 47. Boolean props

Для boolean props часто використовують назви:

    isActive
    isLoading
    isOpen
    isDisabled
    hasError
    disabled
    hidden

Наприклад:

    <Modal isOpen={true} />

або:

    <Modal isOpen={isModalOpen} />

Це робить API компонента зрозумілим.

---

# 48. Event props та custom callback props

Не слід плутати:

    onClick

із:

    onSave

`onClick` часто передає callback для DOM event.

`onSave` — це вже власна подія/інтерфейс компонента.

Наприклад:

    function Form({ onSave }) {
      function handleSubmit(event) {
        event.preventDefault();

        onSave();
      }

      return (
        <form onSubmit={handleSubmit}>
          <button type="submit">
            Save
          </button>
        </form>
      );
    }

Батьківський компонент може вирішити, що робити після збереження.

---

# 49. Props і локальна відповідальність

Хороший компонент зазвичай не повинен знати більше, ніж потрібно.

Наприклад:

    function UserCard({
      name,
      email
    }) {
      return (
        <article>
          <h2>{name}</h2>
          <p>{email}</p>
        </article>
      );
    }

Він не повинен знати:

- звідки прийшов користувач;
- яка база даних використовується;
- який API був викликаний;
- як зберігається користувач.

Йому достатньо отримати потрібні дані через props.

---

# 50. Parent відповідає за дані, Child — за відображення

Типова структура:

    function App() {
      const user = {
        name: "Valeriy",
        email: "example@example.com"
      };

      return (
        <UserCard
          name={user.name}
          email={user.email}
        />
      );
    }

    function UserCard({ name, email }) {
      return (
        <article>
          <h2>{name}</h2>
          <p>{email}</p>
        </article>
      );
    }

Це не жорстке правило для всіх ситуацій, але дуже корисна модель для початку.

---

# 51. Props не створюють двосторонній binding

У React немає автоматичного:

    Parent ↔ Child

Звичайна модель:

    Parent
       ↓
      props
       ↓
    Child

Якщо Child повинен повідомити Parent про щось, Parent передає callback:

    Parent
       ↓
    onSave
       ↓
    Child
       │
       └──────→ onSave(data)
                   ↓
                 Parent

Це одна з основних моделей React.

---

# 52. Підняття стану та props

Якщо два компоненти повинні працювати з одним змінним значенням, state часто піднімають до їхнього спільного батьківського компонента.

Наприклад:

    Parent
    ├── Input
    └── Preview

Батьківський компонент може зберігати state:

    Parent
      │
      ├── value → Input
      │
      └── value → Preview

`Input` повідомляє про зміну через callback:

    onChange

а Parent передає актуальне значення через prop:

    value

Це називається:

**lifting state up**

Ця тема тісно пов'язана з props і state та буде розглядатися детальніше у наступних темах.

---

# 53. Props — це не HTML attributes

У JSX props синтаксично схожі на HTML attributes:

    <input disabled />

Але для React-компонента:

    <User name="Valeriy" />

`name` — це не HTML attribute браузера.

Це prop, який передається компоненту.

Наприклад:

    function User({ name }) {
      return <h2>{name}</h2>;
    }

---

# 54. Props та DOM attributes

Якщо:

    <input disabled />

то `disabled` має значення для DOM.

А:

    <User disabled />

передає prop `disabled` до компонента `User`.

Компонент сам вирішує, що з ним робити:

    function User({ disabled }) {
      return (
        <button disabled={disabled}>
          Save
        </button>
      );
    }

---

# 55. Типова помилка: передача string замість number

Помилка:

    <Product price="100" />

Якщо компонент очікує:

    type ProductProps = {
      price: number;
    };

краще:

    <Product price={100} />

Або:

    <Product price={product.price} />

---

# 56. Типова помилка: передача string замість boolean

Помилка:

    <Button disabled="false" />

Це не boolean `false`.

Це string:

    "false"

Правильно:

    <Button disabled={false} />

або, якщо `false`:

    <Button />

за умови, що компонент обробляє відсутність prop як false.

---

# 57. Типова помилка: виклик callback під час render

Не треба:

    <Button onClick={handleSave()} />

якщо потрібно передати callback.

Зазвичай правильно:

    <Button onClick={handleSave} />

Якщо потрібен аргумент:

    <Button onClick={() => handleSave(user.id)} />

---

# 58. Типова помилка: спроба змінити props

Не треба:

    function User({ name }) {
      name = "Other";

      return <h2>{name}</h2>;
    }

Props не повинні використовуватися як змінні для локального стану.

Якщо потрібна змінна, яка змінюється:

    const [name, setName] = useState("Valeriy");

Це вже state.

---

# 59. Типова помилка: передача всього об'єкта без потреби

Можна:

    <User user={user} />

Але іноді краще:

    <User
      name={user.name}
      email={user.email}
    />

Перший варіант корисний, якщо компонент логічно працює саме з об'єктом `user`.

Другий — якщо компоненту потрібні лише конкретні поля.

Потрібно орієнтуватися на API компонента та його відповідальність.

---

# 60. Типова помилка: надто багато props

Якщо компонент має:

    <UserCard
      name={name}
      age={age}
      email={email}
      city={city}
      country={country}
      avatar={avatar}
      role={role}
      permissions={permissions}
      theme={theme}
      ...
    />

це не автоматично помилка.

Але велика кількість props може бути сигналом, що компонент:

- має занадто багато відповідальностей;
- можна розділити на менші компоненти;
- частину структури можна передати через `children`;
- потрібна інша модель композиції.

---

# 61. Props та композиція компонентів

React заохочує не будувати всю UI-структуру через успадкування класів.

Замість:

    BaseCard
       ↓
    UserCard
       ↓
    AdminUserCard

часто використовують composition:

    Card
      +
    User information
      +
    Actions

Наприклад:

    <Card>
      <UserInfo user={user} />
      <UserActions user={user} />
    </Card>

Це робить компоненти більш незалежними та повторно використовуваними.

---

# 62. Named slots через props

Для складнішого layout можна передати кілька React nodes.

    type LayoutProps = {
      header: ReactNode;
      sidebar: ReactNode;
      children: ReactNode;
    };

    function Layout({
      header,
      sidebar,
      children
    }: LayoutProps) {
      return (
        <div>
          <header>{header}</header>

          <aside>{sidebar}</aside>

          <main>{children}</main>
        </div>
      );
    }

Використання:

    <Layout
      header={<Header />}
      sidebar={<Sidebar />}
    >
      <Dashboard />
    </Layout>

Це схоже на систему "slots".

---

# 63. Передача JSX та передача даних — різні підходи

Можна передати дані:

    <User
      name="Valeriy"
      age={56}
    />

А компонент сам вирішить, як їх відобразити.

Або передати готовий JSX:

    <Card>
      <User
        name="Valeriy"
        age={56}
      />
    </Card>

У першому випадку компонент контролює представлення.

У другому — батьківський компонент передає готову структуру.

Обидва підходи потрібні.

---

# 64. Props як контракт

Корисно думати про props як про контракт компонента.

Наприклад:

    type UserCardProps = {
      name: string;
      email: string;
      onDelete: () => void;
    };

Це означає:

> `UserCard` очікує `name`, `email` та `onDelete`.

Використання:

    <UserCard
      name="Valeriy"
      email="example@example.com"
      onDelete={handleDelete}
    />

TypeScript допомагає перевіряти цей контракт.

---

# 65. Props та повторне використання

Порівняємо.

Без props:

    function UserCard() {
      return (
        <article>
          <h2>Valeriy</h2>
          <p>Developer</p>
        </article>
      );
    }

Компонент фактично прив'язаний до одного користувача.

З props:

    function UserCard({ name, role }) {
      return (
        <article>
          <h2>{name}</h2>
          <p>{role}</p>
        </article>
      );
    }

Тепер:

    <UserCard
      name="Valeriy"
      role="Developer"
    />

    <UserCard
      name="Anna"
      role="Designer"
    />

Один компонент можна використовувати багато разів.

---

# 66. Props та повторний render

Коли батьківський компонент передає дочірньому нові props, дочірній компонент може бути повторно відрендерений.

Наприклад:

    function App() {
      const [name, setName] = useState("Valeriy");

      return (
        <User name={name} />
      );
    }

Коли `name` зміниться, `User` отримує нове значення prop.

Точні правила render, reconciliation та оптимізації розглядаються в інших темах.

---

# 67. JSX children та `false`, `null`, `undefined`

React не відображає як текст деякі значення, якщо вони використовуються як children:

    false
    null
    undefined

Наприклад:

    <div>
      {false}
    </div>

не створює текст:

    false

Це часто використовується для умовного rendering:

    {isVisible && <Panel />}

Якщо:

    isVisible === false

React не відобразить `Panel`.

Увага: це не означає, що будь-яке JavaScript-значення можна безпечно передавати як children.

Наприклад, plain object:

    <div>
      {user}
    </div>

може спричинити помилку, якщо `user` — звичайний об'єкт.

---

# 68. Props і reference types

Якщо передати object або array:

    const user = {
      name: "Valeriy"
    };

    <User user={user} />

компонент отримує посилання на цей об'єкт.

Тому важливо не мутувати props.

Погано:

    function User({ user }) {
      user.name = "Other";

      return <h2>{user.name}</h2>;
    }

Краще створювати нові значення, коли потрібно змінити дані.

Наприклад:

    const updatedUser = {
      ...user,
      name: "Other"
    };

---

# 69. Props та immutable data

React-розробка часто спирається на принцип:

> Не мутуй отримані дані — створюй нові значення.

Наприклад:

    const updatedUser = {
      ...user,
      name: "Anna"
    };

Для масиву:

    const updatedUsers = [
      ...users,
      newUser
    ];

Це особливо важливо при роботі зі state.

---

# 70. Props та `key`

При роботі зі списками:

    users.map(user => (
      <User
        key={user.id}
        name={user.name}
      />
    ))

`key` має спеціальне призначення для React і не передається до компонента як звичайний prop.

Тобто:

    function User(props) {
      console.log(props.key);
    }

не є способом отримати `key`.

Якщо компоненту потрібен цей ідентифікатор, передайте його окремо:

    <User
      key={user.id}
      id={user.id}
      name={user.name}
    />

Тоді:

    function User({ id, name }) {
      // id доступний компоненту
    }

Детальніше про `key`:

    01-components-and-rendering/05-list-and-keys

---

# 71. Props та `ref`

`ref` також має спеціальне значення в React і не слід розглядати його як звичайний prop.

Наприклад:

    <Input ref={inputRef} />

Робота з `ref` буде розглядатися окремо:

    07-refs-and-dom

---

# 72. Різниця між props і variables

Звичайна змінна:

    const name = "Valeriy";

Prop:

    <User name={name} />

У компоненті:

    function User({ name }) {
      // name прийшов через props
    }

Тобто props — це механізм передачі даних між компонентами.

---

# 73. Різниця між props і function arguments

Є корисна аналогія:

    function User({ name }) {
      return <h2>{name}</h2>;
    }

Схоже на:

    function greet({ name }) {
      return `Hello ${name}`;
    }

У React компонент — це функція, а props — її вхідні дані.

Але React має власні правила rendering, lifecycle та reconciliation, тому ця аналогія не пояснює абсолютно все.

---

# 74. Простий приклад: UserCard

    type UserCardProps = {
      name: string;
      role: string;
      isOnline: boolean;
    };

    function UserCard({
      name,
      role,
      isOnline
    }: UserCardProps) {
      return (
        <article>
          <h2>{name}</h2>
          <p>{role}</p>
          <p>
            {isOnline ? "Online" : "Offline"}
          </p>
        </article>
      );
    }

Використання:

    function App() {
      return (
        <UserCard
          name="Valeriy"
          role="Developer"
          isOnline={true}
        />
      );
    }

У цьому прикладі є:

- string props;
- boolean prop;
- destructuring;
- TypeScript type;
- conditional rendering.

---

# 75. Простий приклад: Button

    type ButtonProps = {
      children: ReactNode;
      disabled?: boolean;
      onClick: () => void;
    };

    function Button({
      children,
      disabled = false,
      onClick
    }: ButtonProps) {
      return (
        <button
          disabled={disabled}
          onClick={onClick}
        >
          {children}
        </button>
      );
    }

Використання:

    function App() {
      function handleSave() {
        console.log("Saved");
      }

      return (
        <Button onClick={handleSave}>
          Save
        </Button>
      );
    }

Це вже хороший приклад багаторазового компонента.

---

# 76. Простий приклад: Card

    type CardProps = {
      title: string;
      children: ReactNode;
    };

    function Card({
      title,
      children
    }: CardProps) {
      return (
        <article className="card">
          <h2>{title}</h2>
          <div>
            {children}
          </div>
        </article>
      );
    }

Використання:

    <Card title="User">
      <p>Name: Valeriy</p>
      <p>Role: Developer</p>
    </Card>

Тут добре видно різницю:

    title

— звичайний prop.

    children

— вкладений JSX.

---

# 77. Простий приклад: callback

    type DeleteButtonProps = {
      onDelete: () => void;
    };

    function DeleteButton({
      onDelete
    }: DeleteButtonProps) {
      return (
        <button onClick={onDelete}>
          Delete
        </button>
      );
    }

Батьківський компонент:

    function UserCard() {
      function handleDelete() {
        console.log("Delete user");
      }

      return (
        <DeleteButton
          onDelete={handleDelete}
        />
      );
    }

Child не вирішує сам, що означає "delete".

Він лише викликає callback.

---

# 78. Практична модель Parent → Child

Корисно мислити так:

    Parent
      │
      ├── data
      │
      ├── configuration
      │
      └── callbacks
             │
             ▼
           Child

Наприклад:

    <UserCard
      name={user.name}
      avatar={user.avatar}
      isOnline={user.isOnline}
      onDelete={handleDelete}
    />

Parent передає:

- data;
- configuration;
- event handlers.

Child відповідає за свою UI-частину.

---

# 79. Практична модель `children`

Для `children` корисно думати:

    Container
        │
        │ children
        ▼
    arbitrary content

Наприклад:

    <Card>
      <UserInfo />
    </Card>

або:

    <Card>
      <ProductInfo />
    </Card>

або:

    <Card>
      <button>Save</button>
    </Card>

Один container-компонент може працювати з різним контентом.

---

# 80. Що потрібно пам'ятати

### 1. Props — це вхідні дані компонента

    <User name="Valeriy" />

---

### 2. Props передаються від parent до child

    Parent
       ↓
    Child

---

### 3. Props можна отримувати через `props`

    function User(props) {
      return <h2>{props.name}</h2>;
    }

---

### 4. Або через destructuring

    function User({ name }) {
      return <h2>{name}</h2>;
    }

---

### 5. Props можуть бути різних типів

    string
    number
    boolean
    array
    object
    function
    JSX
    ReactNode

---

### 6. `children` — спеціальний prop

    <Card>
      <User />
    </Card>

---

### 7. Props не повинні мутуватися

Не:

    props.name = "Other";

---

### 8. Callback передається як function reference

    onClick={handleClick}

а не:

    onClick={handleClick()}

---

### 9. `"42"` і `{42}` — різні типи

    "42" → string

    {42} → number

---

### 10. `disabled` і `disabled="false"` — не одне й те саме

    disabled={false}

    disabled="false" // string

---

### 11. Props формують API компонента

Добре спроєктовані props роблять компонент зрозумілим та reusable.

---

# 81. Типові помилки

## Помилка 1 — неправильний тип

    <User age="56" />

коли компонент очікує:

    age: number

Правильно:

    <User age={56} />

---

## Помилка 2 — callback викликається одразу

    onClick={handleClick()}

Зазвичай потрібно:

    onClick={handleClick}

---

## Помилка 3 — mutation props

    props.user.name = "Anna";

Props не слід мутувати.

---

## Помилка 4 — неправильне boolean значення

    disabled="false"

Правильно:

    disabled={false}

---

## Помилка 5 — забутий `children`

Компонент:

    function Card({ title }) {
      return (
        <article>
          <h2>{title}</h2>
        </article>
      );
    }

Використання:

    <Card title="User">
      <p>Content</p>
    </Card>

`<p>` не буде використаний, тому що компонент не рендерить `children`.

Правильно:

    function Card({ title, children }) {
      return (
        <article>
          <h2>{title}</h2>
          {children}
        </article>
      );
    }

---

## Помилка 6 — надто великий props object

Якщо компонент отримує десятки незалежних props, потрібно перевірити, чи не має він занадто великої відповідальності.

---

## Помилка 7 — передача непотрібних даних

Не потрібно передавати компоненту весь великий об'єкт, якщо йому потрібне лише одне значення.

Замість:

    <User user={hugeUserObject} />

іноді краще:

    <User
      name={user.name}
      avatar={user.avatar}
    />

---

# 82. Props vs children

| Механізм | Для чого |
|---|---|
| `title` | конкретне значення |
| `name` | конкретне значення |
| `isActive` | configuration/state information |
| `onSave` | callback |
| `items` | collection/data |
| `icon` | конкретний React node |
| `children` | вкладений content |

---

# 83. Props vs state

| Props | State |
|---|---|
| приходять від parent | належить компоненту |
| read-only для child | може змінюватися |
| зовнішній input | внутрішній стан |
| задають configuration/data | зберігає dynamic data |
| зміна приходить від parent | зміна через state setter |

Спрощена модель:

    props → input

    state → internal data

---

# 84. Props vs children

`children` технічно є частиною props.

Наприклад:

    <Card>
      <p>Hello</p>
    </Card>

можна концептуально уявити як:

    {
      children: <p>Hello</p>
    }

А:

    <Card title="Hello">
      <p>Content</p>
    </Card>

має концептуально:

    {
      title: "Hello",
      children: <p>Content</p>
    }

Тому `children` — не окремий механізм від props.

Це спеціальне ім'я всередині props.

---

# 85. Props та JSX: головна модель

Корисно бачити весь ланцюжок:

    JSX
      ↓
    Component
      ↓
    props
      ↓
    component logic
      ↓
    JSX
      ↓
    UI

Наприклад:

    <User
      name="Valeriy"
      age={56}
    />

    ↓

    function User({ name, age }) {
      return (
        <article>
          <h2>{name}</h2>
          <p>{age}</p>
        </article>
      );
    }

    ↓

    UI

---

# 86. Питання для співбесіди

## Junior

### 1. Що таке props у React?

Props — це вхідні дані, які компонент отримує від батьківського компонента.

---

### 2. Як передати prop?

    <User name="Valeriy" />

---

### 3. Як отримати prop?

    function User({ name }) {
      return <h2>{name}</h2>;
    }

---

### 4. Чи можна змінювати props?

Ні. Компонент не повинен мутувати отримані props.

---

### 5. Що таке `children`?

`children` — спеціальний prop, який містить вміст, переданий між відкриваючим та закриваючим тегами компонента.

---

### 6. Чим відрізняється:

    <User age="56" />

від:

    <User age={56} />

Перше передає string, друге — number.

---

### 7. Як передати callback?

    <Button onSave={handleSave} />

---

### 8. Чим відрізняється:

    onClick={handleClick}

від:

    onClick={handleClick()}

Перше передає функцію, друге викликає її під час render.

---

# 87. Middle

### 1. Що таке one-way data flow?

Дані в React зазвичай передаються від батьківського компонента до дочірнього через props.

---

### 2. Як Child може повідомити Parent про подію?

Parent передає callback через prop.

    <Child onSave={handleSave} />

Child викликає:

    onSave(data);

---

### 3. Що таке composition?

Composition — побудова складніших компонентів шляхом комбінування простіших компонентів, часто через `children` або JSX props.

---

### 4. Навіщо потрібен `children`?

Для створення гнучких компонентів-контейнерів, які не знають наперед, який контент буде всередині.

---

### 5. Що таке spread props?

Передача властивостей об'єкта як окремих props:

    <User {...userProps} />

---

### 6. Чому props не можна мутувати?

React-компонент розглядає props як read-only input. Мутація порушує передбачувану модель односпрямованого потоку даних.

---

### 7. Чому callback передають як prop?

Щоб Child міг повідомити Parent про подію, не знаючи деталей логіки Parent.

---

# 88. Практична вправа №1 — UserCard

Створити компонент:

    UserCard

який отримує:

    name
    age
    role
    isOnline

і відображає:

    Name
    Age
    Role
    Online / Offline

Батьківський компонент повинен передати всі дані через props.

---

# 89. Практична вправа №2 — Button

Створити reusable компонент:

    Button

Props:

    children
    disabled
    onClick

Приклад:

    <Button
      disabled={false}
      onClick={handleSave}
    >
      Save
    </Button>

---

# 90. Практична вправа №3 — Card

Створити:

    Card

з props:

    title
    children

Приклади:

    <Card title="User">
      <p>Valeriy</p>
    </Card>

    <Card title="Settings">
      <button>Save</button>
    </Card>

---

# 91. Практична вправа №4 — callback

Створити:

    UserList

який отримує:

    users
    onSelect

При натисканні на користувача викликати:

    onSelect(user.id)

Батьківський компонент повинен отримати `id`.

---

# 92. Практична вправа №5 — Layout

Створити:

    Layout

з props:

    header
    sidebar
    children

Використання:

    <Layout
      header={<Header />}
      sidebar={<Sidebar />}
    >
      <Dashboard />
    </Layout>

Мета — відпрацювати composition.

---

# 93. Практична вправа №6 — reusable form component

Створити:

    FormField

Props:

    label
    value
    onChange
    placeholder
    disabled

Компонент повинен сам відповідати за HTML-структуру поля, а Parent — за дані та поведінку.

Це буде хорошою підготовкою до теми:

    02-events-state-and-forms

---

# 94. Навчальна модель

Для кожного компонента корисно задавати собі чотири питання:

### 1. Які дані компонент отримує?

Це props.

### 2. Який контент компонент отримує?

Можливо, `children`.

### 3. Які події компонент повинен повідомити Parent?

Це callback props.

### 4. Які дані компонент повинен змінювати сам?

Це потенційно state.

Отримуємо модель:

    DATA
      ↓
    props
      ↓
    COMPONENT
      ↓
    UI

і для подій:

    USER ACTION
      ↓
    CHILD
      ↓
    callback
      ↓
    PARENT

---

# 95. Core

На рівні Core потрібно вміти:

- розуміти props;
- передавати props;
- отримувати props;
- використовувати destructuring;
- розуміти різницю між string та JavaScript expression;
- передавати number;
- передавати boolean;
- передавати array;
- передавати object;
- передавати function;
- використовувати `children`;
- розуміти one-way data flow;
- не мутувати props.

---

# 96. Junior

На рівні Junior потрібно вміти:

- проєктувати props API;
- використовувати TypeScript для props;
- використовувати optional props;
- задавати default values;
- передавати callbacks;
- створювати reusable components;
- використовувати `children`;
- використовувати composition;
- передавати JSX через props;
- використовувати spread props;
- розуміти props vs state;
- розуміти lifting state up;
- розуміти `key` як спеціальне значення React.

---

# 97. Middle

На рівні Middle потрібно розуміти:

- component API design;
- composition patterns;
- compound components;
- render props;
- controlled/uncontrolled components;
- advanced TypeScript props;
- polymorphic components;
- HTML attribute forwarding;
- `children` та `ReactNode`;
- refs;
- context;
- performance implications of props;
- referential equality;
- memoization.

Ці теми виходять за межі базового `props-and-children` і будуть розглядатися окремо.

---

# 98. Міні-шпаргалка

## Передача

    <User name="Valeriy" />

## Number

    <User age={56} />

## Boolean

    <User isActive={true} />

## Boolean shorthand

    <User isActive />

## Variable

    <User name={user.name} />

## Function

    <Button onClick={handleClick} />

## Callback з аргументом

    <Button onClick={() => handleClick(id)} />

## Object

    <User user={user} />

## Array

    <List items={items} />

## JSX prop

    <Card icon={<Icon />} />

## Children

    <Card>
      <User />
    </Card>

## Destructuring

    function User({ name, age }) {
      return <h2>{name}</h2>;
    }

## Default value

    function User({ name = "Unknown" }) {
      return <h2>{name}</h2>;
    }

## TypeScript

    type UserProps = {
      name: string;
      age: number;
    };

    function User({ name, age }: UserProps) {
      return <h2>{name}</h2>;
    }

## ReactNode

    type CardProps = {
      children: ReactNode;
    };

## Spread

    <User {...userProps} />

---

# 99. Головне

Props — це **вхідні дані React-компонента**.

Компонент отримує їх від Parent:

    Parent
       ↓
      props
       ↓
    Child

Props можуть бути:

    string
    number
    boolean
    array
    object
    function
    JSX
    ReactNode

`children` — це спеціальний prop для вкладеного контенту:

    <Card>
      <User />
    </Card>

Callback props дозволяють Child повідомляти Parent про події:

    Parent
       ↓
    onSave
       ↓
    Child
       ↓
    onSave(data)
       ↓
    Parent

Найважливіша концепція:

> **Props передають дані та поведінку від батьківського компонента до дочірнього, а `children` та composition дозволяють будувати гнучкі та повторно використовувані компоненти.**

Для практичної роботи достатньо тримати в голові таку модель:

    Parent
       │
       ├── data
       │
       ├── configuration
       │
       ├── callbacks
       │
       └── children
             │
             ▼
           Child
             │
             ▼
             UI

А коли компонент повинен змінювати власні дані:

    props → зовнішні дані

    state → внутрішні змінні дані

Це фундаментальна модель React, на якій далі будуються:

    Events
    State
    Forms
    Effects
    Hooks
    Context
    Data Fetching
    Component Composition
    React Router
    Testing
    Performance