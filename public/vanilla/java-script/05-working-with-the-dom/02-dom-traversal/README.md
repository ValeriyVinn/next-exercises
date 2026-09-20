# 02. DOM Traversal

DOM Traversal (навігація по DOM) — це переміщення від одного DOM node або element до іншого всередині DOM tree.

Після того як ми знайшли element, часто потрібно отримати пов'язані з ним elements:

    parent
    child
    sibling
    first child
    last child
    previous sibling
    next sibling

Наприклад, маємо:

    <div class="card">
        <h2>Phone</h2>
        <p>Description</p>
        <button>Buy</button>
    </div>

Якщо ми отримали:

    const card = document.querySelector(".card");

ми можемо перейти від `card` до:

    parent
    children
    h2
    p
    button
    previous sibling
    next sibling

DOM Traversal особливо важливий, коли потрібно працювати зі структурою DOM, а не шукати кожен element через окремий CSS selector.

---

### Ключові поняття

✔ DOM traversal  
✔ DOM tree  
✔ node  
✔ element  
✔ parent  
✔ child  
✔ children  
✔ sibling  
✔ descendant  
✔ ancestor  
✔ `parentNode`  
✔ `parentElement`  
✔ `childNodes`  
✔ `children`  
✔ `firstChild`  
✔ `lastChild`  
✔ `firstElementChild`  
✔ `lastElementChild`  
✔ `nextSibling`  
✔ `previousSibling`  
✔ `nextElementSibling`  
✔ `previousElementSibling`  
✔ `hasChildNodes()`  
✔ `closest()`  
✔ `matches()`  
✔ `contains()`  
✔ `Node`  
✔ `Element`  
✔ text node  
✔ comment node  
✔ whitespace  
✔ DOM hierarchy  

---

### Що потрібно пам'ятати

• DOM — це ієрархічне дерево nodes.

• Element може мати:

    parent
    children
    siblings

• `parentElement` повертає батьківський Element.

• `parentNode` повертає батьківський Node.

• `children` повертає тільки child elements.

• `childNodes` повертає всі child nodes, включно з text nodes та comment nodes.

• `firstElementChild` повертає перший child element.

• `lastElementChild` повертає останній child element.

• `firstChild` може повернути text node.

• `lastChild` може повернути text node.

• `nextElementSibling` переходить до наступного sibling element.

• `previousElementSibling` переходить до попереднього sibling element.

• `nextSibling` та `previousSibling` працюють з nodes, а не тільки з elements.

• Пробіли та переноси рядків у HTML можуть створювати text nodes.

• `closest()` шукає найближчого ancestor element, який відповідає selector.

• `matches()` перевіряє, чи відповідає element CSS selector.

• `contains()` перевіряє, чи знаходиться один node всередині іншого.

• Для повсякденної роботи найчастіше потрібні:

    parentElement
    children
    firstElementChild
    lastElementChild
    nextElementSibling
    previousElementSibling
    closest()

---

# DOM Tree

DOM представляє HTML як дерево.

Наприклад:

    <main>
        <section>
            <h1>Hello</h1>
            <p>Text</p>
        </section>
    </main>

Спрощено:

    main
      │
      └── section
          ├── h1
          └── p

Тут:

    main
        → parent для section

    section
        → parent для h1
        → parent для p

    h1
        → sibling для p

    p
        → sibling для h1

---

# Parent

Parent — це безпосередній батьківський node або element.

HTML:

    <div class="card">
        <h2>Phone</h2>
    </div>

Для `<h2>`:

    div.card
        ↓
    h2

`div` є parent для `h2`.

---

# Child

Child — це безпосередній дочірній node або element.

HTML:

    <div class="card">
        <h2>Phone</h2>
        <p>Description</p>
    </div>

Для `div`:

    h2
    p

є його children.

---

# Sibling

Sibling — це nodes або elements, які мають одного parent.

HTML:

    <ul>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ul>

Усі `<li>` мають одного parent:

    ul

Тому:

    li One
    li Two
    li Three

є siblings.

---

# Descendant

Descendant — будь-який node або element, який знаходиться всередині іншого element на будь-якому рівні.

HTML:

    <div class="card">
        <section>
            <h2>Phone</h2>
        </section>
    </div>

Тут:

    section

є descendant `div`.

Також:

    h2

є descendant `div`.

Але:

    h2

не є direct child `div`.

Його direct parent:

    section

---

# Ancestor

Ancestor — element, який знаходиться вище в DOM tree.

Наприклад:

    <div>
        <section>
            <article>
                <h2>Title</h2>
            </article>
        </section>
    </div>

Для `h2` ancestors:

    article
    section
    div

---

# parentElement

`parentElement` повертає батьківський Element.

