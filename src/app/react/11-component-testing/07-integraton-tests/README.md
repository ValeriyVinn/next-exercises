# Integration Tests у React

## 📁 Розташування

    react/
    └── 📁 11-component-testing
        └── 📁 07-integration-tests

---

# 1. Що таке Integration Test

**Integration test** перевіряє, як кілька частин application працюють разом.

Наприклад:

    Component
        ↓
    Custom Hook
        ↓
    API function
        ↓
    HTTP request
        ↓
    MSW
        ↓
    Response
        ↓
    Component state
        ↓
    UI

На відміну від unit test, ми не ізолюємо кожну функцію окремо.

Ми перевіряємо **взаємодію між частинами системи**.

---

# 2. Unit Test vs Integration Test

## Unit Test

Перевіряє одну невелику частину:

    function formatName(name: string) {
      return name.trim().toUpperCase();
    }

Тест:

    expect(formatName(" Anna ")).toBe("ANNA");

---

## Integration Test

Перевіряє кілька частин разом:

    UserForm
        ↓
    form state
        ↓
    validation
        ↓
    API request
        ↓
    MSW
        ↓
    response
        ↓
    success message

---

# 3. Основна ідея

Integration test відповідає на питання:

> Чи правильно взаємодіють кілька частин application між собою?

Наприклад:

    User
      ↓
    вводить ім'я
      ↓
    натискає Submit
      ↓
    React Form
      ↓
    validation
      ↓
    API request
      ↓
    mocked server
      ↓
    success response
      ↓
    UI оновлюється

---

# 4. Що може входити в integration test

У React integration test можуть одночасно працювати:

- React component;
- child components;
- state;
- Context;
- custom hooks;
- API functions;
- React Router;
- React Query;
- Redux;
- form validation;
- MSW;
- loading states;
- error states.

Але це не означає, що потрібно включати все.

Головне:

> Тест повинен перевіряти одну зрозумілу поведінку користувача.

---

# 5. Приклад application flow

Уявімо сторінку Users:

    UsersPage
        ↓
    useUsers()
        ↓
    getUsers()
        ↓
    fetch("/api/users")
        ↓
    MSW
        ↓
    users
        ↓
    setState
        ↓
    UsersList
        ↓
    user sees users

Integration test перевіряє весь цей flow.

---

# 6. Чому integration tests важливі

Unit tests можуть показати:

    function works

Integration test може показати:

    components
        +
    hooks
        +
    API
        +
    state
        +
    UI

працюють разом.

Це особливо важливо для реальних application.

---

# 7. Testing Pyramid

Спрощено можна уявити:

    E2E
      /\
     /  \
    /    \
    / Integration \
    /--------------\
    /     Unit       \
    ------------------

Або:

    багато unit tests
           ↓
    менше integration tests
           ↓
    ще менше E2E tests

Причина:

- unit tests швидкі;
- integration tests повільніші;
- E2E найдорожчі.

---

# 8. Integration Test ≠ E2E Test

Це важливо.

## Integration test

Зазвичай:

    React application
        ↓
    testing environment
        ↓
    MSW

---

## E2E test

Зазвичай:

    real browser
        ↓
    real frontend
        ↓
    backend
        ↓
    database

Наприклад, через Playwright.

---

# 9. React Testing Library

Для integration tests добре підходить:

    @testing-library/react

Основний принцип:

> Тестуй application так, як нею користувач.

Тобто:

    render
      ↓
    find element
      ↓
    click / type
      ↓
    wait
      ↓
    assert UI

---

# 10. Базові інструменти

Типовий стек:

    React
    +
    TypeScript
    +
    Vitest
    +
    React Testing Library
    +
    jest-dom
    +
    user-event
    +
    MSW

---

# 11. Простий приклад

Компонент:

    import { useState } from "react";

    export function Counter() {
      const [count, setCount] = useState(0);

      return (
        <>
          <p>Count: {count}</p>

          <button
            onClick={() => setCount(count + 1)}
          >
            Increment
          </button>
        </>
      );
    }

