# 01. DevTools — Інструменти розробника браузера

DevTools (Developer Tools) — це вбудовані інструменти браузера, які допомагають розробнику перевіряти HTML, CSS і JavaScript, знаходити помилки, аналізувати стилі та досліджувати роботу вебсторінки.

DevTools використовуються під час розробки, тестування та налагодження вебзастосунків.

Основні браузери з DevTools:

    Google Chrome
    Mozilla Firefox
    Microsoft Edge
    Safari

У більшості браузерів інструменти мають схожі можливості. У цьому розділі основні приклади орієнтовані на Chrome DevTools, але більшість із них застосовні й до Firefox та Edge.

---

## Ключові поняття

✔ DevTools  
✔ Developer Tools  
✔ Inspect  
✔ Elements  
✔ DOM  
✔ Styles  
✔ Computed Styles  
✔ Box Model  
✔ Console  
✔ Network  
✔ Sources  
✔ Application  
✔ Performance  
✔ Lighthouse  
✔ Responsive Design Mode  
✔ Device Toolbar  
✔ Viewport  
✔ CSS debugging  
✔ DOM inspection  
✔ CSS overrides  
✔ Toggle element state  
✔ Force state  
✔ Breakpoints  
✔ Console errors  
✔ Network requests  
✔ Cache  
✔ Local Storage  
✔ Session Storage  
✔ Cookies  
✔ Accessibility inspection  
✔ Performance profiling  
✔ Browser rendering  

---

## Що потрібно пам'ятати

• DevTools — це набір інструментів для дослідження та налагодження вебсторінок.

• DevTools відкриваються безпосередньо в браузері.

• `Elements` дозволяє досліджувати HTML-структуру сторінки та її CSS-стилі.

• `Styles` показує CSS-правила, які застосовуються до вибраного елемента або впливають на нього.

• `Computed` показує обчислені значення CSS-властивостей після врахування каскаду, успадкування та інших правил браузера.

• `Box Model` допомагає аналізувати `content`, `padding`, `border` і `margin`.

• `Console` показує повідомлення, попередження та помилки JavaScript, а також дозволяє виконувати код.

• `Network` показує мережеві запити, завантаження CSS, JavaScript, зображень та інших ресурсів.

• `Sources` дозволяє переглядати вихідні файли та використовувати JavaScript breakpoints.

• `Application` допомагає досліджувати сховища браузера, cookies та інші дані вебзастосунку.

• `Device Toolbar` дозволяє перевіряти адаптивний вигляд сторінки на різних розмірах viewport.

• `Lighthouse` допомагає оцінювати продуктивність, доступність, SEO та інші характеристики сторінки.

• Зміни CSS, зроблені безпосередньо в DevTools, зазвичай не зберігаються у вихідних файлах проєкту.

• DevTools допомагає визначити причину проблеми, але не замінює розуміння HTML, CSS і JavaScript.

• Найефективніший підхід до налагодження — змінювати одну річ за раз і перевіряти результат.

---

# Що таке DevTools

DevTools — це набір інструментів браузера, призначених для роботи з вебсторінками.

За допомогою DevTools можна:

    досліджувати HTML
    перевіряти CSS
    змінювати стилі під час розробки
    знаходити помилки в JavaScript
    аналізувати мережеві запити
    перевіряти адаптивність
    досліджувати сховища браузера
    вимірювати продуктивність
    перевіряти доступність
    аналізувати завантаження ресурсів

Наприклад, якщо елемент не розташовується по центру сторінки, можна відкрити DevTools і перевірити:

    1. Чи вибрано правильний HTML-елемент.
    2. Які CSS-правила до нього застосовуються.
    3. Чи не перекриває потрібне правило інше правило.
    4. Які значення має Box Model.
    5. Який розмір має батьківський контейнер.
    6. Чи правильно працюють Flexbox або Grid.

DevTools допомагає досліджувати проблему замість того, щоб навмання змінювати CSS.

---

# Як відкрити DevTools

## Спосіб 1 — клавіатура

У Chrome та Edge на Windows:

    F12

Або:

    Ctrl + Shift + I

Відкрити інструменти для конкретного елемента:

    Ctrl + Shift + C

Після цього можна навести курсор на елемент сторінки та вибрати його для дослідження.

У Firefox також можна використовувати `F12` або `Ctrl + Shift + I`.

На macOS поширені комбінації:

    Cmd + Option + I
    Cmd + Option + C

Комбінації можуть відрізнятися залежно від браузера, операційної системи та налаштувань.

---

## Спосіб 2 — контекстне меню

На вебсторінці:

    1. Клацнути правою кнопкою миші.
    2. Вибрати Inspect або Inspect Element.
    3. Відкриється DevTools.
    4. Браузер зазвичай вибере відповідний HTML-елемент.

Це один із найзручніших способів досліджувати конкретний елемент.

---

# Основні панелі DevTools

Найважливіші панелі:

    Elements
    Console
    Sources
    Network
    Application
    Performance
    Memory
    Security
    Lighthouse

Набір і розташування панелей можуть відрізнятися залежно від браузера.

Для вивчення HTML і CSS насамперед потрібні:

    Elements
    Console
    Network
    Device Toolbar
    Lighthouse

---

# Elements

`Elements` — панель для дослідження DOM і CSS вебсторінки.

DOM (Document Object Model) — об'єктне представлення HTML-документа, з яким працює браузер.

У `Elements` можна:

    переглядати HTML-елементи
    досліджувати вкладеність
    переглядати атрибути
    змінювати HTML
    перевіряти CSS
    додавати CSS-правила
    вимикати CSS-властивості
    перевіряти Box Model
    досліджувати псевдокласи
    перевіряти розміри елементів

