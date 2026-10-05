# 01. Component Composition

Component Composition (композиція компонентів) — це підхід у React, за якого складні компоненти створюються шляхом поєднання простіших компонентів.

Замість того щоб створювати один великий компонент, який відповідає за все, ми розділяємо UI на менші компоненти та комбінуємо їх.

Наприклад:

    App
     ↓
    Page
     ├── Header
     ├── Main
     │    ├── Sidebar
     │    └── Content
     └── Footer

Composition дозволяє:

- розділяти відповідальність між компонентами;
- повторно використовувати компоненти;
- передавати UI від батьківського компонента до дочірнього;
- створювати гнучкі компоненти;
- уникати надмірної кількості умов та спеціальних props;
- будувати складний UI з простих частин.

---

# Ключові поняття

✔ component composition  
✔ component hierarchy  
✔ parent component  
✔ child component  
✔ reusable component  
✔ `children`  
✔ props  
✔ JSX  
✔ UI composition  
✔ containment  
✔ specialization  
✔ separation of concerns  
✔ single responsibility  
✔ component API  
✔ flexible component  
✔ reusable component  
✔ explicit composition  
✔ implicit composition  
✔ prop drilling  
✔ component coupling  
✔ inversion of control  

---

# Що потрібно пам'ятати

• Component Composition — це спосіб будувати складний UI шляхом комбінування компонентів.

• React-компонент не обов'язково повинен знати всі деталі UI, який він містить.

• Батьківський компонент може передавати дочірньому дані через props.

• Через `children` можна передавати JSX всередину компонента.

• Composition часто краща за створення великого компонента з великою кількістю умов.

• Хороший reusable component має простий і зрозумілий API.

• Компонент краще робити гнучким через props та composition, ніж створювати багато майже однакових компонентів.

• React заохочує composition замість складної ієрархії inheritance.

• `children` — один із головних механізмів composition у React.

• Composition дозволяє батьківському компоненту контролювати структуру UI, а дочірньому — відповідати за конкретну частину UI.

---

# Що таке Component Composition

Component Composition — це побудова одного компонента з інших компонентів.

Наприклад:

    function Header() {
        return <header>Header</header>;
    }

    function Main() {
        return <main>Main content</main>;
    }

    function Footer() {
        return <footer>Footer</footer>;
    }

    function Page() {
        return (
            <>
                <Header />
                <Main />
                <Footer />
            </>
        );
    }

`Page` складається з:

    Header
    Main
    Footer

Тобто:

    Page
      ↓
    composition
      ↓
    Header + Main + Footer

---

# Простий приклад

    function Button() {
        return <button>Click</button>;
    }

    function LoginForm() {
        return (
            <form>
                <input type="email" />
                <input type="password" />

                <Button />
            </form>
        );
    }

`LoginForm` використовує `Button`.

Це і є composition:

    LoginForm
        ↓
      Button

---

# Component Tree

React UI можна уявляти як дерево компонентів.

Наприклад:

    App
     │
     └── Dashboard
          │
          ├── Header
          │
          ├── Sidebar
          │
          └── Content
               │
               ├── UserCard
               └── Statistics

Кожен компонент відповідає за певну частину UI.

---

# Parent Component

Parent component — компонент, який рендерить інші компоненти.

Наприклад:

    function App() {
        return (
            <main>
                <Header />
                <Content />
            </main>
        );
    }

Тут:

    App → parent
    Header → child
    Content → child

---

# Child Component

Child component — компонент, який рендериться всередині іншого компонента.

Наприклад:

    function App() {
        return (
            <main>
                <Header />
            </main>
        );
    }

`Header` є child component для `App`.

---

# Composition через JSX

Один із найпростіших способів composition — просто використовувати компонент всередині JSX іншого компонента.

    function Avatar() {
        return (
            <img
                src="/avatar.jpg"
                alt="User avatar"
            />
        );
    }

    function UserProfile() {
        return (
            <section>
                <Avatar />

                <h2>John</h2>

                <p>Frontend Developer</p>
            </section>
        );
    }

Тут:

    UserProfile
        ↓
      Avatar

`UserProfile` композиційно складається з `Avatar` та інших елементів.

---

# Composition та повторне використання

Одна з головних переваг composition — reuse.

Наприклад:

    function Button() {
        return <button>Click</button>;
    }

Його можна використовувати в різних компонентах:

    function LoginForm() {
        return (
            <form>
                ...
                <Button />
            </form>
        );
    }

    function RegisterForm() {
        return (
            <form>
                ...
                <Button />
            </form>
        );
    }

Один компонент:

    Button

може використовуватися в багатьох місцях.

---

# Reusable Component

Reusable component — компонент, який можна використовувати в різних частинах application.

Наприклад:

    function Card() {
        return (
            <article>
                <h2>Card</h2>
            </article>
        );
    }

Його можна використати:

    function HomePage() {
        return <Card />;
    }

    function AboutPage() {
        return <Card />;
    }

Але для справді reusable компонента часто потрібні props.

---

# Composition + Props

Компоненти можуть комбінуватися разом із props.

    function UserCard({ name, role }) {
        return (
            <article>
                <h2>{name}</h2>
                <p>{role}</p>
            </article>
        );
    }

Використання:

    function Users() {
        return (
            <>
                <UserCard
                    name="John"
                    role="Developer"
                />

                <UserCard
                    name="Anna"
                    role="Designer"
                />
            </>
        );
    }

Тут:

    Users
      ↓
    UserCard
      ↓
    props

---

