# 02. Color Wheel

Color Wheel (колірне коло) — це візуальна модель, яка показує взаємозв'язок між кольорами та допомагає зрозуміти, як вони поєднуються між собою.

Колірне коло використовується в UI-дизайні для створення гармонійних палітр, вибору акцентних кольорів, побудови контрасту та формування візуальної ієрархії інтерфейсу.

За допомогою колірного кола можна:

- зрозуміти взаємозв'язок між кольорами;
- розрізняти primary, secondary та tertiary colors;
- знаходити complementary colors;
- створювати аналогові кольорові палітри;
- створювати тріадні та інші колірні схеми;
- підбирати кольори для кнопок, посилань, фонів і карток;
- будувати гармонійні UI color palettes;
- створювати виразні світлі та темні інтерфейси;
- уникати випадкового поєднання кольорів.

Основні поняття:

    Color wheel
    Primary colors
    Secondary colors
    Tertiary colors
    Complementary colors
    Analogous colors
    Triadic colors
    Split-complementary colors
    Tetradic colors
    Color harmony
    Color palette
    Hue
    Warm colors
    Cool colors

Важливо: колірне коло — це інструмент для пошуку кольорових взаємозв'язків, а не готова гарантія якісного UI-дизайну. Остаточний вибір кольорів залежить також від контрасту, насиченості, світлоти, доступності та контексту інтерфейсу.

---

## Ключові поняття

✔ color wheel  
✔ color circle  
✔ color relationships  
✔ color harmony  
✔ primary colors  
✔ secondary colors  
✔ tertiary colors  
✔ hue  
✔ warm colors  
✔ cool colors  
✔ complementary colors  
✔ analogous colors  
✔ triadic colors  
✔ split-complementary colors  
✔ tetradic colors  
✔ monochromatic palette  
✔ color scheme  
✔ color palette  
✔ dominant color  
✔ accent color  
✔ visual balance  
✔ color contrast  
✔ saturation  
✔ lightness  
✔ RGB color model  
✔ RYB color model  
✔ additive color mixing  
✔ subtractive color mixing  
✔ UI color system  

---

## Що потрібно пам'ятати

• Color wheel показує взаємозв'язок між кольорами.

• Primary colors — основні кольори певної колірної моделі.

• Secondary colors утворюються внаслідок змішування двох primary colors у межах відповідної моделі.

• Tertiary colors утворюються внаслідок поєднання primary та сусіднього secondary color у традиційній моделі колірного кола.

• Complementary colors розташовані навпроти один одного на колірному колі.

• Analogous colors розташовані поруч один з одним.

• Triadic colors утворюють три приблизно рівновіддалені точки на колірному колі.

• Split-complementary scheme використовує один основний колір і два кольори, розташовані поруч із його complementary color.

• Tetradic scheme використовує чотири кольори, які утворюють дві пари complementary colors.

• Monochromatic palette використовує один hue з різними значеннями lightness і saturation.

• Warm colors зазвичай асоціюються з червоним, помаранчевим і жовтим.

• Cool colors зазвичай асоціюються із синім, зеленим і синьо-фіолетовим.

• Колірне коло допомагає знайти кольори, але не визначає автоматично їхню читабельність.

• Complementary colors можуть створювати сильний контраст, але в однаковій насиченості та світлоті іноді втомлюють очі.

• Для UI недостатньо вибрати гармонійні кольори: потрібно визначити ролі кольорів у системі інтерфейсу.

• Колірна схема має враховувати background, surface, text, borders, primary actions і semantic states.

• Гармонійна палітра не обов'язково є доступною. Контраст тексту та інтерактивних елементів потрібно перевіряти окремо.

• Колірне коло може використовувати різні моделі кольору, тому правила змішування кольорів залежать від моделі.

---

# Color Wheel

Color Wheel — колірне коло, на якому кольори розташовані відповідно до їхніх відтінків.

У спрощеному вигляді колірне коло можна уявити так:

    Red
      ↓
    Red-Orange
      ↓
    Orange
      ↓
    Yellow-Orange
      ↓
    Yellow
      ↓
    Yellow-Green
      ↓
    Green
      ↓
    Blue-Green
      ↓
    Blue
      ↓
    Blue-Violet
      ↓
    Violet
      ↓
    Red-Violet
      ↓
    Red

Після червоного колірне коло замикається.

Кольори поступово переходять один в одного, утворюючи безперервну послідовність hue.

У цифровому UI-дизайні hue часто задають у градусах від 0° до 360°.

Наприклад, у HSL:

    hsl(0 100% 50%)    → red
    hsl(60 100% 50%)   → yellow
    hsl(120 100% 50%)  → green
    hsl(180 100% 50%)  → cyan
    hsl(240 100% 50%)  → blue
    hsl(300 100% 50%)  → magenta

Це приблизні орієнтири для цифрового колірного кола HSL, а не універсальні назви всіх кольорів у будь-якій колірній моделі.

---

# Hue

Hue — це відтінок кольору, тобто те, що ми зазвичай називаємо червоним, зеленим, синім, жовтим тощо.

Hue допомагає відрізнити один кольоровий напрямок від іншого.

Приклади:

    Red
    Orange
    Yellow
    Green
    Cyan
    Blue
    Violet

У HSL hue задається числом у градусах.

    0°    → red
    30°   → orange
    60°   → yellow
    120°  → green
    180°  → cyan
    240°  → blue
    270°  → violet
    300°  → magenta
    360°  → red

У цій системі:

    0° = 360°

