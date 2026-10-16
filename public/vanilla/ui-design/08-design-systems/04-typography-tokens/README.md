# 04. Typography Tokens

## 1. Що таке Typography Tokens?

**Typography Tokens (типографічні токени)** — це іменовані змінні, які зберігають значення параметрів тексту в дизайн-системі.

Замість того щоб указувати розмір шрифту, товщину, міжрядковий інтервал і відстань між літерами окремо для кожного елемента, ми створюємо набір типографічних токенів і повторно використовуємо їх у всьому інтерфейсі.

Наприклад, замість:

    .page-title {
      font-size: 32px;
      font-weight: 700;
      line-height: 1.2;
    }

    .card-title {
      font-size: 24px;
      font-weight: 700;
      line-height: 1.3;
    }

    .section-title {
      font-size: 24px;
      font-weight: 700;
      line-height: 1.3;
    }

Використовуємо токени:

    :root {
      --font-size-heading-xl: 2rem;
      --font-size-heading-lg: 1.5rem;

      --font-weight-bold: 700;

      --line-height-tight: 1.2;
      --line-height-normal: 1.5;
    }

    .page-title {
      font-size: var(--font-size-heading-xl);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-tight);
    }

    .card-title,
    .section-title {
      font-size: var(--font-size-heading-lg);
      font-weight: var(--font-weight-bold);
      line-height: 1.3;
    }

Тепер типографічні параметри централізовані. Якщо потрібно змінити систему розмірів шрифтів, це можна зробити в одному місці.

**Головна ідея:** Typography Tokens перетворюють окремі значення CSS на узгоджену систему типографіки.

---

## 2. Навіщо потрібні Typography Tokens?

Типографічні токени допомагають:

✔ підтримувати однакові правила оформлення тексту;
✔ створювати зрозумілу ієрархію заголовків і основного тексту;
✔ повторно використовувати типографічні значення;
✔ швидко змінювати шрифти та розміри в усьому проєкті;
✔ забезпечувати читабельність інтерфейсу;
✔ підтримувати адаптивну типографіку;
✔ зменшувати кількість довільних CSS-значень;
✔ узгоджувати роботу дизайнера та розробника;
✔ спрощувати підтримку дизайн-системи.

### Без токенів

    .hero-title {
      font-size: 48px;
      font-weight: 700;
      line-height: 1.1;
    }

    .card-title {
      font-size: 24px;
      font-weight: 700;
      line-height: 1.3;
    }

    .article-title {
      font-size: 32px;
      font-weight: 700;
      line-height: 1.2;
    }

    .modal-title {
      font-size: 24px;
      font-weight: 700;
      line-height: 1.3;
    }

Проблема: схожі елементи можуть мати різні значення, а зміна типографіки потребує пошуку багатьох CSS-правил.

### Із токенами

    :root {
      --font-size-display: 3rem;
      --font-size-heading-xl: 2rem;
      --font-size-heading-lg: 1.5rem;

      --font-weight-bold: 700;

      --line-height-tight: 1.2;
      --line-height-normal: 1.5;
    }

    .hero-title {
      font-size: var(--font-size-display);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-tight);
    }

    .article-title {
      font-size: var(--font-size-heading-xl);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-tight);
    }

    .card-title,
    .modal-title {
      font-size: var(--font-size-heading-lg);
      font-weight: var(--font-weight-bold);
    }

Тепер система має зрозумілі правила, які можна змінювати централізовано.

---

## 3. Основні поняття

### 3.1. Typography Scale — типографічна шкала

**Typography Scale** — це впорядкований набір розмірів тексту, які використовуються в інтерфейсі.

Наприклад:

    --font-size-xs: 0.75rem;
    --font-size-sm: 0.875rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.25rem;
    --font-size-2xl: 1.5rem;
    --font-size-3xl: 2rem;
    --font-size-4xl: 3rem;

За стандартного розміру кореневого шрифту 16px це відповідає:

| Токен | Значення | Приблизний розмір |
|---|---|---:|
| `--font-size-xs` | `0.75rem` | 12px |
| `--font-size-sm` | `0.875rem` | 14px |
| `--font-size-md` | `1rem` | 16px |
| `--font-size-lg` | `1.125rem` | 18px |
| `--font-size-xl` | `1.25rem` | 20px |
| `--font-size-2xl` | `1.5rem` | 24px |
| `--font-size-3xl` | `2rem` | 32px |
| `--font-size-4xl` | `3rem` | 48px |

Це приклад, а не обов'язкова шкала. Для конкретного проєкту можна вибрати інші значення.

### 3.2. Font Family — сімейство шрифтів

Визначає, який шрифт використовується в інтерфейсі.

    :root {
      --font-family-sans: Arial, sans-serif;
      --font-family-serif: Georgia, serif;
      --font-family-mono: monospace;
    }

Застосування:

- `sans` — інтерфейс і основний текст;
- `serif` — текст із зарубками, якщо це відповідає дизайну;
- `mono` — код, технічні значення та приклади.

Це лише приклад. У реальному проєкті можна використовувати локальні шрифти або підключені вебшрифти.

