# 02. JSX

JSX (JavaScript XML) — це синтаксичне розширення JavaScript, яке дозволяє описувати UI у syntax, схожому на HTML.

JSX широко використовується в React для опису того, який UI повинен бути відображений.

Наприклад:

    function Greeting() {
        return <h1>Hello, React!</h1>;
    }

На вигляд це схоже на HTML:

    <h1>Hello, React!</h1>

але JSX є частиною JavaScript-коду, а не окремою мовою HTML.

Основна ідея:

    JavaScript
        +
    JSX
        ↓
    опис UI

---

# Ключові поняття

✔ JSX  
✔ JSX syntax  
✔ JSX element  
✔ JSX expression  
✔ JavaScript expression  
✔ curly braces `{}`  
✔ JSX attributes  
✔ `className`  
✔ `htmlFor`  
✔ self-closing tags  
✔ closing tags  
✔ nested JSX  
✔ parent element  
✔ Fragment  
✔ JSX comments  
✔ conditional JSX  
✔ JSX variables  
✔ JSX functions  
✔ JSX arrays  
✔ JSX `map()`  
✔ JSX keys  
✔ event handlers  
✔ camelCase attributes  
✔ boolean attributes  
✔ spread attributes  
✔ props in JSX  
✔ children  
✔ React elements  
✔ JSX transformation  
✔ JSX compiler  
✔ JSX runtime  

---

# Що потрібно пам'ятати

• JSX дозволяє писати UI syntax безпосередньо всередині JavaScript.

• JSX виглядає схожим на HTML, але це не HTML.

• JSX є syntax extension для JavaScript.

• JSX можна використовувати всередині JavaScript functions.

• JavaScript expressions всередині JSX записуються через `{}`.

• У JSX HTML `class` замінюється на `className`.

• Багато HTML attributes у JSX використовують camelCase:

    onClick
    onChange
    tabIndex
    htmlFor

• JSX elements повинні бути правильно закриті.

• Self-closing element:

    <img />

• Element з content:

    <p>Hello</p>

• JSX може бути вкладеним.

• Component може повертати JSX.

• JSX може містити JavaScript expressions.

• JSX expressions повинні бути expressions, а не statements.

• Для умов можна використовувати:

    if
    ternary
    &&
    ||

але `if` не можна безпосередньо вставити всередину JSX.

• Для списків часто використовується:

    map()

• JSX elements у списках зазвичай повинні мати `key`.

• JSX підтримує props.

• JSX підтримує `children`.

• JSX може використовувати Fragment:

    <>
        ...
    </>

• JSX comments мають спеціальний syntax:

    {/* comment */}

• JSX перетворюється інструментами React ecosystem у JavaScript-код, який створює React elements.

---

# Що таке JSX

JSX — це syntax extension для JavaScript.

Наприклад:

    const element = <h1>Hello!</h1>;

Це JSX.

Він дозволяє описати UI декларативно:

    <h1>Hello!</h1>

Замість ручного створення DOM:

    const h1 = document.createElement("h1");

    h1.textContent = "Hello!";

React використовує JSX для зручного опису UI.

---

# JSX не є HTML

Це дуже важливо.

JSX:

    <h1 className="title">
        Hello
    </h1>

виглядає як HTML:

    <h1 class="title">
        Hello
    </h1>

але JSX має інші правила.

Наприклад:

HTML:

    <div class="container">

JSX:

    <div className="container">

HTML:

    <label for="email">

JSX:

    <label htmlFor="email">

Тому:

    JSX ≠ HTML

JSX — syntax extension JavaScript для опису UI.

---

# JSX не є Template Language

JSX може нагадувати template syntax, але він безпосередньо інтегрований з JavaScript.

Наприклад:

    const name = "John";

    const element = (
        <h1>
            Hello, {name}!
        </h1>
    );

У цьому одному фрагменті є:

    JavaScript variable
        +
    JSX
        +
    JavaScript expression

---

# JSX Element

JSX element — конструкція JSX, яка описує React element.

Наприклад:

    <h1>Hello</h1>

Або:

    <Button />

Або:

    <UserCard name="John" />

JSX elements можуть бути:

    HTML-like elements

або:

    React components

---

# HTML Element в JSX

Наприклад:

    <div>Hello</div>

    <button>Save</button>

    <input />

    <img src="/logo.png" alt="Logo" />

Це JSX syntax для стандартних HTML elements.

---

# Component в JSX

React component також використовується через JSX:

    <Header />

    <UserCard />

    <ProductList />

Наприклад:

    function Header() {
        return <header>My Website</header>;
    }

Використання:

    <Header />

---

# JSX у Function

Найчастіше JSX повертається з React component.

    function Greeting() {
        return <h1>Hello!</h1>;
    }

Тут:

    function Greeting()
        ↓
    component

а:

    <h1>Hello!</h1>
        ↓
    JSX

---

# JSX Expression

JavaScript expression можна вставити в JSX через curly braces:

    { }

Наприклад:

    const name = "John";

    function Greeting() {
        return <h1>Hello, {name}!</h1>;
    }

Результат:

    Hello, John!

---

# Curly Braces

`{}` у JSX означають:

    "вставити JavaScript expression"

Наприклад:

    const name = "John";
    const age = 25;

    function User() {
        return (
            <section>
                <h2>{name}</h2>
                <p>{age}</p>
            </section>
        );
    }

---

# JavaScript Expression in JSX

У `{}` можна використовувати expressions.

Наприклад:

    const firstName = "John";
    const lastName = "Smith";

    function User() {
        return (
            <h1>
                {firstName} {lastName}
            </h1>
        );
    }

---

# Arithmetic Expression

Можна виконувати обчислення:

    function Price() {
        const price = 100;
        const quantity = 3;

        return (
            <p>
                Total: {price * quantity}
            </p>
        );
    }

Результат:

    Total: 300

---

# Function Call

Можна викликати функцію:

    function getGreeting() {
        return "Hello!";
    }

    function App() {
        return <h1>{getGreeting()}</h1>;
    }

---

# Method Call

Можна використовувати methods:

    const name = "john";

    function App() {
        return <h1>{name.toUpperCase()}</h1>;
    }

Результат:

    JOHN

---

# Template Literals

Можна використовувати template literals:

    const name = "John";

    function App() {
        return (
            <p>
                {`Hello, ${name}!`}
            </p>
        );
    }

Але часто простіше:

    <p>Hello, {name}!</p>

---

# Ternary Operator

Ternary operator дуже часто використовується в JSX.

    const isLoggedIn = true;

    function App() {
        return (
            <p>
                {isLoggedIn ? "Welcome" : "Please log in"}
            </p>
        );
    }

Структура:

    condition
        ? valueIfTrue
        : valueIfFalse

---

# Logical AND

`&&` можна використовувати для умовного rendering.

    const isAdmin = true;

    function App() {
        return (
            <main>
                {isAdmin && <p>Admin panel</p>}
            </main>
        );
    }

Якщо:

    isAdmin === true

відобразиться:

    Admin panel

Якщо:

    isAdmin === false

нічого не відобразиться.

---

# Logical OR

Можна використовувати `||` для fallback:

    const name = "";

    function App() {
        return (
            <p>
                {name || "Guest"}
            </p>
        );
    }

Результат:

    Guest

Але потрібно пам'ятати про truthy / falsy behavior JavaScript.

---

# Nullish Coalescing

Можна використовувати `??`:

    const name = null;

    function App() {
        return (
            <p>
                {name ?? "Guest"}
            </p>
        );
    }

Результат:

    Guest

`??` відрізняється від `||`.

`??` перевіряє:

    null
    undefined

а `||` працює з усіма falsy values.

---

# if та JSX

`if` не можна безпосередньо вставити всередину JSX expression.