Наприклад, HTML:

    <div class="card">
        <h2>Title</h2>
        <p>Description</p>
    </div>

У `Elements` можна побачити структуру:

    div.card
        h2
        p

Можна розгорнути або згорнути вкладені елементи та дослідити їхні властивості.

---

## Inspect Element

Inspect Element — вибір HTML-елемента сторінки для дослідження.

Наприклад, на сторінці є кнопка:

    <button class="button">
        Send
    </button>

Якщо вибрати її через Inspect, у `Elements` буде видно:

    <button class="button">Send</button>

Після цього можна дослідити:

    class
    id
    color
    background-color
    padding
    margin
    border
    width
    height
    font-size

Це особливо корисно, коли потрібно зрозуміти, чому елемент виглядає не так, як очікувалося.

---

## DOM Tree

DOM Tree — дерево елементів HTML-документа.

Наприклад:

    <body>
        <main>
            <section class="hero">
                <h1>Welcome</h1>
                <p>Introduction</p>
            </section>
        </main>
    </body>

Структура:

    body
        main
            section.hero
                h1
                p

DOM Tree допомагає зрозуміти:

    які елементи є батьківськими
    які елементи є дочірніми
    які елементи вкладені один в одного
    до яких елементів застосовуються CSS-селектори

Важливо: DOM може відрізнятися від початкового HTML-файлу, якщо JavaScript змінив структуру сторінки.

---

## Edit HTML

У `Elements` можна тимчасово змінювати HTML.

Наприклад, було:

    <h1>Hello</h1>

Можна змінити на:

    <h1>Hello, world!</h1>

Або додати новий елемент:

    <p>New paragraph</p>

Це допомагає швидко перевіряти структуру та вигляд сторінки.

Однак такі зміни зазвичай існують лише в поточному стані сторінки.

Щоб зберегти зміну в проєкті, потрібно відредагувати відповідний HTML, JSX або інший вихідний файл.

---

# Styles

`Styles` — секція в `Elements`, яка показує CSS-правила, пов'язані з вибраним елементом.

Наприклад:

    .card {
        background-color: white;
        padding: 20px;
        border-radius: 8px;
    }

У `Styles` можна:

    переглядати селектори
    перевіряти CSS-властивості
    змінювати значення
    додавати нові властивості
    вимикати окремі декларації
    створювати нові правила
    бачити джерело CSS-правила

---

## Увімкнення та вимкнення CSS

Припустимо, маємо:

    .card {
        padding: 20px;
        background-color: white;
        border: 1px solid gray;
    }

У `Styles` можна вимкнути:

    padding: 20px;

і подивитися, як зміниться картка.

Це корисно для перевірки гіпотез.

Наприклад:

    Чи спричиняє padding надмірний розмір?
    Чи впливає border на ширину?
    Чи перекривається background іншим правилом?
    Чи потрібна конкретна властивість?

Вимкнена властивість не видаляється з вихідного CSS-файлу.

---

## Додавання CSS-властивості

Припустимо, потрібно перевірити вирівнювання:

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

У `Styles` можна тимчасово додати:

    justify-content: center;

або:

    align-items: center;

Після зміни браузер одразу покаже результат.

Якщо результат правильний, потрібно перенести потрібну зміну у відповідний CSS-файл.

---

## Звідки завантажено CSS

У `Styles` браузер часто показує назву CSS-файлу та номер рядка, де визначено правило.

Наприклад:

    styles.css:24

Це може означати, що правило знаходиться у файлі `styles.css` приблизно на рядку 24.

Клацання на посилання зазвичай відкриває відповідне місце у вихідному файлі.

Якщо CSS об'єднано або мінімізовано під час production build, структура файлів може бути іншою.

---

# Computed Styles

`Computed` показує обчислені значення CSS-властивостей вибраного елемента.

Наприклад, у CSS є:

    .card {
        width: 300px;
        padding: 20px;
        border: 2px solid black;
    }

У `Computed` можна перевірити фактичні значення:

    width
    height
    padding
    margin
    border
    display
    position
    color
    font-size

Це корисно, коли потрібно зрозуміти, яке значення властивості зрештою використовує браузер.

---

## Styles vs Computed

`Styles` показує правила та декларації CSS.

`Computed` показує обчислені значення властивостей.

Наприклад:

    .title {
        color: blue;
    }

    h1 {
        color: red;
    }

Якщо елемент має клас `title`:

    <h1 class="title">Hello</h1>

У `Styles` можна побачити обидва правила та визначити, яке з них програє в каскаді.

У `Computed` можна перевірити кінцеве значення:

    color: blue

Це пояснюється тим, що селектор `.title` має більшу специфічність, ніж селектор `h1`.

---

# CSS Cascade у DevTools

DevTools допомагає досліджувати каскад CSS.

Наприклад:

    p {
        color: red;
    }

    .description {
        color: blue;
    }

HTML:

    <p class="description">
        Text
    </p>

Обидва правила відповідають елементу, але правило `.description` має більшу специфічність.

Результат:

    color: blue

У `Styles` можна побачити, що декларація `color: red` перекреслена, оскільки її значення не використовується для кінцевого кольору тексту.

Причини, через які CSS-декларація може не застосовуватися:

    нижча специфічність
    порядок правил
    інше правило з !important
    невідповідність селектора
    невалідне значення
    вимкнена декларація
    вплив cascade layers
    вплив успадкування
    вплив inline styles

Не варто автоматично додавати `!important`, якщо правило не працює. Спочатку потрібно знайти справжню причину.

---

# Box Model

Box Model — модель CSS, яка описує простір, зайнятий елементом.

Основні частини:

    content
    padding
    border
    margin