Це однакова позиція на колірному колі.

Hue не визначає сам по собі, наскільки колір світлий або насичений.

Наприклад:

    hsl(210 100% 50%)
    hsl(210 50% 50%)
    hsl(210 100% 80%)

Усі три кольори мають однаковий hue, але відрізняються за saturation або lightness.

Детальніше ці параметри розглядаються в розділі:

    03-hue-saturation-lightness

---

# Primary Colors

Primary colors — основні кольори, які використовуються як вихідні кольори в певній колірній моделі.

Важливо розрізняти моделі кольору.

## RYB Color Model

RYB — традиційна художня модель змішування кольорів, яку часто використовують для пояснення класичного колірного кола.

У традиційній моделі RYB:

    Red
    Yellow
    Blue

Ці кольори вважаються primary colors.

Вони використовуються для пояснення того, як художні фарби можуть утворювати інші кольори.

## RGB Color Model

RGB використовується в цифрових екранах.

Основні кольори:

    Red
    Green
    Blue

RGB — additive color model.

Кольори утворюються шляхом додавання світла.

Приклад:

    Red + Green = Yellow
    Green + Blue = Cyan
    Blue + Red = Magenta

Якщо змішати всі три канали світла з максимальною інтенсивністю:

    rgb(255 255 255) → white

Якщо інтенсивність усіх каналів дорівнює нулю:

    rgb(0 0 0) → black

## CMY та CMYK

CMY — субтрактивна модель кольорів, яка використовує:

    Cyan
    Magenta
    Yellow

Вона описує змішування барвників або пігментів, які поглинають частину світла.

CMYK додає чорний канал:

    Cyan
    Magenta
    Yellow
    Key (Black)

CMYK переважно використовується в поліграфії.

## Що використовувати в UI-дизайні

Для цифрових інтерфейсів важливо розуміти:

    RGB → цифрове світло та екрани
    HSL → зручне описування hue, saturation, lightness
    HEX → поширений запис кольорів у CSS
    RYB → традиційне пояснення художнього колірного кола
    CMYK → друк

Не варто вважати primary colors універсально однаковими для всіх моделей.

---

# Secondary Colors

Secondary colors — кольори, які утворюються внаслідок змішування двох primary colors у відповідній моделі.

У традиційній моделі RYB:

    Red + Yellow = Orange
    Yellow + Blue = Green
    Blue + Red = Violet

Отже:

    Orange
    Green
    Violet

є secondary colors у цій традиційній моделі.

У RGB результати змішування інші:

    Red + Green = Yellow
    Green + Blue = Cyan
    Blue + Red = Magenta

Це відбувається тому, що RGB описує змішування світла, а RYB — традиційну модель змішування художніх кольорів.

У UI-дизайні поняття secondary color може також означати другорядний колір бренду або палітри. Це вже роль кольору в дизайн-системі, а не обов'язково secondary color у колірному колі.

---

# Tertiary Colors

Tertiary colors — кольори, які в традиційному колірному колі утворюються шляхом змішування primary color із сусіднім secondary color.

Приклади для RYB:

    Red + Orange = Red-Orange
    Yellow + Orange = Yellow-Orange
    Yellow + Green = Yellow-Green
    Blue + Green = Blue-Green
    Blue + Violet = Blue-Violet
    Red + Violet = Red-Violet

Tertiary colors створюють плавніші переходи між основними кольоровими напрямками.

У цифровому дизайні подібні переходи часто використовують для:

    gradients
    illustrations
    brand palettes
    decorative elements
    data visualizations

Важливо: tertiary colors у традиційному RYB-колі не слід ототожнювати з усіма можливими проміжними hue у цифровій HSL-моделі.

---

# Warm Colors

Warm colors — теплі кольори.

Зазвичай до них відносять:

    Red
    Red-Orange
    Orange
    Yellow-Orange
    Yellow

Вони часто асоціюються з:

    energy
    warmth
    activity
    enthusiasm
    attention
    friendliness

У UI-дизайні теплі кольори можуть використовуватися для:

    primary actions
    promotional banners
    important highlights
    alerts
    illustrations
    brand accents

Наприклад:

    Primary action → orange
    Promotional badge → warm red
    Highlight → yellow

Однак колір сам по собі не визначає значення елемента. Потрібно враховувати контекст, текст і загальну систему інтерфейсу.

## Приклад CSS

    :root {
        --color-warm-red: #D94841;
        --color-orange: #F28C28;
        --color-yellow: #F2C94C;
    }

    .button-primary {
        background-color: var(--color-orange);
        color: #1A1A1A;
    }

Для реального інтерфейсу необхідно перевірити контраст тексту на фоні кнопки.

---

# Cool Colors

Cool colors — холодні кольори.

Зазвичай до них відносять:

    Green
    Blue-Green
    Cyan
    Blue
    Blue-Violet

Вони часто асоціюються з:

    calmness
    stability
    clarity
    nature
    trust
    professionalism

У UI-дизайні холодні кольори часто використовують для:

    dashboards
    educational applications
    healthcare interfaces
    navigation
    information panels
    backgrounds
    links

Наприклад:

    Primary action → blue
    Secondary surface → pale blue
    Decorative element → teal

Ці асоціації не є універсальними правилами. Значення кольору залежить від культури, бренду, контексту та інших елементів дизайну.

## Приклад CSS

    :root {
        --color-blue: #2563EB;
        --color-teal: #0F766E;
        --color-green: #16A34A;
    }

    .link {
        color: var(--color-blue);
    }

    .information-panel {
        background-color: #EFF6FF;
    }

