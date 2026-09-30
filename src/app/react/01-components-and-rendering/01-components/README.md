# 01. Components

React applications are built from components.

**Component** — це незалежна частина UI, яка описує, що React має відобразити.

Компонент зазвичай:

- приймає дані через `props`;
- повертає JSX;
- може містити власний state;
- може використовувати hooks;
- може містити інші компоненти;
- може бути повторно використаний у різних місцях.

Найпростіша модель React:

    Component
        ↓
    JSX
        ↓
    React
        ↓
    DOM

Наприклад:

    function Greeting() {
        return <h1>Hello, React!</h1>;
    }

Компонент `Greeting` описує частину інтерфейсу:

    <h1>Hello, React!</h1>

---

# Ключові поняття

✔ component  
✔ functional component  
✔ component function  
✔ JSX  
✔ element  
✔ React element  
✔ component tree  
✔ component composition  
✔ parent component  
✔ child component  
✔ reusable component  
✔ component instance  
✔ render  
✔ re-render  
✔ props  
✔ state  
✔ pure component  
✔ component naming  
✔ component export  
✔ component import  

---

# Що потрібно пам'ятати

• React application складається з компонентів.

• Компонент — це JavaScript-функція, яка повертає React elements / JSX.

• Назва компонента повинна починатися з великої літери.

• Компонент можна використовувати як JSX element:

    <Greeting />

• Один компонент може використовувати інші компоненти.

• Компонент, який використовує інший компонент, називається parent component.

• Використаний компонент називається child component.

• Компоненти можна вкладати один в один.

• Компоненти дозволяють розбивати великий UI на менші незалежні частини.

• Компоненти можна повторно використовувати.

• Дані зазвичай передаються вниз через `props`.

• Локальні зміни компонента зазвичай зберігаються у `state`.

• React будує component tree.

• Render — це процес, під час якого React викликає компоненти та визначає, який UI має бути відображений.

---

# Що таке Component

Component — це незалежна частина користувацького інтерфейсу.

Наприклад, сторінка може складатися з:

    Header
    Navigation
    Main
        Article
        Sidebar
    Footer

Кожну частину можна представити окремим компонентом.

Наприклад:

    function Header() {
        return <header>Header</header>;
    }

    function Footer() {
        return <footer>Footer</footer>;
    }

    function App() {
        return (
            <>
                <Header />
                <main>Main content</main>
                <Footer />
            </>
        );
    }

---

# Functional Component

У сучасному React компоненти зазвичай створюються як JavaScript-функції.

Наприклад:

    function Welcome() {
        return <h1>Welcome!</h1>;
    }

Це functional component.

Його можна використовувати:

    function App() {
        return (
            <main>
                <Welcome />
            </main>
        );
    }

---

# Component Function

Компонент є JavaScript-функцією.

Наприклад:

    function Welcome() {
        return <h1>Welcome!</h1>;
    }

React може викликати цю функцію під час render.

Концептуально:

    Welcome()
        ↓
    JSX
        ↓
    React elements

Важливо:

    function Welcome() {
        ...
    }

це визначення компонента.

А:

    <Welcome />

це використання компонента в JSX.

---

# Component Naming

Назви React-компонентів повинні починатися з великої літери.

Правильно:

    function Header() {
        return <header>Header</header>;
    }

    function UserProfile() {
        return <div>User profile</div>;
    }

    function ProductCard() {
        return <article>Product</article>;
    }

Неправильно як component:

    function header() {
        return <header>Header</header>;
    }

    function userProfile() {
        return <div>User profile</div>;
    }

React розрізняє:

    <Header />

і:

    <header />

Перше — custom component.

Друге — HTML element.

---

# Uppercase Rule

React використовує capitalization для розрізнення HTML elements та custom components.

Наприклад:

    <div />

означає HTML element.

А:

    <Header />

означає React component.

Тому:

    function Header() {
        return <header>Header</header>;
    }

використовується як:

    <Header />

---

# Component Example

Найпростіший компонент:

    function Button() {
        return <button>Click me</button>;
    }

Використання:

    function App() {
        return (
            <main>
                <Button />
            </main>
        );
    }

---

# Multiple Components

Один файл може містити декілька компонентів.

Наприклад:

    function Header() {
        return <header>Header</header>;
    }

    function Main() {
        return <main>Main</main>;
    }

    function Footer() {
        return <footer>Footer</footer>;
    }

    function App() {
        return (
            <>
                <Header />
                <Main />
                <Footer />
            </>
        );
    }

Але в реальному проєкті компоненти часто розділяють на окремі файли.

---

# Component File

Наприклад:

    src/
    └── app/
        └── react/
            └── 01-components-and-rendering/
                └── 01-components/
                    ├── Header.tsx
                    ├── Footer.tsx
                    └── App.tsx

`Header.tsx`:

    function Header() {
        return <header>Header</header>;
    }

    export default Header;

`Footer.tsx`:

    function Footer() {
        return <footer>Footer</footer>;
    }

    export default Footer;

---

# Export Component

Компонент можна експортувати з файлу.

## Default export

    function Header() {
        return <header>Header</header>;
    }

    export default Header;

Після цього його можна імпортувати:

    import Header from "./Header";

І використовувати:

    <Header />

---

# Named Export

Компонент також можна експортувати як named export.

    export function Header() {
        return <header>Header</header>;
    }

Імпорт:

    import { Header } from "./Header";

Використання:

    <Header />

---

# Default vs Named Export

Default export:

    export default Header;

Імпорт:

    import Header from "./Header";

Named export:

    export { Header };

або:

    export function Header() {
        ...
    }

Імпорт:

    import { Header } from "./Header";

