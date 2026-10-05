# 01. Testing Basics

Component testing — це процес перевірки React-компонентів за допомогою автоматизованих тестів.

Тести дозволяють перевірити, що компонент:

- правильно рендериться;
- відображає очікуваний текст;
- показує правильні елементи;
- реагує на взаємодію користувача;
- правильно працює з props;
- правильно працює зі state;
- правильно обробляє помилки;
- не ламається після змін у коді.

У React component testing найчастіше використовуються:

    Vitest
    Jest
    React Testing Library
    @testing-library/jest-dom
    @testing-library/user-event

У цьому розділі основна увага — на фундаментальних поняттях тестування React-компонентів.

---

### Ключові поняття

✔ testing  
✔ test  
✔ test case  
✔ test suite  
✔ assertion  
✔ matcher  
✔ expect  
✔ arrange  
✔ act  
✔ assert  
✔ AAA pattern  
✔ unit test  
✔ component test  
✔ integration test  
✔ end-to-end test  
✔ test runner  
✔ test environment  
✔ test file  
✔ test setup  
✔ test isolation  
✔ deterministic test  
✔ mock  
✔ stub  
✔ spy  
✔ fixture  
✔ coverage  
✔ React Testing Library  
✔ Vitest  
✔ Jest  
✔ DOM testing  
✔ user behavior  
✔ accessibility queries  

---

### Що потрібно пам'ятати

• Test — автоматизована перевірка очікуваної поведінки програми.

• Component test — тест, який перевіряє поведінку React-компонента.

• Test runner запускає тести та показує результат.

• Assertion перевіряє, чи відповідає фактичний результат очікуваному.

• `expect()` використовується для створення assertion.

• Matcher визначає, що саме ми очікуємо від результату.

• React Testing Library заохочує тестувати компонент так, як його бачить і використовує користувач.

• Хороший тест перевіряє behavior, а не внутрішню реалізацію компонента.

• Тест повинен бути максимально зрозумілим.

• Хороший тест зазвичай має структуру:

    Arrange
    Act
    Assert

• Тести повинні бути незалежними один від одного.

• Один тест повинен перевіряти одну логічну поведінку.

• Тест не повинен залежати від порядку виконання інших тестів.

• Deterministic test за однакових умов повинен давати однаковий результат.

• Mocking потрібен тоді, коли компонент залежить від зовнішньої системи або складної залежності.

• Test coverage показує, яка частина коду була виконана під час тестів.

• Високий coverage сам по собі не гарантує хороших тестів.

---

# Що таке Testing

Testing — це перевірка того, що програмне забезпечення працює відповідно до очікуваної поведінки.

Наприклад, є компонент:

    function Greeting() {
        return <h1>Hello, world!</h1>;
    }

Можна написати тест, який перевіряє:

    → компонент рендериться
    → текст "Hello, world!" присутній

Тест перевіряє не те, як написаний компонент, а те, що користувач отримує очікуваний результат.

---

# Навіщо потрібні тести

Тести допомагають:

    знаходити bugs
    ↓
    перевіряти behavior
    ↓
    безпечніше змінювати код
    ↓
    запобігати regression
    ↓
    підтримувати якість проєкту

---

## Regression

Regression — ситуація, коли нова зміна ламає функціональність, яка раніше працювала.

Наприклад:

    Component працював
        ↓
    developer змінив code
        ↓
    Component перестав працювати
        ↓
    existing test fails

Тест допомагає швидко виявити проблему.

---

# Test

Test — окрема автоматизована перевірка.

Наприклад:

    test("renders greeting", () => {
        ...
    });

Назва тесту описує очікувану поведінку:

    renders greeting

---

# Test Case

Test case — конкретний сценарій, який потрібно перевірити.

Наприклад, для LoginForm:

    valid credentials
    invalid credentials
    empty email
    empty password
    loading state
    server error

Кожен із цих сценаріїв може бути окремим test case.

---

# Test Suite

Test suite — група пов'язаних тестів.

Наприклад:

    describe("LoginForm", () => {
        test("renders email input", () => {
            ...
        });

        test("renders password input", () => {
            ...
        });

        test("submits valid form", () => {
            ...
        });
    });

Тут:

    describe(...)
        ↓
    test suite

---

# Test File

Тест зазвичай знаходиться в окремому файлі.

Наприклад:

    Button.tsx
    Button.test.tsx

або:

    Button.tsx
    Button.spec.tsx

Обидва naming patterns використовуються в проєктах.

---

# .test.tsx

Для React-компонентів часто використовують:

    Component.test.tsx

Наприклад:

    Button.test.tsx

або:

    LoginForm.test.tsx

---

# .spec.tsx

Інший популярний формат:

    Button.spec.tsx

Назви:

    .test.tsx
    .spec.tsx

не змінюють принцип роботи тесту.

Це convention проєкту.

---

# Test Runner

Test runner — інструмент, який:

    знаходить test files
        ↓
    запускає tests
        ↓
    виконує assertions
        ↓
    показує результат

Популярні test runners:

    Vitest
    Jest

---

# Vitest

Vitest — сучасний JavaScript/TypeScript test runner.

У Vite-проєктах він особливо зручний.

Типовий import:

    import { describe, expect, test } from "vitest";

Приклад:

    test("2 + 2 equals 4", () => {
        expect(2 + 2).toBe(4);
    });

---

# Jest

Jest — популярний JavaScript testing framework.

Приклад:

    test("2 + 2 equals 4", () => {
        expect(2 + 2).toBe(4);
    });

Основні concepts:

    test()
    describe()
    expect()
    matchers
    mocks
    spies

---

# Vitest vs Jest

Обидва інструменти вирішують подібні задачі.

    Vitest
        → швидкий
        → добре інтегрується з Vite
        → сучасний ecosystem

    Jest
        → дуже поширений
        → великий ecosystem
        → багато legacy-проєктів

Для сучасного Vite + React проєкту часто зручно використовувати:

    Vitest + React Testing Library

Але принципи testing залишаються подібними.

---

# React Testing Library

React Testing Library — бібліотека для тестування React-компонентів.

Основна ідея:

    test the component
    the way the user uses it

