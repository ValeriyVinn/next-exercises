# React Router — Query Parameters

> `react/09-react-router/05-query-parameters`

## Визначення

**Query parameters (параметри запиту)** — це параметри, які передаються в URL після символу `?` і використовуються для керування тим, **як отримати, відфільтрувати, відсортувати або відобразити дані**.

Наприклад:

    /products?page=2

    /products?category=books

    /products?search=react

    /products?sort=price&order=asc

У URL:

    /products?category=books&page=2

маємо:

    category = "books"
    page = "2"

На відміну від route parameters, query parameters **не є обов'язковою частиною шляху маршруту**.

---

# 1. Навіщо потрібні Query Parameters

Уявімо сторінку:

    /products

На ній є:

- пошук;
- фільтр;
- сортування;
- пагінація.

Можна було б зберігати все це тільки в React state:

    search
    category
    sort
    page

Але тоді URL не знає, що зараз вибрано.

Краще:

    /products?search=react&category=books&page=2

Тепер URL описує поточний стан сторінки.

Це дає можливість:

- оновити сторінку без втрати фільтрів;
- скопіювати URL;
- поділитися URL;
- додати URL у закладки;
- використовувати Back / Forward;
- відкрити конкретний стан сторінки напряму.

---

# 2. Ключові поняття

Основні поняття цієї теми:

1. Query parameter
2. Query string
3. Search params
4. `?`
5. `&`
6. `=`
7. `useSearchParams()`
8. `URLSearchParams`
9. `searchParams.get()`
10. `searchParams.set()`
11. `searchParams.delete()`
12. `searchParams.has()`
13. `setSearchParams()`
14. `useLocation()`
15. URL state
16. Filters
17. Sorting
18. Search
19. Pagination
20. Query parameter synchronization

---

# 3. Що таке Query String

Частина URL після:

    ?

називається **query string** або search/query parameters.

Наприклад:

    /products?category=books&page=2

Основна частина:

    /products

Query string:

    ?category=books&page=2

Параметри:

    category=books
    page=2

---

# 4. Структура Query Parameters

URL:

    /products?category=books&page=2

можна розкласти:

    /products
        ↓
    path

    ?
        ↓
    початок query string

    category=books
        ↓
    query parameter

    &
        ↓
    роздільник

    page=2
        ↓
    query parameter

---

# 5. Один Query Parameter

Найпростіший приклад:

    /products?page=2

Тут:

    page = "2"

Але важливо:

> Значення query parameters приходять із URL як рядки.

Тобто:

    "2"

а не:

    2

---

# 6. Кілька Query Parameters

Наприклад:

    /products?page=2&sort=price

Маємо:

    page = "2"
    sort = "price"

Ще один приклад:

    /products?category=books&sort=price&order=asc

Маємо:

    category = "books"
    sort = "price"
    order = "asc"

---

# 7. `?` і `&`

Для першого query parameter використовується:

    ?

Наприклад:

    /products?page=2

Для наступних параметрів:

    &

Наприклад:

    /products?page=2&sort=price

Схема:

    /products
            ?
            page=2
            &
            sort=price

---

# 8. Query Parameters vs Route Parameters

Це дуже важлива відмінність.

### Route parameter

    /users/42

Маршрут:

    /users/:userId

Параметр:

    userId = "42"

Зазвичай відповідає на питання:

> **Який саме ресурс?**

---

### Query parameter

    /users?page=2

Параметр:

    page = "2"

Зазвичай відповідає на питання:

> **Як показати або отримати ресурси?**

---

# 9. Порівняння

| Route Parameter | Query Parameter |
|---|---|
| `/users/42` | `/users?page=2` |
| `/products/15` | `/products?sort=price` |
| `/posts/react-router` | `/posts?search=react` |
| Частина path | Частина query string |
| `:id` | `?page=2` |
| Часто ідентифікує ресурс | Часто фільтрує/сортує/налаштовує |

---

# 10. Приклад із реального застосунку

Каталог:

    /products

Користувач вибрав:

    category = books

Пошук:

    search = react

Сортування:

    sort = price

Сторінка:

    page = 2

URL:

    /products?category=books&search=react&sort=price&page=2

Тепер URL повністю описує стан каталогу.

---

# 11. `useSearchParams()`

У React Router для роботи з query parameters дуже зручно використовувати:

    useSearchParams()

Імпорт:

    import { useSearchParams } from "react-router-dom";

Використання:

    const [searchParams, setSearchParams] =
      useSearchParams();

`searchParams` дозволяє читати query parameters.

`setSearchParams` дозволяє змінювати їх.

---

# 12. Простий приклад

URL:

    /products?page=2

Компонент:

    import { useSearchParams } from "react-router-dom";

    function ProductsPage() {
      const [searchParams] = useSearchParams();

      const page = searchParams.get("page");

      return <p>Page: {page}</p>;
    }

Результат:

    Page: 2

Але:

    page

має тип:

    string | null

---

# 13. `searchParams.get()`

Основний метод читання параметра:

    searchParams.get("name")

Наприклад:

    const page = searchParams.get("page");

    const search = searchParams.get("search");

    const sort = searchParams.get("sort");

Для URL:

    /products?page=2&search=react&sort=price

отримаємо:

    page = "2"
    search = "react"
    sort = "price"

---

# 14. Якщо параметра немає

Наприклад, URL:

    /products

Виконуємо:

    const page = searchParams.get("page");

Результат:

    null

Тому:

    searchParams.get("page")

може повернути:

    string

або:

    null

---

# 15. Перевірка параметра

Наприклад:

    const page = searchParams.get("page");

    if (page === null) {
      return <p>Page parameter is missing</p>;
    }

Тепер TypeScript знає, що після перевірки:

    page

є:

    string

---

# 16. Перетворення Query Parameter у Number

URL:

    /products?page=2

Отримуємо:

    const pageParam = searchParams.get("page");

Перетворюємо:

    const page = Number(pageParam);

Але потрібно пам'ятати про валідацію.