Посилання потрібно відрізняти не лише кольором, а й іншими візуальними ознаками, якщо цього потребує контекст доступності.

---

# Warm vs Cool Colors

Теплі та холодні кольори можуть допомагати формувати візуальну ієрархію.

    Warm colors
        ↓
    акцент, енергія, активність

    Cool colors
        ↓
    спокій, стабільність, інформація

Це загальні дизайнерські асоціації, а не суворі психологічні закони.

Наприклад, для освітнього застосунку можна використати:

    Blue → основний колір інтерфейсу
    Orange → важлива дія
    Light Gray → нейтральний фон
    Dark Gray → основний текст

У такій системі:

    Blue → navigation and primary UI
    Orange → selected actions or highlights
    Gray → neutral structure
    Dark Gray → readable text

Важливо не використовувати всі кольори з однаковою інтенсивністю. Потрібні домінантний колір, допоміжні кольори та контрольовані акценти.

---

# Color Relationships

Color relationships — взаємозв'язки між кольорами на колірному колі.

Саме ці взаємозв'язки використовують для побудови кольорових схем.

Основні схеми:

    Monochromatic
    Analogous
    Complementary
    Split-complementary
    Triadic
    Tetradic

Кожна схема має власний принцип розташування кольорів.

Однак схема не визначає автоматично:

    background color
    text color
    button color
    border color
    semantic colors

Ці ролі потрібно призначати окремо.

---

# Complementary Colors

Complementary colors — додаткові кольори, розташовані навпроти один одного на колірному колі.

Приклади приблизних пар у традиційному колірному колі:

    Red ↔ Green
    Blue ↔ Orange
    Yellow ↔ Violet

У цифровому HSL-колі complementary hue можна приблизно знайти, додавши 180°.

Формула:

    complementaryHue = (hue + 180) % 360

Наприклад:

    hue = 210°
    complementaryHue = (210 + 180) % 360
    complementaryHue = 30°

Отже:

    Blue-like hue → Orange-like hue

## Приклад CSS

    :root {
        --color-blue: hsl(210 80% 45%);
        --color-orange: hsl(30 90% 55%);
    }

    .card {
        border-color: var(--color-blue);
    }

    .card-highlight {
        background-color: var(--color-orange);
    }

Це приклад цифрової HSL-пари, а не точне відтворення всіх художніх правил RYB.

## Коли використовувати

Complementary scheme підходить для:

    strong visual contrast
    important highlights
    illustrations
    promotional graphics
    selected UI elements
    charts and diagrams

## Важливо

Не варто використовувати обидва кольори з однаковою насиченістю та однаковою візуальною вагою всюди.

Краще:

    dominant color → основна частина інтерфейсу
    complementary accent → невелика кількість акцентів

Наприклад:

    70% → neutral surfaces
    20% → primary color
    10% → accent color

Це лише умовний орієнтир для розподілу кольорів, а не обов'язкове правило.

---

# Analogous Colors

Analogous colors — кольори, розташовані поруч один з одним на колірному колі.

Приклад:

    Yellow
    Yellow-Green
    Green

Інший приклад:

    Blue
    Blue-Violet
    Violet

Analogous scheme часто виглядає гармонійно, оскільки кольори мають близькі hue.

## Використання в UI

Analogous colors можна використовувати для:

    brand palettes
    illustrations
    gradients
    dashboards
    decorative sections
    background variations

Приклад:

    Primary → blue
    Secondary → cyan
    Accent → blue-violet

## Приклад CSS

    :root {
        --color-blue: hsl(220 75% 50%);
        --color-cyan: hsl(190 75% 45%);
        --color-violet: hsl(250 65% 55%);
    }

    .hero {
        background-color: var(--color-blue);
    }

    .hero-highlight {
        color: var(--color-cyan);
    }

    .hero-decoration {
        background-color: var(--color-violet);
    }

Для читабельності тексту на кольорових поверхнях потрібно окремо підбирати відповідні text colors.

## Переваги

• Палітра виглядає узгоджено.

• Кольори легко використовувати разом.

• Підходить для створення цілісної візуальної атмосфери.

## Недоліки

• Контраст між сусідніми hue може бути недостатнім.

• Інтерфейс може виглядати одноманітним.

• Акцентні елементи можуть недостатньо виділятися.

Для розв'язання цих проблем змінюють lightness, saturation і пропорції використання кольорів.

---

# Triadic Colors

Triadic scheme — колірна схема з трьома кольорами, розташованими приблизно на однаковій відстані один від одного на колірному колі.

У цифровому HSL-колі відстань між трьома hue становить приблизно 120°.

Формула:

    hue1 = h
    hue2 = (h + 120) % 360
    hue3 = (h + 240) % 360

Наприклад:

    hue1 = 0°
    hue2 = 120°
    hue3 = 240°

Це приблизно:

    Red
    Green
    Blue

## Приклад CSS

    :root {
        --color-red: hsl(0 70% 50%);
        --color-green: hsl(120 60% 40%);
        --color-blue: hsl(240 70% 55%);
    }

Triadic scheme може бути яскравою та виразною.

## Коли використовувати

    playful interfaces
    educational applications
    illustrations
    games
    creative tools
    data visualization

## Основний принцип

Не потрібно використовувати всі три кольори однаково інтенсивно.

Можна визначити:

    dominant → blue
    secondary → green
    accent → red

А нейтральні фони й текст створять візуальний баланс.

