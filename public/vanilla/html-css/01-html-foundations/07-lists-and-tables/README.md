# 07. Lists and Tables

Списки та таблиці — базові HTML-структури для організації інформації.

HTML має спеціальні елементи для:

- маркованих списків;
- нумерованих списків;
- списків визначень;
- вкладених списків;
- таблиць;
- заголовків таблиць;
- рядків і комірок;
- об'єднання комірок;
- групування частин таблиці;
- доступності табличних даних.

Головний принцип:

> **Список використовується для набору пов'язаних елементів, а таблиця — для структурованих табличних даних.**

Не потрібно використовувати таблиці для побудови layout сторінки.

---

## Ключові поняття

- `<ul>` — unordered list
- `<ol>` — ordered list
- `<li>` — list item
- `<dl>` — description list
- `<dt>` — term
- `<dd>` — description
- `type` — тип маркера/нумерації
- `start` — початкове число нумерованого списку
- `reversed` — зворотна нумерація
- `value` — значення конкретного пункту `<ol>`
- nested list — вкладений список
- `<table>` — таблиця
- `<caption>` — назва таблиці
- `<thead>` — заголовкова частина
- `<tbody>` — основна частина
- `<tfoot>` — підсумкова частина
- `<tr>` — table row
- `<th>` — table header cell
- `<td>` — table data cell
- `scope` — область заголовка
- `colspan` — об'єднання колонок
- `rowspan` — об'єднання рядків
- `<colgroup>` — група колонок
- `<col>` — окрема колонка
- tabular data — табличні дані
- accessibility — доступність
- caption — назва/підпис таблиці

---

# 1. Unordered List — `<ul>`

Невпорядкований список створюється за допомогою:

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

За замовчуванням браузер показує маркери.

Візуально це приблизно:

    • HTML
    • CSS
    • JavaScript

---

# 2. `<li>` — list item

Кожен елемент списку повинен бути `<li>`:

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

`li` означає:

> list item

---

# 3. `<ul>` не містить довільні елементи як прямі children

Правильна структура:

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

Типовий патерн:

    <ul>
        <li>
            <a href="/html">HTML</a>
        </li>

        <li>
            <a href="/css">CSS</a>
        </li>

        <li>
            <a href="/javascript">JavaScript</a>
        </li>
    </ul>

---

# 4. Список навігації

`<ul>` часто використовується разом із `<nav>`:

    <nav aria-label="Основна навігація">
        <ul>
            <li>
                <a href="/">Головна</a>
            </li>

            <li>
                <a href="/about">Про нас</a>
            </li>

            <li>
                <a href="/contacts">Контакти</a>
            </li>
        </ul>
    </nav>

Це хороший семантичний патерн.

---

# 5. Unordered list — коли використовувати

`<ul>` підходить, коли порядок елементів не має значення.

Наприклад:

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

Якщо переставити елементи:

    JavaScript
    HTML
    CSS

зміст списку принципово не змінюється.

---

# 6. Ordered List — `<ol>`

Впорядкований список:

    <ol>
        <li>Встановити Node.js</li>
        <li>Створити проєкт</li>
        <li>Встановити залежності</li>
        <li>Запустити застосунок</li>
    </ol>

Браузер покаже:

    1. Встановити Node.js
    2. Створити проєкт
    3. Встановити залежності
    4. Запустити застосунок

---

# 7. Коли використовувати `<ol>`

`<ol>` використовується, коли порядок має значення.

Наприклад:

- інструкція;
- рецепт;
- алгоритм;
- рейтинг;
- етапи процесу;
- порядок дій.

Приклад:

    <ol>
        <li>Відкрити термінал</li>
        <li>Перейти до директорії</li>
        <li>Виконати npm install</li>
        <li>Запустити npm run dev</li>
    </ol>

---

# 8. `<ul>` vs `<ol>`

`<ul>`:

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

Означає:

> набір елементів без важливого порядку.

`<ol>`:

    <ol>
        <li>Крок 1</li>
        <li>Крок 2</li>
        <li>Крок 3</li>
    </ol>

Означає:

> елементи мають певний порядок.

---

# 9. Не вибирай `<ol>` тільки через цифри

Не потрібно думати:

> "Я хочу цифри, тому використаю `<ol>`."

Спочатку визнач семантику.

Якщо це просто список:

    HTML
    CSS
    JavaScript

використовуй:

    <ul>

Якщо це послідовність:

    1. Встановити
    2. Налаштувати
    3. Запустити

використовуй:

    <ol>

Візуальний вигляд потім можна змінити CSS.

---

# 10. Вкладені списки

Список може містити інший список.

Наприклад:

    <ul>
        <li>
            Frontend

            <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
            </ul>
        </li>

        <li>
            Backend

            <ul>
                <li>Node.js</li>
                <li>NestJS</li>
                <li>PostgreSQL</li>
            </ul>
        </li>
    </ul>

---

# 11. Правило вкладеного списку

Вкладений `<ul>` або `<ol>` повинен знаходитися всередині `<li>` батьківського списку.

Правильно:

    <ul>
        <li>
            Frontend

            <ul>
                <li>HTML</li>
                <li>CSS</li>
            </ul>
        </li>
    </ul>

Не рекомендується:

    <ul>
        <li>Frontend</li>

        <ul>
            <li>HTML</li>
            <li>CSS</li>
        </ul>
    </ul>

---

# 12. Вкладений ordered list

    <ol>
        <li>
            HTML

            <ol>
                <li>Elements</li>
                <li>Attributes</li>
                <li>Forms</li>
            </ol>
        </li>

        <li>
            CSS

            <ol>
                <li>Selectors</li>
                <li>Box Model</li>
                <li>Flexbox</li>
            </ol>
        </li>
    </ol>

---

# 13. Змішані списки

