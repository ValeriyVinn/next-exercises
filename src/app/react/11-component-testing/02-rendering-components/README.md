# 02. Rendering Components

Rendering components — це процес перевірки того, як React-компонент створює та відображає UI під час тестування.

У component testing зазвичай потрібно перевірити:

    чи компонент рендериться;
    чи відображається правильний текст;
    чи присутні потрібні elements;
    чи передаються та відображаються props;
    чи працює conditional rendering;
    чи правильно рендеряться списки;
    чи відображаються children;
    чи правильно працюють default values;
    чи змінюється UI після зміни props або state;
    чи відображаються loading / error / empty states.

Основний інструмент для rendering React-компонентів у тестах:

    render()

Найчастіше використовується разом із:

    screen
    getByRole()
    getByText()
    getByLabelText()
    queryBy...
    findBy...
    expect()

---

### Ключові поняття

✔ rendering  
✔ render()  
✔ rendered DOM  
✔ component  
✔ props  
✔ children  
✔ default props  
✔ conditional rendering  
✔ list rendering  
✔ fragments  
✔ semantic HTML  
✔ accessibility roles  
✔ screen  
✔ query  
✔ getByRole()  
✔ getByText()  
✔ getByLabelText()  
✔ getByTestId()  
✔ getBy...  
✔ queryBy...  
✔ findBy...  
✔ getAllBy...  
✔ queryAllBy...  
✔ findAllBy...  
✔ DOM  
✔ virtual DOM  
✔ test environment  
✔ jsdom  
✔ React Testing Library  
✔ assertion  
✔ matcher  
✔ snapshot  
✔ rerender()  
✔ cleanup  
✔ component output  
✔ user-visible behavior  

---

### Що потрібно пам'ятати

• `render()` рендерить React-компонент у test environment.

• Після `render()` можна шукати elements через `screen`.

• React Testing Library дозволяє тестувати rendered UI через DOM queries.

• Краще перевіряти те, що бачить користувач, а не внутрішню реалізацію компонента.

• `getByRole()` часто є найкращим способом знайти accessible element.

• `getByText()` використовується для пошуку текстового content.

• `getByLabelText()` особливо корисний для form controls.

• `getByTestId()` — запасний варіант, коли semantic query не підходить.

• `getBy...` очікує, що element існує.

• `queryBy...` дозволяє перевірити, що element відсутній.

• `findBy...` використовується для asynchronous rendering.

• `getAllBy...` шукає декілька elements.

• Props можна передавати компоненту під час `render()`.

• Children можна передавати через JSX.

• Conditional rendering потрібно тестувати для різних умов.

• List rendering потрібно тестувати як набір користувацьких elements.

• `rerender()` дозволяє повторно відрендерити компонент з іншими props.

• Тест повинен перевіряти meaningful UI behavior.

• Не потрібно перевіряти кожен `div`, `className` або внутрішню DOM-структуру без необхідності.

---

# Що таке Rendering

Rendering — процес, під час якого React перетворює component tree на UI.

Наприклад:

    function Greeting() {
        return <h1>Hello!</h1>;
    }

Під час rendering React створює відповідний DOM:

    <h1>Hello!</h1>

У тесті ми можемо перевірити результат rendering.

---

# render()

React Testing Library надає:

    render()

Для рендерингу компонента:

    render(<Greeting />);

Після цього компонент доступний у test DOM.

---

# Basic Rendering Test

Компонент:

    function Greeting() {
        return <h1>Hello!</h1>;
    }

Тест:

    import {
        render,
        screen
    } from "@testing-library/react";

    import {
        test,
        expect
    } from "vitest";

    test("renders greeting", () => {
        render(<Greeting />);

        expect(
            screen.getByRole("heading", {
                name: "Hello!"
            })
        ).toBeInTheDocument();
    });

---

# Rendering Flow

Типовий flow:

    render(<Component />)
            ↓
       React renders
            ↓
       test DOM
            ↓
         screen
            ↓
         query
            ↓
       assertion

Наприклад:

    render(<Greeting />);

        ↓

    screen.getByRole("heading");

        ↓

    expect(element)
        .toBeInTheDocument();

---

# Rendered DOM

Після:

    render(<Greeting />);

React Testing Library створює DOM representation компонента.

Наприклад:

    function Greeting() {
        return (
            <main>
                <h1>Hello!</h1>
                <p>Welcome.</p>
            </main>
        );
    }

Rendered DOM концептуально:

    <main>
        <h1>Hello!</h1>
        <p>Welcome.</p>
    </main>

Тест може працювати з цим DOM через:

    screen

---

# screen

`screen` дозволяє знаходити elements у rendered DOM.

Наприклад:

    render(<Greeting />);

    const heading =
        screen.getByRole("heading");

    expect(heading)
        .toBeInTheDocument();

---

# screen vs container

React Testing Library повертає object від `render()`.

Наприклад:

    const { container } =
        render(<Greeting />);

Можна звернутися до:

    container

Але в більшості звичайних тестів краще використовувати:

    screen

