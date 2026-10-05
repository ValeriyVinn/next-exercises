# Mocking API у React-тестах

## 📁 Розташування

    react/
    └── 📁 11-component-testing
        └── 📁 06-mocking-api

---

# 1. Що таке Mocking API

**Mocking API** — це заміна реального HTTP-сервера контрольованою тестовою реалізацією.

Під час тесту ми зазвичай **не хочемо звертатися до справжнього backend API**.

Замість цього створюємо mock:

    Component
        ↓
    fetch("/api/users")
        ↓
    Mock API
        ↓
    test response

Наприклад, компонент очікує:

    GET /api/users

А тестовий сервер може повернути:

    [
      { id: 1, name: "Anna" },
      { id: 2, name: "John" }
    ]

---

# 2. Навіщо потрібен API mocking

Без mocking тест може залежати від:

- реального backend;
- доступності сервера;
- мережі;
- бази даних;
- authentication;
- зовнішніх API;
- конкретного стану даних;
- швидкості мережі.

З mock API тест стає:

- швидким;
- передбачуваним;
- ізольованим;
- повторюваним;
- незалежним від backend.

---

# 3. Основна ідея

У production:

    React component
        ↓
    fetch()
        ↓
    real API
        ↓
    database

У тесті:

    React component
        ↓
    fetch()
        ↓
    mock API
        ↓
    predefined response

---

# 4. Що саме ми тестуємо

Важливо:

> Ми не тестуємо сам backend.

Ми тестуємо, як **React-компонент реагує на різні відповіді API**.

Наприклад:

- loading;
- success;
- empty response;
- HTTP error;
- network error;
- invalid response;
- POST success;
- POST error.

---

# 5. Типовий компонент

Наприклад, компонент завантажує список користувачів.

    import { useEffect, useState } from "react";

    type User = {
      id: number;
      name: string;
    };

    export function Users() {
      const [users, setUsers] = useState<User[]>([]);
      const [loading, setLoading] = useState(true);
      const [error, setError] = useState("");

      useEffect(() => {
        async function loadUsers() {
          try {
            const response = await fetch("/api/users");

            if (!response.ok) {
              throw new Error("Failed to load users");
            }

            const data: User[] = await response.json();

            setUsers(data);
          } catch {
            setError("Не вдалося завантажити користувачів");
          } finally {
            setLoading(false);
          }
        }

        loadUsers();
      }, []);

      if (loading) {
        return <p>Завантаження...</p>;
      }

      if (error) {
        return <p>{error}</p>;
      }

      return (
        <ul>
          {users.map(user => (
            <li key={user.id}>{user.name}</li>
          ))}
        </ul>
      );
    }

---

# 6. Що потрібно перевірити

Для такого компонента бажано мати окремі тести для:

    loading
    ↓
    success
    ↓
    empty
    ↓
    HTTP error
    ↓
    network error

Наприклад:

    ✓ показує loading
    ✓ показує users після успішного запиту
    ✓ показує повідомлення для empty response
    ✓ показує error при HTTP 500
    ✓ показує error при network failure

---

# 7. Два основні підходи

У React-тестах можна mock API кількома способами.

Найпоширеніші:

1. mock `fetch`;
2. mock HTTP-рівня через **MSW (Mock Service Worker)**.

---

# 8. Mocking fetch напряму

Найпростіший варіант — замінити `fetch`.

Наприклад:

    globalThis.fetch = vi.fn();

Після цього можна визначити відповідь:

    vi.mocked(fetch).mockResolvedValue(
      new Response(
        JSON.stringify([
          { id: 1, name: "Anna" }
        ]),
        {
          status: 200,
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
    );

---

# 9. Приклад тесту з mock fetch

    import { render, screen } from "@testing-library/react";
    import { describe, expect, it, vi } from "vitest";
    import { Users } from "./Users";

    describe("Users", () => {
      it("renders users after successful request", async () => {
        vi.mocked(fetch).mockResolvedValue(
          new Response(
            JSON.stringify([
              { id: 1, name: "Anna" },
              { id: 2, name: "John" }
            ]),
            {
              status: 200,
              headers: {
                "Content-Type": "application/json"
              }
            }
          )
        );

        render(<Users />);

        expect(
          await screen.findByText("Anna")
        ).toBeInTheDocument();

        expect(
          screen.getByText("John")
        ).toBeInTheDocument();
      });
    });

---

# 10. Не забуваймо очищати mock

Якщо один тест змінив `fetch`, наступний тест не повинен успадкувати його стан.

Можна використовувати:

    beforeEach(() => {
      vi.clearAllMocks();
    });

Або:

    afterEach(() => {
      vi.restoreAllMocks();
    });

Залежить від того, що саме mock-увалося.

---

# 11. Перевірка URL

Можна перевірити, чи компонент викликав правильний endpoint.

    expect(fetch).toHaveBeenCalledWith("/api/users");

Або:

    expect(fetch).toHaveBeenCalledTimes(1);

---

# 12. Перевірка параметрів request

Наприклад:

    await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        name: "Anna"
      })
    });