Тобто замість перевірки внутрішнього state або implementation details ми перевіряємо:

    text
    buttons
    inputs
    links
    roles
    user interactions
    visible behavior

---

# Testing Library Philosophy

Основна ідея:

    user behavior
        ↓
    component behavior
        ↓
    test

а не:

    implementation details
        ↓
    test

Наприклад, краще перевірити:

    button is visible

ніж:

    component.state.isOpen === true

Користувач не бачить:

    component.state.isOpen

Користувач бачить:

    dialog is visible

Тому тест краще будувати навколо visible behavior.

---

# User-Centered Testing

React Testing Library заохочує тестувати компонент приблизно так, як користувач із ним взаємодіє.

Наприклад:

    find button
        ↓
    click button
        ↓
    check result

А не:

    find internal state
        ↓
    modify state
        ↓
    inspect implementation

---

# Installation

Для React + Vitest типова установка може виглядати так:

    npm install -D vitest jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event

Для Jest набір залежностей буде іншим.

У конкретному проєкті потрібно орієнтуватися на його tooling.

---

# Test Environment

React-компоненти працюють із DOM.

Node.js сам по собі не має повноцінного browser DOM.

Тому для component testing використовується test environment.

Наприклад:

    jsdom

`jsdom` створює JavaScript-модель DOM, у якій можна тестувати багато browser-like сценаріїв.

---

# jsdom

`jsdom` дозволяє виконувати DOM-oriented код у test environment.

Наприклад:

    document
    window
    HTMLElement
    button
    input

Це дозволяє React Testing Library працювати з компонентами.

---

# Basic Test

Приклад простого тесту:

    import { test, expect } from "vitest";

    test("adds two numbers", () => {
        const result = 2 + 3;

        expect(result).toBe(5);
    });

Тут:

    test()
        → створює test case

    expect()
        → створює assertion

    toBe()
        → matcher

---

# expect()

`expect()` використовується для перевірки результату.

Наприклад:

    expect(2 + 2).toBe(4);

Логіка:

    actual value
        ↓
    expect()
        ↓
    matcher
        ↓
    expected value

---

# Matcher

Matcher визначає, що саме ми перевіряємо.

Наприклад:

    toBe()
    toEqual()
    toContain()
    toBeTruthy()
    toBeFalsy()
    toBeNull()
    toBeDefined()
    toHaveLength()

Для DOM:

    toBeInTheDocument()
    toBeVisible()
    toBeDisabled()
    toHaveTextContent()
    toHaveAttribute()

---

# toBe()

`toBe()` використовується для strict equality.

    expect(2 + 2).toBe(4);

Ще:

    expect("hello").toBe("hello");

Для об'єктів потрібно бути обережним.

Наприклад:

    expect(
        { name: "John" }
    ).toBe(
        { name: "John" }
    );

не пройде, тому що це різні object references.

---

# toEqual()

`toEqual()` порівнює значення структурно.

    expect(
        { name: "John" }
    ).toEqual(
        { name: "John" }
    );

Тут assertion проходить.

---

# toBeTruthy()

Перевіряє truthy value.

    expect(true).toBeTruthy();

Також:

    expect("hello").toBeTruthy();

---

# toBeFalsy()

Перевіряє falsy value.

    expect(false).toBeFalsy();

---

# toBeNull()

    expect(null).toBeNull();

---

# toBeDefined()

    const value = "hello";

    expect(value).toBeDefined();

---

# toContain()

Перевіряє наявність елемента.

    expect([1, 2, 3]).toContain(2);

Для string:

    expect("Hello world").toContain("world");

---

# toHaveLength()

    expect([1, 2, 3]).toHaveLength(3);

---

# AAA Pattern

Один із найважливіших шаблонів тестування:

    Arrange
    Act
    Assert

---

## Arrange

Підготовка.

    const user = {
        name: "John"
    };

---

## Act

Виконання дії.

    const result = getUserName(user);

---

## Assert

Перевірка результату.

    expect(result).toBe("John");

---

# Повний AAA приклад

    test("returns user name", () => {
        // Arrange
        const user = {
            name: "John"
        };

        // Act
        const result = getUserName(user);

        // Assert
        expect(result).toBe("John");
    });

Структура:

    Arrange
        ↓
    Act
        ↓
    Assert

---

# React Component Test

Наприклад, компонент:

    function Greeting() {
        return <h1>Hello, world!</h1>;
    }

Тест:

    import { render, screen } from "@testing-library/react";
    import { test, expect } from "vitest";

    test("renders greeting", () => {
        render(<Greeting />);

        expect(
            screen.getByRole("heading", {
                name: /hello, world/i
            })
        ).toBeInTheDocument();
    });

Тут:

    render()
        → рендерить component

    screen
        → доступ до rendered DOM

    getByRole()
        → знаходить element

    expect()
        → assertion

    toBeInTheDocument()
        → перевіряє presence

---

# render()

`render()` рендерить React-компонент у test environment.

    render(<Greeting />);

Наприклад:

    test("renders button", () => {
        render(<Button />);

        ...
    });

Після `render()` можна шукати елементи компонента.

---

# screen

`screen` — зручний спосіб взаємодії з DOM, який був створений після `render()`.

Наприклад:

    render(<Greeting />);

    screen.getByRole("heading");

---

# Query

Query — спосіб знайти елемент у rendered DOM.

Основні queries:

    getBy...
    queryBy...
    findBy...

Наприклад:

    screen.getByRole("button");

---

# getByRole()

Один із найважливіших способів пошуку елементів.

    screen.getByRole("button");

Наприклад:

    <button>Save</button>

можна знайти:

    screen.getByRole("button", {
        name: /save/i
    });

---

# Чому getByRole важливий

Він орієнтується на accessibility semantics.

Наприклад:

    <button>Save</button>

має role:

    button

А:

    <h1>Hello</h1>

має role:

    heading

Тому тест перевіряє компонент ближче до того, як його сприймає користувач і assistive technologies.

---

# Accessible Name

Для:

    <button>Save</button>

accessible name:

    Save

Тому:

    screen.getByRole("button", {
        name: /save/i
    });

---

# getByText()

