## 04. Text and Content

Text and Content — це основа наповнення HTML-документа текстовою інформацією.

HTML дозволяє не просто відображати текст, а й описувати його **структуру та зміст**:

    headings
    paragraphs
    emphasized text
    important text
    quotes
    abbreviations
    code
    preformatted text
    lists
    line breaks
    thematic breaks
    inline content

HTML повинен описувати **семантичний зміст** тексту, а CSS — його зовнішній вигляд.

Наприклад:

    <strong>Important</strong>

означає, що текст є важливим.

А його візуальне оформлення:

    bold
    color
    font-size

вже належить до CSS.

---

### Основні елементи тексту

    <h1> ... <h6>
    <p>
    <br>
    <hr>
    <strong>
    <em>
    <b>
    <i>
    <mark>
    <small>
    <del>
    <ins>
    <sub>
    <sup>
    <blockquote>
    <q>
    <cite>
    <abbr>
    <code>
    <pre>
    <span>

---

### Ключові поняття

✔ text content  
✔ heading  
✔ paragraph  
✔ hierarchy  
✔ semantic HTML  
✔ `<h1>`  
✔ `<h2>`  
✔ `<h3>`  
✔ `<h4>`  
✔ `<h5>`  
✔ `<h6>`  
✔ `<p>`  
✔ `<br>`  
✔ `<hr>`  
✔ `<strong>`  
✔ `<em>`  
✔ `<b>`  
✔ `<i>`  
✔ `<mark>`  
✔ `<small>`  
✔ `<del>`  
✔ `<ins>`  
✔ `<sub>`  
✔ `<sup>`  
✔ `<blockquote>`  
✔ `<q>`  
✔ `<cite>`  
✔ `<abbr>`  
✔ `<code>`  
✔ `<pre>`  
✔ `<span>`  
✔ whitespace  
✔ text hierarchy  
✔ inline element  
✔ block-level content  

---

# Що потрібно пам'ятати

• HTML описує структуру та значення контенту.

• CSS відповідає за presentation — як контент виглядає.

• `<h1>` — головний heading сторінки або документа.

• `<h2>` — heading другого рівня.

• `<h3>` — heading третього рівня.

• Заголовки `<h1>`–`<h6>` створюють ієрархію документа.

• `<p>` використовується для paragraph.

• `<strong>` позначає важливість тексту.

• `<em>` позначає semantic emphasis.

• `<b>` привертає увагу до тексту без додавання особливого semantic meaning.

• `<i>` використовується для тексту, який стилістично або семантично відрізняється від основного.

• `<br>` створює line break.

• `<hr>` позначає thematic break.

• `<mark>` позначає виділений або релевантний фрагмент тексту.

• `<small>` використовується для менш важливого або другорядного тексту.

• `<del>` позначає видалений текст.

• `<ins>` позначає доданий текст.

• `<sub>` створює нижній індекс.

• `<sup>` створює верхній індекс.

• `<blockquote>` використовується для довгих цитат.

• `<q>` — коротка inline quote.

• `<abbr>` використовується для abbreviation.

• `<code>` використовується для фрагментів програмного коду.

• `<pre>` зберігає whitespace та форматування тексту.

• `<span>` — generic inline container без власного semantic meaning.

---

# Text Hierarchy

HTML-документ повинен мати зрозумілу hierarchy.

Наприклад:

    <h1>HTML Course</h1>

    <h2>HTML Foundations</h2>

    <h3>Text and Content</h3>

    <h3>Links and Navigation</h3>

    <h2>CSS Foundations</h2>

    <h3>Selectors</h3>

    <h3>Properties</h3>

Структура:

    h1
    ├── h2
    │   ├── h3
    │   └── h3
    │
    └── h2
        ├── h3
        └── h3

Заголовки створюють логічну структуру документа.

---

# Headings

HTML має шість рівнів заголовків:

    <h1>
    <h2>
    <h3>
    <h4>
    <h5>
    <h6>

Приклад:

    <h1>Main heading</h1>

    <h2>Section</h2>

    <h3>Subsection</h3>

    <h4>Subsection level 4</h4>

    <h5>Subsection level 5</h5>

    <h6>Subsection level 6</h6>

---

# h1

`<h1>` — heading найвищого рівня.

Наприклад:

    <h1>Learning HTML</h1>

На сторінці може бути один основний `<h1>`, який описує головну тему сторінки.

Але HTML не встановлює абсолютного правила, що документ **завжди** повинен мати рівно один `<h1>`.

Головне — щоб структура headings була логічною.

---

# h2

`<h2>` використовується для основного розділу всередині `<h1>`.

    <h1>HTML Course</h1>

    <h2>HTML Foundations</h2>

    <h2>CSS Foundations</h2>

