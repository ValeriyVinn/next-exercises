# 02. Color Contrast

Color Contrast (колірний контраст) — це різниця між кольорами тексту, фону та інших елементів інтерфейсу, яка допомагає користувачам розрізняти інформацію та взаємодіяти з UI.

Контраст є однією з основ доступності (Accessibility, a11y). Він особливо важливий для людей із порушеннями зору, дальтонізмом, зниженою контрастною чутливістю, а також для користувачів, які працюють на яскравому сонці або на екранах із низькою якістю зображення.

Color contrast використовується, коли потрібно:

- зробити текст читабельним;
- забезпечити помітність кнопок та інтерактивних елементів;
- розрізняти межі полів форм;
- показувати помилки та статуси;
- забезпечити доступність графіків і діаграм;
- створювати доступні світлі та темні теми;
- перевіряти відповідність інтерфейсу WCAG;
- не покладатися виключно на колір для передавання інформації.

Основні поняття:

    Color contrast
    Contrast ratio
    Relative luminance
    WCAG
    AA
    AAA
    Text contrast
    Non-text contrast
    Large text
    Color blindness
    Contrast checker
    Accessible color palette
    Focus indicator
    Error states
    Color-independent cues

---

### Ключові поняття

✔ color contrast  
✔ contrast ratio  
✔ foreground color  
✔ background color  
✔ relative luminance  
✔ WCAG  
✔ WCAG 2.2  
✔ WCAG Level A  
✔ WCAG Level AA  
✔ WCAG Level AAA  
✔ normal text  
✔ large text  
✔ non-text contrast  
✔ UI components  
✔ graphical objects  
✔ focus indicator  
✔ color blindness  
✔ visual accessibility  
✔ contrast checker  
✔ accessible color palette  
✔ light theme  
✔ dark theme  
✔ text readability  
✔ semantic color tokens  
✔ error state  
✔ success state  
✔ disabled state  
✔ color-independent cues  
✔ 4.5:1  
✔ 3:1  
✔ 7:1  

---

### Що потрібно пам'ятати

• Контраст — це не просто візуальна різниця між кольорами. Для доступності важливо, наскільки добре користувач може розрізнити текст або елемент на його фоні.

• WCAG визначає конкретні мінімальні вимоги до контрасту.

• Для звичайного тексту рівень WCAG AA вимагає контрасту щонайменше `4.5:1`.

• Для великого тексту рівень WCAG AA вимагає контрасту щонайменше `3:1`.

• Для звичайного тексту рівень WCAG AAA вимагає контрасту щонайменше `7:1`.

• Для великого тексту рівень WCAG AAA вимагає контрасту щонайменше `4.5:1`.

• Для важливих нетекстових елементів інтерфейсу, які мають бути візуально розрізнюваними, зазвичай потрібен контраст щонайменше `3:1` відносно суміжних кольорів.

• Великий текст — це текст розміром щонайменше `24px` або приблизно `18.66px` і більше для жирного шрифту, якщо розмір заданий у CSS-пікселях.

• Контраст потрібно перевіряти для фактичної пари кольорів: тексту та його фону, межі компонента та суміжного кольору, індикатора фокусу та навколишнього середовища.

• Не можна передавати інформацію лише кольором. Наприклад, помилка повинна мати не тільки червоний колір, а й текстове повідомлення або відповідний значок.

• Світла тема, темна тема, hover, focus, error та інші стани потребують окремої перевірки.

• Напівпрозорість, градієнти, зображення на фоні та накладання кольорів можуть змінювати фактичний контраст.

• Інструменти перевірки допомагають вимірювати контраст, але не замінюють повної перевірки доступності інтерфейсу.

---

# Color Contrast

Color contrast — це відмінність між яскравістю переднього плану (foreground) і фону (background).

У UI найчастіше перевіряють такі пари:

    text color + background color
    button label + button background
    input border + adjacent background
    focus indicator + surrounding colors
    icon + background
    chart element + adjacent colors

Наприклад:

    Text: #FFFFFF
    Background: #000000

Білий текст на чорному фоні має максимальний контраст:

    21:1

Інший приклад:

    Text: #777777
    Background: #FFFFFF

Ця пара має значно нижчий контраст, ніж білий текст на чорному фоні.

Важливо:

    світлий колір на світлому фоні
        → зазвичай низький контраст

    темний колір на темному фоні
        → зазвичай низький контраст

    світлий колір на темному фоні
        → може мати високий контраст

    темний колір на світлому фоні
        → може мати високий контраст

Сам факт того, що кольори різні, не гарантує достатнього контрасту.

---

# Foreground та Background

## Foreground

Foreground — передній план, тобто елемент, який потрібно розрізнити.

Наприклад:

    текст
    іконка
    значок
    графічний елемент
    межа компонента

## Background

Background — фон, на якому розташований елемент.

Наприклад:

    фон сторінки
    фон картки
    фон кнопки
    фон поля введення
    фон повідомлення

Приклад CSS:

    .button {
        color: #FFFFFF;
        background-color: #1D4ED8;
    }

Тут:

    foreground → #FFFFFF
    background → #1D4ED8

Потрібно перевірити контраст саме цієї пари.

Не варто оцінювати контраст лише за зовнішнім виглядом кольорів у палітрі.

---

# Contrast Ratio

Contrast ratio — коефіцієнт контрастності між двома кольорами.

Він записується у форматі:

    1:1
    3:1
    4.5:1
    7:1
    21:1

Чим більше значення, тим більша різниця у відносній яскравості кольорів.

Можливий діапазон:

    1:1 → мінімальний контраст
    21:1 → максимальний контраст

