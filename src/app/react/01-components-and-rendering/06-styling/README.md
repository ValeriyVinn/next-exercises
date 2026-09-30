# 06 — Styling

## Зміст

1. [Що таке styling у React](#що-таке-styling-у-react)
2. [Основні способи стилізації React](#основні-способи-стилізації-react)
3. [Звичайний CSS](#звичайний-css)
4. [className](#classname)
5. [CSS Modules](#css-modules)
6. [Чому CSS Modules зручні в React](#чому-css-modules-зручні-в-react)
7. [Динамічні className](#динамічні-classname)
8. [Кілька класів](#кілька-класів)
9. [Умовні класи](#умовні-класи)
10. [Inline styles](#inline-styles)
11. [style як JavaScript-об'єкт](#style-як-javascript-обєкт)
12. [Динамічні inline styles](#динамічні-inline-styles)
13. [CSS-змінні](#css-змінні)
14. [Стилізація через props](#стилізація-через-props)
15. [Styled Components та CSS-in-JS](#styled-components-та-css-in-js)
16. [Tailwind CSS](#tailwind-css)
17. [Порівняння підходів](#порівняння-підходів)
18. [Styling компонентів](#styling-компонентів)
19. [Responsive design](#responsive-design)
20. [Стани елементів](#стани-елементів)
21. [Типові помилки](#типові-помилки)
22. [Практичний приклад](#практичний-приклад)
23. [Питання на співбесіді](#питання-на-співбесіді)
24. [Практичні вправи](#практичні-вправи)
25. [Що потрібно вміти](#що-потрібно-вміти)
26. [Mini Cheat Sheet](#mini-cheat-sheet)
27. [Головне](#головне)


---

# Що таке styling у React

React відповідає насамперед за побудову UI, але сам React не має окремої власної CSS-системи.

Для стилізації React-компонентів можна використовувати звичайні CSS-технології:

- CSS;
- CSS Modules;
- inline styles;
- CSS variables;
- CSS-in-JS;
- Tailwind CSS;
- інші CSS-бібліотеки та UI frameworks.

Наприклад, компонент:

    function Button() {
      return (
        <button className={styles.button}>
          Save
        </button>
      );
    }

може використовувати звичайний CSS або CSS Modules.

Основна модель:

    React component
        ↓
    JSX
        ↓
    className / style
        ↓
    CSS
        ↓
    UI


---

# Основні способи стилізації React

Найпоширеніші підходи:

| Підхід | Приклад |
|---|---|
| Global CSS | `className="button"` |
| CSS Modules | `className={styles.button}` |
| Inline styles | `style={{ color: "red" }}` |
| CSS Variables | `var(--primary-color)` |
| CSS-in-JS | `styled.button` |
| Utility CSS | `className="px-4 py-2"` |

У сучасних React/Next.js-проєктах особливо часто можна зустріти:

- CSS Modules;
- Tailwind CSS;
- звичайний CSS;
- CSS-in-JS у певних проєктах.


---

# Звичайний CSS

Найпростіший варіант — звичайний CSS-файл.

Наприклад:

    Button.jsx
    Button.css

CSS:

    .button {
      background: blue;
      color: white;
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
    }

Компонент:

    import "./Button.css";

    function Button() {
      return (
        <button className="button">
          Save
        </button>
      );
    }

Тут:

    className="button"

відповідає:

    .button {
      ...
    }


---

# className

У JSX для CSS-класу використовується:

    className

а не:

    class

Наприклад:

    <div className="container">
      <h1 className="title">
        Hello
      </h1>
    </div>

У HTML:

    <div class="container">

У JSX:

    <div className="container">

Причина полягає в тому, що JSX використовує JavaScript-подібний синтаксис і `class` має особливе значення в JavaScript.


---

# className як expression

`className` може отримувати значення JavaScript:

    const className = "button";

    return (
      <button className={className}>
        Save
      </button>
    );

Або:

    <button className={styles.button}>
      Save
    </button>

Тобто:

    className="button"

означає literal string,

а:

    className={styles.button}

означає JavaScript expression.


---

# CSS Modules

CSS Modules — дуже зручний спосіб стилізації React-компонентів.

Файл:

    Button.module.css

CSS:

    .button {
      background: blue;
      color: white;
      padding: 10px 20px;
      border-radius: 6px;
    }

React:

    import styles from "./Button.module.css";

    function Button() {
      return (
        <button className={styles.button}>
          Save
        </button>
      );
    }

Головна відмінність:

    className="button"

проти:

    className={styles.button}


---

# Як працює CSS Modules

У CSS Module пишемо:

    .button {
      color: red;
    }

А в компоненті:

    className={styles.button}

Зовні клас не залишається просто:

    button

Build system створює локально scoped class name.

Умовно:

    button → Button_button__abc123

Тобто стилі компонента не повинні випадково конфліктувати з `.button` з іншого компонента.


---

# Чому CSS Modules зручні в React

CSS Modules добре підходять для component-based architecture.

Наприклад:

    components/
    ├── Button/
    │   ├── Button.tsx
    │   └── Button.module.css
    │
    ├── Card/
    │   ├── Card.tsx
    │   └── Card.module.css
    │
    └── Header/
        ├── Header.tsx
        └── Header.module.css

Кожен компонент має власні стилі.

Наприклад:

    Button.module.css

    .button {
      ...
    }

і:

    Card.module.css

    .button {
      ...
    }

можуть існувати незалежно один від одного.

Це особливо зручно у великих проєктах.


---

# CSS Modules у Next.js

У Next.js типовий варіант:

    Button.tsx
    Button.module.css

Компонент:

    import styles from "./Button.module.css";

    export default function Button() {
      return (
        <button className={styles.button}>
          Save
        </button>
      );
    }

CSS:

    .button {
      padding: 10px 20px;
      border-radius: 6px;
    }

Для твого `next-exercises` це природний і дуже практичний підхід.


---

# Кілька класів

Іноді одному елементу потрібно кілька класів.

Наприклад:

    <button
      className={`${styles.button} ${styles.primary}`}
    >
      Save
    </button>

Тут:

    styles.button

і:

    styles.primary

об'єднуються в один `className`.


---

# Умовні className

Дуже поширена задача:

    const isActive = true;

    return (
      <button
        className={
          isActive
            ? styles.active
            : styles.inactive
        }
      >
        Profile
      </button>
    );

Можна використовувати ternary:

    className={isActive ? styles.active : styles.inactive}


---

# Умовний додатковий клас

Наприклад, базовий клас завжди присутній, а другий залежить від стану:

    <button
      className={`${styles.button} ${
        isActive ? styles.active : ""
      }`}
    >
      Profile
    </button>

Результат концептуально:

    button active

або:

    button


---

# Кілька умов

Можна:

    className={`
      ${styles.button}
      ${isActive ? styles.active : ""}
      ${isDisabled ? styles.disabled : ""}
    `}

Але при великій кількості умов такий код стає важким для читання.

Тоді часто використовують utility:

    clsx

або:

    classnames

Наприклад з `clsx`:

    import clsx from "clsx";

    <button
      className={clsx(
        styles.button,
        isActive && styles.active,
        isDisabled && styles.disabled
      )}
    >
      Save
    </button>

Це вже додаткова бібліотека, а не можливість самого React.


---

# Inline styles

React дозволяє задавати стилі безпосередньо через `style`.

Наприклад:

    function Message() {
      return (
        <p
          style={{
            color: "red",
            fontSize: "20px",
          }}
        >
          Error
        </p>
      );
    }

Тут `style` отримує JavaScript-об'єкт.


---

# style як JavaScript-об'єкт

У звичайному CSS:

    .message {
      color: red;
      font-size: 20px;
      margin-top: 10px;
    }

В inline style:

    style={{
      color: "red",
      fontSize: "20px",
      marginTop: "10px",
    }}

CSS:

    font-size

JavaScript object:

    fontSize

CSS:

    margin-top

JavaScript:

    marginTop


---

# Чому style={{ ... }} має дві фігурні дужки

Наприклад:

    style={{ color: "red" }}

Перша `{}` означає:

    JavaScript expression

Друга `{}` означає:

    object literal

Тобто концептуально:

    style={
      {
        color: "red"
      }
    }

Це одна з важливих JSX-конструкцій.


---

# Числові значення в style

Для деяких CSS-властивостей можна використовувати число.

Наприклад:

    <div
      style={{
        fontSize: 20,
      }}
    >
      Hello
    </div>

React інтерпретує це як:

    20px

Але не всі CSS-властивості працюють так само.

Для значень, де одиниця вимірювання важлива або потрібен конкретний формат, можна використовувати string:

    style={{
      width: "50%",
      marginTop: "2rem",
    }}


---

# Динамічні inline styles

Inline styles можуть залежати від JavaScript-даних.

Наприклад:

    function Status({ isOnline }) {
      return (
        <span
          style={{
            color: isOnline ? "green" : "gray",
          }}
        >
          {isOnline ? "Online" : "Offline"}
        </span>
      );
    }

Або:

    function Progress({ value }) {
      return (
        <div
          style={{
            width: `${value}%`,
          }}
        />
      );
    }


---

# Коли inline styles доречні

Inline styles зручні для:

- динамічних значень;
- значень, які приходять з props;
- координат;
- розмірів;
- CSS variables;
- простих локальних стилів.

Наприклад:

    style={{
      width: `${progress}%`,
    }}

Але для великих наборів статичних стилів CSS Modules часто читабельніші.


---

# CSS Modules vs inline styles

CSS Modules:

    <button className={styles.button}>
      Save
    </button>

CSS:

    .button {
      padding: 10px 20px;
      border-radius: 6px;
    }

Inline:

    <button
      style={{
        padding: "10px 20px",
        borderRadius: 6,
      }}
    >
      Save
    </button>

Загальний принцип:

    статичні стилі → CSS

    динамічні значення → часто style / CSS variables


---

# CSS-змінні

CSS custom properties дозволяють створювати змінні:

    :root {
      --primary-color: #2563eb;
      --text-color: #222;
      --spacing: 16px;
    }

Використання:

    .button {
      background: var(--primary-color);
      color: white;
      padding: var(--spacing);
    }

Це вже звичайний CSS, але React може динамічно змінювати CSS variables.


---

# CSS variables через React

Наприклад:

    function Progress({ value }) {
      return (
        <div
          className={styles.progress}
          style={{
            "--progress": `${value}%`,
          }}
        />
      );
    }

CSS:

    .progress {
      width: var(--progress);
      height: 10px;
    }

У TypeScript для нестандартних CSS properties іноді потрібно повідомити TypeScript про тип:

    style={
      {
        "--progress": `${value}%`,
      } as React.CSSProperties
    }

Такий підхід особливо корисний для динамічних значень, коли сама структура стилів залишається в CSS.


---

# Стилізація через props

Компонент може змінювати свій вигляд залежно від props.

Наприклад:

    type ButtonProps = {
      variant: "primary" | "secondary";
      children: React.ReactNode;
    };

    function Button({
      variant,
      children,
    }: ButtonProps) {
      return (
        <button
          className={
            variant === "primary"
              ? styles.primary
              : styles.secondary
          }
        >
          {children}
        </button>
      );
    }

Використання:

    <Button variant="primary">
      Save
    </Button>

    <Button variant="secondary">
      Cancel
    </Button>

Тут props визначає presentation компонента.


---

# Variant pattern

Для компонентів UI часто створюють набір варіантів:

    type ButtonProps = {
      variant: "primary" | "secondary" | "danger";
    };

Наприклад:

    const buttonClass = {
      primary: styles.primary,
      secondary: styles.secondary,
      danger: styles.danger,
    };

    function Button({
      variant,
      children,
    }: ButtonProps) {
      return (
        <button className={buttonClass[variant]}>
          {children}
        </button>
      );
    }

Це називається pattern з variants.

Він дуже поширений у component libraries.


---

# CSS pseudo-classes

Звичайний CSS чудово працює разом з React.

Наприклад:

    .button {
      background: blue;
    }

    .button:hover {
      background: darkblue;
    }

    .button:focus {
      outline: 2px solid black;
    }

    .button:disabled {
      opacity: 0.5;
    }

Не потрібно реалізовувати `hover` через React state, якщо для цього достатньо CSS.


---

# CSS pseudo-elements

Так само можна використовувати:

    ::before

    ::after

Наприклад:

    .title::after {
      content: "";
      display: block;
      width: 50px;
      height: 2px;
    }

React не замінює CSS.

React відповідає за UI-структуру та поведінку, а CSS може відповідати за presentation.


---

# Responsive design

Responsive design у React зазвичай реалізується звичайними CSS media queries.

Наприклад:

    .container {
      width: 100%;
    }

    @media (min-width: 768px) {
      .container {
        width: 750px;
      }
    }

React-компонент при цьому може залишатися незмінним:

    function Container({ children }) {
      return (
        <div className={styles.container}>
          {children}
        </div>
      );
    }

Не потрібно використовувати JavaScript для кожної responsive-задачі.


---

# Стани елементів

CSS добре підходить для візуальних станів:

    :hover
    :focus
    :active
    :disabled
    :checked
    :focus-visible

Наприклад:

    .button {
      background: blue;
    }

    .button:hover {
      opacity: 0.9;
    }

    .button:disabled {
      opacity: 0.5;
      cursor: not-allowed;
    }

А React відповідає за логічний стан:

    const [isDisabled, setIsDisabled] = useState(false);

Після цього:

    <button disabled={isDisabled}>
      Save
    </button>

React state → DOM state → CSS реагує на стан.


---

# Styling компонента

Хороша component architecture часто виглядає так:

    components/
    └── Button/
        ├── Button.tsx
        └── Button.module.css

`Button.tsx`:

    import styles from "./Button.module.css";

    type ButtonProps = {
      children: React.ReactNode;
    };

    export function Button({
      children,
    }: ButtonProps) {
      return (
        <button className={styles.button}>
          {children}
        </button>
      );
    }

`Button.module.css`:

    .button {
      padding: 10px 20px;
      border: none;
      border-radius: 6px;
    }

Це простий і масштабований підхід.


---

# Global styles

Не всі стилі потрібно робити локальними.

Глобальні стилі можуть містити:

- reset;
- базовий font;
- `body`;
- загальні CSS variables;
- typography;
- global defaults.

Наприклад:

    :root {
      --font-size-base: 16px;
      --text-color: #222;
    }

    body {
      margin: 0;
      font-family: Arial, sans-serif;
      color: var(--text-color);
    }

Компоненти можуть використовувати CSS Modules поверх глобальних базових стилів.


---

# CSS Reset

Браузери мають власні default styles.

Тому проєкт може мати глобальний reset:

    * {
      box-sizing: border-box;
    }

    body {
      margin: 0;
    }

Це не специфічно для React.

Це звичайна CSS-практика.


---

# Styled Components та CSS-in-JS

CSS-in-JS — підхід, коли CSS пов'язується з JavaScript/React-компонентами через бібліотеку.

Наприклад, концептуально:

    const Button = styled.button`
      padding: 10px 20px;
      border-radius: 6px;
    `;

Тоді:

    <Button>
      Save
    </Button>

Приклади CSS-in-JS бібліотек:

- styled-components;
- Emotion.

CSS-in-JS — окремий архітектурний підхід, а не функція самого React.


---

# Tailwind CSS

Tailwind CSS використовує utility classes.

Наприклад:

    <button
      className="px-4 py-2 rounded bg-blue-600 text-white"
    >
      Save
    </button>

Замість:

    <button className={styles.button}>
      Save
    </button>

і:

    .button {
      padding: 8px 16px;
      border-radius: 6px;
      background: blue;
      color: white;
    }

Tailwind переносить значну частину стилізації безпосередньо в `className`.

Це окремий підхід до CSS architecture.


---

# Порівняння підходів

| Підхід | Переваги | Недоліки |
|---|---|---|
| Global CSS | простий, стандартний CSS | можливі конфлікти |
| CSS Modules | локальність, зрозуміла структура | більше CSS-файлів |
| Inline styles | простий dynamic styling | обмежені можливості CSS |
| CSS-in-JS | тісна інтеграція з компонентами | додаткова абстракція |
| Tailwind | швидкий utility styling | багато класів у JSX |

Немає універсально правильного підходу.

Вибір залежить від:

- проєкту;
- команди;
- existing codebase;
- UI architecture;
- вимог до дизайну;
- інструментів build system.


---

# Що важливо для твого стеку

Для твого навчального React/Next.js-проєкту корисно добре знати:

    CSS
      ↓
    CSS Modules
      ↓
    className
      ↓
    conditional className
      ↓
    inline styles
      ↓
    CSS variables

А вже після цього окремо вивчати:

    Tailwind CSS

та:

    CSS-in-JS


---

# CSS Modules: вкладені селектори

CSS Modules не скасовують можливості звичайного CSS.

Наприклад:

    .card {
      padding: 20px;
    }

    .title {
      font-size: 24px;
    }

    .card:hover {
      transform: translateY(-2px);
    }

У React:

    <article className={styles.card}>
      <h2 className={styles.title}>
        Article
      </h2>
    </article>

Можна використовувати:

- pseudo-classes;
- media queries;
- combinators;
- pseudo-elements;
- animations;
- transitions.


---

# CSS animations

React-компонент може використовувати звичайний CSS animation.

    .spinner {
      animation: spin 1s linear infinite;
    }

    @keyframes spin {
      from {
        transform: rotate(0deg);
      }

      to {
        transform: rotate(360deg);
      }
    }

React:

    <div className={styles.spinner}>
      Loading...
    </div>

React не потрібно керувати кожним animation frame.


---

# CSS transitions

Наприклад:

    .button {
      transition:
        background-color 200ms ease,
        transform 200ms ease;
    }

    .button:hover {
      transform: translateY(-2px);
    }

Це краще, ніж намагатися реалізувати просту анімацію через React state.


---

# Коли використовувати React state для styling

React state потрібен тоді, коли візуальний стан залежить від application state.

Наприклад:

    const [isOpen, setIsOpen] = useState(false);

    return (
      <div
        className={
          isOpen
            ? styles.open
            : styles.closed
        }
      >
        ...
      </div>
    );

Але якщо потрібно лише:

    hover

не потрібно створювати:

    const [isHovered, setIsHovered] = useState(false);

Для цього є CSS:

    .button:hover {
      ...
    }


---

# Типові помилки

## 1. Використання class замість className

Погано:

    <div class="container">

Правильно:

    <div className="container">


---

## 2. Неправильний синтаксис style

Погано:

    <div style="color: red">

Правильно:

    <div style={{ color: "red" }}>


---

## 3. CSS property написана як у CSS

Погано:

    style={{
      font-size: "20px",
    }}

Правильно:

    style={{
      fontSize: "20px",
    }}


---

## 4. Надмірне використання inline styles

Не варто переносити весь CSS у JSX:

    <div
      style={{
        padding: "20px",
        margin: "10px",
        border: "1px solid gray",
        background: "white",
        borderRadius: "8px",
      }}
    >

Для великих статичних стилів краще CSS або CSS Modules.


---

## 5. Використання JavaScript замість CSS

Не потрібно робити React state тільки для:

    hover

    focus

    active

    disabled styling

якщо це можна вирішити CSS.


---

## 6. Надмірна кількість умовних класів

Наприклад:

    className={`
      ${styles.button}
      ${isActive ? styles.active : ""}
      ${isDisabled ? styles.disabled : ""}
      ${isLarge ? styles.large : ""}
      ${isRounded ? styles.rounded : ""}
    `}

Коли таких умов стає багато, краще винести логіку або використовувати `clsx`.


---

## 7. Змішування багатьох CSS-підходів без системи

Наприклад, один компонент використовує:

    Global CSS

інший:

    CSS Modules

третій:

    inline styles

четвертий:

    Tailwind

п'ятий:

    CSS-in-JS

Це не обов'язково помилка, але без чіткої архітектури проєкт стає складнішим для підтримки.

Важливо мати зрозуміле правило:

    який підхід
    для яких задач
    де використовується


---

# Практичний приклад

Створимо простий `Card`.

Структура:

    Card/
    ├── Card.tsx
    └── Card.module.css

`Card.tsx`:

    import styles from "./Card.module.css";

    type CardProps = {
      title: string;
      description: string;
      featured?: boolean;
    };

    export function Card({
      title,
      description,
      featured = false,
    }: CardProps) {
      return (
        <article
          className={`${styles.card} ${
            featured ? styles.featured : ""
          }`}
        >
          <h2 className={styles.title}>
            {title}
          </h2>

          <p className={styles.description}>
            {description}
          </p>
        </article>
      );
    }

`Card.module.css`:

    .card {
      padding: 20px;
      border: 1px solid #ddd;
      border-radius: 8px;
      background: white;
    }

    .title {
      margin: 0 0 10px;
      font-size: 24px;
    }

    .description {
      margin: 0;
      color: #666;
    }

    .featured {
      border-width: 2px;
    }

Використання:

    <Card
      title="React"
      description="Learn component-based UI development."
    />

    <Card
      title="Next.js"
      description="Build full-stack React applications."
      featured
    />


---

# Практичний приклад: Button variants

Тип:

    type ButtonProps = {
      variant: "primary" | "secondary" | "danger";
      children: React.ReactNode;
    };

Компонент:

    function Button({
      variant,
      children,
    }: ButtonProps) {
      return (
        <button
          className={`
            ${styles.button}
            ${styles[variant]}
          `}
        >
          {children}
        </button>
      );
    }

CSS:

    .button {
      padding: 10px 20px;
      border-radius: 6px;
      border: none;
      cursor: pointer;
    }

    .primary {
      background: blue;
      color: white;
    }

    .secondary {
      background: gray;
      color: white;
    }

    .danger {
      background: red;
      color: white;
    }

Тепер API компонента:

    <Button variant="primary">
      Save
    </Button>

    <Button variant="secondary">
      Cancel
    </Button>

    <Button variant="danger">
      Delete
    </Button>

Це хороший приклад того, як presentation можна контролювати через props.


---

# Практичний приклад: dynamic progress

CSS:

    .progress {
      height: 10px;
      background: #ddd;
    }

    .bar {
      height: 100%;
      width: var(--progress);
      background: blue;
    }

React:

    function Progress({ value }: { value: number }) {
      return (
        <div className={styles.progress}>
          <div
            className={styles.bar}
            style={
              {
                "--progress": `${value}%`,
              } as React.CSSProperties
            }
          />
        </div>
      );
    }

Тут:

    CSS

відповідає за presentation,

а:

    React

передає динамічне значення.


---

# Styling і accessibility

Styling не повинен замінювати семантичний HTML.

Погано:

    <div
      className={styles.button}
      onClick={handleClick}
    >
      Save
    </div>

Краще:

    <button
      className={styles.button}
      onClick={handleClick}
    >
      Save
    </button>

CSS може зробити `<div>` візуально схожим на кнопку, але це не перетворює його на справжню кнопку з точки зору HTML semantics та accessibility.

Спочатку:

    правильний HTML

потім:

    CSS


---

# Styling і component architecture

Хороший React-компонент не повинен містити величезну кількість стилізації без структури.

Наприклад, замість одного компонента:

    HugeComponent.tsx
    HugeComponent.css

можна розділити UI:

    Header/
    Button/
    Card/
    Input/
    Modal/

Кожен компонент:

    Component.tsx
    Component.module.css

Це дозволяє поступово будувати UI з маленьких reusable components.


---

# Практичний алгоритм стилізації компонента

Коли створюєш новий компонент:

## Крок 1 — HTML structure

Спочатку визнач:

    semantic HTML

Наприклад:

    <article>
      <h2>...</h2>
      <p>...</p>
    </article>


## Крок 2 — CSS class

Додай:

    className={styles.card}


## Крок 3 — CSS Module

Створи:

    Card.module.css


## Крок 4 — базові стилі

Додай:

    layout
    spacing
    typography
    colors


## Крок 5 — states

Додай:

    :hover
    :focus
    :disabled


## Крок 6 — responsive

Додай:

    @media


## Крок 7 — dynamic values

Якщо значення залежить від даних:

    props
    state
    CSS variables
    inline style


Модель:

    HTML
      ↓
    CSS
      ↓
    Component API
      ↓
    Dynamic styling


---

# Питання на співбесіді

## 1. Чим class відрізняється від className?

У JSX використовується `className`.

    <div className="card">

`class` — атрибут HTML, а `className` — JSX/React-синтаксис.


---

## 2. Як працює CSS Modules?

CSS Modules локалізують CSS-класи для конкретного модуля.

    import styles from "./Card.module.css";

    <div className={styles.card}>
      ...
    </div>

Імена класів обробляються build system так, щоб зменшити ризик глобальних конфліктів.


---

## 3. Чим CSS Modules відрізняються від Global CSS?

Global CSS:

    className="button"

клас доступний глобально.

CSS Modules:

    className={styles.button}

клас локалізований у відповідному CSS Module.


---

## 4. Як передати inline style у React?

Через JavaScript object:

    <div
      style={{
        color: "red",
        fontSize: 20,
      }}
    />


---

## 5. Чому style={{ ... }} має дві `{}`?

Перша `{}` — JSX expression.

Друга `{}` — JavaScript object literal.


---

## 6. Коли використовувати CSS, а коли inline style?

Загальне правило:

    статична presentation
        → CSS / CSS Modules

    динамічне значення
        → style / CSS variables / classes


---

## 7. Чи є Tailwind частиною React?

Ні.

Tailwind CSS — окрема CSS utility framework, яка може використовуватися разом з React.


---

## 8. Чи є CSS Modules частиною React?

Не самого React.

Це механізм, який підтримується tooling/build system конкретного проєкту.


---

## 9. Чи потрібно використовувати state для hover?

Зазвичай ні.

Для hover існує CSS:

    .button:hover {
      ...
    }

React state потрібен, якщо hover-стан впливає на application logic або складну поведінку.


---

## 10. Що краще: CSS Modules чи Tailwind?

Це не питання з універсальною правильною відповіддю.

Це різні підходи до організації стилів.

CSS Modules:

    component
      +
    local CSS

Tailwind:

    component
      +
    utility classes

Вибір залежить від architecture та conventions конкретного проєкту.


---

# Практичні вправи

## Вправа 1 — Button

Створи компонент:

    Button

з:

    Button.module.css

Додай:

- padding;
- border-radius;
- background;
- hover;
- disabled state.


---

## Вправа 2 — Card

Створи:

    Card.tsx
    Card.module.css

Card повинен мати:

- title;
- description;
- image;
- button.


---

## Вправа 3 — variants

Створи:

    primary
    secondary
    danger

і передавай варіант через:

    variant


---

## Вправа 4 — conditional class

Створи компонент:

    StatusBadge

Він отримує:

    status: "success" | "warning" | "error"

і застосовує відповідний CSS class.


---

## Вправа 5 — dynamic progress

Створи:

    ProgressBar

з prop:

    value: number

Наприклад:

    <ProgressBar value={75} />

Ширина progress bar повинна бути:

    75%


---

## Вправа 6 — responsive layout

Створи:

    ProductGrid

На desktop:

    3 columns

На tablet:

    2 columns

На mobile:

    1 column

Використовуй CSS media queries.


---

## Вправа 7 — CSS variables

Створи:

    ThemeCard

який отримує:

    color

і передає його в CSS variable.


---

# Що потрібно вміти

## Core

Потрібно знати:

- `className`;
- CSS;
- CSS Modules;
- `style`;
- CSS object syntax;
- camelCase CSS properties;
- pseudo-classes;
- media queries.


## Junior

Потрібно вміти:

- створювати CSS Modules;
- стилізувати React-компоненти;
- використовувати conditional classes;
- працювати з props та variants;
- використовувати responsive CSS;
- використовувати CSS variables;
- комбінувати React state і CSS.


## Middle

Потрібно розуміти:

- component styling architecture;
- локальні та глобальні стилі;
- CSS Modules;
- utility CSS;
- CSS-in-JS;
- design tokens;
- variants;
- responsive architecture;
- accessibility та styling;
- maintainability CSS.


## Senior

Потрібно розуміти:

- design systems;
- component libraries;
- theming;
- CSS architecture;
- design tokens;
- performance;
- CSS rendering;
- SSR/CSR implications;
- scalable styling architecture;
- trade-offs між CSS Modules, Tailwind, CSS-in-JS та іншими підходами.


---

# Mini Cheat Sheet

## CSS class

    <div className="card">
      ...
    </div>


## CSS Module

    import styles from "./Card.module.css";

    <div className={styles.card}>
      ...
    </div>


## Multiple classes

    <div
      className={`${styles.card} ${styles.active}`}
    >
      ...
    </div>


## Conditional class

    <div
      className={
        isActive
          ? styles.active
          : styles.inactive
      }
    >
      ...
    </div>


## Inline style

    <div
      style={{
        color: "red",
        fontSize: 20,
      }}
    >
      ...
    </div>


## Dynamic style

    <div
      style={{
        width: `${value}%`,
      }}
    />


## CSS variable

    <div
      style={
        {
          "--progress": `${value}%`,
        } as React.CSSProperties
      }
    />


## CSS pseudo-class

    .button:hover {
      opacity: 0.8;
    }


## Responsive

    @media (min-width: 768px) {
      .container {
        max-width: 750px;
      }
    }


## Variant

    <Button variant="primary">
      Save
    </Button>


---

# Головне

React не замінює CSS.

React відповідає за:

    components
    state
    props
    events
    rendering

CSS відповідає переважно за:

    layout
    colors
    typography
    spacing
    responsive design
    visual states
    animations


Найважливіший JSX-синтаксис:

    className="button"

або:

    className={styles.button}


Для CSS Modules:

    Component.tsx
    Component.module.css

Компонент:

    import styles from "./Component.module.css";

    function Component() {
      return (
        <div className={styles.container}>
          ...
        </div>
      );
    }


Для inline style:

    <div
      style={{
        color: "red",
        fontSize: 20,
      }}
    />


Головний принцип:

    Статичний стиль
        ↓
    CSS / CSS Modules

    Динамічний class
        ↓
    className + condition

    Динамічне числове/значеннєве значення
        ↓
    style / CSS variables

    Responsive / hover / focus / animation
        ↓
    CSS


Для component-based React-розробки особливо важливо добре знати:

    HTML
      ↓
    CSS
      ↓
    className
      ↓
    CSS Modules
      ↓
    conditional classes
      ↓
    CSS variables
      ↓
    responsive CSS
      ↓
    component variants


А вже після цього має сенс окремо вивчати:

    Tailwind CSS
    CSS-in-JS
    styled-components
    Emotion
    design systems


Головна ідея:

    React визначає, ЩО відображати.

    CSS визначає, ЯК це виглядає.

    Props/state можуть визначати,
    ЯКИЙ саме visual state потрібно показати.