Основна відмінність:

    default export → import без {}
    named export   → import з {}

---

# Component Composition

Composition — це побудова складного UI з менших компонентів.

Наприклад:

    function Header() {
        return <header>Header</header>;
    }

    function Sidebar() {
        return <aside>Sidebar</aside>;
    }

    function Content() {
        return <main>Content</main>;
    }

    function Footer() {
        return <footer>Footer</footer>;
    }

Потім:

    function App() {
        return (
            <>
                <Header />

                <div>
                    <Sidebar />
                    <Content />
                </div>

                <Footer />
            </>
        );
    }

Структура:

    App
    ├── Header
    ├── Sidebar
    ├── Content
    └── Footer

---

# Component Tree

React application можна представити як дерево компонентів.

Наприклад:

    App
    │
    ├── Header
    │   ├── Logo
    │   └── Navigation
    │
    ├── Main
    │   ├── Article
    │   └── Sidebar
    │
    └── Footer

`App` — root / parent component.

`Header`, `Main`, `Footer` — child components.

`Logo` та `Navigation` — children `Header`.

---

# Parent Component

Parent component — компонент, який рендерить інші компоненти.

Наприклад:

    function App() {
        return (
            <main>
                <Header />
            </main>
        );
    }

Тут:

    App → parent
    Header → child

---

# Child Component

Child component — компонент, який використовується всередині іншого компонента.

    function Header() {
        return <header>Header</header>;
    }

    function App() {
        return (
            <main>
                <Header />
            </main>
        );
    }

Тут:

    App
      ↓
    Header

`Header` є child component `App`.

---

# Parent → Child

Типова структура React:

    Parent
       ↓
    Child

Наприклад:

    function UserPage() {
        return <UserProfile />;
    }

    function UserProfile() {
        return <section>User</section>;
    }

Пізніше parent зможе передавати child дані через props:

    <UserProfile name="John" />

Props будуть детально розглядатися у:

    03-props-and-children

---

# Reusable Components

Одна з головних переваг компонентів — повторне використання.

Наприклад:

    function Button() {
        return <button>Click</button>;
    }

Його можна використати декілька разів:

    function App() {
        return (
            <main>
                <Button />
                <Button />
                <Button />
            </main>
        );
    }

Результат:

    Click
    Click
    Click

---

# Reusable UI

Компоненти часто представляють повторювані UI patterns.

Наприклад:

    Button
    Card
    Input
    Modal
    Header
    Footer
    Navigation
    Avatar
    UserCard
    ProductCard

Замість копіювання HTML:

    <button>Save</button>
    <button>Save</button>
    <button>Save</button>

можна створити:

    function Button() {
        return <button>Save</button>;
    }

і використовувати:

    <Button />
    <Button />
    <Button />

---

# Component with HTML

Компонент може повертати HTML-подібний JSX.

    function Card() {
        return (
            <article>
                <h2>React</h2>
                <p>Learn components.</p>
            </article>
        );
    }

---

# Component with Variables

Компонент може використовувати JavaScript variables.

    function User() {
        const name = "John";

        return (
            <section>
                <h2>{name}</h2>
            </section>
        );
    }

JS expression у JSX записується через:

    { }

Наприклад:

    const name = "John";

    return <h1>Hello, {name}</h1>;

Результат:

    Hello, John

JSX буде детально розглядатися у:

    02-jsx

---

# Component with Functions

Компонент може містити звичайні JavaScript functions.

    function User() {
        const getName = () => {
            return "John";
        };

        return <h2>{getName()}</h2>;
    }

Але компоненти не повинні без необхідності містити надмірну кількість логіки.

Краще розділяти відповідальність між компонентами та функціями.

---

# Component Return

Компонент повинен повертати React-compatible UI.

Наприклад:

    function Greeting() {
        return <h1>Hello</h1>;
    }

Можна повернути один element:

    return <h1>Hello</h1>;

Або fragment:

    return (
        <>
            <h1>Hello</h1>
            <p>Welcome!</p>
        </>
    );

---

# One Root Element

У JSX не можна просто повернути декілька sibling elements без спільного parent.

❌ Неправильно:

    function App() {
        return (
            <h1>Hello</h1>
            <p>Welcome</p>
        );
    }

Потрібен спільний wrapper.

Наприклад:

    function App() {
        return (
            <div>
                <h1>Hello</h1>
                <p>Welcome</p>
            </div>
        );
    }

Або Fragment:

    function App() {
        return (
            <>
                <h1>Hello</h1>
                <p>Welcome</p>
            </>
        );
    }

---

# Fragment

Fragment дозволяє групувати elements без додавання зайвого DOM element.

Короткий syntax:

    <>
        <Header />
        <Main />
        <Footer />
    </>

Повний syntax:

    <React.Fragment>
        <Header />
        <Main />
        <Footer />
    </React.Fragment>

Fragment особливо корисний, коли додатковий `<div>` не потрібен.

---

# Component as JSX

Компонент використовується як JSX element:

    <Header />

Компонент може мати children:

    <Layout>
        <Main />
    </Layout>

Може мати props:

    <User name="John" />

Ці теми будуть детальніше розглядатися пізніше.

---

# Component vs HTML Element

HTML element:

    <button>Save</button>

React component:

    <Button />

Наприклад:

    function Button() {
        return <button>Save</button>;
    }

React component:

    <Button />

всередині повертає:

    <button>Save</button>

Тобто component може бути abstraction над HTML elements.

---

# Component Abstraction

Компонент дозволяє приховати внутрішню структуру UI.

Наприклад:

    function UserCard() {
        return (
            <article>
                <img src="/user.jpg" alt="User" />
                <h2>John</h2>
                <p>Developer</p>
            </article>
        );
    }