Можна вкладати `<ul>` в `<ol>` і навпаки.

    <ol>
        <li>
            Frontend

            <ul>
                <li>HTML</li>
                <li>CSS</li>
                <li>JavaScript</li>
            </ul>
        </li>

        <li>
            Backend

            <ul>
                <li>Node.js</li>
                <li>PostgreSQL</li>
            </ul>
        </li>
    </ol>

---

# 14. `type` у `<ol>`

Для `<ol>` можна задати тип маркування.

Наприклад:

    <ol type="A">
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ol>

Результат:

    A. HTML
    B. CSS
    C. JavaScript

Можливі значення:

    type="1"

    type="A"

    type="a"

    type="I"

    type="i"

---

# 15. Значення `type`

Основні варіанти:

    type="1"

дає:

    1.
    2.
    3.

    type="A"

дає:

    A.
    B.
    C.

    type="a"

дає:

    a.
    b.
    c.

    type="I"

дає:

    I.
    II.
    III.

    type="i"

дає:

    i.
    ii.
    iii.

---

# 16. Не використовуй `type` для оформлення

Якщо потрібно змінити лише візуальний вигляд списку, краще використовувати CSS.

HTML:

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

CSS пізніше може змінити:

- маркери;
- нумерацію;
- позицію;
- відступи;
- layout.

Семантика повинна визначатися HTML, а presentation — CSS.

---

# 17. `start`

`start` задає початкове число `<ol>`.

Наприклад:

    <ol start="5">
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ol>

Результат:

    5. HTML
    6. CSS
    7. JavaScript

---

# 18. `reversed`

`reversed` створює зворотну нумерацію.

    <ol reversed>
        <li>Третє місце</li>
        <li>Друге місце</li>
        <li>Перше місце</li>
    </ol>

Якщо три елементи:

    3. Третє місце
    2. Друге місце
    1. Перше місце

---

# 19. `value`

`value` дозволяє задати номер конкретного `<li>`.

    <ol>
        <li>Перший</li>
        <li value="5">П'ятий</li>
        <li>Шостий</li>
    </ol>

Це рідше використовується, але важливо знати про можливість.

---

# 20. Description List — `<dl>`

`<dl>` використовується для списку термінів і їхніх описів.

Структура:

    <dl>
        <dt>HTML</dt>
        <dd>Мова розмітки гіпертексту.</dd>

        <dt>CSS</dt>
        <dd>Мова стилів для опису presentation.</dd>
    </dl>

---

# 21. `<dt>`

`<dt>` означає:

> description term

Наприклад:

    <dt>HTML</dt>

---

# 22. `<dd>`

`<dd>` означає:

> description/details

Наприклад:

    <dd>
        Мова розмітки гіпертексту.
    </dd>

---

# 23. Структура `<dl>`

Ментальна модель:

    <dl>
        <dt>Термін</dt>
        <dd>Опис</dd>

        <dt>Інший термін</dt>
        <dd>Інший опис</dd>
    </dl>

Тобто:

    <dl>
        ├── <dt>
        ├── <dd>
        ├── <dt>
        └── <dd>

---

# 24. `<dl>` не тільки для словника

Description list можна використовувати для:

- термінів та визначень;
- метаданих;
- характеристик;
- питань і відповідей;
- key-value information;
- контактних даних.

Наприклад:

    <dl>
        <dt>Автор</dt>
        <dd>Valeriy Svystun</dd>

        <dt>Рік</dt>
        <dd>2026</dd>

        <dt>Категорія</dt>
        <dd>HTML</dd>
    </dl>

---

# 25. Кілька `<dd>` для одного `<dt>`

Один термін може мати кілька описів.

    <dl>
        <dt>HTML</dt>

        <dd>
            HyperText Markup Language.
        </dd>

        <dd>
            Стандартна мова розмітки вебсторінок.
        </dd>
    </dl>

---

# 26. Кілька `<dt>` для одного `<dd>`

Також один опис може стосуватися кількох термінів.

    <dl>
        <dt>HTML</dt>
        <dt>HyperText Markup Language</dt>

        <dd>
            Мова розмітки вебсторінок.
        </dd>
    </dl>

---

# 27. Списки та CSS

HTML:

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

CSS може змінити:

- `list-style-type`;
- `list-style-position`;
- `list-style-image`;
- `padding`;
- `margin`.

Наприклад:

    ul {
        list-style-type: square;
    }

Але це вже тема CSS.

---

# 28. Таблиці — `<table>`

Таблиця використовується для **табличних даних**.

Наприклад:

    <table>
        <tr>
            <th>Ім'я</th>
            <th>Вік</th>
        </tr>

        <tr>
            <td>Олег</td>
            <td>30</td>
        </tr>

        <tr>
            <td>Анна</td>
            <td>28</td>
        </tr>
    </table>

---

# 29. Основні елементи таблиці

Ментальна модель:

    <table>
        <tr>
            <th>Header</th>
            <th>Header</th>
        </tr>

        <tr>
            <td>Data</td>
            <td>Data</td>
        </tr>
    </table>

Основні елементи:

- `<table>` — таблиця;
- `<tr>` — рядок;
- `<th>` — заголовкова комірка;
- `<td>` — комірка даних.

---

# 30. `<tr>` — table row

`<tr>` створює рядок.

    <tr>
        <td>HTML</td>
        <td>Frontend</td>
    </tr>

---

# 31. `<td>` — table data

`<td>` містить звичайні табличні дані.

    <td>HTML</td>

Наприклад:

    <tr>
        <td>HTML</td>
        <td>Markup</td>
    </tr>

---

# 32. `<th>` — table header

`<th>` використовується для заголовка.

    <tr>
        <th>Technology</th>
        <th>Category</th>
    </tr>

Він семантично відрізняється від `<td>`.

---

# 33. Базова таблиця

    <table>
        <tr>
            <th>Technology</th>
            <th>Type</th>
            <th>Level</th>
        </tr>

        <tr>
            <td>HTML</td>
            <td>Markup</td>
            <td>Basic</td>
        </tr>

        <tr>
            <td>CSS</td>
            <td>Style</td>
            <td>Basic</td>
        </tr>

        <tr>
            <td>JavaScript</td>
            <td>Programming</td>
            <td>Intermediate</td>
        </tr>
    </table>