---

# h3

`<h3>` використовується для підрозділу `<h2>`.

    <h1>HTML Course</h1>

    <h2>HTML Foundations</h2>

    <h3>Document Structure</h3>

    <h3>Elements and Attributes</h3>

    <h3>Text and Content</h3>

---

# h4, h5, h6

Вони використовуються для глибших рівнів структури.

    <h1>Course</h1>

    <h2>HTML</h2>

    <h3>Forms</h3>

    <h4>Input</h4>

    <h5>Validation</h5>

    <h6>Custom validation</h6>

У звичайних вебсторінках `<h4>`–`<h6>` використовуються значно рідше.

---

# Не вибирати heading за розміром

Не слід використовувати:

    <h3>Big text</h3>

лише тому, що `<h3>` в браузері має потрібний розмір.

Для розміру тексту потрібно використовувати CSS.

Наприклад:

    <h2 class="small-heading">
        Section
    </h2>

А CSS:

    .small-heading {
        font-size: 20px;
    }

HTML:

    → meaning / structure

CSS:

    → appearance

---

# Heading Hierarchy

Правильна логіка:

    h1
      ↓
    h2
      ↓
    h3
      ↓
    h4
      ↓
    h5
      ↓
    h6

Наприклад:

    <h1>Web Development</h1>

    <h2>Frontend</h2>

    <h3>HTML</h3>

    <h3>CSS</h3>

    <h3>JavaScript</h3>

    <h2>Backend</h2>

    <h3>Node.js</h3>

---

# Paragraph

`<p>` використовується для paragraph — окремого абзацу.

    <p>
        HTML is used to structure web pages.
    </p>

Кілька абзаців:

    <p>
        HTML defines the structure of a document.
    </p>

    <p>
        CSS controls the presentation.
    </p>

---

# Paragraph vs Line Break

Не потрібно використовувати `<br>` для створення абзаців.

❌ Неправильно:

    <p>
        First paragraph.<br><br>
        Second paragraph.
    </p>

Краще:

    <p>
        First paragraph.
    </p>

    <p>
        Second paragraph.
    </p>

`<p>` означає окремий paragraph.

`<br>` означає line break.

---

# Line Break

`<br>` створює перенос рядка.

    <p>
        First line<br>
        Second line
    </p>

Результат:

    First line
    Second line

---

# Коли використовувати br

`<br>` доречний, коли перенос рядка є частиною змісту.

Наприклад, адреса:

    <p>
        10 Main Street<br>
        Kyiv<br>
        Ukraine
    </p>

Або поезія:

    <p>
        Roses are red<br>
        Violets are blue<br>
        HTML is semantic<br>
        CSS styles too
    </p>

Не слід використовувати `<br>` для layout.

Для layout використовують CSS.

---

# Thematic Break

`<hr>` позначає thematic break — тематичний перехід між частинами документа.

    <p>
        HTML section.
    </p>

    <hr>

    <p>
        CSS section.
    </p>

Візуально браузер зазвичай відображає горизонтальну лінію.

Але головне значення `<hr>` — не "намалювати лінію", а позначити тематичний поділ.

---

# Strong

`<strong>` позначає strongly important content.

    <p>
        <strong>Warning:</strong>
        Save your work.
    </p>

Браузери зазвичай відображають `<strong>` жирним шрифтом.

Але semantic meaning важливіший за візуальний ефект.

---

# Emphasis

`<em>` позначає emphasis — смисловий наголос.

    <p>
        You <em>must</em> complete this task.
    </p>

Зазвичай браузер відображає `<em>` курсивом.

---

# strong vs em

`<strong>`:

    → importance

`<em>`:

    → emphasis

Наприклад:

    <p>
        <strong>Warning!</strong>
        This operation is dangerous.
    </p>

    <p>
        You should <em>always</em> save your files.
    </p>

---

# b

`<b>` привертає увагу до тексту без додавання semantic importance.

    <p>
        <b>New</b> product available.
    </p>

Не слід використовувати `<b>` просто замість `<strong>`.

Якщо текст важливий:

    <strong>Important</strong>

Якщо потрібно лише привернути увагу без додаткового semantic meaning:

    <b>New</b>

---

# i

`<i>` використовується для тексту, який відрізняється від основного за характером або має особливий текстовий контекст.

Наприклад:

    <p>
        The term <i>frontend</i> is widely used.
    </p>

Інший приклад:

    <p>
        The species <i>Homo sapiens</i>.
    </p>

`<i>` не означає просто "зробити курсив".

Якщо потрібно semantic emphasis:

    <em>important word</em>

---