Приклади:

    White on white
        → 1:1

    Black on white
        → 21:1

    Gray on white
        → залежить від конкретного відтінку сірого

Важливо:

    Contrast ratio ≠ різниця RGB-значень

Коефіцієнт контрастності розраховується на основі відносної яскравості кольорів, а не просто різниці між їхніми RGB-компонентами.

---

# Relative Luminance

Relative luminance (відносна яскравість) — величина, яка описує яскравість кольору з урахуванням особливостей людського зорового сприйняття.

Вона використовується для розрахунку contrast ratio.

Позначення:

    L

Діапазон:

    0 → чорний
    1 → білий

Наприклад:

    Black
        → L = 0

    White
        → L = 1

Інші кольори мають значення між 0 і 1.

Для обчислення відносної яскравості RGB-компоненти спочатку нормалізують, а потім переводять із простору sRGB у лінійні значення.

Спрощено:

    RGB
      ↓
    Normalize
      ↓
    Linearize
      ↓
    Relative luminance

Формула відносної яскравості:

    L = 0.2126R + 0.7152G + 0.0722B

Тут `R`, `G` і `B` — лінійні, нормалізовані значення RGB, а не початкові числа від 0 до 255.

Важливо:

    Не можна просто підставити значення
    звичайного RGB від 0 до 255
    у цю формулу.

У практичній роботі UI-дизайнера зазвичай не потрібно обчислювати relative luminance вручну. Для цього використовують contrast checker.

---

# Contrast Ratio Formula

WCAG використовує формулу:

    Contrast ratio = (L1 + 0.05) / (L2 + 0.05)

Де:

    L1 → більша relative luminance
    L2 → менша relative luminance

Тобто:

    L1 ≥ L2

Приклад для чорного та білого:

    White luminance = 1
    Black luminance = 0

    Contrast ratio = (1 + 0.05) / (0 + 0.05)

    Contrast ratio = 21

Результат:

    21:1

Для практики достатньо розуміти:

    contrast ratio
        ↓
    залежить від relative luminance
        ↓
    використовується для перевірки доступності

---

# WCAG

WCAG (Web Content Accessibility Guidelines) — міжнародні рекомендації щодо доступності вебконтенту.

Вони допомагають зробити сайти та застосунки доступними для людей із різними особливостями сприйняття, моторики та взаємодії.

Для роботи UI-дизайнера особливо важливі вимоги WCAG щодо:

    text contrast
    non-text contrast
    color usage
    focus visibility
    keyboard accessibility
    form errors
    visual information

Основні рівні відповідності:

    Level A
    Level AA
    Level AAA

## Level A

Базовий рівень доступності.

Він містить фундаментальні вимоги, але сам по собі не забезпечує достатнього рівня доступності для всіх користувачів.

## Level AA

Поширена ціль для доступного вебдизайну.

Включає, зокрема, вимоги щодо контрасту тексту та нетекстових елементів.

Для багатьох вебпроєктів саме WCAG Level AA є основною практичною ціллю.

## Level AAA

Більш суворий рівень відповідності.

Він передбачає вищі вимоги в окремих аспектах доступності, зокрема до контрасту тексту.

Level AAA не завжди можна забезпечити для всього контенту та кожного типу інтерфейсу.

Важливо:

    WCAG 2.2 — версія рекомендацій WCAG.

    Level AA — рівень відповідності.

Це різні поняття.

---

# WCAG Contrast Requirements

Основні вимоги WCAG 2.2 щодо контрасту.

| Тип елемента | WCAG AA | WCAG AAA |
|---|---:|---:|
| Звичайний текст | 4.5:1 | 7:1 |
| Великий текст | 3:1 | 4.5:1 |
| Важливі нетекстові елементи UI | 3:1 для відповідних елементів | Немає універсального окремого рівня AAA, аналогічного текстовому |

Для WCAG 2.2 AA вимога контрасту нетекстових елементів визначена критерієм 1.4.11 Non-text Contrast.

Вона стосується візуальної інформації, необхідної для ідентифікації компонентів інтерфейсу та їхніх станів, а також значущих графічних об'єктів.

Не кожен декоративний елемент зобов'язаний відповідати вимозі 3:1.

---

# Normal Text

Normal text — звичайний текст, який не відповідає визначенню великого тексту.

Для відповідності WCAG AA:

    Minimum contrast ratio = 4.5:1

Наприклад:

    Body text
    Paragraph
    Form label
    Navigation link
    Button label
    Helper text

Приклад:

    body {
        color: #333333;
        background-color: #FFFFFF;
    }

Такий варіант зазвичай забезпечує достатній контраст для звичайного тексту. Точний коефіцієнт можна перевірити в contrast checker.

Проблемний приклад:

    .muted-text {
        color: #AAAAAA;
        background-color: #FFFFFF;
    }

Світло-сірий текст на білому фоні може не досягати необхідного контрасту.

Краще:

    .muted-text {
        color: #595959;
        background-color: #FFFFFF;
    }

Потрібно перевірити фактичний contrast ratio.

Важливо:

    Маленький текст потребує особливої уваги.

    Не варто робити основний текст
    надто світлим заради мінімалістичного вигляду.

---

# Large Text

Large text — великий текст, для якого WCAG встановлює нижчий мінімальний коефіцієнт контрасту.

Для WCAG AA:

    Minimum contrast ratio = 3:1

Для WCAG AAA:

    Minimum contrast ratio = 4.5:1

За визначенням WCAG, великим вважається текст:

    24 CSS px і більше
    або
    приблизно 18.66 CSS px і більше
    для жирного тексту

