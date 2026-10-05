# 02. Children Pattern

Children Pattern — один із найважливіших патернів композиції компонентів у React.

Він базується на спеціальному prop:

    children

`children` дозволяє передавати JSX, компоненти або інший React-контент всередину компонента.

Наприклад:

    function Card({ children }) {
        return (
            <article className="card">
                {children}
            </article>
        );
    }

Використання:

    <Card>
        <h2>User profile</h2>
        <p>Frontend Developer</p>
    </Card>

У цьому випадку:

    Card
      ↓
    children
      ↓
    h2 + p

`Card` відповідає за контейнер, а батьківський компонент визначає, що саме буде всередині.

---

# Ключові поняття

✔ `children`  
✔ `props.children`  
✔ children prop  
✔ nested JSX  
✔ nested components  
✔ component composition  
✔ containment  
✔ reusable container  
✔ wrapper component  
✔ layout component  
✔ content projection  
✔ flexible component  
✔ component API  
✔ single responsibility  
✔ inversion of control  
✔ composition  
✔ React element  
✔ React node  
✔ conditional children  
✔ multiple children  
✔ function as children  
✔ render props  
✔ children manipulation  
✔ `React.Children`

---

# Що потрібно пам'ятати

• `children` — спеціальний prop React-компонента.

• `children` містить те, що знаходиться між відкриваючим і закриваючим тегами компонента.

• Наприклад:

    <Card>
        <h2>Hello</h2>
    </Card>

означає, що:

    children = <h2>Hello</h2>

• `children` дозволяє створювати reusable та flexible components.

• Компонент-контейнер може не знати, який саме UI буде передано всередину.

• `children` є одним із основних механізмів component composition.

• Через `children` можна передавати:

    text
    JSX
    components
    elements
    multiple elements
    conditional content
    arrays of elements
    expressions

• `children` може бути одним React element або цілим набором React nodes.

• `children` не обов'язково є одним компонентом.

• `children` може бути `null`, якщо контент не переданий.

• `children` може бути рядком:

    <Card>
        Hello
    </Card>

• `children` може бути кількома елементами:

    <Card>
        <h2>Hello</h2>
        <p>World</p>
    </Card>

• `children` може бути компонентом:

    <Card>
        <UserProfile />
    </Card>

• `children` дозволяє реалізувати inversion of control:

    parent
       ↓
    decides content

    child
       ↓
    controls container

• `children` особливо корисний для:

    Card
    Panel
    Modal
    Layout
    Container
    Dialog
    Form
    Page
    Stack
    Section

---

# Що таке children

`children` — спеціальний prop, який React передає компоненту для контенту, розміщеного між його тегами.

Наприклад:

    <Card>
        <h2>Hello</h2>
    </Card>

Можна концептуально уявити як:

    Card({
        children: <h2>Hello</h2>
    })

Компонент:

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

---

# Найпростіший приклад

    function Container({ children }) {
        return (
            <div className="container">
                {children}
            </div>
        );
    }

Використання:

    function App() {
        return (
            <Container>
                <h1>Hello</h1>
                <p>Welcome!</p>
            </Container>
        );
    }

Результат у DOM концептуально:

    <div class="container">
        <h1>Hello</h1>
        <p>Welcome!</p>
    </div>

---

# children як prop

`children` є звичайним prop з особливим синтаксисом JSX.

Наприклад:

    <Card>
        <p>Hello</p>
    </Card>

можна концептуально представити як:

    <Card children={<p>Hello</p>} />

Тобто:

    children

є частиною:

    props

---

# props.children

Можна отримати `children` через весь об'єкт props.

    function Card(props) {
        return (
            <article>
                {props.children}
            </article>
        );
    }

Або через destructuring:

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

Другий варіант дуже поширений у React-коді.

---

# children та звичайні props

Звичайний prop:

    <User
        name="John"
        age={25}
    />

Отримання:

    function User({ name, age }) {
        ...
    }

`children`:

    <Card>
        <User />
    </Card>

Отримання:

    function Card({ children }) {
        ...
    }

Різниця в основному в синтаксисі передачі.

---

# Children Pattern

Children Pattern можна описати так:

    Parent
       ↓
    passes JSX
       ↓
    Child component
       ↓
    renders children

Наприклад:

    function Panel({ children }) {
        return (
            <section className="panel">
                {children}
            </section>
        );
    }

Використання:

    <Panel>
        <h2>Settings</h2>
        <p>Account settings</p>
    </Panel>

Схема:

    Panel
      ↓
    children
      ↓
    h2
    p

---

# Чому children важливий

Без `children` reusable component часто доводиться налаштовувати через багато props.

Наприклад:

    function Card({
        title,
        description,
        image,
        buttonText
    }) {
        ...
    }

Такий компонент має знати структуру контенту.

Через `children`:

    function Card({ children }) {
        return (
            <article className="card">
                {children}
            </article>
        );
    }

Тепер компонент не знає, який саме контент буде всередині.

---

# Children та flexibility

Розглянемо:

    function Box({ children }) {
        return (
            <div className="box">
                {children}
            </div>
        );
    }

Можна передати:

    <Box>
        <h2>Hello</h2>
    </Box>

або:

    <Box>
        <UserProfile />
    </Box>

або:

    <Box>
        <Product />
    </Box>

або:

    <Box>
        <Button>Save</Button>
    </Box>

Один компонент:

    Box

працює з різним контентом.

---

# Container Pattern

Один із найпоширеніших випадків використання `children` — container.

    function Container({ children }) {
        return (
            <div className="container">
                {children}
            </div>
        );
    }

Використання:

    <Container>
        <UserProfile />
    </Container>

або:

    <Container>
        <ProductList />
    </Container>

або:

    <Container>
        <Settings />
    </Container>

`Container` відповідає за:

    width
    margin
    padding
    layout

а не за конкретний контент.

