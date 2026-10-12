# 01. Color Basics

Color Basics (основи кольору) — це базові поняття теорії кольору, які допомагають розуміти, як колір працює в інтерфейсах користувача (UI), як він впливає на сприйняття елементів і як правильно використовувати кольори під час створення дизайну.

Колір у UI використовується, щоб:

- створювати візуальну ієрархію;
- привертати увагу до важливих елементів;
- відокремлювати різні частини інтерфейсу;
- позначати стани компонентів;
- передавати значення через колір;
- підтримувати читабельність тексту;
- створювати настрій і візуальний стиль;
- забезпечувати доступність інтерфейсу;
- формувати єдину систему кольорів для всього застосунку.

Основні поняття кольору:

    color
    hue
    saturation
    lightness
    brightness
    tint
    shade
    tone
    color temperature
    color palette
    color harmony
    contrast
    opacity
    transparency
    color space
    color model
    foreground
    background
    surface
    accent color
    semantic color

У UI-дизайні колір потрібно розглядати не лише як декоративну властивість, а і як інструмент комунікації між інтерфейсом та користувачем.

---

## Ключові поняття

✔ color  
✔ color theory  
✔ hue  
✔ saturation  
✔ lightness  
✔ brightness  
✔ tint  
✔ shade  
✔ tone  
✔ warm colors  
✔ cool colors  
✔ neutral colors  
✔ color temperature  
✔ color palette  
✔ color harmony  
✔ monochromatic palette  
✔ analogous colors  
✔ complementary colors  
✔ color contrast  
✔ foreground  
✔ background  
✔ surface  
✔ accent color  
✔ primary color  
✔ secondary color  
✔ semantic color  
✔ opacity  
✔ transparency  
✔ RGB  
✔ HEX  
✔ HSL  
✔ color space  
✔ color token  
✔ visual hierarchy  
✔ color accessibility  
✔ color perception  

---

## Що потрібно пам'ятати

• Колір — один із головних інструментів візуальної комунікації в UI.

• `Hue` визначає колірний тон: червоний, зелений, синій тощо.

• `Saturation` визначає інтенсивність кольору: від сірого до насиченого кольорового відтінку.

• `Lightness` описує, наскільки колір світлий або темний.

• `Brightness` пов'язана зі сприйманою яскравістю кольору, але не є повним синонімом `lightness`.

• `Tint` — колір, змішаний із білим.

• `Shade` — колір, змішаний із чорним.

• `Tone` у традиційній теорії кольору — колір, змішаний із сірим.

• `Warm colors` зазвичай асоціюються з теплом, енергією та активністю.

• `Cool colors` часто асоціюються зі спокоєм, прохолодою та стриманістю.

• `Neutral colors` допомагають створювати фони, поверхні та менш акцентні елементи.

• `Color palette` — узгоджений набір кольорів, який використовується в дизайні.

• `Color contrast` допомагає розрізняти елементи та читати текст.

• Колір сам по собі не повинен бути єдиним способом передавання важливої інформації.

• Колір, який добре виглядає на одному екрані, може сприйматися інакше на іншому.

• RGB, HEX і HSL — різні способи представлення кольорів.

• У дизайн-системах кольори бажано організовувати через зрозумілі назви та design tokens.

• Гарна палітра — це не велика кількість кольорів, а продумана система їх використання.

---

# Color

`Color` (колір) — це властивість візуального сприйняття, пов'язана зі світлом, яке потрапляє до очей, та обробляється зоровою системою.

У цифровому інтерфейсі колір зазвичай задається за допомогою числових значень, які визначають, як екран має відтворити певний колір.

Наприклад:

    Red
    Green
    Blue
    Yellow
    Orange
    Purple
    Cyan
    Magenta

У CSS колір можна задати різними способами:

    color: red;
    color: #ff0000;
    color: rgb(255 0 0);
    color: hsl(0 100% 50%);

Усі чотири приклади задають червоний колір.

Однак назва кольору, HEX, RGB та HSL — це різні способи його опису.

---

# Color in UI Design

У UI-дизайні кольори мають функціональне призначення.

Основні функції кольору:

    1. Communication
    2. Hierarchy
    3. Grouping
    4. Feedback
    5. Branding
    6. Decoration
    7. Accessibility

## 1. Communication

Колір допомагає передавати значення.

Наприклад:

    Green  → успіх, підтвердження
    Red    → помилка, небезпека
    Yellow → попередження
    Blue   → інформація

Це поширені конвенції, але не універсальні правила.

Значення кольору залежить від контексту, культури, бренду та конкретного інтерфейсу.

Наприклад, червоний може використовуватися не лише для помилок, а й для брендингу, активних елементів або позначення знижок.

## 2. Visual Hierarchy

Колір допомагає визначати, на що користувач звертає увагу насамперед.

Наприклад:

    Primary button → яскравий акцентний колір
    Secondary button → нейтральний фон
    Disabled button → приглушений вигляд

Приклад:

    [ Create account ]  → акцентна кнопка
    [ Cancel ]          → нейтральна кнопка

Важливість елемента визначається не лише кольором, а й розміром, розташуванням, типографікою та контрастом.

## 3. Grouping

Колір допомагає візуально об'єднувати пов'язані елементи.

Наприклад:

    Background: #f8fafc
    Surface:    #ffffff
    Border:     #e2e8f0

Близькі нейтральні кольори допомагають відокремити сторінку, картку та її межі.

## 4. Feedback

Колір допомагає показувати результат дії користувача.

Наприклад:

    Success → операцію завершено
    Error   → виникла помилка
    Warning → потрібна увага
    Info    → додаткова інформація

Такі кольори називають semantic colors.

## 5. Branding

Колір допомагає створювати впізнаваність бренду.

Наприклад:

    Primary brand color
    Secondary brand color
    Accent color
    Neutral palette

Брендовий колір може використовуватися в логотипі, кнопках, посиланнях та інших елементах.

Проте не кожен колір бренду обов'язково підходить для дрібного тексту або всіх типів фону.