Можна шукати текст:

    screen.getByText("Hello, world!");

Наприклад:

    <p>Hello, world!</p>

Але якщо елемент має semantic role, часто краще:

    getByRole()

---

# getByLabelText()

Особливо корисний для forms.

Наприклад:

    <label htmlFor="email">
        Email
    </label>

    <input id="email" />

Тест:

    screen.getByLabelText("Email");

Це дозволяє знаходити input через його label.

---

# getByPlaceholderText()

Можна знайти input через placeholder:

    screen.getByPlaceholderText("Enter email");

Але placeholder не повинен замінювати правильний label.

Краще:

    <label htmlFor="email">
        Email
    </label>

    <input
        id="email"
        placeholder="Enter email"
    />

і тестувати через:

    getByLabelText("Email")

---

# getByTestId()

Можна використовувати:

    data-testid

Наприклад:

    <div data-testid="user-card">
        ...
    </div>

Тест:

    screen.getByTestId("user-card");

Але це не повинен бути перший вибір.

Спочатку варто розглядати:

    getByRole()
    getByLabelText()
    getByText()

і лише потім:

    getByTestId()

---

# Query Priority

Загальна рекомендація:

    1. getByRole()
    2. getByLabelText()
    3. getByPlaceholderText()
    4. getByText()
    5. getByDisplayValue()
    6. getByAltText()
    7. getByTitle()
    8. getByTestId()

Найкраще використовувати query, яка найближча до того, як користувач знаходить елемент.

---

# getBy vs queryBy vs findBy

Це дуже важлива різниця.

    getBy
        → element має існувати зараз

    queryBy
        → element може не існувати

    findBy
        → element з'явиться асинхронно

---

# getBy

Якщо елемент не знайдений, `getBy` кидає error.

    const button = screen.getByRole("button");

Якщо button немає:

    test fails

Використовуй `getBy`, коли елемент повинен бути присутнім.

---

# queryBy

`queryBy` не кидає error, якщо елемент не знайдений.

    const button = screen.queryByRole("button");

Якщо button відсутній:

    null

Це особливо корисно для перевірки відсутності елемента.

Наприклад:

    expect(
        screen.queryByRole("dialog")
    ).not.toBeInTheDocument();

---

# findBy

`findBy` використовується для асинхронної появи елемента.

    const message = await screen.findByText(
        "Data loaded"
    );

Наприклад:

    render(<UserProfile />);

    expect(
        await screen.findByText("John")
    ).toBeInTheDocument();

---

# getBy / queryBy / findBy

Можна запам'ятати:

    getBy
        → must exist now

    queryBy
        → may not exist

    findBy
        → appears asynchronously

---

# Multiple Elements

Якщо елементів декілька, використовуються:

    getAllBy...
    queryAllBy...
    findAllBy...

Наприклад:

    screen.getAllByRole("listitem");

---

# getAllByRole

    const items = screen.getAllByRole("listitem");

    expect(items).toHaveLength(3);

---

# queryAllByRole

Якщо елементи можуть бути відсутні:

    const items = screen.queryAllByRole(
        "listitem"
    );

Якщо нічого немає:

    []

---

# findAllByRole

Для асинхронної появи:

    const items = await screen.findAllByRole(
        "listitem"
    );

---

# DOM Matchers

Для React Testing Library часто використовується:

    @testing-library/jest-dom

Він додає зручні matchers для DOM.

Наприклад:

    toBeInTheDocument()
    toBeVisible()
    toBeDisabled()
    toBeEnabled()
    toHaveTextContent()
    toHaveAttribute()
    toHaveClass()
    toHaveValue()
    toBeChecked()

---

# toBeInTheDocument()

    expect(
        screen.getByText("Hello")
    ).toBeInTheDocument();

---

# toBeVisible()

    expect(
        screen.getByRole("button")
    ).toBeVisible();

---

# toBeDisabled()

    expect(
        screen.getByRole("button")
    ).toBeDisabled();

---

# toHaveTextContent()

    expect(
        screen.getByRole("heading")
    ).toHaveTextContent("Hello");

---

# toHaveAttribute()

    expect(
        screen.getByRole("link")
    ).toHaveAttribute("href", "/about");

---

# toHaveClass()

    expect(element).toHaveClass("active");

---

# toHaveValue()

Для input:

    expect(
        screen.getByLabelText("Email")
    ).toHaveValue("test@example.com");

---

# toBeChecked()

Для checkbox:

    expect(
        screen.getByRole("checkbox")
    ).toBeChecked();

---

# User Behavior

Хороший component test моделює дії користувача.

Наприклад:

    render(<Counter />);

    const button = screen.getByRole("button", {
        name: /increment/i
    });

    await user.click(button);

    expect(
        screen.getByText("1")
    ).toBeInTheDocument();

Логіка:

    render
        ↓
    find element
        ↓
    user action
        ↓
    observe result

---

# userEvent

Для симуляції взаємодії користувача використовується:

    @testing-library/user-event

Наприклад:

    import userEvent from "@testing-library/user-event";

    test("user can click button", async () => {
        const user = userEvent.setup();

        render(<Counter />);

        const button = screen.getByRole("button", {
            name: /increment/i
        });

        await user.click(button);

        ...
    });

---

# userEvent vs fireEvent

`userEvent` моделює поведінку користувача більш реалістично.

`fireEvent` безпосередньо dispatch-ить DOM events.

Для звичайного component testing переважно:

    userEvent

Наприклад:

    await user.click(button);

замість ручного:

    fireEvent.click(button);

---

# Test Isolation

Тести повинні бути незалежними.

Наприклад:

    test("test A", () => {
        ...
    });

    test("test B", () => {
        ...
    });

Test B не повинен залежати від того, що зробив test A.

Погано:

    test A
        ↓
    modifies shared state
        ↓
    test B depends on it

Добре:

    test A → independent

    test B → independent

---

# Shared State

Небезпечно використовувати mutable shared state між тестами.

Наприклад:

    let users = [];

    test("adds user", () => {
        users.push("John");
    });

    test("users is empty", () => {
        ...
    });

Другий тест залежить від першого.