В іншому місці не потрібно повторювати всю структуру:

    <UserCard />

Це abstraction.

---

# Component Responsibility

Хороший компонент зазвичай має зрозумілу відповідальність.

Наприклад:

    Header
        → верхня частина сторінки

    Navigation
        → навігація

    UserCard
        → відображення інформації користувача

    ProductCard
        → відображення товару

Необов'язково робити компонент для кожного HTML element.

❌ Надмірне дроблення:

    function UserName() {
        return <span>John</span>;
    }

    function UserAge() {
        return <span>25</span>;
    }

    function UserCity() {
        return <span>Kyiv</span>;
    }

Іноді краще:

    function UserCard() {
        return (
            <article>
                <h2>John</h2>
                <p>25</p>
                <p>Kyiv</p>
            </article>
        );
    }

Рівень component abstraction повинен відповідати задачі.

---

# Small Components

Малі компоненти легше:

- читати;
- тестувати;
- перевикористовувати;
- змінювати;
- підтримувати.

Наприклад:

    function UserCard() {
        return (
            <article>
                <Avatar />
                <UserInfo />
                <UserActions />
            </article>
        );
    }

Тоді кожна частина має окрему відповідальність.

---

# Too Large Component

Великий компонент може містити:

    Header
    Navigation
    Sidebar
    Form
    List
    Footer
    complex logic
    API logic

Наприклад:

    function App() {
        // hundreds of lines
    }

Такий компонент може бути складним для підтримки.

Його можна розділити:

    App
    ├── Header
    ├── Navigation
    ├── Sidebar
    ├── Form
    ├── List
    └── Footer

---

# Component Reuse

Повторне використання може бути як у межах однієї сторінки:

    <Button />
    <Button />
    <Button />

так і в різних частинах application:

    HomePage
    └── Button

    LoginPage
    └── Button

    ProfilePage
    └── Button

Один component може використовуватися в багатьох місцях.

---

# Component Data

Компоненти часто потребують даних.

Наприклад:

    function UserCard() {
        return (
            <article>
                <h2>John</h2>
            </article>
        );
    }

Якщо потрібно показати різних users, не потрібно створювати окремий component для кожного.

Можна передавати дані через props:

    <UserCard name="John" />

    <UserCard name="Anna" />

    <UserCard name="Peter" />

Props будуть розглянуті у:

    03-props-and-children

---

# Component State

Компонент може мати власний state.

Наприклад, counter:

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

State дозволяє компоненту зберігати дані, які можуть змінюватися.

State та events будуть детально розглядатися у:

    02-events-state-and-forms

---

# Component Purity

React components бажано писати як pure functions.

Ідея:

    same input
        ↓
    same output

Наприклад:

    function Greeting({ name }) {
        return <h1>Hello, {name}</h1>;
    }

Якщо:

    name = "John"

результат:

    Hello, John

Якщо:

    name = "Anna"

результат:

    Hello, Anna

Компонент не повинен без необхідності змінювати зовнішні дані під час render.

---

# Render

Render — це процес, під час якого React визначає, що потрібно показати в UI.

Наприклад:

    function Greeting() {
        return <h1>Hello</h1>;
    }

Під час render React використовує результат компонента для побудови UI.

Спрощена модель:

    Component
        ↓
    JSX
        ↓
    React elements
        ↓
    DOM

---

# Initial Render

Коли React application запускається, відбувається initial render.

Наприклад:

    function App() {
        return <h1>Hello React</h1>;
    }

React відображає результат у DOM.

Типовий entry point:

    import { createRoot } from "react-dom/client";
    import App from "./App";

    const root = createRoot(document.getElementById("root"));

    root.render(<App />);

`root.render()` запускає render React application.

---

# Root Component

Root component — верхній компонент application tree.

Наприклад:

    function App() {
        return (
            <main>
                <Header />
                <Content />
                <Footer />
            </main>
        );
    }

Тут:

    App
    ├── Header
    ├── Content
    └── Footer

`App` є root component.

У великих application root component може бути entry point для всього UI tree.

---

# Component Tree Example

Наприклад, церковний сайт:

    App
    │
    ├── Header
    │   ├── Logo
    │   └── Navigation
    │
    ├── Main
    │   ├── Hero
    │   ├── Schedule
    │   │   └── ServiceItem
    │   └── News
    │       └── NewsCard
    │
    └── Footer

Це component tree.

Кожен component відповідає за певну частину UI.

---

# Component Hierarchy

Ієрархія компонентів може виглядати так:

    App
      ↓
    Layout
      ↓
    Main
      ↓
    UserPage
      ↓
    UserCard
      ↓
    Avatar

Дані зазвичай рухаються вниз по component tree через props.

Наприклад:

    App
      ↓ props
    UserPage
      ↓ props
    UserCard
      ↓ props
    Avatar

---

# Composition

Composition — один із фундаментальних підходів React.

Замість створення одного великого компонента:

    function Page() {
        // very large component
    }

UI розбивається:

    function Page() {
        return (
            <>
                <Header />
                <Main />
                <Footer />
            </>
        );
    }

React компоненти комбінуються один з одним.

---

# Component Composition Example

    function Header() {
        return <header>Header</header>;
    }

    function Content() {
        return <main>Content</main>;
    }

    function Footer() {
        return <footer>Footer</footer>;
    }

    function App() {
        return (
            <>
                <Header />
                <Content />
                <Footer />
            </>
        );
    }

Структура:

    App
    ├── Header
    ├── Content
    └── Footer

---

# Component Reusability Example

    function Button() {
        return <button>Save</button>;
    }

