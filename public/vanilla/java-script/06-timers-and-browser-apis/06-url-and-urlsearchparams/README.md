# 06. URL та URLSearchParams

> **URL API** — стандартний JavaScript API для створення, розбору та зміни URL.  
> **URLSearchParams** — API для зручної роботи з query-параметрами URL.

Ці API особливо важливі у frontend і full-stack розробці, тому що URL часто містить стан сторінки:

- пошуковий запит;
- фільтри;
- сортування;
- пагінацію;
- ID ресурсу;
- параметри API-запиту;
- параметри навігації.

---

## 1. Що таке URL

URL — **Uniform Resource Locator**, адреса ресурсу в мережі.

Наприклад:

    https://example.com/products?page=2&category=books#reviews

URL можна умовно розділити:

    https://example.com/products?page=2&category=books#reviews
    │     │           │                      │
    │     │           │                      └── hash
    │     │           └── query string
    │     └── pathname
    └── protocol + host

Основні частини:

    https://
    example.com
    /products
    ?page=2&category=books
    #reviews

---

# 2. Навіщо потрібен URL API

Замість ручного розбору рядків:

    const url = "https://example.com/products?page=2";

можна використовувати:

    const url = new URL("https://example.com/products?page=2");

Тепер JavaScript розуміє структуру URL і дозволяє звертатися до окремих частин:

    console.log(url.protocol);
    console.log(url.hostname);
    console.log(url.pathname);
    console.log(url.search);

---

# 3. Створення URL

Основний синтаксис:

    const url = new URL("https://example.com/products");

Приклад:

    const url = new URL("https://example.com/products?page=2");

    console.log(url);

`URL` — це об'єкт, а не просто рядок.

---

# 4. Основні властивості URL

Розглянемо:

    const url = new URL(
      "https://user:password@example.com:8080/products/books?page=2&sort=price#reviews"
    );

## protocol

Протокол:

    console.log(url.protocol);
    // "https:"

---

## username

Ім'я користувача:

    console.log(url.username);
    // "user"

---

## password

Пароль:

    console.log(url.password);
    // "password"

> Не використовуйте паролі та інші секрети в URL реальних застосунків.

---

## hostname

Ім'я хоста без порту:

    console.log(url.hostname);
    // "example.com"

---

## port

Порт:

    console.log(url.port);
    // "8080"

Для стандартного HTTPS-порту:

    const url = new URL("https://example.com");

    console.log(url.port);
    // ""

---

## host

Hostname + port:

    console.log(url.host);
    // "example.com:8080"

---

## origin

Протокол + hostname + port:

    console.log(url.origin);
    // "https://example.com:8080"

---

## pathname

Шлях:

    console.log(url.pathname);
    // "/products/books"

---

## search

Query string разом із `?`:

    console.log(url.search);
    // "?page=2&sort=price"

---

## hash

Фрагмент після `#`:

    console.log(url.hash);
    // "#reviews"

---

## href

Повний URL:

    console.log(url.href);

---

# 5. Таблиця властивостей URL

Для:

    const url = new URL(
      "https://example.com:8080/products?page=2&sort=price#reviews"
    );

маємо:

| Властивість | Результат |
|---|---|
| `href` | повний URL |
| `origin` | `https://example.com:8080` |
| `protocol` | `https:` |
| `hostname` | `example.com` |
| `host` | `example.com:8080` |
| `port` | `8080` |
| `pathname` | `/products` |
| `search` | `?page=2&sort=price` |
| `hash` | `#reviews` |

---

# 6. URL як об'єкт

URL можна змінювати.

    const url = new URL("https://example.com/products");

    url.pathname = "/users";

    console.log(url.href);
    // https://example.com/users

Це важлива особливість:

> URL — не просто інформація для читання. Його можна програмно змінювати.

---

# 7. Зміна query-параметрів через URLSearchParams

У URL є спеціальна властивість:

    url.searchParams

Наприклад:

    const url = new URL("https://example.com/products");

    url.searchParams.set("page", "2");

    console.log(url.href);
    // https://example.com/products?page=2

---

# 8. Що таке URLSearchParams

`URLSearchParams` призначений для роботи з query-параметрами.

Наприклад:

    ?page=2&category=books&sort=price

можна представити як набір:

    page     → 2
    category → books
    sort     → price

---

# 9. Створення URLSearchParams

Можна передати рядок:

    const params = new URLSearchParams(
      "page=2&category=books"
    );

Або використати об'єкт URL:

    const url = new URL(
      "https://example.com/products?page=2&category=books"
    );

    const params = url.searchParams;

---

# 10. get()

Отримати значення параметра:

    const params = new URLSearchParams(
      "page=2&category=books"
    );

    console.log(params.get("page"));
    // "2"

    console.log(params.get("category"));
    // "books"

