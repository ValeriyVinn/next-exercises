# 05. Compound Components

`Compound Components` — це патерн композиції React-компонентів, у якому кілька компонентів працюють разом як **єдина логічна система**.

Замість одного великого компонента з великою кількістю props ми створюємо групу пов'язаних компонентів:

    Select
    ├── Select.Trigger
    ├── Select.List
    └── Select.Option

або:

    Tabs
    ├── Tabs.List
    ├── Tabs.Tab
    └── Tabs.Panel

Користувач компонента отримує гнучкий API:

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
        Профіль користувача
      </Tabs.Panel>

      <Tabs.Panel value="settings">
        Налаштування
      </Tabs.Panel>
    </Tabs>

Головна ідея:

    один логічний компонент
            +
    кілька пов'язаних підкомпонентів
            +
    спільний state / context
            ↓
    гнучкий component API

---

## Зміст

- [Що таке Compound Components](#що-таке-compound-components)
- [Навіщо потрібен цей патерн](#навіщо-потрібен-цей-патерн)
- [Основна ідея](#основна-ідея)
- [Простий приклад](#простий-приклад)
- [Проблема великої кількості props](#проблема-великої-кількості-props)
- [Compound Components API](#compound-components-api)
- [Статичні властивості компонента](#статичні-властивості-компонента)
- [Спільний state](#спільний-state)
- [Context у Compound Components](#context-у-compound-components)
- [Створення Tabs](#створення-tabs)
- [Tabs Context](#tabs-context)
- [Tabs.List](#tabslist)
- [Tabs.Tab](#tabstab)
- [Tabs.Panel](#tabspanel)
- [Повний приклад Tabs](#повний-приклад-tabs)
- [Controlled Compound Component](#controlled-compound-component)
- [Uncontrolled Compound Component](#uncontrolled-compound-component)
- [Compound Components з TypeScript](#compound-components-з-typescript)
- [Children та Compound Components](#children-та-compound-components)
- [Context vs props](#context-vs-props)
- [Compound Components і accessibility](#compound-components-і-accessibility)
- [Compound Components і composition](#compound-components-і-composition)
- [Приклад Accordion](#приклад-accordion)
- [Приклад Select](#приклад-select)
- [Коли використовувати патерн](#коли-використовувати-патерн)
- [Коли не використовувати патерн](#коли-не-використовувати-патерн)
- [Поширені помилки](#поширені-помилки)
- [Питання для співбесіди](#питання-для-співбесіди)
- [Послідовність вивчення](#послідовність-вивчення)
- [Міні-шпаргалка](#міні-шпаргалка)
- [Головне](#головне)

---

# Що таке Compound Components

Compound Components — це група компонентів, які:

- логічно пов'язані;
- використовуються разом;
- можуть ділити один state;
- можуть спілкуватися через Context;
- разом утворюють один reusable UI component.

Наприклад:

    <Tabs>
      <Tabs.List>
        <Tabs.Tab value="one">
          One
        </Tabs.Tab>

        <Tabs.Tab value="two">
          Two
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="one">
        First panel
      </Tabs.Panel>

      <Tabs.Panel value="two">
        Second panel
      </Tabs.Panel>
    </Tabs>

Для користувача це виглядає як один компонент:

    Tabs

але всередині він складається з:

    Tabs.List
    Tabs.Tab
    Tabs.Panel

---

# Навіщо потрібен цей патерн

Уявімо компонент `Tabs`.

Можна створити його так:

    <Tabs
      tabs={[
        {
          label: "Профіль",
          content: <Profile />,
        },
        {
          label: "Налаштування",
          content: <Settings />,
        },
      ]}
    />

Це працює.

Але структура UI повністю контролюється самим `Tabs`.

Користувач компонента не може легко змінити:

    порядок
    структуру
    додаткові елементи
    layout
    markup

Compound Components дозволяють передати структуру користувачу:

    <Tabs>
      <Tabs.List>
        ...
      </Tabs.List>

      <Tabs.Panel>
        ...
      </Tabs.Panel>
    </Tabs>

Тепер користувач контролює композицію, а `Tabs` контролює спільну логіку.

---

# Основна ідея

Головна формула:

    Parent Component
          +
    Child Components
          +
    Shared State
          ↓
    Compound Component

Наприклад:

    Tabs
      │
      ├── Tabs.List
      │
      ├── Tabs.Tab
      │
      └── Tabs.Panel

Вони виглядають як окремі компоненти, але логічно належать до однієї системи.

---

# Простий приклад

Почнемо без Context.

Створимо:

    Card
    Card.Header
    Card.Body
    Card.Footer

API:

    <Card>
      <Card.Header>
        Профіль
      </Card.Header>

      <Card.Body>
        Інформація про користувача
      </Card.Body>

      <Card.Footer>
        <button>
          Редагувати
        </button>
      </Card.Footer>
    </Card>

Це вже Compound Component API.

---

# Card як Compound Component

Базовий компонент:

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

Окремі частини:

    function CardHeader({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <header className="card__header">
          {children}
        </header>
      );
    }

    function CardBody({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <div className="card__body">
          {children}
        </div>
      );
    }

    function CardFooter({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <footer className="card__footer">
          {children}
        </footer>
      );
    }

Поки що це просто композиція.

Але ми можемо об'єднати їх в API:

    Card.Header = CardHeader;
    Card.Body = CardBody;
    Card.Footer = CardFooter;

Тепер:

    <Card>
      <Card.Header>
        Профіль
      </Card.Header>

      <Card.Body>
        Інформація
      </Card.Body>

      <Card.Footer>
        <button>
          Редагувати
        </button>
      </Card.Footer>
    </Card>

---

# Проблема великої кількості props

Без Compound Components компонент може мати:

    interface TabsProps {
      tabs: Tab[];
      activeTab: string;
      onTabChange: (value: string) => void;
      orientation: "horizontal" | "vertical";
      renderTab?: (...);
      renderPanel?: (...);
      tabClassName?: string;
      panelClassName?: string;
      ...
    }

API поступово стає складним.

Користувач повинен знати багато деталей.

Compound Components переносять частину структури в JSX:

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
        <Profile />
      </Tabs.Panel>

      <Tabs.Panel value="settings">
        <Settings />
      </Tabs.Panel>
    </Tabs>

Це часто читається природніше.

---

# Compound Components API

Добре спроєктований Compound Component має зрозумілий API.

Наприклад:

    <Accordion>
      <Accordion.Item value="one">
        <Accordion.Trigger>
          Розділ 1
        </Accordion.Trigger>

        <Accordion.Content>
          Контент 1
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>

Або:

    <Modal>
      <Modal.Trigger>
        Відкрити
      </Modal.Trigger>

      <Modal.Content>
        ...
      </Modal.Content>
    </Modal>

Або:

    <Tabs>
      <Tabs.List>
        ...
      </Tabs.List>

      <Tabs.Panel>
        ...
      </Tabs.Panel>
    </Tabs>

Такий API добре читається навіть без знання внутрішньої реалізації.

---

# Статичні властивості компонента

Один із поширених способів створення Compound Components:

    Card.Header
    Card.Body
    Card.Footer

Технічно це властивості функції-компонента.

Наприклад:

    function Card({
      children,
    }: CardProps) {
      return (
        <article>
          {children}
        </article>
      );
    }

    function CardHeader({
      children,
    }: CardSectionProps) {
      return (
        <header>
          {children}
        </header>
      );
    }

Після цього:

    Card.Header = CardHeader;

Тепер:

    <Card>
      <Card.Header>
        Заголовок
      </Card.Header>
    </Card>

---

# Типізація статичних властивостей

У TypeScript можна описати API через окремий тип.

    interface CardProps {
      children: React.ReactNode;
    }

    interface CardSectionProps {
      children: React.ReactNode;
    }

    type CardComponent = React.FC<CardProps> & {
      Header: React.FC<CardSectionProps>;
      Body: React.FC<CardSectionProps>;
      Footer: React.FC<CardSectionProps>;
    };

Тоді:

    const Card = (({
      children,
    }: CardProps) => {
      return (
        <article>
          {children}
        </article>
      );
    }) as CardComponent;

Додаємо підкомпоненти:

    Card.Header = ({
      children,
    }) => {
      return (
        <header>
          {children}
        </header>
      );
    };

    Card.Body = ({
      children,
    }) => {
      return (
        <div>
          {children}
        </div>
      );
    };

    Card.Footer = ({
      children,
    }) => {
      return (
        <footer>
          {children}
        </footer>
      );
    };

Тепер TypeScript розуміє:

    Card.Header
    Card.Body
    Card.Footer

---

# Спільний state

Найцікавіше Compound Components починаються тоді, коли підкомпоненти повинні використовувати **спільний state**.

Наприклад:

    Tabs

має state:

    activeTab

А:

    Tabs.Tab

повинен:

    знати, чи він активний
    змінювати activeTab

А:

    Tabs.Panel

повинен:

    знати, чи його panel активний

Схема:

    Tabs
      │
      ├── activeTab
      │
      ├── Tabs.List
      │
      ├── Tabs.Tab
      │
      └── Tabs.Panel

Підкомпоненти повинні мати доступ до спільного state.

Для цього дуже зручно використовувати:

    React Context

---

# Context у Compound Components

Context дозволяє передати спільний state вниз по дереву без ручного передачі props через кожен рівень.

Наприклад:

    Tabs
      │
      ▼
    TabsContext.Provider
      │
      ├── Tabs.List
      │
      │    └── Tabs.Tab
      │
      └── Tabs.Panel

`Tabs` створює state.

Context передає його.

Підкомпоненти читають Context.

---

# Створення Tabs

Почнемо з типів.

    interface TabsContextValue {
      activeValue: string;
      setActiveValue: (value: string) => void;
    }

Context:

    const TabsContext =
      createContext<TabsContextValue | null>(null);

Основний компонент:

    interface TabsProps {
      children: React.ReactNode;
      defaultValue: string;
    }

    function Tabs({
      children,
      defaultValue,
    }: TabsProps) {
      const [
        activeValue,
        setActiveValue,
      ] = useState(defaultValue);

      return (
        <TabsContext.Provider
          value={{
            activeValue,
            setActiveValue,
          }}
        >
          {children}
        </TabsContext.Provider>
      );
    }

Тепер всі дочірні компоненти всередині `Tabs` можуть отримати:

    activeValue

і:

    setActiveValue

---

# Створюємо useTabsContext

Не варто всюди писати:

    const context = useContext(TabsContext);

Зручно створити custom hook:

    function useTabsContext() {
      const context =
        useContext(TabsContext);

      if (!context) {
        throw new Error(
          "Tabs components must be used inside <Tabs>"
        );
      }

      return context;
    }

Тепер:

    const {
      activeValue,
      setActiveValue,
    } = useTabsContext();

Це робить код підкомпонентів простішим.

---

# Tabs.List

`Tabs.List` відповідає за контейнер для кнопок вкладок.

    interface TabsListProps {
      children: React.ReactNode;
    }

    function TabsList({
      children,
    }: TabsListProps) {
      return (
        <div role="tablist">
          {children}
        </div>
      );
    }

---

# Tabs.Tab

Тепер створимо окрему вкладку.

    interface TabsTabProps {
      value: string;
      children: React.ReactNode;
    }

    function TabsTab({
      value,
      children,
    }: TabsTabProps) {
      const {
        activeValue,
        setActiveValue,
      } = useTabsContext();

      const isActive =
        activeValue === value;

      return (
        <button
          type="button"
          role="tab"
          aria-selected={isActive}
          onClick={() =>
            setActiveValue(value)
          }
        >
          {children}
        </button>
      );
    }

`Tabs.Tab` не має власного state.

Він отримує state із:

    TabsContext

---

# Tabs.Panel

Тепер panel.

    interface TabsPanelProps {
      value: string;
      children: React.ReactNode;
    }

    function TabsPanel({
      value,
      children,
    }: TabsPanelProps) {
      const {
        activeValue,
      } = useTabsContext();

      if (activeValue !== value) {
        return null;
      }

      return (
        <div role="tabpanel">
          {children}
        </div>
      );
    }

Panel також використовує:

    activeValue

із Context.

---

# Повний приклад Tabs

Тепер об'єднуємо компоненти.

    type TabsComponent = React.FC<TabsProps> & {
      List: React.FC<TabsListProps>;
      Tab: React.FC<TabsTabProps>;
      Panel: React.FC<TabsPanelProps>;
    };

    const Tabs = (({
      children,
      defaultValue,
    }: TabsProps) => {
      const [
        activeValue,
        setActiveValue,
      ] = useState(defaultValue);

      return (
        <TabsContext.Provider
          value={{
            activeValue,
            setActiveValue,
          }}
        >
          {children}
        </TabsContext.Provider>
      );
    }) as TabsComponent;

Додаємо:

    Tabs.List = TabsList;
    Tabs.Tab = TabsTab;
    Tabs.Panel = TabsPanel;

Тепер можемо використовувати:

    <Tabs defaultValue="profile">
      <Tabs.List>
        <Tabs.Tab value="profile">
          Профіль
        </Tabs.Tab>

        <Tabs.Tab value="settings">
          Налаштування
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="profile">
        <h2>Профіль</h2>

        <p>
          Інформація про користувача.
        </p>
      </Tabs.Panel>

      <Tabs.Panel value="settings">
        <h2>Налаштування</h2>

        <p>
          Налаштування акаунта.
        </p>
      </Tabs.Panel>
    </Tabs>

Це класичний приклад Compound Components.

---

# Що відбувається всередині Tabs

Коли компонент рендериться:

    <Tabs defaultValue="profile">

створюється state:

    activeValue = "profile"

Context передає:

    activeValue
    setActiveValue

до:

    Tabs.Tab
    Tabs.Panel

Коли користувач натискає:

    <Tabs.Tab value="settings">

виконується:

    setActiveValue("settings")

Після цього:

    activeValue = "settings"

і:

    Tabs.Panel value="settings"

стає видимим.

---

# Схема роботи Tabs

    Tabs
      │
      │ state
      ▼
    Context
      │
      ├───────────────┐
      │               │
      ▼               ▼
    Tabs.Tab       Tabs.Panel
      │               │
      │ click         │
      ▼               │
    setActiveValue    │
      │               │
      └───────┬───────┘
              ▼
        activeValue
              │
              ▼
          re-render

Це дуже важлива модель для розуміння Compound Components.

---

# Controlled Compound Component

Compound Component може бути controlled.

Тобто батьківський компонент керує state.

Наприклад:

    const [activeTab, setActiveTab] =
      useState("profile");

    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
    >
      ...
    </Tabs>

Тоді:

    Tabs

не володіє остаточним state.

State знаходиться у parent.

---

# Controlled Tabs

Типи:

    interface TabsProps {
      value: string;
      onValueChange: (value: string) => void;
      children: React.ReactNode;
    }

Компонент:

    function Tabs({
      value,
      onValueChange,
      children,
    }: TabsProps) {
      return (
        <TabsContext.Provider
          value={{
            activeValue: value,
            setActiveValue: onValueChange,
          }}
        >
          {children}
        </TabsContext.Provider>
      );
    }

Використання:

    function Page() {
      const [tab, setTab] =
        useState("profile");

      return (
        <Tabs
          value={tab}
          onValueChange={setTab}
        >
          ...
        </Tabs>
      );
    }

Це дає батьківському компоненту повний контроль.

---

# Uncontrolled Compound Component

Uncontrolled варіант зберігає state всередині:

    function Tabs({
      defaultValue,
      children,
    }: TabsProps) {
      const [
        activeValue,
        setActiveValue,
      ] = useState(defaultValue);

      // ...
    }

Використання:

    <Tabs defaultValue="profile">
      ...
    </Tabs>

Батьківський компонент не керує:

    activeValue

Компонент самостійно керує state.

---

# Controlled vs Uncontrolled

## Controlled

    Parent
      │
      ├── value
      └── onChange
             │
             ▼
           Tabs

State контролюється parent.

---

## Uncontrolled

    Tabs
      │
      └── internal state

State контролюється самим компонентом.

---

# Коли використовувати Controlled

Controlled підхід корисний, коли батьківський компонент повинен:

- знати активний елемент;
- синхронізувати state;
- зберігати state в URL;
- реагувати на зміни;
- контролювати кілька компонентів;
- інтегрувати компонент із form/state management.

Наприклад:

    activeTab

може бути частиною URL:

    /settings?tab=security

---

# Коли використовувати Uncontrolled

Uncontrolled підхід зручний, коли компонент повинен просто працювати "з коробки".

Наприклад:

    <Accordion defaultValue="one">
      ...
    </Accordion>

Користувачу не потрібно керувати кожною зміною.

---

# Controlled + Uncontrolled

Багато reusable UI-компонентів підтримують обидва режими.

Наприклад:

    <Tabs defaultValue="profile">
      ...
    </Tabs>

або:

    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
    >
      ...
    </Tabs>

Це дає максимальну гнучкість.

---

# Compound Components з TypeScript

Один із найважливіших моментів — правильно типізувати Context.

Наприклад:

    interface TabsContextValue {
      activeValue: string;
      setActiveValue: (
        value: string
      ) => void;
    }

Створення:

    const TabsContext =
      createContext<TabsContextValue | null>(null);

Custom hook:

    function useTabsContext() {
      const context =
        useContext(TabsContext);

      if (!context) {
        throw new Error(
          "useTabsContext must be used inside Tabs"
        );
      }

      return context;
    }

Тепер TypeScript знає:

    context.activeValue

    context.setActiveValue

без використання:

    any

---

# Чому Context часто використовується

Уявімо:

    Tabs
      │
      └── div
           │
           └── Tabs.List
                │
                └── Tabs.Tab

Якщо передавати state через props:

    Tabs
      ↓
    div
      ↓
    Tabs.List
      ↓
    Tabs.Tab

доведеться передавати props через проміжні компоненти.

Це називається:

    prop drilling

Context дозволяє:

    Tabs
      ↓
    Context
      ↓
    Tabs.Tab

без передачі props через кожен рівень.

---

# Children та Compound Components

Compound Components часто використовують:

    children

для декларативної структури.

Наприклад:

    <Accordion>
      <Accordion.Item>
        <Accordion.Trigger>
          Питання
        </Accordion.Trigger>

        <Accordion.Content>
          Відповідь
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>

Батьківський компонент отримує:

    children

і через Context забезпечує спільний state.

---

# Чому JSX API зручний

Порівняймо два варіанти.

## Configuration API

    <Tabs
      tabs={[
        {
          value: "profile",
          label: "Профіль",
          content: <Profile />,
        },
        {
          value: "settings",
          label: "Налаштування",
          content: <Settings />,
        },
      ]}
    />

## Compound API

    <Tabs defaultValue="profile">
      <Tabs.List>
        <Tabs.Tab value="profile">
          Профіль
        </Tabs.Tab>

        <Tabs.Tab value="settings">
          Налаштування
        </Tabs.Tab>
      </Tabs.List>

      <Tabs.Panel value="profile">
        <Profile />
      </Tabs.Panel>

      <Tabs.Panel value="settings">
        <Settings />
      </Tabs.Panel>
    </Tabs>

Другий варіант явно показує структуру UI.

---

# Compound Components і composition

Цей патерн є прямим продовженням ідеї:

    Composition over inheritance

Замість:

    HugeTabsComponent

ми маємо:

    Tabs
    Tabs.List
    Tabs.Tab
    Tabs.Panel

Користувач може комбінувати їх.

Наприклад:

    <Tabs>
      <Tabs.List>
        ...
      </Tabs.List>

      <div className="extra-content">
        ...
      </div>

      <Tabs.Panel>
        ...
      </Tabs.Panel>
    </Tabs>

У користувача більше контролю над структурою.

---

# Приклад Accordion

Accordion — один із найкращих прикладів Compound Components.

API:

    <Accordion>
      <Accordion.Item value="one">
        <Accordion.Trigger>
          Що таке React?
        </Accordion.Trigger>

        <Accordion.Content>
          Бібліотека для створення UI.
        </Accordion.Content>
      </Accordion.Item>

      <Accordion.Item value="two">
        <Accordion.Trigger>
          Що таке component?
        </Accordion.Trigger>

        <Accordion.Content>
          Незалежна частина UI.
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>

Спільний state:

    openItem

`Accordion.Trigger` змінює його.

`Accordion.Content` читає його.

Схема:

    Accordion
       │
       ├── openItem
       │
       ├── Item
       │    ├── Trigger
       │    └── Content
       │
       └── Item
            ├── Trigger
            └── Content

---

# Accordion Context

Тип:

    interface AccordionContextValue {
      openValue: string | null;
      setOpenValue: (
        value: string | null
      ) => void;
    }

Context:

    const AccordionContext =
      createContext<
        AccordionContextValue | null
      >(null);

Hook:

    function useAccordionContext() {
      const context =
        useContext(AccordionContext);

      if (!context) {
        throw new Error(
          "Accordion components must be used inside Accordion"
        );
      }

      return context;
    }

---

# Accordion Item Context

У складніших компонентах може бути кілька рівнів Context.

Наприклад:

    Accordion Context
        ↓
    Item Context
        ↓
    Trigger
        ↓
    Content

`Accordion` може керувати загальним state.

`Accordion.Item` може передавати:

    value
    disabled

своїм дочірнім компонентам.

Це дозволяє створювати дуже гнучкі API.

---

# Приклад Select

Ще один типовий Compound Component:

    <Select>
      <Select.Trigger>
        Виберіть країну
      </Select.Trigger>

      <Select.Content>
        <Select.Option value="ua">
          Україна
        </Select.Option>

        <Select.Option value="pl">
          Польща
        </Select.Option>

        <Select.Option value="de">
          Німеччина
        </Select.Option>
      </Select.Content>
    </Select>

Спільний state:

    selectedValue
    open

`Select.Trigger` змінює:

    open

`Select.Option` змінює:

    selectedValue

`Select.Content` читає:

    open

Context об'єднує їх в одну систему.

---

# Compound Components і accessibility

Compound Components часто використовуються для складних доступних UI:

    Tabs
    Accordion
    Dialog
    Menu
    Select
    Tooltip
    RadioGroup

У таких компонентах важливо правильно працювати з:

    role
    aria-selected
    aria-controls
    aria-expanded
    aria-labelledby
    keyboard navigation
    focus

Наприклад Tabs:

    <button
      role="tab"
      aria-selected={isActive}
    >
      Профіль
    </button>

А panel:

    <div
      role="tabpanel"
    >
      ...
    </div>

Compound Components дозволяють централізовано керувати такою поведінкою.

---

# Важливо: accessibility — це не лише Context

Context вирішує:

    state sharing

але не автоматично:

    accessibility

Якщо створюєш:

    Tabs
    Accordion
    Select
    Dialog

потрібно окремо продумати:

    keyboard navigation
    focus management
    ARIA
    semantic HTML

---

# Поширена помилка №1 — Context використовується без необхідності

Не кожен Compound Component потребує Context.

Наприклад:

    <Card>
      <Card.Header />
      <Card.Body />
      <Card.Footer />
    </Card>

може працювати без Context.

Context потрібен, коли компоненти повинні ділити:

    state
    actions
    configuration

---

# Поширена помилка №2 — занадто багато Context

Не потрібно створювати Context для кожної дрібної властивості.

Погано:

    ThemeContext
    ColorContext
    SizeContext
    BorderContext
    PaddingContext
    ...
    
для одного маленького компонента.

Краще мати зрозумілий state/context API.

---

# Поширена помилка №3 — підкомпонент використовується поза Parent

Наприклад:

    <Tabs.Tab value="profile">
      Профіль
    </Tabs.Tab>

без:

    <Tabs>

Якщо `Tabs.Tab` використовує Context, це помилка.

Тому custom hook повинен перевіряти Context:

    if (!context) {
      throw new Error(
        "Tabs.Tab must be used inside Tabs"
      );
    }

Це значно полегшує пошук помилки.

---

# Поширена помилка №4 — Context містить занадто багато даних

Не варто перетворювати Context на величезний global state:

    {
      activeTab,
      users,
      products,
      theme,
      auth,
      settings,
      ...
    }

Compound Component Context повинен містити state, необхідний саме цій системі компонентів.

Наприклад:

    {
      activeValue,
      setActiveValue
    }

для Tabs — достатньо.

---

# Поширена помилка №5 — Compound Component стає занадто складним

Погано, коли:

    <Component>
      <Component.Header>
        <Component.Title>
          ...
        </Component.Title>

        <Component.Actions>
          <Component.Action>
            ...
          </Component.Action>
        </Component.Actions>
      </Component.Header>

      <Component.Body>
        ...
      </Component.Body>

      ...
    </Component>

перетворюється на величезну систему без реальної потреби.

Потрібно створювати API настільки складним, наскільки цього потребує задача.

---

# Поширена помилка №6 — використовувати Compound Components для простого UI

Якщо компоненту достатньо:

    <Button
      icon={<SearchIcon />}
      variant="primary"
    >
      Пошук
    </Button>

не потрібно створювати:

    <Button>
      <Button.Icon />
      <Button.Label />
    </Button>

Compound Components найбільш корисні для **системи взаємопов'язаних компонентів**, а не просто для поділу розмітки.

---

# Поширена помилка №7 — неправильний state ownership

Потрібно чітко вирішити:

    хто володіє state?

Варіанти:

    Parent
       ↓
    controlled

або:

    Compound Component
       ↓
    uncontrolled

Невдале змішування цих підходів може створити складну поведінку.

---

# Compound Components vs Props

Звичайний API:

    <Tabs
      activeTab="profile"
      tabs={tabs}
      onChange={setTab}
    />

Compound API:

    <Tabs defaultValue="profile">
      <Tabs.List>
        ...
      </Tabs.List>

      <Tabs.Panel>
        ...
      </Tabs.Panel>
    </Tabs>

Props API більше схожий на:

    configuration

Compound API більше схожий на:

    composition

---

# Compound Components vs Slots

Slots:

    <Card
      header={<Header />}
      footer={<Footer />}
    >
      <Content />
    </Card>

Compound Components:

    <Tabs>
      <Tabs.List>
        ...
      </Tabs.List>

      <Tabs.Panel>
        ...
      </Tabs.Panel>
    </Tabs>

Slots передають UI через props.

Compound Components створюють **систему взаємопов'язаних компонентів**, які можуть мати спільний state.

---

# Compound Components vs Render Props

Render prop:

    <DataList
      renderItem={(item) => (
        <Item item={item} />
      )}
    />

Compound Components:

    <Tabs>
      <Tabs.List>
        ...
      </Tabs.List>

      <Tabs.Panel>
        ...
      </Tabs.Panel>
    </Tabs>

Render prop передає:

    function

Compound Components передають:

    component structure
    +
    shared behavior

---

# Коли використовувати Compound Components

Патерн добре підходить для:

- Tabs
- Accordion
- Select
- Menu
- Dropdown
- Dialog
- Modal
- Form groups
- Radio groups
- Checkbox groups
- Navigation
- Table
- Carousel
- Stepper
- Wizard
- reusable design-system components

Особливо якщо кілька компонентів повинні працювати як одна система.

---

# Коли не використовувати Compound Components

Не варто використовувати патерн, якщо:

- компонент дуже простий;
- немає спільного state;
- немає взаємодії між підкомпонентами;
- звичайних props достатньо;
- API стає складнішим за задачу;
- Context додає більше складності, ніж користі.

---

# Compound Components і Design Systems

Compound Components дуже часто зустрічаються в UI libraries та design systems.

Наприклад, компонент може мати API:

    Dialog
    Dialog.Trigger
    Dialog.Content
    Dialog.Title
    Dialog.Description
    Dialog.Close

Користувач отримує зрозумілий API, але сама бібліотека контролює:

    state
    accessibility
    keyboard interaction
    focus
    positioning

Це один із найсильніших варіантів застосування патерну.

---

# Compound Components і reusable API

Добрий Compound Component повинен мати API, який читається природно.

Наприклад:

    <Dialog>
      <Dialog.Trigger>
        Відкрити
      </Dialog.Trigger>

      <Dialog.Content>
        <Dialog.Title>
          Видалити?
        </Dialog.Title>

        <Dialog.Description>
          Цю дію не можна скасувати.
        </Dialog.Description>

        <Dialog.Close>
          Скасувати
        </Dialog.Close>
      </Dialog.Content>
    </Dialog>

Навіть не знаючи реалізації, можна приблизно зрозуміти структуру.

Це називається хорошою **component API ergonomics**.

---

# Архітектурна схема

Типова архітектура:

    Compound Root
          │
          ├── створює state
          │
          ├── створює Context
          │
          └── Provider
                │
                ├── Child A
                │
                ├── Child B
                │
                └── Child C
                       │
                       ▼
                  shared state

Наприклад:

    Tabs
      │
      ├── activeValue
      │
      └── TabsContext
             │
             ├── Tabs.List
             │
             ├── Tabs.Tab
             │
             └── Tabs.Panel

---

# Типовий шаблон Compound Component

    interface ComponentContextValue {
      // shared state
      // shared actions
    }

    const ComponentContext =
      createContext<ComponentContextValue | null>(
        null
      );

    function useComponentContext() {
      const context =
        useContext(ComponentContext);

      if (!context) {
        throw new Error(
          "Component parts must be used inside Component"
        );
      }

      return context;
    }

Root component:

    function Component({
      children,
    }: Props) {
      // state

      return (
        <ComponentContext.Provider
          value={...}
        >
          {children}
        </ComponentContext.Provider>
      );
    }

Subcomponents:

    function Component.Part({
      children,
    }: Props) {
      const context =
        useComponentContext();

      return (
        ...
      );
    }

API:

    Component.Part = Part;

---

# Практична вправа 1 — Card

Створи:

    Card
    Card.Header
    Card.Body
    Card.Footer

Використання:

    <Card>
      <Card.Header>
        Профіль
      </Card.Header>

      <Card.Body>
        Інформація
      </Card.Body>

      <Card.Footer>
        <button>
          Редагувати
        </button>
      </Card.Footer>
    </Card>

Спочатку реалізуй без Context.

---

# Практична вправа 2 — Accordion

Створи:

    Accordion
    Accordion.Item
    Accordion.Trigger
    Accordion.Content

Використання:

    <Accordion defaultValue="one">
      <Accordion.Item value="one">
        <Accordion.Trigger>
          Питання 1
        </Accordion.Trigger>

        <Accordion.Content>
          Відповідь 1
        </Accordion.Content>
      </Accordion.Item>
    </Accordion>

Використай:

    Context
    useState
    children

---

# Практична вправа 3 — Tabs

Створи:

    Tabs
    Tabs.List
    Tabs.Tab
    Tabs.Panel

State:

    activeValue

API:

    <Tabs defaultValue="profile">
      ...
    </Tabs>

Потім додай:

    controlled mode

---

# Практична вправа 4 — Select

Створи:

    Select
    Select.Trigger
    Select.Content
    Select.Option

State:

    open
    selectedValue

Це вже хороший рівень практики.

---

# Практична вправа 5 — Dialog

Створи:

    Dialog
    Dialog.Trigger
    Dialog.Content
    Dialog.Title
    Dialog.Close

State:

    open

Потім додай:

    controlled mode

---

# Питання для співбесіди

### 1. Що таке Compound Components?

Це група пов'язаних React-компонентів, які разом утворюють одну логічну систему та можуть ділити state і behavior.

---

### 2. Навіщо потрібен Compound Components pattern?

Щоб створювати гнучкі component APIs без величезної кількості props.

---

### 3. Наведи приклад Compound Component.

Наприклад:

    Tabs
    Tabs.List
    Tabs.Tab
    Tabs.Panel

---

### 4. Як Compound Components можуть ділитися state?

Найчастіше через:

    React Context

---

### 5. Навіщо потрібен Context?

Щоб підкомпоненти могли отримати спільний state та actions без prop drilling.

---

### 6. Що таке prop drilling?

Передача props через компоненти, які самі ці дані не використовують.

Наприклад:

    Parent
      ↓ props
    Wrapper
      ↓ props
    AnotherWrapper
      ↓ props
    Child

Context може прибрати таку необхідність.

---

### 7. Чи обов'язково Compound Components використовують Context?

Ні.

Context — лише один із способів організувати shared state.

Прості Compound Components можуть працювати без Context.

---

### 8. Що таке controlled Compound Component?

Компонент, state якого контролює зовнішній parent:

    value
    +
    onValueChange

---

### 9. Що таке uncontrolled Compound Component?

Компонент, який сам зберігає свій внутрішній state.

---

### 10. Чому Compound Components кращі за великий список props?

Вони дозволяють перенести структуру UI в JSX і зробити API більш декларативним.

---

### 11. Чим Compound Components відрізняються від slots?

Slots передають окремі частини UI через props.

Compound Components створюють систему взаємопов'язаних компонентів.

---

### 12. Чим Compound Components відрізняються від render props?

Render props передають функцію для створення UI.

Compound Components дозволяють створити композицію пов'язаних компонентів зі спільною поведінкою.

---

### 13. Наведи приклади Compound Components із реального UI.

    Tabs
    Accordion
    Select
    Dialog
    Menu
    Dropdown
    RadioGroup

---

### 14. Чому Compound Components добре підходять для Design Systems?

Тому що вони дозволяють приховати складну поведінку та надати користувачу зрозумілий і гнучкий API.

---

# Послідовність вивчення

## 🟢 Core

Спочатку потрібно добре знати:

    props
    children
    composition
    state
    events
    Context

---

## 🔵 Junior

Потім:

    compound components
    static component properties
    shared state
    Context
    custom hooks
    Tabs
    Accordion

---

## 🟠 Middle

Далі:

    controlled/uncontrolled components
    component API design
    accessibility
    reusable UI primitives
    compound components + TypeScript
    custom hooks
    design systems

---

## 🔴 Senior

На більш високому рівні:

    scalable component APIs
    accessibility architecture
    state ownership
    controlled/uncontrolled patterns
    headless components
    design systems
    API ergonomics
    performance
    composition architecture

---

# Міні-шпаргалка

## Простий Compound Component

    <Card>
      <Card.Header>
        Заголовок
      </Card.Header>

      <Card.Body>
        Контент
      </Card.Body>

      <Card.Footer>
        Footer
      </Card.Footer>
    </Card>

---

## Основний компонент

    function Card({
      children,
    }: Props) {
      return (
        <article>
          {children}
        </article>
      );
    }

---

## Subcomponent

    function CardHeader({
      children,
    }: Props) {
      return (
        <header>
          {children}
        </header>
      );
    }

---

## API

    Card.Header = CardHeader;

---

## Shared state

    const [activeValue, setActiveValue] =
      useState("profile");

---

## Context

    const TabsContext =
      createContext<TabsContextValue | null>(
        null
      );

---

## Custom hook

    function useTabsContext() {
      const context =
        useContext(TabsContext);

      if (!context) {
        throw new Error(
          "Must be used inside Tabs"
        );
      }

      return context;
    }

---

## Controlled

    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
    >
      ...
    </Tabs>

---

## Uncontrolled

    <Tabs
      defaultValue="profile"
    >
      ...
    </Tabs>

---

## Основна схема

    Root
      │
      ├── state
      │
      ├── Context
      │
      └── children
             │
             ├── Child A
             ├── Child B
             └── Child C

---

# Головне

1. **Compound Components — це група пов'язаних компонентів, які разом утворюють одну логічну систему.**

2. **Приклад:**

       Tabs
       ├── Tabs.List
       ├── Tabs.Tab
       └── Tabs.Panel

3. **Головна перевага — гнучкий і декларативний component API.**

4. **Замість величезної кількості props структура компонента переноситься в JSX.**

5. **Підкомпоненти можуть мати спільний state.**

6. **Для shared state часто використовується React Context.**

7. **Root component зазвичай володіє state:**

       Tabs
         ↓
       activeValue

8. **Child components використовують цей state:**

       Tabs.Tab
       Tabs.Panel

9. **`useContext` + custom hook — зручний спосіб організувати доступ до shared state.**

10. **Обов'язково перевіряй Context:**

        if (!context) {
          throw new Error(
            "Component must be used inside Root"
          );
        }

11. **Compound Components можуть бути controlled:**

        value
        onValueChange

12. **Compound Components можуть бути uncontrolled:**

        defaultValue

13. **Не кожен Compound Component потребує Context.**

14. **Не кожен UI-компонент потрібно робити Compound Component.**

15. **Compound Components особливо корисні для складних UI-систем:**

        Tabs
        Accordion
        Select
        Dialog
        Menu
        Dropdown

16. **Compound Components добре поєднуються з:**

        Context
        Custom Hooks
        TypeScript
        Accessibility
        Composition

17. **Патерн особливо корисний при створенні reusable components і design systems.**

18. **Найважливіше — не запам'ятати синтаксис `Component.SubComponent`, а зрозуміти модель:**

        Root Component
              ↓
        shared state / behavior
              ↓
        Context
              ↓
        related child components
              ↓
        flexible UI

19. **Головна ідея Compound Components:**

        один логічний компонент
                 +
        кілька пов'язаних частин
                 +
        спільна поведінка
                 ↓
        гнучкий reusable API

20. **І ще одна ключова формула:**

        Composition
             +
        Shared State
             +
        Context
             ↓
        Compound Components