Для серйозних інтерфейсів краще контролювати saturation та lightness, щоб палітра не перевантажувала користувача.

---

# Split-Complementary Colors

Split-complementary scheme — схема, яка використовує один основний колір і два кольори, розташовані поруч із його complementary hue.

Наприклад, якщо основний hue — синій, то замість одного протилежного помаранчевого можна використати два відтінки поруч із ним.

Спрощена схема:

    Primary hue
        ↓
    Complementary direction
        ↙       ↘
    Neighbor  Neighbor

Для цифрового колірного кола можна використати:

    hue1 = h
    hue2 = (h + 150) % 360
    hue3 = (h + 210) % 360

Наприклад:

    hue1 = 210°
    hue2 = 0°
    hue3 = 60°

Це приблизні цифрові орієнтири для split-complementary scheme.

## Переваги

• Дає контрастні поєднання.

• Має більше різноманіття, ніж проста complementary scheme.

• Дозволяє створювати виразні акценти.

• Може бути простішою для балансування, ніж схема з двома рівнозначними complementary colors.

## Використання в UI

    primary interface color → blue
    supporting color → warm red
    accent color → yellow

Важливо правильно розподілити кольори за ролями, а не використовувати їх випадково.

---

# Tetradic Colors

Tetradic scheme — схема, що використовує чотири кольори, які утворюють дві пари complementary colors.

У цифровому HSL-колі можна розглядати прямокутну схему:

    hue1 = h
    hue2 = (h + 60) % 360
    hue3 = (h + 180) % 360
    hue4 = (h + 240) % 360

Це один із варіантів tetradic scheme; інші чотириколірні схеми можуть мати інші відстані між hue.

## Особливості

Tetradic palette може створювати дуже різноманітний інтерфейс.

Водночас чотири виразні кольори легко перевантажують дизайн.

Тому варто визначити:

    dominant color
    secondary color
    accent color
    supporting color

У більшості звичайних UI-інтерфейсів частину палітри краще використовувати в малих дозах.

Tetradic scheme особливо корисна для:

    complex illustrations
    brand systems
    creative applications
    dashboards
    large design systems

Не потрібно використовувати всі чотири кольори в кожному компоненті.

---

# Monochromatic Palette

Monochromatic palette — палітра, побудована на одному hue з різними значеннями lightness і, за потреби, saturation.

Наприклад:

    Dark Blue
    Blue
    Medium Blue
    Light Blue
    Pale Blue

У CSS:

    :root {
        --blue-900: hsl(220 80% 20%);
        --blue-700: hsl(220 75% 35%);
        --blue-500: hsl(220 80% 50%);
        --blue-300: hsl(220 75% 70%);
        --blue-100: hsl(220 80% 95%);
    }

Усі кольори мають однаковий hue:

    220°

Але відрізняються за lightness і частково за saturation.

## Використання

Monochromatic palettes добре підходять для:

    dashboards
    business applications
    documentation websites
    educational platforms
    minimal interfaces
    consistent design systems

## Переваги

• Легко підтримувати візуальну узгодженість.

• Зручно створювати шкали кольорів.

• Простіше підтримувати брендове забарвлення.

• Добре поєднується з нейтральними кольорами.

## Недоліки

• Недостатній контраст між окремими елементами.

• Складніше виділяти акцентні дії.

• Може бракувати візуального різноманіття.

Для розв'язання цих проблем можна додати окремий accent color або використати нейтральні поверхні.

---

# Color Harmony

Color harmony — узгоджене поєднання кольорів, яке створює цілісне візуальне враження.

Гармонія може досягатися через:

    hue relationships
    saturation balance
    lightness balance
    color proportions
    neutral colors
    visual hierarchy
    contrast
    consistency

Важливо розуміти, що колірна гармонія не обмежується вибором кольорів на колірному колі.

Наприклад, complementary colors можуть бути надто яскравими для тривалого читання, а analogous colors можуть мати недостатній контраст.

Тому якісна палітра враховує кілька параметрів одночасно.

## Приклад

Невдала комбінація:

    Bright Red background
    Bright Green text

Проблеми:

    high visual tension
    potentially poor readability
    insufficient text contrast in some combinations
    excessive visual emphasis

Більш контрольований підхід:

    neutral background
    dark text
    one dominant color
    complementary accent for selected elements

Наприклад:

    background → #F8FAFC
    text → #1E293B
    primary → #2563EB
    accent → #F97316

Це лише початкова палітра. Її потрібно перевірити на контраст і відповідність конкретному інтерфейсу.

---

# Color Palette

Color palette — набір кольорів, які використовуються разом у певному дизайні.

Палітра може бути створена на основі однієї або кількох схем колірного кола.

У UI-дизайні палітра повинна містити не тільки красиві кольори, а й кольори з чіткими ролями.

Наприклад:

    Primary
    Secondary
    Accent
    Background
    Surface
    Text
    Border
    Success
    Warning
    Error
    Info

Це функціональні ролі кольорів, а не категорії кольорів на колірному колі.

## Приклад палітри

    :root {
        /* Brand */
        --color-primary: #2563EB;
        --color-secondary: #0F766E;
        --color-accent: #F97316;

        /* Neutral */
        --color-background: #F8FAFC;
        --color-surface: #FFFFFF;
        --color-text: #1E293B;
        --color-text-muted: #64748B;
        --color-border: #CBD5E1;

        /* Semantic */
        --color-success: #15803D;
        --color-warning: #A16207;
        --color-error: #B91C1C;
        --color-info: #0369A1;
    }