Краще створювати test data всередині кожного тесту або правильно очищати state.

---

# beforeEach

`beforeEach()` виконується перед кожним тестом.

    beforeEach(() => {
        ...
    });

Наприклад:

    beforeEach(() => {
        ...
    });

    test("test A", () => {
        ...
    });

    test("test B", () => {
        ...
    });

---

# afterEach

`afterEach()` виконується після кожного тесту.

    afterEach(() => {
        ...
    });

Часто використовується для cleanup.

---

# beforeAll

`beforeAll()` виконується один раз перед усіма тестами suite.

    beforeAll(() => {
        ...
    });

---

# afterAll

`afterAll()` виконується один раз після всіх тестів.

    afterAll(() => {
        ...
    });

---

# Lifecycle of Tests

Спрощено:

    beforeAll
        ↓
    beforeEach
        ↓
    test
        ↓
    afterEach
        ↓
    beforeEach
        ↓
    test
        ↓
    afterEach
        ↓
    afterAll

---

# describe()

`describe()` групує пов'язані тести.

    describe("Button", () => {
        test("renders", () => {
            ...
        });

        test("is clickable", () => {
            ...
        });
    });

Це робить test suite структурованим.

---

# test() та it()

У Vitest/Jest можна зустріти:

    test()

і:

    it()

Наприклад:

    test("renders button", () => {
        ...
    });

або:

    it("renders button", () => {
        ...
    });

У більшості випадків вони використовуються як альтернативні назви для test case.

---

# Тестування Props

Компонент:

    function Greeting({ name }) {
        return <h1>Hello, {name}!</h1>;
    }

Тест:

    test("renders user name", () => {
        render(<Greeting name="John" />);

        expect(
            screen.getByRole("heading", {
                name: "Hello, John!"
            })
        ).toBeInTheDocument();
    });

Тут перевіряємо:

    props
        ↓
    rendered output

---

# Тестування Default Props

Наприклад:

    function Greeting({
        name = "Guest"
    }) {
        return <h1>Hello, {name}!</h1>;
    }

Тест:

    test("uses default name", () => {
        render(<Greeting />);

        expect(
            screen.getByRole("heading", {
                name: "Hello, Guest!"
            })
        ).toBeInTheDocument();
    });

---

# Тестування Conditional Rendering

Компонент:

    function Status({ isOnline }) {
        return (
            <div>
                {isOnline ? "Online" : "Offline"}
            </div>
        );
    }

Тест:

    test("shows online status", () => {
        render(<Status isOnline={true} />);

        expect(
            screen.getByText("Online")
        ).toBeInTheDocument();
    });

Другий тест:

    test("shows offline status", () => {
        render(<Status isOnline={false} />);

        expect(
            screen.getByText("Offline")
        ).toBeInTheDocument();
    });

---

# Testing Absence

Для перевірки, що елемента немає:

    expect(
        screen.queryByRole("alert")
    ).not.toBeInTheDocument();

Саме тут `queryBy` дуже корисний.

---

# Testing Text

    render(<Greeting />);

    expect(
        screen.getByText("Hello")
    ).toBeInTheDocument();

Але якщо текст належить heading:

    screen.getByRole("heading", {
        name: "Hello"
    });

часто буде більш semantic choice.

---

# Testing Buttons

Компонент:

    function SaveButton() {
        return <button>Save</button>;
    }

Тест:

    test("renders save button", () => {
        render(<SaveButton />);

        expect(
            screen.getByRole("button", {
                name: "Save"
            })
        ).toBeInTheDocument();
    });

---

# Testing Links

    function Navigation() {
        return (
            <a href="/about">
                About
            </a>
        );
    }

Тест:

    test("renders about link", () => {
        render(<Navigation />);

        const link = screen.getByRole("link", {
            name: "About"
        });

        expect(link).toHaveAttribute(
            "href",
            "/about"
        );
    });

---

# Testing Images

Наприклад:

    <img
        src="/avatar.jpg"
        alt="John"
    />

Тест:

    const image = screen.getByRole("img", {
        name: "John"
    });

    expect(image).toBeInTheDocument();

---

# Testing Inputs

Компонент:

    function EmailInput() {
        return (
            <label>
                Email
                <input type="email" />
            </label>
        );
    }

Тест:

    test("renders email input", () => {
        render(<EmailInput />);

        expect(
            screen.getByLabelText("Email")
        ).toBeInTheDocument();
    });

---

# Accessibility and Testing

Правильна HTML-структура допомагає не тільки accessibility, але й testing.

Наприклад:

    <button>
        Save
    </button>

краще, ніж:

    <div onClick={handleSave}>
        Save
    </div>

У першому випадку:

    getByRole("button")

працює природно.

Тому хороша accessibility часто робить компонент простішим для тестування.

---

# Implementation Details

Implementation details — внутрішні механізми компонента.

Наприклад:

    internal state
    private helper
    internal function
    component instance
    specific DOM structure

Не варто тестувати їх без необхідності.

Наприклад, погано:

    expect(component.state.count).toBe(1);

Краще:

    expect(
        screen.getByText("1")
    ).toBeInTheDocument();

Тобто:

    implementation
        ❌

    user-visible behavior
        ✅

---

# Behavior vs Implementation

Поганий підхід:

    "Чи має component state count = 1?"

Кращий підхід:

    "Чи бачить користувач count = 1?"

Поганий тест прив'язаний до implementation.

Хороший тест прив'язаний до behavior.

---

# Unit Test

Unit test перевіряє невелику ізольовану частину системи.

Наприклад:

    function add(a, b) {
        return a + b;
    }

Тест:

    test("adds numbers", () => {
        expect(add(2, 3)).toBe(5);
    });

---

# Component Test

Component test перевіряє React-компонент.

Наприклад:

    render(<Button />);

    expect(
        screen.getByRole("button")
    ).toBeInTheDocument();

---

# Integration Test

Integration test перевіряє взаємодію кількох частин системи.

Наприклад:

    Form
        ↓
    validation
        ↓
    API
        ↓
    UI update

Integration test перевіряє не одну функцію, а взаємодію частин.

---

# End-to-End Test

E2E test перевіряє повний сценарій через реальний browser environment.