HTML:

    <div class="card">
        <h2 class="title">
            Phone
        </h2>
    </div>

JavaScript:

    const title =
        document.querySelector(".title");

    const parent =
        title.parentElement;

Результат:

    <div class="card">
        ...
    </div>

---

# parentElement Example

    const title =
        document.querySelector(".title");

    console.log(title.parentElement);

---

# parentElement може бути null

Якщо element не має батьківського Element, результат:

    null

Наприклад, для кореневого `<html>`:

    document.documentElement.parentElement

результат:

    null

---

# parentNode

`parentNode` повертає parent Node.

Наприклад:

    const title =
        document.querySelector(".title");

    const parent =
        title.parentNode;

У типовому HTML випадку результатом також буде:

    Element

---

# parentElement vs parentNode

Основна різниця:

    parentElement
        → parent Element

    parentNode
        → parent Node

Наприклад:

    const title =
        document.querySelector(".title");

    console.log(title.parentElement);

    console.log(title.parentNode);

У звичайному HTML для більшості elements вони часто повертають один і той самий `<div>`.

Для повсякденної роботи з HTML elements частіше використовується:

    parentElement

---

# children

`children` повертає колекцію child elements.

HTML:

    <div class="card">
        <h2>Phone</h2>
        <p>Description</p>
        <button>Buy</button>
    </div>

JavaScript:

    const card =
        document.querySelector(".card");

    console.log(card.children);

Результат містить:

    h2
    p
    button

---

# children не включає text nodes

HTML:

    <div class="card">

        <h2>Phone</h2>

        <p>Description</p>

    </div>

Пробіли та переноси рядків створюють text nodes.

Але:

    card.children

повертає тільки elements:

    h2
    p

Text nodes не входять до `children`.

---

# children.length

Можна отримати кількість child elements:

    const card =
        document.querySelector(".card");

    console.log(card.children.length);

Наприклад:

    3

---

# children[index]

Можна отримати child element за index.

    const card =
        document.querySelector(".card");

    const firstChild =
        card.children[0];

---

### Приклад

    const card =
        document.querySelector(".card");

    console.log(card.children[0]);

    console.log(card.children[1]);

    console.log(card.children[2]);

---

# firstElementChild

`firstElementChild` повертає перший child element.

HTML:

    <div class="card">
        <h2>Phone</h2>
        <p>Description</p>
        <button>Buy</button>
    </div>

JavaScript:

    const card =
        document.querySelector(".card");

    const first =
        card.firstElementChild;

Результат:

    <h2>Phone</h2>

---

# lastElementChild

`lastElementChild` повертає останній child element.

    const card =
        document.querySelector(".card");

    const last =
        card.lastElementChild;

Результат:

    <button>Buy</button>

---

# firstElementChild vs children[0]

Обидва можуть отримати перший child element.

    card.firstElementChild

або:

    card.children[0]

Для першого child часто зручніше:

    firstElementChild

---

# lastElementChild vs children[length - 1]

Обидва можуть отримати останній child element.

    card.lastElementChild

або:

    card.children[card.children.length - 1]

Перший варіант значно читабельніший:

    card.lastElementChild

---

# firstChild

`firstChild` повертає перший child Node.

Це важлива відмінність.

HTML:

    <div class="card">
        <h2>Phone</h2>
    </div>

Через форматування HTML першим child node може бути text node:

    "\n        "

Тому:

    card.firstChild

може бути:

    Text

а не:

    h2

---

# firstChild vs firstElementChild

Це одна з найважливіших відмінностей DOM Traversal.

    firstChild
        → first Node

    firstElementChild
        → first Element

Наприклад:

    <div>

        <h2>Phone</h2>

    </div>

Може бути:

    firstChild
        → Text node

    firstElementChild
        → h2

---

# lastChild

`lastChild` повертає останній child Node.

Він також може бути:

    Element
    Text
    Comment

Наприклад, через whitespace:

    card.lastChild

може бути:

    Text node

---

# lastChild vs lastElementChild

    lastChild
        → last Node

    lastElementChild
        → last Element

Тому для роботи саме з HTML elements частіше використовують:

    lastElementChild

---

# childNodes

`childNodes` повертає всі child nodes.

HTML:

    <div class="card">

        <h2>Phone</h2>

        <p>Description</p>

    </div>

`childNodes` може містити:

    Text
    h2
    Text
    p
    Text

Тобто:

    childNodes
        → all child nodes

---

# childNodes vs children

Це дуже важлива різниця.

    childNodes
        → всі child nodes

    children
        → тільки child elements

Наприклад:

    const card =
        document.querySelector(".card");

    console.log(card.childNodes);

    console.log(card.children);