Якщо параметра немає:

    console.log(params.get("sort"));
    // null

---

# 11. URLSearchParams повертає рядки

Це важливо.

    const params = new URLSearchParams("page=2");

    const page = params.get("page");

    console.log(page);
    // "2"

    console.log(typeof page);
    // "string"

Якщо потрібне число:

    const page = Number(params.get("page"));

---

# 12. set()

Встановити параметр.

    const params = new URLSearchParams();

    params.set("page", "2");

    console.log(params.toString());
    // page=2

Якщо параметр вже існує — значення буде замінено:

    const params = new URLSearchParams("page=1");

    params.set("page", "2");

    console.log(params.toString());
    // page=2

---

# 13. append()

Додати параметр.

    const params = new URLSearchParams();

    params.append("category", "books");
    params.append("category", "movies");

    console.log(params.toString());
    // category=books&category=movies

На відміну від `set()`:

- `set()` замінює існуюче значення;
- `append()` додає ще одне.

---

# 14. get() та getAll()

Якщо параметр повторюється:

    const params = new URLSearchParams(
      "tag=javascript&tag=node&tag=postgresql"
    );

    console.log(params.get("tag"));
    // "javascript"

`get()` повертає перше значення.

Щоб отримати всі:

    console.log(params.getAll("tag"));
    // ["javascript", "node", "postgresql"]

---

# 15. has()

Перевірити наявність параметра:

    const params = new URLSearchParams(
      "page=2&sort=price"
    );

    console.log(params.has("page"));
    // true

    console.log(params.has("category"));
    // false

---

# 16. delete()

Видалити параметр:

    const params = new URLSearchParams(
      "page=2&sort=price&category=books"
    );

    params.delete("sort");

    console.log(params.toString());
    // page=2&category=books

Якщо параметр повторюється, `delete()` видалить усі його значення.

---

# 17. sort()

Відсортувати параметри за ключами:

    const params = new URLSearchParams(
      "sort=price&page=2&category=books"
    );

    params.sort();

    console.log(params.toString());
    // category=books&page=2&sort=price

`sort()` змінює сам об'єкт.

---

# 18. toString()

Перетворити параметри у query string:

    const params = new URLSearchParams();

    params.set("page", "2");
    params.set("sort", "price");

    console.log(params.toString());
    // page=2&sort=price

Зверніть увагу:

    params.toString();

повертає:

    page=2&sort=price

а не:

    ?page=2&sort=price

---

# 19. entries()

Отримати пари `key/value`:

    const params = new URLSearchParams(
      "page=2&sort=price"
    );

    for (const [key, value] of params.entries()) {
      console.log(key, value);
    }

Результат:

    page 2
    sort price

---

# 20. keys()

Отримати ключі:

    const params = new URLSearchParams(
      "page=2&sort=price"
    );

    for (const key of params.keys()) {
      console.log(key);
    }

Результат:

    page
    sort

---

# 21. values()

Отримати значення:

    const params = new URLSearchParams(
      "page=2&sort=price"
    );

    for (const value of params.values()) {
      console.log(value);
    }

Результат:

    2
    price

---

# 22. forEach()

Перебрати параметри:

    const params = new URLSearchParams(
      "page=2&sort=price"
    );

    params.forEach((value, key) => {
      console.log(key, value);
    });

---

# 23. Основні методи URLSearchParams

| Метод | Призначення |
|---|---|
| `get()` | отримати перше значення |
| `getAll()` | отримати всі значення |
| `set()` | встановити / замінити |
| `append()` | додати значення |
| `has()` | перевірити наявність |
| `delete()` | видалити |
| `sort()` | відсортувати |
| `toString()` | отримати query string |
| `entries()` | отримати key/value |
| `keys()` | отримати ключі |
| `values()` | отримати значення |
| `forEach()` | перебрати параметри |

---

# 24. URL + URLSearchParams разом

Найзручніший варіант:

    const url = new URL(
      "https://example.com/products"
    );

    url.searchParams.set("page", "2");
    url.searchParams.set("sort", "price");

    console.log(url.href);

Результат:

    https://example.com/products?page=2&sort=price

---

# 25. Додавання декількох параметрів

    const url = new URL(
      "https://example.com/products"
    );

    url.searchParams.set("page", "2");
    url.searchParams.set("limit", "20");
    url.searchParams.set("category", "books");
    url.searchParams.set("sort", "price");

    console.log(url.href);

Результат:

    https://example.com/products?page=2&limit=20&category=books&sort=price

---

# 26. Читання параметрів із URL

Припустимо:

    const url = new URL(
      "https://example.com/products?page=2&category=books"
    );

Отримуємо:

    const page = url.searchParams.get("page");
    const category = url.searchParams.get("category");

    console.log(page);
    // "2"

    console.log(category);
    // "books"

---

# 27. Пагінація