### 3.3. Font Weight — товщина шрифту

Визначає, наскільки тонкими або жирними виглядають символи.

    :root {
      --font-weight-regular: 400;
      --font-weight-medium: 500;
      --font-weight-semibold: 600;
      --font-weight-bold: 700;
    }

Типові значення:

- `400` — звичайний текст;
- `500` — середня товщина;
- `600` — напівжирний;
- `700` — жирний.

Доступні значення залежать від конкретного шрифту. Якщо шрифт не має відповідного накреслення, браузер може використати найближче доступне.

### 3.4. Line Height — міжрядковий інтервал

Визначає висоту рядка тексту.

    :root {
      --line-height-tight: 1.2;
      --line-height-normal: 1.5;
      --line-height-relaxed: 1.75;
    }

Приклад:

    .heading {
      line-height: var(--line-height-tight);
    }

    .paragraph {
      line-height: var(--line-height-normal);
    }

Для заголовків часто використовують компактніший інтервал, а для основного тексту — більший.

Значення без одиниці виміру, наприклад `1.5`, задає множник відносно розміру шрифту.

### 3.5. Letter Spacing — відстань між літерами

Визначає додатковий простір між символами.

    :root {
      --letter-spacing-tight: -0.02em;
      --letter-spacing-normal: 0;
      --letter-spacing-wide: 0.05em;
    }

Приклад:

    .hero-title {
      letter-spacing: var(--letter-spacing-tight);
    }

    .eyebrow {
      letter-spacing: var(--letter-spacing-wide);
    }

Не варто автоматично збільшувати відстань між літерами для всіх заголовків. Це залежить від шрифту, розміру та призначення тексту.

---

## 4. Два основні типи Typography Tokens

Як і в колірній системі, у типографіці можна використовувати Primitive Tokens і Semantic Tokens.

### 4.1. Primitive Tokens — базові токени

Primitive Tokens зберігають окремі значення типографічних параметрів.

Вони відповідають на запитання:

«Яке конкретне значення потрібно використати?»

Приклад:

    :root {
      --font-size-12: 0.75rem;
      --font-size-14: 0.875rem;
      --font-size-16: 1rem;
      --font-size-24: 1.5rem;
      --font-size-32: 2rem;

      --font-weight-400: 400;
      --font-weight-600: 600;
      --font-weight-700: 700;

      --line-height-120: 1.2;
      --line-height-150: 1.5;
    }

Ці токени зберігають конкретні значення, незалежно від того, де саме вони будуть використані.

### 4.2. Semantic Tokens — семантичні токени

Semantic Tokens описують роль типографічного значення в інтерфейсі.

Вони відповідають на запитання:

«Для якого типу тексту призначене це значення?»

Приклад:

    :root {
      --font-size-body: var(--font-size-16);
      --font-size-card-title: var(--font-size-24);
      --font-size-page-title: var(--font-size-32);

      --font-weight-body: var(--font-weight-400);
      --font-weight-heading: var(--font-weight-700);

      --line-height-body: var(--line-height-150);
      --line-height-heading: var(--line-height-120);
    }

Тепер назва токена пояснює, для чого його використовують.

### 4.3. У чому різниця?

| Primitive Token | Semantic Token |
|---|---|
| `--font-size-16` | `--font-size-body` |
| `--font-size-32` | `--font-size-page-title` |
| `--font-weight-700` | `--font-weight-heading` |
| `--line-height-150` | `--line-height-body` |
| Зберігає конкретне значення | Описує роль значення |
| Формує основу системи | Пов'язує значення з інтерфейсом |

**Що запам'ятати:**

Primitive Token — це конкретне значення типографічного параметра.

Semantic Token — це значення, пов'язане з певною роллю в інтерфейсі.

Для невеликого навчального проєкту не обов'язково створювати два рівні для кожного параметра. Але розуміння цього підходу допомагає будувати масштабовані дизайн-системи.

---

## 5. Основні групи Typography Tokens

Типографічні токени можна групувати за параметрами, які вони контролюють.

### 5.1. Font Family Tokens

Визначають сімейства шрифтів.

    :root {
      --font-family-primary: Arial, sans-serif;
      --font-family-heading: Arial, sans-serif;
      --font-family-code: monospace;
    }

Якщо заголовки й основний текст використовують один шрифт, окремі токени все одно можуть бути корисними, якщо в майбутньому їх потрібно буде розділити.

### 5.2. Font Size Tokens

Визначають розмір тексту.

    :root {
      --font-size-xs: 0.75rem;
      --font-size-sm: 0.875rem;
      --font-size-md: 1rem;
      --font-size-lg: 1.125rem;
      --font-size-xl: 1.25rem;
      --font-size-2xl: 1.5rem;
      --font-size-3xl: 2rem;
      --font-size-4xl: 3rem;
    }

Застосування:

- дрібні підписи;
- основний текст;
- назви кнопок;
- заголовки карток;
- заголовки сторінок;
- великі заголовки першого екрана.

### 5.3. Font Weight Tokens