---

# Node Types

DOM може містити різні типи nodes.

Основні:

    Document
    Element
    Text
    Comment

Наприклад:

    <div>Hello</div>

Можна уявити:

    Element: div
        │
        └── Text: "Hello"

---

# Text Node

Текст усередині HTML element представлений як text node.

HTML:

    <p>Hello</p>

Структура:

    p
      │
      └── Text("Hello")

Тому:

    p.firstChild

може бути text node.

---

# Comment Node

HTML comment також є node.

    <div>
        <!-- comment -->
        <p>Hello</p>
    </div>

Comment:

    <!-- comment -->

є:

    Comment node

Тому `childNodes` може включати comments.

---

# Whitespace Text Nodes

Це важлива особливість DOM.

HTML:

    <div>
        <h2>Title</h2>
        <p>Text</p>
    </div>

Переноси рядків та пробіли між elements можуть створювати text nodes.

Умовно:

    div
    │
    ├── Text("\n    ")
    ├── h2
    ├── Text("\n    ")
    ├── p
    └── Text("\n")

Тому:

    firstChild

може бути Text.

А:

    firstElementChild

буде:

    h2

---

# nextElementSibling

`nextElementSibling` повертає наступний sibling element.

HTML:

    <ul>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ul>

JavaScript:

    const firstItem =
        document.querySelector("li");

    const next =
        firstItem.nextElementSibling;

Результат:

    <li>Two</li>

---

# nextElementSibling Example

    const firstItem =
        document.querySelector("li");

    console.log(
        firstItem.nextElementSibling
    );

---

# previousElementSibling

`previousElementSibling` повертає попередній sibling element.

HTML:

    <ul>
        <li>One</li>
        <li>Two</li>
        <li>Three</li>
    </ul>

JavaScript:

    const secondItem =
        document.querySelectorAll("li")[1];

    const previous =
        secondItem.previousElementSibling;

Результат:

    <li>One</li>

---

# nextElementSibling vs nextSibling

    nextElementSibling
        → next Element

    nextSibling
        → next Node

Якщо між elements є whitespace:

    nextSibling

може бути:

    Text node

а:

    nextElementSibling

ігнорує text nodes і переходить до наступного Element.

---

# previousElementSibling vs previousSibling

    previousElementSibling
        → previous Element

    previousSibling
        → previous Node

Для роботи з HTML elements зазвичай зручніше:

    previousElementSibling

---

# First Sibling

Для першого element у групі:

    element.previousElementSibling

може бути:

    null

Наприклад:

    const first =
        document.querySelector("li");

    console.log(
        first.previousElementSibling
    );

Результат:

    null

---

# Last Sibling

Для останнього element:

    element.nextElementSibling

може бути:

    null

Наприклад:

    const items =
        document.querySelectorAll("li");

    const last =
        items[items.length - 1];

    console.log(
        last.nextElementSibling
    );

Результат:

    null

---

# hasChildNodes()

`hasChildNodes()` перевіряє, чи має Node хоча б одного child node.

HTML:

    <div class="card">
        <p>Hello</p>
    </div>

JavaScript:

    const card =
        document.querySelector(".card");

    console.log(card.hasChildNodes());

Результат:

    true

---

### Empty element

    <div class="card"></div>

    const card =
        document.querySelector(".card");

    console.log(card.hasChildNodes());

Результат:

    false

---

# hasChildNodes() та whitespace

Потрібно пам'ятати, що `hasChildNodes()` перевіряє саме nodes.

Наприклад:

    <div>

    </div>

Між відкриваючим та закриваючим тегом може існувати text node з whitespace.

Тому:

    hasChildNodes()

може повернути:

    true

навіть якщо всередині немає жодного HTML element.

Якщо потрібно перевірити саме child elements, краще:

    element.children.length > 0

---

# closest()

`closest()` шукає найближчий ancestor element, який відповідає CSS selector.

HTML:

    <article class="card">
        <button class="delete">
            Delete
        </button>
    </article>

JavaScript:

    const button =
        document.querySelector(".delete");

    const card =
        button.closest(".card");

Результат:

    <article class="card">
        ...
    </article>

---

# closest() включає сам element

Це важлива особливість.

Якщо element сам відповідає selector:

    const card =
        document.querySelector(".card");

    const result =
        card.closest(".card");

Результат:

    card

Тобто `closest()` перевіряє:

    current element
        ↓
    parent
        ↓
    parent
        ↓
    ...

---

# closest() пошук вгору

Наприклад:

    button
      ↑
    article
      ↑
    section
      ↑
    main

Якщо:

    button.closest("section")

пошук відбувається:

    button
       ↓
    article
       ↓
    section
       ↓
    found