URL:

    https://example.com/products?page=3&limit=20

JavaScript:

    const url = new URL(
      "https://example.com/products?page=3&limit=20"
    );

    const page = Number(url.searchParams.get("page"));
    const limit = Number(url.searchParams.get("limit"));

    console.log(page);
    // 3

    console.log(limit);
    // 20

Це типовий frontend → backend сценарій.

---

# 28. Пошук

URL:

    https://example.com/products?search=laptop

JavaScript:

    const url = new URL(
      "https://example.com/products?search=laptop"
    );

    const search = url.searchParams.get("search");

    console.log(search);
    // "laptop"

Backend може отримати:

    search = "laptop"

і виконати пошук у базі даних.

---

# 29. Фільтрація

Наприклад:

    https://example.com/products?category=books&minPrice=100&maxPrice=500

Отримуємо:

    const url = new URL(
      "https://example.com/products?category=books&minPrice=100&maxPrice=500"
    );

    const category = url.searchParams.get("category");
    const minPrice = Number(url.searchParams.get("minPrice"));
    const maxPrice = Number(url.searchParams.get("maxPrice"));

---

# 30. Сортування

URL:

    https://example.com/products?sort=price&order=asc

JavaScript:

    const url = new URL(
      "https://example.com/products?sort=price&order=asc"
    );

    const sort = url.searchParams.get("sort");
    const order = url.searchParams.get("order");

---

# 31. Побудова URL для fetch()

URL можна створити програмно:

    const url = new URL(
      "https://api.example.com/products"
    );

    url.searchParams.set("page", "2");
    url.searchParams.set("limit", "20");

    fetch(url);

Результатний URL:

    https://api.example.com/products?page=2&limit=20

Це набагато надійніше, ніж вручну складати рядок:

    "https://api.example.com/products?page=" + page + "&limit=" + limit

---

# 32. Практичний fetch

    const url = new URL(
      "https://api.example.com/products"
    );

    url.searchParams.set("search", "laptop");
    url.searchParams.set("page", "2");

    const response = await fetch(url);

    const data = await response.json();

Тут відбувається:

    UI
      ↓
    створення URL
      ↓
    query parameters
      ↓
    fetch()
      ↓
    API
      ↓
    backend
      ↓
    database

---

# 33. URLSearchParams з об'єкта

Можна створити параметри з об'єкта:

    const params = new URLSearchParams({
      page: "2",
      limit: "20",
      sort: "price"
    });

    console.log(params.toString());

Результат:

    page=2&limit=20&sort=price

---

# 34. Об'єкт → URL

    const params = new URLSearchParams({
      search: "javascript",
      page: "2"
    });

    const url = new URL(
      "https://example.com/search"
    );

    url.search = params;

    console.log(url.href);

Результат:

    https://example.com/search?search=javascript&page=2

---

# 35. URL → URLSearchParams

    const url = new URL(
      "https://example.com/products?page=2&sort=price"
    );

    const params = url.searchParams;

    console.log(params.get("page"));
    // "2"

    console.log(params.get("sort"));
    // "price"

---

# 36. Відносні URL

`URL` може працювати з відносним шляхом, якщо передати базовий URL.

    const url = new URL(
      "/products",
      "https://example.com"
    );

    console.log(url.href);

Результат:

    https://example.com/products

---

# 37. Відносний URL із pathname

    const url = new URL(
      "../users",
      "https://example.com/products/books/"
    );

    console.log(url.href);

Результат:

    https://example.com/products/users

Базовий URL дозволяє браузеру правильно вирішити відносний шлях.

---

# 38. URL у браузері

У браузері поточний URL доступний через:

    window.location

Наприклад:

    console.log(window.location.href);

Можна також використовувати:

    location.href

---

# 39. Основні властивості location

    console.log(location.href);
    console.log(location.origin);
    console.log(location.protocol);
    console.log(location.hostname);
    console.log(location.port);
    console.log(location.pathname);
    console.log(location.search);
    console.log(location.hash);

Це схоже на `URL`.

---

# 40. Поточні query-параметри

Наприклад, сторінка:

    https://example.com/products?page=2&sort=price

Можна отримати:

    const params = new URLSearchParams(
      window.location.search
    );

    const page = params.get("page");
    const sort = params.get("sort");

    console.log(page);
    // "2"

    console.log(sort);
    // "price"

---

# 41. Чому краще URLSearchParams, а не split()

Не варто вручну робити:

    const query = location.search.substring(1);

    const parts = query.split("&");

А потім самостійно розбирати:

    key=value

Для цього вже існує:

    const params = new URLSearchParams(
      location.search
    );

    const page = params.get("page");

Це простіше, зрозуміліше та надійніше.

---

# 42. Кодування URL

URL має спеціальні символи.

Наприклад:

    const params = new URLSearchParams();

    params.set("search", "hello world");

    console.log(params.toString());