У тесті:

    expect(fetch).toHaveBeenCalledWith(
      "/api/users",
      expect.objectContaining({
        method: "POST"
      })
    );

---

# 13. Чому прямий mock fetch не завжди найкращий

Mocking `fetch` працює, але тест починає знати деталі реалізації.

Наприклад:

    vi.mocked(fetch).mockResolvedValue(...)

Тест напряму втручається в глобальний `fetch`.

Це може зробити тести:

- більш крихкими;
- менш схожими на реальну поведінку;
- залежними від реалізації компонента.

Для більш реалістичних інтеграційних тестів часто використовують **MSW**.

---

# 14. MSW

**MSW (Mock Service Worker)** дозволяє перехоплювати HTTP-запити на рівні мережі.

Ідея:

    Component
        ↓
    fetch("/api/users")
        ↓
    MSW
        ↓
    mocked HTTP response

Компонент при цьому не знає, що API замокований.

---

# 15. Чому MSW зручний

Замість:

    vi.mocked(fetch).mockResolvedValue(...)

ми описуємо:

    GET /api/users
        → return users

Це ближче до реального використання API.

Компонент продовжує виконувати:

    fetch("/api/users")

а MSW перехоплює цей запит.

---

# 16. Встановлення MSW

Для Vitest-проєкту:

    npm install -D msw

---

# 17. Структура тестового API

Зручно винести handlers в окремий файл.

Наприклад:

    src/
    └── test/
        ├── handlers.ts
        └── server.ts

---

# 18. Handler

Для MSW v2 можна описати GET endpoint так:

    import { http, HttpResponse } from "msw";

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

---

# 19. Що означає handler

Цей код:

    http.get("/api/users", () => {
      return HttpResponse.json([
        {
          id: 1,
          name: "Anna"
        }
      ]);
    });

означає:

> Якщо під час тесту виконується GET `/api/users`, поверни цей JSON.

---

# 20. MSW server

Створюємо сервер:

    import { setupServer } from "msw/node";
    import { handlers } from "./handlers";

    export const server = setupServer(...handlers);

---

# 21. Lifecycle MSW

У тестовому setup:

    import { beforeAll, afterAll, afterEach } from "vitest";
    import { server } from "./server";

    beforeAll(() => {
      server.listen();
    });

    afterEach(() => {
      server.resetHandlers();
    });

    afterAll(() => {
      server.close();
    });

---

# 22. Що робить кожна функція

## `server.listen()`

Запускає mock server.

    beforeAll(() => {
      server.listen();
    });

---

## `server.resetHandlers()`

Повертає handlers до початкового стану.

    afterEach(() => {
      server.resetHandlers();
    });

Це дуже важливо для ізоляції тестів.

---

## `server.close()`

Зупиняє mock server.

    afterAll(() => {
      server.close();
    });

---

# 23. Базовий MSW test

    import { render, screen } from "@testing-library/react";
    import { describe, expect, it } from "vitest";
    import { Users } from "./Users";

    describe("Users", () => {
      it("renders users from API", async () => {
        render(<Users />);

        expect(
          await screen.findByText("Anna")
        ).toBeInTheDocument();

        expect(
          screen.getByText("John")
        ).toBeInTheDocument();
      });
    });

Тут тест взагалі не mock-ує `fetch`.

MSW робить це на мережевому рівні.

---

# 24. Success response