У типографічних одиницях це приблизно:

    18 pt і більше
    або
    14 pt і більше для bold

Приклад:

    h1 {
        font-size: 32px;
        color: #333333;
        background-color: #FFFFFF;
    }

Для великого тексту мінімум WCAG AA становить 3:1.

Проте великий розмір не означає, що можна використовувати будь-який слабкий контраст.

Практичне правило:

    Normal text → 4.5:1
    Large text  → 3:1

Для надійної читабельності високий контраст часто залишається бажаним і для заголовків.

---

# Non-Text Contrast

Non-text contrast — контраст нетекстових елементів інтерфейсу.

Це можуть бути:

    icons
    input borders
    checkboxes
    radio buttons
    focus indicators
    selected states
    meaningful graphical objects
    visual indicators of component states

Для елементів, що підпадають під критерій WCAG 2.2 1.4.11, потрібен контраст щонайменше:

    3:1

відносно суміжних кольорів.

Приклад:

    .input {
        border: 1px solid #767676;
        background-color: #FFFFFF;
    }

Контраст межі потрібно оцінити відносно суміжного фону.

Проблемний варіант:

    .input {
        border: 1px solid #EEEEEE;
        background-color: #FFFFFF;
    }

Межа може бути майже непомітною для деяких користувачів.

Краще:

    .input {
        border: 1px solid #767676;
        background-color: #FFFFFF;
    }

Але самого кольору межі недостатньо для повної перевірки компонента. Потрібно також перевірити стани focus, error, disabled та інші важливі стани.

Важливо:

    Декоративні елементи та елементи,
    які не передають значущої інформації,
    можуть не підпадати під цю вимогу.

---

# Color Contrast та UI Components

Контраст потрібно враховувати під час створення кожного компонента.

## Buttons

Кнопка може містити:

    text
    background
    border
    icon
    focus indicator

Приклад:

    .button-primary {
        color: #FFFFFF;
        background-color: #1D4ED8;
    }

Потрібно перевірити:

    button text ↔ button background
    focus indicator ↔ surrounding colors

Якщо кнопка має лише текст і фон, основною перевіркою тексту буде контраст між цими кольорами.

Якщо кнопка має важливу межу або інший візуальний індикатор, перевіряють і відповідні нетекстові елементи.

## Input Fields

Поля форм повинні мати достатньо помітні межі або інші візуальні ознаки, які допомагають визначити їхнє розташування.

    .input {
        color: #222222;
        background-color: #FFFFFF;
        border: 1px solid #767676;
    }

Перевіряємо:

    input text ↔ input background
    input border ↔ adjacent colors
    focus indicator ↔ surrounding colors

## Icons

Іконка повинна бути достатньо помітною, якщо вона передає важливу інформацію або виконує функцію керування.

Наприклад:

    search icon
    close icon
    warning icon
    information icon

Декоративна іконка може не потребувати такого самого рівня контрасту, як функціональна.

Але якщо без іконки користувач не зможе зрозуміти призначення компонента, її контраст потрібно перевірити.

## Cards

У картках варто перевіряти:

    heading text
    body text
    links
    buttons
    meaningful borders
    status indicators

Не всі межі картки обов'язково повинні відповідати порогу 3:1. Важливо визначити, які саме візуальні ознаки потрібні для розуміння структури та взаємодії.

---

# Color Contrast та Color Blindness

Color blindness (дальтонізм) — загальна назва особливостей сприйняття кольорів, за яких певні кольори можуть бути складними для розрізнення.

Користувачам можуть бути важко розрізняти певні поєднання:

    red / green
    blue / purple
    green / brown
    colors with similar luminance

Проблема не обмежується тільки дальтонізмом.

Контраст може бути недостатнім також для людей:

    зі зниженою гостротою зору;
    з віковими змінами зору;
    з низькою контрастною чутливістю;
    які користуються екраном на яскравому сонці;
    які працюють із дисплеєм низької якості.

Важливо:

    Різні кольори не обов'язково
    мають достатній контраст.

Наприклад, червоний і зелений можуть відрізнятися за відтінком, але мати подібну відносну яскравість.

Тому одного лише вибору різних кольорів недостатньо.

---

# Never Use Color Alone

Одна з основ доступного дизайну — не передавати важливу інформацію лише кольором.

Проблемний приклад:

    Error → red
    Success → green

Якщо повідомлення відрізняються тільки кольором, частина користувачів може не зрозуміти різницю.

Краще:

    Error → red + error icon + message
    Success → green + success icon + message

Приклад HTML:

    <p class="error-message">
        <strong>Error:</strong>
        Please enter a valid email address.
    </p>

Колір можна залишити як додатковий візуальний сигнал.

Але основна інформація передається текстом.

Інші приклади:

    Required field
        → не лише червона зірочка,
          а зрозуміле позначення обов'язковості

    Selected item
        → не лише зміна кольору,
          а й checkmark або інший індикатор

    Chart
        → не лише різні кольори,
          а й підписи, форми, текстура
          або інші засоби розрізнення

    Form error
        → не лише червона межа,
          а й повідомлення про помилку

    Status
        → не лише зелений або червоний,
          а й текстовий опис

WCAG містить окремий критерій 1.4.1 Use of Color.

---

# Contrast та Focus States

Focus state — стан компонента, який показує, що він отримав клавіатурний фокус.

Наприклад:

    button
    input
    link
    select
    checkbox

Користувач клавіатури повинен бачити, який елемент зараз активний.

Приклад:

    button:focus-visible {
        outline: 3px solid #1D4ED8;
        outline-offset: 3px;
    }

Потрібно перевірити:

    focus indicator
        ↔ adjacent colors