---

# Wrapper Component

Wrapper component — компонент, який обгортає інший UI.

Наприклад:

    function Wrapper({ children }) {
        return (
            <div className="wrapper">
                {children}
            </div>
        );
    }

Використання:

    <Wrapper>
        <UserCard />
    </Wrapper>

Схема:

    Wrapper
       ↓
    children

---

# Card Pattern

    function Card({ children }) {
        return (
            <article className="card">
                {children}
            </article>
        );
    }

Використання:

    <Card>
        <h2>John</h2>
        <p>Developer</p>
    </Card>

Інший випадок:

    <Card>
        <ProductImage />
        <ProductInfo />
        <Button />
    </Card>

`Card` не потрібно змінювати.

---

# Panel Pattern

    function Panel({ children }) {
        return (
            <section className="panel">
                {children}
            </section>
        );
    }

Використання:

    <Panel>
        <h2>Profile</h2>
        <UserInfo />
    </Panel>

або:

    <Panel>
        <h2>Statistics</h2>
        <Statistics />
    </Panel>

---

# Layout Pattern

`children` дуже часто використовується для layout.

    function PageLayout({ children }) {
        return (
            <>
                <Header />

                <main>
                    {children}
                </main>

                <Footer />
            </>
        );
    }

Використання:

    function HomePage() {
        return (
            <PageLayout>
                <h1>Home</h1>
            </PageLayout>
        );
    }

І:

    function AboutPage() {
        return (
            <PageLayout>
                <h1>About</h1>
            </PageLayout>
        );
    }

Один layout використовується для різного контенту.

---

# Modal Pattern

`children` дуже зручний для модальних вікон.

    function Modal({ children }) {
        return (
            <div className="modal">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        );
    }

Використання:

    <Modal>
        <h2>Delete user?</h2>

        <p>
            This action cannot be undone.
        </p>

        <Button>
            Delete
        </Button>
    </Modal>

`Modal` відповідає за:

    modal structure
    overlay
    positioning

а parent визначає:

    modal content

---

# Dialog Pattern

    function Dialog({ children }) {
        return (
            <dialog open>
                {children}
            </dialog>
        );
    }

Використання:

    <Dialog>
        <h2>Confirm action</h2>

        <p>
            Are you sure?
        </p>

        <Button>
            Confirm
        </Button>
    </Dialog>

---

# Form Wrapper

`children` також можна використовувати для form container.

    function Form({ children, onSubmit }) {
        return (
            <form onSubmit={onSubmit}>
                {children}
            </form>
        );
    }

Використання:

    <Form onSubmit={handleSubmit}>
        <Input />
        <Input />
        <Button>
            Submit
        </Button>
    </Form>

`Form` контролює:

    form behavior

а `children` визначає:

    form fields

---

# Stack Pattern

Stack — reusable layout component, який розміщує children один під одним або з певним spacing.

    function Stack({ children }) {
        return (
            <div className="stack">
                {children}
            </div>
        );
    }

Використання:

    <Stack>
        <Input />
        <Input />
        <Button>
            Save
        </Button>
    </Stack>

Структура:

    Stack
      ↓
      ├── Input
      ├── Input
      └── Button

---

# Multiple Children

`children` може містити багато елементів.

    <Card>
        <h2>Title</h2>

        <p>Description</p>

        <Button>
            Open
        </Button>
    </Card>

Умовно:

    children
       ↓
       ├── h2
       ├── p
       └── Button

Тому не можна припускати, що:

    children

завжди є одним елементом.

---

# One Child

Може бути і один child:

    <Card>
        <UserProfile />
    </Card>

У такому випадку:

    children

містить один React node.

---

# No Children

Компонент може бути використаний без children:

    <Card />

У такому випадку `children` не містить переданого контенту.

Наприклад:

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

Результат:

    <article></article>

Тому reusable component повинен бути готовим до відсутності children, якщо це допустимо його API.

---

# Text as Children

`children` може бути текстом.

    <Card>
        Hello
    </Card>

Компонент:

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

Результат:

    <article>
        Hello
    </article>

---

# Number as Children

Можна передати число:

    <Card>
        {42}
    </Card>

Або:

    <Card>
        {count}
    </Card>

---

# Expression as Children

Можна передавати результат JavaScript expression.

    <Card>
        {user.name}
    </Card>

Або:

    <Card>
        {isLoggedIn ? (
            <Dashboard />
        ) : (
            <Login />
        )}
    </Card>

---

# Conditional Children

`children` можна формувати умовно.

    <Card>
        {isLoggedIn && (
            <UserProfile />
        )}
    </Card>

Якщо:

    isLoggedIn === true

буде переданий:

    <UserProfile />

Якщо:

    isLoggedIn === false

React не відобразить цей child.

---

# Ternary Children

    <Card>
        {isLoading ? (
            <Spinner />
        ) : (
            <Content />
        )}
    </Card>

Тут children залежить від state:

    isLoading
       ↓
    true  → Spinner
    false → Content

---

# Array as Children

Children може бути масивом React elements.

    const items = [
        <li key="1">Apple</li>,
        <li key="2">Banana</li>,
        <li key="3">Orange</li>
    ];

    <ul>
        {items}
    </ul>

Але частіше масив створюють через `map()`:

    const items = ["Apple", "Banana", "Orange"];

    <ul>
        {items.map((item) => (
            <li key={item}>
                {item}
            </li>
        ))}
    </ul>

---

# Nested Children

Children можуть самі містити children.

Наприклад:

    <Page>
        <Card>
            <Panel>
                <UserProfile />
            </Panel>
        </Card>
    </Page>

Структура:

    Page
      ↓
    Card
      ↓
    Panel
      ↓
    UserProfile

Це nested composition.

---

# Deeply Nested Composition