Типовий success response:

    http.get("/api/users", () => {
      return HttpResponse.json([
        {
          id: 1,
          name: "Anna"
        }
      ]);
    });

Тест:

    render(<Users />);

    expect(
      await screen.findByText("Anna")
    ).toBeInTheDocument();

---

# 25. HTTP error

Можна перевірити, як компонент реагує на HTTP 500.

    http.get("/api/users", () => {
      return new HttpResponse(null, {
        status: 500
      });
    });

Тест:

    render(<Users />);

    expect(
      await screen.findByText(
        "Не вдалося завантажити користувачів"
      )
    ).toBeInTheDocument();

---

# 26. HTTP status ≠ network error

Це важливе розрізнення.

## HTTP error

Сервер відповів:

    HTTP 500
    HTTP 404
    HTTP 401

Тобто мережевий запит відбувся.

---

## Network error

Запит взагалі не отримав нормальної HTTP-відповіді.

Наприклад:

    http.get("/api/users", () => {
      return HttpResponse.error();
    });

Це дозволяє перевірити поведінку компонента при проблемах мережі.

---

# 27. 404

Можна протестувати:

    http.get("/api/users", () => {
      return new HttpResponse(null, {
        status: 404
      });
    });

Тест повинен перевіряти UI:

    expect(
      await screen.findByText(
        "Не вдалося завантажити користувачів"
      )
    ).toBeInTheDocument();

---

# 28. 401 Unauthorized

Для protected API:

    http.get("/api/profile", () => {
      return new HttpResponse(null, {
        status: 401
      });
    });

Компонент може показати:

    Будь ласка, увійдіть у систему.

Тест:

    expect(
      await screen.findByText(
        "Будь ласка, увійдіть у систему."
      )
    ).toBeInTheDocument();

---

# 29. 403 Forbidden

    http.get("/api/admin", () => {
      return new HttpResponse(null, {
        status: 403
      });
    });

Наприклад:

    Доступ заборонено.

---

# 30. Empty response

API може успішно відповісти, але список буде порожнім.

    http.get("/api/users", () => {
      return HttpResponse.json([]);
    });

Компонент повинен показати:

    Користувачів не знайдено.

Тест:

    expect(
      await screen.findByText(
        "Користувачів не знайдено."
      )
    ).toBeInTheDocument();

---

# 31. Loading state

Loading часто складніше перевірити, якщо API відповідає дуже швидко.

Наприклад:

    render(<Users />);

    expect(
      screen.getByText("Завантаження...")
    ).toBeInTheDocument();

Після завершення request:

    expect(
      await screen.findByText("Anna")
    ).toBeInTheDocument();

---

# 32. `getBy` vs `findBy`

Для синхронного UI:

    screen.getByText("Hello");

Для UI, який з'явиться після API:

    await screen.findByText("Anna");

Запам'ятай:

    getBy
      ↓
    шукає зараз

    findBy
      ↓
    чекає асинхронний результат

---

# 33. `waitFor`

Іноді потрібно дочекатися певної умови:

    await waitFor(() => {
      expect(
        screen.getByText("Anna")
      ).toBeInTheDocument();
    });

Але якщо достатньо `findBy`, краще використовувати саме його:

    await screen.findByText("Anna");

---

# 34. Per-test override

Часто базовий handler описує success response.

Наприклад:

    export const handlers = [
      http.get("/api/users", () => {
        return HttpResponse.json([
          {
            id: 1,
            name: "Anna"
          }
        ]);
      })
    ];

А конкретний тест хоче отримати 500.

Тоді можна тимчасово перевизначити handler.

    server.use(
      http.get("/api/users", () => {
        return new HttpResponse(null, {
          status: 500
        });
      })
    );

---

# 35. Чому `server.use()` корисний

Можна мати стандартний success scenario:

    GET /api/users
        → 200

А в окремому тесті:

    GET /api/users
        → 500

При цьому базовий handler не змінюється назавжди.

---

# 36. Повний error test

    it("shows error when API returns 500", async () => {
      server.use(
        http.get("/api/users", () => {
          return new HttpResponse(null, {
            status: 500
          });
        })
      );

      render(<Users />);

      expect(
        await screen.findByText(
          "Не вдалося завантажити користувачів"
        )
      ).toBeInTheDocument();
    });

---

# 37. Важливість `resetHandlers`