Наприклад:

    const pageParam = searchParams.get("page");

    const page = Number(pageParam);

    if (!Number.isInteger(page) || page < 1) {
      return <p>Invalid page</p>;
    }

---

# 17. Важливе правило

Query parameters:

    /products?page=2

не є:

    number

вони є:

    string

Тобто:

    "2"

Щоб отримати:

    2

потрібно явно перетворити значення.

---

# 18. `URLSearchParams`

`useSearchParams()` працює з об'єктом, сумісним із стандартним Web API:

    URLSearchParams

Наприклад:

    const params = new URLSearchParams();

    params.set("page", "2");
    params.set("sort", "price");

Результат:

    page=2&sort=price

---

# 19. Читання через `URLSearchParams`

Можна використовувати стандартний JavaScript API:

    const params = new URLSearchParams(
      "?page=2&sort=price"
    );

    const page = params.get("page");

    const sort = params.get("sort");

Результат:

    page = "2"
    sort = "price"

---

# 20. `useSearchParams()` і `URLSearchParams`

У React Router:

    const [searchParams, setSearchParams] =
      useSearchParams();

`searchParams` — це об'єкт для роботи з query string.

Наприклад:

    searchParams.get("page");

    searchParams.get("sort");

    searchParams.has("page");

    searchParams.delete("page");

---

# 21. `has()`

Метод:

    searchParams.has("page")

перевіряє, чи існує параметр.

Наприклад:

    /products?page=2

тоді:

    searchParams.has("page")

дасть:

    true

А для:

    /products

буде:

    false

---

# 22. `set()`

Метод:

    searchParams.set("page", "2");

встановлює значення параметра.

Наприклад:

    searchParams.set("sort", "price");

Отримаємо:

    sort=price

Важливо:

`set()` змінює об'єкт `URLSearchParams`.

Для зміни URL у React Router потрібно передати параметри через:

    setSearchParams(...)

---

# 23. `delete()`

Метод:

    searchParams.delete("page");

видаляє параметр.

Наприклад:

    /products?page=2&sort=price

після видалення `page`:

    /products?sort=price

---

# 24. `getAll()`

Іноді один параметр може зустрічатися декілька разів:

    /products?tag=react&tag=typescript

Тоді:

    searchParams.get("tag")

поверне перше значення.

Для отримання всіх:

    searchParams.getAll("tag");

Результат:

    ["react", "typescript"]

---

# 25. `entries()`

Можна отримати всі пари:

    for (const [key, value] of searchParams.entries()) {
      console.log(key, value);
    }

Для:

    /products?page=2&sort=price

отримаємо:

    page 2
    sort price

---

# 26. `keys()`

Можна отримати ключі:

    for (const key of searchParams.keys()) {
      console.log(key);
    }

Наприклад:

    page
    sort
    category

---

# 27. `values()`

Можна отримати значення:

    for (const value of searchParams.values()) {
      console.log(value);
    }

Наприклад:

    2
    price
    books

---

# 28. Встановлення Query Parameters

Другий елемент `useSearchParams()`:

    setSearchParams

дозволяє змінювати URL.

Наприклад:

    const [searchParams, setSearchParams] =
      useSearchParams();

    setSearchParams({
      page: "2",
    });

URL стане:

    ?page=2

---

# 29. Встановлення декількох параметрів

    setSearchParams({
      page: "2",
      sort: "price",
      category: "books",
    });

URL:

    ?page=2&sort=price&category=books

---

# 30. Простий Filter Example

    import { useSearchParams } from "react-router-dom";

    function ProductsPage() {
      const [searchParams, setSearchParams] =
        useSearchParams();

      const category =
        searchParams.get("category") ?? "all";

      const selectCategory = (
        event: React.ChangeEvent<HTMLSelectElement>
      ) => {
        setSearchParams({
          category: event.target.value,
        });
      };

      return (
        <div>
          <select
            value={category}
            onChange={selectCategory}
          >
            <option value="all">
              All
            </option>

            <option value="books">
              Books
            </option>

            <option value="electronics">
              Electronics
            </option>
          </select>
        </div>
      );
    }

---

# 31. Важливий нюанс `setSearchParams()`

Якщо виконати:

    setSearchParams({
      category: "books",
    });

це встановить новий набір search parameters.

Якщо потрібно зберегти вже існуючі параметри, краще працювати з поточними параметрами.

Наприклад:

    setSearchParams((currentParams) => {
      currentParams.set("category", "books");

      return currentParams;
    });

---

# 32. Зміна одного параметра зі збереженням інших

Припустимо:

    /products?page=2&sort=price

Хочемо змінити тільки:

    sort

на:

    name

Потрібно зберегти:

    page=2

Наприклад:

    setSearchParams((params) => {
      params.set("sort", "name");

      return params;
    });

Результат:

    /products?page=2&sort=name

---

# 33. Видалення одного параметра

Наприклад:

    /products?page=2&sort=price&category=books

Видаляємо:

    category

Код:

    setSearchParams((params) => {
      params.delete("category");

      return params;
    });

Результат:

    /products?page=2&sort=price

---

# 34. Reset Filters

Дуже поширена задача:

    Reset filters

Наприклад:

    /products?category=books&sort=price&page=3

Кнопка:

    <button onClick={resetFilters}>
      Reset
    </button>

Функція:

    const resetFilters = () => {
      setSearchParams({});
    };

Результат:

    /products

---

# 35. Search Input + Query Parameter

Це один із найпрактичніших сценаріїв.

URL:

    /products?search=react

Input повинен показувати:

    react

Код:

    function SearchPage() {
      const [searchParams, setSearchParams] =
        useSearchParams();

      const search =
        searchParams.get("search") ?? "";

      const handleChange = (
        event: React.ChangeEvent<HTMLInputElement>
      ) => {
        setSearchParams({
          search: event.target.value,
        });
      };

      return (
        <input
          value={search}
          onChange={handleChange}
          placeholder="Search..."
        />
      );
    }