Визначають товщину тексту.

    :root {
      --font-weight-regular: 400;
      --font-weight-medium: 500;
      --font-weight-semibold: 600;
      --font-weight-bold: 700;
    }

Не потрібно використовувати всі значення у кожному проєкті. Достатньо тих, які підтримуються обраним шрифтом і потрібні інтерфейсу.

### 5.4. Line Height Tokens

Визначають міжрядковий інтервал.

    :root {
      --line-height-tight: 1.2;
      --line-height-snug: 1.35;
      --line-height-normal: 1.5;
      --line-height-relaxed: 1.75;
    }

Застосування:

- заголовки;
- основний текст;
- допоміжні описи;
- довгі статті;
- повідомлення про помилки.

### 5.5. Letter Spacing Tokens

Визначають відстань між літерами.

    :root {
      --letter-spacing-tight: -0.02em;
      --letter-spacing-normal: 0;
      --letter-spacing-wide: 0.04em;
    }

Застосування:

- великі заголовки;
- короткі декоративні підписи;
- мітки;
- текст, для якого спеціально передбачено зміну інтервалу.

Для звичайного тексту часто достатньо стандартного значення `normal`.

### 5.6. Text Style Tokens

**Text Style Tokens** об'єднують кілька типографічних параметрів в один логічний стиль.

Наприклад, стиль основного тексту може містити:

- сімейство шрифту;
- розмір;
- товщину;
- міжрядковий інтервал;
- відстань між літерами.

Приклад:

    :root {
      --text-body-size: 1rem;
      --text-body-weight: 400;
      --text-body-line-height: 1.5;
      --text-body-letter-spacing: 0;
    }

    .body-text {
      font-size: var(--text-body-size);
      font-weight: var(--text-body-weight);
      line-height: var(--text-body-line-height);
      letter-spacing: var(--text-body-letter-spacing);
    }

Це простий CSS-підхід до створення стилю тексту. У спеціалізованих інструментах дизайну Text Style може бути окремим об'єктом, а в коді його часто реалізують через класи або компоненти.

---

## 6. Typography Scale — як створити шкалу розмірів

Типографічна шкала визначає, які розміри тексту доступні в дизайн-системі.

### 6.1. Початкова шкала

Для навчального проєкту можна використати таку шкалу:

    :root {
      --font-size-xs: 0.75rem;
      --font-size-sm: 0.875rem;
      --font-size-md: 1rem;
      --font-size-lg: 1.125rem;
      --font-size-xl: 1.25rem;
      --font-size-2xl: 1.5rem;
      --font-size-3xl: 2rem;
      --font-size-4xl: 3rem;
    }

Ця шкала містить розміри від 12px до 48px за стандартного кореневого розміру 16px.

### 6.2. Чому не варто створювати забагато розмірів?

Якщо кожен елемент має власний довільний розмір, типографіка стає непослідовною.

Наприклад:

    .title-a {
      font-size: 31px;
    }

    .title-b {
      font-size: 33px;
    }

    .title-c {
      font-size: 30px;
    }

Якщо ці відмінності не мають конкретної дизайнерської причини, краще використовувати спільні значення зі шкали.

### 6.3. Чи потрібно використовувати всі розміри?

Ні.

Шкала — це набір доступних значень, а не вимога використати кожне з них.

Для простого сайту може бути достатньо:

    --font-size-sm: 0.875rem;
    --font-size-md: 1rem;
    --font-size-lg: 1.125rem;
    --font-size-xl: 1.5rem;
    --font-size-2xl: 2rem;

Додавай розміри, коли вони потрібні для реальної ієрархії тексту.

---

## 7. Типографічна ієрархія

**Typography Hierarchy** — це система візуальних рівнів тексту, яка допомагає користувачу зрозуміти структуру сторінки.

Зазвичай ієрархія включає:

- Display — дуже великий акцентний текст;
- Heading — заголовки;
- Body — основний текст;
- Label — короткі назви елементів;
- Caption — допоміжні підписи.

Приклад:

    :root {
      --text-display-size: 3rem;
      --text-h1-size: 2.5rem;
      --text-h2-size: 2rem;
      --text-h3-size: 1.5rem;
      --text-body-size: 1rem;
      --text-small-size: 0.875rem;
    }

    .display {
      font-size: var(--text-display-size);
    }

    h1 {
      font-size: var(--text-h1-size);
    }

    h2 {
      font-size: var(--text-h2-size);
    }

    h3 {
      font-size: var(--text-h3-size);
    }

    .body-text {
      font-size: var(--text-body-size);
    }

    .caption {
      font-size: var(--text-small-size);
    }

### Важливе розрізнення

HTML-заголовок і візуальний стиль — не одне й те саме.

Наприклад, `h2` позначає рівень заголовка в структурі документа, а `font-size` визначає його візуальний розмір.

Заголовок `h2` може отримати стиль іншого типографічного токена, якщо цього потребує дизайн. Проте семантична структура HTML повинна залишатися логічною.

---

## 8. Semantic Typography Tokens

Семантичні типографічні токени визначають призначення тексту, а не лише його розмір.