Наприклад:

    <Page>
        <Layout>
            <Sidebar>
                <Navigation />
            </Sidebar>

            <Main>
                <Card>
                    <UserInfo />
                </Card>
            </Main>
        </Layout>
    </Page>

Component tree:

    Page
      ↓
    Layout
      ├── Sidebar
      │     └── Navigation
      │
      └── Main
            └── Card
                  └── UserInfo

---

# Children та Component Composition

Children — один із механізмів composition.

Наприклад:

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

А:

    <Card>
        <UserInfo />
        <Actions />
    </Card>

створює composition:

    Card
      +
    UserInfo
      +
    Actions

---

# Inversion of Control

Children Pattern добре демонструє inversion of control.

Без composition:

    Card
      ↓
    сам вирішує:
      ↓
    Avatar
    UserInfo
    Button

З `children`:

    Parent
      ↓
    вирішує:
      ↓
    Avatar
    UserInfo
    Button

    Card
      ↓
    відповідає за:
      ↓
    container / layout

Тобто контроль над content передається parent component.

---

# Separation of Responsibilities

Наприклад:

    function Card({ children }) {
        return (
            <article className="card">
                {children}
            </article>
        );
    }

`Card` відповідає за:

    card container
    card styles
    card layout

Parent відповідає за:

    content

Це separation of concerns.

---

# Children та reusable components

Порівняємо.

Менш гнучко:

    function Card({
        title,
        description,
        image,
        buttonText
    }) {
        return (
            <article>
                <img src={image} />

                <h2>{title}</h2>

                <p>{description}</p>

                <button>
                    {buttonText}
                </button>
            </article>
        );
    }

Більш гнучко:

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

Тепер:

    <Card>
        <img src="/avatar.jpg" />
        <h2>John</h2>
        <p>Developer</p>
        <Button>Edit</Button>
    </Card>

---

# Children та Component API

Компонент:

    function Card({ children }) {
        return (
            <article className="card">
                {children}
            </article>
        );
    }

має дуже простий API:

    children

Це може бути корисно для reusable components.

---

# Children vs Many Props

Поганий варіант для дуже гнучкого UI:

    function Panel({
        showHeader,
        showFooter,
        showIcon,
        showButton,
        title,
        description,
        buttonText
    }) {
        ...
    }

Кращий варіант:

    function Panel({ children }) {
        return (
            <section>
                {children}
            </section>
        );
    }

Використання:

    <Panel>
        <Header />
        <Content />
        <Footer />
    </Panel>

---

# Children vs slots

`children` підходить, коли потрібен один основний простір для вкладеного контенту.

Наприклад:

    <Card>
        <UserInfo />
    </Card>

Якщо потрібні різні named areas:

    header
    content
    footer

можна використовувати окремі props.

Наприклад:

    function Card({
        header,
        footer,
        children
    }) {
        return (
            <article>
                <header>
                    {header}
                </header>

                <main>
                    {children}
                </main>

                <footer>
                    {footer}
                </footer>
            </article>
        );
    }

Це буде детальніше розглядатися у:

    03-slots-and-props

---

# Named Children

Іноді можна передавати різні частини UI через props.

    function Layout({
        header,
        sidebar,
        children
    }) {
        return (
            <div>
                {header}

                <aside>
                    {sidebar}
                </aside>

                <main>
                    {children}
                </main>
            </div>
        );
    }

Використання:

    <Layout
        header={<Header />}
        sidebar={<Sidebar />}
    >
        <Main />
    </Layout>

Тут:

    header
    sidebar
    children

є окремими областями композиції.

---

# Children як React Node

На практиці `children` часто типізують як:

    ReactNode

Наприклад у TypeScript:

    import type { ReactNode } from "react";

    type CardProps = {
        children: ReactNode;
    };

    function Card({ children }: CardProps) {
        return (
            <article>
                {children}
            </article>
        );
    }

`ReactNode` є широким типом для того, що React може рендерити як child.

---

# ReactNode

Для практичної роботи можна запам'ятати:

    ReactNode

означає приблизно:

    те, що React може відобразити
    як частину UI

Наприклад:

    string
    number
    JSX element
    component result
    array of nodes
    null
    boolean

Приклад:

    import type { ReactNode } from "react";

    type PanelProps = {
        children: ReactNode;
    };

---

# children у TypeScript

Типовий reusable component:

    import type { ReactNode } from "react";

    type CardProps = {
        children: ReactNode;
    };

    function Card({ children }: CardProps) {
        return (
            <article className="card">
                {children}
            </article>
        );
    }

Використання:

    <Card>
        <h2>Hello</h2>
        <p>World</p>
    </Card>

---

# Optional children

Якщо children не обов'язковий:

    import type { ReactNode } from "react";

    type CardProps = {
        children?: ReactNode;
    };

    function Card({ children }: CardProps) {
        return (
            <article>
                {children}
            </article>
        );
    }

Тоді допустимо:

    <Card />

і:

    <Card>
        <h2>Hello</h2>
    </Card>

---

# Required vs Optional Children

Required:

    type CardProps = {
        children: ReactNode;
    };

Optional:

    type CardProps = {
        children?: ReactNode;
    };

Якщо компонент має сенс тільки з контентом, можна зробити:

    children: ReactNode

Якщо порожній компонент допустимий:

    children?: ReactNode

---

# Children та default content

Можна використовувати fallback content.

    function Card({ children }: CardProps) {
        return (
            <article>
                {children ?? (
                    <p>No content</p>
                )}
            </article>
        );
    }

Якщо:

    children

відсутній, буде показано:

    No content

---

# Conditional Rendering of Children

Можна умовно відображати children.

    function Panel({
        children,
        isOpen
    }: PanelProps) {
        if (!isOpen) {
            return null;
        }

        return (
            <section>
                {children}
            </section>
        );
    }

---

# Children та state

Children можуть залежати від state.

    function App() {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <Panel>
                {isOpen && (
                    <UserProfile />
                )}
            </Panel>
        );
    }