Результат буде закодований:

    search=hello+world

URLSearchParams автоматично займається необхідним encoding.

---

# 43. Спеціальні символи

Наприклад:

    const params = new URLSearchParams();

    params.set("search", "JavaScript & TypeScript");

    console.log(params.toString());

Результат буде URL-safe представленням значення.

При читанні:

    params.get("search");

отримаємо назад:

    "JavaScript & TypeScript"

---

# 44. encodeURIComponent()

Для окремого значення URL існує:

    encodeURIComponent()

Наприклад:

    const value = "JavaScript & TypeScript";

    const encoded = encodeURIComponent(value);

    console.log(encoded);

Це корисно, коли потрібно вручну закодувати окрему частину URL.

---

# 45. URLSearchParams vs encodeURIComponent

`URLSearchParams`:

    const params = new URLSearchParams();

    params.set("search", "hello world");

    const query = params.toString();

Зручно для побудови query string.

`encodeURIComponent()`:

    const value = encodeURIComponent("hello world");

Зручно для кодування окремого значення.

У сучасному коді для query-параметрів зазвичай зручніше використовувати `URLSearchParams`.

---

# 46. Query parameters — це стан сторінки

URL:

    /products?page=2&category=books&sort=price

можна сприймати як опис стану:

    page     → 2
    category → books
    sort     → price

Це дає важливі переваги:

- сторінку можна оновити;
- URL можна скопіювати;
- URL можна відправити іншій людині;
- браузер може зберігати URL в історії;
- стан можна відновити після перезавантаження.

---

# 47. URL як частина frontend state

Наприклад:

    /products?search=laptop&page=2&sort=price

Frontend може отримати:

    const params = new URLSearchParams(location.search);

    const search = params.get("search");
    const page = Number(params.get("page"));
    const sort = params.get("sort");

Тобто URL стає одним із джерел стану застосунку.

---

# 48. Зміна URL без ручного складання рядка

Погано:

    const url =
      "/products?page=" +
      page +
      "&sort=" +
      sort +
      "&category=" +
      category;

Краще:

    const url = new URL(
      "/products",
      window.location.origin
    );

    url.searchParams.set("page", String(page));
    url.searchParams.set("sort", sort);
    url.searchParams.set("category", category);

---

# 49. Видалення необов'язкового параметра

Наприклад:

    const url = new URL(
      "https://example.com/products?page=2&sort=price"
    );

Якщо сортування більше не потрібне:

    url.searchParams.delete("sort");

Результат:

    https://example.com/products?page=2

---

# 50. Умовне додавання параметрів

Це дуже поширений патерн:

    const url = new URL(
      "https://api.example.com/products"
    );

    if (search) {
      url.searchParams.set("search", search);
    }

    if (page) {
      url.searchParams.set("page", String(page));
    }

    if (sort) {
      url.searchParams.set("sort", sort);
    }

Так можна будувати API-запит залежно від стану UI.

---

# 51. Порожні значення

Будьте уважні:

    params.set("search", "");

це не те саме, що:

    params.delete("search");

Перше створить:

    ?search=

Друге повністю видалить параметр.

---

# 52. Значення boolean

URLSearchParams працює зі строками.

Наприклад:

    params.set("available", true);

Фактично буде:

    available=true

При читанні:

    const value = params.get("available");

отримаємо:

    "true"

Якщо потрібен boolean:

    const available = value === "true";

---

# 53. Значення number

Наприклад:

    params.set("page", 2);

При читанні:

    const page = params.get("page");

це:

    "2"

Для числа:

    const pageNumber = Number(page);

---

# 54. Масиви

Можна використовувати повторювані параметри:

    const params = new URLSearchParams();

    params.append("tag", "javascript");
    params.append("tag", "node");
    params.append("tag", "postgresql");

Результат:

    tag=javascript&tag=node&tag=postgresql

Отримуємо:

    const tags = params.getAll("tag");

Результат:

    ["javascript", "node", "postgresql"]

---

# 55. URL для API-фільтра

Практичний приклад:

    const url = new URL(
      "https://api.example.com/products"
    );

    url.searchParams.set("category", "books");
    url.searchParams.set("minPrice", "100");
    url.searchParams.set("maxPrice", "500");
    url.searchParams.set("page", "2");

    const response = await fetch(url);
    const products = await response.json();

Це типовий full-stack сценарій.

---

# 56. URL + Node.js / Express

Frontend:

    const url = new URL(
      "http://localhost:3000/products"
    );

    url.searchParams.set("category", "books");
    url.searchParams.set("page", "2");

    const response = await fetch(url);

Backend Express може отримати:

    req.query.category
    req.query.page

Наприклад:

    app.get("/products", (req, res) => {
      const category = req.query.category;
      const page = req.query.page;

      res.json({
        category,
        page
      });
    });