---

# 34. `<caption>`

`<caption>` — назва/підпис таблиці.

    <table>

        <caption>
            Технології frontend
        </caption>

        <tr>
            <th>Technology</th>
            <th>Type</th>
        </tr>

        <tr>
            <td>HTML</td>
            <td>Markup</td>
        </tr>

        <tr>
            <td>CSS</td>
            <td>Style</td>
        </tr>

    </table>

---

# 35. Чому потрібен `<caption>`

`<caption>` допомагає зрозуміти:

> про що ця таблиця.

Особливо це важливо для:

- accessibility;
- screen readers;
- складних сторінок;
- великих таблиць.

---

# 36. `<thead>`

`<thead>` групує заголовкові рядки.

    <table>

        <thead>
            <tr>
                <th>Назва</th>
                <th>Ціна</th>
            </tr>
        </thead>

        <tbody>
            ...
        </tbody>

    </table>

---

# 37. `<tbody>`

`<tbody>` містить основні дані.

    <table>

        <thead>
            <tr>
                <th>Назва</th>
                <th>Ціна</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>Книга</td>
                <td>300 грн</td>
            </tr>

            <tr>
                <td>Зошит</td>
                <td>80 грн</td>
            </tr>
        </tbody>

    </table>

---

# 38. `<tfoot>`

`<tfoot>` використовується для підсумкової частини.

    <table>

        <thead>
            <tr>
                <th>Товар</th>
                <th>Ціна</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>Книга</td>
                <td>300 грн</td>
            </tr>

            <tr>
                <td>Зошит</td>
                <td>80 грн</td>
            </tr>
        </tbody>

        <tfoot>
            <tr>
                <th>Разом</th>
                <td>380 грн</td>
            </tr>
        </tfoot>

    </table>

---

# 39. Повна структура таблиці

Типова модель:

    <table>

        <caption>
            Назва таблиці
        </caption>

        <thead>
            <tr>
                <th>Header</th>
                <th>Header</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>Data</td>
                <td>Data</td>
            </tr>

            <tr>
                <td>Data</td>
                <td>Data</td>
            </tr>
        </tbody>

        <tfoot>
            <tr>
                <th>Total</th>
                <td>...</td>
            </tr>
        </tfoot>

    </table>

---

# 40. `<thead>`, `<tbody>`, `<tfoot>` — навіщо?

Вони допомагають логічно структурувати таблицю.

    <thead>
        ↓
    заголовок

    <tbody>
        ↓
    основні дані

    <tfoot>
        ↓
    підсумки / footer data

Це особливо корисно для:

- великих таблиць;
- accessibility;
- CSS;
- JavaScript;
- логічної структури документа.

---

# 41. `scope`

`scope` описує, до яких комірок належить заголовок.

Наприклад, заголовок колонки:

    <th scope="col">
        Ім'я
    </th>

Заголовок рядка:

    <th scope="row">
        Олег
    </th>

---

# 42. `scope="col"`

Приклад:

    <table>

        <tr>
            <th scope="col">Ім'я</th>
            <th scope="col">Вік</th>
            <th scope="col">Місто</th>
        </tr>

        <tr>
            <td>Олег</td>
            <td>30</td>
            <td>Вінниця</td>
        </tr>

    </table>

Тут `<th>` описує колонки.

---

# 43. `scope="row"`

Приклад:

    <table>

        <tr>
            <th scope="col">Місто</th>
            <th scope="col">Населення</th>
        </tr>

        <tr>
            <th scope="row">Вінниця</th>
            <td>...</td>
        </tr>

        <tr>
            <th scope="row">Київ</th>
            <td>...</td>
        </tr>

    </table>

Тут місто є заголовком відповідного рядка.

---

# 44. `<th>` не означає тільки верхній рядок

`<th>` може бути заголовком:

- колонки;
- рядка;
- групи колонок;
- групи рядків.

Тому:

    <th>

має семантичну роль, а не просто "жирний текст".

---

# 45. `colspan`

`colspan` об'єднує кілька колонок.

Наприклад:

    <table>

        <tr>
            <th colspan="2">
                Користувач
            </th>
        </tr>

        <tr>
            <td>Ім'я</td>
            <td>Вік</td>
        </tr>

    </table>

`colspan="2"` означає:

> комірка займає 2 колонки.

---

# 46. `rowspan`

`rowspan` об'єднує кілька рядків.

    <table>

        <tr>
            <th rowspan="2">
                Frontend
            </th>

            <td>HTML</td>
        </tr>

        <tr>
            <td>CSS</td>
        </tr>

    </table>

`rowspan="2"` означає:

> комірка займає 2 рядки.

---

# 47. `colspan` vs `rowspan`

`colspan`:

    <td colspan="3">

Об'єднує:

    → → →

кілька колонок.

`rowspan`:

    <td rowspan="3">

Об'єднує:

    ↓
    ↓
    ↓

кілька рядків.

---

# 48. Складна таблиця

    <table>

        <caption>
            Навчальний план
        </caption>

        <thead>
            <tr>
                <th scope="col">Розділ</th>
                <th scope="col">Тема</th>
                <th scope="col">Рівень</th>
            </tr>
        </thead>

        <tbody>

            <tr>
                <th scope="row">HTML</th>
                <td>Elements</td>
                <td>Core</td>
            </tr>

            <tr>
                <th scope="row">CSS</th>
                <td>Flexbox</td>
                <td>Junior</td>
            </tr>

            <tr>
                <th scope="row">JavaScript</th>
                <td>Functions</td>
                <td>Junior</td>
            </tr>

        </tbody>

    </table>

---

# 49. `<colgroup>`

`<colgroup>` дозволяє групувати колонки.