Integration test:

    import { render, screen } from "@testing-library/react";
    import userEvent from "@testing-library/user-event";
    import { expect, it } from "vitest";
    import { Counter } from "./Counter";

    it("increments counter", async () => {
      const user = userEvent.setup();

      render(<Counter />);

      expect(
        screen.getByText("Count: 0")
      ).toBeInTheDocument();

      await user.click(
        screen.getByRole("button", {
          name: "Increment"
        })
      );

      expect(
        screen.getByText("Count: 1")
      ).toBeInTheDocument();
    });

---

# 12. Чому це вже схоже на integration test

Ми не тестуємо:

    useState()

окремо.

Ми перевіряємо взаємодію:

    user
      ↓
    button
      ↓
    event
      ↓
    state
      ↓
    render
      ↓
    UI

---

# 13. Більш реальний приклад

Уявімо:

    UsersPage
        ↓
    useUsers
        ↓
    API
        ↓
    MSW

Компонент:

    import { useEffect, useState } from "react";

    type User = {
      id: number;
      name: string;
    };

    export function UsersPage() {
      const [users, setUsers] = useState<User[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState(false);

      useEffect(() => {
        async function loadUsers() {
          try {
            const response = await fetch("/api/users");

            if (!response.ok) {
              throw new Error("Request failed");
            }

            const data: User[] =
              await response.json();

            setUsers(data);
          } catch {
            setError(true);
          } finally {
            setLoading(false);
          }
        }

        loadUsers();
      }, []);

      if (loading) {
        return <p>Loading...</p>;
      }

      if (error) {
        return <p>Failed to load users.</p>;
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

---

# 14. Integration test для success

MSW handler:

    import {
      http,
      HttpResponse
    } from "msw";

    export const handlers = [
      http.get("/api/users", () => {
        return HttpResponse.json([
          {
            id: 1,
            name: "Anna"
          },
          {
            id: 2,
            name: "John"
          }
        ]);
      })
    ];

Тест:

    it("loads and displays users", async () => {
      render(<UsersPage />);

      expect(
        await screen.findByText("Anna")
      ).toBeInTheDocument();

      expect(
        screen.getByText("John")
      ).toBeInTheDocument();
    });

---

# 15. Що тут реально тестується

Тест проходить через:

    UsersPage
        ↓
    useEffect
        ↓
    fetch
        ↓
    MSW
        ↓
    response
        ↓
    setUsers
        ↓
    render
        ↓
    users appear in DOM

Це хороший приклад integration test.

---

# 16. Loading → Success

Важливо тестувати не тільки фінальний результат.

Flow:

    Loading
       ↓
    API request
       ↓
    Success
       ↓
    Users

Наприклад:

    render(<UsersPage />);

    expect(
      screen.getByText("Loading...")
    ).toBeInTheDocument();

    expect(
      await screen.findByText("Anna")
    ).toBeInTheDocument();

---

# 17. Loading → Error

Другий важливий flow:

    Loading
       ↓
    API request
       ↓
    500
       ↓
    Error UI

Test:

    server.use(
      http.get("/api/users", () => {
        return new HttpResponse(null, {
          status: 500
        });
      })
    );

    render(<UsersPage />);

    expect(
      await screen.findByText(
        "Failed to load users."
      )
    ).toBeInTheDocument();

---

# 18. User interaction + API

Integration tests стають ще кориснішими, коли включають user interaction.

Наприклад:

    Search form
        ↓
    user types "Anna"
        ↓
    submit
        ↓
    API request
        ↓
    MSW
        ↓
    filtered users
        ↓
    UI

---

# 19. Приклад SearchForm

    import { FormEvent, useState } from "react";

    export function UserSearch() {
      const [query, setQuery] = useState("");
      const [result, setResult] = useState("");

      async function handleSubmit(
        event: FormEvent
      ) {
        event.preventDefault();

        const response = await fetch(
          `/api/users?search=${query}`
        );

        const users: {
          id: number;
          name: string;
        }[] = await response.json();

        setResult(
          users.length > 0
            ? users[0].name
            : "No users"
        );
      }

      return (
        <>
          <form onSubmit={handleSubmit}>
            <label htmlFor="search">
              Search
            </label>

            <input
              id="search"
              value={query}
              onChange={event =>
                setQuery(event.target.value)
              }
            />

            <button type="submit">
              Search
            </button>
          </form>

          {result && <p>{result}</p>}
        </>
      );
    }

---

# 20. Integration test для search

    it("searches users", async () => {
      const user = userEvent.setup();

      render(<UserSearch />);

      await user.type(
        screen.getByLabelText("Search"),
        "Anna"
      );

      await user.click(
        screen.getByRole("button", {
          name: "Search"
        })
      );

      expect(
        await screen.findByText("Anna")
      ).toBeInTheDocument();
    });

---

# 21. MSW для search

Handler:

    http.get("/api/users", ({ request }) => {
      const url = new URL(request.url);
      const search =
        url.searchParams.get("search");

      if (search === "Anna") {
        return HttpResponse.json([
          {
            id: 1,
            name: "Anna"
          }
        ]);
      }

      return HttpResponse.json([]);
    });

---

# 22. Повний user flow

Такий тест перевіряє:

    user
      ↓
    input
      ↓
    typing
      ↓
    submit
      ↓
    fetch
      ↓
    MSW
      ↓
    response
      ↓
    state
      ↓
    UI

Це набагато ближче до реальної поведінки application, ніж тест окремої функції.

---

# 23. Integration tests для form

Форма часто є чудовим кандидатом для integration testing.

Наприклад:

    RegistrationForm
        ↓
    user fills fields
        ↓
    validation
        ↓
    submit
        ↓
    API
        ↓
    success
        ↓
    success message

---

# 24. Що перевірити у формі

Корисні сценарії:

    empty fields
        ↓
    validation error

    valid data
        ↓
    submit
        ↓
    API success

    valid data
        ↓
    submit
        ↓
    API 400

    valid data
        ↓
    submit
        ↓
    API 500

    valid data
        ↓
    network error

---

# 25. Не потрібно тестувати HTML окремо

Наприклад, не потрібно робити багато тестів:

    input exists
    label exists
    button exists

якщо це не має особливої поведінки.

Краще:

    user enters data
        ↓
    submits form
        ↓
    expected result

---

# 26. Context + Integration Test

Якщо компонент використовує Context:

    AuthProvider
        ↓
    UserPage
        ↓
    useAuth()

можна відрендерити весь необхідний provider:

    render(
      <AuthProvider>
        <UserPage />
      </AuthProvider>
    );

Тест перевіряє їхню взаємодію.

---

# 27. Custom render

Якщо багато компонентів використовують одні й ті самі providers, можна створити custom render.

Наприклад:

    function renderWithProviders(
      ui: React.ReactElement
    ) {
      return render(
        <AuthProvider>
          <AppProvider>
            {ui}
          </AppProvider>
        </AuthProvider>
      );
    }

Тоді:

    renderWithProviders(
      <UserPage />
    );

---

# 28. Context + API

Наприклад:

    AuthProvider
        ↓
    UserPage
        ↓
    API
        ↓
    MSW

Можна перевірити:

    logged in
        ↓
    API request
        ↓
    profile loaded
        ↓
    username displayed

---

# 29. Router + Integration Test

Router також можна включити в integration test.

Наприклад:

    UsersPage
        ↓
    click "Details"
        ↓
    React Router
        ↓
    /users/1
        ↓
    UserDetailsPage

Тест перевіряє не сам Router, а application flow.

---

# 30. Приклад navigation test

    it("navigates to user details", async () => {
      const user = userEvent.setup();

      render(
        <MemoryRouter>
          <App />
        </MemoryRouter>
      );

      await user.click(
        screen.getByRole("link", {
          name: "Anna"
        })
      );

      expect(
        await screen.findByRole(
          "heading",
          {
            name: "Anna"
          }
        )
      ).toBeInTheDocument();
    });

---

# 31. `MemoryRouter`

Для тестів React Router часто використовується:

    import {
      MemoryRouter
    } from "react-router-dom";

Він дозволяє контролювати history всередині тесту.

Наприклад:

    <MemoryRouter initialEntries={["/users"]}>
      <App />
    </MemoryRouter>

---

# 32. API + Router

Можна перевірити повний flow:

    /users
       ↓
    click user
       ↓
    /users/1
       ↓
    GET /api/users/1
       ↓
    MSW
       ↓
    user details
       ↓
    UI

Це дуже хороший integration test.

---

# 33. React Query + Integration Test

Якщо application використовує React Query:

    Component
        ↓
    useQuery()
        ↓
    API
        ↓
    MSW

можна тестувати реальний `useQuery`.

Не потрібно mock-увати:

    useQuery

Якщо тест має перевірити реальну взаємодію component + query + API.

---

# 34. QueryClientProvider

Для React Query потрібен provider:

    const queryClient =
      new QueryClient();

    render(
      <QueryClientProvider
        client={queryClient}
      >
        <UsersPage />
      </QueryClientProvider>
    );

Тест тепер перевіряє:

    component
        +
    React Query
        +
    API

---

# 35. Важливість ізоляції QueryClient

Для кожного тесту бажано створювати новий QueryClient.

Наприклад:

    function createTestQueryClient() {
      return new QueryClient({
        defaultOptions: {
          queries: {
            retry: false
          }
        }
      });
    }

Це не дозволяє стану одного тесту впливати на інший.

---

# 36. Redux + Integration Test

Якщо компонент використовує Redux:

    Redux Provider
        ↓
    Component
        ↓
    user interaction
        ↓
    async action
        ↓
    API
        ↓
    MSW
        ↓
    Redux state
        ↓
    UI

Integration test може перевірити весь flow.

---

# 37. Чого не потрібно mock-увати

Якщо мета integration test — перевірити взаємодію, не варто без необхідності mock-увати:

    useState
    useEffect
    custom hooks
    Redux
    React Query
    API service

Якщо замокувати все, integration test перетвориться на unit test.

---

# 38. Що можна mock-увати

Можна mock-увати зовнішні dependency, якщо вони не є предметом тесту.

Наприклад:

    browser API
    analytics
    third-party SDK
    external payment SDK

А HTTP API краще часто залишати через MSW.

---

# 39. Integration test і test boundary

Потрібно визначити межу тесту.

Наприклад:

    [Component]
         +
    [Hook]
         +
    [API client]
         |
    ----------------
       test boundary
         |
        MSW

Тоді все до boundary — реальний application code.

Після boundary — контрольований mock.

---

# 40. Хороший integration test

Хороший тест:

    user action
        ↓
    application behavior
        ↓
    expected UI

Наприклад:

    user enters email
        ↓
    clicks Login
        ↓
    API returns success
        ↓
    dashboard appears

---

# 41. Поганий integration test

Поганий варіант:

    expect(useState).toHaveBeenCalled()

або:

    expect(useEffect).toHaveBeenCalled()

Це implementation details.

Користувач не бачить:

    useState
    useEffect

Користувач бачить:

    Login
    Dashboard
    Error
    Loading

---

# 42. Integration test і accessibility

React Testing Library рекомендує шукати елементи так, як їх може ідентифікувати користувач.

Пріоритет:

    getByRole
        ↓
    getByLabelText
        ↓
    getByPlaceholderText
        ↓
    getByText
        ↓
    getByTestId

Наприклад:

    screen.getByRole("button", {
      name: "Save"
    });

краще за:

    screen.getByTestId("save-button");

---

# 43. User interaction

Для реальних user interactions використовуй:

    userEvent

Наприклад:

    const user = userEvent.setup();

    await user.click(button);

    await user.type(input, "Anna");

    await user.clear(input);

Це краще відповідає реальним діям користувача.

---

# 44. `fireEvent` vs `userEvent`

`fireEvent` дозволяє безпосередньо створити DOM event.

Наприклад:

    fireEvent.click(button);

`userEvent` моделює більш реалістичну поведінку:

    await user.click(button);

Для звичайних interaction tests переважно краще:

    userEvent

---

# 45. Async integration tests

Integration tests часто асинхронні.

Наприклад:

    render()
      ↓
    request
      ↓
    response
      ↓
    state update
      ↓
    render

Тому використовуємо:

    await screen.findBy...

або:

    await waitFor(...)

---

# 46. Не використовуй зайві `waitFor`

Погано:

    await waitFor(() => {
      expect(
        screen.getByText("Anna")
      ).toBeInTheDocument();
    });

якщо можна:

    expect(
      await screen.findByText("Anna")
    ).toBeInTheDocument();

`findBy` простіший і краще показує намір тесту.

---

# 47. Error flow

Integration test повинен перевіряти не тільки success.

Наприклад:

    User
      ↓
    submit
      ↓
    API
      ↓
    500
      ↓
    Error UI

Тест:

    expect(
      await screen.findByText(
        "Something went wrong"
      )
    ).toBeInTheDocument();

---

# 48. Retry behavior

Якщо application має retry:

    API request
        ↓
      failure
        ↓
      retry
        ↓
      success
        ↓
      UI

можна створити handler, який повертає різні responses.

Наприклад:

    first request → 500
    second request → 200

Integration test перевіряє, що application правильно повторює запит.

---

# 49. Pagination

Integration test може перевірити:

    Page 1
      ↓
    click Next
      ↓
    API request
      ↓
    Page 2
      ↓
    UI updated

MSW може повернути різні дані залежно від query parameter:

    /api/users?page=1

    /api/users?page=2

---

# 50. Search + debounce

Для search:

    user types
      ↓
    debounce
      ↓
    API
      ↓
    results

Integration test може перевірити кінцеву поведінку.

Для timer-based logic може знадобитися fake timer, але не варто використовувати timers без необхідності.

---

# 51. Empty state

Integration test:

    API
      ↓
    200 + []
      ↓
    UI
      ↓
    "No users found"

Це окремий важливий сценарій.

---

# 52. Authentication flow

Можна протестувати:

    Login form
        ↓
    user enters credentials
        ↓
    POST /api/login
        ↓
    success
        ↓
    authenticated state
        ↓
    redirect
        ↓
    Dashboard

Це вже досить великий integration test.

---

# 53. Але не роби integration test занадто великим

Погано:

    register
      ↓
    login
      ↓
    dashboard
      ↓
    create user
      ↓
    edit user
      ↓
    delete user
      ↓
    logout

Один тест стає важким для розуміння.

Краще розділити:

    registration flow

    login flow

    create user flow

    edit user flow

    delete user flow

---

# 54. Один test — одна поведінка

Добре:

    it("logs in the user", ...)

    it("shows error for invalid credentials", ...)

    it("redirects authenticated user to dashboard", ...)

Погано:

    it("tests everything", ...)

---

# 55. Integration test structure

Корисна структура:

    describe("Login flow", () => {
      it("logs in user", async () => {
        // arrange
        // act
        // assert
      });

      it("shows error for invalid credentials", async () => {
        // arrange
        // act
        // assert
      });
    });

---

# 56. Arrange → Act → Assert

Один із найкорисніших шаблонів.

## Arrange

Підготувати тест:

    server.use(...);

    render(<LoginForm />);

---

## Act

Виконати user action:

    await user.type(...);

    await user.click(...);

---

## Assert

Перевірити результат:

    expect(
      await screen.findByText("Dashboard")
    ).toBeInTheDocument();

---

# 57. Повний приклад AAA

    it("logs in the user", async () => {
      const user = userEvent.setup();

      // Arrange
      render(<LoginForm />);

      // Act
      await user.type(
        screen.getByLabelText("Email"),
        "anna@example.com"
      );

      await user.type(
        screen.getByLabelText("Password"),
        "password123"
      );

      await user.click(
        screen.getByRole("button", {
          name: "Login"
        })
      );

      // Assert
      expect(
        await screen.findByText("Dashboard")
      ).toBeInTheDocument();
    });

---

# 58. Integration test для login

MSW:

    http.post("/api/login", async () => {
      return HttpResponse.json({
        user: {
          id: 1,
          name: "Anna"
        }
      });
    });

Application:

    LoginForm
        ↓
    POST /api/login
        ↓
    auth state
        ↓
    Dashboard

Test:

    user enters credentials
        ↓
    clicks Login
        ↓
    Dashboard appears

---

# 59. Invalid credentials

MSW:

    http.post("/api/login", () => {
      return new HttpResponse(null, {
        status: 401
      });
    });

Test:

    expect(
      await screen.findByText(
        "Invalid email or password"
      )
    ).toBeInTheDocument();

---

# 60. Integration test і real backend

Не плутай:

    Integration test
        +
    MSW

та:

    Integration test
        +
    real backend

Обидва варіанти можливі, але для React component/integration tests MSW часто дає кращу:

- швидкість;
- ізоляцію;
- повторюваність;
- контроль сценаріїв.

---

# 61. Коли потрібен real backend

Real backend більше підходить для:

- E2E;
- API integration tests;
- staging tests;
- contract tests;
- окремих full-stack tests.

Наприклад:

    Browser
      ↓
    Frontend
      ↓
    Backend
      ↓
    Database

Це вже значно ближче до E2E/full-stack testing.

---

# 62. Contract testing

Integration tests з MSW не гарантують, що frontend і backend мають однаковий контракт.

Наприклад frontend очікує:

    {
      "name": "Anna"
    }

а backend реально повертає:

    {
      "fullName": "Anna"
    }

MSW може продовжувати повертати старий mock.

Тому для великих систем можуть бути потрібні:

- API schema;
- OpenAPI;
- contract tests;
- E2E tests.

---

# 63. Не довіряй mock-ам сліпо

Mock може бути неправильним.

Наприклад production API:

    {
      "id": 1,
      "fullName": "Anna"
    }

А mock:

    {
      "id": 1,
      "name": "Anna"
    }

Тести проходять.

Production:

    component breaks

Тому mock data повинні відповідати реальному API contract.

---

# 64. Типізація API response

Якщо є тип:

    type User = {
      id: number;
      name: string;
    };

можна використовувати його і в тестових даних:

    const users: User[] = [
      {
        id: 1,
        name: "Anna"
      }
    ];

Це зменшує ризик розбіжностей.

---

# 65. Integration tests і TypeScript

TypeScript допомагає знайти проблеми ще до запуску тестів.

Погано:

    const user: any = {
      id: "wrong"
    };

Краще:

    const user: User = {
      id: 1,
      name: "Anna"
    };

Не використовуй `any` лише для того, щоб тест "пройшов".

---

# 66. Чим integration test відрізняється від component test

Терміни можуть перетинатися.

**Component test** часто означає:

    render component
        ↓
    interact
        ↓
    assert UI

**Integration test** робить крок далі:

    component
        +
    hooks
        +
    providers
        +
    API
        +
    state
        ↓
    assert application behavior

Межі не завжди суворі.

---

# 67. Practical rule

Якщо тест перевіряє:

    одна функція

→ unit test.

Якщо:

    component + state + interaction

→ component/integration test.

Якщо:

    component + provider + API + routing

→ integration test.

Якщо:

    browser + frontend + backend + database

→ E2E/full-stack test.

---

# 68. Що integration tests повинні захищати

Вони особливо корисні для критичних user flows:

- login;
- registration;
- search;
- checkout;
- create item;
- edit item;
- delete item;
- loading data;
- error handling;
- navigation;
- forms;
- authentication.

---

# 69. Що не потрібно покривати integration tests

Не потрібно використовувати integration test для кожної дрібниці.

Наприклад:

    formatDate()
    calculateTotal()
    capitalize()
    validateEmail()

Для цього достатньо unit tests.

Integration tests краще залишити для **взаємодії частин системи**.

---

# 70. Integration test checklist

Перед написанням тесту запитай:

    1. Який user flow тестую?
    2. Які частини application взаємодіють?
    3. Де test boundary?
    4. Які API responses потрібні?
    5. Чи потрібен MSW?
    6. Який success scenario?
    7. Який error scenario?
    8. Який UI бачить користувач?
    9. Чи потрібен Router?
    10. Чи потрібен Provider?

---

# 71. Checklist для конкретного integration test

    □ Arrange зрозумілий
    □ Act відповідає user action
    □ Assert перевіряє behavior
    □ немає зайвих implementation details
    □ API не залежить від реального backend
    □ MSW handlers ізольовані
    □ async actions мають await
    □ використовується userEvent
    □ assertions орієнтовані на UI
    □ тест має одну основну мету

---

# 72. Типова структура проєкту

    src/
    ├── components/
    │   ├── LoginForm/
    │   │   ├── LoginForm.tsx
    │   │   └── LoginForm.test.tsx
    │   │
    │   └── Users/
    │       ├── Users.tsx
    │       └── Users.test.tsx
    │
    ├── test/
    │   ├── handlers.ts
    │   ├── server.ts
    │   └── setup.ts
    │
    └── types/
        └── user.ts

---

# 73. Типовий flow integration test

    render application
          ↓
    providers initialized
          ↓
    component rendered
          ↓
    user interaction
          ↓
    state changes
          ↓
    API request
          ↓
    MSW response
          ↓
    application processes response
          ↓
    UI updates
          ↓
    assertion

---

# 74. Найчастіші помилки

## ❌ Помилка 1 — тестувати implementation details

    expect(useState).toHaveBeenCalled();

Краще:

    expect(
      screen.getByText("Count: 1")
    ).toBeInTheDocument();

---

## ❌ Помилка 2 — mock-увати все

    component
      ↓
    mocked hook
      ↓
    mocked API
      ↓
    mocked state

Тест майже не перевіряє integration.

---

## ❌ Помилка 3 — використовувати реальний backend

    test
      ↓
    internet
      ↓
    backend
      ↓
    database

Тест стає нестабільним.

---

## ❌ Помилка 4 — один величезний test

    login
      ↓
    create
      ↓
    edit
      ↓
    delete
      ↓
    logout

Краще розділити user flows.

---

## ❌ Помилка 5 — не тестувати error states

Потрібно тестувати не тільки:

    200 OK

але й:

    400
    401
    403
    404
    500
    network error

де це має сенс для application.

---

## ❌ Помилка 6 — забути async

Погано:

    expect(
      screen.getByText("Dashboard")
    ).toBeInTheDocument();

якщо Dashboard з'являється після API.

Краще:

    expect(
      await screen.findByText("Dashboard")
    ).toBeInTheDocument();

---

# 75. Хороший баланс mock-ів

Мета:

    REAL
    ─────────────────────────
    Component
    Hook
    State
    Router
    Context
    API client
    ─────────────────────────
    MOCK
    MSW
    ─────────────────────────

Тобто ми залишаємо реальну application behavior і mock-уємо зовнішній HTTP boundary.

---

# 76. Integration test як "шов" між модулями

Уяви application як набір модулів:

    Component
        │
        ├── Hook
        │
        ├── Context
        │
        ├── Router
        │
        └── API

Unit test:

    тестує кожен модуль окремо.

Integration test:

    перевіряє шви між модулями.

Саме тому integration tests часто знаходять помилки, які unit tests не бачать.

---

# 77. Приклад проблеми, яку знайде integration test

Unit test API:

    getUsers()
      ↓
    returns data

Unit test component:

    users prop
      ↓
    renders users

Обидва проходять.

Але в реальній application:

    API returns
    { fullName: "Anna" }

component очікує:

    user.name

Integration test може виявити:

    API
      ↓
    Component
      ↓
    wrong data mapping
      ↓
    broken UI

---

# 78. Integration test — не заміна unit tests

Хороша система тестів може виглядати так:

    Unit tests
      ↓
    pure functions
    utilities
    validators
    small hooks

    Integration tests
      ↓
    components
    forms
    API flows
    providers
    routing

    E2E tests
      ↓
    critical user journeys

Кожен рівень має свою роль.

---

# 79. Практичний шаблон

    describe("Users flow", () => {
      it("loads users", async () => {
        render(<UsersPage />);

        expect(
          await screen.findByText("Anna")
        ).toBeInTheDocument();
      });

      it("shows empty state", async () => {
        server.use(
          http.get("/api/users", () => {
            return HttpResponse.json([]);
          })
        );

        render(<UsersPage />);

        expect(
          await screen.findByText(
            "No users found"
          )
        ).toBeInTheDocument();
      });

      it("shows error state", async () => {
        server.use(
          http.get("/api/users", () => {
            return new HttpResponse(null, {
              status: 500
            });
          })
        );

        render(<UsersPage />);

        expect(
          await screen.findByText(
            "Failed to load users"
          )
        ).toBeInTheDocument();
      });
    });

---

# 80. Що запам'ятати

> Integration test перевіряє взаємодію кількох частин application.

> Не потрібно mock-увати все.

> React Testing Library орієнтує тести на поведінку користувача.

> `userEvent` підходить для реальних user interactions.

> MSW зручно використовувати для API interaction.

> `findBy...` корисний для async UI.

> Integration test не повинен залежати від реального backend без необхідності.

> Один тест — одна зрозуміла поведінка.

> Перевіряй loading, success, empty та error states.

> Не тестуй implementation details, якщо це не є справжньою метою тесту.

---

# 81. Коротка шпаргалка

    // Arrange

    const user = userEvent.setup();

    render(<LoginForm />);

---

    // Act

    await user.type(
      screen.getByLabelText("Email"),
      "anna@example.com"
    );

    await user.click(
      screen.getByRole("button", {
        name: "Login"
      })
    );

---

    // Assert

    expect(
      await screen.findByText("Dashboard")
    ).toBeInTheDocument();

---

    // MSW success

    http.get("/api/users", () => {
      return HttpResponse.json([
        {
          id: 1,
          name: "Anna"
        }
      ]);
    });

---

    // MSW error

    server.use(
      http.get("/api/users", () => {
        return new HttpResponse(null, {
          status: 500
        });
      })
    );

---

    // Async query

    await screen.findByText("Anna");

---

    // User interaction

    const user = userEvent.setup();

    await user.click(button);

    await user.type(input, "Anna");

---

# 82. Interview Questions

### Що таке integration test?

Тест, який перевіряє взаємодію кількох частин application.

### Чим integration test відрізняється від unit test?

Unit test ізолює невелику частину системи. Integration test перевіряє, як кілька частин працюють разом.

### Чим integration test відрізняється від E2E?

Integration test зазвичай працює на рівні application components/modules, а E2E перевіряє повний user flow через реальний browser та application environment.

### Чи потрібно mock-увати API?

Для React integration tests часто так. MSW дозволяє mock-увати HTTP boundary, залишаючи application code реальним.

### Чому не потрібно mock-увати кожен hook?

Тому що integration test повинен перевірити взаємодію component і hook.

### Що таке test boundary?

Межа між реальним application code та заміненим dependency.

Наприклад:

    Component
      ↓
    Hook
      ↓
    API client
      ↓
    [MSW boundary]
      ↓
    mocked server

### Чому `userEvent` кращий за прямий виклик event у багатьох випадках?

Тому що він моделює дії користувача ближче до реальної поведінки браузера.

### Що потрібно тестувати в integration test?

User behavior, application flow, state transitions, API success/error, navigation та результат у UI.

### Чи потрібно перевіряти `useState` або `useEffect`?

Зазвичай ні. Потрібно перевіряти observable behavior application.

### Чи integration tests замінюють unit tests?

Ні. Вони доповнюють один одного.

---

# 83. Головна схема

    ┌─────────────────────┐
    │       User          │
    └──────────┬──────────┘
               │
               ▼
    ┌─────────────────────┐
    │   React Component   │
    └──────────┬──────────┘
               │
       ┌───────┼────────┐
       ▼       ▼        ▼
     State    Hook    Router
       │       │        │
       └───────┼────────┘
               ▼
          API client
               │
               ▼
          ┌─────────┐
          │   MSW   │
          └────┬────┘
               │
               ▼
        Mocked response
               │
               ▼
        Application state
               │
               ▼
             UI
               │
               ▼
           Assertion

---

# 84. Підсумок

Integration testing — це рівень тестування між unit tests та E2E tests.

Головна ідея:

    не тестувати частини ізольовано,
    а перевірити їхню взаємодію.

Для React application типовий flow:

    user
      ↓
    component
      ↓
    state / hooks / providers
      ↓
    API
      ↓
    MSW
      ↓
    response
      ↓
    application state
      ↓
    UI

Найкращий integration test читається майже як сценарій:

    користувач робить X
        ↓
    application робить Y
        ↓
    API відповідає Z
        ↓
    користувач бачить результат

Саме це і є головна мета integration testing:

> Перевірити, що реальні частини React application правильно працюють разом і забезпечують очікувану поведінку для користувача.