Наприклад:

    open website
        ↓
    login
        ↓
    open dashboard
        ↓
    create item
        ↓
    verify result

Популярний інструмент:

    Playwright

або:

    Cypress

---

# Testing Pyramid

Умовно тести можна представити:

    E2E tests
         ▲
         │
    Integration tests
         ▲
         │
    Component tests
         ▲
         │
    Unit tests

Зазвичай:

    багато швидких tests
        ↓
    менше integration tests
        ↓
    ще менше дорогих E2E tests

Але сучасні frontend-проєкти часто роблять значну кількість component/integration tests.

---

# Deterministic Test

Deterministic test — тест, який за однакових умов дає однаковий результат.

Добре:

    expect(2 + 2).toBe(4);

Проблематично:

    expect(Math.random()).toBe(...);

якщо результат не контролюється.

Також проблеми можуть виникати через:

    current time
    random values
    network
    external services
    shared state

---

# Flaky Test

Flaky test — тест, який іноді проходить, а іноді падає без зміни коду.

Наприклад:

    test passes
    test passes
    test fails
    test passes

Причини:

    race conditions
    timing
    asynchronous code
    real network
    shared state
    random data
    incorrect cleanup

Flaky tests особливо небезпечні, тому що знижують довіру до test suite.

---

# Async Testing

React-компоненти часто працюють асинхронно.

Наприклад:

    render(<UserProfile />);

    const user = await screen.findByText("John");

Тут:

    findBy...
        → чекає появи element

---

# async / await

Тест може бути asynchronous:

    test("loads user", async () => {
        render(<UserProfile />);

        expect(
            await screen.findByText("John")
        ).toBeInTheDocument();
    });

---

# waitFor

`waitFor()` використовується, коли потрібно дочекатися виконання умови.

    await waitFor(() => {
        expect(
            screen.getByText("John")
        ).toBeInTheDocument();
    });

Але для простого очікування появи елемента часто краще:

    findBy...

---

# findBy vs waitFor

Якщо потрібно дочекатися появи element:

    await screen.findByText("John");

часто простіше, ніж:

    await waitFor(() => {
        expect(
            screen.getByText("John")
        ).toBeInTheDocument();
    });

`waitFor()` корисний для складніших asynchronous assertions.

---

# Mock

Mock — контрольована заміна реальної залежності під час тесту.

Наприклад:

    API
        ↓
    real server

можна замінити на:

    API
        ↓
    mock response

Mock дозволяє зробити тест:

    швидшим
    передбачуванішим
    незалежним від external service

---

# Stub

Stub — заздалегідь визначена заміна, яка повертає контрольовані дані.

Наприклад:

    getUser()
        ↓
    returns fake user

---

# Spy

Spy дозволяє спостерігати, чи була функція викликана.

Наприклад:

    expect(mockFn).toHaveBeenCalled();

Spy корисний, коли потрібно перевірити interaction.

---

# Fixture

Fixture — підготовлені test data.

Наприклад:

    const user = {
        id: 1,
        name: "John",
        email: "john@example.com"
    };

Цей object може використовуватися як fixture.

---

# Test Data

Хороші test data повинні бути:

    зрозумілими
    мінімальними
    передбачуваними
    релевантними тесту

Не потрібно створювати величезний object, якщо тест використовує тільки:

    id
    name

---

# Test Setup

Test setup — код, який готує environment для тестів.

Наприклад:

    global setup
    DOM environment
    custom matchers
    mocks
    cleanup

---

# Setup File

Можна створити setup file.

Наприклад:

    src/test/setup.ts

У ньому:

    import "@testing-library/jest-dom";

Після цього DOM matchers доступні в тестах.

---

# Cleanup

Після тесту потрібно очищати test environment.

React Testing Library зазвичай допомагає автоматично очищати rendered DOM між тестами залежно від test environment/configuration.

Ідея:

    test A
        ↓
    cleanup
        ↓
    test B

Це допомагає зберігати test isolation.

---

# Test Naming

Назва тесту повинна пояснювати behavior.

Добре:

    test("shows error when email is invalid", () => {
        ...
    });

Погано:

    test("test 1", () => {
        ...
    });

Ще краще:

    test("shows validation error for invalid email", () => {
        ...
    });

---

# Хороший Test Name

Назва повинна відповідати на питання:

    What happens?

Наприклад:

    "renders the user's name"

    "shows an error when login fails"

    "disables submit button while loading"

    "submits the form with valid data"

---

# One Behavior per Test

Бажано, щоб тест перевіряв одну логічну поведінку.

Наприклад:

    test("shows validation error for empty email", () => {
        ...
    });

І окремо:

    test("shows validation error for invalid email", () => {
        ...
    });

Не варто створювати один величезний test, який перевіряє весь компонент.

---

# Arrange → Act → Assert

Практична модель:

    Arrange
        ↓
    render component
        ↓
    Act
        ↓
    user interaction
        ↓
    Assert
        ↓
    expected result

Наприклад:

    test("increments counter", async () => {
        // Arrange
        const user = userEvent.setup();

        render(<Counter />);

        // Act
        await user.click(
            screen.getByRole("button", {
                name: /increment/i
            })
        );

        // Assert
        expect(
            screen.getByText("1")
        ).toBeInTheDocument();
    });

---

# Test Flow

Типовий component test:

    import dependencies
        ↓
    render component
        ↓
    find element
        ↓
    interact
        ↓
    assert result

Наприклад:

    render(<Counter />);

        ↓

    screen.getByRole("button");

        ↓

    await user.click(button);

        ↓

    expect(...).toBeInTheDocument();

---

# Simple React Test