Контраст індикатора фокусу є важливим аспектом доступності.

У WCAG 2.2 існує окремий критерій 2.4.13 Focus Appearance рівня AAA, який встановлює додаткові вимоги до вигляду індикатора фокусу.

Для звичайної практики важливо:

    не прибирати focus indicator без заміни;
    забезпечувати помітний focus state;
    перевіряти контраст у різних темах;
    не покладатися тільки на зміну кольору тексту.

---

# Disabled States

Disabled state — стан неактивного компонента.

Наприклад:

    disabled button
    disabled input
    disabled select

У таких компонентах часто використовують зменшений контраст.

Однак потрібно знати важливу особливість WCAG:

    Текст та зображення тексту,
    що є частиною неактивного UI-компонента,
    звільняються від вимог критерію
    1.4.3 Contrast (Minimum).

Аналогічні винятки передбачені критерієм 1.4.11 для деяких неактивних компонентів та їхніх візуальних станів.

Це не означає, що disabled-елементи потрібно робити максимально блідими.

Надмірно низький контраст може ускладнити розуміння форми та її структури.

Практичні рекомендації:

    disabled → візуально відрізняється
    disabled → не виглядає активним
    disabled → залишається достатньо зрозумілим
    disabled → не є єдиним способом пояснення обмеження

Якщо можливо, пояснюйте користувачеві, чому дія недоступна.

---

# Contrast та Links

Посилання повинні бути помітними та відрізнятися від навколишнього тексту.

Проблемний приклад:

    Paragraph text: #333333
    Link text:      #444444

Посилання відрізняється від тексту лише незначною зміною кольору.

Для користувачів, які не розрізняють відповідні відтінки, воно може бути майже непомітним.

Краще:

    Paragraph text: #333333
    Link text:      #1D4ED8

І додатково використовувати підкреслення:

    a {
        color: #1D4ED8;
        text-decoration: underline;
    }

Якщо посилання не підкреслене, його колір повинен достатньо відрізнятися від навколишнього тексту, щоб відповідати застосовним вимогам WCAG щодо використання кольору.

Важливо:

    Колір посилання має забезпечувати
    читабельність на фоні.

    Самої різниці відтінку недостатньо,
    якщо користувач не може визначити,
    що текст є посиланням.

---

# Contrast та Form Errors

Помилки форми повинні бути помітними та зрозумілими.

Поганий підхід:

    input border → red
    error message → light red

Якщо контраст недостатній, помилка може бути складною для сприйняття.

Краще:

    input border → accessible red
    error icon → visible
    error message → readable text

Приклад:

    .input-error {
        border: 2px solid #B91C1C;
    }

    .error-message {
        color: #B91C1C;
        background-color: #FFFFFF;
    }

    .error-message strong {
        font-weight: 700;
    }

Конкретну пару кольорів потрібно перевірити.

Не можна вважати будь-який темно-червоний автоматично доступним для всіх фонів.

Також потрібно:

    позначити поле як помилкове;
    пов'язати повідомлення з полем;
    пояснити, як виправити помилку;
    не покладатися лише на колір.

---

# Accessible Color Palette

Accessible color palette — палітра кольорів, спроєктована з урахуванням контрасту та потреб доступності.

У UI-дизайні важливо не просто вибрати красиві кольори, а створити комбінації, які можна безпечно використовувати для тексту, фону, меж і станів.

Приклад палітри:

    Primary
        #1D4ED8

    Text
        #222222

    Background
        #FFFFFF

    Border
        #767676

    Error
        #B91C1C

    Success
        #166534

Ці кольори є лише початковими кандидатами.

Їхню відповідність вимогам WCAG потрібно перевірити для кожної конкретної пари.

Наприклад:

    Text + Background
    Primary text + Primary background
    Error text + Error background
    Success text + Success background
    Border + Adjacent background

Один колір може бути доступним для тексту на білому фоні, але не забезпечувати достатнього контрасту на світло-сірому або кольоровому фоні.

---

# Semantic Color Tokens

Semantic color tokens — змінні дизайну, які описують призначення кольору, а не тільки його конкретне значення.

Приклад:

    --color-text-primary
    --color-text-secondary
    --color-background
    --color-border
    --color-primary
    --color-error
    --color-success
    --color-focus

Це допомагає централізовано керувати кольорами та перевіряти доступність.

Приклад CSS:

    :root {
        --color-text-primary: #222222;
        --color-text-secondary: #595959;
        --color-background: #FFFFFF;
        --color-primary: #1D4ED8;
        --color-error: #B91C1C;
        --color-success: #166534;
        --color-border: #767676;
        --color-focus: #1D4ED8;
    }

    body {
        color: var(--color-text-primary);
        background-color: var(--color-background);
    }

    a {
        color: var(--color-primary);
    }

    .error-message {
        color: var(--color-error);
    }

    .success-message {
        color: var(--color-success);
    }

Важливо:

    Наявність semantic tokens сама по собі
    не гарантує доступності.

    Значення кожного токена та їхні
    комбінації потрібно перевіряти.

---

# Contrast у Light Theme

Light theme — світла тема інтерфейсу.

Зазвичай вона має:

    light background
    dark text
    darker borders
    visible focus indicators

Приклад:

    :root {
        --color-background: #FFFFFF;
        --color-text: #222222;
        --color-muted: #595959;
        --color-border: #767676;
    }

Світла тема може мати проблеми, якщо:

    текст занадто світлий;
    межі майже непомітні;
    placeholder має слабкий контраст;
    вторинний текст надто блідий;
    focus indicator зливається з фоном.

Потрібно перевіряти всі значущі комбінації кольорів.