## 6. Decoration

Колір може створювати візуальну атмосферу:

    Calm
    Minimal
    Playful
    Elegant
    Professional
    Energetic

Наприклад, стримана нейтральна палітра може підтримувати мінімалістичний інтерфейс, а яскрава палітра — енергійний і грайливий стиль.

Це дизайнерські асоціації, а не суворі психологічні закони.

## 7. Accessibility

Колір повинен допомагати користувачам сприймати інформацію.

Важливо враховувати:

    Text contrast
    Color vision deficiencies
    Focus indicators
    Error identification
    Disabled states
    Dark mode

Наприклад, помилку у формі не варто позначати лише червоним кольором.

Краще використати:

    red border
    error icon
    explanatory message

Так користувач зможе зрозуміти помилку навіть тоді, коли не розрізняє відповідні кольори.

---

# Color Properties

Колір можна описувати через декілька характеристик.

Основні властивості:

    Hue
    Saturation
    Lightness
    Brightness
    Opacity

Ці поняття пов'язані між собою, але не є взаємозамінними.

---

# Hue

`Hue` — колірний тон, який визначає, до якої частини колірного спектра належить колір.

Приклади:

    Red
    Orange
    Yellow
    Green
    Cyan
    Blue
    Violet

У HSL hue зазвичай задається кутом від 0° до 360°.

Приблизні значення:

    0°   → Red
    30°  → Orange
    60°  → Yellow
    120° → Green
    180° → Cyan
    240° → Blue
    300° → Magenta

У CSS:

    .example {
        color: hsl(0 100% 50%);
    }

Результат — насичений червоний.

Важливо: у HSL значення hue є кутом на колірному колі, а не відсотком.

---

# Saturation

`Saturation` — насиченість кольору.

Вона описує, наскільки вираженим є кольоровий тон порівняно з менш насиченим варіантом.

У HSL saturation задається у відсотках.

    0%   → повністю ненасичений колір
    50%  → проміжна насиченість
    100% → максимальна насиченість у межах HSL

Приклад:

    .low-saturation {
        background-color: hsl(210 20% 50%);
    }

    .high-saturation {
        background-color: hsl(210 100% 50%);
    }

Обидва кольори мають приблизно однаковий hue, але різну насиченість.

## Saturation in UI

Висока насиченість може привертати увагу.

Низька насиченість часто використовується для:

    Backgrounds
    Subtle surfaces
    Secondary elements
    Muted UI elements

Насичені кольори часто використовуються для:

    Primary actions
    Highlights
    Selected states
    Important indicators

Однак насиченість потрібно оцінювати разом із контрастом, площею кольору та його функцією.

Якщо всі елементи яскраві, користувачеві складніше визначити головний акцент.

---

# Lightness

`Lightness` — характеристика кольору, яка в HSL визначає його світлість або темність.

У HSL lightness задається у відсотках.

    0%   → black
    50%  → базовий рівень світлості для заданих hue і saturation
    100% → white

Приклад:

    .dark-blue {
        background-color: hsl(220 80% 20%);
    }

    .medium-blue {
        background-color: hsl(220 80% 50%);
    }

    .light-blue {
        background-color: hsl(220 80% 80%);
    }

У прикладах hue та saturation однакові, а lightness змінюється.

## Lightness in UI

Світлі та темні варіанти одного кольору можна використовувати для створення палітри.

Наприклад:

    Blue 900 → дуже темний синій
    Blue 700 → темний синій
    Blue 500 → основний синій
    Blue 300 → світлий синій
    Blue 100 → дуже світлий синій

Такі шкали часто використовуються в дизайн-системах.

Проте номери відтінків не є універсальним стандартом. У різних дизайн-системах шкали можуть відрізнятися.

Важливо також пам'ятати, що однакове значення HSL lightness для різних hue не гарантує однакової сприйманої яскравості.

---

# Brightness

`Brightness` — поняття, пов'язане з тим, наскільки яскравим здається світло або колір.

У повсякденній мові brightness іноді використовують як синонім lightness, але в теорії кольору та цифровій графіці ці поняття можуть мати різні значення.

Для UI важливо розрізняти:

    HSL lightness
    Perceived brightness
    Relative luminance

`HSL lightness` — параметр конкретної колірної моделі.

`Perceived brightness` — суб'єктивне сприйняття яскравості.

`Relative luminance` — нормалізована величина, яка використовується, зокрема, для розрахунку контрасту за WCAG.

Наприклад, жовтий і синій кольори з однаковою HSL lightness можуть сприйматися як різні за яскравістю.

Тому для перевірки читабельності тексту потрібно оцінювати не лише світлість кольорів у HSL, а й їхній фактичний контраст.

---

# Tint

`Tint` — варіант кольору, отриманий змішуванням базового кольору з білим у традиційній моделі змішування фарб.

Наприклад:

    Base color → Blue
    Tint       → Light blue

Приклад палітри:

    Blue
    Light blue
    Very light blue

У UI світліші варіанти кольору можна використовувати для:

    Subtle backgrounds
    Selected surfaces
    Soft highlights
    Informational panels

Наприклад:

    .info-surface {
        background-color: #eff6ff;
    }

Це світлий синій фон для інформаційної панелі.

Важливо: у цифрових інструментах tint часто створюють алгоритмічно, тому не кожен світлий відтінок є результатом фізичного змішування фарб.

---

# Shade

`Shade` — варіант кольору, отриманий змішуванням базового кольору з чорним у традиційній моделі змішування фарб.

Наприклад:

    Base color → Blue
    Shade      → Dark blue

У UI темніші варіанти кольору можна використовувати для:

    Dark backgrounds
    Hover states
    Active states
    Stronger emphasis
    Dark text on light surfaces

Приклад:

    .button {
        background-color: #2563eb;
    }

    .button:hover {
        background-color: #1d4ed8;
    }

У цьому прикладі hover-стан використовує темніший синій.

Проте hover не завжди повинен бути темнішим: результат залежить від палітри, типу компонента та дизайн-системи.

---

# Tone