# strong vs b

    <strong>
        semantic importance
    </strong>

    <b>
        attention without special importance
    </b>

---

# em vs i

    <em>
        semantic emphasis
    </em>

    <i>
        alternate voice / term / style
    </i>

---

# Mark

`<mark>` позначає текст, який є highlighted або особливо релевантним у поточному контексті.

    <p>
        Search result:
        <mark>HTML</mark>
    </p>

Типовий приклад — search results.

---

# Small

`<small>` використовується для другорядної інформації.

Наприклад:

    <p>
        Course price: $100
    </p>

    <small>
        Prices may change.
    </small>

---

# Deleted Text

`<del>` позначає текст, який був видалений.

    <p>
        Price:
        <del>$100</del>
        $80
    </p>

---

# Inserted Text

`<ins>` позначає доданий текст.

    <p>
        The new price is
        <ins>$80</ins>.
    </p>

Разом:

    <p>
        Old:
        <del>$100</del>
        New:
        <ins>$80</ins>
    </p>

---

# Subscript

`<sub>` створює subscript — нижній індекс.

Наприклад, хімічна формула:

    H<sub>2</sub>O

HTML:

    <p>
        H<sub>2</sub>O
    </p>

---

# Superscript

`<sup>` створює superscript — верхній індекс.

Наприклад:

    x<sup>2</sup>

HTML:

    <p>
        x<sup>2</sup>
    </p>

---

# Mathematical Content

Прості математичні вирази можна записувати за допомогою `<sup>` та `<sub>`.

    <p>
        x<sup>2</sup> + y<sup>2</sup>
    </p>

    <p>
        H<sub>2</sub>O
    </p>

Для складної математичної розмітки існує MathML.

---

# Blockquote

`<blockquote>` використовується для довгої цитати, яка походить з іншого джерела.

    <blockquote>
        The web is built on open standards.
    </blockquote>

Можна вказати джерело через `cite`:

    <blockquote cite="https://example.com/article">
        The web is built on open standards.
    </blockquote>

Але `cite` attribute не є обов'язковим.

---

# Quote

`<q>` використовується для короткої inline quote.

    <p>
        He said <q>Hello</q>.
    </p>

`<q>`:

    → short inline quotation

`<blockquote>`:

    → longer block quotation

---

# blockquote vs q

    <q>
        short quote
    </q>

    <blockquote>
        longer quotation
    </blockquote>

---

# Cite

`<cite>` використовується для назви творчої роботи або іншого джерела.

Наприклад:

    <p>
        I am reading
        <cite>The Little Prince</cite>.
    </p>

Можна використовувати для:

    books
    movies
    songs
    paintings
    articles
    other creative works

---

# Abbreviation

`<abbr>` використовується для abbreviation.

Наприклад:

    <abbr title="HyperText Markup Language">
        HTML
    </abbr>

Або:

    <abbr title="Cascading Style Sheets">
        CSS
    </abbr>

`title` дозволяє надати повну форму скорочення.

---

# Code

`<code>` використовується для короткого фрагмента програмного коду.

    <p>
        Use <code>console.log()</code>
        to print a value.
    </p>

Інший приклад:

    <p>
        The HTML element is
        <code>&lt;p&gt;</code>.
    </p>

---

# Inline Code

`<code>` зазвичай використовується для inline code.

    <p>
        Run <code>npm install</code>.
    </p>

Для великого багаторядкового блоку коду часто використовується:

    <pre><code>
    const user = {
        name: "John"
    };
    </code></pre>

---

# Preformatted Text

`<pre>` зберігає whitespace та форматування тексту.

Наприклад:

    <pre>
        Line 1
            Line 2
                Line 3
    </pre>

Відступи та переноси рядків зберігаються.

---

# pre + code

Для code blocks часто використовують комбінацію:

    <pre><code>
    function hello() {
        console.log("Hello");
    }
    </code></pre>

`<code>`:

    → це code

`<pre>`:

    → зберігає форматування

Разом:

    <pre><code>...</code></pre>

---

# Whitespace

HTML має особливі правила обробки whitespace.

Наприклад:

    <p>
        Hello
        world
    </p>

Браузер зазвичай відобразить:

    Hello world

Кілька пробілів:

    Hello     world

зазвичай будуть зведені до одного пробілу при звичайному HTML rendering.

---

# Whitespace та pre

У `<pre>` whitespace зберігається.

    <pre>
    Hello     world

        New line
    </pre>

На відміну від звичайного paragraph:

    <p>
    Hello     world
    </p>

---

# Entity References

Спеціальні символи HTML можна записувати через character references.

Наприклад:

    &lt;

означає:

    <

    &gt;

означає:

    >

    &amp;