❌ Неправильно:

    return (
        <main>
            if (isLoggedIn) {
                <p>Welcome</p>
            }
        </main>
    );

`if` є statement, а JSX `{}` очікує expression.

---

# if Перед JSX

Можна використовувати `if` перед `return`.

    function Greeting({ isLoggedIn }) {
        if (isLoggedIn) {
            return <h1>Welcome!</h1>;
        }

        return <h1>Please log in.</h1>;
    }

Це дуже читабельний спосіб conditional rendering.

---

# Conditional Rendering with Ternary

    function Greeting({ isLoggedIn }) {
        return (
            <h1>
                {isLoggedIn
                    ? "Welcome!"
                    : "Please log in."
                }
            </h1>
        );
    }

---

# Conditional Rendering with &&

    function AdminPanel({ isAdmin }) {
        return (
            <main>
                {isAdmin && (
                    <section>
                        Admin panel
                    </section>
                )}
            </main>
        );
    }

---

# JSX Variables

JSX можна зберегти у variable.

    const element = <h1>Hello!</h1>;

Потім:

    function App() {
        return (
            <main>
                {element}
            </main>
        );
    }

Це допустимо, хоча зазвичай JSX безпосередньо повертають із component.

---

# JSX Variable with Condition

    const isLoggedIn = true;

    const message = isLoggedIn
        ? <p>Welcome!</p>
        : <p>Please log in.</p>;

    function App() {
        return (
            <main>
                {message}
            </main>
        );
    }

---

# Nested JSX

JSX elements можуть бути вкладені.

    function App() {
        return (
            <main>
                <section>
                    <h1>React</h1>
                    <p>Learn JSX.</p>
                </section>
            </main>
        );
    }

Структура:

    main
      ↓
    section
      ├── h1
      └── p

---

# Parent Element

JSX elements можуть мати child elements.

    <div>
        <h1>Title</h1>
        <p>Description</p>
    </div>

Тут:

    div
      ├── h1
      └── p

---

# Multiple Root Elements

Не можна просто повернути декілька sibling elements.

❌:

    function App() {
        return (
            <h1>Title</h1>
            <p>Description</p>
        );
    }

Потрібен спільний parent.

---

# Wrapper Element

Можна використати `div`:

    function App() {
        return (
            <div>
                <h1>Title</h1>
                <p>Description</p>
            </div>
        );
    }

Але додатковий `div` не завжди потрібен.

---

# Fragment

Fragment дозволяє об'єднати elements без створення додаткового DOM element.

    function App() {
        return (
            <>
                <h1>Title</h1>
                <p>Description</p>
            </>
        );
    }

DOM не отримує додатковий `div`.

---

# Full Fragment Syntax

Короткий:

    <>
        <h1>Title</h1>
        <p>Description</p>
    </>

Повний:

    <React.Fragment>
        <h1>Title</h1>
        <p>Description</p>
    </React.Fragment>

Короткий syntax є найпоширенішим.

---

# JSX Tags Must Be Closed

JSX elements повинні бути правильно закриті.

Правильно:

    <p>Hello</p>

    <button>Save</button>

Self-closing:

    <input />

    <img src="/logo.png" alt="Logo" />

Неправильно:

    <input>

    <img src="/logo.png">

---

# Self-Closing Elements

Elements без children можна записати як self-closing.

Наприклад:

    <input />

    <img src="/logo.png" alt="Logo" />

    <Component />

Також можна записати:

    <Component></Component>

але якщо children немає, self-closing syntax є коротшим:

    <Component />

---

# JSX Attributes

JSX elements можуть мати attributes.

Наприклад:

    <img
        src="/logo.png"
        alt="Logo"
    />

    <button
        type="button"
    >
        Save
    </button>

Attributes у JSX використовуються для передачі information element.

---

# JSX Attribute Values

String:

    <input
        type="text"
        placeholder="Enter name"
    />

Expression:

    <input
        maxLength={20}
    />

Boolean:

    <input
        disabled
    />

Component prop:

    <User
        name="John"
    />

---

# String Attribute

String можна передавати в quotes:

    <h1 className="title">
        Hello
    </h1>

---

# Expression Attribute

JavaScript expression передається через `{}`.

    const className = "title";

    <h1 className={className}>
        Hello
    </h1>

---

# Attribute Expression

Можна використовувати expression:

    const width = 200;

    <img
        width={width}
        alt="Image"
    />

Або:

    <p>
        {2 + 2}
    </p>

---

# String vs Expression

Це:

    <h1 className="title">
        Hello
    </h1>

string literal.

А це:

    const className = "title";

    <h1 className={className}>
        Hello
    </h1>

JavaScript expression.

Не потрібно:

    className={"title"}

якщо звичайного string достатньо.

Але це допустимо.

---

# className

У JSX використовується:

    className

а не:

    class

Правильно:

    <div className="container">
        Content
    </div>

HTML:

    <div class="container">
        Content
    </div>

---

# htmlFor

Для `<label>` використовується:

    htmlFor

Наприклад:

    <label htmlFor="email">
        Email
    </label>

    <input
        id="email"
        type="email"
    />

HTML використовує:

    for

JSX використовує:

    htmlFor

---

# JSX Attribute Naming

Багато JSX attributes використовують camelCase.

Наприклад:

    onClick
    onChange
    onSubmit
    tabIndex
    readOnly
    autoFocus
    maxLength
    htmlFor

---

# HTML vs JSX Attributes

HTML:

    class
    for
    tabindex
    readonly
    onclick

JSX:

    className
    htmlFor
    tabIndex
    readOnly
    onClick

---

# Event Attributes

React event handlers записуються у camelCase.

Наприклад:

    onClick
    onChange
    onSubmit
    onFocus
    onBlur
    onKeyDown