Якщо тест змінив handler:

    server.use(...);

наступний тест не повинен успадковувати цю зміну.

Тому:

    afterEach(() => {
      server.resetHandlers();
    });

Це забезпечує незалежність тестів.

---

# 38. POST request

Mock API може обробляти не тільки GET.

Наприклад:

    http.post("/api/users", async ({ request }) => {
      const body = await request.json();

      return HttpResponse.json(
        {
          id: 3,
          name: "Anna"
        },
        {
          status: 201
        }
      );
    });

---

# 39. Тестування форми з API

Припустимо, є форма:

    Name: [ Anna ]

    [Create user]

Після submit:

    POST /api/users

Компонент показує:

    Користувача створено.

Тест:

    render(<CreateUserForm />);

    await userEvent.type(
      screen.getByLabelText("Name"),
      "Anna"
    );

    await userEvent.click(
      screen.getByRole("button", {
        name: "Create user"
      })
    );

    expect(
      await screen.findByText(
        "Користувача створено."
      )
    ).toBeInTheDocument();

---

# 40. Перевірка request body

MSW дозволяє перевіряти дані request.

Наприклад:

    http.post("/api/users", async ({ request }) => {
      const body = await request.json();

      expect(body).toEqual({
        name: "Anna"
      });

      return HttpResponse.json(
        {
          id: 1,
          name: "Anna"
        },
        {
          status: 201
        }
      );
    });

Але не варто перетворювати handler на великий набір assertions.

Основна мета handler — **імітувати API**.

---

# 41. PUT / PATCH

Наприклад:

    http.patch("/api/users/1", async () => {
      return HttpResponse.json({
        id: 1,
        name: "Updated Anna"
      });
    });

---

# 42. DELETE

    http.delete("/api/users/1", () => {
      return new HttpResponse(null, {
        status: 204
      });
    });

Тест може перевірити:

    User deleted

або зникнення елемента зі списку.

---

# 43. Dynamic URL

API може містити параметр:

    /api/users/123

Handler:

    http.get("/api/users/:id", ({ params }) => {
      const { id } = params;

      return HttpResponse.json({
        id,
        name: "Anna"
      });
    });

Тепер один handler може працювати з різними ID.

---

# 44. Query parameters

Наприклад:

    /api/users?search=anna

Handler може отримати URL:

    http.get("/api/users", ({ request }) => {
      const url = new URL(request.url);

      const search = url.searchParams.get("search");

      return HttpResponse.json([
        {
          id: 1,
          name: search ?? "Unknown"
        }
      ]);
    });

---

# 45. Mocking authentication

Можна змоделювати authenticated/unauthenticated API.

Наприклад:

    http.get("/api/profile", ({ request }) => {
      const authorization =
        request.headers.get("Authorization");

      if (!authorization) {
        return new HttpResponse(null, {
          status: 401
        });
      }

      return HttpResponse.json({
        id: 1,
        name: "Anna"
      });
    });

Це дозволяє тестувати:

    authenticated
        ↓
    profile

і:

    unauthenticated
        ↓
    login message

---

# 46. Mocking різних сценаріїв

Для одного endpoint можна мати багато сценаріїв.

    GET /api/users
        ├── 200 + users
        ├── 200 + []
        ├── 401
        ├── 403
        ├── 404
        ├── 500
        └── network error

Саме це робить API mocking дуже корисним.

---

# 47. Не тестуй реалізацію замість поведінки

Поганий підхід:

    expect(fetch).toHaveBeenCalledWith(...)

як єдина мета тесту.

Кращий:

    API
      ↓
    component
      ↓
    user-visible UI

Наприклад:

    API → 500

очікуємо:

    "Не вдалося завантажити користувачів"

Користувачеві байдуже, чи компонент використав:

    fetch

    axios

    custom hook

    service function

Він бачить UI.

---

# 48. Але request assertions іноді корисні

Наприклад, для форми важливо переконатися, що правильні дані відправляються.

Можна перевірити:

    POST /api/users

з body:

    {
      "name": "Anna"
    }

Це вже перевіряє важливу поведінку.

---

# 49. API mocking і custom hooks

Припустимо:

    useUsers()
        ↓
    fetch("/api/users")
        ↓
    API