означає:

    &

    &quot;

означає:

    "

---

# Less Than

Щоб показати `<` як текст:

    &lt;

Наприклад:

    <p>
        Use &lt;p&gt; for paragraphs.
    </p>

Результат:

    Use <p> for paragraphs.

---

# Greater Than

Щоб показати `>`:

    &gt;

Наприклад:

    <p>
        10 &gt; 5
    </p>

---

# Ampersand

Щоб показати `&`:

    &amp;

Наприклад:

    <p>
        HTML &amp; CSS
    </p>

---

# Non-breaking Space

Можна використовувати:

    &nbsp;

Це non-breaking space.

Наприклад:

    10&nbsp;kg

Однак `&nbsp;` не слід використовувати для створення layout або великих відступів.

Для layout потрібно використовувати CSS.

---

# Unicode Characters

HTML підтримує Unicode.

Наприклад:

    <p>
        Україна 🇺🇦
    </p>

    <p>
        Привіт, світ!
    </p>

Документ зазвичай повинен використовувати:

    <meta charset="UTF-8">

---

# Span

`<span>` — generic inline container.

Сам по собі `<span>` не має особливого semantic meaning.

Наприклад:

    <p>
        This is
        <span>important</span>
        text.
    </p>

Часто `<span>` використовується разом із CSS або JavaScript.

Наприклад:

    <p>
        Price:
        <span class="price">$100</span>
    </p>

---

# Span vs Semantic Elements

Якщо існує відповідний semantic element, краще використовувати його.

Наприклад:

❌

    <span class="important">
        Warning
    </span>

Краще:

    <strong>
        Warning
    </strong>

І:

❌

    <span class="emphasis">
        important
    </span>

Краще:

    <em>
        important
    </em>

`<span>` використовується тоді, коли спеціального semantic element немає або він не підходить.

---

# Block Content vs Inline Content

На базовому рівні корисно розуміти різницю між block та inline content.

Приклади елементів, які зазвичай поводяться як block-level:

    <h1>
    <h2>
    <h3>
    <p>
    <div>
    <blockquote>
    <pre>

Приклади inline elements:

    <strong>
    <em>
    <b>
    <i>
    <mark>
    <small>
    <code>
    <q>
    <abbr>
    <span>
    <sub>
    <sup>

Це насамперед про стандартне CSS display behavior.

CSS може змінити display.

---

# Inline Content

Inline content знаходиться всередині текстового потоку.

Наприклад:

    <p>
        This is
        <strong>important</strong>
        information.
    </p>

`<strong>` є частиною paragraph.

---

# Block Content

Block-level element зазвичай займає окремий рядок.

Наприклад:

    <p>First paragraph.</p>

    <p>Second paragraph.</p>

Вони відображаються як окремі блоки.

---

# Text Nesting

HTML-елементи можна вкладати.

Наприклад:

    <p>
        This is
        <strong>
            very important
        </strong>
        information.
    </p>

Або:

    <p>
        This is
        <em>
            <strong>
                very important
            </strong>
        </em>
        information.
    </p>

Важливо правильно закривати elements.

---

# Правильне вкладення

Правильно:

    <p>
        <strong>
            Important text
        </strong>
    </p>

Неправильно:

    <p>
        <strong>
            Important text
    </p>
    </strong>

Elements повинні бути правильно nested.

---

# Content Model

HTML elements мають різні content models.

На базовому рівні корисно розуміти:

    text
    phrasing content
    flow content
    headings
    interactive content
    embedded content

Не всі HTML elements можна вкладати один в один довільно.

Наприклад, paragraph не може містити інші block-level структури довільним чином.

---

# Paragraph Content

Наприклад:

    <p>
        This is
        <strong>important</strong>
        text with
        <em>emphasis</em>.
    </p>

Усередині `<p>` часто використовуються inline / phrasing elements:

    <strong>
    <em>
    <a>
    <span>
    <code>
    <mark>

---

# Не вкладати p у p

Неправильно:

    <p>
        First paragraph
        <p>
            Second paragraph
        </p>
    </p>

Paragraph не можна вкладати в paragraph.

Правильно:

    <p>
        First paragraph.
    </p>

    <p>
        Second paragraph.
    </p>

---

# Text Formatting vs Semantic Meaning

HTML має елементи, які можуть виглядати схоже, але мати різне meaning.

Наприклад:

    <strong>Important</strong>

і:

    <b>Important</b>

можуть виглядати жирними.

Але:

    <strong>
        → important
    </strong>

    <b>
        → attention without importance
    </b>

Тому вибір element повинен залежати від meaning, а не лише від appearance.

---

# HTML vs CSS