Наприклад:

    screen.getByRole("heading");

замість:

    container.querySelector("h1");

Причина — `screen` заохочує використовувати user-oriented queries.

---

# getByRole()

`getByRole()` шукає element за accessibility role.

Наприклад:

    <button>Save</button>

Тест:

    screen.getByRole("button");

Ще краще:

    screen.getByRole("button", {
        name: "Save"
    });

---

# Heading

Для:

    <h1>Hello</h1>

можна використовувати:

    screen.getByRole("heading", {
        name: "Hello"
    });

---

# Link

Для:

    <a href="/about">
        About
    </a>

тест:

    screen.getByRole("link", {
        name: "About"
    });

---

# Button

Для:

    <button>
        Save
    </button>

тест:

    screen.getByRole("button", {
        name: "Save"
    });

---

# Checkbox

Для:

    <input
        type="checkbox"
        aria-label="Accept terms"
    />

тест:

    screen.getByRole("checkbox", {
        name: "Accept terms"
    });

---

# Textbox

Для:

    <label htmlFor="email">
        Email
    </label>

    <input
        id="email"
        type="email"
    />

можна використовувати:

    screen.getByRole("textbox", {
        name: "Email"
    });

або:

    screen.getByLabelText("Email");

---

# getByText()

Можна шукати текст:

    function Message() {
        return <p>Hello, John!</p>;
    }

Тест:

    render(<Message />);

    expect(
        screen.getByText("Hello, John!")
    ).toBeInTheDocument();

---

# getByLabelText()

Особливо корисний для form controls.

Компонент:

    function EmailField() {
        return (
            <label htmlFor="email">
                Email

                <input
                    id="email"
                    type="email"
                />
            </label>
        );
    }

Тест:

    render(<EmailField />);

    expect(
        screen.getByLabelText("Email")
    ).toBeInTheDocument();

---

# getByPlaceholderText()

Наприклад:

    <input
        placeholder="Enter email"
    />

Тест:

    screen.getByPlaceholderText(
        "Enter email"
    );

Але placeholder не повинен замінювати accessible label.

Краще:

    <label htmlFor="email">
        Email
    </label>

    <input
        id="email"
        placeholder="Enter email"
    />

і:

    screen.getByLabelText("Email");

---

# getByAltText()

Для images:

    <img
        src="/avatar.jpg"
        alt="John"
    />

Тест:

    screen.getByAltText("John");

Або часто можна використовувати role:

    screen.getByRole("img", {
        name: "John"
    });

---

# getByTestId()

Можна додати:

    data-testid

Наприклад:

    <div data-testid="profile">
        Profile
    </div>

Тест:

    screen.getByTestId("profile");

Але `data-testid` не повинен бути основним способом пошуку elements.

Переважно використовувати:

    getByRole()
    getByLabelText()
    getByText()

---

# Query Priority

Для rendering tests корисно пам'ятати приблизний порядок:

    1. getByRole()
    2. getByLabelText()
    3. getByPlaceholderText()
    4. getByText()
    5. getByDisplayValue()
    6. getByAltText()
    7. getByTitle()
    8. getByTestId()

Головний принцип:

    use the query that best matches
    how the user finds the element

---

# getBy

`getBy` використовується, коли element повинен існувати.

Наприклад:

    render(<Greeting />);

    const heading =
        screen.getByRole("heading");

Якщо heading відсутній:

    test fails

---

# queryBy

`queryBy` корисний для перевірки відсутності.

Наприклад:

    render(<Greeting />);

    expect(
        screen.queryByRole("alert")
    ).not.toBeInTheDocument();

Якщо alert немає:

    queryByRole()
        ↓
    null

---

# findBy

`findBy` використовується для asynchronous rendering.

Наприклад:

    render(<UserProfile />);

    const user =
        await screen.findByText("John");

Тобто:

    getBy
        → search now

    queryBy
        → search now, may return null

    findBy
        → wait for async appearance

---

# Multiple Elements

Якщо component рендерить декілька однакових elements:

    getAllBy...
    queryAllBy...
    findAllBy...

Наприклад:

    <ul>
        <li>Apple</li>
        <li>Banana</li>
        <li>Orange</li>
    </ul>

Тест:

    const items =
        screen.getAllByRole("listitem");

    expect(items)
        .toHaveLength(3);

---

# getAllByRole()

Наприклад:

    render(
        <ul>
            <li>Apple</li>
            <li>Banana</li>
            <li>Orange</li>
        </ul>
    );

    const items =
        screen.getAllByRole("listitem");

    expect(items)
        .toHaveLength(3);

---

# queryAllByRole()

Якщо elements можуть бути відсутні:

    const items =
        screen.queryAllByRole("listitem");

Якщо нічого немає:

    []

---

# findAllByRole()

Для asynchronous rendering:

    const items =
        await screen.findAllByRole(
            "listitem"
        );

---

# Rendering Props

Props можна передати під час rendering.