`Panel` не знає, чому children з'явився або зник.

Він просто рендерить:

    children

---

# Children та events

Parent може передати children, який має event handlers.

    <Card>
        <Button onClick={handleSave}>
            Save
        </Button>
    </Card>

`Card` не повинен знати про:

    handleSave

Він просто рендерить children.

---

# Children та data

Children можуть використовувати дані parent.

    function UserPage() {
        const user = {
            name: "John",
            role: "Developer"
        };

        return (
            <Card>
                <UserInfo
                    name={user.name}
                    role={user.role}
                />
            </Card>
        );
    }

`Card` не знає про:

    user

Він лише відображає children.

---

# Children Pattern та prop drilling

Children Pattern може допомогти уникати непотрібної передачі props через проміжні компоненти.

Наприклад:

    function App() {
        const user = {
            name: "John"
        };

        return (
            <Layout>
                <UserCard user={user} />
            </Layout>
        );
    }

`Layout` не потрібно передавати:

    user

якщо він його не використовує.

Не потрібно:

    <Layout user={user}>
        <Page user={user}>
            <UserCard user={user} />
        </Page>
    </Layout>

Якщо `Layout` і `Page` лише передають UI далі.

---

# Children та Prop Drilling

Без composition:

    App
      ↓ user
    Layout
      ↓ user
    Page
      ↓ user
    UserCard

З composition:

    App
      ↓
    Layout
      ↓
    children
      ↓
    UserCard
      ↓ user

Проміжний компонент не обов'язково отримує `user`.

---

# Important Distinction

Children Pattern не означає:

    "не використовувати props"

Воно означає:

    "передавати UI як частину props"

Наприклад:

    <Layout>
        <UserCard user={user} />
    </Layout>

Тут:

    Layout
       ↓
    children

А:

    UserCard
       ↓
    user prop

---

# Children як UI injection

Можна мислити про `children` як про передачу готового UI всередину компонента.

    Parent
       ↓
    creates UI
       ↓
    passes UI
       ↓
    children
       ↓
    Container

Наприклад:

    <Modal>
        <DeleteUserForm />
    </Modal>

`Modal` отримує готовий UI:

    DeleteUserForm

---

# Children та encapsulation

`Card` може приховувати деталі стилізації:

    function Card({ children }) {
        return (
            <article className="card">
                {children}
            </article>
        );
    }

Parent не повинен знати:

    border
    shadow
    padding
    radius

Він просто використовує:

    <Card>
        ...
    </Card>

Це encapsulation presentation details.

---

# Children Pattern та styling

Наприклад:

    function Panel({ children }) {
        return (
            <section className="panel">
                {children}
            </section>
        );
    }

Усі компоненти, які використовують `Panel`, отримують однакову оболонку.

    <Panel>
        <Profile />
    </Panel>

    <Panel>
        <Settings />
    </Panel>

    <Panel>
        <Statistics />
    </Panel>

---

# Children та layout abstraction

Наприклад:

    function Center({ children }) {
        return (
            <div className="center">
                {children}
            </div>
        );
    }

Тепер:

    <Center>
        <LoginForm />
    </Center>

або:

    <Center>
        <Spinner />
    </Center>

або:

    <Center>
        <ErrorMessage />
    </Center>

`Center` абстрагує layout.

---

# Practical Example — Page

    function Page({ children }: {
        children: ReactNode;
    }) {
        return (
            <div className="page">
                <Header />

                <main>
                    {children}
                </main>

                <Footer />
            </div>
        );
    }

Використання:

    function HomePage() {
        return (
            <Page>
                <h1>Home</h1>
                <p>Welcome!</p>
            </Page>
        );
    }

---

# Practical Example — Card

    type CardProps = {
        children: ReactNode;
    };

    function Card({ children }: CardProps) {
        return (
            <article className="card">
                {children}
            </article>
        );
    }

Використання:

    <Card>
        <h2>User</h2>
        <p>Frontend Developer</p>
    </Card>

---

# Practical Example — Modal

    type ModalProps = {
        children: ReactNode;
    };

    function Modal({ children }: ModalProps) {
        return (
            <div className="modal">
                <div className="modal-content">
                    {children}
                </div>
            </div>
        );
    }

Використання:

    <Modal>
        <h2>Delete account?</h2>

        <p>
            This action cannot be undone.
        </p>

        <Button>
            Delete
        </Button>
    </Modal>

---

# Practical Example — Stack

    type StackProps = {
        children: ReactNode;
    };

    function Stack({ children }: StackProps) {
        return (
            <div className="stack">
                {children}
            </div>
        );
    }

Використання:

    <Stack>
        <Input />
        <Input />
        <Button>
            Save
        </Button>
    </Stack>

---

# Practical Example — Nested Composition

    function Card({ children }: CardProps) {
        return (
            <article className="card">
                {children}
            </article>
        );
    }

    function Panel({ children }: PanelProps) {
        return (
            <section className="panel">
                {children}
            </section>
        );
    }

    function App() {
        return (
            <Panel>
                <Card>
                    <UserProfile />
                </Card>
            </Panel>
        );
    }

Структура:

    App
      ↓
    Panel
      ↓
    Card
      ↓
    UserProfile

---

# Practical Example — Layout + Page

    function Layout({ children }: {
        children: ReactNode;
    }) {
        return (
            <>
                <Header />

                <main>
                    {children}
                </main>

                <Footer />
            </>
        );
    }

    function HomePage() {
        return (
            <Layout>
                <HomeContent />
            </Layout>
        );
    }

    function AboutPage() {
        return (
            <Layout>
                <AboutContent />
            </Layout>
        );
    }

Один `Layout` використовується для різних сторінок.

---

# Practical Example — Reusable Section

    function Section({ children }: {
        children: ReactNode;
    }) {
        return (
            <section className="section">
                {children}
            </section>
        );
    }