Наприклад:

    :root {
      --font-size-page-title: 2.5rem;
      --font-size-section-title: 2rem;
      --font-size-card-title: 1.5rem;
      --font-size-body: 1rem;
      --font-size-caption: 0.875rem;
    }

    .page-title {
      font-size: var(--font-size-page-title);
    }

    .section-title {
      font-size: var(--font-size-section-title);
    }

    .card-title {
      font-size: var(--font-size-card-title);
    }

    .body-text {
      font-size: var(--font-size-body);
    }

    .caption {
      font-size: var(--font-size-caption);
    }

Перевага такого підходу полягає в тому, що назва токена пояснює його роль.

Якщо в майбутньому потрібно змінити розмір заголовків карток, достатньо змінити `--font-size-card-title`.

### Коли використовувати назви за розміром?

Назви на кшталт `--font-size-16` зручні для базової шкали.

### Коли використовувати назви за роллю?

Назви на кшталт `--font-size-body` або `--font-size-card-title` зручні для компонентів та інтерфейсних стилів.

У великій дизайн-системі обидва підходи можуть співіснувати.

---

## 9. CSS Custom Properties для Typography Tokens

У CSS типографічні токени зазвичай створюють за допомогою Custom Properties.

### 9.1. Оголошення токенів

    :root {
      --font-family-primary: Arial, sans-serif;

      --font-size-body: 1rem;
      --font-size-heading: 2rem;

      --font-weight-body: 400;
      --font-weight-heading: 700;

      --line-height-body: 1.5;
      --line-height-heading: 1.2;
    }

### 9.2. Використання через var()

    body {
      font-family: var(--font-family-primary);
      font-size: var(--font-size-body);
      font-weight: var(--font-weight-body);
      line-height: var(--line-height-body);
    }

    h1 {
      font-size: var(--font-size-heading);
      font-weight: var(--font-weight-heading);
      line-height: var(--line-height-heading);
    }

### 9.3. Чому використовують rem?

`rem` залежить від розміру шрифту кореневого елемента — зазвичай `html`.

Наприклад:

    html {
      font-size: 16px;
    }

    h1 {
      font-size: 2rem;
    }

За такого налаштування `2rem` дорівнює 32px.

Використання `rem` допомагає будувати масштабовану типографіку та враховувати налаштування розміру шрифту користувача.

Не варто без потреби жорстко фіксувати розмір кореневого шрифту в пікселях, якщо це заважає масштабуванню тексту.

---

## 10. Font Family Tokens і підключення шрифтів

Токени сімейства шрифтів дають змогу централізовано керувати типографічним оформленням.

Приклад:

    :root {
      --font-family-sans: Arial, sans-serif;
      --font-family-serif: Georgia, serif;
      --font-family-mono: "Courier New", monospace;
    }

    body {
      font-family: var(--font-family-sans);
    }

    blockquote {
      font-family: var(--font-family-serif);
    }

    code {
      font-family: var(--font-family-mono);
    }

Якщо проєкт використовує власний вебшрифт, його можна підключити через `@font-face` або відповідний механізм завантаження.

Приклад із локальним файлом шрифту:

    @font-face {
      font-family: "Project Sans";
      src: url("/fonts/project-sans.woff2") format("woff2");
      font-weight: 400 700;
      font-style: normal;
      font-display: swap;
    }

    :root {
      --font-family-primary: "Project Sans", Arial, sans-serif;
    }

    body {
      font-family: var(--font-family-primary);
    }

Діапазон `font-weight: 400 700` доречний для змінного шрифту, який підтримує цей діапазон. Для статичних файлів потрібно оголошувати фактично доступні накреслення відповідно до їхніх файлів.

**Важливо:** назва в `font-family` має збігатися з назвою, оголошеною у `@font-face`.

---

## 11. Font Weight Tokens і правила використання

Токени товщини допомагають підтримувати однакову візуальну ієрархію.

Приклад:

    :root {
      --font-weight-regular: 400;
      --font-weight-medium: 500;
      --font-weight-semibold: 600;
      --font-weight-bold: 700;
    }

    body {
      font-weight: var(--font-weight-regular);
    }

    .navigation__link {
      font-weight: var(--font-weight-medium);
    }

    .card__title {
      font-weight: var(--font-weight-semibold);
    }

    .page-title {
      font-weight: var(--font-weight-bold);
    }

### Що потрібно пам'ятати?

- Розмір шрифту і його товщина — різні параметри.
- Жирніший текст не завжди означає важливіший зміст.
- Занадто багато різних товщин можуть зробити інтерфейс візуально неузгодженим.
- Доступність конкретних товщин залежить від шрифту.
- Не обов'язково використовувати всі значення від 100 до 900.

---

## 12. Line Height Tokens і читабельність

Міжрядковий інтервал впливає на те, наскільки легко читати текст.

Приклад:

    :root {
      --line-height-heading: 1.2;
      --line-height-body: 1.5;
      --line-height-long-text: 1.7;
    }

    h1,
    h2,
    h3 {
      line-height: var(--line-height-heading);
    }

    p {
      line-height: var(--line-height-body);
    }

    .article-content {
      line-height: var(--line-height-long-text);
    }