Наприклад:

    <table>

        <colgroup>
            <col>
            <col>
            <col>
        </colgroup>

        ...
    </table>

Це може бути корисним для CSS або роботи зі структурою колонок.

---

# 50. `<col>`

`<col>` представляє колонку або групу колонок.

Наприклад:

    <table>

        <colgroup>

            <col span="2">

            <col>

        </colgroup>

        ...

    </table>

`span="2"` означає дві колонки.

---

# 51. Таблиця не повинна використовуватися для layout

Старий підхід:

    <table>
        <tr>
            <td>Sidebar</td>
            <td>Main content</td>
        </tr>
    </table>

Сьогодні для layout використовують:

- CSS Flexbox;
- CSS Grid;
- нормальний document flow.

Таблиця повинна бути таблицею даних.

---

# 52. Табличні дані vs layout

Правильний випадок:

    Product | Price | Quantity
    --------|-------|---------
    Book    | 300   | 2
    Pen     | 50    | 5

Це tabular data.

Неправильний випадок:

    ┌──────────┬──────────────┐
    │ Sidebar  │ Main content │
    └──────────┴──────────────┘

Це layout.

Для layout:

    display: grid;

або:

    display: flex;

---

# 53. Таблиця з числами

    <table>

        <caption>
            Результати тестування
        </caption>

        <thead>
            <tr>
                <th scope="col">Студент</th>
                <th scope="col">HTML</th>
                <th scope="col">CSS</th>
                <th scope="col">JS</th>
            </tr>
        </thead>

        <tbody>

            <tr>
                <th scope="row">Олег</th>
                <td>90</td>
                <td>85</td>
                <td>88</td>
            </tr>

            <tr>
                <th scope="row">Анна</th>
                <td>95</td>
                <td>92</td>
                <td>94</td>
            </tr>

        </tbody>

    </table>

---

# 54. Таблиця з посиланнями

Комірки можуть містити посилання.

    <table>

        <tr>
            <th scope="col">Технологія</th>
            <th scope="col">Документація</th>
        </tr>

        <tr>
            <td>HTML</td>
            <td>
                <a href="/docs/html">
                    Документація
                </a>
            </td>
        </tr>

        <tr>
            <td>CSS</td>
            <td>
                <a href="/docs/css">
                    Документація
                </a>
            </td>
        </tr>

    </table>

---

# 55. Таблиця з кнопками

Комірка може містити button.

    <table>

        <tr>
            <th scope="col">Product</th>
            <th scope="col">Action</th>
        </tr>

        <tr>
            <td>Book</td>
            <td>
                <button type="button">
                    Edit
                </button>
            </td>
        </tr>

    </table>

Тут:

- `<a>` — навігація;
- `<button>` — дія.

---

# 56. Порожня комірка

Іноді табличні дані справді можуть мати порожнє значення.

    <tr>
        <th scope="row">Олег</th>
        <td>30</td>
        <td></td>
    </tr>

Не потрібно автоматично вставляти:

    -

якщо `-` не є частиною реальних даних.

---

# 57. Не використовуй `<br>` замість списку

Погано:

    HTML<br>
    CSS<br>
    JavaScript<br>
    TypeScript

Якщо це список, краще:

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>TypeScript</li>
    </ul>

Список передає семантику.

---

# 58. Не використовуй `<div>` замість списку

Погано:

    <div>HTML</div>
    <div>CSS</div>
    <div>JavaScript</div>

якщо це семантично список.

Краще:

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

---

# 59. Не використовуй `<div>` замість таблиці

Погано:

    <div>
        <div>Product</div>
        <div>Price</div>
    </div>

    <div>
        <div>Book</div>
        <div>300</div>
    </div>

Якщо це справжні табличні дані, краще:

    <table>
        ...
    </table>

---

# 60. Accessibility для списків

Нативні HTML-списки мають вбудовану семантику.

Наприклад:

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

Screen reader може визначити:

- що це список;
- кількість елементів;
- окремі list items.

Тому не потрібно замінювати нативну семантику великою кількістю ARIA без необхідності.

---

# 61. Accessibility для таблиць

Хороша таблиця повинна мати:

- зрозумілу структуру;
- `<caption>`, коли це доречно;
- `<th>` для заголовків;
- `scope` для складніших випадків;
- логічні рядки та колонки.

Приклад:

    <table>

        <caption>
            Продажі за місяць
        </caption>

        <thead>
            <tr>
                <th scope="col">Місяць</th>
                <th scope="col">Продажі</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <th scope="row">Січень</th>
                <td>100</td>
            </tr>

            <tr>
                <th scope="row">Лютий</th>
                <td>120</td>
            </tr>
        </tbody>

    </table>

---

# 62. Простий vs складний table header

Проста таблиця:

    <table>

        <thead>
            <tr>
                <th scope="col">Name</th>
                <th scope="col">Age</th>
            </tr>
        </thead>

        <tbody>
            ...
        </tbody>

    </table>

Для складних багаторівневих таблиць можуть знадобитися:

- `scope`;
- `id`;
- `headers`.

---

# 63. `headers` та `id`

Для складних таблиць можна явно зв'язувати data cells із header cells.

Наприклад:

    <th id="name">
        Ім'я
    </th>

    <td headers="name">
        Олег
    </td>

Це розширений accessibility-підхід.

Для звичайної таблиці зазвичай достатньо:

    <th scope="col">

і:

    <th scope="row">

---

# 64. Велика таблиця

Для великої таблиці корисно використовувати:

    <caption>

    <thead>

    <tbody>

    <tfoot>

і правильні:

    <th scope="col">

    <th scope="row">

Приклад:

    <table>

        <caption>
            Результати за 2026 рік
        </caption>

        <thead>
            <tr>
                <th scope="col">Місяць</th>
                <th scope="col">Продажі</th>
                <th scope="col">Витрати</th>
                <th scope="col">Прибуток</th>
            </tr>
        </thead>

        <tbody>
            ...
        </tbody>

        <tfoot>
            <tr>
                <th scope="row">Разом</th>
                <td>...</td>
                <td>...</td>
                <td>...</td>
            </tr>
        </tfoot>

    </table>