`Tone` у традиційній теорії кольору — варіант базового кольору, змішаний із сірим.

Наприклад:

    Base color → Blue
    Tone       → Muted blue

Приглушені кольори часто використовуються для:

    Secondary surfaces
    Subtle accents
    Background decorations
    Less prominent interface elements

Приклад:

    .muted-blue {
        background-color: #64748b;
    }

Tone не слід плутати з opacity.

`Tone` змінює сам колір.

`Opacity` визначає прозорість елемента або кольору під час композиції з фоном.

---

# Opacity and Transparency

`Opacity` — непрозорість.

`Transparency` — прозорість.

Ці поняття описують, наскільки сильно крізь елемент видно те, що розташоване позаду нього.

Приклади opacity:

    1   → повністю непрозорий
    0.5 → 50% opacity
    0   → повністю прозорий

У CSS:

    .overlay {
        background-color: rgb(0 0 0 / 50%);
    }

Це напівпрозорий чорний фон.

Інший приклад:

    .disabled {
        opacity: 0.5;
    }

Елемент відображатиметься з меншою непрозорістю.

Проте opacity не є найкращим способом реалізації кожного disabled-стану. Він впливає на весь елемент разом із текстом, іконками та іншими дочірніми елементами.

Краще використовувати спеціально підібрані кольори для станів компонентів, коли це необхідно для читабельності та доступності.

---

# Warm Colors

`Warm colors` — теплі кольори.

До них зазвичай відносять:

    Red
    Orange
    Yellow

Теплі кольори часто асоціюються з:

    Energy
    Warmth
    Activity
    Excitement
    Attention

У UI вони можуть використовуватися для:

    Call-to-action elements
    Highlights
    Promotional banners
    Important indicators
    Brand accents

Наприклад:

    .accent {
        background-color: #f97316;
    }

Однак теплий колір не обов'язково має бути акцентним. Його роль визначається загальною системою дизайну.

---

# Cool Colors

`Cool colors` — холодні кольори.

До них зазвичай відносять:

    Green
    Cyan
    Blue
    Violet

Залежно від конкретної моделі та контексту межа між теплими й холодними кольорами може трактуватися по-різному.

Холодні кольори часто асоціюються з:

    Calmness
    Stability
    Freshness
    Clarity
    Professionalism

У UI вони можуть використовуватися для:

    Backgrounds
    Brand colors
    Informational elements
    Navigation
    Secondary accents

Наприклад:

    .primary {
        background-color: #2563eb;
    }

Такі асоціації не є універсальними психологічними правилами.

---

# Neutral Colors

`Neutral colors` — нейтральні кольори, які не створюють сильного кольорового акценту.

Типові приклади:

    White
    Black
    Gray
    Off-white
    Charcoal
    Warm gray
    Cool gray

Нейтральні кольори особливо важливі для UI.

Вони використовуються для:

    Page backgrounds
    Cards
    Panels
    Body text
    Secondary text
    Borders
    Dividers
    Disabled elements

Приклад нейтральної палітри:

    White:       #ffffff
    Gray 50:     #f8fafc
    Gray 100:    #f1f5f9
    Gray 300:    #cbd5e1
    Gray 500:    #64748b
    Gray 700:    #334155
    Gray 900:    #0f172a

Це приклад палітри, а не універсальний стандарт.

Нейтральні кольори допомагають створити основу інтерфейсу, на якій акцентні кольори стають помітнішими.

## Neutral Does Not Mean Colorless

Нейтральні кольори можуть мати легкий кольоровий відтінок.

Наприклад:

    Warm gray → сірий із теплим відтінком
    Cool gray → сірий із холодним відтінком

Тому нейтральні палітри також потрібно підбирати узгоджено.

---

# Color Temperature

`Color temperature` — сприйняття кольору як теплого або холодного.

У UI-дизайні це поняття часто використовується для опису характеру палітри.

Наприклад:

    Warm palette
    Cool palette
    Balanced palette

Тепла палітра може містити:

    Warm beige
    Terracotta
    Muted orange
    Warm gray

Холодна палітра може містити:

    Blue
    Cyan
    Cool gray
    Blue-gray

Температура кольору впливає на загальне враження від інтерфейсу, але сама по собі не визначає його якість або доступність.

---

# Color Palette

`Color palette` — узгоджений набір кольорів, який використовується в інтерфейсі або дизайн-системі.

Палітра визначає, які кольори доступні для:

    Backgrounds
    Surfaces
    Text
    Borders
    Buttons
    Links
    Icons
    States
    Charts
    Illustrations

Приклад базової палітри:

    Primary:   #2563eb
    Secondary: #64748b
    Accent:    #f97316
    Success:   #16a34a
    Warning:   #d97706
    Danger:    #dc2626
    Info:      #0284c7

    Background: #f8fafc
    Surface:    #ffffff
    Text:       #0f172a
    Muted text: #64748b
    Border:     #e2e8f0

Це демонстраційний набір кольорів.

У реальному проєкті кожен колір потрібно перевіряти на відповідність його функції, контрасту та загальному стилю інтерфейсу.

---

# Color Palette vs Color Scheme

`Color palette` — набір доступних кольорів.

`Color scheme` — спосіб організації та використання кольорів у певному дизайні.

Наприклад:

    Palette:
        Blue
        Green
        Orange
        Gray

    Scheme:
        Blue → primary actions
        Green → success
        Orange → warnings
        Gray → backgrounds and text

Тобто палітра визначає доступні кольори, а схема — принципи їх поєднання та використання.

У різних джерелах ці терміни можуть частково перетинатися.

---

# Color Harmony

`Color harmony` — принципи поєднання кольорів, які допомагають створювати узгоджену палітру.

Основні типи колірних схем:

    Monochromatic
    Analogous
    Complementary
    Split-complementary
    Triadic
    Tetradic

Детальніше ці схеми розглядатимуться в розділі:

    02-color-wheel

На базовому рівні достатньо пам'ятати:

• Кольори потрібно оцінювати в поєднанні, а не лише окремо.