Використання:

    <Section>
        <h2>About</h2>
        <p>About our company...</p>
    </Section>

І:

    <Section>
        <h2>Contact</h2>
        <ContactForm />
    </Section>

---

# Practical Example — Conditional Content

    function Panel({
        children,
        isOpen
    }: {
        children: ReactNode;
        isOpen: boolean;
    }) {
        if (!isOpen) {
            return null;
        }

        return (
            <section className="panel">
                {children}
            </section>
        );
    }

Використання:

    <Panel isOpen={isOpen}>
        <UserProfile />
    </Panel>

---

# Practical Example — Empty Children

    function Card({ children }: {
        children?: ReactNode;
    }) {
        return (
            <article className="card">
                {children}
            </article>
        );
    }

Допустимо:

    <Card />

але:

    <Card>
        <UserProfile />
    </Card>

також допустимо.

---

# Practical Example — Fallback

    function Card({ children }: {
        children?: ReactNode;
    }) {
        return (
            <article className="card">
                {children ?? (
                    <p>No content</p>
                )}
            </article>
        );
    }

---

# Function as Children

`children` може бути не тільки JSX, але й функцією.

Наприклад:

    function DataProvider({ children }) {
        const user = {
            name: "John"
        };

        return (
            <div>
                {children(user)}
            </div>
        );
    }

Використання:

    <DataProvider>
        {(user) => (
            <UserCard user={user} />
        )}
    </DataProvider>

Тут:

    children

є функцією.

Цей підхід називають:

    function as children

або часто пов'язують із:

    render props

---

# Function as Children Pattern

Приклад:

    function MousePosition({ children }) {
        const [position, setPosition] = useState({
            x: 0,
            y: 0
        });

        return (
            <div>
                {children(position)}
            </div>
        );
    }

Використання:

    <MousePosition>
        {({ x, y }) => (
            <p>
                {x}, {y}
            </p>
        )}
    </MousePosition>

Тут children — функція:

    children(position)

---

# Function Children vs Normal Children

Normal children:

    <Card>
        <UserInfo />
    </Card>

Тут:

    children

є React node.

Function children:

    <DataProvider>
        {(data) => (
            <UserInfo data={data} />
        )}
    </DataProvider>

Тут:

    children

є функцією.

Function as children є більш advanced pattern.

---

# Children та Render Props

Render prop — функція, яка отримує дані або стан і повертає UI.

Наприклад:

    function DataProvider({ children }) {
        const data = getData();

        return children(data);
    }

Використання:

    <DataProvider>
        {(data) => (
            <DataView data={data} />
        )}
    </DataProvider>

Тут `children` фактично виконує роль render prop.

Render props будуть важливішими при вивченні advanced composition patterns.

---

# Children Manipulation

У більшості випадків component повинен просто рендерити:

    {children}

Не потрібно без необхідності змінювати children.

Наприклад:

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

Це найпростіший і часто найкращий варіант.

---

# React.Children

React має API:

    React.Children

для роботи з children як із колекцією.

Наприклад:

    React.Children.count(children)

може порахувати кількість children.

Приклад:

    import { Children } from "react";

    function List({ children }: {
        children: ReactNode;
    }) {
        const count = Children.count(children);

        return (
            <div>
                <p>
                    Count: {count}
                </p>

                {children}
            </div>
        );
    }

`React.Children` потрібен переважно для advanced cases.

---

# React.Children.map

Можна перебрати children:

    import { Children } from "react";

    function List({ children }: {
        children: ReactNode;
    }) {
        return (
            <ul>
                {Children.map(
                    children,
                    (child) => (
                        <li>
                            {child}
                        </li>
                    )
                )}
            </ul>
        );
    }

Але потрібно обережно використовувати такі підходи.

Часто простіше передати масив даних і використати:

    map()

---

# React.Children.count

    import { Children } from "react";

    function Wrapper({ children }: {
        children: ReactNode;
    }) {
        const count = Children.count(children);

        return (
            <div>
                <p>
                    Children: {count}
                </p>

                {children}
            </div>
        );
    }

---

# React.Children.only

`Children.only()` перевіряє, що передано рівно один React element.

Наприклад:

    import { Children } from "react";

    function Wrapper({ children }: {
        children: ReactNode;
    }) {
        const child = Children.only(children);

        return (
            <div>
                {child}
            </div>
        );
    }

Якщо передано не один element, виникне помилка.

Цей API потрібно використовувати обережно.

---

# Не потрібно зловживати React.Children

У більшості звичайних components достатньо:

    {children}

Наприклад:

    function Card({ children }: CardProps) {
        return (
            <article>
                {children}
            </article>
        );
    }

Не потрібно використовувати:

    React.Children

без конкретної необхідності.

---

# Children та cloneElement

React також має:

    cloneElement()

який дозволяє створити новий React element на основі існуючого.

Наприклад:

    const cloned = cloneElement(
        child,
        {
            className: "active"
        }
    );

Це advanced technique.

У сучасному React краще спочатку перевірити, чи можна вирішити задачу простішим способом через:

    props
    children
    composition
    context

---

# Children Manipulation vs Composition

Проста composition:

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

Більш складна manipulation:

    function Card({ children }) {
        // inspect children
        // clone children
        // add props
        // transform children
    }

Перший підхід зазвичай простіший.

---

# Children Pattern та component coupling

`children` може зменшити coupling.

Наприклад:

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

`Card` не знає про:

    UserInfo
    ProductInfo
    Statistics
    Settings

Він працює з будь-яким children.

---

# Children Pattern та abstraction

`children` дозволяє абстрагувати layout від content.

Наприклад:

    function Center({ children }) {
        return (
            <div className="center">
                {children}
            </div>
        );
    }

Контент:

    LoginForm

може змінитися на:

    Spinner