---

# 36. Що відбувається

Користувач вводить:

    react

URL:

    /products?search=react

Вводить:

    react router

URL:

    /products?search=react+router

Таким чином input і URL синхронізовані.

---

# 37. URL як Source of Truth

У такому сценарії можна розглядати URL як:

    Source of Truth

Тобто:

    URL
      ↓
    searchParams
      ↓
    React UI

А не:

    React state
      ↓
    URL

із двома незалежними значеннями.

Це часто спрощує архітектуру.

---

# 38. Query Parameters vs React State

### React state

    const [search, setSearch] =
      useState("");

### Query parameter

    /products?search=react

Якщо пошуковий запит є частиною стану сторінки, який потрібно:

- зберігати;
- передавати;
- bookmark;
- share;
- відновлювати після reload;

query parameter часто є кращим рішенням.

---

# 39. Коли використовувати React State

Не кожне значення потрібно записувати в URL.

Наприклад:

    modalIsOpen

або:

    isSidebarExpanded

часто логічніше залишити в React state.

URL:

    /products?search=react

має сенс.

URL:

    /products?sidebarOpen=true

часто не має сенсу.

---

# 40. Хороше правило

Запитай себе:

> "Чи повинен цей стан бути частиною адреси сторінки?"

Якщо так:

    Query Parameter

Якщо ні:

    React State

Наприклад:

    search → URL

    category → URL

    sort → URL

    page → URL

А:

    modalOpen → state

    dropdownOpen → state

    sidebarExpanded → state

---

# 41. Пошук

Наприклад:

    /products?search=laptop

Зчитування:

    const search =
      searchParams.get("search") ?? "";

Потім:

    fetch(`/api/products?search=${search}`);

---

# 42. Фільтрація

Наприклад:

    /products?category=books

Отримуємо:

    const category =
      searchParams.get("category");

Backend request:

    /api/products?category=books

---

# 43. Сортування

Наприклад:

    /products?sort=price

або:

    /products?sort=name

Можна мати:

    /products?sort=price&order=asc

---

# 44. Пагінація

Наприклад:

    /products?page=3

Отримуємо:

    const pageParam =
      searchParams.get("page");

Перетворюємо:

    const page = Number(pageParam) || 1;

Тепер:

    page = 3

можна використати для завантаження даних.

---

# 45. Search + Filter + Sort + Pagination

Реальний URL:

    /products
      ?search=react
      &category=books
      &sort=price
      &order=asc
      &page=2

В одному рядку:

    /products?search=react&category=books&sort=price&order=asc&page=2

Це типовий приклад використання query parameters.

---

# 46. Повний приклад Catalog Page

    import {
      useSearchParams,
    } from "react-router-dom";

    function ProductsPage() {
      const [
        searchParams,
        setSearchParams,
      ] = useSearchParams();

      const search =
        searchParams.get("search") ?? "";

      const category =
        searchParams.get("category") ?? "all";

      const sort =
        searchParams.get("sort") ?? "name";

      const pageParam =
        searchParams.get("page") ?? "1";

      const page = Number(pageParam);

      const updateSearch = (
        value: string
      ) => {
        setSearchParams((params) => {
          if (value) {
            params.set("search", value);
          } else {
            params.delete("search");
          }

          params.set("page", "1");

          return params;
        });
      };

      return (
        <div>
          <input
            value={search}
            onChange={(event) =>
              updateSearch(event.target.value)
            }
            placeholder="Search products"
          />

          <p>
            Category: {category}
          </p>

          <p>
            Sort: {sort}
          </p>

          <p>
            Page: {page}
          </p>
        </div>
      );
    }

---

# 47. Чому при зміні filter часто треба скидати page

Уявімо:

    /products?category=books&page=10

Користувач змінює category:

    electronics

Якщо залишити:

    page=10

може вийти:

    /products?category=electronics&page=10

А на сторінці 10 може не бути товарів.

Тому часто при зміні:

- search;
- category;
- filter;

потрібно робити:

    page = 1

Наприклад:

    setSearchParams((params) => {
      params.set("category", "electronics");
      params.set("page", "1");

      return params;
    });

---

# 48. Query Parameters + API

URL frontend:

    /products?search=react&page=2

React:

    const search =
      searchParams.get("search");

    const page =
      searchParams.get("page");

Backend request:

    fetch(
      `/api/products?search=${encodeURIComponent(search ?? "")}&page=${page ?? "1"}`
    );

Backend отримує:

    search = react
    page = 2

---

# 49. Не забуваємо про URL encoding

Якщо query parameter містить:

    react router

його потрібно правильно закодувати.

Наприклад:

    encodeURIComponent("react router")

дасть закодоване значення.

Браузер та `URLSearchParams` допомагають правильно працювати з encoding.

---

# 50. Чому краще `URLSearchParams`

Замість ручного складання:

    const url =
      `/products?search=${search}&page=${page}`;

можна використовувати:

    const params = new URLSearchParams();

    params.set("search", search);
    params.set("page", String(page));

    const url =
      `/products?${params.toString()}`;

Це безпечніше та зручніше для складніших query strings.

---

# 51. Приклад побудови API URL

    const params = new URLSearchParams();

    params.set("search", "react");
    params.set("category", "books");
    params.set("page", "2");

    const url =
      `/api/products?${params.toString()}`;

Результат:

    /api/products?search=react&category=books&page=2

---

# 52. `useSearchParams()` vs `useLocation()`

Для роботи саме з query parameters найзручніший:

    useSearchParams()

А:

    useLocation()

дає інформацію про поточний location.

Наприклад:

    import { useLocation } from "react-router-dom";

    function Page() {
      const location = useLocation();

      console.log(location);
    }

---

# 53. Що містить `location`

Для URL:

    /products?page=2

`location` містить інформацію на кшталт:

    {
      pathname: "/products",
      search: "?page=2",
      hash: ""
    }

Нас найбільше цікавить:

    location.search

---

# 54. Читання query через `useLocation()`