---

# closest() якщо нічого не знайдено

Якщо matching ancestor не існує:

    null

Наприклад:

    const button =
        document.querySelector(".button");

    const form =
        button.closest("form");

Якщо button не знаходиться всередині form:

    null

---

# matches()

`matches()` перевіряє, чи відповідає element CSS selector.

Наприклад:

    const button =
        document.querySelector(".button");

    console.log(
        button.matches(".button")
    );

Результат:

    true

---

### Інший selector

    console.log(
        button.matches(".card")
    );

Результат:

    false

---

# matches() Practical Example

    const element =
        document.querySelector(".item");

    if (element.matches(".active")) {
        console.log("Active");
    }

`matches()` не шукає element.

Він перевіряє:

    чи відповідає цей element selector?

---

# contains()

`contains()` перевіряє, чи містить один Node інший Node.

HTML:

    <div class="card">
        <button>Buy</button>
    </div>

JavaScript:

    const card =
        document.querySelector(".card");

    const button =
        document.querySelector("button");

    console.log(
        card.contains(button)
    );

Результат:

    true

---

# contains() Example

    const card =
        document.querySelector(".card");

    const title =
        document.querySelector("h2");

    if (card.contains(title)) {
        console.log("Title is inside card");
    }

---

# contains() та сам element

Element також вважається таким, що містить самого себе.

Наприклад:

    const card =
        document.querySelector(".card");

    card.contains(card);

Результат:

    true

---

# DOM Traversal Pattern

Типова навігація:

    element
       │
       ├── parent
       │
       ├── children
       │
       ├── first child
       │
       ├── last child
       │
       ├── previous sibling
       │
       └── next sibling

Наприклад:

    const item =
        document.querySelector(".item");

    const parent =
        item.parentElement;

    const next =
        item.nextElementSibling;

    const previous =
        item.previousElementSibling;

---

# DOM Traversal Example

HTML:

    <ul class="menu">
        <li class="item">Home</li>
        <li class="item active">About</li>
        <li class="item">Contact</li>
    </ul>

JavaScript:

    const activeItem =
        document.querySelector(".active");

    const parent =
        activeItem.parentElement;

    const previous =
        activeItem.previousElementSibling;

    const next =
        activeItem.nextElementSibling;

Отримуємо:

    parent
        → ul.menu

    previous
        → Home

    next
        → Contact

---

# Traversing Up

Рух вгору DOM tree:

    element
       ↑
    parentElement
       ↑
    parentElement
       ↑
    parentElement

Наприклад:

    const button =
        document.querySelector("button");

    const article =
        button.parentElement;

    const section =
        article.parentElement;

---

# Traversing Down

Рух вниз:

    element
       ↓
    children
       ↓
    child element
       ↓
    children
       ↓
    descendants

Наприклад:

    const card =
        document.querySelector(".card");

    const first =
        card.firstElementChild;

---

# Traversing Sideways

Рух між siblings:

    previous
       ←
    current
       →
    next

Наприклад:

    const item =
        document.querySelector(".active");

    const previous =
        item.previousElementSibling;

    const next =
        item.nextElementSibling;

---

# Traversal Direction

Можна запам'ятати так:

    parentElement
        ↑
        │
    current
        │
        ↓
    children

А горизонтально:

    previousSibling
        ←
    current
        →
    nextSibling

---

# Element Traversal vs Node Traversal

Є дві групи properties.

### Node traversal

    parentNode
    childNodes
    firstChild
    lastChild
    nextSibling
    previousSibling

Працюють з:

    Nodes

---

### Element traversal

    parentElement
    children
    firstElementChild
    lastElementChild
    nextElementSibling
    previousElementSibling

Працюють з:

    Elements

Для типового HTML-коду часто зручніші element-based properties.

---

# Node vs Element

Важливо не плутати:

    Node

та:

    Element

`Element` є одним із типів `Node`.

Спрощено:

    Node
    ├── Element
    ├── Text
    ├── Comment
    └── ...

Тому:

    childNodes

може містити:

    Element
    Text
    Comment

А:

    children

містить тільки:

    Element

---

# Practical Comparison

HTML:

    <div class="card">

        <h2>Title</h2>

        <p>Text</p>

    </div>

Для:

    card.childNodes

можемо отримати:

    Text
    h2
    Text
    p
    Text

Для:

    card.children

отримаємо:

    h2
    p

---

# Traversal Without New Selectors

DOM traversal дозволяє знаходити пов'язані elements без нового CSS selector.

Наприклад:

    const button =
        document.querySelector(".button");

    const card =
        button.parentElement;

Замість:

    document.querySelector(".card");

Це особливо корисно, коли HTML структура визначає зв'язок між elements.