Компонент:

    function Welcome({ name }) {
        return (
            <h1>
                Welcome, {name}!
            </h1>
        );
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

    test("renders user's name", () => {
        render(
            <Welcome name="John" />
        );

        expect(
            screen.getByRole("heading", {
                name: "Welcome, John!"
            })
        ).toBeInTheDocument();
    });

---

# Testing Component State

Компонент:

    function Counter() {
        const [count, setCount] = useState(0);

        return (
            <div>
                <span>{count}</span>

                <button
                    onClick={() =>
                        setCount(count + 1)
                    }
                >
                    Increment
                </button>
            </div>
        );
    }

Тест не повинен перевіряти:

    state.count

Краще:

    render(<Counter />);

    expect(
        screen.getByText("0")
    ).toBeInTheDocument();

    await user.click(
        screen.getByRole("button", {
            name: "Increment"
        })
    );

    expect(
        screen.getByText("1")
    ).toBeInTheDocument();

Тобто перевіряємо:

    user action
        ↓
    visible result

---

# Testing Event Handler

Компонент:

    function Button({ onClick }) {
        return (
            <button onClick={onClick}>
                Save
            </button>
        );
    }

Тест може використовувати spy/mock function:

    const handleClick = vi.fn();

    render(
        <Button onClick={handleClick} />
    );

    await user.click(
        screen.getByRole("button", {
            name: "Save"
        })
    );

    expect(handleClick)
        .toHaveBeenCalledTimes(1);

---

# vi.fn()

У Vitest:

    vi.fn()

створює mock function.

Наприклад:

    const handleClick = vi.fn();

Її можна перевірити:

    expect(handleClick)
        .toHaveBeenCalled();

або:

    expect(handleClick)
        .toHaveBeenCalledTimes(1);

---

# Mock Function

Mock function дозволяє перевірити:

    чи була викликана
    скільки разів
    з якими arguments

Наприклад:

    const onSubmit = vi.fn();

    onSubmit("John");

    expect(onSubmit)
        .toHaveBeenCalledWith("John");

---

# Test Component Contract

Component contract — очікувана поведінка компонента для його consumers.

Наприклад:

    Button
        ↓
    receives onClick prop
        ↓
    user clicks
        ↓
    onClick called

Тест перевіряє саме цей contract.

---

# Test Props + Events

Компонент:

    function Button({
        label,
        onClick
    }) {
        return (
            <button onClick={onClick}>
                {label}
            </button>
        );
    }

Тест:

    test("calls onClick when clicked", async () => {
        const user = userEvent.setup();
        const onClick = vi.fn();

        render(
            <Button
                label="Save"
                onClick={onClick}
            />
        );

        await user.click(
            screen.getByRole("button", {
                name: "Save"
            })
        );

        expect(onClick)
            .toHaveBeenCalledTimes(1);
    });

---

# Coverage

Test coverage показує, яка частина коду була виконана під час тестування.

Основні види coverage:

    statement coverage
    branch coverage
    function coverage
    line coverage

---

# Statement Coverage

Перевіряє, які statements були виконані.

Наприклад:

    if (user) {
        console.log(user.name);
    }

Якщо гілка ніколи не виконується, coverage покаже це.

---

# Branch Coverage

Перевіряє branches.

Наприклад:

    if (isLoggedIn) {
        return <Dashboard />;
    }

    return <Login />;

Потрібно протестувати:

    isLoggedIn = true

і:

    isLoggedIn = false

---

# Function Coverage

Перевіряє, які functions були викликані під час тестів.

---

# Line Coverage

Показує, які lines виконувалися.

---

# 100% Coverage

100% coverage не означає:

    "код повністю протестований"

Coverage показує виконання коду, але не гарантує правильність assertions.

Можна мати:

    100% coverage

і все одно мати:

    bugs

Тому важливіше тестувати meaningful behavior.

---

# Good Tests

Хороший тест:

    readable
    focused
    deterministic
    independent
    behavior-oriented
    maintainable

---

# Bad Tests

Поганий тест може бути:

    надто великим
    залежним від implementation details
    flaky
    залежним від інших tests
    надто повільним
    незрозумілим
    надто прив'язаним до DOM structure

---

# Overly Specific Tests

Погано:

    expect(container.innerHTML)
        .toBe(
            "<div><button>Save</button></div>"
        );

Такий тест дуже сильно залежить від HTML structure.

Краще:

    expect(
        screen.getByRole("button", {
            name: "Save"
        })
    ).toBeInTheDocument();

---

# Test Resilience

Resilient test — тест, який не ламається від несуттєвих змін implementation.

Наприклад, якщо:

    <div className="wrapper">
        <button>Save</button>
    </div>

змінити на:

    <section>
        <button>Save</button>
    </section>

хороший тест кнопки не повинен ламатися.

Якщо тест перевіряє:

    getByRole("button")

він залишиться стабільним.

---

# Testing Visible Behavior

Компонент:

    function Message() {
        return (
            <div className="message">
                Success
            </div>
        );
    }

Краще:

    expect(
        screen.getByText("Success")
    ).toBeInTheDocument();

ніж:

    expect(
        container.querySelector(".message")
    ).toBeTruthy();

Перший варіант перевіряє behavior.

Другий більше залежить від implementation.

---

# Test Accessibility

Component:

    <button>Submit</button>

Тест:

    screen.getByRole("button", {
        name: "Submit"
    });

Це одночасно перевіряє:

    element exists
    semantic role
    accessible name

---

# Тестування Loading State

Наприклад:

    function SaveButton({ loading }) {
        return (
            <button disabled={loading}>
                {loading ? "Saving..." : "Save"}
            </button>
        );
    }

Тест:

    test("disables button while loading", () => {
        render(
            <SaveButton loading={true} />
        );

        expect(
            screen.getByRole("button", {
                name: "Saving..."
            })
        ).toBeDisabled();
    });

---

# Тестування Error State

    function Status({ error }) {
        if (error) {
            return (
                <div role="alert">
                    Something went wrong
                </div>
            );
        }

        return <div>Success</div>;
    }

Тест:

    test("shows error message", () => {
        render(<Status error={true} />);

        expect(
            screen.getByRole("alert")
        ).toHaveTextContent(
            "Something went wrong"
        );
    });

---

# Тестування Empty State

Наприклад:

    function UserList({ users }) {
        if (users.length === 0) {
            return <p>No users found</p>;
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

Тест:

    test("shows empty state", () => {
        render(<UserList users={[]} />);

        expect(
            screen.getByText("No users found")
        ).toBeInTheDocument();
    });

---

# Test File Structure

Наприклад:

    src/
    ├── components/
    │   ├── Button.tsx
    │   └── Button.test.tsx
    │
    └── test/
        └── setup.ts

Або тести можуть бути в окремій директорії:

    src/
    ├── components/
    │   └── Button.tsx
    │
    └── tests/
        └── Button.test.tsx

Обидва підходи можливі.

Головне — consistency у проєкті.

---

# Typical React Testing Stack

Для сучасного React + TypeScript проєкту можна зустріти:

    React
        +
    TypeScript
        +
    Vitest
        +
    React Testing Library
        +
    @testing-library/jest-dom
        +
    @testing-library/user-event

Для E2E:

    Playwright

---

# Основний Testing Flow

    Component
        ↓
    render()
        ↓
    DOM
        ↓
    query
        ↓
    user interaction
        ↓
    DOM update
        ↓
    assertion

---

# Практичний приклад

Компонент:

    import { useState } from "react";

    export function Counter() {
        const [count, setCount] = useState(0);

        return (
            <div>
                <p>Count: {count}</p>

                <button
                    onClick={() =>
                        setCount(count + 1)
                    }
                >
                    Increment
                </button>
            </div>
        );
    }

Тест:

    import {
        render,
        screen
    } from "@testing-library/react";

    import userEvent from
        "@testing-library/user-event";

    import {
        describe,
        expect,
        test
    } from "vitest";

    import { Counter } from "./Counter";

    describe("Counter", () => {
        test("renders initial count", () => {
            render(<Counter />);

            expect(
                screen.getByText("Count: 0")
            ).toBeInTheDocument();
        });

        test("increments count", async () => {
            const user = userEvent.setup();

            render(<Counter />);

            await user.click(
                screen.getByRole("button", {
                    name: "Increment"
                })
            );

            expect(
                screen.getByText("Count: 1")
            ).toBeInTheDocument();
        });
    });

---

# Що відбувається в тесті

    render(<Counter />)
        ↓
    component creates DOM
        ↓
    getByRole("button")
        ↓
    user.click()
        ↓
    setCount()
        ↓
    React re-renders
        ↓
    Count: 1
        ↓
    assertion

Це типовий component testing flow.

---

# Типові помилки

❌ Тестувати implementation details.

Наприклад:

    component.state.count

Краще:

    screen.getByText("Count: 1")

---

❌ Використовувати `getByTestId()` всюди.

Краще спочатку:

    getByRole()
    getByLabelText()
    getByText()

---

❌ Використовувати `getBy` для елемента, який може бути відсутнім.

Погано:

    expect(
        screen.getByRole("alert")
    ).not.toBeInTheDocument();

Якщо alert відсутній, `getByRole()` вже кине error.

Правильно:

    expect(
        screen.queryByRole("alert")
    ).not.toBeInTheDocument();

---

❌ Не використовувати `await` для asynchronous interaction.

Наприклад:

    user.click(button);

Краще:

    await user.click(button);

коли використовується `userEvent`.

---

❌ Тестувати HTML structure замість behavior.

Погано:

    expect(container.innerHTML)
        .toContain("...");

Краще:

    expect(
        screen.getByRole(...)
    ).toBeInTheDocument();

---

❌ Створювати залежність між tests.

Кожен test повинен бути максимально незалежним.

---

❌ Робити один величезний test.

Погано:

    test("everything works", () => {
        ...
    });

Краще розділити:

    renders correctly
    handles click
    shows error
    submits form

---

❌ Надмірно використовувати mocks.

Mock повинен допомагати ізолювати зовнішню dependency, а не приховувати реальну поведінку компонента.

---

❌ Вважати 100% coverage гарантією якості.

Coverage ≠ correctness.

---

# Питання зі співбесіди

Що таке testing?

Що таке component testing?

Навіщо тестувати React-компоненти?

Що таке test case?

Що таке test suite?

Що таке assertion?

Що таке matcher?

Що робить `expect()`?

Що таке test runner?

Що таке Vitest?

Що таке Jest?

Що таке React Testing Library?

Яка головна ідея React Testing Library?

Що означає "test behavior, not implementation details"?

Що таке `render()`?

Що таке `screen`?

Що таке query?

Яка різниця між:

    getBy
    queryBy
    findBy

Яка різниця між:

    getAllBy
    queryAllBy
    findAllBy

Коли використовувати `getByRole()`?

Чому `getByRole()` часто є кращим вибором?

Коли використовувати `getByLabelText()`?

Коли використовувати `getByText()`?

Коли використовувати `getByTestId()`?

Що таке `userEvent`?

Чим `userEvent` відрізняється від `fireEvent`?

Що таке `jest-dom`?

Що робить `toBeInTheDocument()`?

Що робить `toBeDisabled()`?

Що робить `toHaveTextContent()`?

Що таке AAA pattern?

Що таке Arrange?

Що таке Act?

Що таке Assert?

Що таке test isolation?

Що таке deterministic test?

Що таке flaky test?

Що таке mock?

Що таке stub?

Що таке spy?

Що таке fixture?

Що таке test coverage?

Чи означає 100% coverage, що код повністю протестований?

Що таке unit test?

Що таке component test?

Що таке integration test?

Що таке E2E test?

Чим component testing відрізняється від E2E testing?

---

# Шлях

🟢 Core (обов'язково знати)

Що таке testing.

Що таке test case.

Що таке test suite.

Що таке assertion.

Що таке matcher.

Що таке test runner.

Основи Vitest або Jest.

Основи React Testing Library.

`render()`.

`screen`.

`expect()`.

`test()`.

`describe()`.

`getByRole()`.

`getByText()`.

`getByLabelText()`.

`getByTestId()`.

`queryBy`.

`findBy`.

`getAllBy`.

`userEvent`.

Основи `jest-dom`.

Arrange / Act / Assert.

Test isolation.

Testing props.

Testing rendered output.

Testing user behavior.

Testing visible states.

---

🔵 Junior

Упевнене використання:

    render()
    screen
    getByRole()
    getByLabelText()
    getByText()
    queryBy...
    findBy...
    userEvent

Тестування:

    props
    conditional rendering
    state
    events
    forms
    loading state
    error state
    empty state

Розуміння:

    unit tests
    component tests
    integration tests
    E2E tests

Розуміння:

    mock
    spy
    stub

Розуміння:

    test isolation
    test cleanup
    async tests
    flaky tests

Уміння писати:

    readable tests
    behavior-oriented tests
    deterministic tests

Розуміння test coverage.

Розуміння, чому implementation details не варто тестувати без необхідності.

---

🟠 Middle

Глибше розуміння:

    testing architecture
    test boundaries
    test isolation
    mocking strategy
    dependency injection
    integration testing

Робота з:

    API mocks
    async components
    context
    routing
    custom hooks
    forms
    error states

Розуміння trade-offs між:

    unit
    component
    integration
    E2E

Проєктування test suites.

Зменшення flaky tests.

Оптимізація test execution.

Test coverage analysis.

Розуміння:

    branch coverage
    statement coverage
    function coverage
    line coverage

Розуміння test maintainability.

Розуміння testing pyramid.

Розуміння testing user behavior замість implementation details.

---

🔴 Senior

Test architecture великих React-проєктів.

Testing strategy.

Test boundaries.

Contract testing.

Advanced mocking.

Network-level mocking.

MSW.

Integration testing architecture.

E2E strategy.

Playwright.

Test parallelization.

Test isolation at scale.

Flaky test detection.

Test performance.

CI/CD testing.

Test environments.

Regression strategy.

Visual regression testing.

Accessibility testing.

Mutation testing.

Property-based testing.

Test data management.

Testing distributed frontend systems.

Trade-offs між:

    unit tests
    component tests
    integration tests
    E2E tests

Оптимізація:

    speed
    reliability
    coverage
    maintainability

---

# Міні-шпаргалка

## Test

    test("renders button", () => {
        ...
    });

    → окремий test case

---

## Test Suite

    describe("Button", () => {
        test("renders", () => {
            ...
        });

        test("handles click", () => {
            ...
        });
    });

---

## Assertion

    expect(value).toBe(expected);

---

## Render

    render(<Component />);

    → render React component

---

## Screen

    screen.getByRole("button");

    → search rendered DOM

---

## getBy

    screen.getByRole("button");

    → element must exist

---

## queryBy

    screen.queryByRole("alert");

    → element may not exist

---

## findBy

    await screen.findByText("Loaded");

    → wait for async element

---

## User Event

    const user = userEvent.setup();

    await user.click(button);

    → simulate user interaction

---

## DOM Assertion

    expect(element)
        .toBeInTheDocument();

---

## Disabled

    expect(button)
        .toBeDisabled();

---

## Text

    expect(element)
        .toHaveTextContent("Hello");

---

## Role

    screen.getByRole("button", {
        name: "Save"
    });

---

## Label

    screen.getByLabelText("Email");

---

## Test Flow

    render
        ↓
    query
        ↓
    interact
        ↓
    assert

---

## AAA

    Arrange
        ↓
    Act
        ↓
    Assert

---

## Testing Philosophy

    user behavior
        ↓
    component behavior
        ↓
    assertion

а не:

    implementation details
        ↓
    assertion

---

## Test Types

    Unit
        ↓
    Component
        ↓
    Integration
        ↓
    E2E

---

## Mock

    vi.fn()

    → mock function

---

## Spy

    expect(mockFn)
        .toHaveBeenCalled();

    → перевірити interaction

---

## Async

    const element =
        await screen.findByText("Loaded");

---

## Coverage

    statements
    branches
    functions
    lines

Coverage показує виконання коду, але:

    coverage ≠ correctness

---

# Головне

• Testing — автоматизована перевірка очікуваної поведінки програми.

• Component testing перевіряє React-компоненти в контрольованому test environment.

• React Testing Library заохочує тестувати компоненти так, як ними користується користувач.

• Найважливіший принцип:

    test behavior, not implementation details

• `render()` рендерить компонент.

• `screen` дозволяє знаходити елементи rendered DOM.

• `expect()` створює assertion.

• Matcher визначає, що саме перевіряється.

• `getBy...` використовується, коли елемент повинен існувати.

• `queryBy...` використовується, коли елемент може бути відсутнім.

• `findBy...` використовується для asynchronous появи елемента.

• Для доступних UI-елементів одним із найкращих query є:

    getByRole()

• Для form controls часто корисний:

    getByLabelText()

• `getByTestId()` слід використовувати тоді, коли semantic query не підходить.

• `userEvent` використовується для моделювання user interactions.

• Для більшості user interactions:

    await user.click(...)
    await user.type(...)

• `jest-dom` додає спеціальні DOM matchers:

    toBeInTheDocument()
    toBeVisible()
    toBeDisabled()
    toHaveTextContent()
    toHaveAttribute()
    toHaveValue()
    toBeChecked()

• Хороший тест має бути:

    readable
    focused
    deterministic
    isolated
    maintainable

• AAA pattern:

    Arrange
        ↓
    Act
        ↓
    Assert

• Тести повинні бути незалежними один від одного.

• Один test не повинен залежати від результату іншого test.

• Flaky test — тест, який нестабільно проходить або падає за однакових умов.

• Mock дозволяє замінити зовнішню dependency контрольованою версією.

• Spy дозволяє перевірити, чи була функція викликана.

• Coverage показує, який код виконувався під час тестів.

• 100% coverage не гарантує відсутності bugs.

• Component test повинен перевіряти meaningful behavior компонента.

• Не потрібно перевіряти кожну внутрішню деталь implementation.

• Хороший component test часто має форму:

    render
        ↓
    find element
        ↓
    user action
        ↓
    observe result
        ↓
    assert

• Основна мета тестів — не перевірити, що код написаний певним способом, а переконатися, що компонент поводиться правильно.

• У React component testing головна модель:

    Component
        ↓
    Render
        ↓
    User interaction
        ↓
    UI update
        ↓
    Assertion

• Чим ближче тест до реальної поведінки користувача, тим стійкішим він зазвичай є до внутрішніх змін реалізації.

• Хороший test suite допомагає:

    знаходити bugs
        ↓
    виявляти regression
        ↓
    безпечніше refactor code
        ↓
    підтримувати якість React application