# Composition vs Configuration

Важливо розуміти різницю між:

    configuration

та:

    composition

Configuration часто означає, що компонент налаштовується через багато props.

Наприклад:

    <Card
        title="User"
        description="Developer"
        showImage={true}
        showButton={true}
        buttonText="Open"
        compact={false}
        bordered={true}
    />

Такий компонент може поступово ставати складним.

Composition дозволяє передати готові частини UI:

    <Card>
        <Avatar />
        <UserInfo />
        <Button />
    </Card>

Тут `Card` не обов'язково знає, що саме знаходиться всередині.

---

# Composition через children

Один із найважливіших механізмів React composition — `children`.

Наприклад:

    function Card({ children }) {
        return (
            <article className="card">
                {children}
            </article>
        );
    }

Тепер можна передавати будь-який JSX:

    <Card>
        <h2>John</h2>
        <p>Developer</p>
    </Card>

`children` містить:

    <h2>John</h2>
    <p>Developer</p>

---

# Що таке children

`children` — спеціальний prop, який містить контент між відкриваючим та закриваючим тегами компонента.

Наприклад:

    <Card>
        <h2>Hello</h2>
    </Card>

React передає:

    <h2>Hello</h2>

як:

    children

У компоненті:

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

---

# Composition через children

Наприклад:

    function Panel({ children }) {
        return (
            <section className="panel">
                {children}
            </section>
        );
    }

Використання:

    function App() {
        return (
            <Panel>
                <h2>Settings</h2>
                <p>Account settings</p>
            </Panel>
        );
    }

Структура:

    App
      ↓
    Panel
      ↓
    children
      ↓
    h2 + p

`Panel` не знає наперед, який контент буде всередині.

---

# Explicit Composition

Explicit composition — коли дочірні компоненти явно вказуються в JSX.

Наприклад:

    function Page() {
        return (
            <>
                <Header />
                <Sidebar />
                <Content />
                <Footer />
            </>
        );
    }

Це дуже легко читати:

    Header
    Sidebar
    Content
    Footer

є частинами:

    Page

---

# Implicit Composition

Implicit composition може виникати, коли компонент отримує контент через `children` і не знає наперед його структуру.

Наприклад:

    function Container({ children }) {
        return (
            <div className="container">
                {children}
            </div>
        );
    }

Використання:

    <Container>
        <h1>Hello</h1>
        <p>Some text</p>
    </Container>

`Container` просто розміщує переданий контент.

---

# Container Component

Container component — компонент, який створює структуру або оболонку навколо іншого UI.

Наприклад:

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

`Container` відповідає за:

    layout
    spacing
    width
    styling

а не за конкретний контент.

---

# Layout Composition

Composition часто використовується для layout.