---

# Traversal in Components

HTML:

    <article class="card">
        <h2 class="title">
            Phone
        </h2>

        <button class="delete">
            Delete
        </button>
    </article>

JavaScript:

    const button =
        document.querySelector(".delete");

    const card =
        button.closest(".card");

Це часто надійніше, ніж шукати card глобально через:

    document.querySelector(".card");

особливо коли на сторінці багато cards.

---

# closest() vs parentElement

`parentElement` переходить рівно на один рівень:

    button.parentElement

`closest()` шукає вгору до першого matching element:

    button.closest(".card")

Наприклад:

    card
      ↓
    section
      ↓
    div
      ↓
    button

Тоді:

    button.parentElement

дасть:

    div

А:

    button.closest(".card")

дасть:

    card

---

# Practical Example — Card

HTML:

    <article class="card">
        <div class="content">
            <h2>Phone</h2>
            <button class="buy">
                Buy
            </button>
        </div>
    </article>

JavaScript:

    const button =
        document.querySelector(".buy");

    const card =
        button.closest(".card");

---

# Practical Example — Navigation

HTML:

    <nav>
        <a href="/">Home</a>
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
    </nav>

JavaScript:

    const links =
        document.querySelectorAll("nav a");

    const secondLink = links[1];

    console.log(
        secondLink.previousElementSibling
    );

    console.log(
        secondLink.nextElementSibling
    );

---

# Practical Example — First and Last

    const menu =
        document.querySelector(".menu");

    const first =
        menu.firstElementChild;

    const last =
        menu.lastElementChild;

---

# Practical Example — Children

    const menu =
        document.querySelector(".menu");

    for (const item of menu.children) {
        console.log(item);
    }

---

# Practical Example — Parent

HTML:

    <div class="card">
        <button class="button">
            Buy
        </button>
    </div>

JavaScript:

    const button =
        document.querySelector(".button");

    const card =
        button.parentElement;

---

# Practical Example — Next Element

HTML:

    <div class="item">One</div>
    <div class="item">Two</div>
    <div class="item">Three</div>

JavaScript:

    const first =
        document.querySelector(".item");

    const second =
        first.nextElementSibling;

---

# Practical Example — Previous Element

    const items =
        document.querySelectorAll(".item");

    const second = items[1];

    const first =
        second.previousElementSibling;

---

# Practical Example — Find Parent Card

HTML:

    <div class="card">
        <h2>Phone</h2>
        <button class="button">
            Buy
        </button>
    </div>

JavaScript:

    const button =
        document.querySelector(".button");

    const card =
        button.closest(".card");

---

# Practical Example — Check Structure

    const card =
        document.querySelector(".card");

    if (card && card.children.length > 0) {
        console.log("Card has elements");
    }

---

# Practical Example — First Child

    const card =
        document.querySelector(".card");

    const first =
        card.firstElementChild;

    if (first) {
        console.log(first);
    }

---

# Practical Example — Last Child

    const card =
        document.querySelector(".card");

    const last =
        card.lastElementChild;

    if (last) {
        console.log(last);
    }

---

# Practical Example — Traverse Several Levels

HTML:

    <main>
        <section class="products">
            <article class="card">
                <h2>Phone</h2>
            </article>
        </section>
    </main>

JavaScript:

    const title =
        document.querySelector("h2");

    const card =
        title.parentElement;

    const section =
        card.parentElement;

    const main =
        section.parentElement;

Ланцюжок:

    h2
      ↑
    card
      ↑
    section
      ↑
    main

---

# Practical Example — Traverse to Sibling

HTML:

    <div class="item">One</div>
    <div class="item">Two</div>
    <div class="item">Three</div>

JavaScript:

    const second =
        document.querySelectorAll(".item")[1];

    const previous =
        second.previousElementSibling;

    const next =
        second.nextElementSibling;

---

# Traversal and Events

DOM Traversal часто використовується разом з events.

Наприклад:

    const button =
        document.querySelector(".delete");

    button.addEventListener("click", () => {
        const card =
            button.closest(".card");

        console.log(card);
    });

Це буде особливо важливо у:

    10-events
    11-event-object
    12-event-bubbling
    13-event-delegation

---

# Traversal and Event Delegation

Наприклад:

    container.addEventListener("click", (event) => {
        const button =
            event.target.closest(".delete");

        if (!button) {
            return;
        }

        const card =
            button.closest(".card");

        console.log(card);
    });

Тут використовуються:

    event.target
    closest()

Це один із практичних сценаріїв DOM traversal.

---

# DOM Traversal Workflow

Типовий workflow:

    1. Select starting element
    2. Identify relationship
    3. Traverse DOM
    4. Get target element
    5. Work with target