• Гармонійна палітра не обов'язково має бути яскравою.

• Контраст може бути корисним, навіть якщо кольори не є сусідніми на колірному колі.

• У UI важливіше функціональне призначення кольорів, ніж формальне дотримання певної колірної схеми.

---

# Color Models

`Color model` — математичний спосіб опису кольору через набір компонентів.

У цифровому дизайні часто використовуються:

    RGB
    HEX
    HSL
    HWB
    Lab
    LCH

Для початкового рівня UI-дизайну особливо важливі RGB, HEX та HSL.

---

# RGB

`RGB` означає:

    Red
    Green
    Blue

RGB — модель кольору, яка описує колір через інтенсивність червоного, зеленого та синього каналів.

У CSS:

    color: rgb(255 0 0);

Результат — червоний.

Приклади:

    Black → rgb(0 0 0)
    White → rgb(255 255 255)
    Red   → rgb(255 0 0)
    Green → rgb(0 128 0)
    Blue  → rgb(0 0 255)

У поширеному 8-бітному представленні кожен канал має значення від 0 до 255.

Наприклад:

    rgb(255 0 0)

означає:

    Red   = 255
    Green = 0
    Blue  = 0

RGB особливо важлива для цифрових екранів, які створюють кольори шляхом змішування світла.

---

# HEX

`HEX` — шістнадцятковий запис кольору.

У CSS він зазвичай починається з символу `#`.

Приклади:

    #000000 → black
    #ffffff → white
    #ff0000 → red
    #00ff00 → lime
    #0000ff → blue

Стандартний шестизначний HEX-запис має структуру:

    #RRGGBB

Де:

    RR → red channel
    GG → green channel
    BB → blue channel

Кожна пара символів задає значення каналу в шістнадцятковій системі числення.

Наприклад:

    #ff0000

означає:

    FF → red = 255
    00 → green = 0
    00 → blue = 0

HEX також підтримує короткий запис:

    #f00

Він еквівалентний:

    #ff0000

Можна задавати й альфа-канал:

    #ff000080

Такий запис містить:

    RR → red
    GG → green
    BB → blue
    AA → alpha

HEX із вісьмома символами після `#` задає прозорість через alpha channel.

---

# HSL

`HSL` означає:

    Hue
    Saturation
    Lightness

HSL описує колір через тон, насиченість і світлість.

Приклад:

    color: hsl(220 90% 56%);

Тут:

    Hue        = 220°
    Saturation = 90%
    Lightness  = 56%

HSL зручно використовувати, коли потрібно створювати світліші або темніші варіанти кольору.

Наприклад:

    .blue-100 {
        background-color: hsl(220 90% 95%);
    }

    .blue-500 {
        background-color: hsl(220 90% 56%);
    }

    .blue-900 {
        background-color: hsl(220 90% 20%);
    }

Усі три кольори мають однакові hue та saturation, але різні значення lightness.

HSL полегшує концептуальне розуміння кольору, але зміна одного параметра не гарантує однакової сприйманої різниці між кольорами.

---

# RGB vs HEX vs HSL

| Model | Components | Typical use |
|---|---|---|
| RGB | Red, Green, Blue | Опис кольору через канали |
| HEX | Шістнадцятковий запис RGB та, за потреби, alpha | Компактний запис кольору в CSS |
| HSL | Hue, Saturation, Lightness | Розуміння та коригування тону, насиченості й світлості |
| HWB | Hue, Whiteness, Blackness | Альтернативний спосіб опису кольору |
| Lab | Lightness, a, b | Колірні обчислення з урахуванням сприйняття |
| LCH | Lightness, Chroma, Hue | Створення та коригування палітр у більш перцептивному просторі |

Для початку достатньо впевнено читати RGB, HEX і HSL.

У CSS також можна використовувати сучасні синтаксиси кольорів, наприклад:

    color: hsl(220 90% 56% / 80%);

Це синій колір із прозорістю 80%.

---

# Color Space

`Color space` — колірний простір, який визначає спосіб представлення та інтерпретації кольорів.

Приклади:

    sRGB
    Display P3
    CIELAB
    CIELCH

Колірна модель і колірний простір — не одне й те саме.

`Color model` визначає спосіб опису кольору.

`Color space` визначає конкретний простір кольорів та його характеристики.

Для звичайного вебінтерфейсу найчастіше достатньо працювати з кольорами sRGB.

Проте сучасні пристрої можуть підтримувати ширші колірні простори, наприклад Display P3.

Для базового UI-дизайну важливо пам'ятати:

• Однакові числові значення в різних колірних просторах не обов'язково означають однаковий фактичний колір.

• Відтворення кольору залежить від пристрою, дисплея та колірного керування.

• Колір потрібно перевіряти в реальному контексті використання.

---

# Foreground and Background

`Foreground` — передній план, тобто елементи, які візуально розташовані перед фоном.

`Background` — фон, на якому розташовані інші елементи.

Наприклад:

    Background → білий фон сторінки
    Foreground → текст, кнопки, іконки

У CSS:

    body {
        background-color: #f8fafc;
        color: #0f172a;
    }

Тут:

    background-color → background
    color            → foreground text color

Foreground може містити:

    Text
    Icons
    Buttons
    Images
    Controls

Background може бути:

    Solid color
    Gradient
    Image
    Pattern

Головне завдання — забезпечити зрозуміле візуальне розрізнення переднього плану та фону.

---

# Surface

`Surface` — поверхня інтерфейсу, на якій розміщується вміст або інтерактивні елементи.

Приклади:

    Card
    Dialog
    Dropdown
    Sidebar
    Navigation panel
    Input field

У дизайн-системах поверхні часто мають окремі кольори, які відрізняються від загального фону сторінки.

Приклад:

    :root {
        --color-background: #f8fafc;
        --color-surface: #ffffff;
        --color-border: #e2e8f0;
    }

    body {
        background-color: var(--color-background);
    }

    .card {
        background-color: var(--color-surface);
        border: 1px solid var(--color-border);
    }