Схематично:

    margin
        border
            padding
                content

Приклад:

    .box {
        width: 200px;
        padding: 20px;
        border: 5px solid black;
        margin: 10px;
    }

За стандартного `box-sizing: content-box`:

    content width = 200px
    padding left + right = 40px
    border left + right = 10px

Загальна ширина самого елемента без зовнішнього margin:

    200 + 40 + 10 = 250px

Якщо враховувати також лівий і правий margin:

    250 + 20 = 270px

---

## box-sizing: border-box

Часто використовують:

    *,
    *::before,
    *::after {
        box-sizing: border-box;
    }

За `box-sizing: border-box` значення `width` включає content, padding і border.

Наприклад:

    .box {
        box-sizing: border-box;
        width: 200px;
        padding: 20px;
        border: 5px solid black;
    }

Загальна ширина елемента:

    200px

Ширина content:

    200 - 40 - 10 = 150px

`margin` не входить до ширини, заданої через `width`.

---

## Як перевіряти Box Model

    1. Відкрити DevTools.
    2. Вибрати потрібний елемент у Elements.
    3. Знайти Box Model.
    4. Перевірити content.
    5. Перевірити padding.
    6. Перевірити border.
    7. Перевірити margin.

Це допомагає знаходити проблеми з:

    шириною елементів
    висотою елементів
    відступами
    переповненням контейнерів
    розташуванням елементів
    несподіваними розмірами

---

# CSS Layout Debugging

DevTools особливо корисний для перевірки Flexbox і Grid.

## Flexbox

Приклад:

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
        gap: 20px;
    }

Якщо елементи розташовуються неправильно, потрібно перевірити:

    display: flex
    flex-direction
    justify-content
    align-items
    flex-wrap
    gap
    flex-grow
    flex-shrink
    flex-basis

У Chrome DevTools для Flexbox можуть бути доступні спеціальні засоби візуалізації та підказки, які допомагають досліджувати контейнер і його елементи.

---

## Grid

Приклад:

    .grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 16px;
    }

Якщо сітка працює неправильно, перевір:

    display: grid
    grid-template-columns
    grid-template-rows
    grid-auto-flow
    gap
    justify-items
    align-items
    grid-column
    grid-row

У Chrome DevTools доступні Grid overlays, які допомагають побачити лінії сітки та розташування елементів.

---

# Toggle Element State

У DevTools можна примусово перевірити певні стани елемента.

Наприклад:

    :hover
    :active
    :focus
    :focus-visible

Це корисно, коли потрібно дослідити стилі, які активуються лише за певної взаємодії.

---

## Перевірка :hover

CSS:

    .button {
        background-color: blue;
        color: white;
    }

    .button:hover {
        background-color: darkblue;
    }

HTML:

    <button class="button">
        Submit
    </button>

Зазвичай `:hover` активується, коли курсор наведено на кнопку.

Але можна примусово активувати цей стан у DevTools і перевірити стилі без необхідності постійно наводити курсор.

Це корисно, коли:

    елемент швидко зникає
    меню закривається при переміщенні курсора
    hover-ефект важко дослідити
    потрібно перевірити каскад CSS у певному стані

Назви й розташування відповідних засобів залежать від браузера.

---

# Responsive Design Mode

Responsive Design Mode дозволяє перевіряти сторінку за різних розмірів viewport.

Viewport — видима область сторінки у вікні браузера.

В адаптивному дизайні важливо перевіряти:

    ширину viewport
    висоту viewport
    розташування блоків
    розміри тексту
    адаптивні зображення
    навігацію
    переповнення
    горизонтальне прокручування
    media queries

---

## Device Toolbar

У Chrome та Edge можна відкрити Device Toolbar у DevTools.

Поширена комбінація:

    Ctrl + Shift + M

За допомогою Device Toolbar можна:

    змінювати ширину viewport
    змінювати висоту viewport
    вибирати поширені профілі пристроїв
    змінювати масштаб перегляду
    перевіряти responsive layout
    досліджувати media queries

Важливо: емуляція пристрою не завжди повністю відтворює реальну поведінку фізичного смартфона.

---

## Перевірка media queries

CSS:

    .container {
        padding: 32px;
    }

    @media (max-width: 768px) {
        .container {
            padding: 16px;
        }
    }

Якщо ширина viewport становить 1024px:

    padding: 32px

Якщо ширина viewport становить 600px:

    padding: 16px

У DevTools можна змінювати ширину viewport і спостерігати, коли змінюються стилі.

---

## Responsive Debugging Checklist

Перевір:

    [ ] Чи правильно змінюється layout на мобільних екранах?
    [ ] Чи немає горизонтального прокручування?
    [ ] Чи не виходить текст за межі контейнера?
    [ ] Чи правильно масштабується зображення?
    [ ] Чи працює навігація?
    [ ] Чи достатньо місця для кнопок?
    [ ] Чи не накладаються елементи один на одного?
    [ ] Чи правильно працюють media queries?
    [ ] Чи не створюють проблем фіксовані ширини?
    [ ] Чи не обрізається важливий контент?

---

# Console

`Console` — панель для роботи з повідомленнями та виконання JavaScript.

За допомогою Console можна:

    переглядати помилки
    переглядати попередження
    виводити повідомлення
    виконувати JavaScript
    перевіряти значення змінних
    досліджувати DOM
    перевіряти результати виразів

Наприклад:

    console.log("Hello, DevTools!");

Результат:

    Hello, DevTools!

---

## Основні console methods

### console.log()

Звичайне повідомлення.

    console.log("Hello");

### console.warn()

Попередження.

    console.warn("Check this value");

### console.error()