У цьому прикладі:

    Primary → основний брендований колір
    Secondary → додатковий брендований колір
    Accent → акцент
    Background → фон сторінки
    Surface → поверхня компонента
    Text → основний текст
    Border → межі компонентів
    Semantic → статусні повідомлення

Це лише початкова структура. Для повноцінної дизайн-системи кожній ролі можуть відповідати кілька значень для різних станів і тем.

---

# Color Wheel vs UI Color Roles

Важливо не плутати кольорові відносини з ролями кольорів в інтерфейсі.

## Color wheel categories

    Primary colors
    Secondary colors
    Tertiary colors
    Complementary colors
    Analogous colors
    Triadic colors

Ці поняття пояснюють структуру та взаємозв'язки кольорів.

## UI color roles

    Primary
    Secondary
    Accent
    Background
    Surface
    Text
    Border
    Success
    Warning
    Error
    Info

Ці поняття описують призначення кольорів у системі інтерфейсу.

Наприклад, primary UI color може бути синім.

Це не означає, що синій є primary color у традиційній моделі RYB.

Так само secondary UI color не обов'язково має бути secondary color на колірному колі.

Це різні системи класифікації.

---

# Як побудувати палітру за допомогою Color Wheel

При створенні палітри для UI можна використовувати такий процес.

    1. Визначити характер продукту
           ↓
    2. Вибрати базовий hue
           ↓
    3. Визначити color scheme
           ↓
    4. Вибрати dominant color
           ↓
    5. Додати secondary та accent colors
           ↓
    6. Створити neutral palette
           ↓
    7. Призначити UI color roles
           ↓
    8. Перевірити contrast
           ↓
    9. Перевірити light та dark themes
           ↓
    10. Перевірити палітру на реальних компонентах

## Крок 1 — Визначити характер продукту

Наприклад:

    Educational application
    Healthcare application
    Business dashboard
    Creative application
    E-commerce website

Потрібно зрозуміти, який характер має мати інтерфейс.

## Крок 2 — Вибрати базовий hue

Наприклад:

    Blue
    Green
    Orange
    Violet

Базовий hue стане відправною точкою для палітри.

## Крок 3 — Визначити color scheme

Наприклад:

    Monochromatic
    Analogous
    Complementary
    Triadic

Не обов'язково використовувати складну схему. Для багатьох UI-проєктів достатньо одного основного кольору, нейтральних кольорів та одного акценту.

## Крок 4 — Визначити dominant color

Dominant color — колір, який відіграє головну роль у палітрі.

Він може використовуватися для:

    primary buttons
    links
    selected navigation
    focus indicators
    important interactive elements

Не кожен із цих елементів повинен мати однаковий колір у всіх станах.

## Крок 5 — Додати accent color

Accent color використовується для привернення уваги до вибраних елементів.

Наприклад:

    primary → blue
    accent → orange

Акцент має залишатися помітним завдяки контрольованому використанню.

## Крок 6 — Створити neutral palette

Нейтральні кольори потрібні для:

    backgrounds
    surfaces
    text
    borders
    dividers
    disabled states

Приклад:

    #FFFFFF
    #F8FAFC
    #E2E8F0
    #94A3B8
    #475569
    #0F172A

Нейтральні кольори часто займають більшу частину інтерфейсу, ніж яскраві брендовані кольори.

## Крок 7 — Призначити UI roles

Наприклад:

    --color-primary
    --color-accent
    --color-background
    --color-surface
    --color-text
    --color-border

Це робить палітру зрозумілішою та зручнішою для підтримки.

## Крок 8 — Перевірити contrast

Перевірити:

    text on background
    text on buttons
    links on surfaces
    borders against backgrounds
    focus indicators
    selected states

Гармонійні кольори не гарантують достатнього контрасту.

## Крок 9 — Перевірити light та dark themes

Одна й та сама палітра не завжди добре працює в обох темах.

У dark mode часто потрібно змінювати lightness і розподіл кольорів за ролями.

## Крок 10 — Перевірити реальні компоненти

Використати палітру для:

    buttons
    cards
    forms
    navigation
    alerts
    tables
    links
    page backgrounds

Оцінювати потрібно не тільки окремі кольорові зразки, а й реальний інтерфейс.

---

# Color Wheel in CSS

CSS дозволяє задавати кольори в різних форматах.

## HEX

    .button {
        background-color: #2563EB;
    }

HEX широко використовується в UI-дизайні.

## RGB

    .button {
        background-color: rgb(37 99 235);
    }

RGB задає інтенсивність червоного, зеленого та синього каналів.

## HSL

    .button {
        background-color: hsl(221 83% 53%);
    }

HSL зручний для роботи з hue, saturation і lightness.

## Побудова кольорів за hue

    :root {
        --hue-primary: 221;

        --color-primary: hsl(
            var(--hue-primary) 83% 53%
        );

        --color-complementary: hsl(
            calc(var(--hue-primary) + 180) 83% 53%
        );
    }

У цьому прикладі complementary hue обчислюється математично.

Однак HSL не забезпечує автоматично рівномірної сприйманої яскравості. Для професійних палітр іноді краще використовувати perceptually oriented color spaces, наприклад OKLCH.

## Приклад із палітрою

    :root {
        --hue: 221;

        --color-primary: hsl(var(--hue) 83% 53%);
        --color-primary-light: hsl(var(--hue) 85% 90%);
        --color-primary-dark: hsl(var(--hue) 80% 30%);

        --color-accent: hsl(
            calc(var(--hue) + 150) 80% 48%
        );
    }