Компонент:

    function Greeting({ name }) {
        return (
            <h1>
                Hello, {name}!
            </h1>
        );
    }

Тест:

    render(
        <Greeting name="John" />
    );

    expect(
        screen.getByRole("heading", {
            name: "Hello, John!"
        })
    ).toBeInTheDocument();

---

# Testing Different Props

Компонент:

    function Status({ isOnline }) {
        return (
            <p>
                {isOnline
                    ? "Online"
                    : "Offline"}
            </p>
        );
    }

Тест:

    test("renders online state", () => {
        render(
            <Status isOnline={true} />
        );

        expect(
            screen.getByText("Online")
        ).toBeInTheDocument();
    });

Другий:

    test("renders offline state", () => {
        render(
            <Status isOnline={false} />
        );

        expect(
            screen.getByText("Offline")
        ).toBeInTheDocument();
    });

---

# Default Props

Компонент:

    function Greeting({
        name = "Guest"
    }) {
        return (
            <h1>
                Hello, {name}!
            </h1>
        );
    }

Тест:

    test("renders default name", () => {
        render(<Greeting />);

        expect(
            screen.getByRole("heading", {
                name: "Hello, Guest!"
            })
        ).toBeInTheDocument();
    });

---

# Children

React-компонент може рендерити `children`.

Компонент:

    function Card({ children }) {
        return (
            <section>
                {children}
            </section>
        );
    }

Тест:

    render(
        <Card>
            <h2>Profile</h2>
        </Card>
    );

    expect(
        screen.getByRole("heading", {
            name: "Profile"
        })
    ).toBeInTheDocument();

---

# Testing Children

Компонент:

    function Panel({ children }) {
        return (
            <div>
                {children}
            </div>
        );
    }

Тест:

    render(
        <Panel>
            <p>Hello</p>
        </Panel>
    );

    expect(
        screen.getByText("Hello")
    ).toBeInTheDocument();

Тут тестуємо:

    children
        ↓
    rendered output

---

# Conditional Rendering

Компонент:

    function Status({ loading }) {
        if (loading) {
            return <p>Loading...</p>;
        }

        return <p>Loaded</p>;
    }

Тести:

    test("shows loading state", () => {
        render(
            <Status loading={true} />
        );

        expect(
            screen.getByText("Loading...")
        ).toBeInTheDocument();
    });

    test("shows loaded state", () => {
        render(
            <Status loading={false} />
        );

        expect(
            screen.getByText("Loaded")
        ).toBeInTheDocument();
    });

---

# Testing Absence

Наприклад:

    function Status({ loading }) {
        if (loading) {
            return <p>Loading...</p>;
        }

        return <p>Loaded</p>;
    }

Можна перевірити, що Loading відсутній:

    render(
        <Status loading={false} />
    );

    expect(
        screen.queryByText("Loading...")
    ).not.toBeInTheDocument();

---

# Ternary Rendering

Компонент:

    function Greeting({ isLoggedIn }) {
        return (
            <div>
                {isLoggedIn
                    ? "Welcome back!"
                    : "Please log in"}
            </div>
        );
    }

Тести повинні перевірити обидві branches:

    isLoggedIn = true

    isLoggedIn = false

---

# Logical AND Rendering

Компонент:

    function ErrorMessage({ error }) {
        return (
            <div>
                {error && (
                    <p role="alert">
                        Something went wrong
                    </p>
                )}
            </div>
        );
    }

Тест:

    render(
        <ErrorMessage error={true} />
    );

    expect(
        screen.getByRole("alert")
    ).toBeInTheDocument();

І:

    render(
        <ErrorMessage error={false} />
    );

    expect(
        screen.queryByRole("alert")
    ).not.toBeInTheDocument();

---

# List Rendering

Компонент:

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

Тест:

    const users = [
        {
            id: 1,
            name: "John"
        },
        {
            id: 2,
            name: "Anna"
        }
    ];

    render(
        <UserList users={users} />
    );

    expect(
        screen.getAllByRole("listitem")
    ).toHaveLength(2);

---

# Testing List Content

Можна перевірити конкретні values:

    expect(
        screen.getByText("John")
    ).toBeInTheDocument();

    expect(
        screen.getByText("Anna")
    ).toBeInTheDocument();

---

# Testing Empty List

    render(
        <UserList users={[]} />
    );

Якщо component показує:

    No users found

можна перевірити:

    expect(
        screen.getByText("No users found")
    ).toBeInTheDocument();

---

# Testing List Length

    const items =
        screen.getAllByRole("listitem");

    expect(items)
        .toHaveLength(users.length);

---

# Nested Components

Компонент може рендерити інший component.

Наприклад:

    function UserCard({ name }) {
        return (
            <article>
                <h2>{name}</h2>
            </article>
        );
    }

    function UserList({ users }) {
        return (
            <section>
                {users.map(user => (
                    <UserCard
                        key={user.id}
                        name={user.name}
                    />
                ))}
            </section>
        );
    }