---

# 65. Таблиця та responsive design

Великі таблиці можуть не поміщатися на маленькому екрані.

HTML все одно залишається:

    <table>
        ...
    </table>

А CSS може забезпечити горизонтальне прокручування.

Типовий патерн:

    <div class="table-wrapper">
        <table>
            ...
        </table>
    </div>

CSS:

    .table-wrapper {
        overflow-x: auto;
    }

Це вже CSS-рівень, але важливо розуміти концепцію.

---

# 66. Списки та навігація

Списки дуже часто використовуються для:

- main navigation;
- footer navigation;
- sidebar navigation;
- breadcrumbs;
- categories;
- tags;
- menus.

Наприклад:

    <nav aria-label="Основна навігація">

        <ul>

            <li>
                <a href="/">Головна</a>
            </li>

            <li>
                <a href="/courses">Курси</a>
            </li>

            <li>
                <a href="/about">Про сайт</a>
            </li>

        </ul>

    </nav>

---

# 67. Список категорій

    <section aria-labelledby="categories-title">

        <h2 id="categories-title">
            Категорії
        </h2>

        <ul>
            <li>
                <a href="/html">HTML</a>
            </li>

            <li>
                <a href="/css">CSS</a>
            </li>

            <li>
                <a href="/javascript">JavaScript</a>
            </li>
        </ul>

    </section>

---

# 68. Список тегів

    <ul>
        <li>
            <a href="/tags/html">HTML</a>
        </li>

        <li>
            <a href="/tags/css">CSS</a>
        </li>

        <li>
            <a href="/tags/frontend">Frontend</a>
        </li>
    </ul>

Візуально CSS пізніше може зробити з цього:

    [HTML] [CSS] [Frontend]

Але семантично це все ще список.

---

# 69. Список кроків

    <ol>
        <li>
            Створити HTML-файл.
        </li>

        <li>
            Додати структуру документа.
        </li>

        <li>
            Додати CSS.
        </li>

        <li>
            Перевірити результат у браузері.
        </li>
    </ol>

---

# 70. Список функцій

    <ul>
        <li>Швидкий пошук</li>
        <li>Фільтрація</li>
        <li>Сортування</li>
        <li>Експорт даних</li>
    </ul>

Тут порядок не має значення.

---

# 71. Список визначень

    <dl>

        <dt>HTML</dt>
        <dd>
            Мова розмітки вебсторінок.
        </dd>

        <dt>CSS</dt>
        <dd>
            Мова стилів.
        </dd>

        <dt>JavaScript</dt>
        <dd>
            Мова програмування для web.
        </dd>

    </dl>

---

# 72. Приклад навчальної таблиці

    <table>

        <caption>
            HTML Foundations
        </caption>

        <thead>
            <tr>
                <th scope="col">№</th>
                <th scope="col">Тема</th>
                <th scope="col">Статус</th>
            </tr>
        </thead>

        <tbody>

            <tr>
                <th scope="row">1</th>
                <td>HTML Basics</td>
                <td>Done</td>
            </tr>

            <tr>
                <th scope="row">2</th>
                <td>Document Structure</td>
                <td>Done</td>
            </tr>

            <tr>
                <th scope="row">3</th>
                <td>Elements and Attributes</td>
                <td>Done</td>
            </tr>

            <tr>
                <th scope="row">4</th>
                <td>Text and Content</td>
                <td>In progress</td>
            </tr>

        </tbody>

    </table>

---

# 73. Таблиця як data model

Корисно мислити таблицю як:

    TABLE
       │
       ├── columns
       │
       └── rows

Наприклад:

    Students
       │
       ├── Name
       ├── Age
       └── Score

       ↓

    Row
       ├── Valeriy
       ├── 56
       └── 95

HTML лише представляє цю структуру.

---

# 74. Список як data model

Список можна мислити як:

    LIST
       │
       ├── Item
       ├── Item
       ├── Item
       └── Item

Наприклад:

    Technologies
       │
       ├── HTML
       ├── CSS
       ├── JavaScript
       └── TypeScript

Для цього:

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
        <li>TypeScript</li>
    </ul>

---

# 75. List vs Table

Список:

    HTML
    CSS
    JavaScript

Це:

> один набір елементів.

Таблиця:

    Technology | Type       | Level
    ----------|------------|--------
    HTML      | Markup     | Core
    CSS       | Styling    | Junior
    JavaScript| Programming| Junior

Це:

> взаємопов'язані значення в рядках і колонках.

---

# 76. Не перетворюй таблицю на список без причини

Якщо desktop-таблиця на mobile виглядає складно, не обов'язково змінювати HTML на `<ul>`.

Спочатку подумай:

- чи це справді tabular data;
- чи можна зробити горизонтальний scroll;
- чи можна адаптувати CSS;
- чи потрібен інший mobile presentation.

Семантика даних залишається важливішою за візуальну форму.

---

# 77. Таблиця з об'єднаними заголовками

    <table>

        <thead>

            <tr>
                <th rowspan="2">
                    Місяць
                </th>

                <th colspan="2">
                    Фінанси
                </th>
            </tr>

            <tr>
                <th>
                    Доходи
                </th>

                <th>
                    Витрати
                </th>
            </tr>

        </thead>

        <tbody>

            <tr>
                <th scope="row">
                    Січень
                </th>

                <td>10000</td>
                <td>7000</td>
            </tr>

        </tbody>

    </table>

Це вже складніша таблиця, де потрібно уважно продумати зв'язки між заголовками та даними.

---

# 78. Таблиці та accessibility — практичне правило

Для простої таблиці:

    <table>

        <caption>
            Результати
        </caption>

        <thead>
            <tr>
                <th scope="col">Ім'я</th>
                <th scope="col">Бал</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <th scope="row">Олег</th>
                <td>95</td>
            </tr>
        </tbody>

    </table>