без зміни `Center`.

---

# Children Pattern та Design Systems

У design systems часто використовуються компоненти:

    Card
    Stack
    Box
    Modal
    Dialog
    Container
    Section

які можуть приймати:

    children

Наприклад:

    <Stack>
        <Heading />
        <Text />
        <Button />
    </Stack>

Компоненти системи відповідають за layout та styling.

Користувач системи визначає content.

---

# Children Pattern та Layout Components

Типові layout components:

    Container
    Stack
    Grid
    Flex
    Center
    SidebarLayout
    PageLayout

Більшість із них природно використовують:

    children

Наприклад:

    function Center({ children }: {
        children: ReactNode;
    }) {
        return (
            <div className="center">
                {children}
            </div>
        );
    }

---

# Children Pattern та UI primitives

Primitive:

    function Box({ children }: {
        children: ReactNode;
    }) {
        return (
            <div className="box">
                {children}
            </div>
        );
    }

Composition:

    <Box>
        <Heading />
        <Text />
        <Button />
    </Box>

Box не знає нічого про:

    Heading
    Text
    Button

Це робить його reusable.

---

# Children Pattern та Page Composition

    function Page({ children }: {
        children: ReactNode;
    }) {
        return (
            <PageLayout>
                {children}
            </PageLayout>
        );
    }

Тепер:

    <Page>
        <Dashboard />
    </Page>

або:

    <Page>
        <Settings />
    </Page>

---

# Children Pattern та reusable API

Поганий API:

    <Card
        showAvatar
        showName
        showRole
        showActions
        showDescription
    />

Гнучкий API:

    <Card>
        <Avatar />
        <UserInfo />
        <Actions />
        <Description />
    </Card>

Перевага:

    structure is visible in JSX

---

# Children Pattern та readability

Наприклад:

    <Modal>
        <ModalTitle>
            Delete account
        </ModalTitle>

        <ModalContent>
            Are you sure?
        </ModalContent>

        <ModalActions>
            <Button>
                Cancel
            </Button>

            <Button>
                Delete
            </Button>
        </ModalActions>
    </Modal>

З JSX одразу видно структуру.

Це одна з головних переваг composition.

---

# Children Pattern та maintainability

Якщо змінюється layout:

    Card

можна змінити в одному місці.

Наприклад:

    function Card({ children }: CardProps) {
        return (
            <article className="card">
                {children}
            </article>
        );
    }

Усі місця використання:

    <Card>
        ...
    </Card>

автоматично отримують нову реалізацію layout.

---

# Children Pattern та testing

Reusable wrapper:

    function Card({ children }: CardProps) {
        return (
            <article className="card">
                {children}
            </article>
        );
    }

можна тестувати окремо:

    Card
      ↓
    renders children

А конкретний content:

    UserCard
    ProductCard
    StatisticsCard

можна тестувати окремо.

---

# Типові помилки

❌ Забувати відобразити `children`.

Наприклад:

    function Card({ children }) {
        return (
            <article>
                ...
            </article>
        );
    }

Якщо `{children}` не використовується, переданий контент не буде відображений.

Правильно:

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

---

❌ Припускати, що `children` завжди один element.

Наприклад:

    <Card>
        <h2>Hello</h2>
        <p>World</p>
    </Card>

Тут children містить кілька nodes.

---

❌ Припускати, що `children` завжди існує.

Можливо:

    <Card />

Якщо це допустимо API компонента, потрібно це враховувати.

---

❌ Використовувати `React.Children` без необхідності.

У більшості випадків достатньо:

    {children}

---

❌ Зловживати `cloneElement`.

Спочатку перевірити, чи можна вирішити задачу через:

    props
    children
    composition
    context

---

❌ Створювати занадто складний wrapper.

Якщо компонент лише обгортає children, він повинен залишатися простим.

---

❌ Використовувати children там, де потрібні named slots.

Якщо потрібні:

    header
    sidebar
    footer
    actions

можливо, краще використати окремі props.

---

❌ Плутати children з props data.

Наприклад:

    <UserCard user={user}>
        <Button />
    </UserCard>

Тут:

    user

це data prop.

А:

    <Button />

це children.

---

# Children vs Props

Data:

    <UserCard user={user} />

UI:

    <Card>
        <UserInfo />
    </Card>

Behavior:

    <Button onClick={handleClick} />

Можна мати все разом:

    <Card>
        <UserInfo user={user} />

        <Button onClick={handleEdit}>
            Edit
        </Button>
    </Card>

---

# Children vs Component

Children — це не окремий тип компонента.

`children` — це prop.

Наприклад:

    function Card({ children }) {
        ...
    }

Компонент:

    Card

Prop:

    children

---

# Children vs HTML children

У HTML можуть бути вкладені елементи:

    <div>
        <h1>Hello</h1>
    </div>

React використовує схожу концепцію для компонентів:

    <Card>
        <UserInfo />
    </Card>

Але тут:

    Card

є React component, а:

    UserInfo

також є React component.

---

# Children Pattern та component hierarchy

Наприклад:

    App
      ↓
    PageLayout
      ↓
    children
      ↓
    Dashboard
      ↓
    children
      ↓
    UserCard

Кожен container може передавати children далі.

---

# Composition Chain

Можна мати ланцюжок wrapper components:

    function App() {
        return (
            <Page>
                <Container>
                    <Card>
                        <UserProfile />
                    </Card>
                </Container>
            </Page>
        );
    }

Структура:

    Page
      ↓
    Container
      ↓
    Card
      ↓
    UserProfile

Кожен wrapper має свою відповідальність.

---

# Practical Composition Chain

    function Page({ children }: {
        children: ReactNode;
    }) {
        return (
            <div className="page">
                {children}
            </div>
        );
    }

    function Container({ children }: {
        children: ReactNode;
    }) {
        return (
            <div className="container">
                {children}
            </div>
        );
    }

    function Card({ children }: {
        children: ReactNode;
    }) {
        return (
            <article className="card">
                {children}
            </article>
        );
    }