Компонент:

    UsersPage
        ↓
    useUsers()

У тесті можна залишити реальний hook:

    render(<UsersPage />);

а замокувати лише HTTP:

    MSW
      ↓
    /api/users

Це часто дає хороший інтеграційний тест.

---

# 50. API mocking і React Query

Якщо використовується React Query:

    Component
        ↓
    useQuery()
        ↓
    fetch()
        ↓
    MSW

MSW особливо зручний, тому що не потрібно mock-увати сам React Query.

Тестуємо поведінку всієї взаємодії.

---

# 51. API mocking і Redux

Аналогічно:

    Component
        ↓
    Redux
        ↓
    async request
        ↓
    MSW

Можна перевірити:

    request
      ↓
    loading
      ↓
    success
      ↓
    Redux state
      ↓
    UI

---

# 52. Mocking API vs mocking module

Це різні речі.

## Module mocking

Наприклад:

    vi.mock("./api");

Ми замінюємо модуль.

---

## API mocking

Наприклад MSW:

    http.get("/api/users", ...);

Ми імітуємо HTTP interaction.

---

# 53. `vi.fn()`

`vi.fn()` створює mock function.

Наприклад:

    const onSubmit = vi.fn();

    render(
      <Form onSubmit={onSubmit} />
    );

Після interaction:

    expect(onSubmit).toHaveBeenCalled();

Це корисно для callback functions.

Але для HTTP API часто краще використовувати MSW.

---

# 54. `vi.spyOn()`

Можна створити spy:

    const spy = vi.spyOn(
      console,
      "error"
    );

Але не потрібно використовувати spies там, де достатньо тестування UI.

---

# 55. Mocking API через `vi.mock`

Можна мати API service:

    export async function getUsers() {
      const response = await fetch("/api/users");

      if (!response.ok) {
        throw new Error("Failed");
      }

      return response.json();
    }

Його можна mock-увати:

    vi.mock("./api", () => ({
      getUsers: vi.fn()
    }));

Але тоді тест вже не перевіряє реальну взаємодію:

    component
        ↓
    getUsers()
        ↓
    fetch()

Він перевіряє лише:

    component
        ↓
    mocked getUsers()

---

# 56. Коли використовувати `vi.mock`

`vi.mock` доречний, коли потрібно ізолювати компонент від:

- складного модуля;
- filesystem;
- browser API;
- third-party library;
- важкого dependency.

Для HTTP interaction часто краще:

    MSW

---

# 57. Рекомендована стратегія

Для React application:

    Unit test
        ↓
    mock function / vi.fn

    HTTP integration test
        ↓
    MSW

    E2E test
        ↓
    real application environment
        ↓
    real or test backend

---

# 58. Три рівні тестування

    Unit
      ↓
    окрема функція / hook

    Integration
      ↓
    component + API + providers

    E2E
      ↓
    browser + frontend + backend

API mocking найчастіше особливо корисний на рівні **integration tests**.

---

# 59. Реальний backend у component test — погана ідея

Не рекомендується:

    test
      ↓
    real backend
      ↓
    real database

Проблеми:

- повільно;
- нестабільно;
- залежить від мережі;
- дані можуть змінитися;
- потрібен backend;
- тест складніше запускати локально;
- CI може падати.

Краще:

    test
      ↓
    MSW
      ↓
    deterministic response

---

# 60. Не роби mock надто складним

Поганий mock:

    300 рядків
    складна бізнес-логіка
    багато умов
    власна database simulation

Mock повинен бути простим.

Його задача:

> Дати тесту передбачувану HTTP-відповідь.

---

# 61. Не копіюй production backend у mock

Наприклад, якщо backend має складну логіку:

    calculatePrice()
    validateUser()
    calculateDiscount()
    checkInventory()

не потрібно повністю переносити цю логіку в mock.

У тесті достатньо:

    POST /api/orders
        ↓
    201 Created

або:

    POST /api/orders
        ↓
    400 Bad Request

---

# 62. Test data

Зручно винести тестові дані:

    export const users = [
      {
        id: 1,
        name: "Anna"
      },
      {
        id: 2,
        name: "John"
      }
    ];

Handler:

    http.get("/api/users", () => {
      return HttpResponse.json(users);
    });

Це робить handlers чистішими.

---