Повідомлення про помилку.

    console.error("Something went wrong");

### console.table()

Виведення табличних даних.

    const users = [
        { name: "Anna", age: 25 },
        { name: "John", age: 30 }
    ];

    console.table(users);

### console.clear()

Очищення консолі.

    console.clear();

### console.dir()

Дослідження властивостей об'єкта.

    console.dir(document.body);

---

# Console для CSS

Console корисна не лише для JavaScript.

Можна перевіряти CSS через JavaScript.

Наприклад:

    const element = document.querySelector(".card");

    console.log(element);

Якщо елемент знайдено, Console покаже DOM-елемент.

Якщо елемента немає:

    null

Це допомагає перевірити правильність CSS-селектора, який використовується для пошуку елемента.

---

## getComputedStyle()

`getComputedStyle()` дозволяє отримати обчислені стилі елемента через JavaScript.

Приклад:

    const element = document.querySelector(".card");

    const styles = getComputedStyle(element);

    console.log(styles.color);
    console.log(styles.backgroundColor);
    console.log(styles.width);
    console.log(styles.display);

Це корисно, коли потрібно програмно перевірити значення CSS.

Якщо елемент не знайдено, `element` буде `null`, тому перед використанням потрібно врахувати цю можливість.

Безпечніший приклад:

    const element = document.querySelector(".card");

    if (element) {
        const styles = getComputedStyle(element);

        console.log(styles.color);
        console.log(styles.width);
    }

---

# Sources

`Sources` — панель для дослідження вихідних файлів і налагодження JavaScript.

У ній можна:

    переглядати JavaScript-файли
    переглядати завантажені ресурси
    встановлювати breakpoints
    виконувати код покроково
    перевіряти значення змінних
    досліджувати call stack
    налагоджувати виконання програми

Для HTML і CSS ця панель також може допомогти знайти завантажені ресурси, хоча основна робота зі стилями зазвичай виконується в `Elements`.

---

## Breakpoints

Breakpoint — точка зупинки виконання JavaScript.

Наприклад:

    function calculateTotal(price, quantity) {
        const total = price * quantity;

        return total;
    }

Можна встановити breakpoint на рядку:

    const total = price * quantity;

Коли виконання дійде до цієї точки, браузер зупинить виконання функції.

Можна перевірити:

    price
    quantity
    total
    call stack

Breakpoints особливо корисні, коли візуальна проблема спричинена JavaScript, який змінює DOM або CSS-класи.

---

# Network

`Network` — панель для дослідження мережевих запитів і завантаження ресурсів.

Вона дозволяє перевіряти:

    HTML-документ
    CSS-файли
    JavaScript-файли
    зображення
    шрифти
    API-запити
    статуси HTTP
    час завантаження
    розміри ресурсів
    кешування
    помилки запитів

---

## Як перевірити CSS-файл

    1. Відкрити DevTools.
    2. Перейти до Network.
    3. Перезавантажити сторінку.
    4. Відфільтрувати запити за CSS.
    5. Вибрати потрібний файл.
    6. Переглянути статус, заголовки та вміст.

Якщо CSS-файл не завантажився, потрібно перевірити:

    URL файлу
    HTTP status
    правильність шляху
    налаштування сервера
    помилки в консолі
    тип відповіді сервера

---

## HTTP Status

Поширені статуси:

    200 OK
    301 Moved Permanently
    304 Not Modified
    400 Bad Request
    403 Forbidden
    404 Not Found
    500 Internal Server Error

Для CSS важливо, щоб браузер отримував правильний файл і відповідь сервера.

Наприклад, якщо файл не знайдено:

    styles.css → 404

браузер не зможе завантажити цей файл за вказаним URL.

---

## Disable Cache

У DevTools, коли відкрито `Network`, доступна опція `Disable cache` у відповідних браузерах.

Вона дозволяє перевіряти завантаження ресурсів без використання звичайного HTTP-кешу браузера, поки DevTools відкрито.

Це корисно, коли:

    CSS було змінено
    браузер показує старі стилі
    потрібно перевірити завантаження актуальних файлів
    досліджується кешування ресурсів

Важливо: `Disable cache` не очищає всі види сховищ і не вимикає кожен можливий механізм кешування в застосунку.

---

# Application

`Application` — панель Chrome DevTools для дослідження сховищ браузера та пов'язаних даних вебзастосунку.

Залежно від браузера, відповідні можливості можуть бути розташовані в інших панелях.

Можна досліджувати:

    Local Storage
    Session Storage
    Cookies
    IndexedDB
    Cache Storage
    Service Workers
    Manifest

Для базового HTML/CSS ці можливості не є головними, але вони важливі під час розробки сучасних вебзастосунків.

---

## Local Storage

`localStorage` дозволяє зберігати рядкові дані у браузері.

Приклад у Console:

    localStorage.setItem("theme", "dark");

Прочитати значення:

    localStorage.getItem("theme");

Результат:

    "dark"

Видалити конкретний запис:

    localStorage.removeItem("theme");

Переглянути дані можна в Application → Local Storage.

---

## Session Storage

`sessionStorage` зберігає дані в межах відповідної сесії сторінки.

Приклад:

    sessionStorage.setItem("username", "Anna");

Отримання:

    sessionStorage.getItem("username");

Дані `sessionStorage` мають іншу модель життєвого циклу, ніж `localStorage`.

---

## Cookies

Cookies — невеликі дані, які браузер зберігає для вебсайту та може надсилати серверу відповідно до налаштувань cookie.

Cookies часто використовуються для:

    сесій
    автентифікації
    налаштувань
    збереження стану користувача

У DevTools можна досліджувати наявні cookies та їхні атрибути.