Тут сторінка має світло-сірий фон, а картка — білу поверхню.

Різниця між background та surface залежить від конкретної дизайн-системи. Іноді ці поняття можуть збігатися.

---

# Accent Color

`Accent color` — колір, який використовується для виділення важливих елементів або створення візуального акценту.

Типові приклади:

    Primary buttons
    Active navigation items
    Selected controls
    Links
    Highlights

Приклад:

    :root {
        --color-accent: #2563eb;
    }

    .button-primary {
        background-color: var(--color-accent);
        color: #ffffff;
    }

Акцентний колір допомагає користувачеві помічати важливі дії.

Проте якщо акцентний колір використовується скрізь, він перестає ефективно виділяти головні елементи.

У дизайн-системі потрібно визначити:

    Where accent color is used
    Where accent color is not used
    How accent color changes across states
    Which foreground colors are allowed on it

---

# Color Tokens

`Color token` — іменована змінна, яка представляє колір у дизайн-системі.

Наприклад:

    --color-primary
    --color-background
    --color-surface
    --color-text
    --color-border
    --color-success
    --color-danger

У CSS:

    :root {
        --color-primary: #2563eb;
        --color-background: #f8fafc;
        --color-surface: #ffffff;
        --color-text: #0f172a;
        --color-text-muted: #64748b;
        --color-border: #e2e8f0;
    }

Використання:

    body {
        background-color: var(--color-background);
        color: var(--color-text);
    }

    .card {
        background-color: var(--color-surface);
        border: 1px solid var(--color-border);
    }

Переваги color tokens:

• Єдині кольори в усьому застосунку.

• Просте оновлення палітри.

• Зрозуміліші стилі.

• Зручніше підтримувати компоненти.

• Легше реалізувати dark mode.

• Менше дублювання HEX-значень.

---

# Raw Colors vs Semantic Tokens

Існують два корисні способи організації кольорів.

## 1. Raw Color Tokens

Raw tokens описують конкретні кольори або шкали.

Наприклад:

    --blue-50: #eff6ff;
    --blue-100: #dbeafe;
    --blue-500: #3b82f6;
    --blue-700: #1d4ed8;
    --blue-900: #1e3a8a;

Такі назви описують колір, а не його призначення.

## 2. Semantic Color Tokens

Semantic tokens описують роль кольору в інтерфейсі.

Наприклад:

    --color-primary: var(--blue-500);
    --color-background: #f8fafc;
    --color-text: #0f172a;
    --color-border: #e2e8f0;

Semantic tokens дозволяють змінювати фактичні кольори без зміни стилів компонентів.

Наприклад, кнопка використовує:

    background-color: var(--color-primary);

Вона не повинна знати, чи це синій, зелений або інший колір у конкретній темі.

У великій дизайн-системі raw tokens і semantic tokens часто використовуються разом.

---

# Color and Visual Hierarchy

`Visual hierarchy` — організація елементів за рівнем важливості.

Колір допомагає створювати цю ієрархію.

Наприклад:

    Primary action
        ↓
    Secondary action
        ↓
    Supporting information
        ↓
    Decorative details

Приклад:

    .primary-button {
        background-color: #2563eb;
        color: #ffffff;
    }

    .secondary-button {
        background-color: #ffffff;
        color: #0f172a;
        border: 1px solid #cbd5e1;
    }

    .muted-text {
        color: #64748b;
    }

Тут:

    Primary button → головна дія
    Secondary button → додаткова дія
    Muted text → менш акцентна інформація

Колір повинен підтримувати логіку інтерфейсу, а не конкурувати з нею.

---

# Color and Contrast

`Color contrast` — різниця між кольорами двох елементів.

У UI контраст особливо важливий для:

    Text vs background
    Icon vs background
    Button label vs button background
    Input border vs surrounding surface
    Focus indicator vs adjacent colors

Високий контраст може допомагати читати текст і знаходити важливі елементи.

Низький контраст може бути доречним для декоративних деталей, але проблематичним для тексту та важливих елементів керування.

Приклад:

    Good starting point:
        Dark text on light background

    Risky combination:
        Light gray text on white background

Однак оцінювати контраст потрібно за фактичними значеннями кольорів, а не лише за візуальною інтуїцією.

Для розрахунку контрасту WCAG використовує relative luminance.

Співвідношення контрасту записується так:

    1:1   → однакова relative luminance
    4.5:1 → типовий мінімум для звичайного тексту за WCAG AA
    7:1   → рівень AAA для звичайного тексту
    3:1   → типовий мінімум для великого тексту за WCAG AA

Для відповідності WCAG 2.2 AA:

• Звичайний текст зазвичай повинен мати контраст не менше 4.5:1.

• Великий текст зазвичай повинен мати контраст не менше 3:1.

• Важливі графічні об'єкти та компоненти керування мають окремі вимоги до контрасту, зокрема 3:1 для відповідних меж і візуальних ознак, необхідних для розпізнавання компонента.

Ці вимоги залежать від типу елемента та критерію доступності. Декоративні елементи оцінюються інакше.

Детальніше:

    10-color-accessibility

---

# Color Perception

`Color perception` — процес сприйняття кольорів зоровою системою людини.

На сприйняття кольору можуть впливати:

    Surrounding colors
    Background
    Lighting conditions
    Display characteristics
    Contrast
    Visual adaptation
    Individual differences

Один і той самий колір може виглядати по-різному на різних фонах.

Наприклад, сірий елемент на чорному фоні може сприйматися світлішим, ніж такий самий сірий елемент на білому фоні.

Це пов'язано з контекстом сприйняття.

Тому кольори потрібно оцінювати:

    Individually
    In context
    In combinations
    At realistic screen sizes

Особливо важливо перевіряти кольори тексту, меж, кнопок та індикаторів стану безпосередньо в інтерфейсі.

---

# Color Psychology

`Color psychology` — дослідження того, як кольори можуть впливати на сприйняття, асоціації та поведінку людей.