### Як вибирати line-height?

- Для великих заголовків часто підходить компактніший інтервал.
- Для основного тексту зазвичай потрібен вільніший інтервал.
- Для довгих статей можна використати більший інтервал, якщо це покращує читабельність.
- Для коротких підписів значення залежить від розміру тексту та контексту.

Це рекомендації, а не жорсткі правила.

### Line-height і висота елемента

`line-height` впливає на висоту рядка, але не задає фіксовану висоту всього текстового контейнера.

Якщо текст переноситься на кілька рядків, загальна висота залежить від кількості рядків, міжрядкового інтервалу та інших стилів.

Не варто замінювати правильний `line-height` жорстким `height`, який може обрізати текст.

---

## 13. Letter Spacing Tokens

Letter spacing визначає додаткову відстань між символами.

Приклад:

    :root {
      --letter-spacing-tight: -0.02em;
      --letter-spacing-normal: 0;
      --letter-spacing-wide: 0.04em;
    }

    .hero-title {
      letter-spacing: var(--letter-spacing-tight);
    }

    .body-text {
      letter-spacing: var(--letter-spacing-normal);
    }

    .eyebrow {
      letter-spacing: var(--letter-spacing-wide);
      text-transform: uppercase;
    }

### Що потрібно пам'ятати?

- Негативне значення робить символи візуально ближчими.
- Позитивне значення збільшує відстань між символами.
- Надмірне розрідження може погіршити читання довгого тексту.
- Надмірне ущільнення може ускладнити розпізнавання символів.
- Відповідне значення залежить від шрифту та розміру тексту.

Не потрібно задавати нестандартний `letter-spacing` кожному елементу. Використовуй його там, де він покращує типографіку.

---

## 14. Typography Tokens і адаптивний дизайн

Типографіка повинна залишатися зручною на різних екранах.

На широкому екрані великий заголовок може мати розмір 48px, а на вузькому — 32px.

Для цього можна використовувати адаптивні токени.

### 14.1. Зміна токена через media query

    :root {
      --font-size-display: 2rem;
    }

    @media (min-width: 768px) {
      :root {
        --font-size-display: 3rem;
      }
    }

    .hero-title {
      font-size: var(--font-size-display);
    }

У цьому прикладі змінюється значення токена, а не правило самого заголовка.

### 14.2. Fluid Typography через clamp()

`clamp()` дозволяє визначити мінімальне, гнучке та максимальне значення.

    :root {
      --font-size-display: clamp(2rem, 1.2rem + 3vw, 3.5rem);
    }

    .hero-title {
      font-size: var(--font-size-display);
    }

Функція має три частини:

    clamp(мінімум, гнучке значення, максимум)

- Мінімум — розмір, нижче якого значення не опускається.
- Гнучке значення — розрахунок, який реагує на ширину вікна.
- Максимум — розмір, вище якого значення не піднімається.

Це дає змогу створювати плавну типографіку без великої кількості медіазапитів.

### 14.3. Не вся типографіка повинна бути fluid

Для основного тексту часто достатньо стабільного розміру:

    :root {
      --font-size-body: 1rem;
    }

А великі заголовки можуть змінюватися плавно:

    :root {
      --font-size-display: clamp(2rem, 1.2rem + 3vw, 3.5rem);
    }

Вибирай адаптивну поведінку відповідно до призначення тексту.

### 14.4. Перевіряй перенесення тексту

Навіть якщо розмір шрифту адаптується, заголовок може некрасиво переноситися на кілька рядків.

Перевіряй:

- довгі заголовки;
- кнопки;
- навігаційні посилання;
- картки;
- мобільні форми;
- збільшення масштабу сторінки.

Адаптивність — це не лише зменшення шрифту. Важливо, щоб текст залишався читабельним і не виходив за межі контейнера.

---

## 15. Typography Tokens і Text Styles

Окремі токени контролюють параметри, а текстовий стиль може об'єднувати їх у цілісну комбінацію.

Наприклад, стиль `body` може використовувати:

    font-family: var(--font-family-primary);
    font-size: var(--font-size-body);
    font-weight: var(--font-weight-regular);
    line-height: var(--line-height-body);

Для заголовка:

    font-family: var(--font-family-primary);
    font-size: var(--font-size-page-title);
    font-weight: var(--font-weight-bold);
    line-height: var(--line-height-heading);
    letter-spacing: var(--letter-spacing-tight);

Щоб не повторювати ці властивості, можна створити готові класи.

    .text-body {
      font-family: var(--font-family-primary);
      font-size: var(--font-size-body);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-body);
    }

    .text-page-title {
      font-family: var(--font-family-primary);
      font-size: var(--font-size-page-title);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-heading);
      letter-spacing: var(--letter-spacing-tight);
    }

Тепер ці стилі можна повторно використовувати.

**Важливо:** типографічний токен і готовий текстовий стиль — не завжди одне й те саме. Токен може зберігати лише розмір або товщину, а текстовий стиль поєднує кілька параметрів.