Приклад:

    function Button() {
        function handleClick() {
            console.log("Clicked");
        }

        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

---

# Function vs Function Call

Це дуже важлива різниця.

Правильно:

    <button onClick={handleClick}>
        Click
    </button>

React отримує function.

Не:

    <button onClick={handleClick()}>
        Click
    </button>

Тут `handleClick()` викликається під час render.

Потрібно передати function:

    onClick={handleClick}

а не результат її виклику:

    onClick={handleClick()}

Events будуть детальніше розглядатися у:

    02-events-state-and-forms

---

# JSX Comments

JavaScript comment:

    // comment

JSX comment має бути всередині `{}`:

    {/* comment */}

Наприклад:

    function App() {
        return (
            <main>
                {/* Main content */}
                <h1>Hello</h1>
            </main>
        );
    }

---

# Multiline JSX

JSX можна форматувати на декілька рядків.

    function App() {
        return (
            <main>
                <h1>Hello</h1>
                <p>
                    Welcome to React.
                </p>
            </main>
        );
    }

Дужки після `return` допомагають зручніше форматувати JSX.

---

# Parentheses After return

Зазвичай multiline JSX пишуть:

    return (
        <main>
            <h1>Hello</h1>
            <p>Welcome</p>
        </main>
    );

Це особливо зручно для великого JSX.

---

# Automatic Semicolon Insertion and return

Не потрібно переносити `return` окремо від JSX.

❌ Небезпечно:

    return
        (
            <h1>Hello</h1>
        );

JavaScript може застосувати Automatic Semicolon Insertion.

Правильно:

    return (
        <h1>Hello</h1>
    );

---

# JSX and JavaScript Variables

    const name = "John";
    const age = 25;

    function User() {
        return (
            <section>
                <h2>{name}</h2>
                <p>Age: {age}</p>
            </section>
        );
    }

---

# JSX and Object Properties

    const user = {
        name: "John",
        age: 25
    };

    function User() {
        return (
            <section>
                <h2>{user.name}</h2>
                <p>{user.age}</p>
            </section>
        );
    }

---

# JSX and Array

JSX може відображати array of React elements.

    const items = [
        <li key="1">Apple</li>,
        <li key="2">Banana</li>,
        <li key="3">Orange</li>
    ];

    function App() {
        return (
            <ul>
                {items}
            </ul>
        );
    }

На практиці частіше використовують `map()`.

---

# JSX and map()

Типовий спосіб створення списку:

    const fruits = [
        "Apple",
        "Banana",
        "Orange"
    ];

    function FruitList() {
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

Тут:

    fruits
        ↓
    map()
        ↓
    JSX elements
        ↓
    <ul>

Lists та keys будуть детально розглядатися у:

    05-list-and-keys

---

# JSX and Objects

Об'єкт не можна безпосередньо render як children.

Наприклад:

    const user = {
        name: "John",
        age: 25
    };

Не:

    <div>{user}</div>

React не може безпосередньо відобразити звичайний object як child.

Потрібно звернутися до property:

    <div>{user.name}</div>

або:

    <div>{user.age}</div>

---

# JSX and Strings

Strings можна render:

    const name = "John";

    <h1>{name}</h1>

---

# JSX and Numbers

Numbers можна render:

    const age = 25;

    <p>{age}</p>

---

# JSX and Booleans

Boolean values зазвичай не відображаються як text.

Наприклад:

    <p>{true}</p>

не покаже:

    true

Аналогічно:

    <p>{false}</p>

не покаже:

    false

Це важливо при conditional rendering.

---

# JSX and null

`null` не render-иться як text.

    <div>{null}</div>

Не буде тексту `null`.

---

# JSX and undefined

`undefined` також не render-иться як text.

    <div>{undefined}</div>

---

# JSX and Arrays

Array of renderable values може бути відображений.

    const numbers = [1, 2, 3];

    function App() {
        return (
            <div>
                {numbers}
            </div>
        );
    }

Але для складного UI зазвичай використовують `map()`.

---

# JSX and Boolean Conditions

Наприклад:

    const isVisible = true;

    function App() {
        return (
            <main>
                {isVisible && (
                    <p>
                        Visible content
                    </p>
                )}
            </main>
        );
    }

---

# The `0` Trap

Потрібно бути уважним з `&&`.

Наприклад:

    const count = 0;

    function App() {
        return (
            <div>
                {count && <p>Items exist</p>}
            </div>
        );
    }

Оскільки:

    0 && something

повертає:

    0

React може відобразити `0`.

Якщо потрібно саме boolean condition:

    {count > 0 && (
        <p>Items exist</p>
    )}

---

# JSX and Ternary

Наприклад:

    const isLoading = true;

    function App() {
        return (
            <main>
                {isLoading
                    ? <p>Loading...</p>
                    : <p>Content loaded.</p>
                }
            </main>
        );
    }

---

# Nested Ternary

Технічно можна:

    {
        status === "loading"
            ? <Loading />
            : status === "error"
                ? <ErrorMessage />
                : <Content />
    }

Але nested ternaries швидко погіршують читабельність.

У складнішій логіці краще використовувати:

    if
    early return
    separate function
    separate component

---

# JSX and Function

Можна викликати function:

    function formatName(name) {
        return name.toUpperCase();
    }

    function User() {
        const name = "John";

        return (
            <h2>
                {formatName(name)}
            </h2>
        );
    }

---

# JSX and Arrow Function

Можна використовувати arrow function:

    const formatName = (name) => {
        return name.toUpperCase();
    };

    function User() {
        return (
            <h2>
                {formatName("John")}
            </h2>
        );
    }

---

# JSX and Template Logic

Невелика логіка безпосередньо в JSX допустима:

    <p>
        {price * quantity}
    </p>

Але складну логіку краще винести:

    const total = calculateTotal(
        price,
        quantity
    );

    return (
        <p>
            {total}
        </p>
    );

JSX краще залишати максимально читабельним.

---

# JSX Attribute with Expression

    const imageUrl = "/logo.png";

    function Logo() {
        return (
            <img
                src={imageUrl}
                alt="Logo"
            />
        );
    }

---

# JSX Attribute with Function

    function handleClick() {
        console.log("Clicked");
    }

    function Button() {
        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

---

# JSX Attribute with Boolean

Boolean attributes можна записувати скорочено.

    <button disabled>
        Save
    </button>

Еквівалентно:

    <button disabled={true}>
        Save
    </button>

Для false:

    <button disabled={false}>
        Save
    </button>

---

# JSX Attribute with Variable Boolean

    const isDisabled = true;

    function Button() {
        return (
            <button disabled={isDisabled}>
                Save
            </button>
        );
    }

---

# Spread Attributes

JSX підтримує spread syntax.

Наприклад:

    const buttonProps = {
        type: "button",
        disabled: false
    };

    function Button() {
        return (
            <button {...buttonProps}>
                Save
            </button>
        );
    }

Це передасть properties як JSX attributes.

---

# JSX Spread with Additional Props

Можна комбінувати:

    const props = {
        type: "button",
        disabled: false
    };

    <button
        {...props}
        className="button"
    >
        Save
    </button>

Якщо однаковий prop переданий декілька разів, порядок має значення.

Наприклад:

    <button
        className="first"
        {...props}
    >
        Save
    </button>

Якщо `props.className` існує, він може перезаписати попереднє значення.

---

# Spread Props

Для components:

    const userProps = {
        name: "John",
        age: 25
    };

    <UserCard {...userProps} />

Це приблизно передає:

    <UserCard
        name="John"
        age={25}
    />

Spread syntax зручний, але не варто використовувати його без необхідності, якщо явні props роблять API component зрозумілішим.

---

# JSX Props

JSX дозволяє передавати props:

    <User
        name="John"
        age={25}
    />

Component:

    function User({ name, age }) {
        return (
            <section>
                <h2>{name}</h2>
                <p>{age}</p>
            </section>
        );
    }

---

# String Props

String можна передавати:

    <User
        name="John"
    />

---

# Number Props

Number потрібно передавати як expression:

    <User
        age={25}
    />

Не:

    <User
        age="25"
    />

якщо component очікує number.

---

# Boolean Props

    <User
        isAdmin={true}
    />

Можна скоротити:

    <User
        isAdmin
    />

Це означає:

    isAdmin={true}

---

# False Props

    <User
        isAdmin={false}
    />

Або можна використати expression:

    <User
        isAdmin={someCondition}
    />

---

# Object Props

Object передається через `{}`:

    const user = {
        name: "John",
        age: 25
    };

    <UserCard
        user={user}
    />

---

# Array Props

Array також передається через expression:

    const fruits = [
        "Apple",
        "Banana"
    ];

    <FruitList
        fruits={fruits}
    />

---

# Function Props

Function можна передати як prop:

    function App() {
        function handleSave() {
            console.log("Saved");
        }

        return (
            <Form
                onSave={handleSave}
            />
        );
    }

Це важлива частина React data flow.

---

# Children in JSX

Вкладений JSX передається як `children`.

    <Card>
        <h2>React</h2>
        <p>Learn JSX.</p>
    </Card>

Component:

    function Card({ children }) {
        return (
            <article>
                {children}
            </article>
        );
    }

---

# JSX Whitespace

Whitespace у JSX має свої правила.

Наприклад:

    <p>
        Hello
        World
    </p>

не слід сприймати як звичайний HTML formatting.

Для контрольованого spacing краще явно використовувати:

    {" "}

або CSS.

Наприклад:

    <p>
        Hello{" "}
        <strong>John</strong>
    </p>

Але в більшості випадків spacing краще контролювати через CSS.

---

# JSX Text

Звичайний текст можна писати без `{}`:

    <h1>Hello React</h1>

JavaScript variable потребує `{}`:

    const name = "John";

    <h1>Hello {name}</h1>

---

# JSX Quotes

String attributes:

    className="button"

JavaScript expressions:

    className={className}

Не потрібно:

    className="{className}"

Бо тоді `{className}` буде звичайним string.

Правильно:

    className={className}

---

# JSX Style Attribute

Inline styles передаються як JavaScript object.

Наприклад:

    function App() {
        return (
            <p
                style={{
                    color: "red",
                    fontSize: "20px"
                }}
            >
                Hello
            </p>
        );
    }

Важливо:

    style={ ... }

отримує JavaScript object.

CSS property names зазвичай записуються camelCase:

    fontSize
    backgroundColor
    marginTop

а не:

    font-size
    background-color
    margin-top

---

# Style Object

Можна винести object:

    const styles = {
        color: "red",
        fontSize: "20px"
    };

    function App() {
        return (
            <p style={styles}>
                Hello
            </p>
        );
    }

---

# CSS Style vs JSX style

CSS:

    .title {
        font-size: 20px;
        background-color: black;
    }

JSX inline style:

    <h1
        style={{
            fontSize: "20px",
            backgroundColor: "black"
        }}
    >
        Title
    </h1>

---

# JSX Attribute `style`

`style` не є string:

    style="color: red"

У JSX:

    style={{
        color: "red"
    }}

Тобто:

    style = JavaScript object

---

# JSX and CSS Classes

Звичайний class:

    <div className="card">
        Content
    </div>

CSS:

    .card {
        padding: 20px;
    }

---

# JSX and CSS Modules

При CSS Modules:

    import styles from "./Card.module.css";

    function Card() {
        return (
            <article className={styles.card}>
                <h2 className={styles.title}>
                    React
                </h2>
            </article>
        );
    }

---

# JSX and Components

Компонент може передаватися як JSX:

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

---

# Lowercase vs Uppercase

Дуже важливе правило.

    <div />

React сприймає як built-in / HTML element.

    <UserCard />

React сприймає як component.

Тому:

    function userCard() {
        ...
    }

і:

    <userCard />

не працюють як звичайний custom component.

Правильно:

    function UserCard() {
        ...
    }

    <UserCard />

---

# JSX Namespaces

JSX підтримує property-like names у певних випадках, наприклад SVG attributes.

При роботі з SVG можна зустріти:

    strokeWidth
    strokeLinecap
    fillRule

React JSX використовує camelCase conventions для багатьох SVG properties.

---

# SVG in JSX

SVG можна писати всередині JSX:

    function Icon() {
        return (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
            >
                <circle
                    cx="12"
                    cy="12"
                    r="10"
                />
            </svg>
        );
    }

SVG attributes у JSX можуть відрізнятися від звичайного SVG markup.

---

# JSX and `style`

Наприклад:

    const isActive = true;

    function Button() {
        return (
            <button
                style={{
                    opacity: isActive ? 1 : 0.5
                }}
            >
                Save
            </button>
        );
    }

---

# JSX and Conditional className

Можна умовно формувати className:

    const isActive = true;

    function Button() {
        return (
            <button
                className={
                    isActive
                        ? "button active"
                        : "button"
                }
            >
                Save
            </button>
        );
    }

Для складніших випадків часто використовують utility function або бібліотеки для class names.

---

# JSX and Logical Expressions

JSX expressions можуть бути досить складними:

    <p>
        Total: {price * quantity}
    </p>

Але хороший JSX повинен залишатися читабельним.

Якщо expression стає складним:

    const total = calculateTotal(
        price,
        quantity
    );

краще:

    <p>
        Total: {total}
    </p>

---

# JSX and `return`

Component часто має таку структуру:

    function UserCard() {
        const name = "John";
        const age = 25;

        return (
            <article>
                <h2>{name}</h2>
                <p>{age}</p>
            </article>
        );
    }

Модель:

    variables
        ↓
    logic
        ↓
    return JSX

---

# JSX and Early Return

Conditional logic можна винести перед основним JSX.

    function User({ user }) {
        if (!user) {
            return <p>No user.</p>;
        }

        return (
            <section>
                <h2>{user.name}</h2>
            </section>
        );
    }

Це часто читабельніше за складні ternary expressions.

---

# JSX and `null`

Component може повернути `null`.

    function OptionalMessage({ show }) {
        if (!show) {
            return null;
        }

        return <p>Hello!</p>;
    }

`null` означає, що component не render-ить UI.

---

# JSX and React Components as Values

Component можна використовувати як JSX:

    const element = <Header />;

Це значення можна передати, повернути або вставити в інший JSX.

Наприклад:

    function App() {
        const header = <Header />;

        return (
            <main>
                {header}
            </main>
        );
    }

---

# JSX Transformation

JSX не виконується browser як HTML.

JSX спочатку обробляється build tooling / compiler.

Наприклад:

    const element = <h1>Hello</h1>;

трансформується у JavaScript-код, який створює React element.

Сучасний React використовує automatic JSX runtime.

Концептуально:

    JSX
      ↓
    JavaScript transformation
      ↓
    React elements

---

# JSX Runtime

Сучасний React використовує automatic JSX transform/runtime.

Тому для звичайного JSX не потрібно вручну писати:

    import React from "react";

у кожному файлі лише для того, щоб JSX працював.

Наприклад:

    function App() {
        return <h1>Hello</h1>;
    }

працює без:

    import React from "react";

У сучасних React projects build tooling налаштований на JSX transform.

---

# Old JSX Transform

У старих React projects часто зустрічалося:

    import React from "react";

    function App() {
        return <h1>Hello</h1>;
    }

Це було необхідно через старі правила JSX transformation.

У сучасному React automatic JSX runtime прибирає цю вимогу для звичайного JSX.

---

# JSX and React.createElement

Історично JSX:

    <h1>Hello</h1>

трансформувався концептуально у:

    React.createElement(
        "h1",
        null,
        "Hello"
    );

Сучасний transform використовує нові JSX runtime functions.

Тому важливо розуміти:

    JSX
        ↓
    transformation
        ↓
    React element creation

але не прив'язувати сучасний React code до старого `React.createElement` syntax.

---

# JSX is Syntactic Sugar

JSX можна розглядати як зручний syntax для опису React elements.

Наприклад:

    const element = (
        <h1>Hello</h1>
    );

зрештою перетворюється build tooling у JavaScript.

Тому JSX не додає нову runtime мову.

Це syntax, який трансформується у JavaScript.

---

# JSX and JavaScript Statements

Важливо відрізняти:

    expression

та:

    statement

У `{}` JSX можна вставляти expressions.

Наприклад:

    {name}

    {2 + 2}

    {user.name}

    {isLoggedIn ? "Welcome" : "Login"}

    {getName()}

Але не можна безпосередньо вставити statement:

    if (...) { ... }

або:

    for (...) { ... }

або:

    const name = ...

безпосередньо як JSX expression.

---

# Expression Examples

Valid:

    <p>{name}</p>

    <p>{2 + 2}</p>

    <p>{user.name}</p>

    <p>{getName()}</p>

    <p>{isActive ? "Active" : "Inactive"}</p>

---

# Statement Examples

Не можна безпосередньо:

    <div>
        if (isActive) {
            ...
        }
    </div>

Також:

    <div>
        const name = "John";
    </div>

Або:

    <div>
        for (...) {
            ...
        }
    </div>

Логіку потрібно виконати перед JSX або виразити через expressions.

---

# Prepare Data Before JSX

Замість складного JSX:

    function User({ user }) {
        const displayName =
            user.firstName + " " + user.lastName;

        return (
            <h2>
                {displayName}
            </h2>
        );
    }

Це часто краще для читабельності.

---

# JSX and Destructuring

Props можна destructure:

    function User({ name, age }) {
        return (
            <section>
                <h2>{name}</h2>
                <p>{age}</p>
            </section>
        );
    }

Або:

    function User(props) {
        return (
            <section>
                <h2>{props.name}</h2>
                <p>{props.age}</p>
            </section>
        );
    }

Обидва підходи допустимі.

---

# JSX and Optional Chaining

Можна використовувати optional chaining:

    function User({ user }) {
        return (
            <p>
                {user?.profile?.name}
            </p>
        );
    }

Але потрібно розуміти, що якщо значення `undefined`, нічого не буде відображено.

---

# JSX and Nullish Coalescing

Наприклад:

    function User({ name }) {
        return (
            <h2>
                {name ?? "Unknown user"}
            </h2>
        );
    }

---

# JSX and Logical Operators

Основні operators, які часто зустрічаються в JSX:

    &&
    ||
    ??
    ?:

Наприклад:

    {isAdmin && <AdminPanel />}

    {name || "Guest"}

    {name ?? "Unknown"}

    {isLoading ? <Loading /> : <Content />}

---

# JSX and Function Return

Функція може повертати JSX:

    function getMessage() {
        return <p>Hello!</p>;
    }

Потім:

    function App() {
        return (
            <main>
                {getMessage()}
            </main>
        );
    }

Але якщо logic належить окремій UI частині, часто краще зробити component:

    function Message() {
        return <p>Hello!</p>;
    }

і:

    <Message />

---

# JSX and Reusable Components

JSX дозволяє комбінувати components:

    function App() {
        return (
            <Layout>
                <Header />
                <Main />
                <Footer />
            </Layout>
        );
    }

Це одна з основ component composition.

---

# JSX Children

Children — це content між opening та closing tags.

Наприклад:

    <Card>
        <h2>Title</h2>
        <p>Description</p>
    </Card>

Children:

    <h2>Title</h2>
    <p>Description</p>

Component може отримати їх через:

    children

---

# JSX Component Props

Наприклад:

    <UserCard
        name="John"
        age={25}
    />

JSX syntax передає:

    name
    age

як props component.

---

# JSX Component Attribute vs HTML Attribute

Для React component attributes фактично є props.

Наприклад:

    <UserCard
        name="John"
        age={25}
    />

Тут:

    name → prop
    age  → prop

Для HTML elements attributes керують behavior / properties element.

---

# JSX Naming Conventions

У JSX зазвичай використовуються:

    camelCase

Наприклад:

    onClick
    onChange
    className
    htmlFor
    tabIndex
    autoFocus
    readOnly

Component names:

    PascalCase

Наприклад:

    UserCard
    ProductList
    SearchForm

---

# JSX and Accessibility

JSX дозволяє використовувати стандартні accessibility attributes.

Наприклад:

    <button
        aria-label="Close"
    >
        ×
    </button>

ARIA attributes можуть використовувати kebab-case після `aria-`.

Наприклад:

    aria-label
    aria-hidden
    aria-expanded

`data-*` attributes також підтримуються:

    <div
        data-testid="user-card"
    >
        User
    </div>

---

# JSX and `data-*`

Custom data attributes:

    <button
        data-id="123"
    >
        User
    </button>

JavaScript value:

    const id = 123;

    <button
        data-id={id}
    >
        User
    </button>

---

# JSX and `aria-*`

Наприклад:

    <button
        aria-label="Close dialog"
    >
        ×
    </button>

Boolean-like ARIA values часто передаються як strings:

    aria-expanded="true"

або:

    aria-expanded={isOpen}

Потрібно дотримуватися очікуваного формату конкретного ARIA attribute.

---

# JSX and Input

Наприклад:

    function Form() {
        return (
            <form>
                <label htmlFor="name">
                    Name
                </label>

                <input
                    id="name"
                    type="text"
                    name="name"
                />
            </form>
        );
    }

---

# JSX and Form Attributes

Типові JSX attributes:

    value
    defaultValue
    checked
    defaultChecked
    disabled
    required
    placeholder
    name
    type
    id

Наприклад:

    <input
        type="email"
        name="email"
        placeholder="Email"
        required
    />

Forms будуть детальніше розглядатися у:

    02-events-state-and-forms

---

# JSX and Events Preview

    function Button() {
        function handleClick() {
            console.log("Clicked");
        }

        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

JSX:

    onClick={handleClick}

передає function як event handler.

---

# JSX and Event Object

Handler може отримати event:

    function handleClick(event) {
        console.log(event);
    }

    function Button() {
        return (
            <button onClick={handleClick}>
                Click
            </button>
        );
    }

---

# JSX and Inline Handler

Можна написати:

    <button
        onClick={() => {
            console.log("Clicked");
        }}
    >
        Click
    </button>

Це допустимо.

Але для складнішої logic краще:

    function handleClick() {
        console.log("Clicked");
    }

    <button onClick={handleClick}>
        Click
    </button>

---

# JSX and Parameters

Якщо handler потребує parameter:

    function handleDelete(id) {
        console.log(id);
    }

можна:

    <button
        onClick={() => handleDelete(10)}
    >
        Delete
    </button>

Arrow function створює callback, який викличе `handleDelete`.

---

# JSX and `map()`

Типовий React pattern:

    const users = [
        { id: 1, name: "John" },
        { id: 2, name: "Anna" }
    ];

    function UserList() {
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

Тут JSX використовується всередині `map()`.

---

# JSX and Keys

При render list потрібно надати `key`:

    {users.map((user) => (
        <UserCard
            key={user.id}
            user={user}
        />
    ))}

`key` допомагає React ідентифікувати elements списку.

Детально:

    05-list-and-keys

---

# JSX and `key` Is Not a Normal Prop

Важливо:

    key

має спеціальне значення для React.

Наприклад:

    <User
        key={user.id}
        id={user.id}
    />

`key` не буде доступний у component через:

    props.key

Якщо component потребує id, передай його окремо:

    <User
        key={user.id}
        id={user.id}
    />

---

# JSX and Fragments in Lists

Fragment також може використовуватися у списках.

Якщо потрібен `key`, short syntax:

    <>
        ...
    </>

не дозволяє передати `key`.

У такому випадку потрібен:

    <React.Fragment key={item.id}>
        ...
    </React.Fragment>

---

# JSX and Comments

Однорядковий JSX comment:

    {/* comment */}

Багаторядковий:

    {/*
        This is a comment.
        It can span multiple lines.
    */}

Не:

    <!-- comment -->

`<!-- -->` — HTML comment syntax, а не JSX comment syntax.

---

# JSX and HTML Entities

У JSX можна використовувати text:

    <p>
        Tom &amp; Jerry
    </p>

Або Unicode characters:

    <p>
        © 2026
    </p>

Також:

    <p>
        "Hello"
    </p>

---

# JSX and Quotes

У text можна використовувати quotes:

    <p>
        "Hello"
    </p>

Для attribute:

    <input
        placeholder="Enter name"
    />

---

# JSX and Special Characters

Якщо потрібно передати складний string як expression:

    const message = "Hello, World!";

    <p>{message}</p>

Це часто простіше, ніж manually escape text.

---

# JSX and HTML Comments

Не використовуй:

    <!-- comment -->

У JSX потрібно:

    {/* comment */}

---

# JSX and HTML `class`

HTML:

    <div class="card">

JSX:

    <div className="card">

---

# JSX and HTML `for`

HTML:

    <label for="name">

JSX:

    <label htmlFor="name">

---

# JSX and HTML Events

HTML:

    <button onclick="handleClick()">

React JSX:

    <button onClick={handleClick}>

React використовує function reference, а не string JavaScript code.

---

# JSX and Case Sensitivity

JSX attributes чутливі до правильного написання.

Наприклад:

    onClick

а не:

    onclick

І:

    className

а не:

    classname

---

# JSX and Custom Components

Custom component:

    function UserCard() {
        return (
            <article>
                User
            </article>
        );
    }

Використання:

    <UserCard />

Props:

    <UserCard
        name="John"
    />

Children:

    <UserCard>
        <p>Hello</p>
    </UserCard>

---

# JSX Component Composition

Наприклад:

    function Layout({ children }) {
        return (
            <div className="layout">
                {children}
            </div>
        );
    }

Використання:

    function App() {
        return (
            <Layout>
                <Header />
                <Main />
                <Footer />
            </Layout>
        );
    }

JSX дозволяє будувати component tree через nesting.

---

# JSX and Conditional Components

    function App({ isLoggedIn }) {
        return (
            <main>
                {isLoggedIn
                    ? <Dashboard />
                    : <Login />
                }
            </main>
        );
    }

---

# JSX and Dynamic Components

Component можна вибирати через variable.

Наприклад:

    const Component = isAdmin
        ? AdminPanel
        : UserPanel;

Потім:

    <Component />

Зверни увагу на uppercase:

    Component

а не:

    component

React JSX використовує capitalization для розпізнавання component.

---

# JSX and Dynamic HTML Tags

HTML tag можна вибирати через variable:

    const Tag = "h1";

    function App() {
        return (
            <Tag>
                Hello
            </Tag>
        );
    }

Це називається dynamic component / element pattern.

---

# JSX and `ReactNode`

У TypeScript часто можна описати children як:

    React.ReactNode

Наприклад:

    type CardProps = {
        children: React.ReactNode;
    };

    function Card({
        children
    }: CardProps) {
        return (
            <article>
                {children}
            </article>
        );
    }

`ReactNode` може представляти різні типи renderable React content.

---

# JSX and TypeScript

JSX у TypeScript files використовує extension:

    .tsx

Наприклад:

    App.tsx

а не:

    App.ts

якщо файл містить JSX.

---

# `.ts` vs `.tsx`

`.ts`:

    const name: string = "John";

`.tsx`:

    function App() {
        return <h1>Hello</h1>;
    }

Якщо файл містить JSX, зазвичай використовується:

    .tsx

---

# JSX and Type Checking

TypeScript перевіряє JSX.

Наприклад, якщо component очікує:

    type UserProps = {
        name: string;
    };

то:

    <User name="John" />

правильно.

А:

    <User name={123} />

буде type error, якщо `name` має тип `string`.

---

# JSX and Props Type

    type ButtonProps = {
        title: string;
        disabled: boolean;
    };

    function Button({
        title,
        disabled
    }: ButtonProps) {
        return (
            <button disabled={disabled}>
                {title}
            </button>
        );
    }

Використання:

    <Button
        title="Save"
        disabled={false}
    />

---

# JSX and Optional Props

    type UserProps = {
        name: string;
        age?: number;
    };

    function User({
        name,
        age
    }: UserProps) {
        return (
            <section>
                <h2>{name}</h2>

                {age !== undefined && (
                    <p>Age: {age}</p>
                )}
            </section>
        );
    }

---

# JSX Readability

Хороший JSX повинен бути зрозумілим.

Добре:

    function UserCard({ user }) {
        const fullName =
            `${user.firstName} ${user.lastName}`;

        return (
            <article>
                <h2>{fullName}</h2>
                <p>{user.role}</p>
            </article>
        );
    }

Менш читабельно:

    function UserCard({ user }) {
        return (
            <article>
                <h2>
                    {`${user.firstName} ${user.lastName}`}
                </h2>
                <p>
                    {user.role === "admin"
                        ? "Administrator"
                        : user.role === "user"
                            ? "User"
                            : "Unknown"}
                </p>
            </article>
        );
    }

Складну logic краще підготувати перед JSX.

---

# Keep JSX Declarative

Добре:

    const total = price * quantity;

    return (
        <p>
            Total: {total}
        </p>
    );

Не варто перетворювати JSX на місце для великої кількості business logic.

JSX найкраще працює як description UI.

---

# JSX and Business Logic

Business logic краще винести з JSX.

Наприклад:

    const canPurchase =
        user.isAuthenticated &&
        product.inStock &&
        user.balance >= product.price;

Потім:

    return (
        <button disabled={!canPurchase}>
            Buy
        </button>
    );

Замість складного expression безпосередньо в JSX.

---

# JSX and Helper Functions

Можна використовувати helper functions:

    function getStatusLabel(status) {
        if (status === "active") {
            return "Active";
        }

        if (status === "blocked") {
            return "Blocked";
        }

        return "Unknown";
    }

    function User({ status }) {
        return (
            <p>
                {getStatusLabel(status)}
            </p>
        );
    }

---

# JSX and Components vs Helper Functions

Helper function:

    function formatPrice(price) {
        return `${price} грн`;
    }

Component:

    function Price({ value }) {
        return <span>{formatPrice(value)}</span>;
    }

Helper function повертає data / value.

Component повертає UI.

---

# JSX and Reusable UI

JSX дозволяє описувати reusable UI:

    function Button({ children }) {
        return (
            <button className="button">
                {children}
            </button>
        );
    }

Використання:

    <Button>Save</Button>

    <Button>Cancel</Button>

    <Button>Delete</Button>

---

# Practical Example — Greeting

    type GreetingProps = {
        name: string;
    };

    function Greeting({
        name
    }: GreetingProps) {
        return (
            <h1>
                Hello, {name}!
            </h1>
        );
    }

Використання:

    function App() {
        return (
            <main>
                <Greeting name="John" />
                <Greeting name="Anna" />
            </main>
        );
    }

---

# Practical Example — Conditional JSX

    type StatusProps = {
        isOnline: boolean;
    };

    function Status({
        isOnline
    }: StatusProps) {
        return (
            <p>
                {isOnline
                    ? "Online"
                    : "Offline"}
            </p>
        );
    }

---

# Practical Example — List

    const fruits = [
        "Apple",
        "Banana",
        "Orange"
    ];

    function FruitList() {
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

---

# Practical Example — Form

    function LoginForm() {
        return (
            <form>
                <div>
                    <label htmlFor="email">
                        Email
                    </label>

                    <input
                        id="email"
                        type="email"
                        name="email"
                    />
                </div>

                <div>
                    <label htmlFor="password">
                        Password
                    </label>

                    <input
                        id="password"
                        type="password"
                        name="password"
                    />
                </div>

                <button type="submit">
                    Login
                </button>
            </form>
        );
    }

---

# Practical Example — Card

    type CardProps = {
        title: string;
        children: React.ReactNode;
    };

    function Card({
        title,
        children
    }: CardProps) {
        return (
            <article className="card">
                <h2 className="card__title">
                    {title}
                </h2>

                <div className="card__content">
                    {children}
                </div>
            </article>
        );
    }

Використання:

    function App() {
        return (
            <Card title="React">
                <p>
                    JSX is used to describe UI.
                </p>
            </Card>
        );
    }

---

# Practical Example — Dynamic UI

    type UserProps = {
        name: string;
        isAdmin: boolean;
    };

    function User({
        name,
        isAdmin
    }: UserProps) {
        return (
            <article>
                <h2>{name}</h2>

                {isAdmin && (
                    <span>
                        Administrator
                    </span>
                )}
            </article>
        );
    }

---

# Practical Example — Dynamic Attribute

    type AvatarProps = {
        src: string;
        alt: string;
    };

    function Avatar({
        src,
        alt
    }: AvatarProps) {
        return (
            <img
                src={src}
                alt={alt}
                width={100}
                height={100}
            />
        );
    }

---

# Practical Example — Dynamic className

    type ButtonProps = {
        isActive: boolean;
    };

    function Button({
        isActive
    }: ButtonProps) {
        return (
            <button
                className={
                    isActive
                        ? "button active"
                        : "button"
                }
            >
                Save
            </button>
        );
    }

---

# Practical Example — Spread Props

    type ButtonProps = {
        type: "button" | "submit";
        disabled?: boolean;
        children: React.ReactNode;
    };

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

Використання:

    <Button
        type="submit"
        disabled={false}
    >
        Save
    </Button>

---

# Типові помилки

❌ Плутати JSX з HTML.

    class

У JSX потрібно:

    className

---

❌ Використовувати `for` замість `htmlFor`.

Правильно:

    <label htmlFor="email">
        Email
    </label>

---

❌ Не закривати tags.

Неправильно:

    <input>

Правильно:

    <input />

---

❌ Забувати closing tag.

Неправильно:

    <p>Hello

Правильно:

    <p>Hello</p>

---

❌ Повернути декілька root elements.

Неправильно:

    return (
        <h1>Hello</h1>
        <p>World</p>
    );

Правильно:

    return (
        <>
            <h1>Hello</h1>
            <p>World</p>
        </>
    );

---

❌ Використовувати `if` безпосередньо в JSX.

Неправильно:

    {
        if (isLoggedIn) {
            ...
        }
    }

Краще:

    {
        isLoggedIn
            ? <Dashboard />
            : <Login />
    }

або:

    if (!isLoggedIn) {
        return <Login />;
    }

---

❌ Викликати event handler під час render.

Неправильно:

    <button onClick={handleClick()}>
        Click
    </button>

Правильно:

    <button onClick={handleClick}>
        Click
    </button>

---

❌ Плутати string та expression.

Неправильно:

    className="{className}"

Правильно:

    className={className}

---

❌ Render object безпосередньо.

Неправильно:

    <p>{user}</p>

Краще:

    <p>{user.name}</p>

---

❌ Забувати `key` у list.

Неправильно:

    {users.map((user) => (
        <User user={user} />
    ))}

Правильно:

    {users.map((user) => (
        <User
            key={user.id}
            user={user}
        />
    ))}

---

❌ Використовувати `index` як key без необхідності.

Наприклад:

    {items.map((item, index) => (
        <Item
            key={index}
            item={item}
        />
    ))}

Якщо items мають стабільний id, краще:

    {items.map((item) => (
        <Item
            key={item.id}
            item={item}
        />
    ))}

Детально це буде розглядатися у:

    05-list-and-keys

---

❌ Змішувати занадто багато logic з JSX.

Погано:

    <p>
        {
            user &&
            user.profile &&
            user.profile.status === "active"
                ? "Active user"
                : "Inactive user"
        }
    </p>

Краще:

    const isActive =
        user?.profile?.status === "active";

    return (
        <p>
            {isActive
                ? "Active user"
                : "Inactive user"}
        </p>
    );

---

❌ Використовувати HTML comments.

Неправильно:

    <!-- comment -->

Правильно:

    {/* comment */}

---

❌ Використовувати lowercase для custom component.

Неправильно:

    function userCard() {
        return <article>User</article>;
    }

    <userCard />

Правильно:

    function UserCard() {
        return <article>User</article>;
    }

    <UserCard />

---

❌ Використовувати `.ts` для файлу, який містить JSX.

Якщо файл містить JSX:

    App.tsx

а не:

    App.ts

---

# JSX Quick Reference

## Text

    <h1>Hello</h1>

---

## JavaScript expression

    <h1>{name}</h1>

---

## Expression

    <p>{price * quantity}</p>

---

## Function call

    <p>{formatName(name)}</p>

---

## Ternary

    {
        isLoggedIn
            ? "Welcome"
            : "Login"
    }

---

## Conditional rendering

    {
        isAdmin && <AdminPanel />
    }

---

## Attribute

    <img
        src="/logo.png"
        alt="Logo"
    />

---

## Dynamic attribute

    <img
        src={imageUrl}
        alt={altText}
    />

---

## Event

    <button onClick={handleClick}>
        Click
    </button>

---

## className

    <div className="container">
        Content
    </div>

---

## style

    <div
        style={{
            color: "red",
            fontSize: "20px"
        }}
    >
        Content
    </div>

---

## Fragment

    <>
        <Header />
        <Main />
    </>

---

## Comment

    {/* comment */}

---

## Component

    <UserCard />

---

## Component props

    <UserCard
        name="John"
        age={25}
    />

---

## Children

    <Card>
        <h2>Title</h2>
        <p>Content</p>
    </Card>

---

## List

    {items.map((item) => (
        <li key={item.id}>
            {item.name}
        </li>
    ))}

---

## Spread

    <Button {...buttonProps}>
        Save
    </Button>

---

# JSX Mental Model

Основна модель:

    JSX
      ↓
    JavaScript expressions
      ↓
    React elements
      ↓
    React
      ↓
    UI

Наприклад:

    const name = "John";

    <h1>Hello, {name}!</h1>

Можна читати як:

    JavaScript data
        ↓
    JSX
        ↓
    UI

---

# JSX Mental Model — Expressions

У `{}`:

    {expression}

можна вставити результат JavaScript expression.

Наприклад:

    {name}

    {user.name}

    {2 + 2}

    {getName()}

    {isAdmin && <AdminPanel />}

    {isLoggedIn
        ? <Dashboard />
        : <Login />}

---

# JSX Mental Model — Attributes

JSX attribute:

    name="John"

означає string.

А:

    age={25}

означає JavaScript expression.

А:

    disabled

означає:

    disabled={true}

---

# JSX Mental Model — Components

JSX:

    <UserCard
        name="John"
    />

можна мислити як:

    component
        +
    props

---

# JSX Mental Model — Children

JSX:

    <Card>
        <h2>Hello</h2>
    </Card>

можна мислити як:

    Card
      +
    children

---

# JSX Mental Model — Lists

JSX:

    {items.map(item => (
        <Item key={item.id} />
    ))}

можна мислити як:

    data
      ↓
    map()
      ↓
    JSX elements
      ↓
    UI list

---

# JSX Mental Model — Conditions

JSX:

    {
        isLoggedIn
            ? <Dashboard />
            : <Login />
    }

можна мислити як:

    condition
       ↓
    choose UI
       ↓
    render result

---

# Питання зі співбесіди

Що таке JSX?

Чим JSX відрізняється від HTML?

Чи є JSX окремою мовою?

Чи є JSX JavaScript?

Для чого використовується JSX?

Що таке JSX element?

Що таке JSX expression?

Що означають `{}` у JSX?

Які JavaScript expressions можна використовувати в JSX?

Чому `if` не можна безпосередньо використовувати всередині JSX?

Як зробити conditional rendering у JSX?

Як працює ternary operator у JSX?

Як працює `&&` у JSX?

Що таке Fragment?

Навіщо потрібен Fragment?

Чим `<>...</>` відрізняється від `<div>...</div>`?

Чому JSX elements потрібно закривати?

Що таке self-closing tag?

Чому використовується `className`, а не `class`?

Чому використовується `htmlFor`, а не `for`?

Чому JSX attributes використовують camelCase?

Як передати JavaScript variable у JSX?

Як передати number як prop?

Як передати boolean як prop?

Як передати object як prop?

Як передати function як prop?

Що таке spread props?

Що таке `children`?

Як render-ити array у JSX?

Як render-ити list через `map()`?

Навіщо потрібен `key`?

Чому object не можна безпосередньо render-ити як child?

Що відбувається з `null` у JSX?

Що відбувається з `false` у JSX?

Чому `{count && <Component />}` може відобразити `0`?

Чим `||` відрізняється від `??` у JSX?

Як передати event handler?

Чим відрізняється:

    onClick={handleClick}

від:

    onClick={handleClick()}

Як записати comment у JSX?

Як використовувати inline styles у JSX?

Чому CSS properties у `style` object записуються camelCase?

Що таке JSX transformation?

Чи потрібен `import React from "react"` для JSX у сучасному React?

Що таке automatic JSX runtime?

Чим `.ts` відрізняється від `.tsx`?

Що таке declarative UI?

Чому JSX вважається declarative syntax?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке JSX.

JSX ≠ HTML.

JSX ≠ окрема runtime мова.

JSX як syntax extension JavaScript.

JSX elements.

JSX expressions.

Curly braces:

    { }

JavaScript expressions у JSX.

Variables у JSX.

Function calls у JSX.

Arithmetic expressions.

Ternary operator.

Conditional rendering.

Logical `&&`.

`className`.

`htmlFor`.

camelCase JSX attributes.

Self-closing tags.

Closing tags.

Nested JSX.

One root element.

Fragments.

JSX comments.

JSX props.

String props.

Number props.

Boolean props.

Object / array props.

Function props.

`children`.

Основи event handlers.

Основи rendering lists.

`map()` у JSX.

Основи `key`.

---

## 🔵 Junior

Впевнене написання JSX.

Розуміння JSX expressions.

Розуміння expression vs statement.

Conditional rendering.

Ternary expressions.

`&&`.

`||`.

`??`.

Early returns.

JSX variables.

Dynamic attributes.

Dynamic `className`.

Inline styles.

Spread props.

Component props.

Children.

Event handlers.

Lists через `map()`.

Keys.

Fragments.

Accessibility attributes:

    aria-*
    data-*

SVG у JSX.

TypeScript + JSX.

`.tsx`.

`React.ReactNode`.

Читабельний JSX.

Винесення складної logic з JSX.

Розуміння JSX transformation.

Automatic JSX runtime.

---

## 🟠 Middle

Складні conditional rendering patterns.

Reusable JSX abstractions.

Dynamic components.

Component-as-value patterns.

Advanced composition.

Render props.

Compound components.

Controlled components.

Complex JSX APIs.

Advanced TypeScript JSX typing.

Generic components.

Polymorphic components.

Advanced `children` typing.

JSX and design systems.

JSX performance considerations.

Reducing unnecessary JSX complexity.

Component abstraction boundaries.

---

## 🔴 Senior

Глибоке розуміння JSX transformation.

JSX runtime architecture.

Automatic JSX transform.

React element creation.

Component identity.

Element identity.

Reconciliation implications.

Keys and element identity.

Advanced component composition.

Polymorphic component architecture.

Design system JSX APIs.

Server Components boundaries.

Client Components boundaries.

Streaming UI.

JSX architecture у великих applications.

Trade-offs між:

    JSX simplicity
    abstraction
    composition
    readability
    type safety
    performance

---

# Міні-шпаргалка

## JSX

    function App() {
        return <h1>Hello</h1>;
    }

JSX:

    <h1>Hello</h1>

---

## Expression

    const name = "John";

    <h1>Hello, {name}</h1>

---

## Arithmetic

    <p>{10 + 20}</p>

---

## Function

    <p>{getName()}</p>

---

## Ternary

    {
        isLoggedIn
            ? "Welcome"
            : "Login"
    }

---

## Conditional

    {
        isAdmin && <AdminPanel />
    }

---

## Component

    <UserCard />

---

## Props

    <UserCard
        name="John"
        age={25}
    />

---

## Children

    <Card>
        <h2>React</h2>
        <p>JSX</p>
    </Card>

---

## className

    <div className="container">
        Content
    </div>

---

## htmlFor

    <label htmlFor="email">
        Email
    </label>

---

## Event

    <button onClick={handleClick}>
        Click
    </button>

---

## Fragment

    <>
        <Header />
        <Main />
        <Footer />
    </>

---

## Comment

    {/* comment */}

---

## Style

    <div
        style={{
            color: "red",
            fontSize: "20px"
        }}
    >
        Content
    </div>

---

## List

    {items.map((item) => (
        <Item
            key={item.id}
            item={item}
        />
    ))}

---

## Spread

    <Button {...buttonProps}>
        Save
    </Button>

---

## JSX TypeScript

    function User({
        name
    }: {
        name: string;
    }) {
        return <h2>{name}</h2>;
    }

---

# Основні правила

    JSX
        → syntax extension JavaScript

    {}
        → JavaScript expression

    className
        → CSS class

    htmlFor
        → label association

    onClick
        → React event handler

    PascalCase
        → React component

    camelCase
        → JSX attributes

    <>
        → Fragment

    key
        → list element identity

    children
        → nested JSX content

    .tsx
        → TypeScript + JSX

---

# Головне:

• JSX — syntax extension JavaScript для опису UI.

• JSX виглядає як HTML, але JSX не є HTML.

• JSX використовується всередині JavaScript / TypeScript.

• React components часто повертають JSX.

• JSX expressions записуються через:

    { }

• У `{}` можна використовувати JavaScript expressions:

    {name}

    {user.name}

    {2 + 2}

    {getName()}

    {isActive ? "Active" : "Inactive"}

• `if`, `for`, `const` та інші statements не можна безпосередньо вставити в JSX expression.

• Conditional rendering можна робити через:

    if
    ternary
    &&
    early return

• JSX elements повинні бути закриті:

    <input />

    <p>Hello</p>

• Якщо component повертає декілька sibling elements, потрібен спільний parent або Fragment.

• Fragment:

    <>
        ...
    </>

не створює додатковий DOM element.

• JSX attributes часто відрізняються від HTML attributes.

• У JSX:

    className
    htmlFor
    onClick
    onChange
    tabIndex

• HTML:

    class
    for
    onclick

• String attribute:

    className="button"

• JavaScript expression:

    className={className}

• Boolean attribute:

    disabled

означає:

    disabled={true}

• Props передаються через JSX attributes:

    <User
        name="John"
        age={25}
    />

• `children` — JSX content між opening та closing tags:

    <Card>
        <p>Hello</p>
    </Card>

• Function потрібно передавати як event handler:

    onClick={handleClick}

а не:

    onClick={handleClick()}

• Для lists часто використовується:

    map()

• List elements повинні мати стабільний `key`.

• `key` має спеціальне значення для React і не є звичайним prop.

• Object не можна безпосередньо render-ити як child.

• `null`, `undefined` та boolean values не render-яться як звичайний text.

• Потрібно бути уважним з:

    count && <Component />

бо якщо `count === 0`, expression може повернути `0`.

• `className` можна формувати динамічно:

    className={
        isActive
            ? "button active"
            : "button"
    }

• Inline styles передаються як object:

    style={{
        color: "red",
        fontSize: "20px"
    }}

• JSX comments:

    {/* comment */}

• JSX підтримує spread attributes:

    <Component {...props} />

• JSX може містити components:

    <Header />

• JSX може містити nested components:

    <Layout>
        <Header />
        <Main />
    </Layout>

• JSX може бути використаний з TypeScript у `.tsx` файлах.

• JSX transformations перетворюють JSX у JavaScript, який використовується React runtime.

• У сучасному React використовується automatic JSX runtime, тому звичайному JSX більше не потрібен обов'язковий:

    import React from "react";

• JSX краще використовувати для опису UI, а складну business logic тримати поза JSX.

• Хороший JSX повинен бути:

    readable
    declarative
    predictable
    composable

• Основна mental model:

    JavaScript data
          ↓
        JSX
          ↓
    React elements
          ↓
         React
          ↓
          UI

• JSX — це міст між JavaScript logic та декларативним описом React UI.