---

# Contrast у Dark Theme

Dark theme — темна тема інтерфейсу.

Зазвичай вона має:

    dark background
    light text
    visible borders
    contrasting controls
    visible focus indicators

Приклад:

    [data-theme="dark"] {
        --color-background: #121212;
        --color-text: #F5F5F5;
        --color-muted: #BDBDBD;
        --color-border: #8A8A8A;
    }

Темна тема також потребує перевірки контрасту.

Проблемні випадки:

    dark gray text on black;
    low-contrast gray borders;
    dark blue links on black;
    muted icons on dark backgrounds;
    focus indicator blending into the background.

Важливо:

    Не можна просто інвертувати кольори
    світлої теми та вважати результат доступним.

Кожна тема потребує окремого тестування.

---

# Hover та Active States

Hover state — стан компонента, коли вказівник розташований над ним.

Active state — стан компонента під час активації або натискання.

Наприклад:

    default
    hover
    active
    focus
    selected

Контраст потрібно перевіряти в усіх станах, де змінюються значущі кольори.

Приклад:

    .button {
        color: #FFFFFF;
        background-color: #1D4ED8;
    }

    .button:hover {
        background-color: #1E40AF;
    }

    .button:focus-visible {
        outline: 3px solid #1D4ED8;
        outline-offset: 3px;
    }

Тут потрібно перевірити:

    button text ↔ default background
    button text ↔ hover background
    focus indicator ↔ surrounding colors

Не можна припускати, що якщо default state доступний, то hover і focus також доступні.

---

# Placeholder Contrast

Placeholder — тимчасова підказка всередині поля введення.

Наприклад:

    <input
        type="email"
        placeholder="Enter your email"
    />

Placeholder часто роблять світло-сірим.

Це може створювати проблеми з читабельністю.

Приклад CSS:

    input::placeholder {
        color: #767676;
        opacity: 1;
    }

Потрібно перевірити контраст placeholder відносно фону поля.

Для placeholder, який передає текстову інформацію, варто дотримуватися мінімуму WCAG AA для звичайного тексту — 4.5:1.

Також потрібно пам'ятати:

    Placeholder не замінює label.

Після введення значення placeholder зникає, тому користувач може втратити розуміння призначення поля.

Краще:

    <label for="email">
        Email address
    </label>

    <input
        id="email"
        type="email"
        placeholder="name@example.com"
    />

---

# Gradients та Images

Контраст складніше перевіряти, коли текст розміщений поверх зображення або градієнта.

Наприклад:

    hero title on photo
    text on gradient
    white text on image
    labels over charts

Проблема:

    різні частини фону мають різну яскравість.

Текст може мати достатній контраст в одній частині зображення та недостатній в іншій.

Практичні рішення:

    додати overlay;
    використати суцільний фон під текстом;
    змінити позицію тексту;
    затемнити або освітлити зображення;
    використовувати текстову панель;
    перевірити контраст у найгірших ділянках.

Приклад:

    .hero {
        background:
            linear-gradient(
                rgb(0 0 0 / 65%),
                rgb(0 0 0 / 65%)
            ),
            url("/images/hero.jpg") center / cover;
        color: #FFFFFF;
    }

Overlay може допомогти, але його наявність не гарантує потрібного коефіцієнта контрасту.

Потрібно перевіряти фактичний результат після накладання кольорів.

---

# Color Contrast у Charts

Графіки та діаграми часто використовують кольори для розрізнення даних.

Наприклад:

    bar charts
    line charts
    pie charts
    dashboards
    analytics cards

Не варто використовувати тільки колір для передавання значень.

Краще поєднувати:

    color
    labels
    patterns
    shapes
    line styles
    direct annotations

Наприклад, дві лінії графіка можна розрізняти не лише за кольором, а й за типом лінії:

    Series A → solid line
    Series B → dashed line

Для значущих графічних елементів потрібно перевіряти застосовні вимоги до нетекстового контрасту.

Важливо:

    Контраст між кольорами сусідніх
    секторів діаграми не завжди є єдиною
    вимогою, що має значення.

Потрібно враховувати спосіб використання графіки, її призначення та інші засоби передавання інформації.

---

# Contrast Checker

Contrast checker — інструмент для перевірки коефіцієнта контрастності між двома кольорами.

Зазвичай він приймає:

    foreground color
    background color

і показує:

    contrast ratio
    WCAG AA result
    WCAG AAA result
    normal text result
    large text result

Для перевірки можна використовувати:

- WebAIM Contrast Checker — https://webaim.org/resources/contrastchecker/
- Accessible Web — https://accessibleweb.com/color-contrast-checker/
- TPGi Colour Contrast Analyser — https://www.tpgi.com/color-contrast-checker/

Також контраст можна перевіряти за допомогою інструментів дизайну та браузерних DevTools, якщо вони підтримують відповідну функцію.

## Як користуватися Contrast Checker

    1. Вибрати колір тексту.
    2. Вибрати колір фону.
    3. Ввести обидва кольори.
    4. Перевірити contrast ratio.
    5. Перевірити WCAG AA.
    6. Перевірити WCAG AAA за потреби.
    7. Змінити колір, якщо контраст недостатній.
    8. Повторити перевірку для інших станів.

Приклад:

    Foreground: #222222
    Background: #FFFFFF

Потрібно перевірити результат інструментом, а не визначати його лише візуально.

Важливо:

    Contrast checker перевіряє пару кольорів.

    Він не перевіряє автоматично всю
    доступність вебсторінки.

---

# Практичний Workflow

Під час розробки UI корисно використовувати послідовний процес.

## Step 1 — Define Colors