---

# 57. Full-stack flow

Типовий потік:

    User
      ↓
    UI
      ↓
    URLSearchParams
      ↓
    URL
      ↓
    fetch()
      ↓
    Node.js / Express / NestJS
      ↓
    req.query
      ↓
    PostgreSQL
      ↓
    JSON
      ↓
    Frontend
      ↓
    UI

Наприклад:

    /products?category=books&page=2

Backend отримує:

    category = "books"
    page = "2"

і може перетворити їх у параметри SQL-запиту.

---

# 58. URL і PostgreSQL

Важливо розділяти:

    URL parameter
          ↓
    backend parameter
          ↓
    validated value
          ↓
    SQL parameter

Не потрібно просто вставляти `req.query` у SQL-рядок.

Неправильно:

    const sql = `
      SELECT *
      FROM products
      WHERE category = '${req.query.category}'
    `;

Потрібно використовувати параметризовані SQL-запити.

Наприклад концептуально:

    SELECT *
    FROM products
    WHERE category = $1;

а значення передавати окремо.

---

# 59. URL не є місцем для секретів

Не кладіть у query string:

    ?password=123456

    ?token=secret

    ?apiKey=secret

    ?databasePassword=secret

URL може потрапити:

- в історію браузера;
- у логи;
- у скріншоти;
- у закладки;
- у referrer;
- у системи аналітики;
- у повідомлення та документи.

Тому:

> Query parameters підходять для стану та параметрів запиту, але не для секретів.

---

# 60. Не плутати URL і authentication token

Наприклад:

    /products?page=2

це звичайний параметр.

А:

    Authorization: Bearer ...

— це credential для авторизації.

Не потрібно автоматично переносити токени авторизації в URL.

Для authentication часто використовують:

- secure HTTP-only cookies;
- authorization headers;
- access/refresh token architecture.

Конкретна схема залежить від архітектури застосунку.

---

# 61. URL та History API

У SPA іноді потрібно змінити URL без повного перезавантаження сторінки.

Для цього існують:

    history.pushState()

    history.replaceState()

Наприклад:

    const url = new URL(window.location.href);

    url.searchParams.set("page", "2");

    history.pushState({}, "", url);

URL зміниться, але сторінка не буде повністю перезавантажена.

---

# 62. pushState() vs replaceState()

`pushState()` створює новий запис в історії:

    history.pushState({}, "", url);

Користувач може натиснути Back і повернутися до попереднього URL.

`replaceState()` замінює поточний запис:

    history.replaceState({}, "", url);

Це корисно, коли не потрібно створювати новий крок історії.

---

# 63. Приклад: пагінація

При переході:

    page=1

на:

    page=2

можна зробити:

    const url = new URL(window.location.href);

    url.searchParams.set("page", "2");

    history.pushState({}, "", url);

Після цього URL:

    /products?page=2

але браузер не перезавантажує документ.

---

# 64. URL у React / Next.js

У React/Next.js URL часто використовується для:

- search;
- filters;
- sorting;
- pagination;
- dynamic routes.

Наприклад:

    /products?search=laptop&page=2

У frontend:

    const params = new URLSearchParams(window.location.search);

    const search = params.get("search");
    const page = params.get("page");

У Next.js для навігації та читання search params існують власні routing APIs, тому в реальному Next.js-застосунку потрібно враховувати конкретний router і Server/Client Component.

Головний принцип залишається тим самим:

    URL
      ↓
    search params
      ↓
    application state

---

# 65. URLSearchParams не змінює URL автоматично

Наприклад:

    const url = new URL(
      "https://example.com/products?page=1"
    );

    const params = url.searchParams;

    params.set("page", "2");

Оскільки `params` належить цьому URL, результат URL буде:

    https://example.com/products?page=2

Але якщо створити окремий об'єкт:

    const params = new URLSearchParams(
      "page=1"
    );

    params.set("page", "2");

це ще не змінює якийсь інший URL.

---

# 66. URLSearchParams — не звичайний Object

Не потрібно робити:

    params.page

Це не працює так, як для звичайного об'єкта.

Замість:

    params.page

використовуйте:

    params.get("page")

Замість:

    params.page = "2"

використовуйте:

    params.set("page", "2")

---

# 67. Поширена помилка: забути, що значення — string

    const params = new URLSearchParams(
      "page=10"
    );

    const page = params.get("page");

    console.log(page + 1);

Результат:

    "101"

Правильно:

    const page = Number(params.get("page"));

    console.log(page + 1);
    // 11

---

# 68. Поширена помилка: get() замість getAll()

URL:

    ?tag=js&tag=node&tag=react

Неправильно очікувати:

    params.get("tag");

як масив.

`get()` поверне:

    "js"

Для всіх значень:

    params.getAll("tag");

отримаємо:

    ["js", "node", "react"]

