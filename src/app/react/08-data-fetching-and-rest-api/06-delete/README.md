# DELETE у React

> `DELETE` — HTTP-метод для **видалення ресурсу на сервері**.
>
> У React він зазвичай викликається після явної дії користувача:
>
> **кнопка → event handler → fetch() → DELETE → API → Backend → Database**
>
> Після успішного видалення React повинен синхронізувати свій UI зі станом сервера.

---

# 1. Що таке DELETE

`DELETE` використовується для видалення існуючого ресурсу.

Наприклад, маємо:

    GET /api/users/10

Відповідь:

    {
      "id": 10,
      "name": "Valeriy",
      "email": "valeriy@example.com"
    }

Щоб видалити цього користувача:

    DELETE /api/users/10

---

# 2. DELETE у CRUD

Маємо:

    CREATE
      ↓
    POST

    READ
      ↓
    GET

    UPDATE
      ↓
    PUT / PATCH

    DELETE
      ↓
    DELETE

Тобто:

| Операція | HTTP method |
|---|---|
| Create | `POST` |
| Read | `GET` |
| Update | `PUT` / `PATCH` |
| Delete | `DELETE` |

---

# 3. Найпростіший DELETE через fetch()

    const response = await fetch("/api/users/10", {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Не вдалося видалити користувача");
    }

Цього може бути достатньо, якщо API не потребує body або додаткових headers.

---

# 4. DELETE із React

Наприклад, маємо кнопку:

    <button onClick={handleDelete}>
      Видалити
    </button>

Обробник:

    async function handleDelete() {
      const response = await fetch("/api/users/10", {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Не вдалося видалити користувача");
      }
    }

---

# 5. DELETE зазвичай запускається через event handler

На відміну від GET, DELETE змінює дані на сервері.

Тому типовий сценарій:

    user clicks "Delete"
          ↓
    onClick
          ↓
    handleDelete()
          ↓
    fetch()
          ↓
    DELETE
          ↓
    API

Не потрібно без причини виконувати DELETE автоматично через `useEffect()`.

---

# 6. Чому DELETE не варто запускати в useEffect()

Небажано:

    useEffect(() => {
      fetch("/api/users/10", {
        method: "DELETE",
      });
    }, []);

Це означає:

> Після монтування компонента автоматично видали користувача.

Для звичайного UI це небезпечно.

Краще:

    <button onClick={handleDelete}>
      Видалити
    </button>

---

# 7. DELETE із динамічним id

У реальному застосунку id не буде захардкоджений.

Маємо:

    type User = {
      id: number;
      name: string;
      email: string;
    };

Функція:

    async function deleteUser(userId: number) {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Не вдалося видалити користувача");
      }
    }

Виклик:

    await deleteUser(user.id);

---

# 8. Повний простий компонент

    import { useState } from "react";

    type User = {
      id: number;
      name: string;
      email: string;
    };

    type Props = {
      user: User;
    };

    export default function DeleteUserButton({ user }: Props) {
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState<string | null>(null);

      async function handleDelete() {
        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(`/api/users/${user.id}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Не вдалося видалити користувача");
          }

          console.log("Користувача видалено");
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Сталася невідома помилка"
          );
        } finally {
          setIsLoading(false);
        }
      }

      return (
        <div>
          <button
            type="button"
            onClick={handleDelete}
            disabled={isLoading}
          >
            {isLoading ? "Видалення..." : "Видалити"}
          </button>

          {error && (
            <p>{error}</p>
          )}
        </div>
      );
    }

---

# 9. Чому потрібен loading state

DELETE — це асинхронна операція.

Між:

    click

і:

    server response

може пройти певний час.

Тому:

    const [isLoading, setIsLoading] = useState(false);

Під час запиту:

    setIsLoading(true);

Після:

    setIsLoading(false);

---

# 10. Повний flow loading

    user clicks Delete
          ↓
    setIsLoading(true)
          ↓
    DELETE request
          ↓
    server
          ↓
    response
          ↓
    setIsLoading(false)

---

# 11. Навіщо disabled

Під час видалення:

    <button
      type="button"
      onClick={handleDelete}
      disabled={isLoading}
    >
      {isLoading ? "Видалення..." : "Видалити"}
    </button>

Це допомагає уникнути:

    click
      ↓
    DELETE
      ↓
    click
      ↓
    DELETE
      ↓
    click
      ↓
    DELETE

---

# 12. Але disabled не є повним захистом

`disabled` захищає UI від повторного натискання.

Але він не захищає backend від:

- повторних HTTP-запитів;
- запитів з іншого клієнта;
- retry;
- мережевих проблем;
- ручного надсилання запиту.

Тому сервер також повинен правильно обробляти повторні DELETE.

---

# 13. DELETE і response.ok

Важливо:

`fetch()` не вважає HTTP `404`, `400` або `500` JavaScript exception.

Тому:

    const response = await fetch("/api/users/10", {
      method: "DELETE",
    });

не означає автоматично, що DELETE успішний.

Потрібно:

    if (!response.ok) {
      throw new Error("Не вдалося видалити");
    }

---

# 14. try / catch / finally

Рекомендований базовий шаблон:

    async function handleDelete() {
      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/users/${user.id}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Не вдалося видалити користувача");
        }

        console.log("Успішно видалено");
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Сталася невідома помилка"
        );
      } finally {
        setIsLoading(false);
      }
    }

`finally` виконається незалежно від результату.

---

# 15. DELETE і HTTP status codes

Після успішного DELETE API може повернути:

    200 OK

або:

    202 Accepted

або дуже часто:

    204 No Content

---

# 16. 204 No Content

`204 No Content` означає:

> Операція успішна, але сервер не повертає body.

Наприклад:

    DELETE /api/users/10

Response:

    204 No Content

У такому випадку не потрібно:

    const data = await response.json();

Тому що body відсутній.

Достатньо:

    if (!response.ok) {
      throw new Error("Delete failed");
    }

---

# 17. Типовий DELETE із 204

    async function deleteUser(userId: number): Promise<void> {
      const response = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        throw new Error("Не вдалося видалити користувача");
      }
    }

---

# 18. DELETE може повертати JSON

API може також повернути:

    200 OK

    {
      "message": "User deleted successfully"
    }

Тоді:

    const response = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    const data = await response.json();

    console.log(data.message);

Тому frontend повинен знати контракт API.

---

# 19. Не припускаємо, що DELETE завжди має body

Найчастіше:

    DELETE /api/users/10

і body не потрібен.

Але HTTP API може мати інший контракт.

Наприклад:

    DELETE /api/posts/10

може використовувати authentication headers:

    const response = await fetch("/api/posts/10", {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

---

# 20. DELETE із Authorization

Якщо API захищений:

    const response = await fetch(`/api/users/${user.id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

Наприклад:

    DELETE /api/users/10

    Authorization: Bearer ...

Backend перевіряє:

    authentication
          ↓
    authorization
          ↓
    permission
          ↓
    delete

---

# 21. Authentication ≠ Authorization

Важливо розрізняти.

### Authentication

> Хто ти?

Наприклад:

    user logged in

### Authorization

> Чи маєш ти право видаляти цей ресурс?

Наприклад:

    user = regular user
    resource = another user's account

Навіть якщо користувач authenticated, backend може відповісти:

    403 Forbidden

---

# 22. DELETE та credentials

Для cookie-based authentication може використовуватися:

    const response = await fetch(`/api/users/${user.id}`, {
      method: "DELETE",
      credentials: "include",
    });

Це залежить від архітектури authentication та CORS.

---

# 23. DELETE і CORS

Якщо frontend:

    http://localhost:3000

а backend:

    http://localhost:4000

запит:

    fetch("http://localhost:4000/api/users/10", {
      method: "DELETE",
    });

може вимагати CORS configuration на backend.

Backend повинен дозволяти відповідний origin та HTTP method.

---

# 24. Видалення з масиву React state

Найважливіша практична частина.

Маємо:

    const [users, setUsers] = useState<User[]>([]);

Після успішного DELETE:

    setUsers((currentUsers) =>
      currentUsers.filter(
        (user) => user.id !== deletedUserId
      )
    );

Тобто:

    users
      ↓
    filter()
      ↓
    новий масив без deleted user
      ↓
    setUsers()
      ↓
    React rerender
      ↓
    UI

---

# 25. Повний приклад списку користувачів

    import { useState } from "react";

    type User = {
      id: number;
      name: string;
      email: string;
    };

    type Props = {
      initialUsers: User[];
    };

    export default function UserList({
      initialUsers,
    }: Props) {
      const [users, setUsers] = useState<User[]>(initialUsers);

      const [deletingId, setDeletingId] = useState<number | null>(
        null
      );

      const [error, setError] = useState<string | null>(null);

      async function handleDelete(userId: number) {
        setDeletingId(userId);
        setError(null);

        try {
          const response = await fetch(`/api/users/${userId}`, {
            method: "DELETE",
          });

          if (!response.ok) {
            throw new Error("Не вдалося видалити користувача");
          }

          setUsers((currentUsers) =>
            currentUsers.filter(
              (user) => user.id !== userId
            )
          );
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Сталася невідома помилка"
          );
        } finally {
          setDeletingId(null);
        }
      }

      return (
        <div>
          {error && (
            <p>{error}</p>
          )}

          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <span>
                  {user.name}
                </span>

                <button
                  type="button"
                  onClick={() => handleDelete(user.id)}
                  disabled={deletingId === user.id}
                >
                  {deletingId === user.id
                    ? "Видалення..."
                    : "Видалити"}
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

---

# 26. Чому deletingId, а не просто isLoading

Якщо у нас список:

    User 1   [Delete]
    User 2   [Delete]
    User 3   [Delete]

і використовуємо:

    const [isLoading, setIsLoading] = useState(false);

то можна заблокувати всі кнопки.

Але часто краще:

    const [deletingId, setDeletingId] =
      useState<number | null>(null);

Тоді знаємо:

> Який саме користувач зараз видаляється?

Наприклад:

    deletingId = 10

Тільки кнопка користувача `10` стає disabled.

---

# 27. UI під час DELETE

До:

    User 1   [Видалити]
    User 2   [Видалити]
    User 3   [Видалити]

Під час видалення User 2:

    User 1   [Видалити]
    User 2   [Видалення...]
    User 3   [Видалити]

Після успіху:

    User 1   [Видалити]
    User 3   [Видалити]

---

# 28. Чому використовуємо filter()

Не робимо:

    users.splice(...)

безпосередньо зі state.

React state потрібно оновлювати immutable способом.

Правильно:

    setUsers((currentUsers) =>
      currentUsers.filter(
        (user) => user.id !== userId
      )
    );

`filter()` створює новий масив.

---

# 29. React state і mutation

Не варто:

    users.splice(index, 1);

    setUsers(users);

Тут ми мутуємо існуючий масив.

Краще:

    setUsers((currentUsers) =>
      currentUsers.filter(
        (user) => user.id !== userId
      )
    );

Це відповідає основному принципу React:

    state → immutable update → new state

---

# 30. Видалення одного елемента

Загальна формула:

    setItems((currentItems) =>
      currentItems.filter(
        (item) => item.id !== deletedId
      )
    );

Це універсальний патерн.

Наприклад:

    setPosts((posts) =>
      posts.filter(
        (post) => post.id !== deletedPostId
      )
    );

або:

    setProducts((products) =>
      products.filter(
        (product) => product.id !== deletedProductId
      )
    );

---

# 31. Видалення з UI після успішного DELETE

Важливий порядок:

    user clicks Delete
          ↓
    DELETE request
          ↓
    server
          ↓
    success?
       ↙      ↘
     no        yes
      ↓         ↓
    error    setUsers()
                ↓
              filter()
                ↓
              UI update

Не варто видаляти елемент із UI до підтвердження сервера, якщо ми не реалізуємо спеціально optimistic update.

---

# 32. Що якщо DELETE завершився помилкою?

Наприклад:

    DELETE /api/users/10

Backend:

    500 Internal Server Error

Тоді:

    setUsers(...filter...)

робити не потрібно.

Інакше UI покаже, що користувач видалений, хоча сервер його зберіг.

Краще:

    DELETE
      ↓
    failed
      ↓
    error
      ↓
    user remains in UI

---

# 33. Помилка 404

Наприклад:

    DELETE /api/users/999

Backend:

    404 Not Found

Це може означати:

> Користувач із таким id не існує.

Frontend може показати:

    "Користувача не знайдено."

---

# 34. Помилка 403

Наприклад:

    DELETE /api/users/10

Backend:

    403 Forbidden

Це може означати:

> Користувач увійшов у систему, але не має права видаляти цей ресурс.

Frontend може показати:

    "У вас немає прав для видалення цього користувача."

---

# 35. Помилка 401

    401 Unauthorized

Зазвичай означає проблему authentication.

Наприклад:

    token expired

або:

    user is not authenticated

У production-застосунку це може призвести до:

    refresh token
          ↓
    повторний запит

або:

    redirect to login

Конкретна логіка залежить від authentication system.

---

# 36. Confirmation перед DELETE

Видалення часто є небезпечною дією.

Простий варіант:

    async function handleDelete(userId: number) {
      const confirmed = window.confirm(
        "Ви впевнені, що хочете видалити користувача?"
      );

      if (!confirmed) {
        return;
      }

      // DELETE...
    }

---

# 37. Чому confirmation повинен бути перед fetch()

Правильний порядок:

    click
      ↓
    confirmation
      ↓
    user confirms?
      ↙       ↘
    no        yes
     ↓         ↓
   return     DELETE

Не потрібно спочатку відправляти DELETE, а потім питати підтвердження.

---

# 38. Повний приклад із confirmation

    async function handleDelete(userId: number) {
      const confirmed = window.confirm(
        "Видалити цього користувача?"
      );

      if (!confirmed) {
        return;
      }

      setDeletingId(userId);
      setError(null);

      try {
        const response = await fetch(`/api/users/${userId}`, {
          method: "DELETE",
        });

        if (!response.ok) {
          throw new Error("Не вдалося видалити користувача");
        }

        setUsers((currentUsers) =>
          currentUsers.filter(
            (user) => user.id !== userId
          )
        );
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Сталася невідома помилка"
        );
      } finally {
        setDeletingId(null);
      }
    }

---

# 39. Confirmation dialog у реальному UI

`window.confirm()` підходить для навчання.

У production часто роблять власний dialog:

    DeleteUserDialog

Наприклад:

    User
      ↓
    click Delete
      ↓
    Modal
      ↓
    "Ви впевнені?"
      ↓
    Cancel / Delete
      ↓
    DELETE

Це дає кращий UX.

---

# 40. Soft delete

Не завжди фізично видаляють запис із database.

Може використовуватися:

    soft delete

Наприклад:

    users

    id
    name
    email
    deleted_at

Після "видалення":

    UPDATE users
    SET deleted_at = NOW()
    WHERE id = 10;

Ресурс логічно видалений, але запис залишається в database.

---

# 41. Hard delete

Фізичне видалення:

    DELETE FROM users
    WHERE id = 10;

Запис реально видаляється з таблиці.

Це називається:

    hard delete

---

# 42. Soft delete vs hard delete

| Тип | Що відбувається |
|---|---|
| Soft delete | запис залишається |
| Hard delete | запис фізично видаляється |

Soft delete може бути корисним для:

- відновлення;
- аудиту;
- історії;
- юридичних вимог;
- захисту від випадкового видалення.

---

# 43. DELETE не гарантує фізичне видалення

Назва HTTP-методу:

    DELETE

описує намір API:

> ресурс більше не повинен бути доступним як активний ресурс.

Backend може реалізувати це як:

    DELETE FROM ...

або:

    UPDATE ... SET deleted_at = ...

Frontend зазвичай не повинен знати внутрішню реалізацію database.

---

# 44. DELETE та cascade

Якщо користувач має пов'язані записи:

    user
      ↓
    posts
      ↓
    comments

видалення user може бути складнішим.

Database може мати:

    ON DELETE CASCADE

або backend може сам виконувати потрібні операції.

Це вже частина backend/database design.

---

# 45. DELETE одного ресурсу

REST-style endpoint:

    DELETE /api/users/10

означає:

> Видалити user з id `10`.

---

# 46. DELETE ресурсу за slug

Наприклад:

    DELETE /api/posts/my-first-post

або:

    DELETE /api/articles/react-basics

Конкретний формат залежить від API.

---

# 47. DELETE і query parameters

Іноді API може мати:

    DELETE /api/users/10?force=true

Наприклад:

    force=true

може означати спеціальний режим видалення.

Але це залежить від API contract.

Не потрібно вигадувати формат endpoint на frontend.

---

# 48. DELETE і request body

Найчастіше:

    DELETE /api/users/10

без body.

Але технічно конкретний API може визначати body.

Наприклад:

    DELETE /api/users/10

    {
      "reason": "duplicate"
    }

Якщо backend цього вимагає:

    const response = await fetch(`/api/users/${userId}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        reason: "duplicate",
      }),
    });

Головне:

> Не придумувати формат самостійно — дотримуватися API contract.

---

# 49. DELETE і окрема API-функція

У більшому проєкті:

    // api/users.ts

    export async function deleteUser(
      userId: number
    ): Promise<void> {
      const response = await fetch(
        `/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error(
          "Не вдалося видалити користувача"
        );
      }
    }

Компонент:

    await deleteUser(user.id);

---

# 50. Перевага API-функції

Замість:

    Component
      ↓
    fetch()
      ↓
    API

можна:

    Component
      ↓
    deleteUser()
      ↓
    fetch()
      ↓
    API

Компонент стає простішим.

---

# 51. TypeScript API function

    type DeleteUserResult = {
      success: boolean;
    };

    async function deleteUser(
      userId: number
    ): Promise<void> {
      const response = await fetch(
        `/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }
    }

Якщо API повертає JSON:

    async function deleteUser(
      userId: number
    ): Promise<DeleteUserResult> {
      const response = await fetch(
        `/api/users/${userId}`,
        {
          method: "DELETE",
        }
      );

      if (!response.ok) {
        throw new Error("Delete failed");
      }

      return response.json();
    }

---

# 52. DELETE і список

Типовий сценарій:

    GET /api/users
          ↓
    users state
          ↓
    render list
          ↓
    click Delete
          ↓
    DELETE /api/users/:id
          ↓
    success
          ↓
    filter()
          ↓
    setUsers()
          ↓
    render list without deleted user

Це один із найважливіших CRUD-патернів у React.

---

# 53. Повний приклад CRUD-списку

    import { useState } from "react";

    type User = {
      id: number;
      name: string;
      email: string;
    };

    type Props = {
      initialUsers: User[];
    };

    export default function Users({
      initialUsers,
    }: Props) {
      const [users, setUsers] = useState<User[]>(initialUsers);

      const [deletingId, setDeletingId] =
        useState<number | null>(null);

      const [error, setError] =
        useState<string | null>(null);

      async function handleDelete(userId: number) {
        const confirmed = window.confirm(
          "Ви впевнені, що хочете видалити користувача?"
        );

        if (!confirmed) {
          return;
        }

        setDeletingId(userId);
        setError(null);

        try {
          const response = await fetch(
            `/api/users/${userId}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error(
              "Не вдалося видалити користувача"
            );
          }

          setUsers((currentUsers) =>
            currentUsers.filter(
              (user) => user.id !== userId
            )
          );
        } catch (error) {
          setError(
            error instanceof Error
              ? error.message
              : "Сталася невідома помилка"
          );
        } finally {
          setDeletingId(null);
        }
      }

      return (
        <section>
          <h2>Користувачі</h2>

          {error && (
            <p>{error}</p>
          )}

          <ul>
            {users.map((user) => (
              <li key={user.id}>
                <strong>{user.name}</strong>

                <span>
                  {user.email}
                </span>

                <button
                  type="button"
                  onClick={() => handleDelete(user.id)}
                  disabled={deletingId === user.id}
                >
                  {deletingId === user.id
                    ? "Видалення..."
                    : "Видалити"}
                </button>
              </li>
            ))}
          </ul>
        </section>
      );
    }

---

# 54. Чому key важливий

У списку:

    {users.map((user) => (
      <li key={user.id}>
        ...
      </li>
    ))}

потрібен стабільний `key`.

Правильно:

    key={user.id}

Не варто використовувати:

    key={Math.random()}

або без потреби:

    key={index}

Для CRUD-списків стабільний database id є хорошим варіантом.

---

# 55. DELETE і optimistic update

Можна зробити:

    click Delete
      ↓
    одразу remove з UI
      ↓
    DELETE request
      ↓
    success → залишити
      ↓
    error → повернути назад

Це:

    optimistic update

Перевага:

    UI дуже швидко реагує.

Недолік:

    потрібно правильно робити rollback.

Для базового CRUD краще спочатку навчитися простому варіанту:

    DELETE
      ↓
    success
      ↓
    setState

---

# 56. Простий optimistic update

До запиту:

    setUsers((currentUsers) =>
      currentUsers.filter(
        (user) => user.id !== userId
      )
    );

Потім:

    try {
      await deleteUser(userId);
    } catch {
      // rollback
    }

Але rollback потребує збереження попереднього стану.

Для початківця це зайва складність.

---

# 57. Race conditions

У складніших застосунках можливі ситуації:

    DELETE user 10
          ↓
    request A

і майже одночасно:

    GET users
          ↓
    request B

Якщо відповіді приходять у несподіваному порядку, UI може отримати застарілі дані.

Це називається:

    race condition

На базовому рівні достатньо розуміти, що асинхронні запити можуть завершуватися не в тому порядку, в якому були відправлені.

---

# 58. DELETE і повторний GET

Іноді після DELETE роблять:

    await deleteUser(userId);

    const users = await getUsers();

    setUsers(users);

Тобто:

    DELETE
      ↓
    GET
      ↓
    актуальний список

Перевага:

    UI точно синхронізується з сервером.

Недолік:

    додатковий HTTP-запит.

---

# 59. DELETE і локальне оновлення

Інший варіант:

    await deleteUser(userId);

    setUsers((currentUsers) =>
      currentUsers.filter(
        (user) => user.id !== userId
      )
    );

Перевага:

    не потрібен додатковий GET.

Недолік:

    frontend повинен бути впевнений, що серверний стан після DELETE відповідає очікуваному.

---

# 60. Що вибрати?

Для простого CRUD:

    DELETE
      ↓
    success
      ↓
    filter()
      ↓
    setUsers()

Для складнішого застосунку:

    DELETE
      ↓
    invalidate cache
      ↓
    refetch
      ↓
    актуальні data

Це вже наближається до використання data-fetching libraries.

---

# 61. DELETE та кеш

Якщо застосунок використовує кеш даних:

    users cache

після DELETE кеш може стати застарілим.

Наприклад:

    cache:
    User 1
    User 2
    User 3

Після:

    DELETE User 2

потрібно:

    invalidate users cache

або:

    update cache manually

Це важлива тема для React Query / TanStack Query та інших data-fetching libraries.

---

# 62. DELETE і custom hook

Пізніше логіку можна винести:

    function useDeleteUser() {
      const [isLoading, setIsLoading] =
        useState(false);

      const [error, setError] =
        useState<string | null>(null);

      async function deleteUser(userId: number) {
        setIsLoading(true);
        setError(null);

        try {
          const response = await fetch(
            `/api/users/${userId}`,
            {
              method: "DELETE",
            }
          );

          if (!response.ok) {
            throw new Error(
              "Не вдалося видалити користувача"
            );
          }
        } catch (error) {
          const message =
            error instanceof Error
              ? error.message
              : "Сталася невідома помилка";

          setError(message);

          throw error;
        } finally {
          setIsLoading(false);
        }
      }

      return {
        deleteUser,
        isLoading,
        error,
      };
    }

Це вже місток до:

    08-custom-data-fetching-hooks

---

# 63. DELETE у Next.js

Frontend:

    const response = await fetch(
      `/api/users/${user.id}`,
      {
        method: "DELETE",
      }
    );

Next.js Route Handler може обробляти:

    export async function DELETE(
      request: Request,
      { params }: { params: Promise<{ id: string }> }
    ) {
      const { id } = await params;

      // validation
      // authorization
      // database delete

      return new Response(null, {
        status: 204,
      });
    }

Конкретна реалізація залежить від архітектури та версії Next.js.

---

# 64. DELETE на backend

Умовний Express endpoint:

    app.delete("/api/users/:id", async (req, res) => {
      const { id } = req.params;

      // validation
      // authorization

      await deleteUser(id);

      res.status(204).send();
    });

React не повинен знати, що всередині:

    deleteUser()

відбувається:

    SQL
    PostgreSQL
    transaction
    soft delete
    hard delete

Frontend працює з API contract.

---

# 65. DELETE та PostgreSQL

Hard delete:

    DELETE FROM users
    WHERE id = $1;

У backend потрібно використовувати parameterized query.

Не потрібно будувати SQL через конкатенацію рядків.

Небезпечно:

    `DELETE FROM users WHERE id = ${id}`

Краще використовувати параметри драйвера/database library.

---

# 66. DELETE і authorization на backend

Небезпечно покладатися на:

    button hidden

або:

    disabled={...}

Frontend UI не є security boundary.

Користувач може напряму відправити:

    DELETE /api/users/10

Тому backend повинен перевірити:

    authenticated?
          ↓
    authorized?
          ↓
    can delete?
          ↓
    DELETE

---

# 67. UI permission ≠ security

Наприклад:

    {isAdmin && (
      <button>
        Видалити
      </button>
    )}

Це добре для UI.

Але цього недостатньо для security.

Backend все одно повинен перевірити:

    isAdmin

або відповідне permission.

---

# 68. Типова помилка №1 — забули method

Неправильно:

    fetch(`/api/users/${id}`);

Це:

    GET

Правильно:

    fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

---

# 69. Типова помилка №2 — видаляємо UI до response

Небажано без спеціальної optimistic strategy:

    setUsers((users) =>
      users.filter((user) => user.id !== userId)
    );

    await deleteUser(userId);

Якщо DELETE завершиться помилкою, UI вже покаже неправильний стан.

Краще:

    await deleteUser(userId);

    setUsers((users) =>
      users.filter((user) => user.id !== userId)
    );

---

# 70. Типова помилка №3 — не перевіряємо response.ok

Неправильно:

    await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    setUsers(...);

Так можна видалити елемент із UI навіть при:

    404
    403
    500

Правильно:

    const response = await fetch(...);

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    setUsers(...);

---

# 71. Типова помилка №4 — викликаємо response.json() після 204

Неправильно:

    const response = await fetch(...);

    if (!response.ok) {
      throw new Error("Delete failed");
    }

    const data = await response.json();

якщо сервер повернув:

    204 No Content

---

# 72. Типова помилка №5 — використовуємо any

Не варто:

    const data: any = await response.json();

Якщо JSON взагалі повертається, краще описати його тип:

    type DeleteResponse = {
      message: string;
    };

    const data: DeleteResponse =
      await response.json();

А якщо API повертає `204`, response body взагалі не потрібен.

---

# 73. Типова помилка №6 — використовуємо index як id

Наприклад:

    users.map((user, index) => (
      <button
        onClick={() => handleDelete(index)}
      >
        Delete
      </button>
    ))

Краще:

    users.map((user) => (
      <button
        onClick={() => handleDelete(user.id)}
      >
        Delete
      </button>
    ))

Database id — це id ресурсу.

Index — це позиція елемента в поточному масиві.

Це різні речі.

---

# 74. Типова помилка №7 — мутація state

Не варто:

    users.splice(index, 1);

    setUsers(users);

Краще:

    setUsers((currentUsers) =>
      currentUsers.filter(
        (user) => user.id !== userId
      )
    );

---

# 75. Типова помилка №8 — DELETE у useEffect

Небажано:

    useEffect(() => {
      deleteUser(userId);
    }, [userId]);

Краще:

    <button onClick={() => deleteUser(userId)}>
      Delete
    </button>

---

# 76. Типова помилка №9 — frontend security

Не потрібно думати:

    "Якщо кнопки Delete немає, користувач не зможе видалити."

Це неправда.

Користувач може напряму викликати API.

Security повинна бути на backend.

---

# 77. Типова помилка №10 — немає confirmation для небезпечної дії

Для критичних ресурсів:

    Delete

може бути незворотною операцією.

Тому часто потрібен confirmation dialog.

---

# 78. DELETE і accessibility

Кнопка повинна бути зрозумілою:

    <button type="button">
      Видалити
    </button>

Не варто використовувати тільки іконку без доступного тексту або `aria-label`.

Наприклад:

    <button
      type="button"
      aria-label={`Видалити ${user.name}`}
    >
      🗑
    </button>

---

# 79. DELETE і повідомлення користувачу

Після успішного видалення можна показати:

    "Користувача видалено."

Після помилки:

    "Не вдалося видалити користувача."

Не потрібно показувати користувачу технічну помилку database.

Наприклад, замість:

    PostgreSQL foreign key constraint violation

краще:

    "Не можна видалити цього користувача, оскільки він має пов'язані дані."

---

# 80. DELETE і disabled button

Базовий варіант:

    <button
      type="button"
      onClick={handleDelete}
      disabled={isLoading}
    >
      Видалити
    </button>

Кращий варіант для списку:

    <button
      type="button"
      onClick={() => handleDelete(user.id)}
      disabled={deletingId === user.id}
    >
      {deletingId === user.id
        ? "Видалення..."
        : "Видалити"}
    </button>

---

# 81. DELETE — мінімальний шаблон

    async function handleDelete(userId: number) {
      try {
        const response = await fetch(
          `/api/users/${userId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error("Delete failed");
        }

        setUsers((currentUsers) =>
          currentUsers.filter(
            (user) => user.id !== userId
          )
        );
      } catch (error) {
        console.error(error);
      }
    }

---

# 82. DELETE — production-like базовий шаблон

    async function handleDelete(userId: number) {
      const confirmed = window.confirm(
        "Видалити користувача?"
      );

      if (!confirmed) {
        return;
      }

      setDeletingId(userId);
      setError(null);

      try {
        const response = await fetch(
          `/api/users/${userId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(
            "Не вдалося видалити користувача"
          );
        }

        setUsers((currentUsers) =>
          currentUsers.filter(
            (user) => user.id !== userId
          )
        );
      } catch (error) {
        setError(
          error instanceof Error
            ? error.message
            : "Сталася невідома помилка"
        );
      } finally {
        setDeletingId(null);
      }
    }

---

# 83. Повна архітектура DELETE

    ┌────────────────────────┐
    │        React UI        │
    │                        │
    │   [ Видалити ]         │
    └───────────┬────────────┘
                │
                │ onClick
                ▼
    ┌────────────────────────┐
    │    handleDelete()      │
    │                        │
    │ confirmation           │
    │ loading                │
    └───────────┬────────────┘
                │
                │ fetch()
                ▼
    ┌────────────────────────┐
    │        API             │
    │                        │
    │ DELETE /users/:id      │
    └───────────┬────────────┘
                │
                ▼
    ┌────────────────────────┐
    │       Backend          │
    │                        │
    │ authentication         │
    │ authorization          │
    │ validation             │
    │ business logic         │
    └───────────┬────────────┘
                │
                ▼
    ┌────────────────────────┐
    │       Database         │
    │                        │
    │ DELETE / soft delete   │
    └───────────┬────────────┘
                │
                ▼
    ┌────────────────────────┐
    │       Response         │
    │                        │
    │ 204 / 200 / error      │
    └───────────┬────────────┘
                │
                ▼
    ┌────────────────────────┐
    │         React          │
    │                        │
    │ filter() → setUsers()  │
    └───────────┬────────────┘
                │
                ▼
    ┌────────────────────────┐
    │          UI            │
    │                        │
    │ resource disappeared   │
    └────────────────────────┘

---

# 84. DELETE у full-stack застосунку

Наприклад:

    React
      ↓
    handleDelete(user.id)
      ↓
    fetch()
      ↓
    DELETE /api/users/10
      ↓
    Express / NestJS / Next.js
      ↓
    authentication
      ↓
    authorization
      ↓
    validation
      ↓
    PostgreSQL
      ↓
    DELETE / soft delete
      ↓
    204 No Content
      ↓
    React
      ↓
    setUsers(filter(...))
      ↓
    UI

Це вже реальний full-stack CRUD flow.

---

# 85. Практичний навчальний проєкт

Для тренування можна створити:

    Users CRUD

API:

    GET     /api/users
    GET     /api/users/:id
    POST    /api/users
    PATCH   /api/users/:id
    DELETE  /api/users/:id

React-компоненти:

    UserList
    UserDetails
    CreateUserForm
    EditUserForm
    DeleteUserButton

---

# 86. Повний CRUD flow

    ┌───────────────┐
    │    CREATE     │
    │     POST      │
    └───────┬───────┘
            ↓
    ┌───────────────┐
    │     READ      │
    │      GET      │
    └───────┬───────┘
            ↓
    ┌───────────────┐
    │    UPDATE     │
    │ PUT / PATCH   │
    └───────┬───────┘
            ↓
    ┌───────────────┐
    │    DELETE     │
    │    DELETE     │
    └───────────────┘

---

# 87. Питання зі співбесіди

### 1. Для чого використовується DELETE?

Для видалення ресурсу.

---

### 2. Як виконати DELETE через fetch()?

    const response = await fetch("/api/users/10", {
      method: "DELETE",
    });

---

### 3. Чи потрібно використовувати body для DELETE?

Не обов'язково.

Найчастіше id ресурсу передається в URL:

    DELETE /api/users/10

Але конкретний API може мати власний контракт.

---

### 4. Чи кидає fetch() exception при 404?

Ні.

Потрібно перевірити:

    response.ok

---

### 5. Що може повернути успішний DELETE?

Наприклад:

    200 OK
    202 Accepted
    204 No Content

---

### 6. Що означає 204 No Content?

Операція успішна, але response body відсутній.

---

### 7. Що робити після успішного DELETE у React?

Наприклад:

    setUsers((users) =>
      users.filter(
        (user) => user.id !== deletedId
      )
    );

або повторно отримати актуальні дані з API.

---

### 8. Чому не можна просто зробити splice() у state?

Тому що React state потрібно оновлювати immutable способом.

---

### 9. Чому використовуємо filter()?

Тому що `filter()` створює новий масив без видаленого елемента.

---

### 10. Чому DELETE зазвичай запускається через onClick?

Тому що це mutation operation, яка повинна виконуватися як результат явної дії користувача.

---

### 11. Чи достатньо приховати Delete button для security?

Ні.

Backend повинен перевіряти authorization.

---

### 12. Що таке soft delete?

Ресурс логічно видаляється, але database record залишається.

---

### 13. Що таке hard delete?

Запис фізично видаляється з database.

---

### 14. Навіщо confirmation перед DELETE?

Щоб зменшити ризик випадкового видалення.

---

### 15. Чому потрібен loading state?

Щоб показати процес операції та запобігти повторним клікам.

---

# 88. Рівень Core

Потрібно знати:

- що таке HTTP;
- що таке DELETE;
- CRUD;
- `fetch()`;
- `method: "DELETE"`;
- `response.ok`;
- `async/await`;
- `try/catch`;
- `finally`;
- HTTP status codes;
- `204 No Content`;
- React state;
- immutable state update;
- `filter()`.

---

# 89. Рівень Junior

Потрібно вміти:

- створити Delete button;
- виконати DELETE через `fetch()`;
- передати id у URL;
- додати confirmation;
- показати loading;
- показати error;
- заблокувати кнопку під час запиту;
- видалити ресурс із локального state;
- працювати з `404`, `403`, `500`;
- типізувати API-функцію;
- винести DELETE у окрему функцію.

---

# 90. Рівень Middle

Потрібно розуміти:

- custom hooks;
- mutation state;
- cache invalidation;
- optimistic updates;
- rollback;
- authentication;
- authorization;
- CORS;
- soft delete;
- hard delete;
- database relations;
- cascade delete;
- race conditions;
- error handling;
- API contracts.

---

# 91. Рівень Senior

Потрібно розуміти систему повністю:

    React
      ↓
    API client
      ↓
    HTTP
      ↓
    authentication
      ↓
    authorization
      ↓
    validation
      ↓
    business logic
      ↓
    transaction
      ↓
    database
      ↓
    consistency
      ↓
    cache
      ↓
    UI

Додатково:

- concurrency;
- idempotency;
- retries;
- distributed systems;
- audit logs;
- soft-delete strategies;
- data retention;
- cascading relations;
- authorization models;
- observability;
- error monitoring.

---

# 92. Міні-шпаргалка

## Простий DELETE

    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

    if (!response.ok) {
      throw new Error("Delete failed");
    }

---

## DELETE + state

    await deleteUser(userId);

    setUsers((currentUsers) =>
      currentUsers.filter(
        (user) => user.id !== userId
      )
    );

---

## DELETE + loading

    setDeletingId(userId);

    try {
      await deleteUser(userId);
    } finally {
      setDeletingId(null);
    }

---

## DELETE + confirmation

    const confirmed = window.confirm(
      "Видалити користувача?"
    );

    if (!confirmed) {
      return;
    }

---

# 93. Найважливіший flow для запам'ятовування

    user clicks Delete
          ↓
    confirmation
          ↓
    setDeletingId(id)
          ↓
    fetch()
          ↓
    DELETE /api/resource/:id
          ↓
    response.ok?
       ↙       ↘
     no         yes
      ↓          ↓
    error      filter()
                 ↓
              setState()
                 ↓
                UI
          ↓
    setDeletingId(null)

---

# 94. Зв'язок із попередніми темами

У попередніх розділах:

    01-fetch
        ↓
    fetch()

    02-loading-and-error
        ↓
    loading / error

    03-get
        ↓
    отримання даних

    04-post
        ↓
    створення ресурсу

    05-put-and-patch
        ↓
    оновлення ресурсу

Тепер:

    06-delete
        ↓
    видалення ресурсу

Далі:

    07-async-data
        ↓
    системна робота з async data

    08-custom-data-fetching-hooks
        ↓
    винесення логіки у custom hooks

---

# 95. Головне

✔ `DELETE` використовується для видалення ресурсу.

✔ Типовий endpoint:

    DELETE /api/users/:id

✔ У React DELETE зазвичай запускається через:

    onClick
    onSubmit

✔ Базовий запит:

    const response = await fetch(`/api/users/${id}`, {
      method: "DELETE",
    });

✔ `fetch()` не кидає exception просто через `404` або `500`.

✔ Потрібно перевіряти:

    response.ok

✔ Успішний DELETE часто повертає:

    204 No Content

✔ Якщо response має `204`, не потрібно робити:

    response.json()

✔ Після успішного DELETE список можна оновити:

    setUsers((users) =>
      users.filter(
        (user) => user.id !== deletedId
      )
    );

✔ Не потрібно мутувати state через:

    users.splice(...)

✔ Для небезпечних операцій корисний confirmation.

✔ Під час запиту корисний:

    deletingId

або:

    isLoading

✔ Frontend UI не є security boundary.

✔ Backend повинен перевіряти:

    authentication
    authorization
    validation

✔ DELETE може реалізовуватися як:

    hard delete

або:

    soft delete

✔ У реальному full-stack застосунку:

    React
      ↓
    event handler
      ↓
    fetch()
      ↓
    DELETE
      ↓
    API
      ↓
    Backend
      ↓
    Database
      ↓
    Response
      ↓
    React state
      ↓
    UI

---

# 96. Ключова формула

Запам'ятай весь розділ однією схемою:

    DELETE = видалити ресурс

    fetch()
      ↓
    method: "DELETE"
      ↓
    response.ok
      ↓
    success
      ↓
    filter()
      ↓
    setState()
      ↓
    UI оновився

А для реального full-stack мислення:

    UI
      ↓
    action
      ↓
    HTTP DELETE
      ↓
    API
      ↓
    authentication
      ↓
    authorization
      ↓
    validation
      ↓
    database
      ↓
    success/error
      ↓
    React state
      ↓
    UI

Саме так `DELETE` стає останньою операцією базового CRUD у React.