Важливі атрибути:

    Domain
    Path
    Expires / Max-Age
    Secure
    HttpOnly
    SameSite

`HttpOnly` cookies не доступні через `document.cookie`, але можуть бути видимими в DevTools за наявності відповідних прав доступу.

---

# Performance

`Performance` допомагає досліджувати продуктивність вебсторінки.

Залежно від інструмента та браузера можна аналізувати:

    час виконання JavaScript
    завантаження ресурсів
    rendering
    painting
    layout
    довгі завдання
    затримки головного потоку
    взаємодію користувача зі сторінкою

Для CSS важливо розуміти, що складний або невдало організований layout може впливати на продуктивність.

Наприклад, часті зміни геометричних властивостей можуть спричиняти додаткові layout calculations.

Поширені приклади властивостей, зміна яких може спричиняти layout:

    width
    height
    margin
    padding
    top
    left

Зміни `transform` і `opacity` у багатьох випадках можна анімувати ефективніше, але це залежить від конкретної реалізації та браузера.

Не варто оптимізувати CSS лише на основі припущень. Спочатку потрібно виміряти проблему.

---

# Lighthouse

Lighthouse — інструмент аудиту вебсторінок.

Він допомагає оцінити:

    Performance
    Accessibility
    Best Practices
    SEO

Набір категорій і спосіб запуску можуть залежати від версії Lighthouse та середовища.

Lighthouse може допомогти виявити проблеми, пов'язані з:

    повільним завантаженням
    зображеннями
    ресурсами, які блокують rendering
    доступністю
    недостатнім контрастом
    відсутністю коректних метаданих
    деякими помилками конфігурації

Результати аудиту — це рекомендації та вимірювання в конкретних умовах, а не абсолютна гарантія якості сайту.

---

# Accessibility у DevTools

DevTools може допомогти перевірити доступність вебсторінки.

Важливі аспекти:

    семантичні HTML-елементи
    доступні назви кнопок
    labels для форм
    контраст тексту
    keyboard focus
    видимість focus indicator
    структуру заголовків
    альтернативний текст зображень
    ARIA attributes

Наприклад, кнопка:

    <button>
        <span class="icon"></span>
    </button>

може не мати доступної назви, якщо іконка не передає потрібного змісту через доступне ім'я.

Краще:

    <button aria-label="Close menu">
        <span class="icon" aria-hidden="true"></span>
    </button>

Якщо кнопка має видимий текст, він часто вже забезпечує доступну назву:

    <button>
        Close menu
    </button>

DevTools може допомогти дослідити accessibility tree, але автоматичні перевірки не замінюють тестування клавіатурою та перевірки зі скринридером.

---

# DevTools для перевірки шрифтів

Якщо шрифт виглядає неправильно, можна перевірити:

    font-family
    font-size
    font-weight
    line-height
    letter-spacing
    завантаження font-файлу
    помилки у Network
    fallback fonts

CSS:

    body {
        font-family: "Roboto", Arial, sans-serif;
    }

Якщо `Roboto` не завантажився або не містить потрібного символу, браузер може використати інший шрифт.

У `Computed` можна досліджувати обчислені типографічні властивості, а в `Network` — перевіряти завантаження шрифтів.

---

# DevTools для перевірки зображень

Якщо зображення не відображається, перевір:

    правильність URL
    HTTP status
    файл у Network
    розміри зображення
    CSS width
    CSS height
    object-fit
    object-position
    overflow
    display
    visibility
    opacity

Наприклад:

    .image {
        width: 100%;
        height: 250px;
        object-fit: cover;
    }

Якщо зображення обрізається, причина може бути в:

    object-fit: cover
    фіксованій висоті
    пропорціях вихідного зображення
    контейнері
    overflow: hidden

DevTools допомагає відокремити проблему завантаження ресурсу від проблеми CSS-відображення.

---

# DevTools для перевірки позиціонування

Якщо елемент розташований не там, де очікується, перевір:

    position
    top
    right
    bottom
    left
    inset
    z-index
    containing block
    transform
    margin
    display
    overflow

Приклад:

    .badge {
        position: absolute;
        top: 0;
        right: 0;
    }

Якщо елемент розташований відносно неочікуваного контейнера, перевір його containing block.

Наприклад:

    .card {
        position: relative;
    }

    .badge {
        position: absolute;
        top: 10px;
        right: 10px;
    }

У такому випадку `.badge` зазвичай позиціонується відносно padding box найближчого відповідного предка, яким тут є `.card`.

---

# DevTools для перевірки z-index

Якщо один елемент перекриває інший, потрібно дослідити:

    position
    z-index
    stacking context
    transform
    opacity
    isolation
    інші властивості, що створюють stacking context

Приклад:

    .modal {
        position: fixed;
        z-index: 1000;
    }

Великий `z-index` не гарантує, що елемент буде поверх усіх інших елементів сторінки.

Причиною може бути stacking context.

Тому важливо досліджувати не лише значення `z-index`, а й структуру предків та властивості, які створюють контексти накладання.

---

# Практичний алгоритм CSS Debugging

Коли елемент виглядає неправильно:

    1. Відкрити DevTools.
    2. Вибрати потрібний елемент.
    3. Перевірити HTML і класи.
    4. Переглянути Styles.
    5. Знайти потрібне CSS-правило.
    6. Перевірити перекреслені декларації.
    7. Відкрити Computed.
    8. Перевірити Box Model.
    9. Перевірити батьківські елементи.
    10. Перевірити Flexbox або Grid.
    11. Перевірити viewport і media queries.
    12. Змінити одну властивість у DevTools.
    13. Перевірити результат.
    14. Перенести потрібне виправлення у вихідний файл.
    15. Повторно перевірити сторінку.