У дизайні часто використовують такі асоціації:

    Red    → energy, urgency
    Blue   → stability, trust
    Green  → nature, success
    Yellow → optimism, attention
    Orange → warmth, activity
    Purple → creativity, luxury
    Black  → elegance, seriousness
    White  → simplicity, cleanliness

Проте ці асоціації не є універсальними законами.

Сприйняття залежить від:

    Culture
    Context
    Brand identity
    Personal experience
    Surrounding colors
    Product category

Наприклад, зелений може позначати успіх у формі, але бути основним брендовим кольором в іншому застосунку.

Тому колір потрібно вибирати на основі задачі, контексту та користувачів, а не лише на основі загальних асоціацій.

---

# Color in CSS

У CSS є кілька способів задавати кольори.

## Named Colors

Використання назв кольорів.

    .example {
        color: red;
        background-color: white;
    }

Переваги:

    Simple
    Readable

Недоліки:

    Limited design control
    Not always suitable for a systematic palette

## HEX

    .example {
        color: #0f172a;
        background-color: #ffffff;
    }

HEX часто використовується в дизайн-макетах і CSS.

## RGB

    .example {
        color: rgb(15 23 42);
    }

RGB дозволяє задавати окремі канали кольору.

## RGBA and Alpha

Сучасний CSS дозволяє використовувати alpha channel у функції `rgb()`.

    .overlay {
        background-color: rgb(0 0 0 / 50%);
    }

Запис `rgba()` також підтримується:

    .overlay {
        background-color: rgba(0, 0, 0, 0.5);
    }

## HSL

    .example {
        color: hsl(220 90% 56%);
    }

HSL зручно використовувати для створення варіацій кольору.

## CSS Custom Properties

    :root {
        --color-primary: #2563eb;
        --color-background: #f8fafc;
        --color-text: #0f172a;
    }

    body {
        color: var(--color-text);
        background-color: var(--color-background);
    }

CSS custom properties дозволяють повторно використовувати значення та централізовано змінювати палітру.

---

# Practical Example — Basic Color System

Створимо невелику палітру для навчального застосунку.

HTML:

    <main class="page">
        <section class="card">
            <h1>Welcome back</h1>

            <p>
                Sign in to continue learning.
            </p>

            <button class="button-primary">
                Sign in
            </button>

            <button class="button-secondary">
                Create account
            </button>
        </section>
    </main>

CSS:

    :root {
        --color-primary: #2563eb;
        --color-primary-hover: #1d4ed8;

        --color-background: #f8fafc;
        --color-surface: #ffffff;

        --color-text: #0f172a;
        --color-text-muted: #64748b;

        --color-border: #cbd5e1;
    }

    * {
        box-sizing: border-box;
    }

    body {
        margin: 0;
        font-family: Arial, sans-serif;
        background-color: var(--color-background);
        color: var(--color-text);
    }

    .page {
        min-height: 100vh;
        display: grid;
        place-items: center;
        padding: 24px;
    }

    .card {
        width: 100%;
        max-width: 420px;
        padding: 32px;
        background-color: var(--color-surface);
        border: 1px solid var(--color-border);
        border-radius: 16px;
    }

    .card p {
        color: var(--color-text-muted);
        line-height: 1.6;
    }

    button {
        padding: 12px 18px;
        border-radius: 8px;
        font: inherit;
        cursor: pointer;
    }

    .button-primary {
        background-color: var(--color-primary);
        color: #ffffff;
        border: 1px solid var(--color-primary);
    }

    .button-primary:hover {
        background-color: var(--color-primary-hover);
    }

    .button-secondary {
        background-color: var(--color-surface);
        color: var(--color-text);
        border: 1px solid var(--color-border);
    }

У цьому прикладі:

    Primary → головна дія
    Background → фон сторінки
    Surface → поверхня картки
    Text → основний текст
    Muted text → другорядний текст
    Border → межа картки та кнопки

Це приклад того, як колірна палітра перетворюється на систему.

Зверни увагу: перед використанням у реальному проєкті потрібно перевірити контраст тексту, меж і станів компонентів.

---

# Practical Example — Color Scale

Створимо шкалу синього кольору.

    :root {
        --blue-50: #eff6ff;
        --blue-100: #dbeafe;
        --blue-200: #bfdbfe;
        --blue-300: #93c5fd;
        --blue-400: #60a5fa;
        --blue-500: #3b82f6;
        --blue-600: #2563eb;
        --blue-700: #1d4ed8;
        --blue-800: #1e40af;
        --blue-900: #1e3a8a;
    }

Використання:

    .info-panel {
        background-color: var(--blue-50);
        border: 1px solid var(--blue-200);
        color: var(--blue-900);
    }

    .primary-button {
        background-color: var(--blue-600);
        color: #ffffff;
    }

    .primary-button:hover {
        background-color: var(--blue-700);
    }

Ця шкала дозволяє використовувати один колір у різних ситуаціях.

Наприклад:

    50–200  → light surfaces
    300–400 → decorative elements
    500–600 → accents and actions
    700–900 → dark text or strong emphasis

Це лише можливий принцип організації шкали. Не кожен колір у кожній позиції автоматично підходить для відповідного призначення.

---

# Practical Example — Using HSL

HSL можна використовувати для створення варіацій одного базового кольору.

    :root {
        --blue-hue: 220;

        --blue-light: hsl(var(--blue-hue) 90% 95%);
        --blue-soft: hsl(var(--blue-hue) 90% 85%);
        --blue-base: hsl(var(--blue-hue) 90% 56%);
        --blue-dark: hsl(var(--blue-hue) 90% 30%);
    }

    .notice {
        background-color: var(--blue-light);
        color: var(--blue-dark);
        border: 1px solid var(--blue-soft);
    }

Усі кольори використовують один hue.

Це полегшує створення узгодженої групи кольорів.

Проте зміна lightness сама по собі не гарантує належного контрасту. Потрібно перевіряти конкретні пари кольорів.

---

# Practical Example — Color Roles