# 63. Не використовуй `any`

Погано:

    const user: any = {
      id: 1,
      name: "Anna"
    };

Краще:

    type User = {
      id: number;
      name: string;
    };

    const user: User = {
      id: 1,
      name: "Anna"
    };

Типізація тестових даних так само важлива, як і production-коду.

---

# 64. Приклад структури

Для проєкту з Vitest + RTL + MSW:

    src/
    ├── components/
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

# 65. Приклад `handlers.ts`

    import { http, HttpResponse } from "msw";

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

---

# 66. Приклад `server.ts`

    import { setupServer } from "msw/node";
    import { handlers } from "./handlers";

    export const server = setupServer(...handlers);

---

# 67. Приклад `setup.ts`

    import { afterAll, afterEach, beforeAll } from "vitest";
    import { server } from "./server";

    beforeAll(() => {
      server.listen();
    });

    afterEach(() => {
      server.resetHandlers();
    });

    afterAll(() => {
      server.close();
    });

---

# 68. Підключення setup до Vitest

У `vitest.config.ts`:

    import { defineConfig } from "vitest/config";

    export default defineConfig({
      test: {
        setupFiles: "./src/test/setup.ts"
      }
    });

---

# 69. Повний flow

Уявімо:

    Users.test.tsx

Тест:

    render(<Users />)

Компонент:

    useEffect()
        ↓
    fetch("/api/users")

MSW:

    GET /api/users
        ↓
    JSON users

React:

    setUsers(data)

UI:

    Anna
    John

Test:

    expect(screen.getByText("Anna"))
        .toBeInTheDocument();

---

# 70. Test success scenario

    it("renders users", async () => {
      render(<Users />);

      expect(
        await screen.findByText("Anna")
      ).toBeInTheDocument();

      expect(
        screen.getByText("John")
      ).toBeInTheDocument();
    });

---

# 71. Test error scenario

    it("renders error message", async () => {
      server.use(
        http.get("/api/users", () => {
          return new HttpResponse(null, {
            status: 500
          });
        })
      );

      render(<Users />);

      expect(
        await screen.findByText(
          "Не вдалося завантажити користувачів"
        )
      ).toBeInTheDocument();
    });

---

# 72. Test empty state

    it("renders empty state", async () => {
      server.use(
        http.get("/api/users", () => {
          return HttpResponse.json([]);
        })
      );

      render(<Users />);

      expect(
        await screen.findByText(
          "Користувачів не знайдено."
        )
      ).toBeInTheDocument();
    });

---

# 73. Test network error

    it("renders error when network fails", async () => {
      server.use(
        http.get("/api/users", () => {
          return HttpResponse.error();
        })
      );

      render(<Users />);

      expect(
        await screen.findByText(
          "Не вдалося завантажити користувачів"
        )
      ).toBeInTheDocument();
    });

---

# 74. Чотири основні API-сценарії

Для більшості компонентів достатньо почати з:

    1. success
       ↓
       200 + data

    2. empty
       ↓
       200 + []

    3. HTTP error
       ↓
       4xx / 5xx

    4. network error
       ↓
       request failure

---

# 75. Типова помилка №1 — забути `await`

Погано:

    expect(
      screen.findByText("Anna")
    ).toBeInTheDocument();

`findBy` повертає Promise.

Правильно:

    expect(
      await screen.findByText("Anna")
    ).toBeInTheDocument();

---

# 76. Типова помилка №2 — використовувати `getBy` для async UI

Погано:

    render(<Users />);

    expect(
      screen.getByText("Anna")
    ).toBeInTheDocument();

Якщо дані приходять асинхронно, елемента ще може не бути.

Краще:

    expect(
      await screen.findByText("Anna")
    ).toBeInTheDocument();

---

# 77. Типова помилка №3 — не скидати handlers

Погано:

    server.use(
      http.get("/api/users", () => {
        return new HttpResponse(null, {
          status: 500
        });
      })
    );

і відсутній:

    afterEach(() => {
      server.resetHandlers();
    });

Тоді наступні тести можуть отримати несподіваний 500.

---

# 78. Типова помилка №4 — реальний backend

Погано:

    test
      ↓
    localhost:3000
      ↓
    backend
      ↓
    PostgreSQL

для звичайного component test.