Можна зробити:

    const location = useLocation();

    const searchParams =
      new URLSearchParams(location.search);

    const page =
      searchParams.get("page");

Це працює.

Але якщо основна задача — query parameters, часто простіше:

    const [searchParams] =
      useSearchParams();

---

# 55. Коли корисний `useLocation()`

`useLocation()` зручний, коли потрібно працювати з усім location:

    pathname
    search
    hash
    state

Наприклад:

    const location = useLocation();

    console.log(location.pathname);
    console.log(location.search);
    console.log(location.hash);

---

# 56. Query Parameters і `useNavigate()`

Можна змінювати query parameters через `navigate()`.

Наприклад:

    const navigate = useNavigate();

    navigate("/products?page=2");

Але для систематичної роботи з query parameters часто зручніше:

    useSearchParams()

---

# 57. `Link` із Query Parameters

Можна створити:

    <Link to="/products?page=2">
      Page 2
    </Link>

Або:

    <Link to="/products?category=books">
      Books
    </Link>

---

# 58. `NavLink` із Query Parameters

Можна використовувати:

    <NavLink to="/products?category=books">
      Books
    </NavLink>

Але для складних filter controls зазвичай зручніше використовувати:

    useSearchParams()

---

# 59. Query Parameters і Browser History

Коли виконуємо:

    setSearchParams({
      page: "2",
    });

URL змінюється.

Потім:

    setSearchParams({
      page: "3",
    });

URL:

    /products?page=3

Back:

    /products?page=2

Ще Back:

    /products

Це дозволяє browser history зберігати зміни URL.

---

# 60. `replace` і history

Іноді не хочеться додавати кожну маленьку зміну в browser history.

Наприклад, користувач вводить:

    r
    re
    rea
    reac
    react

Якщо кожна зміна створює окремий history entry, кнопка Back стане незручною.

У таких випадках може бути корисним оновлення URL через replace-поведінку.

Наприклад:

    setSearchParams(
      {
        search: value,
      },
      {
        replace: true,
      }
    );

Тоді поточний history entry замінюється.

---

# 61. Коли `replace: true` корисний

Часто для:

- live search;
- дрібних filter changes;
- UI state, який синхронізується з URL;
- значень, які не повинні створювати окрему history entry.

Наприклад:

    /products?search=r
    /products?search=re
    /products?search=rea
    /products?search=react

можуть бути замінами одного history entry.

---

# 62. Коли не варто використовувати `replace`

Якщо зміна є значущою навігаційною дією:

    page 1 → page 2

може бути бажано, щоб Back повернув:

    page 2 → page 1

Тому `replace` потрібно використовувати усвідомлено.

---

# 63. Query Parameters і debounce

Live search може створювати багато змін:

    r
    re
    rea
    reac
    react

Для API-запитів часто використовують **debounce**.

Схема:

    user typing
         ↓
    debounce
         ↓
    update URL
         ↓
    fetch API
         ↓
    results

Це вже поєднання routing + state + data fetching.

---

# 64. Query Parameters і filters

Наприклад:

    /products?category=books&priceMin=10&priceMax=50

Отримуємо:

    const category =
      searchParams.get("category");

    const priceMin =
      searchParams.get("priceMin");

    const priceMax =
      searchParams.get("priceMax");

Після валідації:

    category = "books"
    priceMin = 10
    priceMax = 50

---

# 65. Boolean Query Parameters

Іноді потрібно передати boolean:

    /products?available=true

Але значення:

    "true"

все одно є string.

Не можна просто очікувати:

    true

Потрібно:

    const available =
      searchParams.get("available") === "true";

Тепер:

    available

має значення:

    true

або:

    false

---

# 66. Number Query Parameters

Наприклад:

    /products?page=2

Потрібно:

    const page =
      Number(searchParams.get("page"));

Але краще перевірити:

    const pageParam =
      searchParams.get("page");

    const page = Number(pageParam);

    if (!Number.isInteger(page) || page < 1) {
      return <p>Invalid page</p>;
    }

---

# 67. Enum-like Query Parameters

Наприклад:

    /products?sort=price

Дозволені значення:

    name
    price
    rating

Не потрібно безумовно довіряти URL:

    /products?sort=hello

Краще перевірити:

    const sort =
      searchParams.get("sort");

    const allowedSorts = [
      "name",
      "price",
      "rating",
    ] as const;

    if (
      sort &&
      !allowedSorts.includes(
        sort as typeof allowedSorts[number]
      )
    ) {
      return <p>Invalid sort option</p>;
    }

У реальному TypeScript-коді перевірку можна винести в окрему функцію або schema validation.

---

# 68. Query Parameters як зовнішній input

URL:

    /products?page=abc

або:

    /products?sort=unknown

може створити користувач вручну.

Тому query parameters потрібно розглядати як:

> **untrusted input**

Тобто їх потрібно:

- перевіряти;
- нормалізувати;
- перетворювати;
- обробляти помилки.

---

# 69. Нормалізація Query Parameters

Наприклад:

    page = "abc"

можна перетворити на default:

    page = 1

Приклад:

    const rawPage =
      searchParams.get("page");

    const parsedPage =
      Number(rawPage);

    const page =
      Number.isInteger(parsedPage) &&
      parsedPage > 0
        ? parsedPage
        : 1;

---

# 70. Default Values

Дуже поширена практика:

    const search =
      searchParams.get("search") ?? "";

    const category =
      searchParams.get("category") ?? "all";

    const sort =
      searchParams.get("sort") ?? "name";

    const pageParam =
      searchParams.get("page") ?? "1";

Тоді URL:

    /products

автоматично означає:

    search = ""
    category = "all"
    sort = "name"
    page = 1

---

# 71. Не обов'язково записувати default values у URL

Наприклад, замість:

    /products?category=all&page=1&sort=name

можна використовувати:

    /products

і в коді вважати:

    category = "all"
    page = 1
    sort = "name"

Це часто робить URL чистішим.

---

# 72. Canonical Query URL