Можна використати:

    function Form() {
        return (
            <form>
                <Button />
            </form>
        );
    }

І:

    function Toolbar() {
        return (
            <div>
                <Button />
            </div>
        );
    }

Один component використовується в різних місцях.

---

# Component with Props Preview

Props — дані, які parent передає child component.

Наприклад:

    function Greeting({ name }) {
        return <h1>Hello, {name}</h1>;
    }

Parent:

    function App() {
        return <Greeting name="John" />;
    }

Результат:

    Hello, John

Детально:

    03-props-and-children

---

# Component with Children Preview

Компонент може отримувати вкладений content через `children`.

Наприклад:

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

Використання:

    <Card>
        <h2>React</h2>
        <p>Learning components.</p>
    </Card>

Тут:

    Card
      ↓
    children
      ↓
    h2 + p

Детально `children` буде розглядатися у:

    03-props-and-children

---

# Component with Conditional Rendering Preview

Компонент може відображати різний UI залежно від даних.

Наприклад:

    function Status({ isOnline }) {
        if (isOnline) {
            return <p>Online</p>;
        }

        return <p>Offline</p>;
    }

Або:

    function Status({ isOnline }) {
        return (
            <p>
                {isOnline ? "Online" : "Offline"}
            </p>
        );
    }

Conditional rendering буде детально розглядатися у:

    04-conditional-rendering

---

# Component with List Preview

Компонент може відображати список.

Наприклад:

    function Fruits() {
        const fruits = ["Apple", "Banana", "Orange"];

        return (
            <ul>
                {fruits.map((fruit) => (
                    <li key={fruit}>
                        {fruit}
                    </li>
                ))}
            </ul>
        );
    }

Lists та `key` будуть детально розглядатися у:

    05-list-and-keys

---

# Component Styling Preview

Компоненти можна стилізувати різними способами.

Наприклад:

    function Button() {
        return (
            <button className="button">
                Save
            </button>
        );
    }

Або CSS Modules:

    import styles from "./Button.module.css";

    function Button() {
        return (
            <button className={styles.button}>
                Save
            </button>
        );
    }

Styling буде детально розглядатися у:

    06-styling

---

# Component Lifecycle Preview

Компоненти проходять різні етапи існування:

    mount
      ↓
    update
      ↓
    unmount

У сучасному React ці процеси особливо важливі при роботі з effects.

Детально:

    03-component-lifecycle-and-effects

---

# Component State Preview

State дозволяє компоненту зберігати змінювані дані.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

Зміна state може спричинити re-render компонента.

Детально:

    02-events-state-and-forms

---

# Re-render

Re-render — повторний render компонента.

Наприклад, якщо component має state:

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

Після:

    setCount(count + 1)

React оновлює state і component може бути виконаний знову для визначення нового UI.

Спрощено:

    state change
        ↓
    render
        ↓
    new React elements
        ↓
    React updates DOM

Важливо:

    re-render ≠ повне перезавантаження сторінки

React не перезавантажує всю browser page.

---

# Render vs DOM Update

Render компонента не означає автоматично повне оновлення DOM.

Спрощено:

    Component render
          ↓
    React elements
          ↓
    React compares result
          ↓
    necessary DOM updates

React намагається оновити лише необхідні частини DOM.

---

# Component Function Should Not Be Called Directly

Як правило, компонент використовується через JSX:

    <UserCard />

а не:

    UserCard()

Правильно:

    function App() {
        return <UserCard />;
    }

Не слід вручну викликати component function для звичайного render flow:

    function App() {
        return UserCard();
    }

JSX дозволяє React керувати component rendering та його життєвим циклом.

---

# Component Props Are Read-Only

Props передаються component ззовні.

Наприклад:

    function User({ name }) {
        return <h2>{name}</h2>;
    }

Не потрібно змінювати props:

    function User({ name }) {
        name = "Another name";

        return <h2>{name}</h2>;
    }

Props слід розглядати як read-only input.

Якщо компоненту потрібно змінювати дані, для цього використовується state або зміна даних на рівні owner component.

---

# Component Input and Output

Корисна mental model:

    props
      ↓
    Component
      ↓
    JSX / UI

Наприклад:

    name = "John"
      ↓
    Greeting
      ↓
    <h1>Hello, John</h1>

Компонент можна розглядати як функцію:

    input → output

Наприклад:

    User data
       ↓
    UserCard
       ↓
    UI

---

# Component as Function

Спрощена модель:

    function Greeting({ name }) {
        return <h1>Hello, {name}</h1>;
    }

Можна думати:

    Greeting(name)
        ↓
    UI

Але React-компонент має спеціальні правила render та взаємодії з React.

Тому component не слід розглядати лише як звичайну функцію JavaScript.

---

# Component Boundaries

Компоненти створюють межі відповідальності.

Наприклад:

    App
    │
    ├── Header
    │
    ├── UserPage
    │   ├── UserInfo
    │   └── UserPosts
    │
    └── Footer

Кожен component відповідає за свою частину UI.

Це допомагає:

    organize
    reuse
    test
    maintain
    refactor

application.

---

# When to Create a Component

Компонент часто варто створити, якщо:

- UI частина повторюється;
- UI частина має власну логіку;
- UI частина має власний state;
- частина UI має чітку відповідальність;
- component стає занадто великим;
- частину UI потрібно перевикористати;
- component потрібно окремо тестувати.

Наприклад:

    ProductCard
    UserCard
    SearchForm
    Navigation
    Modal

---

# When Not to Create a Component

Не потрібно автоматично створювати компонент для кожного маленького element.

Наприклад:

    function Title() {
        return <h1>Products</h1>;
    }