Це вже значно краще, ніж:

    <table>

        <tr>
            <td>Ім'я</td>
            <td>Бал</td>
        </tr>

        <tr>
            <td>Олег</td>
            <td>95</td>
        </tr>

    </table>

У другому випадку браузеру та assistive technologies складніше зрозуміти структуру даних.

---

# 79. Типові помилки зі списками

## Помилка 1 — `<li>` поза списком

Погано:

    <li>HTML</li>
    <li>CSS</li>

Краще:

    <ul>
        <li>HTML</li>
        <li>CSS</li>
    </ul>

---

## Помилка 2 — неправильна вкладеність

Погано:

    <ul>
        <li>Frontend</li>

        <ul>
            <li>HTML</li>
        </ul>
    </ul>

Краще:

    <ul>
        <li>
            Frontend

            <ul>
                <li>HTML</li>
            </ul>
        </li>
    </ul>

---

# 80. Типові помилки з `<ol>`

Не використовуй `<ol>`, якщо порядок не має значення.

Погано:

    <ol>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ol>

якщо це просто список технологій.

Краще:

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

---

# 81. Типові помилки з таблицями

## Помилка 1 — немає `<th>`

Погано:

    <table>

        <tr>
            <td>Product</td>
            <td>Price</td>
        </tr>

        <tr>
            <td>Book</td>
            <td>300</td>
        </tr>

    </table>

Краще:

    <table>

        <thead>
            <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>Book</td>
                <td>300</td>
            </tr>
        </tbody>

    </table>

---

# 82. Помилка — таблиця без структури

Можна написати:

    <table>
        <tr>...</tr>
        <tr>...</tr>
        <tr>...</tr>
    </table>

Це допустимий базовий варіант.

Але для складніших або production-таблиць краще чітко розділяти:

    <thead>

    <tbody>

    <tfoot>

---

# 83. Помилка — таблиця для layout

Не використовуй:

    <table>

для:

- sidebar;
- header layout;
- columns;
- page layout;
- positioning.

Для цього існують:

    Flexbox

і:

    CSS Grid

---

# 84. Помилка — все робити через `colspan`

Наприклад, якщо таблиця складна настільки, що вся структура складається з:

    colspan
    rowspan
    colspan
    rowspan

потрібно перевірити, чи справді таблиця є найкращим представленням даних.

Складна таблиця можлива, але вона повинна залишатися зрозумілою.

---

# 85. Практичний HTML шаблон для списків

    <section aria-labelledby="topics-title">

        <h2 id="topics-title">
            Topics
        </h2>

        <ul>

            <li>
                HTML
            </li>

            <li>
                CSS
            </li>

            <li>
                JavaScript
            </li>

        </ul>

    </section>

---

# 86. Практичний шаблон ordered list

    <section aria-labelledby="steps-title">

        <h2 id="steps-title">
            Installation steps
        </h2>

        <ol>

            <li>
                Install Node.js.
            </li>

            <li>
                Create the project.
            </li>

            <li>
                Install dependencies.
            </li>

            <li>
                Start the application.
            </li>

        </ol>

    </section>

---

# 87. Практичний шаблон description list

    <section aria-labelledby="glossary-title">

        <h2 id="glossary-title">
            Glossary
        </h2>

        <dl>

            <dt>HTML</dt>
            <dd>
                HyperText Markup Language.
            </dd>

            <dt>CSS</dt>
            <dd>
                Cascading Style Sheets.
            </dd>

            <dt>JavaScript</dt>
            <dd>
                Programming language for web applications.
            </dd>

        </dl>

    </section>

---

# 88. Практичний шаблон таблиці

    <table>

        <caption>
            Course progress
        </caption>

        <thead>
            <tr>
                <th scope="col">Topic</th>
                <th scope="col">Status</th>
                <th scope="col">Level</th>
            </tr>
        </thead>

        <tbody>

            <tr>
                <th scope="row">HTML</th>
                <td>Completed</td>
                <td>Core</td>
            </tr>

            <tr>
                <th scope="row">CSS</th>
                <td>In progress</td>
                <td>Junior</td>
            </tr>

            <tr>
                <th scope="row">JavaScript</th>
                <td>Planned</td>
                <td>Junior</td>
            </tr>

        </tbody>

    </table>

---

# 89. Практичне завдання №1 — Unordered List

Створи список:

    Frontend
    Backend
    Database
    DevOps

Використай:

    <ul>

---

# 90. Практичне завдання №2 — Ordered List

Створи інструкцію:

    1. Відкрити VS Code
    2. Створити папку
    3. Створити index.html
    4. Відкрити браузер

Використай:

    <ol>

---

# 91. Практичне завдання №3 — Nested List

Створи:

    Frontend
        HTML
        CSS
        JavaScript

    Backend
        Node.js
        Express
        PostgreSQL

Використай вкладені `<ul>`.

---

# 92. Практичне завдання №4 — Description List

Створи glossary:

    HTML
    CSS
    JavaScript
    HTTP
    API

Для кожного додай коротке визначення.

Використай:

    <dl>
        <dt>
        <dd>
    </dl>

---

# 93. Практичне завдання №5 — Basic Table

Створи таблицю:

    Student | HTML | CSS | JS

з трьома студентами.

Використай:

- `<table>`;
- `<thead>`;
- `<tbody>`;
- `<th>`;
- `<td>`;
- `scope`.

---

# 94. Практичне завдання №6 — Table with Footer

Створи таблицю продажів:

    Product | Quantity | Price

Додай:

- `<caption>`;
- `<thead>`;
- `<tbody>`;
- `<tfoot>`.

У footer покажи total.

---

# 95. Практичне завдання №7 — Colspan

Створи таблицю, де один заголовок займає дві колонки.

Використай:

    colspan="2"

---

# 96. Практичне завдання №8 — Rowspan