Бажано, щоб однаковий стан сторінки не мав десятків різних URL.

Наприклад:

    /products

і:

    /products?page=1

можуть означати те саме.

Потрібно продумати, який URL є canonical.

Для великих застосунків це важливо для:

- UX;
- SEO;
- caching;
- sharing;
- analytics.

---

# 73. Query Parameters і URL encoding

Спеціальні символи повинні бути правильно закодовані.

Наприклад:

    search = "react router"

може перетворитися на:

    search=react+router

А спеціальні символи:

    &
    ?
    =
    %

потребують коректного encoding.

Саме тому краще використовувати:

    URLSearchParams

а не вручну конкатенувати складні query strings.

---

# 74. Array Query Parameters

Можна передавати список:

    /products?tag=react&tag=typescript

Отримання:

    const tags =
      searchParams.getAll("tag");

Результат:

    [
      "react",
      "typescript"
    ]

---

# 75. Інший формат масиву

Іноді API використовує:

    /products?tags=react,typescript

Тоді:

    const tagsParam =
      searchParams.get("tags") ?? "";

    const tags =
      tagsParam
        .split(",")
        .filter(Boolean);

Результат:

    [
      "react",
      "typescript"
    ]

Це вже питання домовленості між frontend і backend.

---

# 76. Query Parameters і REST API

Frontend URL:

    /products?category=books&page=2

може відповідати API:

    GET /api/products?category=books&page=2

Backend отримує:

    category = books
    page = 2

Потім може виконати:

    SELECT *
    FROM products
    WHERE category = 'books'
    LIMIT ...
    OFFSET ...;

Таким чином query parameters дуже часто проходять через весь Full Stack.

---

# 77. URL → API

Типовий ланцюг:

    Browser URL
         ↓
    React Router
         ↓
    useSearchParams()
         ↓
    query values
         ↓
    fetch()
         ↓
    Backend
         ↓
    Database
         ↓
    JSON
         ↓
    React UI

Наприклад:

    /products?category=books&page=2

    ↓

    category = "books"
    page = 2

    ↓

    GET /api/products?category=books&page=2

    ↓

    PostgreSQL

    ↓

    products

    ↓

    React

---

# 78. Query Parameters і Next.js

У React Router використовується:

    useSearchParams()

У Next.js App Router є інший API:

    useSearchParams()

з:

    next/navigation

Тобто концепція однакова:

> Query parameters — це частина URL state.

Але конкретний API залежить від routing system.

У цій папці:

    09-react-router

ми вивчаємо саме React Router.

---

# 79. Query Parameters і Forms

Query parameters дуже добре працюють із формами пошуку.

Наприклад:

    <form>
      <input />
      <select />
      <button>
        Search
      </button>
    </form>

Після submit:

    /products?search=react&category=books

Тепер результат пошуку можна:

- bookmark;
- share;
- reload;
- відкрити напряму.

---

# 80. Практичний Search Form

    import {
      Form,
      useSearchParams,
    } from "react-router-dom";

    function SearchForm() {
      const [searchParams] =
        useSearchParams();

      const search =
        searchParams.get("search") ?? "";

      return (
        <Form method="get">
          <input
            name="search"
            defaultValue={search}
            placeholder="Search..."
          />

          <button type="submit">
            Search
          </button>
        </Form>
      );
    }

При submit URL може стати:

    /products?search=react

Це особливо корисний pattern для router-based forms.

---

# 81. Query Parameters і `<Form method="get">`

GET form природно відповідає query parameters.

Наприклад:

    <Form method="get">
      <input name="search" />
      <select name="category">
        ...
      </select>

      <button type="submit">
        Search
      </button>
    </Form>

Після submit:

    /products?search=react&category=books

---

# 82. Чому GET Form зручний

Він дозволяє браузеру та router працювати з URL як із результатом пошуку.

Наприклад:

    search
    filter
    sort
    page

стають частиною URL.

Це природний підхід для сторінок пошуку та фільтрації.

---

# 83. Query Parameters і `useEffect`

Якщо дані потрібно завантажувати при зміні query parameters:

    function ProductsPage() {
      const [searchParams] =
        useSearchParams();

      const search =
        searchParams.get("search") ?? "";

      useEffect(() => {
        loadProducts(search);
      }, [search]);

      ...
    }

Коли URL змінюється:

    /products?search=react

на:

    /products?search=typescript

змінюється:

    search

і effect запускається знову.

---

# 84. Query Parameters як Dependency

Якщо effect залежить від:

    search
    category
    sort
    page

вони повинні враховуватися в dependency array.

Наприклад:

    useEffect(() => {
      loadProducts({
        search,
        category,
        sort,
        page,
      });
    }, [
      search,
      category,
      sort,
      page,
    ]);

---

# 85. Практичний Catalog Flow

Користувач відкриває:

    /products

↓

React отримує default values:

    search = ""
    category = "all"
    sort = "name"
    page = 1

↓

Користувач вибирає:

    category = books

↓

URL:

    /products?category=books

↓

React читає:

    category = "books"

↓

API:

    /api/products?category=books

↓

Backend:

    PostgreSQL

↓

Результати:

    books

---

# 86. Filter + Pagination Flow

Початково:

    /products?page=1

Користувач переходить:

    /products?page=2

React завантажує:

    page 2

Користувач вибирає:

    category=books

URL:

    /products?page=1&category=books

Page повертається до:

    1

бо filter змінив набір результатів.

---

# 87. Query Parameters і Back Button

Наприклад:

    /products
        ↓
    /products?category=books
        ↓
    /products?category=books&page=2
        ↓
    /products?category=books&page=3

Back дозволяє повернутися через ці стани.

Це значно покращує UX складних каталогів.

---

# 88. Query Parameters і Deep Linking

Deep linking означає можливість одразу відкрити конкретний стан сторінки.

Наприклад:

    /products?search=react&category=books&page=2

Користувач може:

- вставити URL;
- відкрити його;
- передати іншій людині.