---

## 16. Повна система Typography Tokens

Нижче наведено приклад невеликої системи, яку можна використати в навчальному проєкті.

    :root {
      /* Font families */
      --font-family-primary: Arial, sans-serif;
      --font-family-code: monospace;

      /* Font sizes */
      --font-size-xs: 0.75rem;
      --font-size-sm: 0.875rem;
      --font-size-md: 1rem;
      --font-size-lg: 1.125rem;
      --font-size-xl: 1.25rem;
      --font-size-2xl: 1.5rem;
      --font-size-3xl: 2rem;
      --font-size-4xl: 3rem;

      /* Font weights */
      --font-weight-regular: 400;
      --font-weight-medium: 500;
      --font-weight-semibold: 600;
      --font-weight-bold: 700;

      /* Line heights */
      --line-height-tight: 1.2;
      --line-height-normal: 1.5;
      --line-height-relaxed: 1.75;

      /* Letter spacing */
      --letter-spacing-tight: -0.02em;
      --letter-spacing-normal: 0;
      --letter-spacing-wide: 0.04em;

      /* Semantic typography tokens */
      --text-page-title-size: var(--font-size-4xl);
      --text-section-title-size: var(--font-size-3xl);
      --text-card-title-size: var(--font-size-2xl);
      --text-body-size: var(--font-size-md);
      --text-caption-size: var(--font-size-sm);
    }

Приклад використання:

    body {
      font-family: var(--font-family-primary);
      font-size: var(--text-body-size);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-normal);
    }

    .page-title {
      font-size: var(--text-page-title-size);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-tight);
      letter-spacing: var(--letter-spacing-tight);
    }

    .section-title {
      font-size: var(--text-section-title-size);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-tight);
    }

    .card-title {
      font-size: var(--text-card-title-size);
      font-weight: var(--font-weight-semibold);
      line-height: var(--line-height-tight);
    }

    .caption {
      font-size: var(--text-caption-size);
      line-height: var(--line-height-normal);
    }

Ця система є навчальним прикладом. Для реального проєкту потрібно перевірити, чи відповідають вибрані розміри, товщини та інтервали конкретному шрифту й дизайну.

---

## 17. Практичний приклад: сторінка з Typography Tokens

Створимо просту сторінку, у якій використовуються типографічні токени.

### Файл styles.css

    :root {
      --font-family-primary: Arial, sans-serif;

      --font-size-sm: 0.875rem;
      --font-size-md: 1rem;
      --font-size-lg: 1.125rem;
      --font-size-xl: 1.5rem;
      --font-size-2xl: 2rem;

      --font-weight-regular: 400;
      --font-weight-semibold: 600;
      --font-weight-bold: 700;

      --line-height-heading: 1.2;
      --line-height-body: 1.6;

      --color-text-primary: #111827;
      --color-text-secondary: #4b5563;
      --color-background: #ffffff;
      --color-border: #d1d5db;
      --color-primary: #2563eb;
    }

    body {
      margin: 0;
      padding: 24px;
      font-family: var(--font-family-primary);
      font-size: var(--font-size-md);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-body);
      color: var(--color-text-primary);
      background-color: var(--color-background);
    }

    .page-title {
      font-size: var(--font-size-2xl);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-heading);
    }

    .section-title {
      font-size: var(--font-size-xl);
      font-weight: var(--font-weight-semibold);
      line-height: var(--line-height-heading);
    }

    .card {
      max-width: 480px;
      padding: 24px;
      border: 1px solid var(--color-border);
      border-radius: 12px;
    }

    .card__title {
      font-size: var(--font-size-lg);
      font-weight: var(--font-weight-semibold);
      line-height: var(--line-height-heading);
    }

    .card__description {
      font-size: var(--font-size-md);
      color: var(--color-text-secondary);
    }

    .button {
      font: inherit;
      font-weight: var(--font-weight-semibold);
      padding: 10px 16px;
      border: none;
      border-radius: 8px;
      background-color: var(--color-primary);
      color: #ffffff;
      cursor: pointer;
    }

    .caption {
      font-size: var(--font-size-sm);
      color: var(--color-text-secondary);
    }

### Файл index.html

    <!DOCTYPE html>
    <html lang="uk">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Typography Tokens</title>
        <link rel="stylesheet" href="styles.css" />
      </head>

      <body>
        <main>
          <h1 class="page-title">Моя навчальна сторінка</h1>

          <section>
            <h2 class="section-title">Останні матеріали</h2>

            <article class="card">
              <h3 class="card__title">Основи CSS</h3>

              <p class="card__description">
                Вивчаємо типографіку, кольори та компонування
                інтерфейсу.
              </p>

              <button class="button" type="button">
                Читати далі
              </button>

              <p class="caption">
                Оновлено сьогодні
              </p>
            </article>
          </section>
        </main>
      </body>
    </html>

### Що потрібно перевірити?