Використання:

    <Page>
        <Container>
            <Card>
                <UserProfile />
            </Card>
        </Container>
    </Page>

---

# When to Use Children Pattern

Використовуй `children`, коли:

- компонент є контейнером;
- компонент відповідає за layout;
- контент повинен бути гнучким;
- структура content може змінюватися;
- потрібен reusable wrapper;
- потрібно передати готовий UI;
- component не повинен знати конкретний content;
- потрібно зменшити coupling;
- потрібно зробити component API простішим.

---

# When Not to Use Children Pattern

Не обов'язково використовувати `children`, якщо:

- компонент має чітко визначену структуру;
- контент повинен передаватися як data;
- потрібні окремі named areas;
- компонент повинен контролювати конкретний UI;
- composition через children робить API менш зрозумілим.

Наприклад:

    <User
        name="John"
        role="Developer"
    />

може бути зрозумілішим, ніж:

    <User>
        <h2>John</h2>
        <p>Developer</p>
    </User>

Якщо `User` має стабільну структуру.

---

# Children Pattern Decision

Запитай себе:

    Чи цей компонент є контейнером?

Якщо так:

    children

може бути хорошим вибором.

---

    Чи контент може змінюватися?

Якщо так:

    children

може бути хорошим вибором.

---

    Чи компонент повинен знати,
    що саме знаходиться всередині?

Якщо:

    ні

`children` часто є хорошим рішенням.

---

    Чи потрібні різні named areas?

Якщо так:

    slots / props

можуть бути кращими.

---

# Mini Interview Examples

### Що буде в children?

    <Card>
        <h2>Hello</h2>
    </Card>

Відповідь:

    <h2>Hello</h2>

---

### Чи може children бути текстом?

Так:

    <Card>
        Hello
    </Card>

---

### Чи може children бути кількома елементами?

Так:

    <Card>
        <h2>Hello</h2>
        <p>World</p>
    </Card>

---

### Чи може children бути компонентом?

Так:

    <Card>
        <UserProfile />
    </Card>

---

### Чи може children бути умовним?

Так:

    <Card>
        {isLoggedIn && <UserProfile />}
    </Card>

---

### Чи може children бути функцією?

Так.

    <DataProvider>
        {(data) => (
            <UserCard data={data} />
        )}
    </DataProvider>

Це advanced pattern.

---

# Питання зі співбесіди

Що таке `children` у React?

Чому `children` є спеціальним prop?

Як передати children компоненту?

Як отримати children?

Чим відрізняється:

    props.children

від:

    children

Чи є `children` звичайним prop?

Що може містити `children`?

Чи може children бути текстом?

Чи може children бути числом?

Чи може children бути компонентом?

Чи може children містити декілька елементів?

Що буде, якщо children не передати?

Що таке Children Pattern?

Що таке wrapper component?

Що таке container component?

Як `children` допомагає створювати reusable components?

Як `children` допомагає зменшити coupling?

Що таке inversion of control?

Як `children` допомагає реалізувати composition?

Чим `children` відрізняється від звичайних props?

Коли краще використовувати `children`?

Коли краще використовувати named props?

Що таке slots?

Що таке function as children?

Що таке render props?

Що таке `ReactNode`?

Як типізувати children у TypeScript?

Чим відрізняється:

    children: ReactNode

від:

    children?: ReactNode

Що таке `React.Children`?

Коли використовувати `React.Children.count()`?

Що робить `React.Children.map()`?

Що робить `React.Children.only()`?

Що робить `cloneElement()`?

Чому не варто без необхідності маніпулювати children?

Як children допомагає уникати prop drilling?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке `children`.

`props.children`.

Children Pattern.

Nested JSX.

Nested components.

Basic component composition.

Reusable container.

Wrapper component.

Layout component.

`children` як React content.

Multiple children.

Optional children.

Conditional children.

Text children.

Component children.

Розуміння:

    Parent
       ↓
    children
       ↓
    Child UI

Розуміння:

    children
        ↓
    composition
        ↓
    reusable component

---

## 🔵 Junior

Глибше розуміння:

    children
    props
    ReactNode
    component composition

Уміння створювати:

    Card
    Panel
    Container
    Modal
    Layout
    Stack
    Section

Уміння використовувати:

    children
    conditional children
    nested composition
    layout composition

Розуміння:

    children
    vs
    ordinary props

Розуміння:

    children
    vs
    named props

Розуміння inversion of control.

Основи:

    React.Children

Основи:

    function as children

Розуміння prop drilling та ролі composition у його зменшенні.

---

## 🟠 Middle

Advanced Children Pattern.

Function as children.

Render props.

Multiple composition areas.

Slots.

Named slots.

Compound components.

Children manipulation.

`React.Children`.

`cloneElement()`.

Context + composition.

Headless components.

Flexible component APIs.

Advanced layout components.

Design system primitives.

Composition-based API design.

---

## 🔴 Senior

Advanced composition architecture.

Children API design.

Component extensibility.

Headless UI.

Compound component architecture.

Render props trade-offs.

Function-as-children trade-offs.

Context-based composition.

Polymorphic components.

Generic component APIs.

Abstraction boundaries.

Component coupling.

API ergonomics.

Composition vs configuration.

Composition vs inheritance.

Children manipulation trade-offs.

Avoiding over-abstraction.

Design system architecture.

Scalable component composition.

---

# Міні-шпаргалка

## Basic children

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

---

## Usage

    <Card>
        <h2>Hello</h2>
        <p>World</p>
    </Card>

---

## props.children

    function Card(props) {
        return (
            <article>
                {props.children}
            </article>
        );
    }

---

## Destructuring

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

---