Застосунок повинен відновити той самий стан.

---

# 89. Query Parameters і Bookmark

Користувач може додати:

    /products?category=books&sort=price

у закладки.

Після наступного відкриття:

    category = books
    sort = price

Тому query parameters особливо корисні для search/filter pages.

---

# 90. Query Parameters і SEO

Для публічних сайтів query parameters можуть впливати на SEO.

Наприклад:

    /products?category=books

і:

    /products?category=electronics

можуть бути різними станами одного каталогу.

Для SEO важливо продумати:

- canonical URL;
- indexability;
- duplicate content;
- filtering URLs;
- pagination.

У навчальному React Router проекті це не головна тема, але на production-рівні її потрібно враховувати.

---

# 91. Типова помилка №1 — очікувати number

Погано:

    const page =
      searchParams.get("page");

    page + 1

Якщо:

    page = "2"

отримаємо не:

    3

а проблему з типами/логікою.

Краще:

    const page =
      Number(searchParams.get("page"));

---

# 92. Типова помилка №2 — не обробляти `null`

Погано:

    const search =
      searchParams.get("search");

    search.toLowerCase();

Тому що:

    search

може бути:

    null

Краще:

    const search =
      searchParams.get("search") ?? "";

    search.toLowerCase();

---

# 93. Типова помилка №3 — довіряти URL

URL:

    /products?page=abc

не гарантує:

    page = valid number

Потрібна валідація.

---

# 94. Типова помилка №4 — втрачати інші parameters

Було:

    /products?page=2&sort=price

Потрібно змінити:

    sort=name

Погано:

    setSearchParams({
      sort: "name",
    });

Якщо логіка компонента повинна зберегти `page`, потрібно змінювати існуючі параметри.

Краще:

    setSearchParams((params) => {
      params.set("sort", "name");

      return params;
    });

---

# 95. Типова помилка №5 — записувати весь UI state в URL

Не потрібно робити:

    /products?
      modal=true&
      sidebar=true&
      dropdown=true&
      tooltip=true

URL повинен містити стан, який має значення для адреси сторінки.

---

# 96. Типова помилка №6 — вручну конкатенувати складні URL

Погано:

    const url =
      `/products?search=${search}&category=${category}&page=${page}`;

Це легко зламати encoding.

Краще використовувати:

    URLSearchParams

---

# 97. Типова помилка №7 — створювати надто багато history entries

При live search:

    r
    re
    rea
    reac
    react

може створитися багато history entries.

Для такого UI може бути корисним:

    replace: true

і/або:

    debounce

---

# 98. Типова помилка №8 — не скидати pagination

Було:

    /products?category=books&page=10

Після зміни category:

    /products?category=electronics&page=10

Це може показати порожній результат.

Часто краще:

    /products?category=electronics&page=1

---

# 99. Типова помилка №9 — змішувати URL state і state без потреби

Погано мати одночасно:

    const [search, setSearch] =
      useState("");

і:

    searchParams.get("search")

як два незалежні джерела істини.

Це може призвести до розсинхронізації.

---

# 100. Типова помилка №10 — не визначити формат API

Frontend:

    /products?sort=price

Backend повинен чітко знати:

    sort=price

означає:

    ORDER BY price

Так само повинні бути визначені:

    page
    limit
    search
    category
    order

Query parameter contract між frontend і backend повинен бути зрозумілим.

---

# 101. Практична TypeScript модель

Для складного каталогу можна описати параметри:

    type ProductQuery = {
      search: string;
      category: string;
      sort: "name" | "price" | "rating";
      page: number;
    };

Потім створити функцію:

    function parseProductQuery(
      searchParams: URLSearchParams
    ): ProductQuery {
      const search =
        searchParams.get("search") ?? "";

      const category =
        searchParams.get("category") ?? "all";

      const rawSort =
        searchParams.get("sort") ?? "name";

      const rawPage =
        Number(
          searchParams.get("page") ?? "1"
        );

      const sort =
        rawSort === "price" ||
        rawSort === "rating"
          ? rawSort
          : "name";

      const page =
        Number.isInteger(rawPage) &&
        rawPage > 0
          ? rawPage
          : 1;

      return {
        search,
        category,
        sort,
        page,
      };
    }

---

# 102. Навіщо парсити Query Parameters окремо

Без parser логіка може розповзтися по компоненту:

    searchParams.get(...)
    searchParams.get(...)
    Number(...)
    validation
    defaults
    ...

Краще:

    URL
     ↓
    parseProductQuery()
     ↓
    ProductQuery
     ↓
    UI / API

Це робить код чистішим.

---

# 103. Query Parameters Parser

Можна винести:

    function parseProductQuery(
      params: URLSearchParams
    ) {
      ...
    }

Тоді:

    const query =
      parseProductQuery(searchParams);

І:

    query.search
    query.category
    query.sort
    query.page

стають нормалізованими даними.

---

# 104. Query Parameters Builder

Можна зробити і зворотну функцію:

    function createProductSearchParams(
      query: ProductQuery
    ) {
      const params =
        new URLSearchParams();

      if (query.search) {
        params.set(
          "search",
          query.search
        );
      }

      if (query.category !== "all") {
        params.set(
          "category",
          query.category
        );
      }

      params.set(
        "sort",
        query.sort
      );

      params.set(
        "page",
        String(query.page)
      );

      return params;
    }

---

# 105. Архітектурна модель

Для складного каталогу:

    URL
     ↓
    URLSearchParams
     ↓
    parse
     ↓
    normalized query
     ↓
    ┌───────────────┐
    ↓               ↓
    UI              API
                    ↓
                 Backend
                    ↓
                 Database

Це значно краще масштабується, ніж хаотична робота з URL.

---

# 106. Query Parameters і data fetching

Query parameters дуже добре поєднуються з:

- `fetch`;
- React Query / TanStack Query;
- SWR;
- server-side data fetching;
- REST API;
- GraphQL variables.

