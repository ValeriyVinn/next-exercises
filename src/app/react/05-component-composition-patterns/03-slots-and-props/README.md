# 03. Slots and Props

`Slots and Props` — це патерн композиції React-компонентів, який дозволяє передавати різні частини UI в компонент через `props`.

На відміну від простого `children`, де ми передаємо один основний блок контенту, **slots** дозволяють створювати кілька незалежних "місць" для контенту.

Наприклад, компонент `Card` може мати:

- `header` — верхню частину;
- `children` — основний контент;
- `footer` — нижню частину.

Це дозволяє створювати **гнучкі та повторно використовувані компоненти**, не прив'язуючи їх до конкретного вмісту.

---

## Зміст

- [Що таке Slots and Props](#що-таке-slots-and-props)
- [Навіщо потрібен цей патерн](#навіщо-потрібен-цей-патерн)
- [Children як один slot](#children-як-один-slot)
- [Props як іменовані slots](#props-як-іменовані-slots)
- [Базовий приклад](#базовий-приклад)
- [Кілька slots](#кілька-slots)
- [Slots можуть бути React-компонентами](#slots-можуть-бути-react-компонентами)
- [Slots як ReactNode](#slots-як-reactnode)
- [Типізація slots у TypeScript](#типізація-slots-у-typescript)
- [ReactNode vs ReactElement](#reactnode-vs-reactelement)
- [Slots із props](#slots-із-props)
- [Default slots](#default-slots)
- [Умовний рендеринг slots](#умовний-рендеринг-slots)
- [Slots для layout-компонентів](#slots-для-layout-компонентів)
- [Slots для Card](#slots-для-card)
- [Slots для Modal](#slots-для-modal)
- [Slots для Page Layout](#slots-для-page-layout)
- [Передача компонентів через props](#передача-компонентів-через-props)
- [Component as a prop](#component-as-a-prop)
- [Render props і slots](#render-props-і-slots)
- [Slots vs children](#slots-vs-children)
- [Slots vs звичайні props](#slots-vs-звичайні-props)
- [Поширені помилки](#поширені-помилки)
- [Що потрібно пам'ятати](#що-потрібно-памятати)
- [Питання для співбесіди](#питання-для-співбесіди)
- [Послідовність вивчення](#послідовність-вивчення)
- [Міні-шпаргалка](#міні-шпаргалка)
- [Головне](#головне)

---

# Що таке Slots and Props

У React немає окремої конструкції `slot`, як, наприклад, у Web Components.

У React роль slots зазвичай виконують **props, які містять React-елементи або інший React-контент**.

Наприклад:

    <Card
      header={<h2>Профіль</h2>}
      footer={<button>Зберегти</button>}
    >
      <p>Інформація про користувача</p>
    </Card>

Тут:

    header

і

    footer

— це умовні **іменовані slots**.

А:

    children

— це основний, неіменований slot.

Компонент `Card` вирішує, **де саме розмістити кожен slot**.

---

# Навіщо потрібен цей патерн

Основна проблема, яку вирішують slots, — створення компонентів із **фіксованою структурою, але змінним вмістом**.

Наприклад, ми хочемо мати єдину структуру картки:

    ┌─────────────────────────────┐
    │ Header                      │
    ├─────────────────────────────┤
    │                             │
    │ Content                     │
    │                             │
    ├─────────────────────────────┤
    │ Footer                      │
    └─────────────────────────────┘

Але вміст може бути різним:

    Card #1
    Header: "Профіль"
    Content: інформація
    Footer: кнопка "Редагувати"

    Card #2
    Header: "Замовлення"
    Content: список товарів
    Footer: кнопка "Оплатити"

    Card #3
    Header: "Попередження"
    Content: текст повідомлення
    Footer: кнопка "Закрити"

Замість створення трьох різних компонентів можна створити один:

    Card

і передавати різний контент через props.

---

# Children як один slot

Найпростіший варіант композиції:

    function Card({ children }: CardProps) {
      return (
        <div className="card">
          {children}
        </div>
      );
    }

Використання:

    <Card>
      <h2>Заголовок</h2>
      <p>Текст картки</p>
    </Card>

Тут `children` — це фактично **default slot**.

Структура:

    Card
    └── children
        ├── h2
        └── p

Це базовий випадок.

---

# Props як іменовані slots

Якщо потрібно більше одного незалежного місця для контенту, можна використати звичайні props.

Наприклад:

    interface CardProps {
      header: React.ReactNode;
      children: React.ReactNode;
      footer: React.ReactNode;
    }

Компонент:

    function Card({ header, children, footer }: CardProps) {
      return (
        <article className="card">
          <header className="card__header">
            {header}
          </header>

          <div className="card__content">
            {children}
          </div>

          <footer className="card__footer">
            {footer}
          </footer>
        </article>
      );
    }

Використання:

    <Card
      header={<h2>Профіль</h2>}
      footer={<button>Редагувати</button>}
    >
      <p>Інформація про користувача.</p>
    </Card>

Можна уявляти це так:

    Card
    ├── header
    ├── children
    └── footer

---

# Базовий приклад

Розглянемо простий `Panel`.

    interface PanelProps {
      title: React.ReactNode;
      actions?: React.ReactNode;
      children: React.ReactNode;
    }

    function Panel({
      title,
      actions,
      children,
    }: PanelProps) {
      return (
        <section className="panel">
          <div className="panel__header">
            <h2>{title}</h2>

            {actions && (
              <div className="panel__actions">
                {actions}
              </div>
            )}
          </div>

          <div className="panel__body">
            {children}
          </div>
        </section>
      );
    }

Використання:

    <Panel
      title="Користувачі"
      actions={
        <button type="button">
          Додати користувача
        </button>
      }
    >
      <p>Список користувачів...</p>
    </Panel>

Тут:

    title

    actions

    children

— три різні точки композиції.

---

# Кілька slots

Коли компонент має складну структуру, можна створити декілька slots.

Наприклад:

    interface LayoutProps {
      header: React.ReactNode;
      sidebar: React.ReactNode;
      children: React.ReactNode;
      footer: React.ReactNode;
    }

    function Layout({
      header,
      sidebar,
      children,
      footer,
    }: LayoutProps) {
      return (
        <div className="layout">
          <header>
            {header}
          </header>

          <div className="layout__body">
            <aside>
              {sidebar}
            </aside>

            <main>
              {children}
            </main>
          </div>

          <footer>
            {footer}
          </footer>
        </div>
      );
    }

Використання:

    <Layout
      header={<Header />}
      sidebar={<Sidebar />}
      footer={<Footer />}
    >
      <Dashboard />
    </Layout>

Структура:

    Layout
    │
    ├── header
    │   └── Header
    │
    ├── sidebar
    │   └── Sidebar
    │
    ├── children
    │   └── Dashboard
    │
    └── footer
        └── Footer

Це вже дуже близько до реальної архітектури застосунків.

---

# Slots можуть бути React-компонентами

Slot не обов'язково повинен бути простим HTML-елементом.

Це може бути цілий React-компонент.

Наприклад:

    function UserHeader() {
      return <h2>Користувач</h2>;
    }

    function UserActions() {
      return (
        <>
          <button>Редагувати</button>
          <button>Видалити</button>
        </>
      );
    }

Тепер:

    <Panel
      title={<UserHeader />}
      actions={<UserActions />}
    >
      <UserProfile />
    </Panel>

Таким чином один компонент може комбінувати інші компоненти.

---

# Slots як ReactNode

Для більшості slots найзручніший тип:

    React.ReactNode

Наприклад:

    interface CardProps {
      header?: React.ReactNode;
      footer?: React.ReactNode;
      children: React.ReactNode;
    }

`ReactNode` дозволяє передати широкий спектр React-контенту:

    <Card header="Профіль" />

    <Card header={<h2>Профіль</h2>} />

    <Card header={<UserHeader />} />

    <Card header={null} />

Саме тому `ReactNode` зазвичай є хорошим вибором для slot props.

---

# Що може бути slot

У slot можна передати:

### Рядок

    <Card header="Профіль">
      ...
    </Card>

### Число

    <Card header={42}>
      ...
    </Card>

### JSX-елемент

    <Card header={<h2>Профіль</h2>}>
      ...
    </Card>

### React-компонент

    <Card header={<UserHeader />}>
      ...
    </Card>

### Fragment

    <Card
      header={
        <>
          <h2>Профіль</h2>
          <span>Активний</span>
        </>
      }
    >
      ...
    </Card>

### Умовний вираз

    <Card
      header={
        isAdmin
          ? <AdminHeader />
          : <UserHeader />
      }
    >
      ...
    </Card>

---

# Типізація slots у TypeScript

Для більшості випадків:

    interface PanelProps {
      title: React.ReactNode;
      actions?: React.ReactNode;
      children: React.ReactNode;
    }

Це хороший базовий варіант.

Наприклад:

    function Panel({
      title,
      actions,
      children,
    }: PanelProps) {
      return (
        <section>
          <header>
            {title}

            {actions}
          </header>

          <main>
            {children}
          </main>
        </section>
      );
    }

---

# ReactNode vs ReactElement

Це важлива різниця.

## ReactNode

    React.ReactNode

Дозволяє передавати практично будь-який контент, який React може відрендерити.

Наприклад:

    string
    number
    JSX
    React element
    fragment
    array
    null
    undefined
    boolean

Тому для звичайного slot:

    header?: React.ReactNode;

— зазвичай хороший вибір.

---

## ReactElement

    React.ReactElement

Використовується, коли ми хочемо вимагати саме React-елемент.

Наприклад:

    interface Props {
      icon: React.ReactElement;
    }

Тепер очікується саме елемент:

    <Icon />

а не просто:

    "icon"

Для більшості звичайних slots немає необхідності так сильно обмежувати тип.

---

# Slots із props

Іноді slot повинен отримувати дані від компонента-контейнера.

У такому випадку простий `ReactNode` вже недостатній.

Наприклад, ми хочемо:

    <UserList
      renderUser={(user) => (
        <UserCard user={user} />
      )}
    />

Тут `renderUser` — не звичайний slot, а **функція, яка отримує дані**.

Тип:

    interface User {
      id: number;
      name: string;
    }

    interface UserListProps {
      users: User[];
      renderUser: (user: User) => React.ReactNode;
    }

Компонент:

    function UserList({
      users,
      renderUser,
    }: UserListProps) {
      return (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {renderUser(user)}
            </li>
          ))}
        </ul>
      );
    }

Використання:

    <UserList
      users={users}
      renderUser={(user) => (
        <UserCard user={user} />
      )}
    />

Тут вже використовується **render prop pattern**.

Важливо розуміти різницю:

    children: React.ReactNode

— передає готовий UI.

    renderUser: (user) => React.ReactNode

— передає функцію, яка дозволяє компоненту передати дані назад у UI.

---

# Default slots

Slot може бути необов'язковим.

Наприклад:

    interface CardProps {
      header?: React.ReactNode;
      children: React.ReactNode;
      footer?: React.ReactNode;
    }

Тоді компонент може працювати без `header`:

    <Card>
      <p>Контент</p>
    </Card>

А всередині:

    function Card({
      header,
      children,
      footer,
    }: CardProps) {
      return (
        <article>
          {header && (
            <header>
              {header}
            </header>
          )}

          <main>
            {children}
          </main>

          {footer && (
            <footer>
              {footer}
            </footer>
          )}
        </article>
      );
    }

---

# Fallback для slot

Іноді slot має значення за замовчуванням.

Наприклад:

    interface EmptyStateProps {
      icon?: React.ReactNode;
      title?: React.ReactNode;
      children?: React.ReactNode;
    }

    function EmptyState({
      icon,
      title = "Немає даних",
      children,
    }: EmptyStateProps) {
      return (
        <section>
          {icon}

          <h2>
            {title}
          </h2>

          {children}
        </section>
      );
    }

Використання:

    <EmptyState>
      <p>Спробуйте змінити параметри пошуку.</p>
    </EmptyState>

`title` буде:

    "Немає даних"

якщо його не передали.

---

# Умовний рендеринг slots

Необов'язкові slots часто рендеряться умовно.

Наприклад:

    interface AlertProps {
      icon?: React.ReactNode;
      actions?: React.ReactNode;
      children: React.ReactNode;
    }

    function Alert({
      icon,
      actions,
      children,
    }: AlertProps) {
      return (
        <div className="alert">
          {icon && (
            <div className="alert__icon">
              {icon}
            </div>
          )}

          <div className="alert__content">
            {children}
          </div>

          {actions && (
            <div className="alert__actions">
              {actions}
            </div>
          )}
        </div>
      );
    }

Використання:

    <Alert
      icon={<WarningIcon />}
      actions={
        <button>
          Закрити
        </button>
      }
    >
      Небезпечна операція.
    </Alert>

Або без actions:

    <Alert icon={<InfoIcon />}>
      Операція виконана успішно.
    </Alert>

---

# Slots для layout-компонентів

Одна з найкорисніших областей застосування slots — layout.

Наприклад:

    interface DashboardLayoutProps {
      header: React.ReactNode;
      sidebar: React.ReactNode;
      children: React.ReactNode;
    }

    function DashboardLayout({
      header,
      sidebar,
      children,
    }: DashboardLayoutProps) {
      return (
        <div className="dashboard-layout">
          <header>
            {header}
          </header>

          <div className="dashboard-layout__body">
            <aside>
              {sidebar}
            </aside>

            <main>
              {children}
            </main>
          </div>
        </div>
      );
    }

Використання:

    <DashboardLayout
      header={<DashboardHeader />}
      sidebar={<DashboardSidebar />}
    >
      <DashboardContent />
    </DashboardLayout>

Компонент `DashboardLayout` не знає деталей:

    DashboardHeader
    DashboardSidebar
    DashboardContent

Він знає лише **місця**, де вони повинні бути розташовані.

Це одна з головних ідей композиції.

---

# Slots для Card

Розглянемо більш реальний приклад.

    interface CardProps {
      image?: React.ReactNode;
      header?: React.ReactNode;
      children: React.ReactNode;
      footer?: React.ReactNode;
    }

    function Card({
      image,
      header,
      children,
      footer,
    }: CardProps) {
      return (
        <article className="card">
          {image && (
            <div className="card__image">
              {image}
            </div>
          )}

          {header && (
            <header className="card__header">
              {header}
            </header>
          )}

          <div className="card__body">
            {children}
          </div>

          {footer && (
            <footer className="card__footer">
              {footer}
            </footer>
          )}
        </article>
      );
    }

Використання:

    <Card
      image={<img src="/avatar.jpg" alt="Користувач" />}
      header={<h2>Іван Петренко</h2>}
      footer={
        <button>
          Переглянути профіль
        </button>
      }
    >
      <p>
        Frontend Developer
      </p>

      <p>
        React, TypeScript, Next.js
      </p>
    </Card>

Тут `Card` відповідає за:

    структуру
    layout
    стилі

А батьківський компонент відповідає за:

    конкретний контент

---

# Slots для Modal

Slots особливо корисні для модальних вікон.

    interface ModalProps {
      title: React.ReactNode;
      children: React.ReactNode;
      actions?: React.ReactNode;
    }

    function Modal({
      title,
      children,
      actions,
    }: ModalProps) {
      return (
        <div className="modal">
          <div className="modal__header">
            <h2>
              {title}
            </h2>
          </div>

          <div className="modal__body">
            {children}
          </div>

          {actions && (
            <div className="modal__actions">
              {actions}
            </div>
          )}
        </div>
      );
    }

Використання:

    <Modal
      title="Видалити користувача?"
      actions={
        <>
          <button>
            Скасувати
          </button>

          <button>
            Видалити
          </button>
        </>
      }
    >
      <p>
        Цю дію неможливо скасувати.
      </p>
    </Modal>

Компонент `Modal` не знає, які саме кнопки й текст будуть використані.

---

# Slots для Page Layout

У великих застосунках slots можуть описувати структуру сторінки.

Наприклад:

    interface PageLayoutProps {
      title: React.ReactNode;
      actions?: React.ReactNode;
      breadcrumbs?: React.ReactNode;
      children: React.ReactNode;
    }

    function PageLayout({
      title,
      actions,
      breadcrumbs,
      children,
    }: PageLayoutProps) {
      return (
        <div className="page-layout">
          {breadcrumbs && (
            <div className="page-layout__breadcrumbs">
              {breadcrumbs}
            </div>
          )}

          <header className="page-layout__header">
            <h1>
              {title}
            </h1>

            {actions && (
              <div>
                {actions}
              </div>
            )}
          </header>

          <main>
            {children}
          </main>
        </div>
      );
    }

Використання:

    <PageLayout
      title="Користувачі"
      breadcrumbs={
        <Breadcrumbs />
      }
      actions={
        <button>
          Додати
        </button>
      }
    >
      <UsersTable />
    </PageLayout>

Це вже типовий підхід для dashboard/admin UI.

---

# Передача компонентів через props

Є ще один важливий варіант.

Замість готового JSX:

    icon={<SearchIcon />}

можна передати сам компонент:

    icon={SearchIcon}

Наприклад:

    interface ButtonProps {
      icon?: React.ComponentType;
      children: React.ReactNode;
    }

    function Button({
      icon: Icon,
      children,
    }: ButtonProps) {
      return (
        <button>
          {Icon && <Icon />}
          {children}
        </button>
      );
    }

Використання:

    <Button icon={SearchIcon}>
      Пошук
    </Button>

Тут передається не React-елемент:

    <SearchIcon />

а сам компонент:

    SearchIcon

Всередині `Button` він створюється:

    <Icon />

---

# Component as a prop

Такий підхід часто називають:

    Component as a prop

або:

    component prop

Наприклад:

    interface ButtonProps {
      icon?: React.ComponentType;
      children: React.ReactNode;
    }

Це корисно, коли компонент повинен сам вирішувати, **як створити або налаштувати переданий компонент**.

Наприклад:

    interface ButtonProps {
      Icon?: React.ComponentType<{ size?: number }>;
      children: React.ReactNode;
    }

    function Button({
      Icon,
      children,
    }: ButtonProps) {
      return (
        <button>
          {Icon && (
            <Icon size={18} />
          )}

          {children}
        </button>
      );
    }

Тепер:

    <Button Icon={SearchIcon}>
      Пошук
    </Button>

---

# Готовий element vs component

Це важлива відмінність.

## Готовий element

    icon={<SearchIcon size={18} />}

Компонент уже створив конкретний element.

Дитячий компонент отримує готовий UI.

---

## Component

    Icon={SearchIcon}

Компонент отримує сам тип компонента і може створити його:

    <Icon size={18} />

Це дає більше контролю компоненту-контейнеру.

---

# Render props і slots

Render prop — споріднений, але окремий патерн.

Звичайний slot:

    <UserList>
      <UserCard />
    </UserList>

або:

    <Panel
      actions={<Button>Зберегти</Button>}
    >
      ...
    </Panel>

Render prop:

    <UserList
      renderUser={(user) => (
        <UserCard user={user} />
      )}
    />

Різниця:

    slot
    ↓
    передає готовий UI

    render prop
    ↓
    передає функцію,
    яка створює UI на основі даних

Render props особливо корисні, коли контейнер володіє даними або станом, а батьківський компонент повинен вирішувати, **як ці дані відображати**.

---

# Slots vs children

`children` — це фактично один спеціальний slot.

Наприклад:

    <Card>
      <p>Контент</p>
    </Card>

Отримуємо:

    children

Якщо потрібно декілька незалежних областей:

    <Card
      header={<Header />}
      footer={<Footer />}
    >
      <Content />
    </Card>

Отримуємо:

    header
    children
    footer

Тобто:

    children
    ↓
    один основний slot

    named props
    ↓
    кілька іменованих slots

---

# Slots vs звичайні props

Не кожен prop є slot.

Наприклад:

    <User
      name="Valeriy"
      age={56}
      avatar={<Avatar />}
    />

Тут:

    name

    age

— звичайні дані.

А:

    avatar

— React-контент, тому його можна розглядати як slot.

Загальна ідея:

    data props
    ↓
    передають дані

    slot props
    ↓
    передають UI

Наприклад:

    interface UserCardProps {
      name: string;
      age: number;
      avatar?: React.ReactNode;
    }

---

# Чому slots роблять компоненти гнучкими

Поганий варіант:

    function UserCard() {
      return (
        <article>
          <img src="/avatar.jpg" />

          <h2>Valeriy</h2>

          <p>Developer</p>

          <button>
            Profile
          </button>
        </article>
      );
    }

Компонент знає занадто багато.

Він жорстко прив'язаний до:

    avatar
    name
    description
    button

Кращий варіант:

    function Card({
      header,
      children,
      footer,
    }: CardProps) {
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

Тепер `Card` відповідає лише за структуру.

---

# Принцип "структура від компонента, контент від батька"

Це один із найважливіших принципів композиції.

Компонент:

    Card

відповідає за:

    де розмістити header
    де розмістити content
    де розмістити footer
    як побудувати layout

Батьківський компонент відповідає за:

    що саме буде в header
    що саме буде в content
    що саме буде в footer

Тобто:

    Parent
       │
       │ передає UI
       ▼
    Reusable Component
       │
       │ визначає структуру
       ▼
    Rendered UI

---

# Slots і контроль layout

Дуже важливо, що slot не означає передачу повного контролю над компонентом.

Наприклад:

    <Card
      header={<h2>Профіль</h2>}
      footer={<button>Редагувати</button>}
    >
      <p>Контент</p>
    </Card>

`Card` все одно контролює:

    padding
    margin
    border
    grid
    flex
    порядок блоків
    responsive behavior

А користувач компонента контролює:

    конкретний контент

Це дозволяє поєднати:

    reusable structure
    +

    flexible content

---

# Коли використовувати slots

Slots добре підходять для:

- Card
- Modal
- Dialog
- Layout
- PageLayout
- Panel
- Alert
- Header
- Footer
- Sidebar
- Toolbar
- Table wrapper
- Form wrapper
- Dashboard widgets
- reusable UI components

Особливо коли структура компонента стабільна, а вміст змінюється.

---

# Коли slots можуть бути зайвими

Не потрібно створювати slots просто заради slots.

Наприклад:

    <User
      name="Valeriy"
      age={56}
    />

Тут звичайні props достатні.

Не обов'язково робити:

    <User
      content={
        <>
          <span>Valeriy</span>
          <span>56</span>
        </>
      }
    />

Якщо компонент повинен працювати саме з даними:

    name
    age

краще передавати дані.

А якщо потрібно передати довільний UI:

    content

може бути хорошим slot.

---

# Props для даних чи slot для UI?

Корисне правило:

Якщо компонент повинен **знати значення** — передавайте дані.

    <User
      name="Valeriy"
      age={56}
    />

Якщо компонент повинен отримати **готовий UI** — використовуйте slot.

    <User
      avatar={<Avatar />}
    />

Якщо компонент повинен отримати **спосіб побудувати UI на основі даних** — використовуйте render prop.

    <UserList
      renderUser={(user) => (
        <UserCard user={user} />
      )}
    />

---

# Поширена помилка №1 — передавати все через один children

Іноді намагаються зробити:

    <Card>
      <h2>Заголовок</h2>
      <p>Контент</p>
      <button>Дія</button>
    </Card>

А потім усередині `Card` визначати:

    перший element → header
    другий element → content
    третій element → footer

Це створює зайву залежність від структури `children`.

Краще:

    <Card
      header={<h2>Заголовок</h2>}
      footer={<button>Дія</button>}
    >
      <p>Контент</p>
    </Card>

Структура стає явною.

---

# Поширена помилка №2 — надто багато slots

Не потрібно перетворювати кожен маленький елемент на slot:

    <Card
      topLeft={...}
      topRight={...}
      middleLeft={...}
      middleRight={...}
      bottomLeft={...}
      bottomRight={...}
    />

Такий API може стати складнішим за сам компонент.

Потрібно шукати баланс між:

    flexibility

і:

    simplicity

---

# Поширена помилка №3 — використовувати ReactElement там, де достатньо ReactNode

Занадто вузько:

    interface Props {
      title: React.ReactElement;
    }

Це може бути непотрібним обмеженням.

У багатьох випадках краще:

    interface Props {
      title: React.ReactNode;
    }

Тоді можна:

    title="Профіль"

або:

    title={<h2>Профіль</h2>}

---

# Поширена помилка №4 — плутати Component і Element

Це:

    <SearchIcon />

— React element.

А це:

    SearchIcon

— компонент.

Тому:

    icon={<SearchIcon />}

і:

    Icon={SearchIcon}

— це різні API.

---

# Поширена помилка №5 — використовувати slots там, де потрібні дані

Наприклад:

    <User
      name={<span>Valeriy</span>}
    />

Якщо ім'я — це просто дані, краще:

    <User
      name="Valeriy"
    />

А вже `User` вирішує, як його показати:

    <h2>
      {name}
    </h2>

---

# Поширена помилка №6 — надмірне використання render props

Render props дуже потужні, але іноді простий slot набагато зрозуміліший.

Простіше:

    <Card
      footer={<Button>Зберегти</Button>}
    >
      ...
    </Card>

Складніше:

    <Card
      renderFooter={(state) => (
        <Button disabled={state.loading}>
          Зберегти
        </Button>
      )}
    >
      ...
    </Card>

Render prop має сенс тоді, коли компонент дійсно повинен передати дані або стан у функцію.

---

# Поширена помилка №7 — занадто сильно прив'язувати slot API до реалізації

Поганий API:

    <Card
      firstSection={...}
      secondSection={...}
      thirdSection={...}
    />

Якщо ці назви описують внутрішню реалізацію, API стає крихким.

Краще використовувати назви за призначенням:

    header
    actions
    footer
    sidebar
    children

---

# Архітектурна схема

Типова структура reusable компонента:

    Parent
       │
       ├── data props
       │
       ├── slot props
       │
       └── children
             │
             ▼
        Reusable Component
             │
             ├── Header slot
             │
             ├── Main content
             │
             └── Footer slot
             │
             ▼
          Rendered UI

Наприклад:

    <PageLayout
      title="Users"
      actions={<AddUserButton />}
      sidebar={<Sidebar />}
    >
      <UsersTable />
    </PageLayout>

Компонент `PageLayout` не повинен знати внутрішню реалізацію:

    AddUserButton
    Sidebar
    UsersTable

Він лише розміщує їх у правильних місцях.

---

# Slots і Separation of Concerns

Slots допомагають розділити відповідальність.

Компонент-контейнер:

    відповідає за структуру

Батьківський компонент:

    відповідає за конкретний UI

Компонент даних:

    відповідає за отримання даних

UI-компонент:

    відповідає за відображення

Наприклад:

    DashboardPage
         │
         ├── отримує дані
         │
         ▼
    DashboardLayout
         │
         ├── header
         ├── sidebar
         └── children
                │
                ▼
          DashboardContent

Це робить систему компонентів більш модульною.

---

# Slots і повторне використання

Припустимо, є:

    PageLayout

Його можна використати для різних сторінок:

    <PageLayout title="Користувачі">
      <UsersTable />
    </PageLayout>

    <PageLayout title="Замовлення">
      <OrdersTable />
    </PageLayout>

    <PageLayout title="Налаштування">
      <SettingsForm />
    </PageLayout>

Один layout.

Три різні сторінки.

Структура повторно використовується, контент змінюється.

---

# Slots і composition

Slots є одним із проявів головної ідеї React:

    Composition over inheritance

Замість створення великої ієрархії:

    BaseCard
      ↓
    UserCard
      ↓
    AdminUserCard
      ↓
    SpecialAdminUserCard

можна створити:

    Card

і комбінувати його з різним UI:

    <Card
      header={<UserHeader />}
      footer={<UserActions />}
    >
      <UserInfo />
    </Card>

Це робить компоненти меншими та гнучкішими.

---

# Що потрібно пам'ятати

> Slot — це не спеціальна конструкція React. Зазвичай роль slot виконує prop, який містить React-контент.

> `children` — найпростіший і найпоширеніший slot.

> Іменовані slots зазвичай реалізуються через props.

> Для UI-контенту найчастіше використовується `React.ReactNode`.

> Component prop і element prop — різні речі.

> Якщо потрібно передати дані в UI-функцію — можна використати render prop.

> Slots дозволяють відокремити структуру компонента від його конкретного вмісту.

> Не все потрібно робити slot. Якщо компонент працює з даними — передавайте дані через props.

---

# Питання для співбесіди

### 1. Що таке slot у React?

У React немає окремого `slot` API для такого патерну.

Зазвичай slot реалізується через prop, який містить React-контент.

Наприклад:

    interface Props {
      header?: React.ReactNode;
    }

---

### 2. Чим slot відрізняється від children?

`children` — спеціальний prop, який використовується для контенту між відкриваючим і закриваючим тегами компонента.

Named slots — це звичайні props:

    header
    footer
    sidebar
    actions

---

### 3. Який тип використовувати для slot?

У більшості випадків:

    React.ReactNode

---

### 4. Чим ReactNode відрізняється від ReactElement?

`ReactNode` — ширший тип для всього, що React може відрендерити.

`ReactElement` — конкретний React element.

Для звичайних slots зазвичай достатньо:

    React.ReactNode

---

### 5. Що таке Component as a prop?

Це передача самого компонента через prop:

    <Button Icon={SearchIcon}>
      Пошук
    </Button>

Усередині:

    function Button({ Icon, children }: Props) {
      return (
        <button>
          {Icon && <Icon />}
          {children}
        </button>
      );
    }

---

### 6. Чим відрізняється:

    icon={<SearchIcon />}

від:

    Icon={SearchIcon}

У першому випадку передається готовий React element.

У другому — сам компонент.

---

### 7. Що таке render prop?

Це prop-функція, яка повертає React-контент.

Наприклад:

    renderUser={(user) => (
      <UserCard user={user} />
    )}

---

### 8. Коли краще використовувати slot, а коли звичайний prop?

Якщо передаємо UI:

    avatar={<Avatar />}

Якщо передаємо дані:

    name="Valeriy"

---

### 9. Яка головна перевага slots?

Відокремлення:

    component structure

від:

    component content

---

### 10. Який принцип React добре ілюструють slots?

    Composition over inheritance

---

# Послідовність вивчення

## 🟢 Core

Спочатку потрібно впевнено знати:

    props

    children

    React.ReactNode

    component composition

    conditional rendering

---

## 🔵 Junior

Далі:

    named slots

    Card

    Modal

    Panel

    Layout

    optional slots

    default values

---

## 🟠 Middle

Потім:

    Component as a prop

    React.ComponentType

    render props

    compound components

    reusable component APIs

    separation of concerns

---

## 🔴 Senior

На більш високому рівні:

    design systems

    scalable component APIs

    flexible layout primitives

    component contracts

    API ergonomics

    composition vs configuration

    balancing flexibility and simplicity

---

# Практична вправа 1 — Card

Створити:

    Card

з props:

    header
    children
    footer

Приклад:

    <Card
      header={<h2>Профіль</h2>}
      footer={<button>Редагувати</button>}
    >
      <p>Інформація про користувача.</p>
    </Card>

---

# Практична вправа 2 — Alert

Створити:

    Alert

з props:

    icon
    children
    actions

Приклад:

    <Alert
      icon={<WarningIcon />}
      actions={<button>Закрити</button>}
    >
      Увага! Перевірте введені дані.
    </Alert>

---

# Практична вправа 3 — PageLayout

Створити:

    PageLayout

з props:

    title
    actions
    sidebar
    children

Приклад:

    <PageLayout
      title="Користувачі"
      actions={<AddUserButton />}
      sidebar={<Sidebar />}
    >
      <UsersTable />
    </PageLayout>

---

# Практична вправа 4 — Component as a prop

Створити:

    Button

який приймає:

    Icon

і дозволяє:

    <Button Icon={SearchIcon}>
      Пошук
    </Button>

---

# Практична вправа 5 — Render prop

Створити:

    UserList

з prop:

    renderUser

Приклад:

    <UserList
      users={users}
      renderUser={(user) => (
        <UserCard user={user} />
      )}
    />

---

# Міні-шпаргалка

## Простий slot

    interface Props {
      children: React.ReactNode;
    }

    function Card({ children }: Props) {
      return (
        <div>
          {children}
        </div>
      );
    }

---

## Named slot

    interface Props {
      header?: React.ReactNode;
      footer?: React.ReactNode;
      children: React.ReactNode;
    }

---

## Використання

    <Card
      header={<Header />}
      footer={<Footer />}
    >
      <Content />
    </Card>

---

## Component as a prop

    interface Props {
      Icon?: React.ComponentType;
      children: React.ReactNode;
    }

    function Button({
      Icon,
      children,
    }: Props) {
      return (
        <button>
          {Icon && <Icon />}
          {children}
        </button>
      );
    }

---

## Render prop

    interface Props {
      renderItem: (item: Item) => React.ReactNode;
    }

---

## Головне правило

    Data
      ↓
    regular props

    UI
      ↓
    slots / children

    UI + data from component
      ↓
    render props

---

# Головне

1. **Slots — це патерн, а не окремий React API.**

2. **Найпростіший slot — `children`.**

3. **Named slots зазвичай реалізуються через props.**

4. **Для UI-slots найчастіше використовуй `React.ReactNode`.**

5. **`children` підходить для основного контенту.**

6. **`header`, `footer`, `actions`, `sidebar` та інші props дозволяють створити кілька незалежних slots.**

7. **Не плутай React element із React component:**
   
       icon={<SearchIcon />}
   
       Icon={SearchIcon}

8. **Звичайні дані краще передавати як звичайні props:**
   
       name="Valeriy"
   
       age={56}

9. **Готовий UI краще передавати як slot:**
   
       avatar={<Avatar />}

10. **Якщо компонент повинен передати дані назад у функцію, використовуй render prop:**
    
        renderUser={(user) => <UserCard user={user} />}

11. **Slots дозволяють розділити структуру та контент:**
    
        reusable component
              ↓
           structure
    
        parent
              ↓
           content

12. **Основна ідея цього патерну:**
    
        Composition over inheritance

13. **Хороший reusable component повинен контролювати свою структуру, але не повинен без необхідності жорстко визначати весь свій контент.**

14. **Не роби slots заради slots.** Якщо компоненту потрібні дані — передавай дані. Якщо потрібен довільний UI — використовуй slot. Якщо потрібен UI, залежний від внутрішніх даних компонента — розглядай render prop.

15. **Мета slots — створити компоненти, які можна багаторазово використовувати, комбінуючи їх із різним UI без копіювання їхньої внутрішньої структури.**