Тестуємо результат:

    render(
        <UserList users={users} />
    );

    expect(
        screen.getByRole("heading", {
            name: "John"
        })
    ).toBeInTheDocument();

---

# Component Composition

Якщо component отримує child component:

    function Layout({ children }) {
        return (
            <main>
                {children}
            </main>
        );
    }

Тест:

    render(
        <Layout>
            <h1>Dashboard</h1>
        </Layout>
    );

    expect(
        screen.getByRole("heading", {
            name: "Dashboard"
        })
    ).toBeInTheDocument();

---

# Fragment Rendering

Компонент може використовувати Fragment:

    function UserInfo() {
        return (
            <>
                <h1>John</h1>
                <p>Developer</p>
            </>
        );
    }

Тест:

    render(<UserInfo />);

    expect(
        screen.getByRole("heading", {
            name: "John"
        })
    ).toBeInTheDocument();

    expect(
        screen.getByText("Developer")
    ).toBeInTheDocument();

Fragment не створює додатковий DOM element.

---

# Semantic HTML

При rendering tests бажано використовувати semantic HTML.

Наприклад:

    <button>Save</button>

краще для testing, ніж:

    <div onClick={handleClick}>
        Save
    </div>

Також:

    <nav>
    <main>
    <header>
    <footer>
    <section>
    <article>

допомагають створити meaningful DOM.

---

# Accessibility Roles

Semantic HTML створює implicit roles.

Наприклад:

    <button>
        Save
    </button>

має role:

    button

    <a href="/about">
        About
    </a>

має role:

    link

    <h1>
        Dashboard
    </h1>

має role:

    heading

Це дозволяє використовувати:

    getByRole()

---

# Accessible Name

Role часто потрібно комбінувати з accessible name.

Наприклад:

    <button>
        Save
    </button>

Тест:

    screen.getByRole("button", {
        name: "Save"
    });

Це точніше, ніж:

    screen.getByRole("button");

якщо на сторінці декілька buttons.

---

# Multiple Buttons

Компонент:

    <button>Save</button>
    <button>Cancel</button>

Тест:

    screen.getByRole("button", {
        name: "Save"
    });

і:

    screen.getByRole("button", {
        name: "Cancel"
    });

Це краще, ніж:

    getAllByRole("button")[0]

оскільки тест прив'язаний до semantic meaning.

---

# Testing Attributes

Можна перевіряти attributes.

Наприклад:

    <a
        href="/profile"
        target="_blank"
    >
        Profile
    </a>

Тест:

    const link =
        screen.getByRole("link", {
            name: "Profile"
        });

    expect(link)
        .toHaveAttribute(
            "href",
            "/profile"
        );

    expect(link)
        .toHaveAttribute(
            "target",
            "_blank"
        );

---

# Testing Classes

Можна перевірити class:

    expect(element)
        .toHaveClass("active");

Але не варто перевіряти кожен CSS class без необхідності.

Краще перевіряти visual/semantic behavior.

---

# Testing Disabled Elements

Компонент:

    <button disabled>
        Save
    </button>

Тест:

    expect(
        screen.getByRole("button", {
            name: "Save"
        })
    ).toBeDisabled();

---

# Testing Checked State

Checkbox:

    <input
        type="checkbox"
        aria-label="Accept"
        checked
        readOnly
    />

Тест:

    expect(
        screen.getByRole("checkbox", {
            name: "Accept"
        })
    ).toBeChecked();

---

# Testing Input Value

Компонент:

    <label>
        Email

        <input
            value="john@example.com"
            readOnly
        />
    </label>

Тест:

    expect(
        screen.getByLabelText("Email")
    ).toHaveValue(
        "john@example.com"
    );

---

# Testing Selected Option

Для select:

    <label>
        Country

        <select defaultValue="ua">
            <option value="ua">
                Ukraine
            </option>

            <option value="pl">
                Poland
            </option>
        </select>
    </label>

Тест:

    expect(
        screen.getByLabelText("Country")
    ).toHaveValue("ua");

---

# Testing Role Attributes

Наприклад:

    <div role="alert">
        Error
    </div>

Тест:

    expect(
        screen.getByRole("alert")
    ).toHaveTextContent("Error");

Але якщо native semantic HTML може забезпечити потрібну semantics, краще використовувати native element.

---

# Rendering with Context

Якщо component використовує Context:

    const ThemeContext = createContext("light");

    function ThemeLabel() {
        const theme =
            useContext(ThemeContext);

        return <p>{theme}</p>;
    }

Тест може обгорнути component у provider:

    render(
        <ThemeContext.Provider value="dark">
            <ThemeLabel />
        </ThemeContext.Provider>
    );

    expect(
        screen.getByText("dark")
    ).toBeInTheDocument();

---

# Rendering with Router

Якщо component використовує router context, його потрібно render-ити з відповідним provider.

Наприклад, концептуально:

    render(
        <MemoryRouter>
            <Navigation />
        </MemoryRouter>
    );

Конкретний setup залежить від router library.

---

# Rendering with Providers