Наприклад:

    queryKey = [
      "products",
      {
        search,
        category,
        sort,
        page,
      },
    ]

Тоді зміна URL автоматично може приводити до зміни data query.

---

# 107. Query Parameters як Cache Key

Наприклад:

    /products?search=react&page=1

може відповідати:

    ["products", "react", 1]

А:

    /products?search=react&page=2

:

    ["products", "react", 2]

Це дуже корисно для caching.

---

# 108. Query Parameters у Full Stack застосунку

Типова архітектура:

    Browser
       ↓
    /products?search=react&page=2
       ↓
    React Router
       ↓
    useSearchParams()
       ↓
    search = "react"
    page = 2
       ↓
    API
       ↓
    GET /api/products?search=react&page=2
       ↓
    Express / NestJS
       ↓
    PostgreSQL
       ↓
    SELECT ...
       ↓
    JSON
       ↓
    React
       ↓
    ProductList

---

# 109. Приклад із PostgreSQL

URL:

    /products?category=books&page=2

Backend отримує:

    category = "books"
    page = 2

Умовно:

    SELECT *
    FROM products
    WHERE category = 'books'
    ORDER BY id
    LIMIT 20
    OFFSET 20;

Результат:

    JSON

Frontend:

    ProductList

---

# 110. Query Parameters і pagination

Поширена схема:

    page
    limit

Наприклад:

    /products?page=3&limit=20

Backend:

    page = 3
    limit = 20

Offset:

    (page - 1) * limit

Для:

    page = 3
    limit = 20

отримаємо:

    offset = 40

---

# 111. Query Parameters і sorting

Наприклад:

    /products?sort=price&order=desc

Backend отримує:

    sort = price
    order = desc

і може сформувати відповідний SQL query.

Але важливо:

> Значення, які приходять із URL, не можна бездумно вставляти в SQL.

Для sorting потрібно використовувати whitelist дозволених полів.

---

# 112. Безпечна логіка сортування

Наприклад, дозволено:

    name
    price
    rating

А користувач передає:

    sort=password

Backend не повинен просто вставити це значення в SQL.

Потрібна перевірка:

    allowedSortFields

Тобто:

    URL → validation → database query

а не:

    URL → SQL

---

# 113. Query Parameters і filters у реальному проекті

Наприклад:

    /courses
      ?search=javascript
      &level=beginner
      &sort=rating
      &page=2

Це дуже природний URL для LMS.

React:

    searchParams

Backend:

    query parameters

Database:

    WHERE
    ORDER BY
    LIMIT
    OFFSET

---

# 114. Практичний LMS приклад

URL:

    /courses?subject=computer-science&grade=8&page=2

Параметри:

    subject = "computer-science"
    grade = "8"
    page = "2"

React:

    const subject =
      searchParams.get("subject");

    const grade =
      searchParams.get("grade");

    const page =
      Number(
        searchParams.get("page") ?? "1"
      );

API:

    /api/courses?subject=computer-science&grade=8&page=2

---

# 115. Query Parameters і навігаційна архітектура

У React Router можна умовно розділити:

### Path

Визначає:

    де ми знаходимося

Наприклад:

    /courses/8

### Query

Визначає:

    як ми дивимося на ресурс

Наприклад:

    ?sort=rating&page=2

Тому:

    /courses/8?sort=rating&page=2

можна прочитати як:

> "Ми знаходимося на курсі 8 і переглядаємо його дані з параметрами сортування/пагінації."

---

# 116. Route + Query

Вони чудово комбінуються:

    /courses/:courseId

та:

    ?page=2&sort=name

Наприклад:

    /courses/8?sort=rating&page=2

Тут:

    courseId = "8"

і:

    sort = "rating"
    page = "2"

Отримання:

    const { courseId } = useParams();

    const [searchParams] =
      useSearchParams();

---

# 117. Повний приклад Route + Query

    function CoursePage() {
      const { courseId } =
        useParams<{
          courseId: string;
        }>();

      const [searchParams] =
        useSearchParams();

      const sort =
        searchParams.get("sort") ?? "name";

      const page =
        Number(
          searchParams.get("page") ?? "1"
        );

      return (
        <div>
          <h1>
            Course: {courseId}
          </h1>

          <p>
            Sort: {sort}
          </p>

          <p>
            Page: {page}
          </p>
        </div>
      );
    }

Для:

    /courses/8?sort=rating&page=2

отримаємо:

    courseId = "8"
    sort = "rating"
    page = 2

---

# 118. Query Parameters і Nested Routes

Query parameters працюють разом із nested routes.

Наприклад:

    /courses/8/lessons?sort=number&page=2

Route:

    /courses/:courseId/lessons

Query:

    sort=number
    page=2

Тобто:

    route hierarchy
         +
    query state

---

# 119. Що не потрібно робити

Не потрібно перетворювати URL на складне сховище всього стану застосунку:

    ?modal=true
    &sidebar=true
    &theme=dark
    &animation=true
    &temporaryMessage=hello

URL повинен залишатися зрозумілим і корисним.

---

# 120. Хороші Query Parameters

Хороші приклади:

    ?search=react

    ?category=books

    ?sort=price

    ?order=asc

    ?page=2

    ?limit=20

    ?from=2026-01-01

    ?to=2026-01-31

Вони описують:

- пошук;
- фільтрацію;
- сортування;
- pagination;
- діапазони;
- спосіб представлення даних.

---

# 121. Query Parameters — Core Level

На базовому рівні потрібно знати:

- що таке query parameter;
- що таке query string;
- `?`;
- `&`;
- `=`;
- `useSearchParams()`;
- `searchParams.get()`;
- `setSearchParams()`;
- що значення є string;
- `null`, якщо параметра немає.

Мінімальний приклад:

    const [searchParams] =
      useSearchParams();

    const page =
      searchParams.get("page");

---

# 122. Query Parameters — Junior Level

На Junior рівні потрібно вміти:

- працювати з search;
- працювати з filters;
- працювати з sorting;
- працювати з pagination;
- змінювати parameters;
- видаляти parameters;
- зберігати існуючі parameters;
- використовувати `URLSearchParams`;
- працювати з TypeScript;
- валідовувати URL input;
- синхронізувати URL і UI.

---

# 123. Query Parameters — Middle Level

На Middle рівні потрібно розуміти:

- URL state;
- history behavior;
- `replace`;
- debounce;
- deep linking;
- API contracts;
- query parsing;
- query normalization;
- caching;
- pagination;
- filter architecture;
- canonical URLs;
- URL encoding;
- frontend/backend query contracts.

---

# 124. Query Parameters — Senior Level

На Senior рівні потрібно думати про:

- URL architecture;
- API design;
- resource identification;
- canonical URLs;
- SEO;
- caching;
- browser history;
- shareable state;
- backward compatibility;
- validation;
- security;
- database query construction;
- scalable filter systems;
- pagination strategy;
- frontend/backend contracts.

---

# 125. Питання для співбесіди

### 1. Що таке query parameter?

Параметр після `?` у URL, який використовується для передачі додаткових параметрів запиту.

---

### 2. Як виглядає query parameter?

Наприклад:

    /products?page=2

де:

    page=2

є query parameter.

---

### 3. Як отримати query parameter у React Router?

За допомогою:

    useSearchParams()

---

### 4. Який тип повертає `searchParams.get()`?

    string | null

---

### 5. Чому `page` — це string?

Тому що URL є текстовим представленням даних.

---

### 6. Як отримати number?

Наприклад:

    const page =
      Number(
        searchParams.get("page")
      );

Після цього значення потрібно перевірити.

---

### 7. Чим query parameter відрізняється від route parameter?

Route parameter:

    /users/:userId

Query parameter:

    /users?page=2

Route parameter часто ідентифікує ресурс.

Query parameter часто керує способом отримання/відображення ресурсів.

---

### 8. Для чого потрібні query parameters?

Для:

- search;
- filters;
- sorting;
- pagination;
- date ranges;
- options.

---

### 9. Чому query parameters корисні?

Тому що вони роблять стан сторінки:

- shareable;
- bookmarkable;
- reload-safe;
- accessible через URL;
- інтегрованим із browser history.

---

### 10. Коли краще використати state?

Коли значення є локальним UI state і не повинно бути частиною URL.

---

### 11. Для чого потрібен `replace`?

Щоб змінити URL без створення нового history entry.

---

### 12. Чому потрібно валідовувати query parameters?

Тому що користувач може вручну змінити URL.

Наприклад:

    ?page=abc

або:

    ?sort=unknown

---

### 13. Як отримати всі значення одного параметра?

Через:

    searchParams.getAll("tag");

---

### 14. Як видалити параметр?

Через:

    searchParams.delete("page");

і оновлення через:

    setSearchParams(...)

---

### 15. Як зберегти інші query parameters?

Працювати з поточним `URLSearchParams`:

    setSearchParams((params) => {
      params.set("sort", "price");

      return params;
    });

---

# 126. Міні-шпаргалка

## Import

    import {
      useSearchParams,
    } from "react-router-dom";

## Read

    const [searchParams] =
      useSearchParams();

## Get

    const search =
      searchParams.get("search");

## Get number

    const page =
      Number(
        searchParams.get("page") ?? "1"
      );

## Check

    searchParams.has("page");

## Set

    setSearchParams({
      page: "2",
    });

## Set multiple

    setSearchParams({
      page: "2",
      sort: "price",
    });

## Update existing

    setSearchParams((params) => {
      params.set("sort", "price");

      return params;
    });

## Delete

    setSearchParams((params) => {
      params.delete("sort");

      return params;
    });

## Get all

    searchParams.getAll("tag");

## Reset

    setSearchParams({});

## Replace

    setSearchParams(
      {
        search: value,
      },
      {
        replace: true,
      }
    );

---

# 127. Головна практична схема

Запам'ятай:

    /products?search=react&page=2
                │             │
                │             └── page
                └── search

↓

    useSearchParams()

↓

    search = "react"
    page = "2"

↓

    validation / parsing

↓

    search = "react"
    page = 2

↓

    API request

    /api/products?search=react&page=2

↓

    Backend

↓

    Database

↓

    Results

↓

    React UI

---

# 128. Головна модель URL State

Query parameters дозволяють зберігати в URL стан, який має бути доступним через адресу:

    Search
    Filter
    Sort
    Pagination

Наприклад:

    /products
      ?search=react
      &category=books
      &sort=price
      &order=asc
      &page=2

Це означає:

    search = react
    category = books
    sort = price
    order = asc
    page = 2

---

# 129. Головне

> **Query parameters — це частина URL після `?`, яка дозволяє передавати додаткові параметри для пошуку, фільтрації, сортування, pagination та інших способів роботи з ресурсами.**

Найважливіший React Router API:

    const [
      searchParams,
      setSearchParams,
    ] = useSearchParams();

Читання:

    const page =
      searchParams.get("page");

Зміна:

    setSearchParams({
      page: "2",
    });

Видалення:

    setSearchParams((params) => {
      params.delete("page");

      return params;
    });

Збереження інших параметрів:

    setSearchParams((params) => {
      params.set("sort", "price");

      return params;
    });

Головна Full Stack схема:

    URL
     ↓
    Query Parameters
     ↓
    useSearchParams()
     ↓
    Parsing / Validation
     ↓
    React State / UI
     ↓
    API Request
     ↓
    Backend
     ↓
    Database
     ↓
    Results
     ↓
    React UI

А головна практична ідея:

> **Якщо стан сторінки повинен бути частиною адреси, ним часто варто керувати через Query Parameters, а не тільки через React state.**

Для Full Stack застосунків особливо важливі:

    search
    filter
    sort
    order
    page
    limit

бо вони природно проходять через весь ланцюг:

    React Router
        ↓
    Frontend
        ↓
    REST API
        ↓
    Backend
        ↓
    PostgreSQL
        ↓
    React UI