HTML:

    <strong>Important</strong>

CSS:

    strong {
        color: red;
        font-size: 24px;
    }

HTML визначає:

    що це

CSS визначає:

    як це виглядає

---

# Text Semantics

Semantic HTML допомагає:

    browsers
    screen readers
    search engines
    developers
    accessibility tools

Наприклад:

    <strong>Warning</strong>

краще описує зміст, ніж:

    <span class="bold">Warning</span>

---

# Document Outline

Текстовий контент повинен мати логічну структуру.

Наприклад:

    <h1>HTML Course</h1>

    <p>
        Learn how HTML works.
    </p>

    <h2>HTML Foundations</h2>

    <p>
        Learn the basic HTML elements.
    </p>

    <h3>Text and Content</h3>

    <p>
        Learn how to structure text.
    </p>

---

# Heading + Paragraph Pattern

Дуже поширена структура:

    <h2>HTML Elements</h2>

    <p>
        HTML elements define the structure
        of web content.
    </p>

---

# Section Text Pattern

Наприклад:

    <h2>HTML Basics</h2>

    <p>
        HTML is the standard markup language
        for documents designed to be displayed
        in a web browser.
    </p>

    <h3>Elements</h3>

    <p>
        Elements define the structure and meaning
        of content.
    </p>

---

# Quote Example

    <blockquote cite="https://example.com">
        The web is for everyone.
    </blockquote>

Коротка цитата:

    <p>
        The author said:
        <q>The web is for everyone.</q>
    </p>

---

# Abbreviation Example

    <p>
        <abbr title="HyperText Markup Language">
            HTML
        </abbr>
        is used to structure web documents.
    </p>

---

# Code Example

    <p>
        Use <code>git status</code>
        to check the repository status.
    </p>

---

# Code Block Example

    <pre><code>
    const message = "Hello";

    console.log(message);
    </code></pre>

---

# Mixed Text Content

HTML elements можна комбінувати:

    <p>
        HTML is
        <strong>important</strong>
        for
        <em>web development</em>.
        Use
        <code>&lt;h1&gt;</code>
        for the main heading.
    </p>

---

# Text Content Example

    <h1>HTML Foundations</h1>

    <p>
        HTML provides the structure of a web page.
    </p>

    <h2>Text and Content</h2>

    <p>
        HTML provides semantic elements for
        headings, paragraphs, quotes and code.
    </p>

    <h3>Important Text</h3>

    <p>
        Use <strong>strong</strong> when the content
        is important.
    </p>

    <h3>Emphasized Text</h3>

    <p>
        Use <em>emphasis</em> when a word or phrase
        needs semantic emphasis.
    </p>

---

# Типові помилки

❌ Використовувати `<h1>`–`<h6>` лише для розміру тексту.

Заголовки повинні визначати hierarchy.

Для розміру використовують CSS.

---

❌ Використовувати `<br><br>` для створення відступів.

Не:

    <p>
        Text
        <br><br>
        More text
    </p>

Краще:

    <p>
        Text
    </p>

    <p>
        More text
    </p>

Відступи між елементами контролює CSS.

---

❌ Використовувати `<b>` замість `<strong>` для важливого тексту.

Якщо текст semantic importance:

    <strong>Important</strong>

---

❌ Використовувати `<i>` замість `<em>` для semantic emphasis.

Якщо потрібен semantic emphasis:

    <em>important</em>

---

❌ Використовувати `<span>` для всього.

Не:

    <span class="heading">
        HTML Basics
    </span>

Краще:

    <h2>HTML Basics</h2>

---

❌ Вкладати `<p>` у `<p>`.

Не:

    <p>
        Text
        <p>
            More text
        </p>
    </p>

---

❌ Використовувати `<hr>` лише як декоративну лінію.

`<hr>` має semantic meaning — thematic break.

Для декоративної лінії можна використати CSS.

---

❌ Використовувати `&nbsp;` для layout.

Не:

    Hello&nbsp;&nbsp;&nbsp;&nbsp;World

Для layout використовуйте CSS.

---

❌ Вставляти `<` та `>` як звичайний текст у HTML.

Не:

    <p>
        Use <p> element.
    </p>

Краще:

    <p>
        Use &lt;p&gt; element.
    </p>

---

❌ Робити heading жирним через `<strong>` замість правильного heading.

Не:

    <p>
        <strong>HTML Basics</strong>
    </p>

Краще:

    <h2>HTML Basics</h2>

---

# Практичні приклади

### Приклад 1 — heading + paragraph

    <h1>HTML Basics</h1>

    <p>
        HTML is used to structure web documents.
    </p>

---