У реальному React application component може залежати від:

    Context
    Router
    Theme
    Query Client
    State Management
    i18n

Тоді test може використовувати wrapper.

Наприклад:

    render(
        <ThemeProvider>
            <UserProvider>
                <Dashboard />
            </UserProvider>
        </ThemeProvider>
    );

---

# Wrapper Pattern

Для повторюваних providers можна створити helper:

    function renderWithProviders(
        ui
    ) {
        return render(
            <ThemeProvider>
                <UserProvider>
                    {ui}
                </UserProvider>
            </ThemeProvider>
        );
    }

Тоді:

    renderWithProviders(
        <Dashboard />
    );

Це особливо корисно у великих проєктах.

---

# rerender()

`rerender()` дозволяє повторно відрендерити component з іншими props.

Наприклад:

    const { rerender } =
        render(
            <Greeting name="John" />
        );

Потім:

    expect(
        screen.getByText("Hello, John!")
    ).toBeInTheDocument();

Змінюємо props:

    rerender(
        <Greeting name="Anna" />
    );

Тепер:

    expect(
        screen.getByText("Hello, Anna!")
    ).toBeInTheDocument();

---

# Навіщо потрібен rerender()

`rerender()` корисний, коли потрібно перевірити:

    same component
        ↓
    different props
        ↓
    different rendered output

Наприклад:

    loading = true
        ↓
    loading UI

потім:

    loading = false
        ↓
    content UI

---

# rerender vs render

`render()` створює initial rendering.

    render(<Component />);

`rerender()` оновлює вже rendered component.

    rerender(
        <Component newProp="value" />
    );

У тестах `rerender()` корисний для перевірки реакції компонента на зміну props.

---

# Unmount

`render()` також може повертати:

    unmount()

Наприклад:

    const {
        unmount
    } = render(<Component />);

Після:

    unmount();

component видаляється з DOM.

У більшості звичайних тестів вручну викликати `unmount()` не потрібно, але знати про нього важливо.

---

# cleanup

React Testing Library має механізми очищення rendered DOM між tests.

Ідея:

    test A
        ↓
    render
        ↓
    cleanup
        ↓
    test B
        ↓
    render

Це допомагає уникати забруднення наступного тесту.

---

# Rendering Errors

Іноді component може кинути error під час rendering.

Наприклад:

    function UserProfile({ user }) {
        if (!user) {
            throw new Error("User required");
        }

        return <h1>{user.name}</h1>;
    }

Такі сценарії краще тестувати окремо від звичайного successful rendering.

---

# Error Boundary

Якщо application використовує Error Boundary, rendering test може перевіряти:

    child throws error
        ↓
    Error Boundary
        ↓
    fallback UI

Наприклад:

    expect(
        screen.getByText(
            "Something went wrong"
        )
    ).toBeInTheDocument();

Це вже переходить до теми error handling/testing.

---

# Snapshot Testing

Snapshot testing зберігає representation rendered output.

Наприклад, концептуально:

    expect(container)
        .toMatchSnapshot();

Під час наступного запуску test runner порівнює current output із snapshot.

---

# Snapshot

Snapshot може виглядати приблизно як:

    <button>
        Save
    </button>

Якщо rendered output зміниться, snapshot test може впасти.

---

# Snapshot Advantages

Snapshot може бути корисним для:

    великих стабільних output structures
    regression detection
    serialization testing

---

# Snapshot Problems

Великі snapshots можуть бути:

    важкими для читання
    важкими для review
    занадто sensitive
    noisy

Проблема:

    snapshot changed
        ↓
    developer blindly updates snapshot

Тому snapshot не повинен замінювати meaningful assertions.

---

# Explicit Assertions vs Snapshot

Explicit:

    expect(
        screen.getByRole("button", {
            name: "Save"
        })
    ).toBeInTheDocument();

Snapshot:

    expect(container)
        .toMatchSnapshot();

Для більшості component behavior tests explicit assertions часто зрозуміліші.

---

# Rendering and State

Rendering часто залежить від state.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <p>
                Count: {count}
            </p>
        );
    }

Initial rendering:

    Count: 0

Після state update:

    Count: 1

Тест повинен перевіряти UI:

    initial state
        ↓
    interaction
        ↓
    updated state
        ↓
    rendered output

---

# Rendering Different States

Компонент часто має декілька UI states:

    initial
    loading
    success
    empty
    error

Наприклад:

    loading
        ↓
    "Loading..."

    success
        ↓
    "User: John"

    error
        ↓
    "Failed to load user"

Кожен важливий state бажано мати в tests.

---

# State Matrix

Для складного component корисно подумати про state matrix.

Наприклад:

    loading   data   error
    -----------------------
    false     yes    false → success
    false     no     false → empty
    true      no     false → loading
    false     no     true  → error

Тести повинні покривати meaningful combinations.

Не потрібно механічно тестувати всі можливі комбінації, якщо вони неможливі або не мають окремої поведінки.

---

# Rendering Null