## TypeScript

    import type { ReactNode } from "react";

    type CardProps = {
        children: ReactNode;
    };

    function Card({ children }: CardProps) {
        return (
            <article>
                {children}
            </article>
        );
    }

---

## Optional children

    type CardProps = {
        children?: ReactNode;
    };

---

## Container

    function Container({ children }: {
        children: ReactNode;
    }) {
        return (
            <div className="container">
                {children}
            </div>
        );
    }

---

## Layout

    function Layout({ children }: {
        children: ReactNode;
    }) {
        return (
            <>
                <Header />

                <main>
                    {children}
                </main>

                <Footer />
            </>
        );
    }

---

## Multiple children

    <Card>
        <Avatar />
        <UserInfo />
        <Button>
            Edit
        </Button>
    </Card>

---

## Conditional children

    <Card>
        {isLoggedIn && (
            <UserProfile />
        )}
    </Card>

---

## Ternary children

    <Card>
        {isLoading ? (
            <Spinner />
        ) : (
            <Content />
        )}
    </Card>

---

## Function as children

    <DataProvider>
        {(data) => (
            <UserCard data={data} />
        )}
    </DataProvider>

---

## Named areas

    function Layout({
        header,
        sidebar,
        children
    }) {
        return (
            <>
                {header}

                <aside>
                    {sidebar}
                </aside>

                <main>
                    {children}
                </main>
            </>
        );
    }

---

## React.Children

    import { Children } from "react";

    Children.count(children);

    Children.map(
        children,
        (child) => ...
    );

    Children.only(children);

---

## Main idea

    children
       ↓
    pass UI
       ↓
    reusable component
       ↓
    render UI

---

# Основні правила

    children
        → nested UI

    props
        → data / behavior / configuration

    children
        → UI composition

    Container
        → structure

    Layout
        → page structure

    Card
        → visual container

    Modal
        → modal structure

    Stack
        → layout / spacing

---

# Головне:

• `children` — спеціальний prop React-компонента.

• Він містить контент між відкриваючим та закриваючим тегами компонента.

• Наприклад:

    <Card>
        <UserInfo />
    </Card>

означає:

    Card
      ↓
    children = <UserInfo />

• `children` є частиною `props`.

• Його можна отримати через:

    props.children

або:

    function Component({ children }) {
        ...
    }

• `children` може бути:

    text
    number
    JSX
    component
    multiple elements
    array
    conditional content
    function

• `children` є одним із головних інструментів component composition.

• Найпростіший reusable container:

    function Container({ children }) {
        return (
            <div>
                {children}
            </div>
        );
    }

• `children` дозволяє відокремити:

    container/layout

від:

    content

• Parent визначає:

    що буде всередині

а child/container визначає:

    як цей content буде розміщено.

• Це приклад:

    inversion of control

• `children` допомагає зменшити coupling між container та content.

• `children` часто використовується у:

    Card
    Panel
    Modal
    Dialog
    Layout
    Container
    Stack
    Section
    Form

• Якщо component має один основний простір для контенту — `children` часто є хорошим рішенням.

• Якщо потрібно кілька named areas:

    header
    sidebar
    footer
    actions

можуть бути кращими окремі props.

• `children` не замінює звичайні props.

• Data передають через props:

    <UserCard user={user} />

• UI можна передавати через children:

    <Card>
        <UserInfo />
    </Card>

• Behavior також часто передається через props:

    <Button onClick={handleClick}>
        Save
    </Button>

• TypeScript-компоненти часто типізують children через:

    ReactNode

Наприклад:

    import type { ReactNode } from "react";

    type CardProps = {
        children: ReactNode;
    };

• Якщо children необов'язковий:

    children?: ReactNode

• Не потрібно автоматично використовувати `React.Children`.

У більшості випадків достатньо:

    {children}

• Не потрібно без необхідності використовувати `cloneElement()`.

• Function as children — advanced pattern.

Наприклад:

    <DataProvider>
        {(data) => (
            <UserCard data={data} />
        )}
    </DataProvider>

• Children Pattern особливо важливий для:

    reusable components
    layout components
    design systems
    component composition

• Основна модель:

    Parent
       ↓
    children
       ↓
    reusable container
       ↓
    content

• Найважливіша практична ідея:

    Don't make the container
    decide what its content is.

    Let the parent compose
    the content through children.

---

# Фінальний приклад

    import type { ReactNode } from "react";

    type CardProps = {
        children: ReactNode;
    };

    function Card({ children }: CardProps) {
        return (
            <article className="card">
                {children}
            </article>
        );
    }

    function UserCard() {
        return (
            <Card>
                <Avatar />

                <UserInfo />

                <Button>
                    Edit
                </Button>
            </Card>
        );
    }

Component tree:

    UserCard
       ↓
      Card
       ↓
    children
       ↓
       ├── Avatar
       ├── UserInfo
       └── Button

Головна ідея:

    Card
      ↓
    відповідає за container

    UserCard
      ↓
    відповідає за composition

    children
      ↓
    передає готовий UI

---

# Загальна модель Children Pattern

    Parent Component

          ↓

    creates JSX

          ↓

    passes JSX as children

          ↓

    Reusable Component

          ↓

    renders {children}

          ↓

    Flexible UI

---

# Коротко для запам'ятовування

    children
        ↓
    nested JSX

    children
        ↓
    composition

    children
        ↓
    reusable components

    children
        ↓
    flexible UI

    children
        ↓
    inversion of control

    children
        ↓
    container does not control content

    Parent
        ↓
    controls composition

    Child
        ↓
    controls structure / behavior

---

# Найголовніше

    <Card>
        <UserInfo />
        <Button />
    </Card>

означає:

    Card
      ↓
    children
      ↓
    UserInfo + Button

А компонент:

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

каже:

    "Я відповідаю за Card,
     але не вирішую,
     що буде всередині."

Саме це і є сутність:

    Children Pattern