Краще:

    test
      ↓
    MSW
      ↓
    predefined response

---

# 79. Типова помилка №5 — mock implementation замість behavior

Погано тестувати:

    useEffect був викликаний
    fetch був викликаний
    setState був викликаний

Краще тестувати:

    API success
      ↓
    users показані

або:

    API error
      ↓
    error message показано

---

# 80. Типова помилка №6 — занадто багато mock-ів

Якщо замокувати:

    fetch
    API service
    custom hook
    state
    component

то тест майже нічого не перевіряє.

Краще залишити якомога більше реального application flow:

    component
      ↓
    hook
      ↓
    API client
      ↓
    MSW

---

# 81. MSW vs `vi.mock`

| Підхід | Що mock-ує | Коли використовувати |
|---|---|---|
| `vi.fn()` | функцію | callbacks, окремі функції |
| `vi.spyOn()` | існуючу функцію | spies |
| `vi.mock()` | module | ізоляція dependency |
| `fetch` mock | HTTP client | прості тести |
| MSW | HTTP layer | API/integration tests |

---

# 82. Найкраща практична модель

Для React application можна використовувати:

    Unit test
        ↓
    vi.fn()

    Component test
        ↓
    React Testing Library

    API integration behavior
        ↓
    MSW

    E2E
        ↓
    Playwright / Cypress
        ↓
    real application

---

# 83. Що саме перевіряти в API-тесті

Перевіряй:

- loading state;
- success state;
- empty state;
- error state;
- network failure;
- HTTP status;
- правильний UI;
- правильні user interactions;
- request body, якщо це важлива поведінка;
- redirect, якщо він є;
- retry behavior, якщо він є.

Не потрібно перевіряти:

- внутрішній `useEffect`;
- `setState`;
- implementation details;
- роботу самого MSW;
- роботу самого `fetch`.

---

# 84. API mocking і принцип ізоляції

Хороший тест повинен бути незалежним від:

    Internet
    ↓
    Backend
    ↓
    Database

Тест повинен сам визначати:

    input
      ↓
    mocked API response
      ↓
    expected UI

Тоді результат тесту передбачуваний.

---

# 85. API mocking як контроль сценарію

Головна перевага mock API — ми можемо легко створити ситуації, які важко відтворити вручну.

Наприклад:

    500 Internal Server Error

    401 Unauthorized

    403 Forbidden

    404 Not Found

    network failure

    empty database

    slow response

Це дозволяє перевірити, чи UI правильно поводиться в нестандартних ситуаціях.

---

# 86. Повільна відповідь API

Іноді корисно змоделювати повільний backend.

Наприклад, можна додати затримку до response.

Ідея:

    render()
      ↓
    loading
      ↓
    API delay
      ↓
    success

Тоді можна окремо перевірити loading UI.

---

# 87. Loading — це теж частина UI

Не думай про loading як про технічну деталь.

Для користувача:

    Loading
      ↓
    Content

або:

    Loading
      ↓
    Error

або:

    Loading
      ↓
    Empty

Це різні UI states, які потрібно тестувати.

---

# 88. API state machine

Зручно мислити компонент як state machine:

    IDLE
      ↓
    LOADING
      ↓
    ┌───────────────┬───────────────┐
    ↓               ↓               ↓
    SUCCESS         EMPTY           ERROR

Наприклад:

    LOADING
      ↓
    users loaded
      ↓
    SUCCESS

або:

    LOADING
      ↓
    []
      ↓
    EMPTY

або:

    LOADING
      ↓
    500
      ↓
    ERROR

---

# 89. Практичний шаблон тестів

Для API-компонента можна почати з такого набору:

    describe("Users", () => {
      it("shows loading state", () => {
        // ...
      });

      it("renders users after successful request", async () => {
        // ...
      });

      it("renders empty state", async () => {
        // ...
      });

      it("renders error for HTTP failure", async () => {
        // ...
      });

      it("renders error for network failure", async () => {
        // ...
      });
    });

---

# 90. Checklist

Перед завершенням API-тестів перевір:

    □ API не викликає реальний backend
    □ success scenario протестований
    □ loading scenario протестований
    □ empty scenario протестований
    □ HTTP error протестований
    □ network error протестований
    □ async assertions використовують await
    □ handlers reset після тестів
    □ немає залежності від порядку тестів
    □ mock не містить зайвої бізнес-логіки
    □ перевіряється user-visible behavior
    □ немає `any`