Цей алгоритм допомагає систематично знаходити причину проблеми.

---

# Практичні приклади

## Приклад 1 — чому не працює колір

HTML:

    <p class="description">
        Hello world
    </p>

CSS:

    p {
        color: red;
    }

    .description {
        color: blue;
    }

Завдання:

    1. Відкрити DevTools.
    2. Вибрати paragraph.
    3. Перейти до Styles.
    4. Перевірити обидва правила.
    5. Знайти перекреслену декларацію.
    6. Перевірити кінцеве значення в Computed.

Очікуваний результат:

    color: blue

Причина:

    .description має більшу специфічність, ніж p

---

## Приклад 2 — чому елемент ширший за очікуване

CSS:

    .box {
        width: 300px;
        padding: 20px;
        border: 5px solid black;
    }

За стандартного `content-box`:

    content width = 300px
    padding = 40px
    border = 10px

Загальна ширина елемента:

    350px

Завдання:

    1. Вибрати .box у DevTools.
    2. Перевірити Box Model.
    3. Перевірити box-sizing.
    4. Тимчасово встановити border-box.
    5. Порівняти результат.

Варіант виправлення:

    .box {
        box-sizing: border-box;
        width: 300px;
        padding: 20px;
        border: 5px solid black;
    }

---

## Приклад 3 — чому не працює hover

CSS:

    .button {
        background-color: blue;
    }

    .button:hover {
        background-color: red;
    }

Завдання:

    1. Вибрати кнопку в Elements.
    2. Примусово активувати :hover.
    3. Перевірити Styles.
    4. Перевірити, чи застосовується background-color.
    5. Перевірити, чи не перекривається правило іншим CSS.

Очікуваний результат:

    background-color: red

---

## Приклад 4 — чому з'являється горизонтальне прокручування

CSS:

    .container {
        width: 1200px;
    }

На екрані шириною 375px контейнер може спричинити горизонтальне переповнення.

Завдання:

    1. Відкрити Device Toolbar.
    2. Встановити вузький viewport.
    3. Вибрати .container.
    4. Перевірити Computed width.
    5. Знайти елемент, який виходить за межі viewport.
    6. Перевірити фіксовані ширини та дочірні елементи.

Один із можливих варіантів:

    .container {
        width: 100%;
        max-width: 1200px;
        margin-inline: auto;
    }

Конкретне виправлення залежить від структури layout.

---

## Приклад 5 — чому не завантажується CSS

HTML:

    <link rel="stylesheet" href="/css/styles.css">

Завдання:

    1. Відкрити Network.
    2. Перезавантажити сторінку.
    3. Знайти styles.css.
    4. Перевірити статус відповіді.
    5. Перевірити Request URL.
    6. Перевірити, чи існує файл за відповідним шляхом.

Якщо результат:

    404 Not Found

потрібно перевірити шлях до файлу та конфігурацію сервера.

---

## Приклад 6 — чому не працює media query

CSS:

    .card {
        padding: 32px;
    }

    @media (max-width: 600px) {
        .card {
            padding: 16px;
        }
    }

Завдання:

    1. Відкрити Device Toolbar.
    2. Встановити ширину 800px.
    3. Перевірити padding.
    4. Зменшити ширину до 500px.
    5. Перевірити padding повторно.

Очікуваний результат:

    viewport 800px → padding: 32px
    viewport 500px → padding: 16px

Якщо результат інший, перевір:

    фактичну ширину viewport
    media query
    каскад
    специфічність
    інші правила
    CSS-файл, який завантажується

---

# Типові помилки під час роботи з DevTools

❌ Вважати, що зміни в DevTools автоматично змінюють CSS-файл.

Зазвичай це тимчасові зміни поточного стану сторінки.

---

❌ Одразу додавати `!important`, якщо властивість не працює.

Спочатку потрібно перевірити каскад, специфічність і джерело правила.

---

❌ Змінювати багато властивостей одночасно.

Так важче визначити, яка зміна вплинула на результат.

Краще змінювати одну властивість за раз.

---

❌ Перевіряти лише вибраний елемент.

Проблема може бути в батьківському контейнері, сусідніх елементах або загальному layout.

---

❌ Плутати Styles і Computed.

`Styles` показує правила CSS.

`Computed` показує обчислені значення властивостей.

---

❌ Ігнорувати Box Model.

Несподівані розміри часто пов'язані з `padding`, `border`, `margin` або `box-sizing`.

---

❌ Перевіряти адаптивність лише на одному розмірі екрана.

Потрібно досліджувати різні ширини viewport і граничні значення media queries.

---

❌ Ігнорувати Network.

Якщо CSS-файл не завантажився, зміни його правил не допоможуть, доки не буде виправлено проблему завантаження.

---

❌ Вважати, що успішне завантаження CSS гарантує правильне застосування стилів.

Файл може завантажитися, але окремий селектор може не відповідати елементу або декларація може програти в каскаді.

---

❌ Вважати, що емуляція мобільного пристрою повністю замінює реальне тестування.

DevTools допомагає перевіряти responsive layout, але реальні пристрої можуть мати відмінності у браузері, шрифтах, введенні та продуктивності.

---

# DevTools і робочий процес розробника

Типовий процес:

    HTML / CSS / JavaScript
            ↓
    Відкрити сторінку в браузері
            ↓
    Перевірити вигляд
            ↓
    Відкрити DevTools
            ↓
    Знайти проблему
            ↓
    Перевірити гіпотезу
            ↓
    Тимчасово змінити код
            ↓
    Перевірити результат
            ↓
    Виправити вихідні файли
            ↓
    Повторно перевірити сторінку
            ↓
    Commit у Git