Наприклад:

    function PageLayout({ children }) {
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

Тепер різні сторінки можуть використовувати один layout.

    function HomePage() {
        return (
            <PageLayout>
                <h1>Home</h1>
            </PageLayout>
        );
    }

    function AboutPage() {
        return (
            <PageLayout>
                <h1>About</h1>
            </PageLayout>
        );
    }

Структура:

    PageLayout
       │
       ├── Header
       │
       ├── children
       │
       └── Footer

---

# Composition дозволяє розділяти відповідальність

Поганий підхід:

    function UserPage() {
        // fetch data
        // validate data
        // calculate statistics
        // render header
        // render sidebar
        // render user
        // render buttons
        // render footer
    }

Компонент поступово стає великим.

Краще:

    function UserPage() {
        return (
            <PageLayout>
                <UserHeader />
                <UserInfo />
                <UserActions />
            </PageLayout>
        );
    }

Тепер відповідальність розділена:

    PageLayout
    UserHeader
    UserInfo
    UserActions

---

# Single Responsibility

Composition добре працює разом із принципом:

    Single Responsibility Principle

Ідея:

> Один компонент повинен мати чітку відповідальність.

Наприклад:

    Avatar
        ↓
    відповідає за avatar

    UserInfo
        ↓
    відповідає за user information

    UserActions
        ↓
    відповідає за actions

    UserCard
        ↓
    комбінує ці частини

---

# Component as a Building Block

Компоненти можна розглядати як будівельні блоки.

Наприклад:

    Button
    Avatar
    Input
    Card
    Modal
    Header
    Footer

З них можна створювати складніші компоненти:

    UserCard
        ↓
        Avatar
        UserInfo
        Button

А потім:

    UserPage
        ↓
        UserCard
        UserSettings
        UserActivity

Тобто:

    small components
          ↓
    composed components
          ↓
    page components

---

# Composition Tree

Наприклад:

    App
     │
     └── Dashboard
          │
          ├── Header
          │    ├── Logo
          │    └── Navigation
          │
          ├── Sidebar
          │    ├── MenuItem
          │    ├── MenuItem
          │    └── MenuItem
          │
          └── Main
               ├── UserCard
               │    ├── Avatar
               │    └── UserInfo
               │
               └── Statistics

Це composition tree.

Кожен рівень складається з компонентів нижчого рівня.

---

# Composition та data flow

Composition не скасовує передачу даних через props.

Наприклад:

    function UserCard({ user }) {
        return (
            <article>
                <Avatar src={user.avatar} />

                <UserInfo
                    name={user.name}
                    role={user.role}
                />
            </article>
        );
    }

Тут:

    UserCard
       ↓
    Avatar
       ↓
    src

і:

    UserCard
       ↓
    UserInfo
       ↓
    name + role

---

# Parent controls composition

Батьківський компонент часто визначає, які компоненти повинні бути всередині.

Наприклад:

    function UserPage() {
        return (
            <PageLayout>
                <UserHeader />
                <UserProfile />
                <UserActivity />
            </PageLayout>
        );
    }

`PageLayout` відповідає за layout.

`UserPage` вирішує:

    що саме знаходиться всередині layout.

Це важлива ідея composition.

---

# Inversion of Control

Composition часто пов'язана з принципом:

    Inversion of Control

Ідея полягає в тому, що reusable component не повинен вирішувати все сам.

Наприклад, замість:

    function Card() {
        return (
            <article>
                <Avatar />
                <UserInfo />
                <Button />
            </article>
        );
    }

можна зробити:

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

Тепер батьківський компонент вирішує, що буде всередині:

    <Card>
        <Avatar />
        <UserInfo />
        <Button />
    </Card>

`Card` контролює контейнер.

Батьківський компонент контролює контент.

---

# Flexible Component

Flexible component — компонент, який можна використовувати в різних ситуаціях без зміни його внутрішньої реалізації.

Наприклад:

    function Panel({ children }) {
        return (
            <section className="panel">
                {children}
            </section>
        );
    }

Його можна використовувати:

    <Panel>
        <h2>Profile</h2>
    </Panel>

або:

    <Panel>
        <h2>Settings</h2>
        <p>Account settings...</p>
    </Panel>

або:

    <Panel>
        <UserProfile />
    </Panel>

Один компонент підтримує різний контент.

---

# Жорстко закодований компонент

Менш гнучкий варіант:

    function UserPanel() {
        return (
            <section>
                <Avatar />
                <UserInfo />
                <Button />
            </section>
        );
    }

Компонент жорстко знає:

    Avatar
    UserInfo
    Button

Якщо потрібно використати той самий контейнер для іншого контенту, доведеться змінювати компонент.

---

# Гнучкий компонент

Через composition:

    function Panel({ children }) {
        return (
            <section>
                {children}
            </section>
        );
    }

Тепер:

    <Panel>
        <UserProfile />
    </Panel>

або:

    <Panel>
        <Settings />
    </Panel>

або:

    <Panel>
        <Statistics />
    </Panel>

`Panel` не залежить від конкретного контенту.

---

# Composition vs Conditional Rendering

Іноді великий компонент намагаються зробити універсальним через багато умов.

Наприклад:

    function Card({
        type,
        showAvatar,
        showButton,
        showDescription,
        isCompact
    }) {
        return (
            <article>
                {showAvatar && <Avatar />}

                {type === "user" && <UserInfo />}

                {type === "product" && <ProductInfo />}

                {showDescription && <Description />}

                {showButton && <Button />}
            </article>
        );
    }

З часом кількість умов може збільшуватися.

Composition може спростити API:

    <Card>
        <Avatar />
        <UserInfo />
        <Description />
        <Button />
    </Card>

Тепер структура визначається зовні.

---

# Configuration vs Composition

Configuration:

    <Card
        showAvatar
        showButton
        showDescription
        compact
        bordered
        type="user"
    />

Composition:

    <Card>
        <Avatar />
        <UserInfo />
        <Description />
        <Button />
    </Card>

Configuration:

    компонент сам вирішує,
    що і як рендерити

Composition:

    батьківський компонент
    визначає структуру

---

# Коли composition краща

Composition особливо корисна, коли:

- UI має багато варіантів;
- компонент повинен бути reusable;
- різні частини UI повинні змінюватися незалежно;
- кількість boolean props зростає;
- з'являється багато `if`;
- компонент стає занадто великим;
- потрібна гнучка структура;
- компонент використовується в різних контекстах.

---

# Boolean Props Problem

Наприклад:

    <Modal
        showHeader
        showFooter
        showCloseButton
        showIcon
        showActions
    />

Чим більше таких props, тим складніше зрозуміти можливі комбінації.

Composition може виглядати простіше:

    <Modal>
        <ModalHeader />
        <ModalContent />
        <ModalFooter />
    </Modal>

Тут структура явно видно з JSX.

---

# Composition та readability

Порівняємо.

Складний компонент:

    <Modal
        title="Delete user"
        showIcon
        showCancelButton
        showConfirmButton
        confirmText="Delete"
        danger
    />

Composition:

    <Modal>
        <ModalHeader>
            <h2>Delete user</h2>
        </ModalHeader>

        <ModalContent>
            <p>Are you sure?</p>
        </ModalContent>

        <ModalFooter>
            <Button>Cancel</Button>
            <Button>Delete</Button>
        </ModalFooter>
    </Modal>

Другий варіант явно показує структуру UI.

---

# Component API

Component API — спосіб взаємодії з компонентом через:

    props
    children
    events
    composition

Наприклад:

    function Button({
        children,
        onClick
    }) {
        return (
            <button onClick={onClick}>
                {children}
            </button>
        );
    }

API компонента:

    children
    onClick

Використання:

    <Button onClick={handleClick}>
        Save
    </Button>

---

# Хороший Component API

Хороший API повинен бути:

    simple
    predictable
    readable
    flexible
    reusable

Наприклад:

    <Card>
        <UserInfo />
    </Card>

може бути зрозумілішим, ніж:

    <Card
        type="user"
        showAvatar
        showInfo
        showActions
    />

---

# Composition та coupling

Coupling — залежність між частинами системи.

Якщо компонент знає занадто багато про конкретні дочірні компоненти, coupling збільшується.

Наприклад:

    function Card() {
        return (
            <article>
                <UserAvatar />
                <UserName />
                <UserRole />
                <UserActions />
            </article>
        );
    }

`Card` сильно пов'язаний із конкретною структурою user UI.

Більш reusable варіант:

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

Тепер `Card` не залежить від конкретного контенту.

---

# Composition та separation of concerns

Composition допомагає розділити:

    layout
    presentation
    data
    behavior

Наприклад:

    UserPage
        ↓
    PageLayout
        ↓
    UserCard
        ↓
    UserInfo
        ↓
    Avatar

Кожен компонент має свою відповідальність.

---

# Layout + Content

Дуже поширений pattern:

    Layout
      +
    Content

Наприклад:

    function TwoColumnLayout({ children }) {
        return (
            <div className="layout">
                {children}
            </div>
        );
    }

Використання:

    <TwoColumnLayout>
        <Sidebar />
        <MainContent />
    </TwoColumnLayout>

`TwoColumnLayout` відповідає за layout.

`Sidebar` і `MainContent` відповідають за content.

---

# Composition через multiple children

`children` може містити декілька елементів.

    function Stack({ children }) {
        return (
            <div className="stack">
                {children}
            </div>
        );
    }

Використання:

    <Stack>
        <Button>Save</Button>
        <Button>Cancel</Button>
        <Button>Delete</Button>
    </Stack>

`children` може бути:

    Button
    Button
    Button

---

# Composition через Fragment

Компоненти можна комбінувати без додаткового DOM-елемента.

    function Page() {
        return (
            <>
                <Header />
                <Main />
                <Footer />
            </>
        );
    }

`<>...</>` — React Fragment.

Він дозволяє групувати елементи без створення:

    <div>

у DOM.

---

# Composition через props

Composition не обмежується `children`.

Можна передавати компоненти або JSX через звичайні props.

Наприклад:

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
        <MainContent />
    </Layout>

Тут:

    header
    sidebar
    children

є різними частинами composition.

---

# Component Slots

Slot — місце в компоненті, куди можна передати певну частину UI.

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

Використання:

    <Card
        header={<h2>User</h2>}
        footer={<Button>Save</Button>}
    >
        <UserInfo />
    </Card>

Тут є три slots:

    header
    children
    footer

Детальніше slots будуть розглядатися у:

    03-slots-and-props

---

# Composition через specialized components

Можна створити базовий компонент:

    function Button({ children, onClick }) {
        return (
            <button onClick={onClick}>
                {children}
            </button>
        );
    }

А потім створити спеціалізований компонент:

    function DeleteButton({ onClick }) {
        return (
            <Button onClick={onClick}>
                Delete
            </Button>
        );
    }

Тут:

    DeleteButton
        ↓
      Button

`DeleteButton` спеціалізує загальний `Button`.

---

# Specialization

Specialization — створення більш конкретного компонента на основі загального.

Наприклад:

    Button
       ↓
    PrimaryButton
       ↓
    SubmitButton

або:

    Card
       ↓
    UserCard

або:

    Input
       ↓
    EmailInput

Це один із способів будувати component hierarchy.

---

# Composition замість inheritance

У React зазвичай віддають перевагу composition замість класичного inheritance.

Наприклад, замість складної ієрархії:

    BaseComponent
         ↓
    UserComponent
         ↓
    AdminComponent
         ↓
    SuperAdminComponent

часто краще комбінувати прості компоненти:

    UserCard
       +
    AdminActions
       +
    Permissions

React-компоненти будуються переважно через:

    composition
    props
    children

а не через класичне:

    inheritance

---

# Composition та inheritance

Inheritance:

    Parent
      ↓
    Child
      ↓
    Grandchild

Composition:

    Component
      +
    Component
      +
    Component

React-підхід:

    combine components

замість:

    extend components

---

# Composition та reusability

Наприклад:

    function Panel({ children }) {
        return (
            <section className="panel">
                {children}
            </section>
        );
    }

Цей компонент можна використовувати для:

    UserPanel
    SettingsPanel
    ProductPanel
    StatisticsPanel

Не потрібно створювати окрему реалізацію:

    UserPanel
    SettingsPanel
    ProductPanel
    StatisticsPanel

якщо вони мають однаковий layout.

---

# Composition та abstraction

Abstraction дозволяє приховати непотрібні деталі реалізації.

Наприклад:

    function Card({ children }) {
        return (
            <article className="card">
                {children}
            </article>
        );
    }

Користувачу компонента не потрібно знати:

    border
    padding
    shadow
    background

Він просто використовує:

    <Card>
        ...
    </Card>

---

# Too Much Composition

Composition також можна використовувати надмірно.

Не потрібно робити компонент для кожного HTML-тега.

Наприклад, це може бути зайвим:

    function Title() {
        return <h1>Title</h1>;
    }

    function Text() {
        return <p>Text</p>;
    }

    function Wrapper() {
        return <div>...</div>;
    }

Надмірна кількість маленьких компонентів може погіршити читабельність.

---

# Хороший баланс

Потрібно шукати баланс між:

    reuse

та:

    simplicity

Не кожен шматок JSX повинен бути окремим компонентом.

Компонент варто виділяти, якщо він:

    має власну відповідальність
    повторно використовується
    має власну логіку
    має складну структуру
    покращує читабельність
    має власний API

---

# Component Extraction

Component extraction — винесення частини UI в окремий компонент.

До:

    function UserPage() {
        return (
            <main>
                <section>
                    <img src="/avatar.jpg" alt="User" />
                    <h2>John</h2>
                    <p>Developer</p>
                </section>
            </main>
        );
    }

Після:

    function UserCard() {
        return (
            <section>
                <img src="/avatar.jpg" alt="User" />
                <h2>John</h2>
                <p>Developer</p>
            </section>
        );
    }

    function UserPage() {
        return (
            <main>
                <UserCard />
            </main>
        );
    }

Extraction допомагає зменшити складність parent component.

---

# Composition після extraction

Після розділення:

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
            <div>
                <h2>John</h2>
                <p>Developer</p>
            </div>
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

Тепер:

    UserCard
       ↓
       ├── Avatar
       └── UserInfo

Це вже component composition.

---

# Composition та UI architecture

Composition є основою багатьох UI-архітектур.

Наприклад:

    primitives
       ↓
    reusable components
       ↓
    feature components
       ↓
    page components

Приклад:

    Button
       ↓
    UserActions
       ↓
    UserCard
       ↓
    UserPage

---

# Component Layers

Один із можливих способів мислення:

    1. Primitive components
    2. Reusable components
    3. Feature components
    4. Page components

Наприклад:

    Button
    Input
    Card

↓

    UserCard
    SearchForm
    Modal

↓

    UserDashboard
    UserSettings

↓

    DashboardPage
    SettingsPage

---

# Composition та React

React природно підтримує composition через:

    components
    props
    children
    JSX
    fragments

Основна ідея:

    UI = composition of components

Тобто складний UI будується з простіших частин.

---

# Practical Example — Card

Базовий компонент:

    function Card({ children }) {
        return (
            <article className="card">
                {children}
            </article>
        );
    }

Використання:

    function UserCard() {
        return (
            <Card>
                <h2>John</h2>
                <p>Frontend Developer</p>
            </Card>
        );
    }

Інше використання:

    function ProductCard() {
        return (
            <Card>
                <h2>Laptop</h2>
                <p>$1200</p>
            </Card>
        );
    }

Один `Card` використовується для різного UI.

---

# Practical Example — Layout

    function Layout({ children }) {
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
            <Layout>
                <h1>Home</h1>
            </Layout>
        );
    }

    function AboutPage() {
        return (
            <Layout>
                <h1>About</h1>
            </Layout>
        );
    }