може бути зайвим, якщо title ніде не повторюється і не має власної логіки.

Іноді достатньо:

    function ProductsPage() {
        return (
            <main>
                <h1>Products</h1>
            </main>
        );
    }

Основна мета — зрозуміла структура, а не максимальна кількість компонентів.

---

# Component Organization

У невеликому проєкті можна мати:

    components/
    ├── Button.tsx
    ├── Header.tsx
    ├── Footer.tsx
    └── UserCard.tsx

У більших проєктах компоненти можуть групуватися за feature:

    components/
    ├── ui/
    │   ├── Button.tsx
    │   ├── Input.tsx
    │   └── Modal.tsx
    │
    └── user/
        ├── UserCard.tsx
        ├── UserAvatar.tsx
        └── UserInfo.tsx

Організація залежить від розміру application.

---

# Component Naming Patterns

Типові назви:

    Header
    Footer
    Navigation
    Sidebar
    Button
    Input
    Modal
    Card
    UserCard
    ProductCard
    UserProfile
    ProductList
    SearchForm

Назва повинна описувати роль компонента.

---

# PascalCase

React components зазвичай називаються у PascalCase:

    UserCard
    ProductList
    SearchForm
    MainHeader

Не:

    userCard
    productList
    searchForm

---

# Component and TypeScript

У TypeScript React components часто мають `.tsx` extension.

Наприклад:

    UserCard.tsx

Простий component:

    function UserCard() {
        return (
            <article>
                <h2>User</h2>
            </article>
        );
    }

    export default UserCard;

Props можна типізувати:

    type UserCardProps = {
        name: string;
        age: number;
    };

    function UserCard({
        name,
        age
    }: UserCardProps) {
        return (
            <article>
                <h2>{name}</h2>
                <p>{age}</p>
            </article>
        );
    }

Це буде детальніше розглядатися у:

    03-props-and-children

---

# Component and CSS

Component може мати окремий stylesheet.

Наприклад:

    Button.tsx
    Button.module.css

`Button.tsx`:

    import styles from "./Button.module.css";

    function Button() {
        return (
            <button className={styles.button}>
                Save
            </button>
        );
    }

    export default Button;

`Button.module.css`:

    .button {
        padding: 8px 16px;
    }

Це буде детальніше розглядатися у:

    06-styling

---

# Component and File Naming

Зазвичай файл компонента називають так само, як компонент:

    UserCard.tsx
    ProductCard.tsx
    Header.tsx
    Footer.tsx

Наприклад:

    UserCard.tsx

містить:

    function UserCard() {
        ...
    }

Це спрощує navigation по проєкту.

---

# Component Import

Наприклад, є:

    components/
    ├── Header.tsx
    └── Footer.tsx

`Header.tsx`:

    function Header() {
        return <header>Header</header>;
    }

    export default Header;

`App.tsx`:

    import Header from "./components/Header";

    function App() {
        return (
            <main>
                <Header />
            </main>
        );
    }

---

# Component Dependencies

Компонент може залежати від інших компонентів.

Наприклад:

    App
      ↓
    Layout
      ↓
    Header

`Layout` імпортує `Header`:

    import Header from "./Header";

    function Layout() {
        return (
            <>
                <Header />
                <main>Content</main>
            </>
        );
    }

Так формується component tree.

---

# Deep Component Tree

Не варто без необхідності створювати надмірно глибоке дерево:

    App
      ↓
    Layout
      ↓
    Page
      ↓
    Section
      ↓
    Content
      ↓
    Card
      ↓
    Header
      ↓
    Title

Глибина сама по собі не є помилкою.

Але якщо компоненти не мають власної відповідальності, дерево може стати складнішим без користі.

---

# Component and Data Flow

Типовий напрямок data flow:

    Parent
       ↓
    Child
       ↓
    Grandchild

Наприклад:

    App
       ↓ props
    UserPage
       ↓ props
    UserCard

React традиційно використовує one-way data flow.

Тобто дані передаються зверху вниз через component tree.

---

# One-Way Data Flow

Спрощено:

    Parent
       ↓
    Child
       ↓
    Grandchild

Props рухаються:

    top → down

Наприклад:

    function App() {
        const user = {
            name: "John"
        };

        return <UserCard user={user} />;
    }

    function UserCard({ user }) {
        return <h2>{user.name}</h2>;
    }

---

# Component Ownership

Корисне поняття — ownership даних.

Якщо кілька components повинні використовувати одні й ті самі дані, часто state розташовують у найближчому спільному parent.

Наприклад:

    App
    ├── Search
    └── Results

Якщо `Search` та `Results` повинні використовувати одні й ті самі дані, їх спільний parent:

    App

може володіти state і передавати необхідні дані вниз.

Це буде детальніше розглядатися при вивченні state.

---

# Component Composition vs Copy-Paste

❌ Copy-paste:

    function PageA() {
        return (
            <button className="button">
                Save
            </button>
        );
    }

    function PageB() {
        return (
            <button className="button">
                Save
            </button>
        );
    }

Краще створити:

    function Button() {
        return (
            <button className="button">
                Save
            </button>
        );
    }

і:

    <Button />

---

# Components Are Not HTML Templates

React component — не просто HTML template.

Компонент може містити:

    JSX
    JavaScript logic
    props
    state
    event handlers
    hooks
    conditional rendering
    lists
    effects

Наприклад:

    function UserCard({ user }) {
        const isActive = user.status === "active";

        return (
            <article>
                <h2>{user.name}</h2>

                {isActive && (
                    <span>Active</span>
                )}
            </article>
        );
    }

---

# Component Render Should Be Predictable

Під час render component бажано:

- не виконувати випадкові side effects;
- не змінювати зовнішні дані;
- не змінювати props;
- повертати UI на основі inputs.

Наприклад, не варто змінювати зовнішній об'єкт:

    const user = {
        name: "John"
    };

    function User() {
        user.name = "Anna";

        return <h2>{user.name}</h2>;
    }

Side effects повинні виконуватися у відповідних механізмах React, наприклад effects.

---

# Side Effect Preview

Side effect — дія, яка виходить за межі простого обчислення UI.

Наприклад:

    API request
    timer
    subscription
    DOM manipulation
    changing external data

Не варто виконувати такі дії безпосередньо під час звичайного render.

Для effects React має:

    useEffect()

Це буде детально розглядатися у:

    03-component-lifecycle-and-effects

---

# React Component Mental Model

Корисна базова модель:

    DATA
      ↓
    COMPONENT
      ↓
    JSX
      ↓
    REACT ELEMENTS
      ↓
    UI

Для більш складного component:

    props
      ↓
    state
      ↓
    component
      ↓
    JSX
      ↓
    React
      ↓
    DOM

---

# Component Development Pattern

Практичний процес створення component:

    1. Визначити відповідальність
    2. Створити component
    3. Повернути базовий JSX
    4. Додати props
    5. Додати state за необхідності
    6. Додати events
    7. Додати conditional rendering
    8. Додати lists
    9. Додати styling
    10. Винести component, якщо він стає великим

---

# Simple Component

    function Greeting() {
        return <h1>Hello!</h1>;
    }

---

# Component with Variable

    function Greeting() {
        const name = "John";

        return <h1>Hello, {name}!</h1>;
    }

---

# Component with Props

    type GreetingProps = {
        name: string;
    };

    function Greeting({ name }: GreetingProps) {
        return <h1>Hello, {name}!</h1>;
    }

Використання:

    <Greeting name="John" />

---

# Component with Children

    type CardProps = {
        children: React.ReactNode;
    };

    function Card({ children }: CardProps) {
        return (
            <article>
                {children}
            </article>
        );
    }

Використання:

    <Card>
        <h2>React</h2>
        <p>Components</p>
    </Card>

---

# Component Composition Example

    function Header() {
        return <header>Header</header>;
    }

    function Sidebar() {
        return <aside>Sidebar</aside>;
    }

    function Content() {
        return <main>Content</main>;
    }

    function Footer() {
        return <footer>Footer</footer>;
    }

    function App() {
        return (
            <>
                <Header />

                <div>
                    <Sidebar />
                    <Content />
                </div>

                <Footer />
            </>
        );
    }

Component tree:

    App
    ├── Header
    ├── Sidebar
    ├── Content
    └── Footer

---

# Practical Example — User Card

    type UserCardProps = {
        name: string;
        role: string;
    };

    function UserCard({
        name,
        role
    }: UserCardProps) {
        return (
            <article>
                <h2>{name}</h2>
                <p>{role}</p>
            </article>
        );
    }

Використання:

    function App() {
        return (
            <main>
                <UserCard
                    name="John"
                    role="Developer"
                />

                <UserCard
                    name="Anna"
                    role="Designer"
                />
            </main>
        );
    }

---

# Practical Example — Page Composition

    function Header() {
        return <header>My Website</header>;
    }

    function Main() {
        return (
            <main>
                <h1>Welcome</h1>
                <p>Content</p>
            </main>
        );
    }

    function Footer() {
        return <footer>© 2026</footer>;
    }

    function App() {
        return (
            <>
                <Header />
                <Main />
                <Footer />
            </>
        );
    }

---

# Practical Example — Nested Components

    function Avatar() {
        return (
            <img
                src="/avatar.jpg"
                alt="User"
            />
        );
    }

    function UserInfo() {
        return (
            <section>
                <h2>John</h2>
                <p>Developer</p>
            </section>
        );
    }

    function UserCard() {
        return (
            <article>
                <Avatar />
                <UserInfo />
            </article>
        );
    }

    function App() {
        return <UserCard />;
    }

Tree:

    App
      ↓
    UserCard
      ├── Avatar
      └── UserInfo

---

# Typical Mistakes

❌ Component name starts with lowercase.

    function userCard() {
        return <div>User</div>;
    }

Правильно:

    function UserCard() {
        return <div>User</div>;
    }

---

❌ Не експортувати component, коли він потрібен в іншому файлі.

    function Header() {
        return <header>Header</header>;
    }

Потрібно:

    export default Header;

---

❌ Неправильний import default export.

Якщо:

    export default Header;

правильно:

    import Header from "./Header";

---

❌ Неправильний import named export.

Якщо:

    export function Header() {
        return <header>Header</header>;
    }

правильно:

    import { Header } from "./Header";

---

❌ Повернення декількох sibling elements без wrapper.

    return (
        <h1>Hello</h1>
        <p>World</p>
    );

Потрібен wrapper або Fragment:

    return (
        <>
            <h1>Hello</h1>
            <p>World</p>
        </>
    );

---

❌ Створення component для кожного маленького element без необхідності.

Не кожен:

    <div>
    <span>
    <h2>
    <p>

повинен бути окремим component.

---

❌ Один component містить надто багато відповідальностей.

Наприклад:

    Header
    Form
    API
    List
    Modal
    Footer

усередині одного величезного component.

Краще розділити UI на логічні частини.

---

❌ Зміна props.

Props є input component і повинні розглядатися як read-only.

---

❌ Side effects під час render.

Не варто безпосередньо в render:

    fetch(...)
    setTimeout(...)
    змінювати DOM
    змінювати external variables

для звичайної component logic.

---

❌ Викликати component function вручну.