1. Основний текст використовує узгоджений розмір.
2. Заголовки мають виразну візуальну ієрархію.
3. Повторювані елементи використовують спільні токени.
4. Зміна токена впливає на всі елементи, які його використовують.
5. Міжрядковий інтервал підходить для читання.
6. Текст не обрізається на вузьких екранах.
7. Типографіка залишається читабельною за збільшення масштабу сторінки.

---

## 18. Типові помилки

### Помилка 1. Довільні розміри для кожного елемента

    .title-a {
      font-size: 31px;
    }

    .title-b {
      font-size: 33px;
    }

    .title-c {
      font-size: 30px;
    }

Проблема: без дизайнерського обґрунтування це створює непослідовну типографіку.

Рішення: використовуй узгоджену шкалу розмірів.

### Помилка 2. Занадто багато товщин шрифту

Проблема: інтерфейс стає візуально перевантаженим, а ієрархія — менш зрозумілою.

Рішення: починай із двох-трьох потрібних товщин і розширюй набір за потреби.

### Помилка 3. Використання лише назв за розміром

    .card-title {
      font-size: var(--font-size-24);
    }

Це працює, але не пояснює, чому картка використовує саме цей розмір.

Рішення: у більших системах можна використовувати семантичний токен.

    .card-title {
      font-size: var(--text-card-title-size);
    }

### Помилка 4. Невідповідний line-height

Проблема: рядки можуть бути надто щільними або надмірно віддаленими.

Рішення: перевіряй міжрядковий інтервал на реальному тексті, особливо в довгих абзацах.

### Помилка 5. Жорстка висота текстового контейнера

    .card__description {
      height: 48px;
      overflow: hidden;
    }

Проблема: довший текст або збільшений розмір шрифту може обрізатися.

Рішення: не обмежуй висоту тексту без конкретної потреби. Дозволяй контейнеру адаптуватися до вмісту.

### Помилка 6. Надмірно дрібний текст

Проблема: дрібні підписи та допоміжна інформація можуть бути важкими для читання.

Рішення: перевіряй розміри на реальних пристроях і не зменшуй текст лише заради вміщення більшої кількості інформації.

### Помилка 7. Неврахування масштабування

Проблема: жорсткі розміри й висоти можуть погано працювати, коли користувач збільшує текст.

Рішення: використовуй `rem` для масштабованих розмірів, перевіряй перенесення тексту та не блокуй його збільшення без потреби.

### Помилка 8. Плутанина між HTML-семантикою і візуальним розміром

Проблема: рівень заголовка обирають лише за тим, як великим він має виглядати.

Рішення: HTML-заголовки визначай за структурою документа, а розмір оформлюй через CSS.

### Помилка 9. Використання токенів без системи найменування

    --text-a: 16px;
    --text-b: 24px;
    --text-c: 32px;

Проблема: назви не пояснюють значення токенів.

Рішення: використовуй зрозумілі й послідовні імена, наприклад `--font-size-body` або `--text-page-title-size`.

---

## 19. Практичний алгоритм створення Typography Tokens

### Крок 1. Вибери сімейство шрифтів

Визнач, який шрифт використовуватиметься для основного тексту, заголовків і коду.

### Крок 2. Створи шкалу розмірів

Почни з невеликого набору значень для основного тексту, підписів і заголовків.

### Крок 3. Визнач потрібні товщини

Вибери значення, які реально підтримуються шрифтом.

### Крок 4. Визнач міжрядкові інтервали

Окремо перевір заголовки, короткі підписи й довгі абзаци.

### Крок 5. Додай семантичні токени

Наприклад:

    --text-page-title-size
    --text-section-title-size
    --text-card-title-size
    --text-body-size
    --text-caption-size

### Крок 6. Використовуй токени в компонентах

Заміни повторювані довільні значення на спільні токени.

### Крок 7. Перевір адаптивність

Перевір заголовки, абзаци, кнопки та картки на вузьких і широких екранах.

### Крок 8. Перевір доступність

Переконайся, що текст можна збільшити, він не обрізається, а міжрядкові інтервали не погіршують читання.

### Крок 9. Документуй систему

Поясни, який токен використовувати для кожного типу тексту та коли можна відступати від загальних правил.

---

## 20. Що потрібно знати Junior Frontend Developer?

На початковому рівні потрібно розуміти:

✔ Що таке Typography Tokens.

✔ Навіщо потрібна типографічна шкала.

✔ Чим Primitive Tokens відрізняються від Semantic Tokens.

✔ Як створити CSS Custom Properties.

✔ Як використовувати `var()`.

✔ Для чого потрібні `font-family`, `font-size`, `font-weight`, `line-height` і `letter-spacing`.

✔ Як організувати базову шкалу розмірів.

✔ Як створити семантичні токени для заголовків, основного тексту та підписів.

✔ Чому варто використовувати `rem` для масштабованої типографіки.

✔ Як працює адаптивна типографіка.

✔ Для чого використовується `clamp()`.

✔ Чому не можна плутати семантичний рівень HTML-заголовка з його візуальним розміром.

✔ Як перевірити читабельність на різних екранах.

✔ Чому потрібно уникати обрізання тексту.