Це демонструє принцип побудови кольорів через hue.

Після створення палітри потрібно окремо налаштувати lightness, saturation і contrast для кожного призначення.

---

# Color Wheel and Gradients

Color wheel допомагає вибирати кольори для градієнтів.

Градієнт може використовувати:

    analogous colors
    complementary colors
    monochromatic colors

Приклад аналогового градієнта:

    .hero {
        background: linear-gradient(
            135deg,
            hsl(220 80% 55%),
            hsl(190 75% 45%)
        );
    }

Приклад градієнта з різними кольоровими напрямками:

    .hero {
        background: linear-gradient(
            135deg,
            #2563EB,
            #7C3AED,
            #DB2777
        );
    }

Градієнти можуть створювати виразний візуальний ефект, але не повинні погіршувати читабельність тексту.

Для тексту поверх градієнта потрібно перевірити контраст у всіх важливих частинах поверхні.

---

# Color Wheel and Branding

Колірне коло допомагає формувати палітру бренду.

Під час вибору брендованих кольорів варто враховувати:

    brand personality
    target audience
    industry
    cultural context
    visual differentiation
    accessibility
    digital usage
    print usage

Наприклад, бренд може використовувати:

    Primary → blue
    Secondary → teal
    Accent → orange
    Neutral → gray

Це не універсальна палітра для певної галузі, а приклад структури.

Після вибору брендованих кольорів необхідно визначити їхні ролі в інтерфейсі та створити додаткові відтінки для різних станів.

---

# Типові помилки

## ❌ Вважати, що будь-які complementary colors автоматично добре виглядають разом

Розташування навпроти на колірному колі не гарантує візуальної гармонії.

Потрібно контролювати:

    saturation
    lightness
    proportions
    contrast
    context

## ❌ Використовувати забагато яскравих кольорів

Якщо кожен елемент має насичений колір, інтерфейс втрачає візуальну ієрархію.

Краще визначити:

    dominant color
    supporting colors
    accent color
    neutral colors

## ❌ Використовувати тільки колірне коло без перевірки контрасту

Палітра може бути гармонійною, але текст — нечитабельним.

Контраст потрібно перевіряти окремо.

## ❌ Плутати primary color та primary UI color

Primary colors у колірній моделі — це одне поняття.

Primary color у дизайн-системі — це основний колір бренду або інтерфейсу.

Це не одне й те саме.

## ❌ Вважати, що secondary color завжди є secondary color колірного кола

Secondary UI color — це функціональна роль у палітрі.

Вона не визначається виключно положенням кольору на колірному колі.

## ❌ Створювати палітру тільки з яскравих кольорів

Інтерфейсу зазвичай потрібні нейтральні кольори для фону, поверхонь, тексту та меж.

## ❌ Не перевіряти кольори на реальних компонентах

Колір, який виглядає добре як окремий зразок, може погано працювати на кнопці, у формі або в навігації.

## ❌ Використовувати однакову палітру без адаптації для dark mode

Темна тема часто потребує інших значень lightness, інших поверхонь і налаштування контрасту.

## ❌ Передавати значення тільки кольором

Не варто позначати помилку, успіх або вибраний стан виключно кольором.

Потрібно також використовувати текст, іконки, підписи, форму або інші зрозумілі ознаки.

## ❌ Вважати HSL perceptually uniform

Однакові зміни lightness у HSL не обов'язково сприймаються однаково для різних hue.

Для складніших палітр можна розглянути OKLCH.

## ❌ Забувати про різні колірні моделі

RGB описує змішування світла, CMYK — субтрактивну модель друку, а традиційне RYB-коло використовується для пояснення змішування художніх фарб.

Результати змішування в цих моделях відрізняються.

---

# Практичні приклади

## Приклад 1 — Complementary palette

Завдання: створити палітру з основним синім і помаранчевим акцентом.

    :root {
        --color-primary: #2563EB;
        --color-accent: #F97316;

        --color-background: #F8FAFC;
        --color-surface: #FFFFFF;
        --color-text: #1E293B;
    }

Використання:

    .page {
        background-color: var(--color-background);
        color: var(--color-text);
    }

    .button-primary {
        background-color: var(--color-primary);
        color: #FFFFFF;
    }

    .badge-accent {
        background-color: var(--color-accent);
        color: #1E293B;
    }

Перед використанням потрібно перевірити контраст тексту на синьому та помаранчевому фонах.

---

## Приклад 2 — Analogous palette

Завдання: створити спокійну палітру на основі синіх і синьо-зелених відтінків.

    :root {
        --color-blue: #2563EB;
        --color-cyan: #0891B2;
        --color-teal: #0F766E;

        --color-background: #F8FAFC;
        --color-text: #0F172A;
    }

Використання:

    .navigation {
        background-color: var(--color-blue);
    }

    .information-card {
        border-top: 4px solid var(--color-cyan);
    }

    .selected-item {
        background-color: var(--color-teal);
        color: #FFFFFF;
    }

Ця палітра має узгоджені кольорові напрямки, але контраст кожної пари все одно потрібно перевірити.

---

## Приклад 3 — Monochromatic palette

Завдання: створити інтерфейс на основі одного синього hue.

    :root {
        --blue-950: #172554;
        --blue-800: #1E40AF;
        --blue-600: #2563EB;
        --blue-400: #60A5FA;
        --blue-100: #DBEAFE;
        --blue-50: #EFF6FF;
    }