Наприклад:

    const button =
        document.querySelector(".delete");

    const card =
        button.closest(".card");

---

# Selection vs Traversal

Selection:

    document.querySelector(".card");

означає:

    знайти element за selector

Traversal:

    button.closest(".card");

означає:

    рухатися по DOM tree
    від уже знайденого element

Обидва підходи потрібні.

---

# Коли використовувати Traversal

DOM traversal корисний, коли:

    element already found
    і потрібно отримати пов'язаний element

Наприклад:

    button → card
    item → next item
    item → previous item
    title → parent card
    container → children

---

# Коли використовувати querySelector()

Якщо потрібен element за відомим CSS selector:

    const card =
        document.querySelector(".card");

---

# Коли використовувати closest()

Якщо потрібно знайти ancestor за selector:

    const card =
        button.closest(".card");

---

# Коли використовувати children

Якщо потрібні direct child elements:

    const items =
        container.children;

---

# Коли використовувати childNodes

Якщо потрібно працювати з усіма child nodes:

    const nodes =
        container.childNodes;

Це менш поширено у звичайному UI-коді.

---

# Коли використовувати firstElementChild

Якщо потрібен перший direct child element:

    const first =
        container.firstElementChild;

---

# Коли використовувати lastElementChild

Якщо потрібен останній direct child element:

    const last =
        container.lastElementChild;

---

# Коли використовувати nextElementSibling

Якщо потрібно перейти до наступного sibling element:

    const next =
        item.nextElementSibling;

---

# Коли використовувати previousElementSibling

Якщо потрібно перейти до попереднього sibling element:

    const previous =
        item.previousElementSibling;

---

# Типові помилки

❌ Плутати `children` та `childNodes`.

    children
        → Elements

    childNodes
        → Nodes

---

❌ Плутати `firstChild` та `firstElementChild`.

    firstChild
        → Node

    firstElementChild
        → Element

---

❌ Плутати `lastChild` та `lastElementChild`.

    lastChild
        → Node

    lastElementChild
        → Element

---

❌ Плутати `nextSibling` та `nextElementSibling`.

    nextSibling
        → Node

    nextElementSibling
        → Element

---

❌ Плутати `previousSibling` та `previousElementSibling`.

    previousSibling
        → Node

    previousElementSibling
        → Element

---

❌ Забувати про whitespace.

HTML:

    <div>
        <h2>Title</h2>
    </div>

Може мати:

    div.firstChild
        → Text

А не:

    h2

Для першого element:

    div.firstElementChild

---

❌ Очікувати `closest()` повернення parent.

`closest()` може повернути сам element, якщо він відповідає selector.

---

❌ Не перевіряти `null`.

Наприклад:

    const next =
        item.nextElementSibling;

Якщо item останній:

    next === null

Тому:

    if (next) {
        ...
    }

---

❌ Використовувати `parentElement.parentElement.parentElement`.

Такий код може працювати:

    const main =
        button.parentElement
              .parentElement
              .parentElement;

Але він сильно залежить від конкретної HTML-структури.

Часто краще:

    const main =
        button.closest("main");

або знайти потрібний element іншим способом.

---

❌ Надмірно покладатися на DOM structure.

Наприклад:

    element.parentElement.parentElement

може зламатися після зміни HTML.

Коли можливо, семантичний selector:

    element.closest(".card")

може бути зрозумілішим.

---

❌ Використовувати `childNodes`, коли потрібні тільки elements.

Якщо потрібні HTML elements:

    children

часто простіше і безпечніше.

---

# Comparison Table

| Property / Method | Що повертає |
|---|---|
| `parentElement` | parent Element |
| `parentNode` | parent Node |
| `children` | child Elements |
| `childNodes` | child Nodes |
| `firstElementChild` | first child Element |
| `lastElementChild` | last child Element |
| `firstChild` | first child Node |
| `lastChild` | last child Node |
| `nextElementSibling` | next sibling Element |
| `previousElementSibling` | previous sibling Element |
| `nextSibling` | next sibling Node |
| `previousSibling` | previous sibling Node |
| `closest()` | nearest matching ancestor Element |
| `matches()` | `true` / `false` |
| `contains()` | `true` / `false` |
| `hasChildNodes()` | `true` / `false` |

---

# Node vs Element Cheat Table

| API | Працює з |
|---|---|
| `parentNode` | Node |
| `childNodes` | Nodes |
| `firstChild` | Node |
| `lastChild` | Node |
| `nextSibling` | Node |
| `previousSibling` | Node |
| `parentElement` | Element |
| `children` | Elements |
| `firstElementChild` | Element |
| `lastElementChild` | Element |
| `nextElementSibling` | Element |
| `previousElementSibling` | Element |