Не потрібно одразу створювати складну типографічну систему. Почни з невеликої шкали, зрозумілих назв і кількох повторно використовуваних стилів.

---

## 21. Питання для самоперевірки

1. Що таке Typography Tokens?
2. Яку проблему вони розв'язують?
3. Що таке Typography Scale?
4. Чим Primitive Tokens відрізняються від Semantic Tokens?
5. Для чого потрібен `font-family`?
6. Що визначає `font-size`?
7. Що визначає `font-weight`?
8. Для чого використовується `line-height`?
9. Що змінює `letter-spacing`?
10. Чому не варто використовувати випадкові розміри для кожного заголовка?
11. Чим токен `--font-size-16` відрізняється від `--text-body-size`?
12. Чому `rem` часто використовують для типографіки?
13. Як працює `clamp()`?
14. Коли варто застосовувати медіазапити для типографічних токенів?
15. Чому не слід задавати фіксовану висоту довгому текстовому блоку без потреби?
16. Чим HTML-заголовок відрізняється від візуального стилю заголовка?
17. Як типографічні токени допомагають підтримувати дизайн-систему?
18. Як перевірити, чи добре типографіка працює на мобільному екрані?

Якщо можеш відповісти на ці запитання та самостійно побудувати невелику систему токенів у CSS, ти засвоїв основу теми.

---

## 22. Коротка шпаргалка

### Основні поняття

    Typography Tokens
    Іменовані змінні для параметрів тексту.

    Typography Scale
    Узгоджений набір розмірів шрифту.

    Primitive Tokens
    Токени конкретних типографічних значень.

    Semantic Tokens
    Токени, які описують призначення тексту.

    Text Style
    Поєднання кількох типографічних параметрів.

### Основні властивості CSS

    font-family
    Визначає сімейство шрифтів.

    font-size
    Визначає розмір тексту.

    font-weight
    Визначає товщину шрифту.

    line-height
    Визначає міжрядковий інтервал.

    letter-spacing
    Визначає відстань між літерами.

### Приклад токенів

    :root {
      --font-family-primary: Arial, sans-serif;

      --font-size-sm: 0.875rem;
      --font-size-md: 1rem;
      --font-size-xl: 1.5rem;
      --font-size-2xl: 2rem;

      --font-weight-regular: 400;
      --font-weight-semibold: 600;
      --font-weight-bold: 700;

      --line-height-heading: 1.2;
      --line-height-body: 1.5;

      --text-page-title-size: var(--font-size-2xl);
      --text-body-size: var(--font-size-md);
    }

### Використання

    body {
      font-family: var(--font-family-primary);
      font-size: var(--text-body-size);
      font-weight: var(--font-weight-regular);
      line-height: var(--line-height-body);
    }

    .page-title {
      font-size: var(--text-page-title-size);
      font-weight: var(--font-weight-bold);
      line-height: var(--line-height-heading);
    }

### Три головні правила

1. **Typography Tokens роблять типографіку послідовною та керованою.**
2. **Primitive Tokens зберігають значення, а Semantic Tokens пояснюють їхню роль.**
3. **Типографіка повинна залишатися читабельною, адаптивною та доступною.**

---

## 23. Як ця тема пов'язана з іншими темами UI Design?

Typography Tokens — частина дизайн-системи, яка пов'язує візуальні правила з кодом.

    Typography Basics
        ↓
    Typography Scale
        ↓
    Typography Tokens
        ↓
    Text Styles
        ↓
    Components
        ↓
    Design System

Зв'язок із попередніми темами:

- **Typography Basics** — пояснює властивості шрифтів, ієрархію та читабельність.
- **Fluid Typography** — допомагає адаптувати розміри тексту до ширини екрана.
- **Color Tokens** — визначають кольори тексту та фону.
- **Spacing Scale** — допомагає узгодити відступи навколо текстових блоків.
- **Components** — використовують готові типографічні стилі.
- **Component States** — визначають оформлення тексту в різних станах компонентів.
- **Responsive Design** — забезпечує зручне відображення тексту на різних екранах.
- **CSS Custom Properties** — дозволяють реалізувати токени безпосередньо в коді.

---

## 24. Підсумок

**Typography Tokens — це система іменованих параметрів тексту, яка допомагає створювати послідовну, читабельну й масштабовану типографіку.**

Найважливіше запам'ятати:

- Типографічні токени зберігають значення шрифтів і параметрів тексту.
- Typography Scale задає узгоджені розміри.
- Primitive Tokens зберігають конкретні значення.
- Semantic Tokens визначають роль тексту в інтерфейсі.
- CSS Custom Properties дають змогу повторно використовувати токени.
- `font-family`, `font-size`, `font-weight`, `line-height` і `letter-spacing` відповідають за різні аспекти типографіки.
- `rem` і `clamp()` допомагають створювати масштабовані та адаптивні рішення.
- Типографічна система має враховувати читабельність, структуру документа й доступність.

**Практична мета:** навчитися створювати невелику типографічну систему, у якій можна централізовано змінювати шрифти, розміри та інтервали, не переписуючи стилі кожного компонента.