Використання:

    .page {
        background-color: var(--blue-50);
    }

    .card {
        background-color: #FFFFFF;
        border: 1px solid var(--blue-100);
    }

    .button-primary {
        background-color: var(--blue-600);
        color: #FFFFFF;
    }

    .heading {
        color: var(--blue-950);
    }

Цей підхід добре демонструє, як один колірний напрямок може використовуватися в різних ролях.

---

## Приклад 4 — Triadic palette

Завдання: створити яскраву палітру для навчального застосунку.

    :root {
        --color-blue: #2563EB;
        --color-red: #DC2626;
        --color-green: #15803D;

        --color-background: #F8FAFC;
        --color-text: #1E293B;
    }

Можливе використання:

    Blue → основні дії та навігація
    Green → окремі позитивні акценти
    Red → важливі попередження або декоративні елементи

Важливо: не слід автоматично використовувати червоний для декоративних елементів, якщо в дизайн-системі він зарезервований для помилок. Семантичні ролі повинні залишатися послідовними.

---

## Приклад 5 — Палітра для dashboard

Завдання: створити базову палітру для інформаційної панелі.

    :root {
        /* Brand */
        --color-primary: #2563EB;
        --color-accent: #F97316;

        /* Backgrounds */
        --color-background: #F1F5F9;
        --color-surface: #FFFFFF;

        /* Text */
        --color-text: #0F172A;
        --color-text-muted: #64748B;

        /* Borders */
        --color-border: #CBD5E1;

        /* Semantic */
        --color-success: #15803D;
        --color-warning: #A16207;
        --color-error: #B91C1C;
    }

Ця палітра поєднує:

    brand colors
    neutral colors
    semantic colors

Колірне коло допомагає підібрати взаємозв'язки між брендованими кольорами, але нейтральні та семантичні ролі потрібно проєктувати окремо.

---

# Питання для самоперевірки

Що таке color wheel?

Для чого використовується колірне коло в UI-дизайні?

Що таке hue?

Як hue пов'язаний із HSL?

Які primary colors використовуються в традиційній моделі RYB?

Які primary colors використовуються в RGB?

Чим additive color mixing відрізняється від subtractive color mixing?

Що таке secondary colors?

Що таке tertiary colors?

Які кольори вважаються теплими?

Які кольори вважаються холодними?

Що таке complementary colors?

Як знайти приблизний complementary hue в HSL?

Що таке analogous colors?

Що таке triadic color scheme?

Що таке split-complementary scheme?

Що таке tetradic scheme?

Що таке monochromatic palette?

Чим color harmony відрізняється від color contrast?

Чому гармонійна палітра не завжди є доступною?

Чому не варто використовувати всі яскраві кольори однаково інтенсивно?

Що таке dominant color?

Що таке accent color?

Чим primary UI color відрізняється від primary color у колірній моделі?

Чим secondary UI color відрізняється від secondary color на колірному колі?

Навіщо інтерфейсу neutral colors?

Як побудувати палітру на основі одного hue?

Як перевірити, чи підходить палітра для UI?

Чому потрібно перевіряти контраст тексту на кольоровому фоні?

Чому палітру потрібно тестувати на реальних компонентах?

Що потрібно враховувати під час створення палітри для dark mode?

Що таке OKLCH і чим цей колірний простір корисний для роботи з палітрами?

---

# Шлях

## 🟢 Core — обов'язково знати

Що таке color wheel.

Що таке hue.

Основні кольорові напрямки.

Primary colors у RYB та RGB.

Secondary colors.

Tertiary colors.

Warm colors.

Cool colors.

Complementary colors.

Analogous colors.

Monochromatic palette.

Triadic scheme.

Основи color harmony.

Основи color palette.

Різниця між кольоровими схемами та UI color roles.

Основи роботи з кольорами в CSS.

HEX.

RGB.

HSL.

Розуміння, що гармонія не гарантує достатнього контрасту.

---

## 🔵 Junior — впевнене практичне використання

Уміти побудувати complementary palette.

Уміти побудувати analogous palette.

Уміти побудувати monochromatic palette.

Розуміти triadic scheme.

Розуміти split-complementary scheme.

Розуміти tetradic scheme.

Уміти вибрати dominant color.

Уміти вибрати accent color.

Уміти створити neutral palette.

Уміти створити базові CSS custom properties для палітри.

Уміти застосувати палітру до:

    buttons
    cards
    links
    navigation
    backgrounds
    borders
    text

Розуміти різницю між hue, saturation і lightness.

Перевіряти контраст тексту та інтерактивних елементів.

Не покладатися лише на колір для позначення стану.

Розуміти, чому палітру потрібно тестувати в реальному UI.

---

## 🟠 Middle — системне проєктування палітр

Побудова багаторівневої color palette.

Створення шкал кольорів.

Робота з design tokens.

Розділення brand colors та semantic colors.

Створення нейтральних шкал.

Розроблення палітр для light та dark themes.

Розуміння perceptual color differences.

Основи OKLCH.

Створення палітр для складних dashboard.

Робота з кольоровими станами компонентів:

    default
    hover
    active
    focus
    disabled
    selected

Перевірка контрасту для тексту, меж і focus indicators.

Побудова доступних кольорових схем.

Розуміння компромісів між brand identity, contrast і usability.

---

## 🔴 Senior — глибоке розуміння кольорових систем

Поглиблене розуміння color science.

Розуміння різних color spaces.

RGB та його варіанти.

HSL та його обмеження.

HSV / HSB.

CIE XYZ.