Один layout використовується для різних сторінок.

---

# Practical Example — Panel

    function Panel({ children }) {
        return (
            <section className="panel">
                {children}
            </section>
        );
    }

Використання:

    function Settings() {
        return (
            <Panel>
                <h2>Settings</h2>
                <p>Account settings</p>
            </Panel>
        );
    }

    function Profile() {
        return (
            <Panel>
                <h2>Profile</h2>
                <p>User information</p>
            </Panel>
        );
    }

`Panel` відповідає за presentation/layout.

---

# Practical Example — User Card

    function Avatar({ src, alt }) {
        return (
            <img
                src={src}
                alt={alt}
            />
        );
    }

    function UserInfo({ name, role }) {
        return (
            <div>
                <h2>{name}</h2>
                <p>{role}</p>
            </div>
        );
    }

    function UserCard({ user }) {
        return (
            <article>
                <Avatar
                    src={user.avatar}
                    alt={user.name}
                />

                <UserInfo
                    name={user.name}
                    role={user.role}
                />
            </article>
        );
    }

Тут composition:

    UserCard
       ↓
       ├── Avatar
       └── UserInfo

---

# Practical Example — Flexible Card

    function Card({ children }) {
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
            </Card>
        );
    }

    function ProductCard() {
        return (
            <Card>
                <ProductImage />
                <ProductInfo />
            </Card>
        );
    }