Один колір може використовуватися в різних ролях, але кожна роль має власне призначення.

    :root {
        --color-brand: #2563eb;

        --color-action: var(--color-brand);
        --color-link: var(--color-brand);
        --color-focus: #1d4ed8;
    }

    .button-primary {
        background-color: var(--color-action);
        color: #ffffff;
    }

    a {
        color: var(--color-link);
    }

    input:focus-visible {
        outline: 3px solid var(--color-focus);
        outline-offset: 2px;
    }

Тут:

    Brand color → колір бренду
    Action color → колір дії
    Link color → колір посилання
    Focus color → колір індикатора фокусу

Навіть якщо ці ролі використовують схожі кольори, вони повинні оцінюватися окремо з огляду на своє призначення.

---

# Типові помилки

## 1. Використовувати занадто багато акцентних кольорів

❌ Кожна кнопка має власний яскравий колір.

Проблема:

    No clear visual hierarchy
    Competing elements
    Inconsistent interface

Краще:

    One primary accent
    Limited secondary accents
    Neutral foundation

Кількість акцентів залежить від складності інтерфейсу, але кожен із них повинен мати зрозуміле призначення.

## 2. Вибирати кольори лише за зовнішнім виглядом

❌ Колір виглядає красиво на палітрі, тому його одразу використовують для тексту.

Проблема:

    Poor text contrast
    Difficult reading
    Accessibility issues

Краще перевіряти колір у реальному контексті та використовувати contrast checker.

## 3. Використовувати світло-сірий текст на білому фоні

❌ Другорядний текст майже не видно.

Проблема:

    Low contrast
    Poor readability
    Difficult reading for some users

Краще вибирати нейтральний колір, який залишається другорядним, але забезпечує потрібний контраст.

## 4. Використовувати колір як єдиний спосіб передавання інформації

❌ Поле помилки позначене лише червоним кольором.

Проблема:

    Error may be difficult to recognize
    Information may be lost for some users

Краще додавати:

    Error message
    Icon
    Clear label
    Appropriate border or state

## 5. Не розділяти кольори за ролями

❌ У всьому CSS повторюються випадкові HEX-значення.

    background-color: #2563eb;
    border-color: #2563eb;
    color: #2563eb;

Проблема:

    Hard to maintain
    Inconsistent palette
    Difficult theme changes

Краще використовувати color tokens.

    --color-primary: #2563eb;

## 6. Вважати, що однаковий hue означає однакову яскравість

❌ Кольори з однаковою HSL lightness автоматично вважаються однаково яскравими.

Проблема:

    Perceived brightness can differ
    Contrast can differ

Краще перевіряти фактичний контраст і сприйняття кольорів у контексті.

## 7. Використовувати opacity для всіх disabled-елементів

❌ Увесь компонент отримує:

    opacity: 0.5;

Проблема:

    Text becomes less readable
    Icons lose contrast
    Component may become visually unclear

Краще підбирати кольори disabled-стану відповідно до дизайн-системи та перевіряти їхню читабельність.

## 8. Використовувати колір бренду для всіх текстів

❌ Усі заголовки, абзаци та підписи мають акцентний колір.

Проблема:

    Weak visual hierarchy
    Excessive emphasis
    Reduced readability in some combinations

Краще розділяти:

    Primary text
    Secondary text
    Links
    Accent text

## 9. Ігнорувати темний режим

❌ Кольори світлої теми просто інвертуються.

Проблема:

    Poor contrast
    Harsh colors
    Unclear surfaces
    Inconsistent component states

Краще створювати окремі semantic color tokens для світлої та темної тем.

Детальніше:

    09-dark-mode

## 10. Використовувати занадто багато насичених кольорів

❌ Усі компоненти мають яскраві фони.

Проблема:

    Visual noise
    Competing accents
    Reduced clarity

Краще залишати насичені кольори для елементів, які справді потребують уваги.

---

# Питання зі співбесіди

Що таке color theory?

Що таке color у контексті UI-дизайну?

Які функції виконує колір в інтерфейсі?

Що таке hue?

Що таке saturation?

Що таке lightness?

Чим lightness відрізняється від brightness?

Що таке relative luminance?

Що таке tint?

Що таке shade?

Що таке tone?

Чим tone відрізняється від opacity?

Що таке transparency?

Чим warm colors відрізняються від cool colors?

Що таке neutral colors?

Що таке color temperature?

Що таке color palette?

Чим color palette відрізняється від color scheme?

Що таке color harmony?

Що таке color model?

Чим RGB відрізняється від HEX?

Що означають символи `R`, `G` і `B` у RGB?

Що означає формат `#RRGGBB`?

Що таке HSL?

Що означають компоненти HSL?

Чому HSL зручно використовувати для створення варіацій кольору?

Чи гарантує однаковий HSL lightness однакову сприйману яскравість?

Що таке color space?

Чим color model відрізняється від color space?

Що таке foreground?

Що таке background?

Що таке surface?

Чим background відрізняється від surface?

Що таке accent color?

Чому не варто використовувати акцентний колір скрізь?

Що таке color token?

Чим raw color tokens відрізняються від semantic color tokens?

Як організувати палітру через CSS custom properties?

Що таке visual hierarchy?

Як колір допомагає створювати visual hierarchy?

Що таке color contrast?

Чому колір не повинен бути єдиним способом передавання інформації?

Які фактори впливають на сприйняття кольору?

Що таке color psychology?

Чому асоціації кольорів не є універсальними правилами?

Які проблеми можуть виникнути через надмірну кількість акцентних кольорів?

Чому потрібно перевіряти кольори в реальному інтерфейсі?

Які основні принципи доступного використання кольору?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке color у UI.

Основні функції кольору.

Hue.

Saturation.

Lightness.

Базове розуміння brightness.

Tint.

Shade.

Tone.

Warm colors.

Cool colors.

Neutral colors.

Color palette.

Color harmony — базове розуміння.

RGB.

HEX.

HSL.

Foreground.

Background.

Surface.

Accent color.

Color contrast — базове розуміння.

Color tokens.

CSS custom properties для кольорів.

Розуміння ролі кольору у visual hierarchy.