Створи таблицю, де одна категорія займає кілька рядків.

Використай:

    rowspan="2"

або:

    rowspan="3"

---

# 97. Практичне завдання №9 — Course Table

Створи таблицю навчального плану:

    Module | Topic | Level | Status

Наприклад:

    HTML | Elements | Core | Done
    HTML | Forms | Junior | Planned
    CSS | Flexbox | Junior | In progress
    JS | Functions | Junior | Planned

---

# 98. Практичне завдання №10 — Complete page

Створи сторінку:

    Learning Plan

Структура:

    Header
      ↓
    Main
      ↓
    Course topics
      ↓
    Ordered steps
      ↓
    Glossary
      ↓
    Progress table
      ↓
    Footer

Використай:

- `<ul>`;
- `<ol>`;
- `<dl>`;
- `<table>`;
- `<caption>`;
- `<thead>`;
- `<tbody>`;
- `<tfoot>`;
- `<th>`;
- `<td>`;
- `scope`.

---

# 99. Чекліст для списків

Перевір:

    [ ] Для unordered collection використовується <ul>
    [ ] Для ordered sequence використовується <ol>
    [ ] Кожен item знаходиться в <li>
    [ ] Вкладений список знаходиться всередині <li>
    [ ] Для термінів використовується <dl>
    [ ] Терміни знаходяться в <dt>
    [ ] Описи знаходяться в <dd>
    [ ] Не використовується <br> замість списку
    [ ] Не використовуються <div> замість семантичного списку

---

# 100. Чекліст для таблиць

Перевір:

    [ ] <table> використовується тільки для tabular data
    [ ] Є зрозуміла структура рядків і колонок
    [ ] Заголовки використовують <th>
    [ ] Дані використовують <td>
    [ ] Для складніших таблиць використовується scope
    [ ] Є <caption>, коли потрібна назва таблиці
    [ ] Великі таблиці поділені на thead/tbody/tfoot
    [ ] colspan використовується правильно
    [ ] rowspan використовується правильно
    [ ] Таблиця не використовується для page layout
    [ ] На mobile передбачено коректне відображення

---

# 101. Core — що потрібно знати обов'язково

На базовому рівні потрібно впевнено знати:

- `<ul>`;
- `<ol>`;
- `<li>`;
- вкладені списки;
- `<dl>`;
- `<dt>`;
- `<dd>`;
- `<table>`;
- `<tr>`;
- `<th>`;
- `<td>`;
- `<caption>`;
- `<thead>`;
- `<tbody>`;
- `<tfoot>`;
- `scope`;
- `colspan`;
- `rowspan`.

Головне:

> розуміти різницю між списком і таблицею.

---

# 102. Junior — наступний рівень

Потрібно знати:

- семантику списків;
- списки навігації;
- description lists;
- accessible tables;
- `scope="col"`;
- `scope="row"`;
- складні таблиці;
- `colgroup`;
- `<col>`;
- responsive tables;
- CSS styling lists;
- CSS styling tables;
- таблиці з посиланнями;
- таблиці з buttons;
- nested lists.

---

# 103. Middle — поглиблення

Варто розуміти:

- складні табличні структури;
- multi-level headers;
- `headers` + `id`;
- accessibility великих таблиць;
- responsive data tables;
- таблиці з dynamic data;
- sorting;
- filtering;
- pagination;
- sticky headers;
- performance великих таблиць;
- server-side pagination;
- data presentation architecture.

---

# 104. Senior — системний рівень

Потрібно розуміти:

- data semantics;
- accessibility architecture;
- complex table navigation;
- screen reader behavior;
- large dataset presentation;
- virtualization;
- responsive data visualization;
- HTML vs ARIA decisions;
- native semantics first;
- progressive enhancement;
- таблиці як presentation layer для data model;
- взаємодію HTML tables із frontend frameworks.

---

# 105. Питання для співбесіди

### 1. Чим `<ul>` відрізняється від `<ol>`?

`<ul>` — список без важливого порядку.

`<ol>` — впорядкований список, де порядок має значення.

---

### 2. Для чого `<li>`?

Для окремого елемента `<ul>` або `<ol>`.

---

### 3. Як зробити вкладений список?

Помістити `<ul>` або `<ol>` всередину відповідного `<li>`.

---

### 4. Для чого `<dl>`?

Для списку термінів і пов'язаних із ними описів/значень.

---

### 5. Що таке `<dt>`?

Термін у description list.

---

### 6. Що таке `<dd>`?

Опис або значення терміна.

---

### 7. Для чого `<table>`?

Для tabular data — даних, які логічно представлені в рядках і колонках.

---

### 8. Що таке `<tr>`?

Table row — рядок таблиці.

---

### 9. Чим `<th>` відрізняється від `<td>`?

`<th>` — заголовкова комірка.

`<td>` — звичайна комірка даних.

---

### 10. Для чого `<caption>`?

Для назви/опису таблиці.

---

### 11. Для чого `<thead>`?

Для групування заголовкової частини таблиці.

---

### 12. Для чого `<tbody>`?

Для основної частини табличних даних.

---

### 13. Для чого `<tfoot>`?

Для підсумкової або footer-частини таблиці.

---

### 14. Що робить `scope="col"`?

Вказує, що `<th>` є заголовком колонки.

---

### 15. Що робить `scope="row"`?

Вказує, що `<th>` є заголовком рядка.

---

### 16. Що робить `colspan`?

Об'єднує комірку по кількох колонках.

---

### 17. Що робить `rowspan`?

Об'єднує комірку по кількох рядках.

---

### 18. Чому не можна використовувати `<table>` для layout?

Тому що таблиця семантично призначена для табличних даних, а layout повинен будуватися CSS.

---

### 19. Чим список відрізняється від таблиці?

Список представляє набір пов'язаних елементів.

Таблиця представляє взаємопов'язані дані в рядках і колонках.

---

### 20. Навіщо `scope`?