### Приклад 2 — hierarchy

    <h1>Web Development</h1>

    <h2>Frontend</h2>

    <h3>HTML</h3>

    <h3>CSS</h3>

    <h3>JavaScript</h3>

    <h2>Backend</h2>

    <h3>Node.js</h3>

---

### Приклад 3 — strong

    <p>
        <strong>Warning:</strong>
        Do not delete this file.
    </p>

---

### Приклад 4 — emphasis

    <p>
        You <em>must</em> complete this task.
    </p>

---

### Приклад 5 — mark

    <p>
        Search result:
        <mark>HTML</mark>
    </p>

---

### Приклад 6 — deleted and inserted

    <p>
        Price:
        <del>$100</del>
        <ins>$80</ins>
    </p>

---

### Приклад 7 — subscript

    <p>
        H<sub>2</sub>O
    </p>

---

### Приклад 8 — superscript

    <p>
        E = mc<sup>2</sup>
    </p>

---

### Приклад 9 — quote

    <p>
        He said:
        <q>HTML is simple.</q>
    </p>

---

### Приклад 10 — blockquote

    <blockquote>
        HTML gives meaning and structure to content.
    </blockquote>

---

### Приклад 11 — abbreviation

    <p>
        <abbr title="HyperText Markup Language">
            HTML
        </abbr>
        is a markup language.
    </p>

---

### Приклад 12 — inline code

    <p>
        Use <code>console.log()</code>
        to print a value.
    </p>

---

### Приклад 13 — code block

    <pre><code>
    const name = "John";

    console.log(name);
    </code></pre>

---

### Приклад 14 — line break

    <p>
        John Smith<br>
        10 Main Street<br>
        Kyiv<br>
        Ukraine
    </p>

---

### Приклад 15 — thematic break

    <h2>HTML</h2>

    <p>
        HTML defines document structure.
    </p>

    <hr>

    <h2>CSS</h2>

    <p>
        CSS defines presentation.
    </p>

---

### Приклад 16 — mixed semantic text

    <p>
        <strong>HTML</strong>
        defines the
        <em>structure</em>
        of a web page.
        Use
        <code>&lt;p&gt;</code>
        for paragraphs.
    </p>

---

### Приклад 17 — span

    <p>
        Price:
        <span class="price">$100</span>
    </p>

---

# Text Elements Quick Reference

| Element | Purpose |
|---|---|
| `<h1>` | Main heading |
| `<h2>` | Level 2 heading |
| `<h3>` | Level 3 heading |
| `<h4>` | Level 4 heading |
| `<h5>` | Level 5 heading |
| `<h6>` | Level 6 heading |
| `<p>` | Paragraph |
| `<br>` | Line break |
| `<hr>` | Thematic break |
| `<strong>` | Strong importance |
| `<em>` | Emphasis |
| `<b>` | Attention without special importance |
| `<i>` | Alternate voice / term / style |
| `<mark>` | Highlighted content |
| `<small>` | Side comment / small print |
| `<del>` | Deleted content |
| `<ins>` | Inserted content |
| `<sub>` | Subscript |
| `<sup>` | Superscript |
| `<blockquote>` | Block quotation |
| `<q>` | Inline quotation |
| `<cite>` | Title of a creative work |
| `<abbr>` | Abbreviation |
| `<code>` | Inline code |
| `<pre>` | Preformatted text |
| `<span>` | Generic inline container |

---

# Semantic vs Presentational Elements

## Semantic

    <h1>
    <p>
    <strong>
    <em>
    <blockquote>
    <code>
    <mark>

Вони описують meaning або structure.

---

## Generic / Presentational-like

    <span>
    <b>
    <i>

Їх потрібно використовувати відповідно до конкретного semantic meaning, а не лише через зовнішній вигляд.

---

# HTML Text Model

Корисно мислити так:

    HTML
      ↓
    Content
      ↓
    Structure
      ↓
    Meaning
      ↓
    Accessibility

CSS:

    Structure
      ↓
    Presentation
      ↓
    Visual appearance

JavaScript:

    Content
      ↓
    Behavior
      ↓
    Interaction

---

# Accessibility

Правильна текстова структура допомагає assistive technologies.

Наприклад:

    <h1>HTML Course</h1>

    <h2>HTML Foundations</h2>

    <h3>Text and Content</h3>

є зрозумілішою структурою, ніж:

    <div class="title">HTML Course</div>

    <div class="subtitle">HTML Foundations</div>

    <div class="small-title">Text and Content</div>

Semantic HTML дозволяє accessibility tools краще розуміти структуру документа.

---

# Search Engines

Semantic structure також допомагає пошуковим системам розуміти content.