Спочатку визначити базові кольори:

    primary
    secondary
    background
    surface
    text
    muted text
    border
    error
    success
    warning
    focus

## Step 2 — Define Color Pairs

Скласти список реальних комбінацій:

    body text + page background
    heading + surface
    link + background
    button label + button background
    input text + input background
    placeholder + input background
    error message + error background
    focus indicator + surrounding colors

## Step 3 — Check Ratios

Перевірити кожну важливу пару.

    Normal text → 4.5:1
    Large text  → 3:1
    Relevant non-text UI → 3:1

Це основні пороги WCAG AA для відповідних категорій. Потрібно також враховувати винятки та конкретні критерії WCAG.

## Step 4 — Fix Failures

Якщо контраст недостатній:

    darken foreground;
    lighten foreground;
    change background;
    add a solid surface;
    add a border;
    change the color token.

Після кожної зміни потрібно перевірити результат.

## Step 5 — Test States

Перевірити:

    default
    hover
    active
    focus
    selected
    error
    success
    disabled

Для кожного стану потрібно визначити, які саме вимоги контрасту застосовуються.

## Step 6 — Test Themes

Перевірити:

    light theme
    dark theme
    responsive layouts
    image backgrounds
    overlays

## Step 7 — Document Results

Записати перевірені пари кольорів у документацію дизайн-системи.

Наприклад:

    Text Primary on Background
        → WCAG AA: Pass

    Text Muted on Background
        → WCAG AA: Pass

    Button Label on Primary
        → WCAG AA: Pass

    Focus Indicator on Surface
        → needs review

Статус `Pass` слід ставити лише після фактичної перевірки.

---

# CSS Example — Accessible Color Tokens

Приклад початкової системи кольорів:

    :root {
        --color-text-primary: #222222;
        --color-text-secondary: #595959;

        --color-background: #FFFFFF;
        --color-surface: #F5F5F5;

        --color-primary: #1D4ED8;
        --color-primary-hover: #1E40AF;

        --color-border: #767676;
        --color-focus: #1D4ED8;

        --color-error: #B91C1C;
        --color-success: #166534;
    }

    body {
        color: var(--color-text-primary);
        background-color: var(--color-background);
    }

    .text-secondary {
        color: var(--color-text-secondary);
    }

    .button-primary {
        color: #FFFFFF;
        background-color: var(--color-primary);
    }

    .button-primary:hover {
        background-color: var(--color-primary-hover);
    }

    .input {
        color: var(--color-text-primary);
        background-color: var(--color-background);
        border: 1px solid var(--color-border);
    }

    .input:focus-visible {
        outline: 3px solid var(--color-focus);
        outline-offset: 2px;
    }

    .error-message {
        color: var(--color-error);
    }

    .success-message {
        color: var(--color-success);
    }

Це приклад організації CSS, а не готова сертифікована палітра.

Потрібно перевірити всі фактичні пари кольорів.

---

# CSS Example — Light and Dark Themes

    :root {
        color-scheme: light;

        --color-background: #FFFFFF;
        --color-surface: #F5F5F5;
        --color-text: #222222;
        --color-muted: #595959;
        --color-border: #767676;
        --color-link: #1D4ED8;
    }

    [data-theme="dark"] {
        color-scheme: dark;

        --color-background: #121212;
        --color-surface: #1E1E1E;
        --color-text: #F5F5F5;
        --color-muted: #BDBDBD;
        --color-border: #8A8A8A;
        --color-link: #93C5FD;
    }

    body {
        color: var(--color-text);
        background-color: var(--color-background);
    }

    .card {
        color: var(--color-text);
        background-color: var(--color-surface);
    }

    .muted {
        color: var(--color-muted);
    }

    a {
        color: var(--color-link);
    }

Змінні спрощують підтримку тем.

Однак потрібно окремо перевірити:

    text ↔ background
    text ↔ surface
    muted ↔ background
    link ↔ background
    border ↔ adjacent colors

Один і той самий колір може мати різний контраст на різних фонах.

---

# Color Contrast та Figma

Під час роботи у Figma потрібно перевіряти кольори ще до реалізації інтерфейсу.

Практичний процес:

    1. Створити базову палітру.
    2. Визначити текстові та фонові кольори.
    3. Перевірити пари кольорів.
    4. Створити компоненти.
    5. Перевірити контраст тексту в компонентах.
    6. Перевірити межі та іконки.
    7. Перевірити focus та error states.
    8. Перевірити light та dark themes.
    9. Зберегти перевірені значення в design system.

Необхідно перевіряти не тільки окремі кольори, а й те, як вони поєднуються в конкретних компонентах.

Наприклад:

    Primary button
    Secondary button
    Input
    Checkbox
    Navigation link
    Error message
    Status badge
    Card
    Tooltip

Після передачі дизайну розробнику потрібно зберегти назви кольорових токенів і правила їхнього використання.

---

# Common Mistakes

## 1. Використання світло-сірого тексту на білому фоні

    color: #AAAAAA;
    background-color: #FFFFFF;

Проблема:

    недостатній contrast ratio

Рішення:

    змінити колір тексту на темніший;
    перевірити результат contrast checker.

---

## 2. Перевірка лише основного тексту

Проблема:

    body text доступний
    але input border майже невидимий
    focus indicator непомітний
    icon має слабкий контраст

Рішення:

    перевіряти текстові та значущі
    нетекстові елементи окремо.

---

## 3. Використання кольору як єдиного сигналу

Проблема:

    Error = red
    Success = green

Рішення:

    додавати текст, значки,
    підписи та інші зрозумілі сигнали.

---

## 4. Ігнорування Hover та Focus