Один `Card` підтримує різні типи контенту.

---

# Practical Example — Dashboard

    function Dashboard() {
        return (
            <PageLayout>
                <DashboardHeader />

                <DashboardContent>
                    <Statistics />
                    <RecentUsers />
                    <RecentOrders />
                </DashboardContent>
            </PageLayout>
        );
    }

Component tree:

    Dashboard
       │
       ├── PageLayout
       │
       ├── DashboardHeader
       │
       └── DashboardContent
            │
            ├── Statistics
            ├── RecentUsers
            └── RecentOrders

Складний UI побудований з простіших компонентів.

---

# Composition та state

Composition не означає, що всі компоненти повинні бути stateless.

Компонент може мати власний state:

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <button
                onClick={() => setCount(count + 1)}
            >
                {count}
            </button>
        );
    }

Його можна композиційно використовувати:

    function Dashboard() {
        return (
            <section>
                <Counter />
                <Statistics />
            </section>
        );
    }

Composition і state можуть працювати разом.

---

# Composition та events

Компонент також може отримувати event handler через props.

    function Button({ children, onClick }) {
        return (
            <button onClick={onClick}>
                {children}
            </button>
        );
    }

Використання:

    function App() {
        function handleClick() {
            console.log("Clicked");
        }

        return (
            <Button onClick={handleClick}>
                Save
            </Button>
        );
    }

`Button` відповідає за UI.

`App` визначає поведінку.

---

# Separation of UI and behavior

Composition дозволяє розділити:

    UI structure

та:

    behavior

Наприклад:

    function Button({ children, onClick }) {
        return (
            <button onClick={onClick}>
                {children}
            </button>
        );
    }

Компонент не знає, що саме робить `onClick`.

Він лише викликає переданий handler.

---

# Composition та data

Батьківський компонент може володіти даними:

    function UserPage() {
        const user = {
            name: "John",
            role: "Developer"
        };

        return (
            <UserCard user={user} />
        );
    }