---

# 69. Поширена помилка: set() замість append()

    const params = new URLSearchParams();

    params.set("tag", "js");
    params.set("tag", "node");

Результат:

    tag=node

Тому що другий `set()` замінив перший.

Якщо потрібні декілька значень:

    params.append("tag", "js");
    params.append("tag", "node");

Результат:

    tag=js&tag=node

---

# 70. Поширена помилка: ручне складання query string

Не варто:

    const url =
      "/products?page=" +
      page +
      "&search=" +
      search +
      "&sort=" +
      sort;

Краще:

    const url = new URL(
      "/products",
      window.location.origin
    );

    url.searchParams.set("page", String(page));
    url.searchParams.set("search", search);
    url.searchParams.set("sort", sort);

---

# 71. Поширена помилка: плутати search і searchParams

    url.search

повертає:

    ?page=2&sort=price

А:

    url.searchParams

повертає об'єкт `URLSearchParams`.

Наприклад:

    url.searchParams.get("page");

повертає:

    "2"

---

# 72. Поширена помилка: плутати pathname і search

URL:

    https://example.com/products?page=2

`pathname`:

    /products

`search`:

    ?page=2

Отже:

    url.pathname
    // "/products"

    url.search
    // "?page=2"

---

# 73. Поширена помилка: плутати hostname і host

Для:

    https://example.com:8080/products

маємо:

    hostname
    // example.com

    host
    // example.com:8080

`host` включає порт.

---

# 74. Практичний приклад: search form

HTML:

    <form id="search-form">
      <input id="search" type="search">
      <button type="submit">Search</button>
    </form>

JavaScript:

    const form = document.querySelector("#search-form");
    const input = document.querySelector("#search");

    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const url = new URL(window.location.href);

      url.searchParams.set("search", input.value);

      window.location.href = url.href;
    });

Після пошуку:

    /products?search=laptop

---

# 75. Практичний приклад: filter

    const url = new URL(window.location.href);

    url.searchParams.set("category", "books");
    url.searchParams.set("sort", "price");

    console.log(url.href);

Отримуємо:

    /products?category=books&sort=price

---

# 76. Практичний приклад: reset filters

    const url = new URL(window.location.href);

    url.searchParams.delete("category");
    url.searchParams.delete("sort");
    url.searchParams.delete("minPrice");
    url.searchParams.delete("maxPrice");

    console.log(url.href);

Це простий механізм кнопки:

    Reset filters

---

# 77. Практичний приклад: pagination

    function createPageUrl(page) {
      const url = new URL(window.location.href);

      url.searchParams.set("page", String(page));

      return url;
    }

Використання:

    const nextUrl = createPageUrl(3);

    console.log(nextUrl.href);

---

# 78. Практичний приклад: API helper

    function createProductsUrl({
      page,
      limit,
      search,
      category,
      sort
    }) {
      const url = new URL(
        "https://api.example.com/products"
      );

      if (page) {
        url.searchParams.set("page", String(page));
      }

      if (limit) {
        url.searchParams.set("limit", String(limit));
      }

      if (search) {
        url.searchParams.set("search", search);
      }

      if (category) {
        url.searchParams.set("category", category);
      }

      if (sort) {
        url.searchParams.set("sort", sort);
      }

      return url;
    }

Тепер:

    const url = createProductsUrl({
      page: 2,
      limit: 20,
      search: "javascript",
      category: "books",
      sort: "price"
    });

---

# 79. URL API та читабельність коду

Порівняйте:

    const url =
      "/products?page=" +
      page +
      "&limit=" +
      limit +
      "&search=" +
      search;

і:

    const url = new URL(
      "/products",
      window.location.origin
    );

    url.searchParams.set("page", String(page));
    url.searchParams.set("limit", String(limit));
    url.searchParams.set("search", search);

Другий варіант краще масштабується, коли параметрів стає багато.

---

# 80. URLSearchParams як інструмент між UI та API

Можна побудувати дуже просту модель:

    UI state
      ↓
    URLSearchParams
      ↓
    URL
      ↓
    fetch()
      ↓
    API
      ↓
    backend

Наприклад:

    search = "node"
    page = 2
    sort = "newest"

перетворюється на:

    ?search=node&page=2&sort=newest

---

# 81. Порівняння URL API та location

| API | Призначення |
|---|---|
| `new URL()` | створення та розбір URL |
| `url.searchParams` | робота з query |
| `URLSearchParams` | робота з параметрами |
| `window.location` | поточний URL сторінки |
| `history.pushState()` | зміна URL + новий history entry |
| `history.replaceState()` | зміна URL без нового history entry |

---

# 82. URL API та URLSearchParams — що запам'ятати

### URL

    const url = new URL("https://example.com/products?page=2");