DevTools — частина щоденного циклу розробки, а не лише інструмент для пошуку помилок.

---

# DevTools у проєкті HTML/CSS

Наприклад, структура навчального завдання:

    responsive-card/
    ├── index.html
    ├── styles.css
    └── script.js

Робочий процес:

    1. Відкрити index.html у браузері або запустити локальний сервер.
    2. Перевірити сторінку.
    3. Відкрити DevTools.
    4. Дослідити HTML у Elements.
    5. Перевірити CSS у Styles.
    6. Перевірити обчислені значення в Computed.
    7. Перевірити різні viewport у Device Toolbar.
    8. За потреби перевірити помилки в Console.
    9. Перевірити завантаження файлів у Network.
    10. Внести зміни у styles.css.
    11. Перевірити результат.
    12. Зберегти зміни в Git.

Важливо: DevTools допомагає досліджувати сторінку, але основний код потрібно підтримувати у вихідних файлах проєкту.

---

# Практичні завдання

## Завдання 1 — дослідження HTML

Створи просту сторінку:

    <main class="container">
        <h1>My page</h1>
        <p class="description">
            Learning DevTools
        </p>
        <button class="button">
            Click me
        </button>
    </main>

У DevTools:

    [ ] Знайди main.
    [ ] Розгорни його дочірні елементи.
    [ ] Вибери h1.
    [ ] Вибери paragraph.
    [ ] Вибери button.
    [ ] Перевір їхні класи.
    [ ] Тимчасово зміни текст.
    [ ] Перевір, як змінюється сторінка.

---

## Завдання 2 — дослідження CSS

Додай стилі:

    .container {
        max-width: 800px;
        margin: 0 auto;
        padding: 24px;
    }

    .description {
        color: gray;
        font-size: 18px;
    }

    .button {
        padding: 12px 20px;
        background-color: blue;
        color: white;
        border: none;
    }

У DevTools:

    [ ] Перевір Styles.
    [ ] Перевір Computed.
    [ ] Зміни color.
    [ ] Зміни padding.
    [ ] Вимкни background-color.
    [ ] Перевір Box Model.
    [ ] Знайди джерело CSS-правил.

---

## Завдання 3 — дослідження каскаду

Додай:

    p {
        color: red;
    }

    .description {
        color: green;
    }

    #intro {
        color: blue;
    }

Зміни HTML:

    <p id="intro" class="description">
        Learning CSS cascade
    </p>

У DevTools:

    [ ] Перевір усі правила.
    [ ] Знайди перекреслені декларації.
    [ ] Перевір кінцевий колір.
    [ ] Тимчасово вимкни правило з id.
    [ ] Перевір, як зміниться результат.

---

## Завдання 4 — адаптивність

Додай:

    .container {
        width: 100%;
        max-width: 800px;
        margin-inline: auto;
        padding: 24px;
    }

    @media (max-width: 600px) {
        .container {
            padding: 12px;
        }
    }

У DevTools:

    [ ] Перевір viewport 1200px.
    [ ] Перевір viewport 800px.
    [ ] Перевір viewport 600px.
    [ ] Перевір viewport 375px.
    [ ] Перевір Computed padding.
    [ ] Перевір горизонтальне переповнення.

---

## Завдання 5 — пошук помилки

Навмисно додай помилку:

    .container {
        display: flex;
        justify-content: center;
        align-item: center;
    }

У DevTools:

    [ ] Вибери .container.
    [ ] Знайди неправильну властивість.
    [ ] Перевір, чи браузер застосував її.
    [ ] Виправ назву властивості.
    [ ] Перевір результат.

Правильний варіант:

    .container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

---

# Питання зі співбесіди

Що таке DevTools?

Для чого використовують браузерні інструменти розробника?

Як відкрити DevTools?

Для чого потрібна панель Elements?

Що таке DOM?

Чим DOM відрізняється від початкового HTML-файлу?

Для чого потрібна панель Styles?

Що показує Computed?

Чим Styles відрізняється від Computed?

Як перевірити, чому CSS-властивість не застосовується?

Що означає перекреслена CSS-декларація?

Як знайти файл, у якому визначено CSS-правило?

Що таке Box Model?

Які частини має Box Model?

Чим `content-box` відрізняється від `border-box`?

Як DevTools допомагає досліджувати Flexbox?

Як DevTools допомагає досліджувати Grid?

Як перевірити стан `:hover`?

Для чого потрібна Device Toolbar?

Що таке viewport?

Як перевірити media queries?

Для чого потрібна Console?

Яка різниця між `console.log()`, `console.warn()` і `console.error()`?

Для чого використовують `getComputedStyle()`?

Для чого потрібна панель Network?

Як знайти помилку завантаження CSS?

Що означає HTTP status 404?

Для чого потрібна опція Disable cache?

Для чого потрібна панель Application?

Що таке Local Storage?

Чим Local Storage відрізняється від Session Storage?

Що таке breakpoint?

Для чого потрібна панель Performance?

Що таке Lighthouse?

Які аспекти доступності можна перевіряти за допомогою DevTools?

Чому не можна покладатися лише на автоматичні accessibility audits?

Чи зберігаються зміни CSS, зроблені в DevTools?

Як правильно перенести виправлення з DevTools у проєкт?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке DevTools.

Як відкрити DevTools.

Основи панелі Elements.

DOM Tree.

Inspect Element.

Основи Styles.

Основи Computed.

CSS Cascade.

Специфічність CSS.

Box Model.

Тимчасова зміна CSS.

Увімкнення та вимкнення CSS-декларацій.

Перевірка розмірів елемента.

Основи Console.

Перевірка помилок у Console.