`UserCard` отримує дані:

    function UserCard({ user }) {
        return (
            <Card>
                <UserInfo
                    name={user.name}
                    role={user.role}
                />
            </Card>
        );
    }

Тут:

    UserPage
       ↓ data
    UserCard
       ↓ composition
    Card + UserInfo

---

# Composition та prop drilling

Якщо компонентне дерево стає глибоким:

    App
     ↓
    Layout
     ↓
    Page
     ↓
    Section
     ↓
    UserCard
     ↓
    UserInfo

і дані передаються через багато рівнів:

    App
     ↓ props
    Layout
     ↓ props
    Page
     ↓ props
    Section
     ↓ props
    UserCard

це називається:

    prop drilling

Composition може допомогти зі структурою UI, але сама по собі не вирішує всі проблеми prop drilling.

Для shared state та глобального контексту React має:

    Context

У твоєму курсі це буде окремий розділ:

    06-context

---

# Composition vs Prop Drilling

Composition:

    визначає структуру UI

Prop drilling:

    передає дані через компоненти

Наприклад:

    <Layout>
        <UserCard user={user} />
    </Layout>

Тут `Layout` може взагалі не знати про `user`.

Це може бути простіше, ніж:

    <Layout user={user}>
        <Page user={user}>
            <Section user={user}>
                <UserCard user={user} />
            </Section>
        </Page>
    </Layout>

Composition може дозволити передати вже готовий UI вниз по дереву.

---

# Composition як передача відповідальності

Замість:

    Parent knows everything

можна побудувати:

    Parent
      ↓
    determines composition

    Child
      ↓
    handles own responsibility

Наприклад:

    function Page() {
        return (
            <Layout>
                <UserProfile />
            </Layout>
        );
    }

`Page` визначає composition.

`Layout` відповідає за layout.

`UserProfile` відповідає за profile UI.

---

# Composition та maintainability

Хороша composition допомагає:

    читати код
    змінювати код
    тестувати код
    повторно використовувати код
    локалізувати зміни

Наприклад, якщо потрібно змінити avatar:

    Avatar

зміни не повинні вимагати переписування:

    UserPage
    Dashboard
    SettingsPage

якщо вони використовують той самий `Avatar`.

---

# Composition та тестування

Малі компоненти простіше тестувати.

Наприклад:

    Button
    Avatar
    UserInfo
    UserCard

можна тестувати окремо.

Потім можна тестувати їхню composition:

    UserCard
       ↓
    Avatar + UserInfo + Button

Це полегшує локалізацію помилок.

---

# Коли НЕ потрібно створювати компонент

Не обов'язково створювати компонент, якщо:

- JSX дуже маленький;
- він не повторюється;
- немає власної логіки;
- виділення не покращує читабельність;
- компонент створює зайву абстракцію.

Наприклад:

    function Title() {
        return <h1>Hello</h1>;
    }

може бути зайвим, якщо використовується лише один раз.

Іноді простіше:

    <h1>Hello</h1>

---

# Коли варто створити компонент

Компонент варто виділити, якщо:

    UI повторюється

або:

    UI має власну відповідальність

або:

    UI має власний state

або:

    UI має власну поведінку

або:

    JSX став складним

або:

    компонент можна повторно використати

або:

    виділення покращує читабельність

---

# Typical Composition Pattern

Типовий pattern:

    function Container({ children }) {
        return (
            <div className="container">
                {children}
            </div>
        );
    }

Використання:

    <Container>
        <Header />
        <Main />
        <Footer />
    </Container>

Структура:

    Container
       ↓
    children
       ↓
    Header
    Main
    Footer

---

# Composition Pattern

Загальна модель:

    Parent
      ↓
    composition
      ↓
    Child A
    Child B
    Child C

або:

    Parent
      ↓
    children
      ↓
    arbitrary UI

---

# Composition та JSX

JSX є дуже зручним для composition.

Наприклад:

    <Page>
        <Header />
        <Main>
            <UserCard />
            <Statistics />
        </Main>
        <Footer />
    </Page>

Цей JSX фактично описує структуру UI.

Його можна читати як дерево:

    Page
      ├── Header
      ├── Main
      │    ├── UserCard
      │    └── Statistics
      └── Footer

---

# Declarative UI

React є declarative UI library.

Ми описуємо:

    що повинно бути відображено

а не покроково:

    як створити DOM

Composition добре відповідає цьому підходу.

Наприклад:

    <Page>
        <Header />
        <Content />
        <Footer />
    </Page>

Ми декларативно описуємо структуру.

---

# Composition та DOM

Важливо відрізняти:

    component tree

від:

    DOM tree

Наприклад:

    <Card>
        <UserInfo />
    </Card>

Component tree:

    Card
      ↓
    UserInfo

А всередині:

    UserInfo

може створювати:

    div
      ├── h2
      └── p

React будує DOM на основі composition компонентів.

---

# Component Composition vs HTML Nesting

HTML:

    <div>
        <header>
            <h1>Hello</h1>
        </header>

        <main>
            <p>Content</p>
        </main>
    </div>

React:

    <Page>
        <Header>
            <Title />
        </Header>

        <Main>
            <Content />
        </Main>
    </Page>

React дозволяє будувати UI на рівні компонентів, а не лише HTML-елементів.

---

# Composition та Design Systems

Composition є основою design systems.

Наприклад:

    Button
    Input
    Card
    Modal
    Stack
    Grid