### Частини URL

    url.href
    url.origin
    url.protocol
    url.hostname
    url.host
    url.port
    url.pathname
    url.search
    url.hash

### Query parameters

    url.searchParams

### Отримати

    url.searchParams.get("page");

### Встановити

    url.searchParams.set("page", "2");

### Додати

    url.searchParams.append("tag", "javascript");

### Перевірити

    url.searchParams.has("page");

### Видалити

    url.searchParams.delete("page");

### Усі значення

    url.searchParams.getAll("tag");

### Перетворити в рядок

    url.searchParams.toString();

---

# 83. URL vs URLSearchParams

**URL** відповідає за весь URL:

    https://example.com/products?page=2#reviews

**URLSearchParams** відповідає за query:

    page=2

Тобто:

    URL
     │
     ├── protocol
     ├── hostname
     ├── pathname
     ├── search
     │     └── URLSearchParams
     └── hash

---

# 84. Коли використовувати URL

Використовуйте `URL`, коли потрібно:

- створити URL;
- розібрати URL;
- змінити pathname;
- змінити query;
- отримати hostname;
- отримати protocol;
- отримати origin;
- працювати з абсолютними/відносними URL.

---

# 85. Коли використовувати URLSearchParams

Використовуйте `URLSearchParams`, коли потрібно:

- читати query-параметри;
- створювати query string;
- змінювати параметри;
- додавати фільтри;
- працювати з pagination;
- передавати параметри в API;
- працювати з повторюваними параметрами.

---

# 86. Міні-проєкт: Product Filter URL

Створіть маленький frontend:

    Product Filter

UI:

    Search: [____________]

    Category:
    [Books ▼]

    Sort:
    [Price ▼]

    Page:
    [1] [2] [3]

URL повинен змінюватися:

    /products?search=javascript&category=books&sort=price&page=2

### Завдання

1. Створити форму пошуку.
2. Додати category.
3. Додати sort.
4. Додати pagination.
5. Зберігати значення в URL.
6. Після перезавантаження прочитати URL.
7. Відновити стан UI.
8. Створити `fetch()` URL для API.

---

# 87. Вправа 1 — прочитати URL

Дано:

    const url = new URL(
      "https://example.com/products?page=3&sort=price"
    );

Завдання:

- отримати pathname;
- отримати page;
- отримати sort;
- вивести їх у консоль.

Очікувано:

    /products
    3
    price

---

# 88. Вправа 2 — створити URL

Створіть:

    https://example.com/products?page=2&limit=20

використовуючи:

    new URL()
    searchParams.set()

Не складайте URL вручну.

---

# 89. Вправа 3 — змінити параметр

Дано:

    https://example.com/products?page=1&sort=price

Змініть:

    page=1

на:

    page=2

за допомогою `set()`.

---

# 90. Вправа 4 — видалити параметр

Дано:

    https://example.com/products?page=2&sort=price

Видаліть:

    sort

за допомогою:

    delete()

---

# 91. Вправа 5 — повторювані параметри

Створіть:

    ?tag=javascript&tag=node&tag=postgresql

за допомогою:

    append()

Потім отримайте всі значення через:

    getAll()

---

# 92. Вправа 6 — URL із форми

Створіть форму:

    Search: [____________]
    [Search]

Після submit URL повинен стати:

    /search?query=javascript

Значення повинно братися з `<input>`.

---

# 93. Вправа 7 — API URL

Створіть функцію:

    createApiUrl({
      search,
      page,
      limit
    })

Вона повинна повертати:

    https://api.example.com/products?search=node&page=2&limit=20

---

# 94. Вправа 8 — прочитати поточний URL

Створіть сторінку:

    /products?search=javascript&page=2

Після завантаження сторінки виведіть:

    Search: javascript
    Page: 2

---

# 95. Вправа 9 — filter reset

Створіть URL:

    /products?search=node&category=books&sort=price&page=2

Кнопка:

    Reset

повинна видалити всі query-параметри.

Результат:

    /products

---

# 96. Вправа 10 — Full Stack

Створіть маленький застосунок:

    Products

Frontend:

    Search
    Category
    Page

URL:

    /products?search=node&category=books&page=2

Backend:

    GET /products

Backend читає:

    req.query.search
    req.query.category
    req.query.page

Повертає JSON.

Наступний етап:

    PostgreSQL

і backend використовує параметри для пошуку даних.

---

# 97. Питання для співбесіди

### 1. Що таке URL API?

API для створення, читання та зміни URL.

---

### 2. Що робить `new URL()`?

Створює об'єкт URL із рядка та дозволяє працювати з його частинами.

---

### 3. Що таке URLSearchParams?

API для роботи з query-параметрами URL.

---

### 4. Чим відрізняються `get()` і `getAll()`?

`get()` повертає перше значення.

`getAll()` повертає всі значення параметра.

---

### 5. Чим відрізняються `set()` і `append()`?