Для явнішого зв'язку заголовкових комірок із відповідними даними, особливо для accessibility.

---

# 106. Міні-шпаргалка

## Unordered list

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

## Ordered list

    <ol>
        <li>Step 1</li>
        <li>Step 2</li>
        <li>Step 3</li>
    </ol>

## Nested list

    <ul>
        <li>
            Frontend

            <ul>
                <li>HTML</li>
                <li>CSS</li>
            </ul>
        </li>
    </ul>

## Description list

    <dl>
        <dt>HTML</dt>
        <dd>Markup language.</dd>
    </dl>

## Basic table

    <table>

        <tr>
            <th>Product</th>
            <th>Price</th>
        </tr>

        <tr>
            <td>Book</td>
            <td>300</td>
        </tr>

    </table>

## Table with sections

    <table>

        <caption>
            Products
        </caption>

        <thead>
            <tr>
                <th scope="col">Product</th>
                <th scope="col">Price</th>
            </tr>
        </thead>

        <tbody>
            <tr>
                <td>Book</td>
                <td>300</td>
            </tr>
        </tbody>

        <tfoot>
            <tr>
                <th scope="row">Total</th>
                <td>300</td>
            </tr>
        </tfoot>

    </table>

## Column span

    <th colspan="2">
        User
    </th>

## Row span

    <th rowspan="2">
        Frontend
    </th>

---

# 107. Головна ментальна модель

Запам'ятай:

    LIST
      │
      ├── unordered
      │     └── <ul>
      │           └── <li>
      │
      ├── ordered
      │     └── <ol>
      │           └── <li>
      │
      └── description
            └── <dl>
                  ├── <dt>
                  └── <dd>


    TABLE
      │
      └── <table>
            │
            ├── <caption>
            │
            ├── <thead>
            │     └── <tr>
            │           └── <th>
            │
            ├── <tbody>
            │     └── <tr>
            │           ├── <th>
            │           └── <td>
            │
            └── <tfoot>
                  └── <tr>
                        ├── <th>
                        └── <td>

---

# 108. Як вибрати правильний елемент

Постав собі питання:

    Що я представляю?

        ↓

    Набір елементів
        │
        ├── порядок не важливий
        │       ↓
        │      <ul>
        │
        └── порядок важливий
                ↓
               <ol>


    Термін + опис
        ↓
       <dl>


    Дані в рядках і колонках
        ↓
      <table>


    Layout сторінки
        ↓
    CSS Grid / Flexbox

---

# 109. Список чи таблиця?

Якщо дані виглядають як:

    HTML
    CSS
    JavaScript
    TypeScript

→ `<ul>`.

Якщо:

    1. HTML
    2. CSS
    3. JavaScript

і порядок має значення:

→ `<ol>`.

Якщо:

    HTML → HyperText Markup Language
    CSS  → Cascading Style Sheets

→ `<dl>`.

Якщо:

    Technology | Type | Level
    HTML       | Markup | Core
    CSS        | Style  | Junior

→ `<table>`.

---

# 110. Головні правила

1. `<ul>` — невпорядкований список.
2. `<ol>` — впорядкований список.
3. `<li>` — елемент списку.
4. Вкладений список розміщується всередині `<li>`.
5. `<dl>` — список термінів і описів.
6. `<dt>` — термін.
7. `<dd>` — опис/значення.
8. `<table>` — табличні дані.
9. `<tr>` — рядок.
10. `<th>` — заголовкова комірка.
11. `<td>` — комірка даних.
12. `<caption>` — назва таблиці.
13. `<thead>` — заголовкова частина.
14. `<tbody>` — основні дані.
15. `<tfoot>` — підсумкова частина.
16. `scope="col"` — заголовок колонки.
17. `scope="row"` — заголовок рядка.
18. `colspan` — об'єднання колонок.
19. `rowspan` — об'єднання рядків.
20. Не використовуй `<table>` для layout.
21. Не використовуй `<br>` замість списку.
22. Не використовуй `<div>` замість семантичного списку без причини.
23. Використовуй native HTML semantics перед ARIA.
24. Думай не тільки про вигляд, а й про структуру даних.
25. CSS відповідає за візуальне оформлення списків і таблиць.

---

# 111. Головна ідея теми

Списки та таблиці — це не просто способи красиво показати інформацію.

Вони описують **структуру даних**.

Наприклад:

    <ul>
        <li>HTML</li>
        <li>CSS</li>
        <li>JavaScript</li>
    </ul>

говорить браузеру:

> "Це набір пов'язаних елементів."

А:

    <table>
        ...
    </table>

говорить:

> "Це структуровані дані, організовані в рядки та колонки."

Тому правильний HTML починається не з питання:

> "Як це буде виглядати?"

а з питання:

> **"Що це за дані і яка їхня семантична структура?"**

Візуальне оформлення потім можна змінити за допомогою CSS.

---

# 112. Фінальна схема

    DATA
      │
      ├── Collection
      │      │
      │      ├── order doesn't matter
      │      │       ↓
      │      │      <ul>
      │      │
      │      └── order matters
      │              ↓
      │             <ol>
      │
      ├── Term + description
      │       ↓
      │      <dl>
      │
      └── Rows + columns
              ↓
            <table>


    SEMANTIC HTML
          ↓
    Accessibility
          ↓
    CSS Presentation
          ↓
    JavaScript Behavior

---

# 113. Головне, що потрібно винести з теми

> **Використовуй `<ul>` і `<ol>` для списків, `<dl>` для термінів та описів, а `<table>` — тільки для справжніх табличних даних.**

Правильна семантика:

    List
      ↓
    <ul> / <ol> / <dl>


    Tabular data
      ↓
    <table>
      ↓
    <thead> / <tbody> / <tfoot>
      ↓
    <tr>
      ↓
    <th> / <td>


І найважливіше правило:

> **Не вибирай HTML-елемент за його стандартним зовнішнім виглядом. Вибирай його за змістом і семантикою.**