---

# DOM Traversal Map

    parentElement
          ↑
          │
    previousElementSibling ← current → nextElementSibling
          │
          ↓
    firstElementChild
          │
       children
          │
          ↓
    lastElementChild

---

# Основна модель

Для Element:

    element
       │
       ├── parentElement
       │
       ├── children
       │
       ├── firstElementChild
       │
       ├── lastElementChild
       │
       ├── previousElementSibling
       │
       └── nextElementSibling

Для Node:

    node
       │
       ├── parentNode
       │
       ├── childNodes
       │
       ├── firstChild
       │
       ├── lastChild
       │
       ├── previousSibling
       │
       └── nextSibling

---

# Питання зі співбесіди

Що таке DOM Traversal?

Що таке DOM tree?

Що таке parent?

Що таке child?

Що таке sibling?

Що таке descendant?

Що таке ancestor?

Що повертає `parentElement`?

Чим `parentElement` відрізняється від `parentNode`?

Що повертає `children`?

Чим `children` відрізняється від `childNodes`?

Що повертає `firstElementChild`?

Що повертає `lastElementChild`?

Чим `firstChild` відрізняється від `firstElementChild`?

Чим `lastChild` відрізняється від `lastElementChild`?

Що таке text node?

Чому `firstChild` може повернути Text node?

Що таке whitespace text node?

Що робить `nextElementSibling()`?

Що робить `previousElementSibling()`?

Чим `nextSibling` відрізняється від `nextElementSibling`?

Чим `previousSibling` відрізняється від `previousElementSibling`?

Що робить `hasChildNodes()`?

Що робить `closest()`?

Чи може `closest()` повернути сам element?

Що повертає `closest()`, якщо нічого не знайдено?

Що робить `matches()`?

Що робить `contains()`?

Чим Node відрізняється від Element?

Які типи Nodes існують?

Чому `childNodes` може містити більше елементів, ніж `children`?

Як знайти parent element?

Як знайти children?

Як знайти перший child element?

Як знайти останній child element?

Як знайти next sibling?

Як знайти previous sibling?

Як знайти найближчий `.card` від button?

Коли використовувати `closest()` замість `parentElement`?

Чому DOM traversal корисний у event handling?

---

# Шлях

## 🟢 Core (обов'язково знати)

Що таке DOM tree.

Що таке:

    parent
    child
    sibling

`parentElement`.

`children`.

`firstElementChild`.

`lastElementChild`.

`nextElementSibling`.

`previousElementSibling`.

`closest()`.

Основна різниця:

    Element
    Node

Розуміння:

    null

Розуміння DOM hierarchy.

Рух:

    up
    down
    sideways

---

## 🔵 Junior

Впевнене використання:

    parentElement
    children
    firstElementChild
    lastElementChild
    nextElementSibling
    previousElementSibling
    closest()

Розуміння:

    parentNode
    childNodes
    firstChild
    lastChild
    nextSibling
    previousSibling

Розуміння:

    Node
    Element
    Text
    Comment

Розуміння whitespace text nodes.

Розуміння:

    hasChildNodes()
    matches()
    contains()

Вибір між:

    querySelector()
    querySelectorAll()
    DOM traversal
    closest()

Використання traversal разом з events.

---

## 🟠 Middle

Глибоке розуміння DOM tree.

Розуміння Node hierarchy.

Робота з:

    Node
    Element
    HTMLElement
    Document

Розуміння DOM interfaces.

Ефективна навігація по DOM.

Scoped traversal.

Traversal у component-like структурах.

Використання:

    closest()
    matches()
    contains()

у складних UI-сценаріях.

DOM traversal разом з:

    event.target
    event.currentTarget
    event delegation

Оптимізація DOM queries.

Розуміння залежності коду від DOM structure.

---

## 🔴 Senior

Глибоке розуміння:

    DOM specification
    Node interface
    Element interface
    Document interface
    tree structure
    node relationships

Shadow DOM traversal.

Shadow roots.

Composed tree.

Light DOM vs Shadow DOM.

Slot elements.

Event composed path.

Розуміння:

    parentNode
    parentElement
    childNodes
    children

на рівні DOM specification.

Оптимізація складного DOM traversal.

Архітектурні trade-offs між:

    selectors
    traversal
    cached references
    component boundaries
    event delegation

Розуміння того, як DOM structure впливає на maintainability та performance.

---

# Міні-шпаргалка

## Parent

    element.parentElement

→ parent Element.

---

## Parent Node

    element.parentNode

→ parent Node.

---

## Children

    element.children

→ child Elements.

---

## Child Nodes

    element.childNodes

→ all child Nodes.

---