Розуміння того, чому колір не повинен бути єдиним способом передавання інформації.

---

## 🔵 Junior

Розуміння відмінностей між:

    Hue
    Saturation
    Lightness
    Brightness
    Relative luminance

Упевнене використання:

    RGB
    HEX
    HSL
    Alpha channel

Створення базових color palettes.

Створення шкал світлих і темних відтінків.

Вибір foreground і background colors.

Розуміння ролей:

    Primary color
    Secondary color
    Accent color
    Neutral color
    Semantic color

Використання:

    Raw color tokens
    Semantic color tokens
    CSS custom properties

Розуміння color contrast.

Основи WCAG contrast requirements.

Перевірка кольорів у реальних компонентах.

Вибір кольорів для:

    Buttons
    Cards
    Links
    Forms
    Icons
    Borders

Розуміння того, як кольори впливають на візуальну ієрархію.

---

## 🟠 Middle

Побудова системних color scales.

Створення повної палітри для продукту.

Використання semantic color tokens.

Розділення primitive та semantic tokens.

Створення кольорових ролей для компонентів.

Створення світлої та темної тем.

Розуміння відмінностей між HSL, HWB, Lab та LCH.

Вибір кольорів з урахуванням сприйняття.

Використання perceptual color spaces під час створення палітр.

Автоматизована перевірка контрасту.

Побудова доступних станів компонентів.

Робота з:

    Hover
    Focus
    Active
    Selected
    Disabled
    Error
    Success
    Warning

Розуміння обмежень використання кольору як єдиного носія інформації.

Підтримка єдиної палітри в дизайн-системі.

---

## 🔴 Senior

Проєктування масштабованих color systems.

Побудова багаторівневої системи tokens.

Розділення:

    Primitive tokens
    Semantic tokens
    Component tokens

Створення тем для різних брендів.

Підтримка:

    Light mode
    Dark mode
    High contrast preferences
    Brand themes

Робота з wide-gamut color spaces.

Розуміння колірного керування.

Розуміння відмінностей між sRGB та Display P3.

Перцептивно узгоджене генерування колірних шкал.

Автоматизоване тестування доступності кольорів.

Системне управління контрастом.

Створення правил використання кольорів для різних типів компонентів.

Підтримка кольорової системи у великих продуктах.

Розуміння компромісів між:

    Brand identity
    Accessibility
    Visual hierarchy
    Cross-platform consistency
    Theming
    Maintainability

---

# Міні-шпаргалка

## Hue

    Hue → який це колірний тон?

Приклади:

    Red
    Green
    Blue

---

## Saturation

    Saturation → наскільки насичений колір?

    0%   → ненасичений
    100% → максимальна насиченість у HSL

---

## Lightness

    Lightness → наскільки світлий або темний колір у HSL?

    0%   → black
    50%  → середній рівень lightness
    100% → white

---

## Tint

    Tint → base color + white

---

## Shade

    Shade → base color + black

---

## Tone

    Tone → base color + gray

---

## RGB

    RGB → Red + Green + Blue

    rgb(255 0 0) → red

---

## HEX

    #RRGGBB

    #ff0000 → red
    #00ff00 → lime
    #0000ff → blue

---

## HSL

    hsl(hue saturation lightness)

    hsl(220 90% 56%)

---

## Opacity

    1   → fully opaque
    0.5 → 50% opacity
    0   → fully transparent

---

## Foreground vs Background

    Foreground → текст та елементи переднього плану
    Background → фон

---

## Background vs Surface

    Background → загальний фон
    Surface    → поверхня картки, панелі або діалогу

---

## Accent Color

    Accent color → візуальний акцент

Зазвичай використовується для:

    Primary actions
    Links
    Selected states
    Highlights

---

## Color Tokens

    --color-primary
    --color-background
    --color-surface
    --color-text
    --color-border

---

## Основні принципи

    Color → communication
    Palette → set of colors
    Contrast → visual distinction
    Tokens → reusable color values
    Semantic tokens → color by purpose

---

# Головне

• Колір в UI — це не лише декорація, а інструмент комунікації, навігації та візуальної ієрархії.

• `Hue` визначає колірний тон.

• `Saturation` визначає насиченість.

• `Lightness` описує світлість у колірній моделі HSL.

• `Brightness` і `lightness` не завжди означають одне й те саме.

• `Tint` — колір, змішаний із білим.

• `Shade` — колір, змішаний із чорним.

• `Tone` — колір, змішаний із сірим у традиційній теорії кольору.

• `Warm colors`, `cool colors` та `neutral colors` допомагають описувати характер палітри.

• `RGB`, `HEX` та `HSL` — поширені способи представлення кольорів у CSS.

• `Color palette` — набір кольорів, а `color scheme` — принцип їх організації та використання.

• `Foreground` — передній план, `background` — фон, `surface` — поверхня інтерфейсу.

• `Accent color` допомагає привертати увагу до важливих елементів.

• `Color tokens` забезпечують повторне використання кольорів та полегшують підтримку дизайну.

• `Semantic tokens` описують призначення кольору, а не лише його зовнішній вигляд.

• Колір потрібно оцінювати в контексті реального інтерфейсу, а не лише в палітрі.

• Для читабельності тексту важливо перевіряти фактичний контраст.

• Колір не повинен бути єдиним способом передавання важливої інформації.

• Психологічні асоціації кольорів залежать від контексту та не є універсальними законами.

• Якісна палітра не обов'язково має містити багато кольорів.

• Основна мета колірної системи — зробити інтерфейс зрозумілим, узгодженим, доступним і зручним для користувача.

---

# Наступний крок

Після `01-color-basics` логічно перейти до:

    02-color-wheel

У наступному розділі потрібно розібрати:

    Color wheel
    Primary colors
    Secondary colors
    Tertiary colors
    Complementary colors
    Analogous colors
    Triadic colors
    Split-complementary colors
    Color harmony
    Practical color combinations

Після цього буде простіше створювати власні палітри для навчальних застосунків, сторінок і компонентів UI.