Не:

    UserCard()

Зазвичай:

    <UserCard />

---

❌ Плутати component та element.

Component:

    function Button() {
        return <button>Save</button>;
    }

Element:

    <Button />

HTML element:

    <button>Save</button>

---

# Component vs Function

Не кожна функція в React є component.

Component:

    function UserCard() {
        return <article>User</article>;
    }

Utility function:

    function formatName(name: string) {
        return name.toUpperCase();
    }

Component повертає UI.

Utility function виконує звичайну JavaScript logic.

---

# Component vs React Element

Component:

    function Header() {
        return <header>Header</header>;
    }

React element:

    <Header />

І:

    <header>Header</header>

Також є React element.

Спрощено:

    Component
        ↓
    returns
        ↓
    React elements

---

# Component vs DOM Element

React component:

    function Button() {
        return <button>Save</button>;
    }

DOM element:

    <button>Save</button>

Component є abstraction, яка може складатися з одного або багатьох elements та інших components.

---

# Component Tree and DOM Tree

Component tree:

    App
    ├── Header
    ├── Main
    │   ├── UserCard
    │   └── Sidebar
    └── Footer

DOM tree може виглядати інакше:

    body
    ├── header
    ├── main
    │   ├── article
    │   └── aside
    └── footer

Component tree описує React components.

DOM tree описує фактичні DOM nodes.

Ці дерева пов'язані, але не є одним і тим самим.

---

# Component Render Flow

Спрощена модель:

    Application starts
          ↓
    root.render(<App />)
          ↓
    App renders
          ↓
    child components render
          ↓
    React creates/reconciles element tree
          ↓
    DOM is updated

При state/props changes:

    state / props change
          ↓
    render
          ↓
    React compares result
          ↓
    necessary DOM updates

---

# Important Mental Model

Не думай про React як:

    "Я змінюю DOM вручну"

React-підхід:

    "Я описую, яким повинен бути UI
     для поточного стану даних"

Наприклад:

    count = 0
        ↓
    <button>0</button>

Після зміни:

    count = 1
        ↓
    <button>1</button>

React відповідає за оновлення DOM.

---

# Declarative UI

React є declarative UI library.

Imperative підхід:

    знайти button
    змінити textContent
    додати class
    приховати element
    показати element

Declarative підхід:

    описати UI для поточного state.

Наприклад:

    function Counter({ count }) {
        return <button>{count}</button>;
    }

Компонент описує:

    UI = f(data)

Спрощена модель:

    UI = function(data)

---

# Components and Declarative Programming

Компонент описує:

    що повинно бути показано

а не покроково:

    як вручну змінити DOM.

Наприклад:

    function Status({ isOnline }) {
        return (
            <p>
                {isOnline ? "Online" : "Offline"}
            </p>
        );
    }

Замість imperative DOM manipulation React отримує опис UI.

---

# Component Design Principles

При створенні component корисно запитати:

    1. Яка його відповідальність?
    2. Які дані йому потрібні?
    3. Чи потрібні props?
    4. Чи потрібен state?
    5. Чи буде він перевикористовуватися?
    6. Чи не занадто він великий?
    7. Чи не занадто він маленький?
    8. Чи має він side effects?
    9. Чи зрозуміла його назва?
    10. Чи легко його тестувати?

---

# Practical Component Checklist

Перед завершенням component перевір:

    □ Назва починається з великої літери.

    □ Component повертає valid JSX.

    □ Component має зрозумілу відповідальність.

    □ Props не змінюються.

    □ Не виконується непотрібний side effect під час render.

    □ Повторюваний UI винесений у component.

    □ Component не став надмірно великим.

    □ Component можна легко прочитати.

    □ Якщо component потрібен в іншому файлі —
      він правильно exported.

    □ Import відповідає типу export.

---

# Питання зі співбесіди

Що таке React component?

Що таке functional component?

Як створити component у React?

Чому назва React component повинна починатися з великої літери?

Що таке component tree?

Що таке parent component?

Що таке child component?

Що таке component composition?

Що таке reusable component?

Що таке JSX?

Що повертає React component?

Що таке render?

Що таке re-render?

Що таке root component?

Чим React component відрізняється від HTML element?

Чим component відрізняється від звичайної JavaScript function?

Що таке props?

Для чого використовуються props?

Чи можна змінювати props?

Що таке state?

Чим props відрізняються від state?

Що таке one-way data flow?

Як дані передаються від parent до child?

Що таке `children`?

Що таке Fragment?

Навіщо використовувати `<>...</>`?

Чим default export відрізняється від named export?

Як імпортувати default export?

Як імпортувати named export?

Коли варто створювати окремий component?

Коли не варто створювати окремий component?

Що означає component reusability?

Що таке component responsibility?

Чому великий component часто варто розділити?

Чим component tree відрізняється від DOM tree?

Чому не варто викликати component function вручну?

Що таке declarative UI?

Що означає pure component?

Що таке side effect?

Чому side effects не повинні виконуватися безпосередньо під час render?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке React component.

Functional components.

Component function.

Component naming.

PascalCase.

JSX як UI description.

Component return.

Component composition.

Parent / child components.

Component tree.

Root component.

Reusable components.

Component import / export.

Default export.

Named export.

Основи render.

Основи re-render.

Fragment.

Props — базове розуміння.

State — базове розуміння.

One-way data flow.

Declarative UI.

Component responsibility.

---

## 🔵 Junior

Впевнене створення functional components.

Розбиття UI на components.

Component composition.

Component tree.

Parent / child relationships.

Reusable components.

Props.

`children`.

TypeScript props.

Component interfaces / types.

Default та named exports.

Component organization.

Component styling.