## First Element

    element.firstElementChild

→ first child Element.

---

## Last Element

    element.lastElementChild

→ last child Element.

---

## First Node

    element.firstChild

→ first child Node.

---

## Last Node

    element.lastChild

→ last child Node.

---

## Next Element

    element.nextElementSibling

→ next sibling Element.

---

## Previous Element

    element.previousElementSibling

→ previous sibling Element.

---

## Next Node

    element.nextSibling

→ next sibling Node.

---

## Previous Node

    element.previousSibling

→ previous sibling Node.

---

## Closest

    element.closest(".card");

→ nearest matching ancestor.

---

## Matches

    element.matches(".active");

→ `true` / `false`.

---

## Contains

    parent.contains(child);

→ `true` / `false`.

---

## Has children

    element.hasChildNodes();

→ `true` / `false`.

---

# Основні правила

    parentElement
        → parent Element

    parentNode
        → parent Node

---

    children
        → child Elements

    childNodes
        → child Nodes

---

    firstElementChild
        → first Element

    firstChild
        → first Node

---

    lastElementChild
        → last Element

    lastChild
        → last Node

---

    nextElementSibling
        → next Element

    nextSibling
        → next Node

---

    previousElementSibling
        → previous Element

    previousSibling
        → previous Node

---

    closest()
        → nearest matching ancestor

    matches()
        → does this element match selector?

    contains()
        → is node inside another node?

---

# Найважливіша різниця

Запам'ятати:

    children
        → Elements

    childNodes
        → Nodes

    firstElementChild
        → Element

    firstChild
        → Node

    nextElementSibling
        → Element

    nextSibling
        → Node

---

# DOM Traversal Flow

    current element
          │
          ├──────────────→ nextElementSibling
          │
          ├──────────────→ previousElementSibling
          │
          ↑
          │
    parentElement
          │
          ↓
    children
          │
          ├──────────────→ firstElementChild
          │
          └──────────────→ lastElementChild

Для пошуку вгору за selector:

    current
       ↑
    closest(selector)

---

# Головне:

• DOM Traversal — це навігація по DOM tree.

• DOM має ієрархічну структуру:

    parent
    child
    sibling

• `parentElement` повертає батьківський Element.

• `parentNode` повертає батьківський Node.

• `children` повертає тільки child Elements.

• `childNodes` повертає всі child Nodes.

• `firstElementChild` повертає перший child Element.

• `lastElementChild` повертає останній child Element.

• `firstChild` повертає перший child Node.

• `lastChild` повертає останній child Node.

• `nextElementSibling` переходить до наступного sibling Element.

• `previousElementSibling` переходить до попереднього sibling Element.

• `nextSibling` та `previousSibling` працюють з Nodes.

• Text та whitespace можуть бути DOM nodes.

• Через whitespace:

    firstChild

може бути:

    Text

тоді як:

    firstElementChild

буде першим HTML element.

• `closest()` шукає найближчий matching ancestor.

• `closest()` перевіряє також сам element.

• Якщо `closest()` нічого не знайшов:

    null

• `matches()` перевіряє, чи відповідає поточний element CSS selector.

• `contains()` перевіряє, чи знаходиться один Node всередині іншого.

• `hasChildNodes()` перевіряє наявність child nodes, а не тільки child elements.

• Для звичайної роботи з HTML найчастіше потрібні:

    parentElement
    children
    firstElementChild
    lastElementChild
    nextElementSibling
    previousElementSibling
    closest()

• Основна модель:

    parent
      ↑
    current
      ↓
    children

та:

    previous
      ←
    current
      →
    next

• DOM traversal особливо корисний, коли вже є reference на element і потрібно знайти пов'язані з ним elements.

• `querySelector()` шукає element за selector.

• DOM traversal переміщується від уже знайденого element по його зв'язках у DOM tree.

• Для складних UI-сценаріїв traversal часто використовується разом з events:

    event.target
    closest()
    parentElement
    children

• Хороше практичне правило:

    потрібно знайти за selector
        → querySelector()

    потрібно перейти до parent
        → parentElement

    потрібні direct children
        → children

    потрібен перший child
        → firstElementChild

    потрібен останній child
        → lastElementChild

    потрібен next sibling
        → nextElementSibling

    потрібен previous sibling
        → previousElementSibling

    потрібен ancestor за selector
        → closest()

• Найважливіша концепція:

    Node
      ↓
    Element

`Element` є одним із типів `Node`.

• Тому:

    childNodes
        → може містити Element + Text + Comment

а:

    children
        → тільки Element

• Основна модель DOM traversal:

    find starting element
          ↓
    identify relationship
          ↓
    traverse DOM
          ↓
    get target element
          ↓
    manipulate target