CIELAB.

OKLab.

OKLCH.

Perceptual color difference.

Gamut mapping.

Color interpolation.

Color mixing models.

Color management.

Display color differences.

Color tokens at scale.

Semantic token architecture.

Theming architecture.

Dynamic color systems.

Accessible palette generation.

Automated contrast validation.

Color system testing.

Trade-offs між:

    brand consistency
    visual harmony
    accessibility
    perceptual uniformity
    maintainability
    theming flexibility

На цьому рівні важливо не просто вибирати кольори, а будувати передбачувані, доступні та масштабовані кольорові системи.

---

# Міні-шпаргалка

## Color Wheel

    Color Wheel
        ↓
    Primary colors
        ↓
    Secondary colors
        ↓
    Tertiary colors

Колірне коло показує взаємозв'язки між hue.

---

## Complementary

    hue2 = (hue1 + 180) % 360

Кольори розташовані приблизно навпроти один одного в цифровому колірному колі.

    Example:
    Blue ↔ Orange

---

## Analogous

    Neighboring hues

Кольори розташовані поруч.

    Example:
    Blue
    Blue-Cyan
    Cyan

---

## Triadic

    hue1 = h
    hue2 = (h + 120) % 360
    hue3 = (h + 240) % 360

Три приблизно рівновіддалені hue.

---

## Split-Complementary

    hue1 = h
    hue2 = (h + 150) % 360
    hue3 = (h + 210) % 360

Основний hue та два кольори по обидва боки від його complementary hue.

---

## Tetradic

    Four hues
    Two complementary pairs

Чотириколірна схема з двома парами додаткових кольорів.

---

## Monochromatic

    Same hue
    Different lightness
    Optional saturation variations

Один hue з різними значеннями світлоти та, за потреби, насиченості.

---

## Warm vs Cool

    Warm → Red, Orange, Yellow

    Cool → Green, Cyan, Blue, Violet

Це загальні категорії, межі яких залежать від конкретного колірного контексту.

---

## Color Models

    RYB → traditional artistic color model
    RGB → additive light model
    CMY/CMYK → subtractive printing model
    HSL → hue, saturation, lightness
    HEX → hexadecimal CSS color notation
    OKLCH → perceptually oriented color space

---

## Color Wheel vs UI Roles

    Color wheel:
        complementary
        analogous
        triadic
        tetradic

    UI roles:
        primary
        secondary
        accent
        background
        surface
        text
        border
        semantic colors

Це різні способи класифікації кольорів.

---

## Palette Building

    1. Choose base hue
    2. Select color scheme
    3. Define dominant color
    4. Choose accent color
    5. Build neutral palette
    6. Define UI roles
    7. Check contrast
    8. Test real components

---

## Основні правила

    Color wheel → color relationships

    Complementary → opposite hues

    Analogous → neighboring hues

    Triadic → three evenly spaced hues

    Split-complementary → one hue + two split complements

    Tetradic → four hues / two complementary pairs

    Monochromatic → one hue / varying lightness

    Warm colors → often red, orange, yellow

    Cool colors → often green, cyan, blue, violet

    Color harmony ≠ accessibility

    Primary UI color ≠ primary color in a color model

    Secondary UI color ≠ secondary color on the color wheel

    Color palette → colors with defined roles

    UI color system → palette + roles + states + themes

---

# Головне

• Color Wheel — це інструмент для розуміння взаємозв'язків між кольорами.

• Hue визначає кольоровий напрямок.

• Primary, secondary і tertiary colors залежать від обраної колірної моделі.

• RGB використовується для опису змішування світла, а традиційна модель RYB — для пояснення художнього змішування кольорів.

• Complementary colors розташовані навпроти один одного на колірному колі.

• Analogous colors розташовані поруч.

• Triadic scheme використовує три приблизно рівновіддалені hue.

• Split-complementary scheme поєднує один hue з двома кольорами поруч із його complementary hue.

• Tetradic scheme використовує чотири кольори, які утворюють дві complementary pairs.

• Monochromatic palette використовує один hue з різними значеннями lightness та, за потреби, saturation.

• Warm і cool colors допомагають формувати візуальну атмосферу, але їхні асоціації не є універсальними.

• Color harmony залежить не лише від hue, а й від saturation, lightness, пропорцій та контексту.

• Primary color у UI-дизайні — це функціональна роль, а не обов'язково primary color колірної моделі.

• Secondary UI color також не обов'язково є secondary color колірного кола.

• Якісна UI-палітра містить брендовані, нейтральні та семантичні кольори.

• Для побудови системи кольорів потрібно визначити ролі кольорів і правила їх використання.

• CSS підтримує HEX, RGB, HSL та інші способи задання кольорів.

• HSL зручний для побудови палітр за hue, але не є perceptually uniform.

• Для складніших палітр варто розуміти OKLCH та інші колірні простори.

• Гармонійна палітра не гарантує достатнього контрасту.

• Текст, інтерактивні елементи та focus indicators потрібно перевіряти окремо.

• Колір не повинен бути єдиним способом передавання важливої інформації.

• Світла й темна теми можуть потребувати різних значень кольорів та різного розподілу ролей.

• Колірне коло допомагає знайти відправну точку, але остаточна якість палітри визначається тим, як вона працює в реальному інтерфейсі.

• Основний принцип UI color design:

    Color relationships
          ↓
    Color palette
          ↓
    UI color roles
          ↓
    Components and states
          ↓
    Contrast and accessibility
          ↓
    Consistent interface