Наприклад:

    <h1>HTML Foundations</h1>

    <h2>Text and Content</h2>

    <p>
        Learn how to structure text using HTML.
    </p>

краще описує документ, ніж набір `<div>` та `<span>`.

---

# Content First

Під час написання HTML корисно спочатку думати:

    Що це за content?

а не:

    Як це має виглядати?

Наприклад:

    Це головний заголовок?
        ↓
    <h1>

    Це абзац?
        ↓
    <p>

    Це важлива інформація?
        ↓
    <strong>

    Це emphasis?
        ↓
    <em>

    Це цитата?
        ↓
    <blockquote>

    Це code?
        ↓
    <code>

---

# Text Structure Pattern

Типова структура:

    <h1>Page title</h1>

    <p>
        Introduction.
    </p>

    <h2>First section</h2>

    <p>
        Section content.
    </p>

    <h3>Subsection</h3>

    <p>
        More content.
    </p>

    <h2>Second section</h2>

    <p>
        More content.
    </p>

---

# Питання зі співбесіди

Що таке text content в HTML?

Що таке heading?

Які heading levels існують?

Для чого використовують `<h1>`?

Для чого використовують `<h2>`?

Для чого використовують `<h6>`?

Що таке heading hierarchy?

Чи можна використовувати `<h3>` лише для отримання меншого розміру тексту?

Для чого використовується `<p>`?

Чим `<p>` відрізняється від `<br>`?

Для чого використовується `<br>`?

Коли `<br>` є доречним?

Для чого використовується `<hr>`?

Що означає semantic HTML?

Чим `<strong>` відрізняється від `<b>`?

Чим `<em>` відрізняється від `<i>`?

Для чого використовується `<mark>`?

Для чого використовується `<small>`?

Для чого використовуються `<del>` та `<ins>`?

Що таке subscript?

Для чого використовується `<sub>`?

Для чого використовується `<sup>`?

Чим `<blockquote>` відрізняється від `<q>`?

Для чого використовується `<cite>`?

Що таке abbreviation?

Для чого використовується `<abbr>`?

Для чого використовується `<code>`?

Для чого використовується `<pre>`?

Навіщо використовувати `<pre><code>`?

Як HTML обробляє whitespace?

Що таке HTML entity?

Для чого потрібен `&lt;`?

Для чого потрібен `&gt;`?

Для чого потрібен `&amp;`?

Що таке `&nbsp;`?

Для чого використовується `<span>`?

Чим `<span>` відрізняється від semantic elements?

Що таке inline content?

Що таке block-level content?

Чи можна вкладати `<p>` в `<p>`?

Чому semantic HTML важливий для accessibility?

Чому не слід використовувати heading лише для стилізації?

Яка різниця між HTML і CSS при роботі з текстом?

---

# Шлях