Component може нічого не рендерити:

    function Message({ visible }) {
        if (!visible) {
            return null;
        }

        return <p>Hello</p>;
    }

Тест:

    render(
        <Message visible={false} />
    );

    expect(
        screen.queryByText("Hello")
    ).not.toBeInTheDocument();

---

# Rendering Boolean

Не варто очікувати, що:

    false

сам по собі створить DOM element.

Наприклад:

    function Example() {
        return (
            <div>
                {false}
            </div>
        );
    }

Rendered DOM не матиме text content:

    false

---

# Rendering Arrays

React може рендерити array of elements.

Наприклад:

    function Numbers() {
        return [
            <span key="1">1</span>,
            <span key="2">2</span>,
            <span key="3">3</span>
        ];
    }

Тест:

    expect(
        screen.getByText("1")
    ).toBeInTheDocument();

---

# Keys and Rendering Tests

Для list rendering:

    users.map(user => (
        <UserCard
            key={user.id}
            user={user}
        />
    ))

`key` потрібен React для правильного reconciliation.

Зазвичай не потрібно тестувати сам факт наявності `key`.

Потрібно тестувати:

    correct items rendered
    correct order
    correct content
    correct behavior

---

# Testing Order

Якщо порядок елементів має значення:

    const items =
        screen.getAllByRole("listitem");

    expect(items[0])
        .toHaveTextContent("Apple");

    expect(items[1])
        .toHaveTextContent("Banana");

Але не потрібно тестувати порядок, якщо він не є частиною component behavior.

---

# Rendering Portals

React component може використовувати portal.

Наприклад:

    createPortal(
        <div role="dialog">
            ...
        </div>,
        document.body
    );

Testing Library може знаходити portal content через:

    screen.getByRole("dialog");

Тобто потрібно тестувати rendered behavior, а не те, в якому конкретному DOM container знаходиться element.

---

# Rendering Fragments vs Containers

Fragment:

    <>
        <h1>Hello</h1>
        <p>Text</p>
    </>

не створює wrapper element.

Тому не потрібно очікувати:

    <div>
        ...
    </div>

якщо component використовує Fragment.

Тестуйте actual semantic output.

---

# Rendering HTML

React може render-ити:

    text
    elements
    arrays
    fragments
    components
    conditional output

У тестах головне:

    What should the user see?

---

# What Not to Test

Не потрібно без причини тестувати:

    exact DOM nesting
    every className
    internal state
    private functions
    React internals
    implementation-specific details

Наприклад, погано:

    expect(container.firstChild.firstChild)
        .toBe(...);

Краще:

    screen.getByRole("heading", {
        name: "Dashboard"
    });

---

# Behavior-Oriented Rendering Test

Компонент:

    function EmptyState() {
        return (
            <section>
                <h2>No results</h2>
                <p>Try another search.</p>
            </section>
        );
    }

Хороший тест:

    render(<EmptyState />);

    expect(
        screen.getByRole("heading", {
            name: "No results"
        })
    ).toBeInTheDocument();

    expect(
        screen.getByText(
            "Try another search."
        )
    ).toBeInTheDocument();

Тут тестується behavior/output, а не DOM implementation.

---

# Complete Rendering Example