Проблема:

    default state відповідає вимогам
    hover state має недостатній контраст

Рішення:

    перевіряти кожен значущий стан.

---

## 5. Одна палітра для всіх тем

Проблема:

    кольори світлої теми
    автоматично використовуються
    в темній темі

Рішення:

    визначати та перевіряти кольорові пари
    для кожної теми окремо.

---

## 6. Вибір кольорів лише за естетикою

Проблема:

    кольори виглядають гармонійно,
    але текст погано читається.

Рішення:

    поєднувати естетику з вимогами
    доступності та перевіряти контраст.

---

## 7. Неправильне розуміння порога 3:1

Проблема:

    усі елементи інтерфейсу
    перевіряються за одним порогом

Рішення:

    Normal text → 4.5:1 для AA
    Large text → 3:1 для AA
    Relevant non-text elements → 3:1

Для кожного елемента потрібно визначати застосовний критерій WCAG.

---

## 8. Припущення, що темний колір завжди доступний

Проблема:

    темно-синій текст
    на темно-сірому фоні

Рішення:

    перевіряти фактичну пару кольорів.

---

## 9. Надмірна прозорість

Проблема:

    opacity: 0.5

Текст або межа можуть втратити достатній контраст після змішування з фоном.

Рішення:

    перевіряти кінцевий колір,
    який бачить користувач.

---

## 10. Перевірка тільки в дизайнерському макеті

Проблема:

    у Figma все виглядає правильно,
    але в браузері контраст змінюється
    через прозорість, градієнт або CSS.

Рішення:

    перевіряти як дизайн,
    так і реалізований інтерфейс.

---

# Practical Examples

## Приклад 1 — Основний текст

    body {
        color: #222222;
        background-color: #FFFFFF;
    }

Завдання:

    Перевірити contrast ratio.

Очікуваний критерій:

    WCAG AA → 4.5:1 або більше.

---

## Приклад 2 — Великий заголовок

    h1 {
        font-size: 32px;
        color: #595959;
        background-color: #FFFFFF;
    }

Завдання:

    Перевірити контраст як великого тексту.

Очікуваний критерій:

    WCAG AA → 3:1 або більше.

---

## Приклад 3 — Кнопка

    .button {
        color: #FFFFFF;
        background-color: #1D4ED8;
    }

Завдання:

    Перевірити текст на фоні кнопки.

Очікуваний критерій:

    WCAG AA → 4.5:1 для звичайного тексту.

---

## Приклад 4 — Межа поля

    .input {
        background-color: #FFFFFF;
        border: 1px solid #767676;
    }

Завдання:

    Перевірити межу відносно суміжних кольорів.

Очікуваний критерій:

    WCAG AA → 3:1 для відповідних
    нетекстових візуальних ознак.

---

## Приклад 5 — Повідомлення про помилку

    <p class="error-message">
        Error: Enter a valid email address.
    </p>

Завдання:

    Перевірити контраст тексту.
    Додати зрозуміле пояснення.
    Не покладатися тільки на червоний колір.

---

## Приклад 6 — Посилання в тексті

    <p>
        Read our
        <a href="/privacy">privacy policy</a>.
    </p>

Завдання:

    Перевірити контраст посилання
    відносно фону.

    Переконатися, що посилання
    можна відрізнити від звичайного тексту
    не тільки за кольором.

---

## Приклад 7 — Focus indicator

    button:focus-visible {
        outline: 3px solid #1D4ED8;
        outline-offset: 3px;
    }

Завдання:

    Перевірити видимість індикатора
    фокусу на реальному фоні.

---

## Приклад 8 — Текст поверх зображення

    .hero-title {
        color: #FFFFFF;
    }

Завдання:

    Перевірити контраст у різних ділянках
    зображення.

    За потреби додати overlay
    або суцільний фон.

---

## Приклад 9 — Темна тема

    body {
        color: #F5F5F5;
        background-color: #121212;
    }

Завдання:

    Перевірити contrast ratio.
    Не вважати темну тему доступною
    без фактичного тестування.

---

## Приклад 10 — Статуси

    <p>
        <strong>Error:</strong>
        Payment could not be completed.
    </p>

Завдання:

    Передати стан текстом.
    Використовувати колір як додатковий сигнал.
    Перевірити контраст тексту.

---

# Типові питання на співбесіді

Що таке color contrast?

Що таке contrast ratio?

Що таке relative luminance?

Як розраховується contrast ratio?

Який максимальний коефіцієнт контрастності за WCAG?

Що таке WCAG?

Що означають рівні WCAG A, AA та AAA?

Яка різниця між WCAG 2.2 і WCAG Level AA?

Який мінімальний контраст для звичайного тексту за WCAG AA?

Який мінімальний контраст для великого тексту за WCAG AA?

Які розміри визначають large text?

Що таке non-text contrast?

Коли для UI-компонентів потрібен контраст 3:1?

Чому потрібно перевіряти межі input?

Чому недостатньо перевірити лише текст?

Як перевірити контраст кнопки?

Як перевірити контраст focus indicator?

Чому не можна передавати інформацію тільки кольором?

Як color blindness впливає на сприйняття інтерфейсу?

Що таке accessible color palette?

Що таке semantic color tokens?

Як перевіряти контраст у dark theme?

Як перевіряти текст на фоні зображення?

Чому placeholder повинен мати достатній контраст?

Що таке contrast checker?

Які інструменти допомагають перевірити контраст?

Чи гарантує відповідність контрасту повну доступність сайту?

Які стани компонента потрібно перевіряти?

Чому не можна вважати будь-який темний колір доступним?

