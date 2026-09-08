# 09. Global Attributes

## Зміст

1. [Що таке Global Attributes](#1-що-таке-global-attributes)
2. [Чому вони називаються global](#2-чому-вони-називаються-global)
3. [Основні global attributes](#3-основні-global-attributes)
4. [`id`](#4-id)
5. [`class`](#5-class)
6. [`title`](#6-title)
7. [`lang`](#7-lang)
8. [`dir`](#8-dir)
9. [`hidden`](#9-hidden)
10. [`style`](#10-style)
11. [`tabindex`](#11-tabindex)
12. [`contenteditable`](#12-contenteditable)
13. [`spellcheck`](#13-spellcheck)
14. [`draggable`](#14-draggable)
15. [`translate`](#15-translate)
16. [`data-*`](#16-data)
17. [`accesskey`](#17-accesskey)
18. [`autofocus`](#18-autofocus)
19. [`inert`](#19-inert)
20. [`role`](#20-role)
21. [`aria-*`](#21-aria)
22. [Global attributes vs element-specific attributes](#22-global-attributes-vs-element-specific-attributes)
23. [`id` vs `class`](#23-id-vs-class)
24. [`title` vs visible text](#24-title-vs-visible-text)
25. [`hidden` vs CSS `display: none`](#25-hidden-vs-css-display-none)
26. [`data-*` та JavaScript](#26-data-та-javascript)
27. [`tabindex` та keyboard navigation](#27-tabindex-та-keyboard-navigation)
28. [`lang` та accessibility](#28-lang-та-accessibility)
29. [`dir` та міжнародні тексти](#29-dir-та-міжнародні-тексти)
30. [Global attributes та CSS](#30-global-attributes-та-css)
31. [Global attributes та JavaScript](#31-global-attributes-та-javascript)
32. [Типові помилки](#32-типові-помилки)
33. [Практичний приклад](#33-практичний-приклад)
34. [Практичні завдання](#34-практичні-завдання)
35. [Checklist](#35-checklist)
36. [Рівні знань](#36-рівні-знань)
37. [Питання для співбесіди](#37-питання-для-співбесіди)
38. [Mini Cheat Sheet](#38-mini-cheat-sheet)
39. [Ментальна модель](#39-ментальна-модель)
40. [Головне, що потрібно запам'ятати](#40-головне-що-потрібно-запамятати)

---

# 1. Що таке Global Attributes

**Global attributes** — це HTML-атрибути, які можуть використовуватися на більшості HTML-елементів.

Наприклад:

    <div id="app" class="container">
        ...
    </div>

Тут:

- `id` — ідентифікує елемент;
- `class` — визначає клас;
- `div` — HTML-елемент.

Інший приклад:

    <p
        id="description"
        class="text"
        title="Опис товару"
    >
        Текст
    </p>

Ті самі global attributes можна використовувати на різних елементах.

---

# 2. Чому вони називаються global

Global attributes не прив'язані до одного конкретного HTML-елемента.

Наприклад, `class` можна використовувати з:

    <div class="card">
        ...
    </div>

    <p class="text">
        ...
    </p>

    <button class="button">
        Зберегти
    </button>

    <article class="post">
        ...
    </article>

Тому `class` є global attribute.

Важливо:

> Global не означає, що кожен атрибут можна використовувати абсолютно без обмежень у будь-якому контексті.

Деякі global attributes мають додаткові правила, семантичні обмеження або практичні рекомендації.

---

# 3. Основні global attributes

Найважливіші global attributes:

| Attribute | Призначення |
|---|---|
| `id` | унікальний ідентифікатор |
| `class` | групування елементів |
| `title` | додаткова інформація |
| `lang` | мова контенту |
| `dir` | напрямок тексту |
| `hidden` | приховати елемент |
| `style` | inline CSS |
| `tabindex` | keyboard focus |
| `contenteditable` | редагування контенту |
| `spellcheck` | перевірка орфографії |
| `draggable` | можливість drag-and-drop |
| `translate` | дозвіл/заборона перекладу |
| `data-*` | custom data |
| `accesskey` | keyboard shortcut |
| `autofocus` | автоматичний focus |
| `inert` | зробити область неактивною |
| `role` | accessibility role |
| `aria-*` | accessibility information |

---

# 4. `id`

`id` задає унікальний ідентифікатор елемента.

    <h1 id="page-title">
        HTML
    </h1>

Основне правило:

> В межах одного HTML-документа `id` повинен бути унікальним.

Добре:

    <h1 id="page-title">
        HTML
    </h1>

    <section id="semantic-html">
        ...
    </section>

Погано:

    <h1 id="title">HTML</h1>
    <h2 id="title">CSS</h2>

## Використання з CSS

    #page-title {
        font-size: 2rem;
    }

## Використання з JavaScript

    const title = document.getElementById("page-title");

## Використання з fragment navigation

    <a href="#contacts">
        Контакти
    </a>

    <section id="contacts">
        <h2>Контакти</h2>
    </section>

---

# 5. `class`

`class` використовується для групування елементів.

    <p class="text">
        Перший текст
    </p>

    <p class="text">
        Другий текст
    </p>

Один елемент може мати декілька класів:

    <button class="button button-primary">
        Зберегти
    </button>

Класи часто використовуються для:

- CSS;
- JavaScript;
- компонентів;
- станів UI;
- повторного використання стилів.

Наприклад:

    <article class="card featured">
        ...
    </article>

Тут:

- `card` — базовий клас;
- `featured` — додатковий клас.

## `id` vs `class`

    id
    ↓
    конкретний унікальний елемент

    class
    ↓
    група елементів

---

# 6. `title`

`title` містить додаткову інформацію про елемент.

    <button title="Зберегти зміни">
        💾
    </button>

Або:

    <a
        href="/documentation"
        title="Перейти до документації"
    >
        Documentation
    </a>

Браузер може показати значення `title` як tooltip.

## Важливо

Не потрібно використовувати `title` як єдиний спосіб передачі важливої інформації.

Погано:

    <button title="Видалити">
        🗑️
    </button>

Користувач може не зрозуміти призначення кнопки або accessibility може бути недостатньою.

Краще:

    <button>
        Видалити
    </button>

`title` — додаткова інформація, а не заміна видимого тексту.

---

# 7. `lang`

`lang` визначає мову тексту.

    <html lang="uk">
        ...
    </html>

Для англійської:

    <html lang="en">
        ...
    </html>

Можна змінити мову для окремого фрагмента:

    <p lang="uk">
        Це український текст.
    </p>

    <p lang="en">
        This is English text.
    </p>

Це важливо для:

- screen readers;
- pronunciation;
- accessibility;
- browser language processing;
- search engines;
- spell checking;
- translation tools.

---

# 8. `dir`

`dir` визначає напрямок тексту.

Основні значення:

    dir="ltr"

    dir="rtl"

    dir="auto"

### `ltr`

Left-to-right.

    <p dir="ltr">
        English text
    </p>

### `rtl`

Right-to-left.

    <p dir="rtl">
        نص عربي
    </p>

### `auto`

Браузер визначає напрямок на основі контенту.

    <p dir="auto">
        ...
    </p>

Особливо важливий для:

- арабської;
- івриту;
- mixed-direction text.

---

# 9. `hidden`

`hidden` позначає елемент як прихований.

    <p hidden>
        Цей текст прихований.
    </p>

JavaScript:

    const message = document.querySelector("#message");

    message.hidden = false;

Приховати:

    message.hidden = true;

Це зручно для UI state.

Наприклад:

    <div id="loading">
        Loading...
    </div>

    <div id="content" hidden>
        Content
    </div>

Після завантаження JavaScript може зробити:

    loading.hidden = true;
    content.hidden = false;

---

# 10. `style`

`style` дозволяє задавати inline CSS.

    <p style="color: red;">
        Важливий текст
    </p>

Можна задавати декілька властивостей:

    <div
        style="
            padding: 1rem;
            margin: 1rem;
        "
    >
        Content
    </div>

## Переваги

- швидкий локальний стиль;
- корисний для динамічних значень;
- зручний у деяких JavaScript-driven сценаріях.

## Недоліки

- погіршує підтримуваність;
- змішує HTML і CSS;
- складніше перевикористовувати;
- складніше підтримувати великий проєкт.

Для великих проєктів зазвичай краще:

    <div class="card">
        ...
    </div>

    .card {
        padding: 1rem;
    }

---

# 11. `tabindex`

`tabindex` керує участю елемента в keyboard focus navigation.

Наприклад:

    <button tabindex="0">
        Зберегти
    </button>

Значення:

    tabindex="0"

означає, що елемент може отримувати focus у звичайному порядку keyboard navigation.

## `tabindex="-1"`

    <div tabindex="-1">
        ...
    </div>

Елемент може отримати focus програмно:

    element.focus();

але не повинен потрапляти до звичайної Tab-послідовності.

## Позитивні значення

Наприклад:

    tabindex="1"

    tabindex="2"

зазвичай не рекомендуються для звичайного UI.

Вони можуть створювати складний і неприродний порядок focus.

Краще використовувати native interactive elements:

    <button>
        Save
    </button>

    <a href="/about">
        About
    </a>

замість створення keyboard behavior вручну.

---

# 12. `contenteditable`

`contenteditable` дозволяє користувачу редагувати контент елемента.

    <p contenteditable="true">
        Цей текст можна редагувати.
    </p>

Або:

    <div contenteditable>
        Редагований контент
    </div>

З JavaScript:

    const editor = document.querySelector("#editor");

    console.log(editor.textContent);

Приклад простого редактора:

    <div
        id="editor"
        contenteditable="true"
    >
        Введіть текст...
    </div>

`contenteditable` може бути корисним для:

- простих редакторів;
- inline editing;
- навчальних проєктів;
- rich text interfaces.

Але повноцінний text editor потребує значно більшої логіки.

---

# 13. `spellcheck`

`spellcheck` визначає, чи повинен браузер перевіряти орфографію.

    <textarea spellcheck="true"></textarea>

Вимкнути:

    <textarea spellcheck="false"></textarea>

Також:

    <p contenteditable="true" spellcheck="true">
        Редагований текст
    </p>

Корисно для:

- текстових полів;
- редакторів;
- коментарів;
- повідомлень.

---

# 14. `draggable`

`draggable` визначає, чи може елемент бути перетягнутий.

    <div draggable="true">
        Перетягни мене
    </div>

JavaScript може обробляти drag events:

    element.addEventListener("dragstart", event => {
        console.log("Drag started");
    });

Типові події:

    dragstart
    drag
    dragend
    dragenter
    dragover
    dragleave
    drop

Важливо:

> `draggable` сам по собі не створює повноцінну систему drag-and-drop.

Для реальної поведінки зазвичай потрібен JavaScript.

---

# 15. `translate`

`translate` визначає, чи повинен текст елемента перекладатися інструментами перекладу.

Дозволити:

    <p translate="yes">
        Цей текст можна перекладати.
    </p>

Не перекладати:

    <span translate="no">
        MyBrand
    </span>

Це може бути корисно для:

- назв брендів;
- імен продуктів;
- API names;
- code identifiers;
- власних назв.

Наприклад:

    <p>
        Використовуйте
        <span translate="no">JavaScript</span>.
    </p>

---

# 16. `data-*`

`data-*` дозволяє зберігати custom data в HTML.

Наприклад:

    <button
        data-user-id="42"
        data-role="admin"
    >
        User
    </button>

Назва повинна починатися з:

    data-

Приклади:

    data-id
    data-user-id
    data-product-id
    data-category
    data-status

## Навіщо потрібні

Найчастіше для передачі невеликих значень між HTML та JavaScript.

Наприклад:

    <button
        class="delete-button"
        data-id="42"
    >
        Delete
    </button>

JavaScript:

    const button = document.querySelector(".delete-button");

    console.log(button.dataset.id);

Результат:

    "42"

---

# 17. `accesskey`

`accesskey` задає клавіатурний shortcut для елемента.

    <button accesskey="s">
        Save
    </button>

Але фактична комбінація клавіш залежить від браузера та операційної системи.

Через це `accesskey` потрібно використовувати обережно.

Проблеми:

- конфлікти з browser shortcuts;
- конфлікти з OS shortcuts;
- користувач може не знати про shortcut;
- різна поведінка в різних середовищах.

Тому для сучасних застосунків його використовують нечасто.

---

# 18. `autofocus`

`autofocus` автоматично встановлює focus на елемент після завантаження сторінки або появи відповідного контексту.

Наприклад:

    <input
        type="search"
        autofocus
    >

Корисно для:

- search pages;
- dialogs;
- forms.

Але не варто використовувати бездумно.

Автоматичний focus може:

- перемістити focus несподівано;
- завадити keyboard navigation;
- бути незручним для accessibility.

---

# 19. `inert`

`inert` робить область документа неактивною для взаємодії.

Наприклад:

    <main inert>
        ...
    </main>

Елементи всередині такої області не повинні бути доступними для звичайної взаємодії та focus.

Це особливо корисно для modal UI.

Наприклад:

    <main inert>
        Основний контент
    </main>

    <dialog open>
        Modal content
    </dialog>

Ідея:

    MAIN
      ↓
    inert

    DIALOG
      ↓
    active

Це допомагає правильно організувати взаємодію з modal interface.

---

# 20. `role`

`role` визначає accessibility role елемента.

Наприклад:

    <div role="status">
        Loading...
    </div>

Але важливо:

> Не потрібно використовувати `role`, якщо існує відповідний native HTML element.

Не:

    <div role="button">
        Save
    </div>

Краще:

    <button>
        Save
    </button>

Не:

    <div role="navigation">
        ...
    </div>

Краще:

    <nav>
        ...
    </nav>

---

# 21. `aria-*`

`aria-*` — атрибути для accessibility.

Наприклад:

    <button
        aria-label="Закрити"
    >
        ×
    </button>

Або:

    <button
        aria-expanded="false"
        aria-controls="menu"
    >
        Меню
    </button>

ARIA може описувати:

- стан;
- роль;
- зв'язки між елементами;
- доступні назви;
- повідомлення для assistive technologies.

Приклад:

    <button
        aria-expanded="false"
        aria-controls="navigation-menu"
    >
        Menu
    </button>

    <nav id="navigation-menu" hidden>
        ...
    </nav>

JavaScript може синхронізувати стан:

    button.setAttribute("aria-expanded", "true");

    menu.hidden = false;

Головне правило:

> Native HTML first, ARIA second.

---

# 22. Global attributes vs element-specific attributes

Не всі атрибути HTML є global.

## Global

    id
    class
    title
    lang
    dir
    hidden
    tabindex
    data-*

Вони можуть використовуватися на багатьох елементах.

## Element-specific

Наприклад, для `<img>`:

    <img
        src="/image.jpg"
        alt="Опис зображення"
    >

`src` та `alt` є атрибутами, пов'язаними з `<img>`.

Для `<input>`:

    <input
        type="email"
        name="email"
        required
    >

`type`, `name`, `required` мають особливе значення у формовому контексті.

Ментальна модель:

    GLOBAL
        ↓
    багато HTML-елементів

    ELEMENT-SPECIFIC
        ↓
    конкретний елемент / група елементів

---

# 23. `id` vs `class`

Це одна з найважливіших відмінностей.

## `id`

Унікальний:

    <section id="about">
        ...
    </section>

## `class`

Може повторюватися:

    <article class="card">
        ...
    </article>

    <article class="card">
        ...
    </article>

## CSS

    #about {
        ...
    }

    .card {
        ...
    }

## JavaScript

    document.getElementById("about");

    document.querySelectorAll(".card");

Ментальна модель:

    id
    ↓
    ONE

    class
    ↓
    MANY

---

# 24. `title` vs visible text

Не слід ховати основну інформацію в `title`.

Погано:

    <button title="Відправити форму">
        📤
    </button>

Краще:

    <button>
        Відправити форму
    </button>

Або, якщо дизайн вимагає icon-only button:

    <button aria-label="Відправити форму">
        📤
    </button>

`title`:

    додаткова інформація

`aria-label`:

    accessible name

visible text:

    інформація для користувача

---

# 25. `hidden` vs CSS `display: none`

Можна приховати елемент через:

    <div hidden>
        Content
    </div>

або CSS:

    .hidden {
        display: none;
    }

    <div class="hidden">
        Content
    </div>

Обидва способи можуть призвести до того, що елемент не відображається.

Але вони мають різний рівень семантики.

`hidden` прямо виражає:

> цей контент зараз не є частиною представленого документа.

CSS `display: none` говорить переважно:

> цей елемент не повинен відображатися.

Для UI state `hidden` часто є дуже зручним HTML-механізмом.

---

# 26. `data-*` та JavaScript

Приклад:

    <button
        class="product"
        data-product-id="123"
        data-category="books"
    >
        Купити
    </button>

JavaScript:

    const product = document.querySelector(".product");

    console.log(product.dataset.productId);
    console.log(product.dataset.category);

Результат:

    "123"
    "books"

## Перетворення імен

HTML:

    data-user-id

JavaScript:

    element.dataset.userId

HTML:

    data-product-name

JavaScript:

    element.dataset.productName

Ментальна модель:

    data-user-id
          ↓
    dataset.userId

---

# 27. `tabindex` та keyboard navigation

Keyboard navigation — важлива частина accessibility.

Нативні елементи вже мають відповідну поведінку.

Наприклад:

    <button>
        Save
    </button>

    <a href="/about">
        About
    </a>

Не потрібно без необхідності робити:

    <div tabindex="0">
        Save
    </div>

А потім вручну реалізовувати:

- Enter;
- Space;
- focus;
- keyboard events;
- accessibility semantics.

Краще використати:

    <button>
        Save
    </button>

Правило:

> Якщо потрібен button — використовуй `<button>`, а не `<div tabindex="0">`.

---

# 28. `lang` та accessibility

Правильний `lang` допомагає screen readers правильно вимовляти текст.

Наприклад:

    <html lang="uk">

    <p>
        Це український текст.
    </p>

Для англійської частини:

    <p lang="en">
        This is English text.
    </p>

Це особливо важливо для документів із декількома мовами.

---

# 29. `dir` та міжнародні тексти

Для тексту з різними напрямками:

    <p dir="ltr">
        English
    </p>

    <p dir="rtl">
        العربية
    </p>

У складних випадках можна використовувати:

    <bdi>
        ...
    </bdi>

та:

    <bdo dir="rtl">
        ...
    </bdo>

Ці елементи допомагають працювати з bidirectional text.

---

# 30. Global attributes та CSS

Деякі global attributes часто взаємодіють із CSS.

Наприклад:

    <div
        id="app"
        class="container"
    >
        ...
    </div>

CSS:

    #app {
        min-height: 100vh;
    }

    .container {
        max-width: 1200px;
        margin: 0 auto;
    }

Можна стилізувати елементи за `data-*`:

    <button data-state="active">
        Active
    </button>

CSS:

    [data-state="active"] {
        font-weight: bold;
    }

Але для основної CSS-архітектури краще використовувати зрозумілі класи, якщо `data-*` не має окремого семантичного призначення.

---

# 31. Global attributes та JavaScript

JavaScript активно працює з global attributes.

## `id`

    const app = document.getElementById("app");

## `class`

    element.classList.add("active");

    element.classList.remove("active");

    element.classList.toggle("active");

## `data-*`

    element.dataset.userId;

## `hidden`

    element.hidden = true;

## `title`

    element.title = "Additional information";

## `lang`

    element.lang = "en";

## `tabindex`

    element.tabIndex = -1;

Таким чином:

    HTML
      ↓
    attributes
      ↓
    DOM
      ↓
    JavaScript

---

# 32. Типові помилки

## Помилка 1 — дублювання `id`

Погано:

    <div id="card">...</div>
    <div id="card">...</div>

`id` повинен бути унікальним.

---

## Помилка 2 — використовувати `id` замість `class` для повторюваних елементів

Погано:

    <article id="card">...</article>
    <article id="card">...</article>

Краще:

    <article class="card">...</article>
    <article class="card">...</article>

---

## Помилка 3 — занадто багато inline styles

Погано:

    <div
        style="
            color: red;
            padding: 20px;
            margin: 10px;
            font-size: 20px;
        "
    >
        ...
    </div>

Для великого проєкту краще:

    <div class="card">
        ...
    </div>

---

## Помилка 4 — використовувати `title` для критично важливої інформації

Не потрібно:

    <button title="Видалити">
        🗑
    </button>

як єдиний спосіб пояснити призначення кнопки.

---

## Помилка 5 — надмірне використання `tabindex`

Не потрібно:

    <div tabindex="1">First</div>
    <div tabindex="2">Second</div>
    <div tabindex="3">Third</div>

Це може створити складну та неприродну keyboard navigation.

---

## Помилка 6 — ARIA замість native HTML

Погано:

    <div
        role="button"
        tabindex="0"
    >
        Save
    </div>

Краще:

    <button>
        Save
    </button>

---

## Помилка 7 — неправильні `data-*`

Погано:

    <div data="123">
        ...
    </div>

Краще:

    <div data-id="123">
        ...
    </div>

---

## Помилка 8 — використовувати `data-*` для всього

Не потрібно перетворювати HTML на сховище всіх даних застосунку.

Погано:

    <article
        data-id="42"
        data-user="123"
        data-name="John"
        data-email="john@example.com"
        data-role="admin"
        data-created="2026-09-08"
    >
        ...
    </article>

`data-*` краще використовувати для невеликих значень, які справді потрібні в DOM.

---

# 33. Практичний приклад

Розглянемо картку товару:

    <article
        id="product-42"
        class="product-card"
        data-product-id="42"
        data-category="books"
        lang="uk"
    >

        <h2 class="product-card__title">
            HTML для початківців
        </h2>

        <p class="product-card__description">
            Практичний курс HTML.
        </p>

        <button
            class="product-card__button"
            type="button"
            aria-label="Додати HTML для початківців до кошика"
        >
            Додати до кошика
        </button>

    </article>

Тут:

    id
    ↓
    унікальний продукт

    class
    ↓
    CSS/component styling

    data-product-id
    ↓
    дані для JavaScript

    data-category
    ↓
    категорія

    lang
    ↓
    мова

    aria-label
    ↓
    accessibility

---

# 34. Практичні завдання

## Завдання 1 — `id` та `class`

Створи:

- один унікальний `id`;
- декілька однакових `class`.

    <section id="products">
        ...
    </section>

    <article class="card">
        ...
    </article>

    <article class="card">
        ...
    </article>

---

## Завдання 2 — Navigation

Створи navigation із:

- `id`;
- `class`;
- `aria-label`.

    <nav
        id="main-navigation"
        class="navigation"
        aria-label="Головна навігація"
    >
        ...
    </nav>

---

## Завдання 3 — `data-*`

Створи список товарів:

    <article data-product-id="1">
        Product 1
    </article>

    <article data-product-id="2">
        Product 2
    </article>

Потім через JavaScript отримай `product-id`.

---

## Завдання 4 — `hidden`

Створи loading state:

    <div id="loading">
        Loading...
    </div>

    <main id="content" hidden>
        Content
    </main>

Через JavaScript перемикай:

    loading.hidden = true;
    content.hidden = false;

---

## Завдання 5 — `contenteditable`

Створи простий editable block:

    <div
        id="editor"
        contenteditable="true"
        spellcheck="true"
    >
        Редагуйте цей текст.
    </div>

Через JavaScript виведи його текст:

    console.log(editor.textContent);

---

## Завдання 6 — Accessibility

Знайди помилки:

    <div
        role="button"
        tabindex="0"
    >
        Delete
    </div>

Перепиши з використанням native HTML.

Правильний варіант:

    <button>
        Delete
    </button>

---

## Завдання 7 — Semantic + Global Attributes

Створи статтю:

    <article
        class="article"
        data-id="101"
        lang="uk"
    >

        <header>
            <h1 id="article-title">
                Semantic HTML
            </h1>
        </header>

        <p>
            ...
        </p>

        <footer>
            ...
        </footer>

    </article>

---

# 35. Checklist

## `id`

- [ ] `id` унікальний.
- [ ] Не використовується для повторюваних елементів.
- [ ] Значення зрозуміле.

## `class`

- [ ] Використовується для групування.
- [ ] Може повторюватися.
- [ ] Не використовується як унікальний ідентифікатор.

## `lang`

- [ ] Основна мова задана на `<html>`.
- [ ] Для іншомовних фрагментів можна задавати локальний `lang`.

## `data-*`

- [ ] Використовується для невеликих custom data.
- [ ] Назви починаються з `data-`.
- [ ] JavaScript використовує `dataset`.

## Accessibility

- [ ] Native HTML використовується перед ARIA.
- [ ] `tabindex` не використовується без потреби.
- [ ] `title` не є єдиним джерелом важливої інформації.
- [ ] `lang` заданий правильно.

## CSS

- [ ] Inline `style` не використовується без необхідності.
- [ ] Основні стилі винесені в CSS.
- [ ] `class` використовується для стилізації.

## JavaScript

- [ ] `id` використовується для унікальних елементів.
- [ ] `data-*` використовується для DOM data.
- [ ] Global attributes можуть змінюватися через DOM API.

---

# 36. Рівні знань

## 🟢 Core

Потрібно знати:

- `id`;
- `class`;
- `title`;
- `lang`;
- `hidden`;
- `data-*`;
- різницю `id` та `class`.

---

## 🟡 Junior

Потрібно розуміти:

- `dir`;
- `tabindex`;
- `contenteditable`;
- `spellcheck`;
- `translate`;
- `style`;
- `dataset`;
- basic accessibility attributes.

---

## 🟠 Middle

Потрібно розуміти:

- keyboard navigation;
- focus management;
- `tabindex="-1"`;
- `inert`;
- `role`;
- ARIA;
- DOM attributes;
- data attributes;
- accessibility implications.

---

## 🔴 Senior

Потрібно вміти:

- проектувати доступну HTML-структуру;
- мінімізувати зайві ARIA;
- правильно керувати focus;
- працювати з complex interactive components;
- проектувати DOM data boundaries;
- розуміти interaction між HTML, CSS, JavaScript та accessibility APIs;
- уникати semantic та accessibility overengineering.

---

# 37. Питання для співбесіди

### 1. Що таке global attributes?

Атрибути, які можуть застосовуватися до більшості HTML-елементів.

---

### 2. Чим `id` відрізняється від `class`?

`id` повинен ідентифікувати унікальний елемент.

`class` може бути застосований до багатьох елементів.

---

### 3. Для чого потрібен `data-*`?

Для зберігання невеликих custom data безпосередньо в HTML/DOM.

---

### 4. Як отримати `data-user-id` через JavaScript?

HTML:

    <button data-user-id="42">
        User
    </button>

JavaScript:

    const button = document.querySelector("button");

    console.log(button.dataset.userId);

---

### 5. Для чого потрібен `lang`?

Для визначення мови контенту, що важливо зокрема для accessibility та мовної обробки.

---

### 6. Для чого потрібен `tabindex`?

Для керування keyboard focus behavior.

---

### 7. Чому `tabindex="1"` часто не рекомендується?

Позитивні значення можуть створювати складний і неприродний порядок keyboard navigation.

---

### 8. Чим `hidden` відрізняється від `display: none`?

`hidden` є HTML-механізмом, який семантично позначає елемент як прихований.

`display: none` — CSS-механізм приховування.

---

### 9. Чи можна використовувати `role="button"`?

Так, але якщо можна використати native `<button>`, це зазвичай кращий варіант.

---

### 10. Чи потрібно використовувати ARIA для кожного interactive element?

Ні.

Native HTML має перевагу.

---

### 11. Що робить `contenteditable`?

Дозволяє користувачу редагувати вміст елемента безпосередньо в браузері.

---

### 12. Для чого потрібен `inert`?

Щоб зробити частину документа неактивною для взаємодії та focus, наприклад під час роботи modal interface.

---

### 13. Чи можна використовувати `style`?

Так.

Але в масштабних проєктах основні стилі зазвичай краще організовувати через CSS classes та інші CSS-механізми.

---

# 38. Mini Cheat Sheet

| Attribute | Значення |
|---|---|
| `id` | унікальний ID |
| `class` | CSS/логічна група |
| `title` | додаткова інформація |
| `lang` | мова |
| `dir` | напрямок тексту |
| `hidden` | прихований елемент |
| `style` | inline CSS |
| `tabindex` | keyboard focus |
| `contenteditable` | редагований контент |
| `spellcheck` | перевірка орфографії |
| `draggable` | drag behavior |
| `translate` | переклад |
| `data-*` | custom data |
| `accesskey` | keyboard shortcut |
| `autofocus` | автоматичний focus |
| `inert` | неактивна область |
| `role` | accessibility role |
| `aria-*` | accessibility metadata |

---

# 39. Ментальна модель

Запам'ятай global attributes через їхні ролі.

    IDENTIFICATION
        ↓
    id
    class

    LANGUAGE
        ↓
    lang
    dir
    translate

    VISIBILITY
        ↓
    hidden

    STYLING
        ↓
    style

    KEYBOARD
        ↓
    tabindex
    accesskey
    autofocus

    EDITING
        ↓
    contenteditable
    spellcheck

    DRAGGING
        ↓
    draggable

    CUSTOM DATA
        ↓
    data-*

    ACCESSIBILITY
        ↓
    role
    aria-*
    inert

Можна запам'ятати ще простіше:

    id
        → ХТО?

    class
        → ДО ЯКОЇ ГРУПИ НАЛЕЖИТЬ?

    title
        → ДОДАТКОВА ІНФОРМАЦІЯ

    lang
        → ЯКОЮ МОВОЮ?

    dir
        → У ЯКОМУ НАПРЯМКУ?

    hidden
        → ПОКАЗУВАТИ ЧИ НІ?

    data-*
        → ЯКІ ДОДАТКОВІ ДАНІ?

    tabindex
        → ЯК ОТРИМУЄ FOCUS?

    role / aria-*
        → ЯК ЦЕ СПРИЙМАЄ ACCESSIBILITY TECHNOLOGY?

---

# 40. Головне, що потрібно запам'ятати

## 1. Global attributes працюють на багатьох HTML-елементах

Наприклад:

    <div id="app" class="container">
        ...
    </div>

    <article id="post" class="container">
        ...
    </article>

---

## 2. `id` — унікальність

    <section id="about">
        ...
    </section>

Модель:

    id → ONE

---

## 3. `class` — групування

    <div class="card">...</div>
    <div class="card">...</div>

Модель:

    class → MANY

---

## 4. `data-*` — місток між HTML та JavaScript

    <button data-id="42">
        Delete
    </button>

    button.dataset.id

---

## 5. `lang` має значення для accessibility

    <html lang="uk">

---

## 6. `tabindex` потрібно використовувати обережно

Особливо уникай без необхідності:

    tabindex="1"
    tabindex="2"
    tabindex="3"

Нативні `<button>`, `<a>`, `<input>` тощо вже мають правильну keyboard behavior.

---

## 7. `hidden` зручний для UI state

    <div id="loading">
        Loading...
    </div>

    <main id="content" hidden>
        Content
    </main>

---

## 8. `style` не є забороненим

Але:

    HTML
       ↓
    structure

    CSS
       ↓
    presentation

Тому для великих проєктів основні стилі краще тримати в CSS.

---

## 9. Native HTML важливіший за ARIA

Не:

    <div role="button">
        Save
    </div>

Краще:

    <button>
        Save
    </button>

---

## 10. `data-*` — не база даних

Не потрібно зберігати весь стан застосунку в HTML.

`data-*` призначений для невеликих значень, які повинні бути доступні в DOM.

---

## 11. Global attributes допомагають зв'язати HTML з іншими частинами frontend

Можна мислити так:

    HTML
      │
      ├── id
      ├── class
      ├── data-*
      ├── lang
      ├── hidden
      ├── tabindex
      └── aria-*
            │
            ↓
        CSS / JavaScript / Accessibility

---

## 12. Найважливіші для Junior

Якщо потрібно запам'ятати мінімум:

    id
    class
    title
    lang
    hidden
    data-*
    tabindex

А з accessibility:

    role
    aria-*

Головна формула:

> **Global attributes = спільні властивості HTML-елементів, які допомагають ідентифікувати, групувати, описувати, приховувати, локалізувати та керувати взаємодією з елементами.**