---

# 91. Що запам'ятати

> Mock API — це контрольована заміна реального HTTP API під час тестування.

> Для React integration tests дуже зручно використовувати MSW.

> `server.use()` дозволяє змінити response для конкретного тесту.

> `server.resetHandlers()` ізолює тести один від одного.

> `findBy...` зручний для асинхронного UI.

> HTTP error і network error — різні сценарії.

> Тестуй поведінку UI, а не внутрішню реалізацію.

> Не потрібно копіювати backend у mock.

---

# 92. Коротка шпаргалка

    // handler

    http.get("/api/users", () => {
      return HttpResponse.json([
        {
          id: 1,
          name: "Anna"
        }
      ]);
    });

---

    // server

    export const server = setupServer(
      ...handlers
    );

---

    // setup

    beforeAll(() => {
      server.listen();
    });

    afterEach(() => {
      server.resetHandlers();
    });

    afterAll(() => {
      server.close();
    });

---

    // override

    server.use(
      http.get("/api/users", () => {
        return new HttpResponse(null, {
          status: 500
        });
      })
    );

---

    // async UI

    expect(
      await screen.findByText("Anna")
    ).toBeInTheDocument();

---

    // empty

    http.get("/api/users", () => {
      return HttpResponse.json([]);
    });

---

    // network error

    http.get("/api/users", () => {
      return HttpResponse.error();
    });

---

    // POST

    http.post("/api/users", async ({ request }) => {
      const body = await request.json();

      return HttpResponse.json(
        {
          id: 1,
          name: "Anna"
        },
        {
          status: 201
        }
      );
    });

---

# 93. Головна схема

    React component
          │
          │ fetch()
          ▼
    ┌───────────────┐
    │      MSW      │
    └───────────────┘
          │
          ├── 200 → success
          │
          ├── 200 + [] → empty
          │
          ├── 401 → unauthorized
          │
          ├── 404 → not found
          │
          ├── 500 → server error
          │
          └── network error
                  │
                  ▼
              React UI
                  │
                  ▼
                test

---

# 94. Interview Questions

### Що таке API mocking?

Це заміна реального API контрольованою тестовою відповіддю.

### Навіщо mock-увати API?

Щоб тести були швидкими, ізольованими, стабільними та незалежними від backend і мережі.

### Що таке MSW?

MSW — інструмент для перехоплення HTTP-запитів і повернення контрольованих відповідей під час тестування.

### Чим MSW відрізняється від `vi.mock()`?

`vi.mock()` замінює JavaScript-модуль, а MSW імітує HTTP interaction.

### Навіщо `server.resetHandlers()`?

Щоб зміни handlers у конкретному тесті не впливали на наступні тести.

### Чим HTTP error відрізняється від network error?

При HTTP error сервер повертає HTTP response із статусом, наприклад `500`. При network error нормальної HTTP-відповіді немає.

### Чому для API-даних часто використовується `findBy...`?

Тому що API response приходить асинхронно, і елемент може з'явитися в DOM пізніше.

### Чи потрібно тестувати реальний backend у component tests?

Зазвичай ні. Для component/integration tests зручно використовувати mock API, наприклад MSW.

### Що краще тестувати: `fetch` чи UI?

Переважно UI behavior: що користувач бачить після success/error/loading.

---

# 95. Підсумок

API mocking потрібен для того, щоб тестувати React-компоненти **без реального backend**.

Найпростіший варіант:

    vi.mocked(fetch)
        ↓
    predefined response

Більш реалістичний варіант:

    React
      ↓
    fetch
      ↓
    MSW
      ↓
    mocked HTTP response

Для навчальних і production-подібних integration tests корисно запам'ятати саме таку модель:

    Component
        ↓
    real application code
        ↓
    HTTP request
        ↓
    MSW
        ↓
    controlled response
        ↓
    UI
        ↓
    assertion

Головний принцип:

> Не тестуй, як компонент робить HTTP-запит. Тестуй, як компонент поводиться, коли API повертає різні результати.

Це дозволяє будувати стабільні, швидкі та змістовні React-тести.