можуть комбінуватися:

    <Card>
        <Stack>
            <Input />
            <Button />
        </Stack>
    </Card>

Це дозволяє створювати складний UI з reusable building blocks.

---

# Composition та UI primitives

Primitive component — невеликий reusable компонент, який використовується як building block.

Приклади:

    Button
    Input
    Text
    Stack
    Box
    Card

Наприклад:

    <Card>
        <Stack>
            <Text>
                User profile
            </Text>

            <Button>
                Edit
            </Button>
        </Stack>
    </Card>

Це composition кількох primitives.

---

# Practical Rule

Коли створюєш reusable component, запитай:

    Чи повинен цей компонент знати,
    що саме знаходиться всередині?

Якщо:

    Ні

можливо, варто використати:

    children

або:

    slot-like props

Наприклад:

    function Panel({ children }) {
        return (
            <section>
                {children}
            </section>
        );
    }

---

# Another Practical Rule

Якщо компонент має багато props типу:

    showX
    showY
    showZ
    enableX
    enableY
    compact
    variant
    mode
    type

варто перевірити, чи не стала configuration занадто складною.

Можливо, composition буде зрозумілішою:

    <Component>
        <PartA />
        <PartB />
        <PartC />
    </Component>

Це не означає, що boolean props завжди погані.

Потрібно оцінювати конкретну задачу.

---

# Composition Decision

Коли потрібно створити компонент, можна подумати:

    1. Чи повторюється UI?
           ↓
        так → component

    2. Чи має UI власну відповідальність?
           ↓
        так → component

    3. Чи потрібна гнучка структура?
           ↓
        так → composition

    4. Чи контент змінюється?
           ↓
        children / props

    5. Чи потрібні різні області?
           ↓
        slots / props

---

# Typical Mistakes

❌ Створювати один величезний компонент.

    function App() {
        // hundreds of lines
        // everything here
    }

Краще розділяти відповідальність.

---

❌ Створювати надто багато boolean props.

    showHeader
    showFooter
    showButton
    showIcon
    showAvatar

Перевірити, чи не буде composition простішою.

---

❌ Робити компонент занадто жорстким.

    function Card() {
        return (
            <article>
                <Avatar />
                <UserInfo />
            </article>
        );
    }

Якщо Card повинен бути універсальним, краще:

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

---

❌ Створювати компонент для кожного рядка JSX.

Надмірна декомпозиція також погіршує код.

---

❌ Передавати занадто багато відповідальності parent component.

Наприклад:

    Page
      ↓
    fetch data
      ↓
    validation
      ↓
    calculations
      ↓
    UI
      ↓
    events
      ↓
    styles

Краще розділяти відповідальність.

---

❌ Плутати composition із state management.

Composition визначає:

    структуру UI

а state management визначає:

    як зберігається
    та змінюється state.

---

❌ Вважати, що `children` вирішує всі проблеми.

`children` — потужний інструмент composition, але для складнішої структури можуть знадобитися:

    props
    slots
    context
    state
    callbacks

---

# Питання зі співбесіди

Що таке component composition?

Чому composition важлива в React?

Що таке component hierarchy?

Що таке parent component?

Що таке child component?

Що таке reusable component?

Що таке `children`?

Що містить `children`?

Як передати JSX через `children`?

Чим `children` відрізняється від звичайного prop?

Що таке component API?

Що таке component coupling?

Що таке separation of concerns?

Що таке single responsibility?

Що таке inversion of control?

Що таке flexible component?

Що таке composition vs configuration?

Коли composition краща за багато props?

Що таке specialization?

Чим composition відрізняється від inheritance?

Чому React віддає перевагу composition?

Як створити reusable layout?

Як створити reusable container?

Як передати компонент через prop?

Що таке slot?

Як `children` допомагає створювати reusable components?

Чи можна передати декілька children?

Чи може `children` бути компонентом?

Чи може `children` бути масивом елементів?

Як composition пов'язана з prop drilling?

Чи вирішує composition проблему global state?

Коли не потрібно створювати окремий компонент?

Як визначити відповідальність компонента?

Що таке component extraction?

Як composition допомагає maintainability?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке component.

Що таке component composition.

Parent component.

Child component.

Component tree.

Component hierarchy.

JSX composition.

Props.

`children`.

Передача JSX через `children`.

Reusable components.

Component extraction.

Single responsibility.

Separation of concerns.

Composition через:

    components
    props
    children

Розуміння:

    parent
       ↓
    child

Розуміння:

    component
       ↓
    composition
       ↓
    smaller components

---

## 🔵 Junior

Глибше розуміння:

    children
    props
    reusable components
    composition

Уміння створювати:

    reusable Card
    reusable Panel
    reusable Container
    reusable Layout

Розуміння:

    composition
    configuration

Розуміння:

    composition
    inheritance

Розуміння:

    inversion of control

Уміння зменшувати:

    boolean props
    conditional rendering
    component size

Уміння розділяти:

    layout
    content
    behavior
    data

Розуміння component API.

Розуміння component coupling.

Основи slots через props.

Основи composition для design systems.

---

## 🟠 Middle

Advanced composition patterns.

Compound components.

Slots.

Multiple slots.

Container and Presentational components.

Flexible component APIs.

Controlled composition.

Uncontrolled composition.

Component specialization.

Headless components.

Render props.

Composition vs inheritance.

Composition vs configuration.

Context + composition.

Advanced component API design.

Reducing prop drilling.

Reusable layout systems.

Design system architecture.

Component primitives.

UI abstractions.

---