Компонент:

    type User = {
        id: number;
        name: string;
    };

    type UserListProps = {
        users: User[];
        loading: boolean;
    };

    export function UserList({
        users,
        loading
    }: UserListProps) {
        if (loading) {
            return (
                <p role="status">
                    Loading...
                </p>
            );
        }

        if (users.length === 0) {
            return (
                <p>
                    No users found
                </p>
            );
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

Тести:

    import {
        render,
        screen
    } from "@testing-library/react";

    import {
        describe,
        expect,
        test
    } from "vitest";

    import { UserList } from "./UserList";

    describe("UserList", () => {
        test("renders loading state", () => {
            render(
                <UserList
                    users={[]}
                    loading={true}
                />
            );

            expect(
                screen.getByRole("status")
            ).toHaveTextContent(
                "Loading..."
            );
        });

        test("renders empty state", () => {
            render(
                <UserList
                    users={[]}
                    loading={false}
                />
            );

            expect(
                screen.getByText(
                    "No users found"
                )
            ).toBeInTheDocument();
        });

        test("renders users", () => {
            const users = [
                {
                    id: 1,
                    name: "John"
                },
                {
                    id: 2,
                    name: "Anna"
                }
            ];

            render(
                <UserList
                    users={users}
                    loading={false}
                />
            );

            expect(
                screen.getByText("John")
            ).toBeInTheDocument();

            expect(
                screen.getByText("Anna")
            ).toBeInTheDocument();

            expect(
                screen.getAllByRole("listitem")
            ).toHaveLength(2);
        });
    });

---

# Практичний Rendering Workflow

Коли потрібно протестувати rendering компонента:

    1. Read component
        ↓
    2. Identify UI states
        ↓
    3. Render component
        ↓
    4. Find semantic elements
        ↓
    5. Assert visible output
        ↓
    6. Test important alternative states

Наприклад:

    Component
        ↓
    loading?
        ↓
    empty?
        ↓
    success?
        ↓
    error?
        ↓
    write tests

---

# Rendering Checklist

Перед написанням тестів запитай:

    Що component повинен показати?

    Які props впливають на rendering?

    Які можливі states?

    Які elements бачить користувач?

    Які accessibility roles вони мають?

    Чи є loading state?

    Чи є empty state?

    Чи є error state?

    Чи є conditional rendering?

    Чи є list rendering?

    Чи є children?

    Чи потрібні providers?

    Чи є asynchronous rendering?

---

# Типові помилки

❌ Використовувати `container.querySelector()` всюди.

Краще:

    screen.getByRole()

---

❌ Використовувати `getByTestId()` як основний query.

Краще:

    getByRole()
    getByLabelText()
    getByText()

---

❌ Тестувати className замість behavior.

Погано:

    expect(element)
        .toHaveClass("user-card");

Якщо class не є важливою частиною behavior.

---

❌ Тестувати точну DOM nesting structure.

Погано:

    expect(
        container.firstChild.firstChild
    ).toBe(...);

---

❌ Використовувати `getBy` для перевірки відсутності.

Погано:

    expect(
        screen.getByText("Error")
    ).not.toBeInTheDocument();

Правильно:

    expect(
        screen.queryByText("Error")
    ).not.toBeInTheDocument();

---

❌ Не тестувати важливі conditional branches.

Якщо component має:

    loading
    success
    error

варто перевірити всі meaningful states.

---

❌ Перевіряти implementation details.

Погано:

    expect(component.state.isLoading)
        .toBe(false);

Краще:

    expect(
        screen.getByText("Loaded")
    ).toBeInTheDocument();

---

❌ Створювати величезний snapshot для простого component.

Для простих behavior tests часто краще explicit assertions.

---

❌ Не враховувати accessibility.

Погано:

    <div onClick={...}>
        Save
    </div>

Краще:

    <button onClick={...}>
        Save
    </button>

Це покращує і accessibility, і testability.

---

# Питання зі співбесіди

Що таке rendering у React?

Що робить `render()` у React Testing Library?

Що таке rendered DOM?

Що таке `screen`?

Як знайти button?

Як знайти heading?

Як знайти link?

Як знайти input?

Чому `getByRole()` часто є кращим вибором?

Що таке accessible role?

Що таке accessible name?

Яка різниця між:

    getBy
    queryBy
    findBy

Яка різниця між:

    getAllBy
    queryAllBy
    findAllBy

Коли використовувати `getByText()`?

Коли використовувати `getByLabelText()`?

Коли використовувати `getByTestId()`?

Як протестувати props?

Як протестувати children?

Як протестувати conditional rendering?

Як протестувати list rendering?

Як протестувати empty state?

Як протестувати loading state?

Як протестувати error state?

Що таке `rerender()`?

Коли використовувати `rerender()`?

Що робить `unmount()`?

Що таке cleanup?

Як тестувати components, які використовують Context?

Як тестувати components, які використовують Router?

Що таке wrapper pattern?

Що таке snapshot testing?

Які переваги snapshot testing?

Які недоліки snapshot testing?

Чому не потрібно тестувати implementation details?

Чому semantic HTML допомагає testing?

Як тестувати accessibility-oriented UI?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке rendering.

Що таке rendered DOM.

`render()`.

`screen`.

`getByRole()`.

`getByText()`.

`getByLabelText()`.

`getByTestId()`.

`getBy...`.

`queryBy...`.

`findBy...`.

`getAllBy...`.

`queryAllBy...`.

`findAllBy...`.

Тестування:

    text
    heading
    button
    link
    input
    checkbox
    image

Тестування props.

Тестування children.

Тестування conditional rendering.

Тестування list rendering.

Тестування loading state.

Тестування empty state.

Тестування error state.

Основи accessibility roles.

Основи accessible names.

---

🔵 Junior

Упевнене використання:

    render()
    screen
    getByRole()
    getByText()
    getByLabelText()
    queryBy...
    findBy...
    getAllBy...

Тестування:

    props
    children
    conditional rendering
    lists
    forms
    loading
    error
    empty states

Розуміння:

    semantic HTML
    accessibility roles
    accessible names
    test isolation

Уміння використовувати:

    rerender()
    unmount()
    cleanup

Тестування components із:

    Context
    Router
    Providers

Уміння створювати:

    renderWithProviders()

Розуміння snapshot testing.

Розуміння різниці між:

    behavior
    implementation details

---

🟠 Middle

Тестування складних component states.

State matrix.

Complex conditional rendering.

Nested components.

Component composition.

Provider architecture.

Reusable render helpers.

Custom test utilities.

Async rendering.

Portal testing.

Error boundaries.

Loading / success / empty / error flows.

Testing accessibility.

Snapshot strategy.

Test maintainability.

Testing component contracts.

Розуміння trade-offs між:

    explicit assertions
    snapshots

Оптимізація test queries.

Розуміння test isolation у великих component trees.

---

🔴 Senior

Архітектура component testing у великих React applications.

Reusable testing infrastructure.

Custom render utilities.

Provider composition.

Testing application shells.

Complex Context hierarchies.

Router testing architecture.

State management testing.

Designing resilient test suites.

Accessibility-first testing strategy.

Visual regression testing.

Snapshot strategy at scale.

Test performance.

Parallel test execution.

Flaky rendering tests.

Advanced async rendering.

Portals and overlays.

Complex component composition.

Testing design-system components.

Testing component contracts.

Balancing:

    unit tests
    component tests
    integration tests
    E2E tests

Оптимізація:

    reliability
    readability
    maintainability
    execution speed

---

# Міні-шпаргалка

## Render

    render(<Component />);

    → render React component

---

## Screen

    screen.getByRole("button");

    → find rendered element

---

## Role

    screen.getByRole("button", {
        name: "Save"
    });

    → semantic element + accessible name

---

## Text

    screen.getByText("Hello");

    → find text

---

## Label

    screen.getByLabelText("Email");

    → find form control by label

---

## Test ID

    screen.getByTestId("profile");

    → fallback query

---

## getBy

    screen.getByRole("button");

    → must exist now

---

## queryBy

    screen.queryByRole("alert");

    → may not exist

---

## findBy

    await screen.findByText("Loaded");

    → wait for async rendering

---

## Multiple

    screen.getAllByRole("listitem");

    → multiple elements

---

## Props

    render(
        <Greeting name="John" />
    );

---

## Children

    render(
        <Card>
            <h2>Profile</h2>
        </Card>
    );

---

## Conditional Rendering

    render(
        <Status loading={true} />
    );

    expect(
        screen.getByText("Loading...")
    ).toBeInTheDocument();

---

## Absence

    expect(
        screen.queryByText("Loading...")
    ).not.toBeInTheDocument();

---

## List

    const items =
        screen.getAllByRole("listitem");

    expect(items)
        .toHaveLength(3);

---

## rerender

    const { rerender } =
        render(
            <Greeting name="John" />
        );

    rerender(
        <Greeting name="Anna" />
    );

---

## Provider

    render(
        <Provider>
            <Component />
        </Provider>
    );

---

## Rendering Flow

    render()
        ↓
    rendered DOM
        ↓
    screen
        ↓
    query
        ↓
    assertion

---

## Основні правила

    getByRole()
        → first choice

    getByLabelText()
        → forms

    getByText()
        → visible text

    getByTestId()
        → fallback

    queryBy()
        → absence

    findBy()
        → async appearance

    getAllBy()
        → multiple elements

---

# Головне

• `render()` — основний інструмент для rendering React-компонента в тесті.

• Після `render()` компонент створює rendered DOM, з яким можна працювати через Testing Library.

• `screen` використовується для пошуку elements у rendered DOM.

• `getByRole()` часто є найкращим способом знайти semantic UI element.

• Для:

    <button>Save</button>

краще:

    screen.getByRole("button", {
        name: "Save"
    });

ніж:

    container.querySelector("button");

• `getByText()` зручно використовувати для visible text.

• `getByLabelText()` особливо корисний для forms.

• `getByTestId()` слід залишати для випадків, коли semantic query не підходить.

• `getBy...` означає:

    element should exist

• `queryBy...` означає:

    element may not exist

• `findBy...` означає:

    element appears asynchronously

• `getAllBy...` використовується, коли очікується декілька elements.

• Props передаються безпосередньо під час rendering:

    render(
        <Component prop="value" />
    );

• Children також можна тестувати через rendered output.

• Conditional rendering потрібно тестувати для важливих branches.

• List rendering потрібно перевіряти через кількість і content elements.

• Loading, empty, success та error states часто є окремими важливими rendering states.

• `rerender()` дозволяє перевірити поведінку компонента після зміни props.

• `unmount()` видаляє component з test DOM.

• Provider dependencies можна передавати через wrapper.

• Для повторюваного provider setup зручно створювати:

    renderWithProviders()

• Semantic HTML покращує:

    accessibility
    testability
    readability

• Хороший rendering test перевіряє:

    what the user sees

а не:

    how React internally produced it

• Не потрібно без необхідності перевіряти:

    className
    DOM nesting
    internal state
    private functions
    implementation details

• Snapshot testing може бути корисним, але не повинно замінювати meaningful assertions.

• Основна модель component rendering testing:

    Component
        ↓
    render()
        ↓
    rendered DOM
        ↓
    semantic query
        ↓
    assertion

• Для складного компонента спочатку потрібно визначити його UI states:

    loading
    empty
    success
    error

і потім перевірити кожен важливий state.

• Основна мета rendering tests — переконатися, що React-компонент відображає правильний UI для заданих props, children та state.

• Хороший rendering test повинен бути:

    readable
    focused
    deterministic
    behavior-oriented
    resilient
    maintainable

• Найважливіше правило:

    Test what the user sees,
    not how the component is implemented.