Як зробити помилку форми зрозумілою без використання тільки червоного кольору?

Які вимоги до контрасту застосовуються до disabled components?

---

# Шлях вивчення

## 🟢 Core — обов'язково знати

    Color contrast
    Contrast ratio
    Foreground
    Background
    Relative luminance
    WCAG
    WCAG AA
    WCAG AAA
    Normal text
    Large text
    Non-text contrast
    4.5:1
    3:1
    7:1
    Color blindness
    Color-independent cues
    Contrast checker
    Accessible color palette

Потрібно вміти:

    визначати foreground і background;
    розуміти значення contrast ratio;
    знати основні вимоги WCAG AA;
    знаходити проблеми низького контрасту;
    перевіряти пару кольорів;
    не покладатися лише на колір.

## 🔵 Junior

    WCAG 2.2 contrast criteria
    Text contrast
    Non-text contrast
    Focus indicator contrast
    Input border contrast
    Placeholder contrast
    Button states
    Link visibility
    Error states
    Success states
    Light theme
    Dark theme
    Semantic color tokens
    Gradients and image backgrounds
    Contrast testing workflow

Потрібно вміти:

    перевіряти контраст компонентів;
    створювати доступні колірні пари;
    перевіряти hover і focus states;
    знаходити слабкі межі полів;
    створювати контрастні статуси;
    перевіряти світлу й темну теми;
    використовувати contrast checker;
    документувати доступні кольорові токени.

## 🟠 Middle

    WCAG 2.2 AA conformance
    Complex component contrast
    Dynamic themes
    Color token architecture
    Contrast in data visualization
    Gradients and overlays
    Automated accessibility testing
    Design system accessibility
    Contrast regression testing
    Cross-browser validation
    Accessibility review workflow

Потрібно вміти:

    створювати палітри для великих дизайн-систем;
    перевіряти складні компоненти;
    організовувати систематичне тестування;
    забезпечувати узгодженість тем;
    аналізувати складні фони;
    визначати пріоритети виправлення;
    поєднувати автоматичні й ручні перевірки.

## 🔴 Senior

    Accessibility governance
    WCAG conformance strategy
    Design system quality gates
    Automated contrast validation
    Dynamic color systems
    Data visualization accessibility
    Accessibility regression prevention
    Design-to-code consistency
    Accessibility acceptance criteria
    Organization-wide accessibility standards

Потрібно вміти:

    інтегрувати перевірку контрасту в процес розробки;
    визначати правила для дизайн-систем;
    запобігати повторному виникненню проблем;
    розробляти автоматизовані перевірки;
    оцінювати компроміси між брендингом і доступністю;
    документувати вимоги та винятки;
    контролювати доступність продукту на рівні команди.

---

# Міні-шпаргалка

## Contrast Ratio

    1:1  → мінімальний контраст
    21:1 → максимальний контраст

## WCAG AA

    Normal text → 4.5:1
    Large text  → 3:1
    Relevant non-text UI → 3:1

## WCAG AAA

    Normal text → 7:1
    Large text  → 4.5:1

## Large Text

    24px і більше
    або
    приблизно 18.66px і більше
    для bold

## Contrast Formula

    (L1 + 0.05) / (L2 + 0.05)

    L1 → більша relative luminance
    L2 → менша relative luminance

## Foreground / Background

    Foreground → текст або елемент
    Background → фон елемента

## Перевірка

    1. Визначити пару кольорів.
    2. Виміряти contrast ratio.
    3. Перевірити відповідний критерій WCAG.
    4. Виправити кольори за потреби.
    5. Повторити для інших станів.

## Не використовувати тільки колір

    Error → текст + колір
    Success → текст + колір
    Selected → індикатор + колір
    Chart → підписи + колір
    Required → зрозуміле позначення

## Основні стани

    default
    hover
    active
    focus
    selected
    error
    success
    disabled

## Інструменти

    WebAIM Contrast Checker
    Accessible Web Contrast Checker
    TPGi Colour Contrast Analyser

---

# Головне

• Color contrast допомагає користувачам розрізняти текст, компоненти та значущі графічні елементи.

• Contrast ratio вимірює різницю у відносній яскравості двох кольорів.

• Для звичайного тексту WCAG AA вимагає мінімум `4.5:1`.

• Для великого тексту WCAG AA вимагає мінімум `3:1`.

• Для звичайного тексту WCAG AAA вимагає мінімум `7:1`.

• Для великого тексту WCAG AAA вимагає мінімум `4.5:1`.

• Для значущих нетекстових елементів, які підпадають під критерій WCAG 1.4.11, потрібно щонайменше `3:1`.

• Contrast ratio розраховується на основі relative luminance.

• Контраст потрібно перевіряти для реальних пар кольорів, а не для кожного кольору окремо.

• Кнопки, посилання, поля форм, іконки та індикатори фокусу потребують окремої уваги.

• Контраст необхідно перевіряти для різних станів компонентів і різних тем.

• Інформацію не можна передавати лише кольором.

• Доступна палітра повинна враховувати текст, фони, межі, стани та значущі графічні елементи.

• Світла й темна теми потребують незалежної перевірки.

• Градієнти, прозорість та зображення можуть ускладнювати оцінку контрасту.

• Contrast checker допомагає перевірити конкретну пару кольорів, але не гарантує повної доступності сторінки.

• WCAG AA — практична ціль для багатьох вебпроєктів, але конкретні юридичні вимоги можуть залежати від країни, сфери та застосовного стандарту.

• Основний принцип доступного контрасту:

    Readable text
        +
    Visible components
        +
    Clear states
        +
    Color-independent information
        =
    More accessible UI