Device Toolbar.

Основи responsive debugging.

Перевірка media queries.

Розуміння, що зміни в DevTools не обов'язково змінюють вихідні файли.

---

## 🔵 Junior

Упевнене використання Elements.

Дослідження батьківських і дочірніх елементів.

Перевірка джерела CSS-правила.

Пошук проблем специфічності.

Розуміння перекреслених декларацій.

Computed Styles.

Box Model debugging.

Flexbox debugging.

Grid debugging.

Перевірка `:hover` і `:focus`.

Перевірка адаптивності на різних viewport.

Основи Network.

Пошук помилок завантаження CSS, JavaScript і зображень.

Основи HTTP status codes.

Використання Console для перевірки DOM.

Основи `getComputedStyle()`.

Основи Application.

Перевірка шрифтів і зображень.

Основи доступності.

Основи Lighthouse.

Систематичний процес CSS debugging.

---

## 🟠 Middle

Глибше розуміння cascade layers.

Дослідження stacking contexts.

Аналіз складних Flexbox і Grid layouts.

Дослідження rendering pipeline.

Аналіз мережевих waterfall charts.

Дослідження кешування ресурсів.

JavaScript breakpoints.

Покрокове виконання коду.

Дослідження call stack.

Performance profiling.

Дослідження layout shifts.

Аналіз довгих завдань у головному потоці.

Пошук причин повільного rendering.

Аналіз доступності через accessibility tree.

Дослідження computed styles у складних компонентах.

Відтворення помилок за різних viewport.

Використання DevTools для діагностики production build.

Аналіз впливу CSS на продуктивність.

---

## 🔴 Senior

Глибокий аналіз browser rendering pipeline.

Дослідження style recalculation, layout і painting.

Аналіз compositing та stacking contexts.

Профілювання складних UI.

Дослідження performance bottlenecks.

Аналіз причин layout thrashing.

Дослідження memory leaks.

Аналіз складних мережевих залежностей.

Діагностика кешування та service workers.

Аналіз Web Vitals.

Оптимізація критичного rendering path.

Дослідження продуктивності великих CSS-кодових баз.

Комплексна діагностика доступності.

Автоматизація перевірок якості.

Порівняння performance traces до та після оптимізації.

Прийняття рішень на основі вимірювань, а не припущень.

---

# Міні-шпаргалка

## Elements

    Elements
        → HTML / DOM
        → вибір елементів
        → дослідження структури
        → тимчасова зміна HTML

## Styles

    Styles
        → CSS-правила
        → каскад
        → специфічність
        → вимкнення декларацій
        → тимчасова зміна CSS

## Computed

    Computed
        → кінцеві значення CSS-властивостей
        → width
        → height
        → color
        → display
        → padding
        → margin

## Box Model

    content
        ↓
    padding
        ↓
    border
        ↓
    margin

## Console

    Console
        → JavaScript errors
        → warnings
        → console.log()
        → перевірка DOM
        → виконання виразів

## Network

    Network
        → CSS
        → JavaScript
        → images
        → fonts
        → HTTP status
        → loading time
        → caching

## Responsive

    Device Toolbar
        → viewport
        → різні ширини
        → media queries
        → mobile layout
        → overflow

## Application

    Application
        → Local Storage
        → Session Storage
        → Cookies
        → IndexedDB
        → Service Workers

## Performance

    Performance
        → rendering
        → layout
        → painting
        → long tasks
        → performance profiling

## Lighthouse

    Lighthouse
        → Performance
        → Accessibility
        → Best Practices
        → SEO

## Робочий алгоритм

    Inspect element
        ↓
    Check Styles
        ↓
    Check Computed
        ↓
    Check Box Model
        ↓
    Check parent layout
        ↓
    Test a CSS change
        ↓
    Fix source file
        ↓
    Verify result

---

# Головне

• DevTools — один із найважливіших інструментів веброзробника.

• `Elements` використовується для дослідження DOM і CSS.

• `Styles` показує CSS-правила, а `Computed` — обчислені значення властивостей.

• Box Model допомагає знаходити проблеми з розмірами та відступами.

• Перекреслена декларація часто означає, що інше правило має перевагу в каскаді або декларація не застосовується з іншої причини.

• DevTools дозволяє тимчасово змінювати HTML і CSS та відразу перевіряти результат.

• `Console` допомагає знаходити помилки JavaScript і досліджувати DOM.

• `Network` допомагає перевіряти завантаження CSS, JavaScript, зображень і шрифтів.

• `Device Toolbar` дозволяє перевіряти адаптивність сторінки.

• `Application` допомагає досліджувати Local Storage, Session Storage, cookies та інші дані вебзастосунку.

• `Performance` допомагає вимірювати продуктивність.

• `Lighthouse` допомагає оцінювати продуктивність, доступність, найкращі практики та SEO.

• Зміни, зроблені безпосередньо в DevTools, зазвичай не змінюють вихідні файли проєкту.

• Після перевірки потрібно перенести правильне виправлення у вихідний код.

• Не варто виправляти CSS навмання. Спочатку знайди причину, перевір гіпотезу та виміряй результат.

• Для ефективного налагодження потрібно досліджувати не лише вибраний елемент, а й його батьківські контейнери, каскад, Box Model і viewport.

• DevTools потрібно використовувати регулярно під час створення навіть невеликих HTML/CSS-проєктів.

• Головний принцип:

    Observe
        ↓
    Inspect
        ↓
    Diagnose
        ↓
    Test
        ↓
    Fix
        ↓
    Verify

• Правильне використання DevTools дозволяє швидше знаходити помилки, краще розуміти поведінку браузера та впевненіше працювати з HTML, CSS і JavaScript.