`set()` встановлює або замінює значення.

`append()` додає нове значення.

---

### 6. Що повертає `url.search`?

Query string разом із `?`.

Наприклад:

    ?page=2&sort=price

---

### 7. Що повертає `url.searchParams`?

Об'єкт `URLSearchParams`.

---

### 8. Чи є значення URLSearchParams числами?

Ні. Значення повертаються як strings.

---

### 9. Як отримати number?

    const page = Number(params.get("page"));

---

### 10. Як перевірити наявність параметра?

    params.has("page");

---

### 11. Як видалити параметр?

    params.delete("page");

---

### 12. Для чого `URLSearchParams` у frontend?

Для роботи з:

- search;
- filters;
- sorting;
- pagination;
- API query parameters;
- URL state.

---

### 13. Чому не варто вручну складати query string?

Тому що легко помилитися з:

- encoding;
- `&`;
- `?`;
- спеціальними символами;
- відсутніми параметрами.

---

### 14. Чи можна зберігати пароль у URL?

Технічно URL може містити такі дані, але для секретів це небезпечно й не рекомендується.

---

### 15. Як змінити URL без перезавантаження сторінки?

У браузерному JavaScript можна використовувати History API:

    history.pushState()

або:

    history.replaceState()

---

# 98. Головна ментальна модель

Запам'ятайте:

    URL
     │
     ├── protocol
     ├── origin
     ├── hostname
     ├── port
     ├── pathname
     │
     ├── search
     │     │
     │     └── URLSearchParams
     │            ├── get()
     │            ├── set()
     │            ├── append()
     │            ├── has()
     │            ├── delete()
     │            ├── getAll()
     │            └── toString()
     │
     └── hash

А у full-stack:

    UI
      ↓
    URLSearchParams
      ↓
    URL
      ↓
    fetch()
      ↓
    Node.js / Express / NestJS
      ↓
    req.query
      ↓
    PostgreSQL
      ↓
    JSON
      ↓
    UI

---

# 99. Коротка шпаргалка

    // Створити URL
    const url = new URL(
      "https://example.com/products?page=2"
    );

    // Частини URL
    url.href;
    url.origin;
    url.protocol;
    url.hostname;
    url.host;
    url.port;
    url.pathname;
    url.search;
    url.hash;

    // URLSearchParams
    url.searchParams;

    // Отримати
    url.searchParams.get("page");

    // Отримати всі
    url.searchParams.getAll("tag");

    // Встановити
    url.searchParams.set("page", "2");

    // Додати
    url.searchParams.append("tag", "javascript");

    // Перевірити
    url.searchParams.has("page");

    // Видалити
    url.searchParams.delete("page");

    // Відсортувати
    url.searchParams.sort();

    // Отримати query string
    url.searchParams.toString();

    // Поточний URL
    window.location.href;

    // Поточний query
    window.location.search;

    // Змінити URL без перезавантаження
    history.pushState({}, "", url);

---

# 100. Що потрібно вміти після цієї теми

Після `06-url-and-urlsearchparams` ви повинні вміти:

- створити URL через `new URL()`;
- розібрати URL на частини;
- працювати з `pathname`;
- працювати з `search`;
- працювати з `hash`;
- використовувати `URLSearchParams`;
- отримувати параметри через `get()`;
- отримувати повторювані параметри через `getAll()`;
- встановлювати параметри через `set()`;
- додавати параметри через `append()`;
- перевіряти через `has()`;
- видаляти через `delete()`;
- сортувати через `sort()`;
- перетворювати параметри через `toString()`;
- будувати URL для `fetch()`;
- читати параметри з `window.location`;
- розуміти URL як частину стану frontend;
- використовувати query parameters для search/filter/sort/pagination;
- розуміти зв'язок `URL → fetch → backend → req.query`;
- не зберігати секрети в URL.

---

# 101. Remember

> **URL — це адреса ресурсу.**

> **URL API — інструмент для роботи з усім URL.**

> **URLSearchParams — інструмент для роботи з query-параметрами.**

> `get()` — прочитати.

> `getAll()` — прочитати всі значення.

> `set()` — встановити або замінити.

> `append()` — додати.

> `has()` — перевірити.

> `delete()` — видалити.

> `toString()` — отримати query string.

> Значення `URLSearchParams` — **рядки**.

> URL чудово підходить для збереження **публічного стану сторінки**: search, filter, sort, pagination.

> **Секрети не повинні потрапляти в URL.**

> У full-stack застосунку query parameters проходять приблизно так:

    Browser
      ↓
    URLSearchParams
      ↓
    URL
      ↓
    fetch()
      ↓
    Node / Express / NestJS
      ↓
    req.query
      ↓
    PostgreSQL

Це один із простих, але дуже важливих містків між **JavaScript → Browser API → HTTP → Backend → Database**.