## 🔴 Senior

Advanced component architecture.

Highly reusable component APIs.

Compound component architecture.

Headless UI architecture.

Inversion of control.

Advanced render props.

Context-based composition.

Polymorphic components.

Generic component APIs.

Component extensibility.

API ergonomics.

Abstraction boundaries.

Reducing coupling.

Composition trade-offs.

Design system architecture.

Component dependency graphs.

Scalable component architecture.

Balancing:

    reuse
    flexibility
    simplicity
    abstraction

Avoiding:

    over-abstraction
    under-abstraction
    prop explosion
    component coupling

---

# Міні-шпаргалка

## Component Composition

    Component A
        +
    Component B
        +
    Component C
        ↓
    Component D

Складний компонент створюється з простіших компонентів.

---

## Basic Composition

    function Page() {
        return (
            <>
                <Header />
                <Main />
                <Footer />
            </>
        );
    }

---

## children

    function Card({ children }) {
        return (
            <article>
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

## Container

    function Container({ children }) {
        return (
            <div className="container">
                {children}
            </div>
        );
    }

---

## Layout

    function Layout({ children }) {
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

## Composition + Props

    function UserCard({ user }) {
        return (
            <Card>
                <UserInfo
                    name={user.name}
                    role={user.role}
                />
            </Card>
        );
    }

---

## Slot-like props

    function Card({
        header,
        footer,
        children
    }) {
        return (
            <article>
                {header}

                <main>
                    {children}
                </main>

                {footer}
            </article>
        );
    }

---

## Configuration

    <Card
        showAvatar
        showButton
        showDescription
    />

Компонент сам вирішує структуру.

---

## Composition

    <Card>
        <Avatar />
        <UserInfo />
        <Button />
    </Card>

Батьківський JSX визначає структуру.

---

## Inversion of Control

    Container
       ↓
    controls layout

    Parent
       ↓
    controls content

---

## Composition vs inheritance

    Inheritance:

    Parent
      ↓
    Child

    Composition:

    Component
      +
    Component
      +
    Component

React переважно використовує:

    composition

---

## Component tree

    App
     ↓
    Page
     ├── Header
     ├── Main
     │    ├── UserCard
     │    └── Statistics
     └── Footer

---

## Основні правила

    component composition
        → combine components

    props
        → pass data / behavior

    children
        → pass nested UI

    container
        → provide structure

    layout
        → organize page structure

    reusable component
        → use in multiple places

    specialization
        → create specific component from generic component

---

# Головне:

• Component Composition — це побудова складного UI з простіших компонентів.

• React-компоненти можна комбінувати один з одним через JSX.

• Parent component може рендерити child components.

• Component tree описує ієрархію компонентів.

• Composition допомагає розділяти відповідальність між компонентами.

• `children` — спеціальний prop для передачі вкладеного JSX.

• Простий reusable container часто виглядає так:

    function Container({ children }) {
        return (
            <div className="container">
                {children}
            </div>
        );
    }

• Використання:

    <Container>
        <UserProfile />
    </Container>

• Composition дозволяє зробити компонент гнучким.

• Замість того щоб компонент сам вирішував, який UI показувати, можна дозволити parent component передати готовий UI.

• Це є однією з форм inversion of control.

• Багато boolean props можуть бути ознакою того, що component API став занадто складним.

• Замість:

    <Card
        showAvatar
        showInfo
        showButton
    />

можна використовувати:

    <Card>
        <Avatar />
        <UserInfo />
        <Button />
    </Card>

• Composition не означає, що props більше не потрібні.

• Props використовуються для:

    data
    behavior
    configuration
    UI slots

• `children` — лише один із способів composition.

• Для більш складного UI можна використовувати окремі props для різних частин:

    header
    footer
    sidebar
    actions
    children

• Composition допомагає створювати reusable layouts.

• Composition допомагає створювати reusable UI primitives.

• Composition добре поєднується з принципом Single Responsibility.

• Компонент повинен мати зрозумілу відповідальність.

• Не потрібно робити компонентом кожен маленький шматок JSX.

• Надмірна abstraction може бути такою ж проблемою, як і відсутність abstraction.

• Хороший компонент має баланс між:

    simplicity
    reuse
    flexibility

• React переважно використовує composition замість класичного inheritance.

• Composition допомагає зменшити coupling між компонентами.

• Хороший reusable component не повинен знати більше, ніж йому потрібно.

• Layout може відповідати за структуру:

    Header
    Main
    Footer

а content може передаватися через:

    children

• Загальна модель:

    Parent
       ↓
    composition
       ↓
    reusable components

• Найважливіша ідея:

    Build complex UI
    from simple components.

• Або ще коротше:

    Composition = combining components.

---

# Приклад для запам'ятовування

    function Card({ children }) {
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

Структура:

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
    не знає,
    що буде всередині

    UserCard
      ↓
    вирішує,
    що буде всередині

Це один із найважливіших практичних прикладів
Component Composition у React.

---

# Підсумкова модель

    Small Components
          ↓
    Composition
          ↓
    Reusable Components
          ↓
    Feature Components
          ↓
    Page Components
          ↓
    Application UI

Наприклад:

    Button
       ↓
    UserActions
       ↓
    UserCard
       ↓
    UserDashboard
       ↓
    DashboardPage

Кожен рівень використовує composition для побудови наступного рівня.

---

# Основна формула

    Component Composition

            ↓

    simple components

            +

    props

            +

    children

            +

    JSX

            ↓

    reusable components

            ↓

    complex UI