Conditional rendering.

Rendering lists.

`key`.

Основи state.

Основи events.

Розуміння render та re-render.

Розуміння one-way data flow.

Розуміння component purity.

Вибір правильного рівня component abstraction.

Розуміння, коли component занадто великий.

Розуміння, коли component надмірно маленький.

---

## 🟠 Middle

Advanced component composition.

Composition patterns.

Reusable component APIs.

Compound components.

Render props.

Higher-order components.

Controlled / uncontrolled components.

Lifting state up.

State ownership.

Component boundaries.

Feature-based component architecture.

Presentational / container separation.

Custom hooks для винесення logic.

Context.

Refactoring large components.

Component performance.

Memoization.

`React.memo`.

`useMemo`.

`useCallback`.

Component testing.

Error boundaries.

---

## 🔴 Senior

Advanced component architecture.

Design systems.

Scalable component APIs.

Compound component architecture.

Headless components.

Controlled component architecture.

State ownership strategies.

Component dependency boundaries.

Reusable abstractions.

Composition over inheritance.

Component API design.

Rendering architecture.

React reconciliation model.

Component identity.

Keys and identity.

Render optimization.

Concurrent rendering concepts.

Server / Client component boundaries.

Streaming UI.

Architecture of large React applications.

Trade-offs між:

    reuse
    abstraction
    composition
    simplicity
    performance
    maintainability

---

# Міні-шпаргалка

## Component

    function Greeting() {
        return <h1>Hello!</h1>;
    }

---

## Component usage

    <Greeting />

---

## Component naming

    PascalCase

    UserCard
    ProductList
    SearchForm

---

## Parent / Child

    Parent
       ↓
    Child

Наприклад:

    function App() {
        return <Header />;
    }

    App → parent
    Header → child

---

## Composition

    function App() {
        return (
            <>
                <Header />
                <Main />
                <Footer />
            </>
        );
    }

---

## Props

    function Greeting({ name }) {
        return <h1>Hello, {name}</h1>;
    }

    <Greeting name="John" />

---

## Children

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

    <Card>
        <h2>Hello</h2>
    </Card>

---

## Fragment

    <>
        <Header />
        <Main />
        <Footer />
    </>

---

## Default export

    export default Header;

    import Header from "./Header";

---

## Named export

    export function Header() {
        return <header>Header</header>;
    }

    import { Header } from "./Header";

---

## Component tree

    App
    ├── Header
    ├── Main
    │   ├── Content
    │   └── Sidebar
    └── Footer

---

## Data flow

    Parent
       ↓
    Child
       ↓
    Grandchild

    props → top → down

---

## Render

    Component
        ↓
    JSX
        ↓
    React elements
        ↓
    React
        ↓
    DOM

---

## Re-render

    state / props change
          ↓
        render
          ↓
    React updates UI

---

## Component mental model

    props
      +
    state
      ↓
    Component
      ↓
    JSX
      ↓
    UI

---

## Component responsibility

    One component
        ↓
    clear responsibility
        ↓
    predictable UI

---

# Головне:

• React application будується з components.

• Component — основна одиниця побудови React UI.

• Сучасні React components зазвичай є JavaScript functions.

• Component name повинен починатися з великої літери.

• PascalCase використовується для назв components:

    UserCard
    ProductList
    SearchForm

• Component використовується як JSX:

    <UserCard />

• Component може повертати один element або Fragment.

• Fragment дозволяє групувати elements без зайвого DOM wrapper.

• Один component може використовувати інші components.

• Component, який використовує інший component, є parent.

• Використаний component є child.

• Components утворюють component tree.

• Component tree описує структуру React components.

• DOM tree описує фактичні DOM nodes.

• Composition — побудова складного UI з менших components.

• Reusable component можна використовувати в різних місцях application.

• Props — input component, який передається від parent до child.

• Props потрібно розглядати як read-only.

• `children` дозволяє передавати вкладений UI component.

• State дозволяє component зберігати змінювані дані.

• Props та state впливають на те, який UI component повертає.

• React використовує one-way data flow:

    parent
       ↓
    child

• Дані зазвичай передаються зверху вниз через props.

• Render — процес визначення UI на основі поточних даних.

• Re-render може відбутися після зміни state або props.

• Re-render не означає повне перезавантаження web page.

• React сам керує необхідними DOM updates.

• React використовує declarative підхід.

• Ми описуємо:

    "який UI повинен бути"

а не:

    "як вручну змінити DOM"

• Component бажано мати з чіткою відповідальністю.

• Не потрібно створювати component для кожного HTML element.

• Не варто без необхідності створювати величезні components.

• Не варто без необхідності створювати надмірно дрібні components.

• Component abstraction повинна покращувати структуру, а не ускладнювати її.

• Components повинні бути максимально передбачуваними під час render.

• Props не слід змінювати.

• Side effects не слід виконувати безпосередньо під час звичайного render.

• Component можна експортувати:

    default export

або:

    named export

• TypeScript React components зазвичай знаходяться у `.tsx` файлах.

• Основна mental model:

    DATA
      ↓
    COMPONENT
      ↓
    JSX
      ↓
    UI

• Для React development важливо мислити не окремими HTML elements, а component tree.

• Хороша React-архітектура починається з правильного поділу UI на логічні components.

• Наступні теми розширюють component model:

    JSX
        ↓
    Props / Children
        ↓
    Conditional Rendering
        ↓
    Lists / Keys
        ↓
    Styling
        ↓
    Events / State
        ↓
    Effects
        ↓
    Hooks
        ↓
    Composition
        ↓
    Context
        ↓
    Data Fetching
        ↓
    Routing
        ↓
    Testing / Performance