🟢 Core (обов'язково знати)

HTML text content.

Headings:

    h1
    h2
    h3
    h4
    h5
    h6

Heading hierarchy.

Paragraph:

    p

Line break:

    br

Thematic break:

    hr

Semantic text:

    strong
    em

Основи:

    b
    i
    mark
    small
    del
    ins
    sub
    sup

Quotes:

    blockquote
    q
    cite

Abbreviations:

    abbr

Code:

    code
    pre

Generic inline container:

    span

HTML entities:

    &lt;
    &gt;
    &amp;
    &quot;

Whitespace.

Inline vs block-level behavior.

---

🔵 Junior

Правильна heading hierarchy.

Semantic text structure.

Різниця:

    strong vs b
    em vs i
    blockquote vs q
    code vs pre
    p vs br

Розуміння:

    HTML semantics
    text content
    inline content
    block content
    whitespace
    character references

Використання:

    abbr
    cite
    mark
    del
    ins
    sub
    sup

Розуміння accessibility benefits semantic HTML.

Правильне nesting.

Вибір HTML element відповідно до meaning, а не appearance.

---

🟠 Middle

Глибше розуміння HTML content models.

Phrasing content.

Flow content.

Heading content.

Embedded content.

Interactive content.

Розуміння правил nesting.

Розуміння HTML parsing.

DOM representation текстового контенту.

Whitespace collapsing.

Character references.

Semantic structure великих документів.

Accessibility tree.

Взаємодія:

    HTML
    DOM
    CSS
    accessibility tree

Розуміння впливу semantic markup на:

    accessibility
    SEO
    maintainability

---

🔴 Senior

Глибоке розуміння HTML Living Standard.

Content categories.

Content models.

HTML parsing algorithm.

Tokenization.

Tree construction.

DOM tree.

Text nodes.

Character references.

Whitespace processing.

Document semantics.

Accessibility tree.

HTML semantics та assistive technologies.

Semantic markup та SEO.

Complex document structures.

Custom elements.

Shadow DOM text boundaries.

Internationalization.

Bidirectional text.

Unicode.

Language metadata.

Advanced accessibility semantics.

Trade-offs між semantic HTML та generic containers.

---

# Міні-шпаргалка

## Headings

    <h1>Main heading</h1>
    <h2>Section</h2>
    <h3>Subsection</h3>

Hierarchy:

    h1
      ↓
    h2
      ↓
    h3
      ↓
    h4
      ↓
    h5
      ↓
    h6

---

## Paragraph

    <p>
        Paragraph text.
    </p>

    <p>
        Another paragraph.
    </p>

---

## Line break

    <br>

    → line break

---

## Thematic break

    <hr>

    → thematic break

---

## Important text

    <strong>
        Important
    </strong>

    → strong importance

---

## Emphasis

    <em>
        Important word
    </em>

    → emphasis

---

## Highlight

    <mark>
        Search term
    </mark>

---

## Deleted / Inserted

    <del>Old</del>

    <ins>New</ins>

---

## Subscript

    H<sub>2</sub>O

---

## Superscript

    x<sup>2</sup>

---

## Short quote

    <q>
        Short quotation
    </q>

---

## Long quote

    <blockquote>
        Long quotation
    </blockquote>

---

## Abbreviation

    <abbr title="HyperText Markup Language">
        HTML
    </abbr>

---

## Code

    <code>
        console.log()
    </code>

---

## Code block

    <pre><code>
    const message = "Hello";

    console.log(message);
    </code></pre>

---

## Generic inline container

    <span>
        Text
    </span>

---

## HTML entities

    &lt;  → <
    &gt;  → >
    &amp; → &
    &quot; → "

---

# Основні правила

    h1–h6 → headings / hierarchy

    p → paragraph

    br → line break

    hr → thematic break

    strong → importance

    em → emphasis

    b → attention without special importance

    i → alternate voice / term / style

    mark → highlight

    small → secondary information

    del → deleted content

    ins → inserted content

    sub → subscript

    sup → superscript

    blockquote → long quotation

    q → short inline quotation

    cite → title of creative work

    abbr → abbreviation

    code → code

    pre → preserved formatting

    span → generic inline container

---

# Головне:

• HTML повинен описувати **структуру та meaning content**.

• CSS повинен відповідати за **presentation та appearance**.

• `<h1>`–`<h6>` використовуються для створення heading hierarchy.

• Heading потрібно вибирати за рівнем структури, а не за розміром тексту.

• `<p>` використовується для paragraph.

• `<br>` створює line break, але не повинен використовуватися для layout.

• `<hr>` позначає thematic break.

• `<strong>` означає strong importance.

• `<em>` означає semantic emphasis.

• `<b>` та `<i>` мають інше semantic призначення, ніж `<strong>` та `<em>`.

• `<mark>` використовується для highlighted content.

• `<del>` позначає видалений текст.

• `<ins>` позначає доданий текст.

• `<sub>` створює нижній індекс.

• `<sup>` створює верхній індекс.

• `<blockquote>` використовується для block quotation.

• `<q>` використовується для короткої inline quotation.

• `<abbr>` використовується для abbreviation.

• `<code>` використовується для code.

• `<pre>` зберігає whitespace та форматування.

• `<pre><code>` — типовий pattern для code blocks.

• `<span>` — generic inline container без власного semantic meaning.

• Semantic HTML покращує:

    accessibility
    maintainability
    document structure
    machine understanding

• Не потрібно використовувати `<span>` або `<div>`, якщо існує відповідний semantic element.

• Не потрібно використовувати HTML elements лише через їхній стандартний візуальний вигляд.

• Для appearance використовують CSS.

• Не потрібно використовувати `<br>` або `&nbsp;` для створення layout.

• Whitespace у звичайному HTML зазвичай collapsing до одного пробілу.

• `<pre>` зберігає whitespace.

• Для відображення спеціальних HTML-символів використовують character references:

    &lt;
    &gt;
    &amp;
    &quot;

• Правильне nesting є важливою частиною валідного HTML.

• Не можна вкладати `<p>` в `<p>`.

• Головний принцип:

    HTML
      ↓
    structure + meaning

    CSS
      ↓
    presentation

    JavaScript
      ↓
    behavior

• Під час створення текстового контенту спочатку потрібно визначити:

    Що це за інформація?
        ↓
    Який semantic element її описує?
        ↓
    Як її потрібно стилізувати?
        ↓
    CSS

• Хороший HTML можна читати як логічний документ навіть без CSS.

• Найважливіше правило цього розділу:

    Choose HTML elements by meaning,
    not by appearance.