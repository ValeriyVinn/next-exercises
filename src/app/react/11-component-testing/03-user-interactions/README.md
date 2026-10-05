# 03. User Interactions

> Практика тестування взаємодії користувача з React-компонентами за допомогою **React Testing Library**, `userEvent` та `Vitest`.

---

## 1. Що таке User Interactions

**User Interactions** — це тестування того, що відбувається з UI після дій користувача:

- натискання кнопки;
- введення тексту;
- очищення поля;
- вибір checkbox;
- вибір option;
- відправлення форми;
- відкриття/закриття меню;
- перемикання стану;
- фокусування та blur;
- клавіатурна навігація.

Головна ідея:

> Ми тестуємо не внутрішній `state` компонента, а поведінку, яку бачить і виконує користувач.

Наприклад, замість:

    expect(component.state.isOpen).toBe(true);

тестуємо:

    await user.click(screen.getByRole("button", { name: /open/i }));

    expect(screen.getByRole("dialog")).toBeInTheDocument();

---

# 2. Основний інструмент — `userEvent`

Для моделювання дій користувача використовується пакет:

    @testing-library/user-event

Він є більш реалістичним способом взаємодії з DOM, ніж старий підхід через `fireEvent`.

Імпорт:

    import userEvent from "@testing-library/user-event";

---

# 3. `userEvent.setup()`

Перед взаємодіями створюємо користувача:

    const user = userEvent.setup();

Після цього виконуємо дії:

    await user.click(button);

    await user.type(input, "Hello");

    await user.clear(input);

Важливо:

> Методи `userEvent` зазвичай потрібно викликати через `await`.

---

# 4. Базова структура тесту взаємодії

Типовий тест:

    import { render, screen } from "@testing-library/react";
    import userEvent from "@testing-library/user-event";
    import { describe, expect, it } from "vitest";

    import Counter from "./Counter";

    describe("Counter", () => {
      it("increments counter when user clicks the button", async () => {
        const user = userEvent.setup();

        render(<Counter />);

        const button = screen.getByRole("button", {
          name: /increment/i,
        });

        await user.click(button);

        expect(screen.getByText("1")).toBeInTheDocument();
      });
    });

Послідовність:

    Arrange
        ↓
    render component
        ↓
    create user
        ↓
    find element
        ↓
    Act — user interaction
        ↓
    Assert — visible result

---

# 5. Arrange → Act → Assert

Одна з найкорисніших структур тестів:

## Arrange

Підготовка:

    const user = userEvent.setup();

    render(<Counter />);

## Act

Дія користувача:

    await user.click(
      screen.getByRole("button", {
        name: /increment/i,
      }),
    );

## Assert

Перевірка результату:

    expect(screen.getByText("1")).toBeInTheDocument();

Повний приклад:

    it("increments counter", async () => {
      const user = userEvent.setup();

      render(<Counter />);

      await user.click(
        screen.getByRole("button", {
          name: /increment/i,
        }),
      );

      expect(screen.getByText("1")).toBeInTheDocument();
    });

---

# 6. Чому `userEvent`, а не `fireEvent`

Існують два підходи:

    fireEvent.click(button);

та:

    await user.click(button);

Для тестування реальної поведінки користувача перевага за `userEvent`.

`fireEvent` безпосередньо генерує DOM-подію.

`userEvent` моделює більш реалістичну послідовність дій користувача.

Наприклад, введення тексту користувачем може включати більше подій, ніж просто одну `input`-подію.

Тому основне правило:

> Для звичайних user interactions використовуй `userEvent`.

`fireEvent` залишай для спеціальних випадків, коли потрібно безпосередньо згенерувати конкретну DOM-подію.

---

# 7. `user.click()`

Найпростіша взаємодія — клік.

Компонент:

    function Counter() {
      const [count, setCount] = useState(0);

      return (
        <div>
          <p>Count: {count}</p>

          <button onClick={() => setCount(count + 1)}>
            Increment
          </button>
        </div>
      );
    }

Тест:

    it("increments count after click", async () => {
      const user = userEvent.setup();

      render(<Counter />);

      expect(screen.getByText("Count: 0")).toBeInTheDocument();

      await user.click(
        screen.getByRole("button", {
          name: /increment/i,
        }),
      );

      expect(screen.getByText("Count: 1")).toBeInTheDocument();
    });

---

# 8. Перевіряємо результат, а не `useState`

Не потрібно тестувати:

    expect(count).toBe(1);

якщо `count` — внутрішній state компонента.

Краще:

    expect(screen.getByText("Count: 1")).toBeInTheDocument();

Причина:

> Користувач не бачить `state`. Користувач бачить UI.

---

# 9. `user.dblClick()`

Подвійний клік:

    await user.dblClick(button);

Наприклад:

    it("opens editor after double click", async () => {
      const user = userEvent.setup();

      render(<Editor />);

      await user.dblClick(
        screen.getByText("Document"),
      );

      expect(
        screen.getByRole("textbox"),
      ).toBeInTheDocument();
    });

---

# 10. `user.type()`

Введення тексту:

    await user.type(input, "Hello");

Приклад:

    function SearchForm() {
      const [query, setQuery] = useState("");

      return (
        <input
          aria-label="Search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />
      );
    }

Тест:

    it("allows user to type search query", async () => {
      const user = userEvent.setup();

      render(<SearchForm />);

      const input = screen.getByRole("textbox", {
        name: /search/i,
      });

      await user.type(input, "React");

      expect(input).toHaveValue("React");
    });

---

# 11. `user.clear()`

Очищення input:

    await user.clear(input);

Приклад:

    it("clears input", async () => {
      const user = userEvent.setup();

      render(<SearchForm />);

      const input = screen.getByRole("textbox", {
        name: /search/i,
      });

      await user.type(input, "React");

      expect(input).toHaveValue("React");

      await user.clear(input);

      expect(input).toHaveValue("");
    });

---

# 12. `user.selectOptions()`

Для `<select>`:

    await user.selectOptions(select, "react");

Приклад компонента:

    function CourseSelect() {
      return (
        <label>
          Course

          <select>
            <option value="">Choose course</option>
            <option value="react">React</option>
            <option value="node">Node.js</option>
          </select>
        </label>
      );
    }

Тест:

    it("allows user to select course", async () => {
      const user = userEvent.setup();

      render(<CourseSelect />);

      const select = screen.getByRole("combobox", {
        name: /course/i,
      });

      await user.selectOptions(select, "react");

      expect(select).toHaveValue("react");
    });

---

# 13. Checkbox

Компонент:

    function Settings() {
      const [enabled, setEnabled] = useState(false);

      return (
        <label>
          Enable notifications

          <input
            type="checkbox"
            checked={enabled}
            onChange={(event) =>
              setEnabled(event.target.checked)
            }
          />
        </label>
      );
    }

Тест:

    it("allows user to enable notifications", async () => {
      const user = userEvent.setup();

      render(<Settings />);

      const checkbox = screen.getByRole("checkbox", {
        name: /enable notifications/i,
      });

      expect(checkbox).not.toBeChecked();

      await user.click(checkbox);

      expect(checkbox).toBeChecked();
    });

---

# 14. Radio buttons

Компонент:

    function ThemeSelector() {
      return (
        <fieldset>
          <legend>Theme</legend>

          <label>
            Light
            <input
              type="radio"
              name="theme"
              value="light"
            />
          </label>

          <label>
            Dark
            <input
              type="radio"
              name="theme"
              value="dark"
            />
          </label>
        </fieldset>
      );
    }

Тест:

    it("allows user to select dark theme", async () => {
      const user = userEvent.setup();

      render(<ThemeSelector />);

      const darkRadio = screen.getByRole("radio", {
        name: /dark/i,
      });

      await user.click(darkRadio);

      expect(darkRadio).toBeChecked();
    });

---

# 15. `user.tab()`

Клавіатурна навігація:

    await user.tab();

Наприклад:

    it("moves focus with Tab", async () => {
      const user = userEvent.setup();

      render(
        <>
          <button>First</button>
          <button>Second</button>
        </>,
      );

      await user.tab();

      expect(
        screen.getByRole("button", {
          name: /first/i,
        }),
      ).toHaveFocus();

      await user.tab();

      expect(
        screen.getByRole("button", {
          name: /second/i,
        }),
      ).toHaveFocus();
    });

---

# 16. `toHaveFocus()`

Для перевірки фокусу:

    expect(element).toHaveFocus();

Приклад:

    expect(
      screen.getByRole("textbox", {
        name: /email/i,
      }),
    ).toHaveFocus();

Фокус особливо важливий для:

- форм;
- модальних вікон;
- меню;
- клавіатурної навігації;
- accessibility.

---

# 17. Keyboard interactions

`userEvent` дозволяє симулювати клавіатуру.

Наприклад:

    await user.keyboard("{Enter}");

Або:

    await user.keyboard("{Escape}");

Або:

    await user.keyboard("{Tab}");

Приклад:

    it("closes modal with Escape", async () => {
      const user = userEvent.setup();

      render(<Modal />);

      expect(
        screen.getByRole("dialog"),
      ).toBeInTheDocument();

      await user.keyboard("{Escape}");

      expect(
        screen.queryByRole("dialog"),
      ).not.toBeInTheDocument();
    });

---

# 18. Натискання Enter

Форма:

    function SearchForm() {
      const [submitted, setSubmitted] = useState(false);

      return (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <label>
            Search
            <input name="search" />
          </label>

          <button type="submit">
            Search
          </button>

          {submitted && <p>Submitted</p>}
        </form>
      );
    }

Тест:

    it("submits form when user presses Enter", async () => {
      const user = userEvent.setup();

      render(<SearchForm />);

      const input = screen.getByRole("textbox", {
        name: /search/i,
      });

      await user.type(input, "React");

      await user.keyboard("{Enter}");

      expect(
        screen.getByText("Submitted"),
      ).toBeInTheDocument();
    });

---

# 19. `userEvent` і асинхронність

Більшість interaction-методів використовуються через `await`:

    await user.click(button);

    await user.type(input, "React");

    await user.clear(input);

    await user.tab();

    await user.keyboard("{Enter}");

Тому тест повинен бути `async`:

    it("handles interaction", async () => {
      const user = userEvent.setup();

      render(<Component />);

      await user.click(button);
    });

---

# 20. Interaction → UI update

Найважливіший патерн:

    User action
        ↓
    Event handler
        ↓
    State update
        ↓
    React re-render
        ↓
    New UI
        ↓
    Assertion

Наприклад:

    await user.click(
      screen.getByRole("button", {
        name: /show details/i,
      }),
    );

    expect(
      screen.getByText("Additional information"),
    ).toBeInTheDocument();

Ми не перевіряємо:

    setIsOpen(true);

Ми перевіряємо результат:

    "Additional information" is visible.

---

# 21. Тестування toggle

Компонент:

    function Details() {
      const [open, setOpen] = useState(false);

      return (
        <div>
          <button onClick={() => setOpen(!open)}>
            {open ? "Hide details" : "Show details"}
          </button>

          {open && (
            <p>
              Additional information
            </p>
          )}
        </div>
      );
    }

Тест:

    it("shows and hides details", async () => {
      const user = userEvent.setup();

      render(<Details />);

      const button = screen.getByRole("button", {
        name: /show details/i,
      });

      expect(
        screen.queryByText("Additional information"),
      ).not.toBeInTheDocument();

      await user.click(button);

      expect(
        screen.getByText("Additional information"),
      ).toBeInTheDocument();

      await user.click(
        screen.getByRole("button", {
          name: /hide details/i,
        }),
      );

      expect(
        screen.queryByText("Additional information"),
      ).not.toBeInTheDocument();
    });

---

# 22. Тестування form input

Компонент:

    function LoginForm() {
      return (
        <form>
          <label>
            Email
            <input type="email" />
          </label>

          <label>
            Password
            <input type="password" />
          </label>

          <button type="submit">
            Login
          </button>
        </form>
      );
    }

Тест:

    it("allows user to fill login form", async () => {
      const user = userEvent.setup();

      render(<LoginForm />);

      const emailInput = screen.getByRole("textbox", {
        name: /email/i,
      });

      const passwordInput =
        screen.getByLabelText(/password/i);

      await user.type(
        emailInput,
        "user@example.com",
      );

      await user.type(
        passwordInput,
        "secret123",
      );

      expect(emailInput).toHaveValue(
        "user@example.com",
      );

      expect(passwordInput).toHaveValue(
        "secret123",
      );
    });

---

# 23. Тестування submit

Компонент:

    function ContactForm() {
      const [submitted, setSubmitted] = useState(false);

      return (
        <form
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <label>
            Message
            <textarea />
          </label>

          <button type="submit">
            Send
          </button>

          {submitted && (
            <p>Message sent</p>
          )}
        </form>
      );
    }

Тест:

    it("submits the form", async () => {
      const user = userEvent.setup();

      render(<ContactForm />);

      const message = screen.getByRole("textbox", {
        name: /message/i,
      });

      await user.type(
        message,
        "Hello!",
      );

      await user.click(
        screen.getByRole("button", {
          name: /send/i,
        }),
      );

      expect(
        screen.getByText("Message sent"),
      ).toBeInTheDocument();
    });

---

# 24. Тестування disabled button

Компонент:

    function SubmitButton() {
      return (
        <button disabled>
          Submit
        </button>
      );
    }

Тест:

    it("renders disabled submit button", () => {
      render(<SubmitButton />);

      const button = screen.getByRole("button", {
        name: /submit/i,
      });

      expect(button).toBeDisabled();
    });

---

# 25. Interaction з disabled element

Якщо кнопка disabled:

    <button disabled>
      Submit
    </button>

користувач не може нормально виконати дію.

Тестуємо саме UI-контракт:

    expect(button).toBeDisabled();

Не потрібно перевіряти внутрішню реалізацію:

    expect(isDisabled).toBe(true);

---

# 26. Тестування conditional rendering після interaction

Компонент:

    function PasswordForm() {
      const [visible, setVisible] = useState(false);

      return (
        <div>
          <input
            type={visible ? "text" : "password"}
            aria-label="Password"
          />

          <button
            type="button"
            onClick={() => setVisible(!visible)}
          >
            {visible ? "Hide password" : "Show password"}
          </button>
        </div>
      );
    }

Тест:

    it("shows password after clicking button", async () => {
      const user = userEvent.setup();

      render(<PasswordForm />);

      const input = screen.getByLabelText(
        /password/i,
      );

      expect(input).toHaveAttribute(
        "type",
        "password",
      );

      await user.click(
        screen.getByRole("button", {
          name: /show password/i,
        }),
      );

      expect(input).toHaveAttribute(
        "type",
        "text",
      );
    });

---

# 27. Interaction з props

Компонент:

    type ButtonProps = {
      onSave: () => void;
    };

    function SaveButton({
      onSave,
    }: ButtonProps) {
      return (
        <button onClick={onSave}>
          Save
        </button>
      );
    }

У тесті можна передати mock function:

    const onSave = vi.fn();

    render(
      <SaveButton onSave={onSave} />,
    );

    await user.click(
      screen.getByRole("button", {
        name: /save/i,
      }),
    );

    expect(onSave).toHaveBeenCalledTimes(1);

Тут ми перевіряємо:

> після дії користувача callback був викликаний.

---

# 28. `vi.fn()`

У Vitest:

    const mockFn = vi.fn();

Наприклад:

    const onSubmit = vi.fn();

    render(
      <Form onSubmit={onSubmit} />,
    );

Після interaction:

    await user.click(
      screen.getByRole("button", {
        name: /submit/i,
      }),
    );

Перевірка:

    expect(onSubmit).toHaveBeenCalled();

---

# 29. Перевірка аргументів callback

Якщо callback отримує дані:

    const onSubmit = vi.fn();

    render(
      <Form onSubmit={onSubmit} />,
    );

Після введення:

    await user.type(
      screen.getByRole("textbox", {
        name: /email/i,
      }),
      "user@example.com",
    );

    await user.click(
      screen.getByRole("button", {
        name: /submit/i,
      }),
    );

Можемо перевірити:

    expect(onSubmit).toHaveBeenCalledWith(
      "user@example.com",
    );

---

# 30. Interaction з модальним вікном

Компонент:

    function ModalExample() {
      const [open, setOpen] = useState(false);

      return (
        <>
          <button
            onClick={() => setOpen(true)}
          >
            Open modal
          </button>

          {open && (
            <div role="dialog">
              <h2>Confirm action</h2>

              <button
                onClick={() => setOpen(false)}
              >
                Close
              </button>
            </div>
          )}
        </>
      );
    }

Тест:

    it("opens and closes modal", async () => {
      const user = userEvent.setup();

      render(<ModalExample />);

      expect(
        screen.queryByRole("dialog"),
      ).not.toBeInTheDocument();

      await user.click(
        screen.getByRole("button", {
          name: /open modal/i,
        }),
      );

      expect(
        screen.getByRole("dialog"),
      ).toBeInTheDocument();

      await user.click(
        screen.getByRole("button", {
          name: /close/i,
        }),
      );

      expect(
        screen.queryByRole("dialog"),
      ).not.toBeInTheDocument();
    });

---

# 31. `getBy...` чи `queryBy...` після interaction

Коли елемент **повинен існувати**:

    expect(
      screen.getByRole("dialog"),
    ).toBeInTheDocument();

Коли елемент **не повинен існувати**:

    expect(
      screen.queryByRole("dialog"),
    ).not.toBeInTheDocument();

Правило:

> `getBy` — очікуємо, що елемент існує.

> `queryBy` — перевіряємо, що елемент може бути відсутнім.

---

# 32. Interaction з елементом, який з'являється

Якщо після дії елемент з'являється асинхронно, використовуємо `findBy...`.

Наприклад:

    await user.click(
      screen.getByRole("button", {
        name: /load/i,
      }),
    );

    expect(
      await screen.findByText("Loaded"),
    ).toBeInTheDocument();

Тут:

    getBy...
        ↓
    елемент має бути вже в DOM

    findBy...
        ↓
    елемент може з'явитися пізніше

---

# 33. Interaction з disappearing element

Якщо після дії елемент повинен зникнути:

    await user.click(
      screen.getByRole("button", {
        name: /close/i,
      }),
    );

    expect(
      screen.queryByRole("dialog"),
    ).not.toBeInTheDocument();

Якщо зникнення відбувається асинхронно, для очікування можна використовувати `waitFor`.

Наприклад:

    await waitFor(() => {
      expect(
        screen.queryByRole("dialog"),
      ).not.toBeInTheDocument();
    });

---

# 34. `waitFor`

`waitFor` використовується для очікування асинхронної зміни:

    import { waitFor } from "@testing-library/react";

Приклад:

    await waitFor(() => {
      expect(
        screen.queryByText("Loading"),
      ).not.toBeInTheDocument();
    });

Але не потрібно використовувати `waitFor` без необхідності.

Якщо можна написати:

    expect(
      await screen.findByText("Loaded"),
    ).toBeInTheDocument();

це часто простіше.

---

# 35. Не використовуй `waitFor` навколо всього тесту

Погано:

    await waitFor(async () => {
      await user.click(button);

      expect(
        screen.getByText("Done"),
      ).toBeInTheDocument();
    });

Краще:

    await user.click(button);

    expect(
      await screen.findByText("Done"),
    ).toBeInTheDocument();

Або:

    await user.click(button);

    await waitFor(() => {
      expect(
        screen.getByText("Done"),
      ).toBeInTheDocument();
    });

---

# 36. Тестування loading → loaded

Компонент може мати:

    Loading
        ↓
    Loaded

Тест може виглядати так:

    it("shows loaded content after user action", async () => {
      const user = userEvent.setup();

      render(<DataLoader />);

      await user.click(
        screen.getByRole("button", {
          name: /load/i,
        }),
      );

      expect(
        await screen.findByText("Loaded"),
      ).toBeInTheDocument();
    });

Детальне тестування API та mocking буде розглядатися окремо в:

    06-mocking-api

---

# 37. Interaction з textarea

Для `<textarea>`:

    const textarea = screen.getByRole("textbox", {
      name: /message/i,
    });

    await user.type(
      textarea,
      "Hello React",
    );

Перевірка:

    expect(textarea).toHaveValue(
      "Hello React",
    );

Очищення:

    await user.clear(textarea);

    expect(textarea).toHaveValue("");

---

# 38. Interaction з select

Для `<select>`:

    const select = screen.getByRole("combobox", {
      name: /country/i,
    });

Вибір:

    await user.selectOptions(
      select,
      "ukraine",
    );

Перевірка:

    expect(select).toHaveValue("ukraine");

---

# 39. Interaction з checkbox

Встановити:

    await user.click(checkbox);

Перевірити:

    expect(checkbox).toBeChecked();

Зняти:

    await user.click(checkbox);

Перевірити:

    expect(checkbox).not.toBeChecked();

---

# 40. Interaction з keyboard

Основні команди:

    await user.keyboard("{Enter}");

    await user.keyboard("{Escape}");

    await user.keyboard("{Tab}");

Можна також використовувати модифікатори клавіш.

Наприклад:

    await user.keyboard(
      "{Control>}a{/Control}",
    );

Для звичайних тестів краще використовувати прості та зрозумілі сценарії, які відповідають реальній поведінці користувача.

---

# 41. Mouse interactions

Основні методи:

    await user.click(element);

    await user.dblClick(element);

Також `userEvent` підтримує інші mouse interactions, але для більшості компонентів достатньо:

- `click`;
- `dblClick`;
- keyboard interactions.

---

# 42. Hover

Для перевірки поведінки при наведенні:

    await user.hover(element);

Наприклад:

    await user.hover(
      screen.getByText("Help"),
    );

    expect(
      screen.getByRole("tooltip"),
    ).toBeInTheDocument();

Після цього можна прибрати курсор:

    await user.unhover(element);

---

# 43. Тестування tooltip

Компонент:

    function Help() {
      const [visible, setVisible] = useState(false);

      return (
        <div>
          <button
            onMouseEnter={() => setVisible(true)}
            onMouseLeave={() => setVisible(false)}
          >
            Help
          </button>

          {visible && (
            <div role="tooltip">
              Additional information
            </div>
          )}
        </div>
      );
    }

Тест:

    it("shows tooltip on hover", async () => {
      const user = userEvent.setup();

      render(<Help />);

      const button = screen.getByRole("button", {
        name: /help/i,
      });

      await user.hover(button);

      expect(
        screen.getByRole("tooltip"),
      ).toBeInTheDocument();

      await user.unhover(button);

      expect(
        screen.queryByRole("tooltip"),
      ).not.toBeInTheDocument();
    });

---

# 44. Не тестуй внутрішню реалізацію

Не потрібно перевіряти:

    expect(component.state.open).toBe(true);

Не потрібно перевіряти:

    expect(setOpen).toHaveBeenCalledWith(true);

якщо це не є частиною контракту компонента.

Краще:

    await user.click(button);

    expect(
      screen.getByRole("dialog"),
    ).toBeInTheDocument();

Головний принцип:

> Test behavior, not implementation.

---

# 45. Поганий interaction test

Погано:

    it("calls setIsOpen with true", () => {
      // implementation detail
    });

Такий тест прив'язаний до конкретної реалізації.

Якщо замінити:

    useState

на іншу реалізацію стану, тест може зламатися, хоча поведінка UI залишиться правильною.

---

# 46. Хороший interaction test

Добре:

    it("opens menu when user clicks button", async () => {
      const user = userEvent.setup();

      render(<Menu />);

      await user.click(
        screen.getByRole("button", {
          name: /open menu/i,
        }),
      );

      expect(
        screen.getByRole("menu"),
      ).toBeInTheDocument();
    });

Такий тест описує поведінку:

    user clicks
        ↓
    menu appears

---

# 47. Accessibility-first interactions

Взаємодію краще починати з доступних елементів:

    screen.getByRole(
      "button",
      { name: /save/i },
    );

замість:

    container.querySelector(
      ".save-button",
    );

Причина:

`getByRole` перевіряє не тільки наявність DOM-вузла, а й те, як цей елемент сприймається користувачем та accessibility tools.

---

# 48. Пошук елемента перед interaction

Хороший стиль:

    const button = screen.getByRole(
      "button",
      {
        name: /save/i,
      },
    );

    await user.click(button);

Замість:

    await user.click(
      screen.getByRole("button", {
        name: /save/i,
      }),
    );

Обидва варіанти правильні.

Перший варіант зручніший, якщо елемент використовується кілька разів.

---

# 49. Один user на один тест

Зазвичай:

    it("does something", async () => {
      const user = userEvent.setup();

      render(<Component />);

      // interactions
    });

Не потрібно створювати одного глобального `user` для всіх тестів.

Краще створювати його всередині кожного тесту.

---

# 50. `render()` + `userEvent`

Типовий шаблон:

    it("handles user interaction", async () => {
      const user = userEvent.setup();

      render(<Component />);

      const element = screen.getByRole(
        "button",
        {
          name: /action/i,
        },
      );

      await user.click(element);

      expect(
        screen.getByText("Result"),
      ).toBeInTheDocument();
    });

Цей шаблон варто запам'ятати.

---

# 51. Interaction з декількома елементами

Наприклад, форма:

    it("allows user to complete form", async () => {
      const user = userEvent.setup();

      render(<RegistrationForm />);

      await user.type(
        screen.getByRole("textbox", {
          name: /name/i,
        }),
        "Valeriy",
      );

      await user.type(
        screen.getByRole("textbox", {
          name: /email/i,
        }),
        "user@example.com",
      );

      await user.click(
        screen.getByRole("checkbox", {
          name: /terms/i,
        }),
      );

      await user.click(
        screen.getByRole("button", {
          name: /register/i,
        }),
      );

      expect(
        screen.getByText("Registration successful"),
      ).toBeInTheDocument();
    });

Це вже близько до інтеграційного сценарію:

    fill form
        ↓
    check option
        ↓
    submit
        ↓
    verify result

---

# 52. Не перевіряй кожен проміжний state без потреби

Не завжди потрібно робити:

    click
    assert
    click
    assert
    click
    assert
    click
    assert

Тест має перевіряти важливу поведінку.

Наприклад, замість надмірно детального тесту:

    await user.type(input, "R");
    expect(input).toHaveValue("R");

    await user.type(input, "e");
    expect(input).toHaveValue("Re");

    await user.type(input, "a");
    expect(input).toHaveValue("Rea");

достатньо:

    await user.type(input, "React");

    expect(input).toHaveValue("React");

---

# 53. Один тест — одна поведінка

Добре:

    it("opens menu when button is clicked", ...);

    it("closes menu when close button is clicked", ...);

    it("submits form with valid data", ...);

Замість величезного:

    it("tests everything", ...);

Це робить тести:

- зрозумілішими;
- стабільнішими;
- простішими для debugging.

---

# 54. Тестування негативного сценарію

Не потрібно тестувати тільки успішний сценарій.

Наприклад:

    it("does not submit empty form", async () => {
      const user = userEvent.setup();

      render(<LoginForm />);

      await user.click(
        screen.getByRole("button", {
          name: /login/i,
        }),
      );

      expect(
        screen.getByText("Email is required"),
      ).toBeInTheDocument();
    });

Це називається negative path.

---

# 55. Positive path / Negative path

Корисно мислити сценаріями:

## Positive path

    User action
        ↓
    expected successful result

## Negative path

    User action
        ↓
    validation/error/blocked result

Наприклад:

    valid email
        → submit
        → success

    invalid email
        → submit
        → validation error

---

# 56. Interaction tests для forms

Для форми корисно перевіряти:

- користувач може ввести значення;
- користувач може очистити значення;
- checkbox змінюється;
- radio змінюється;
- select змінюється;
- submit працює;
- validation показується;
- success state показується;
- error state показується.

---

# 57. Interaction tests для buttons

Для кнопки корисно перевіряти:

- click;
- disabled state;
- callback;
- зміна UI;
- відкриття/закриття компонента;
- submit.

Приклад:

    const onClick = vi.fn();

    render(
      <Button onClick={onClick}>
        Save
      </Button>,
    );

    await user.click(
      screen.getByRole("button", {
        name: /save/i,
      }),
    );

    expect(onClick).toHaveBeenCalledTimes(1);

---

# 58. Interaction tests для menus

Типовий сценарій:

    render(<Menu />);

    await user.click(
      screen.getByRole("button", {
        name: /open menu/i,
      }),
    );

    expect(
      screen.getByRole("menu"),
    ).toBeInTheDocument();

---

# 59. Interaction tests для accordion

Типовий сценарій:

    render(<Accordion />);

    expect(
      screen.queryByText("Details"),
    ).not.toBeInTheDocument();

    await user.click(
      screen.getByRole("button", {
        name: /details/i,
      }),
    );

    expect(
      screen.getByText("Details"),
    ).toBeInTheDocument();

---

# 60. Interaction tests для tabs

Типовий сценарій:

    render(<Tabs />);

    await user.click(
      screen.getByRole("tab", {
        name: /profile/i,
      }),
    );

    expect(
      screen.getByRole("tabpanel"),
    ).toHaveTextContent("Profile");

---

# 61. Interaction tests для modal

Основні сценарії:

    open modal
        ↓
    modal visible

    close modal
        ↓
    modal hidden

    Escape
        ↓
    modal hidden

    confirm
        ↓
    expected action

Не потрібно перевіряти конкретний `useState`.

---

# 62. Interaction tests для dropdown

Типовий сценарій:

    await user.click(
      screen.getByRole("button", {
        name: /select country/i,
      }),
    );

    expect(
      screen.getByRole("listbox"),
    ).toBeInTheDocument();

Після вибору:

    await user.click(
      screen.getByRole("option", {
        name: /ukraine/i,
      }),
    );

    expect(
      screen.getByRole("button", {
        name: /ukraine/i,
      }),
    ).toBeInTheDocument();

---

# 63. Interaction + callback

Це дуже поширена ситуація в React.

Компонент:

    type DeleteButtonProps = {
      onDelete: () => void;
    };

    function DeleteButton({
      onDelete,
    }: DeleteButtonProps) {
      return (
        <button onClick={onDelete}>
          Delete
        </button>
      );
    }

Тест:

    it("calls onDelete after click", async () => {
      const user = userEvent.setup();
      const onDelete = vi.fn();

      render(
        <DeleteButton
          onDelete={onDelete}
        />,
      );

      await user.click(
        screen.getByRole("button", {
          name: /delete/i,
        }),
      );

      expect(onDelete).toHaveBeenCalledTimes(1);
    });

---

# 64. Interaction + callback arguments

Наприклад:

    type SelectUserProps = {
      onSelect: (id: number) => void;
    };

    function SelectUser({
      onSelect,
    }: SelectUserProps) {
      return (
        <button
          onClick={() => onSelect(42)}
        >
          Select user
        </button>
      );
    }

Тест:

    it("passes selected user id", async () => {
      const user = userEvent.setup();
      const onSelect = vi.fn();

      render(
        <SelectUser
          onSelect={onSelect}
        />,
      );

      await user.click(
        screen.getByRole("button", {
          name: /select user/i,
        }),
      );

      expect(onSelect).toHaveBeenCalledWith(42);
    });

---

# 65. `act()` і `userEvent`

У React Testing Library зазвичай **не потрібно вручну використовувати `act()`** для звичайних user interactions.

Замість:

    act(() => {
      fireEvent.click(button);
    });

у типовому тесті використовуємо:

    await user.click(button);

RTL та `userEvent` займаються необхідною синхронізацією для стандартних сценаріїв.

---

# 66. Interaction і `rerender()`

Іноді компонент залежить від props.

Наприклад:

    const { rerender } = render(
      <Button disabled={false} />,
    );

Після зміни props:

    rerender(
      <Button disabled={true} />,
    );

Але якщо перевіряємо саме user interaction, спочатку подумай:

> Чи справді мені потрібен `rerender()`?

У більшості interaction tests він не потрібен.

---

# 67. Не використовуй `container.querySelector()` без необхідності

Погано:

    const button =
      container.querySelector(".submit-button");

Краще:

    const button = screen.getByRole(
      "button",
      {
        name: /submit/i,
      },
    );

Причина:

`getByRole` ближчий до реального способу взаємодії користувача.

---

# 68. Не використовуй `data-testid` для interaction без причини

Погано:

    await user.click(
      screen.getByTestId("save-button"),
    );

Краще:

    await user.click(
      screen.getByRole("button", {
        name: /save/i,
      }),
    );

`data-testid` — запасний варіант, а не основний спосіб пошуку interactive elements.

---

# 69. Interaction і accessibility

Хороший interaction test одночасно може виявити проблеми accessibility.

Наприклад:

    screen.getByRole(
      "button",
      {
        name: /save/i,
      },
    );

не знайде правильно доступну кнопку, якщо accessibility semantics неправильні.

Тому тести через role — це не тільки про testing.

Вони допомагають підтримувати якісний HTML/UI.

---

# 70. Приклад поганого компонента

Наприклад:

    <div
      onClick={handleClick}
      className="button"
    >
      Save
    </div>

Тестувати можна:

    await user.click(
      screen.getByText("Save"),
    );

Але краще виправити сам компонент:

    <button onClick={handleClick}>
      Save
    </button>

Тоді тест стає:

    await user.click(
      screen.getByRole("button", {
        name: /save/i,
      }),
    );

Тобто хороший тест може підказати, що сам UI недостатньо accessibility-friendly.

---

# 71. Тестуй поведінку користувача

Запитай себе:

> Що робить користувач?

Наприклад:

    User sees "Open menu"
        ↓
    User clicks it
        ↓
    User sees menu

Тест:

    await user.click(
      screen.getByRole("button", {
        name: /open menu/i,
      }),
    );

    expect(
      screen.getByRole("menu"),
    ).toBeInTheDocument();

---

# 72. Що не треба тестувати

Не потрібно тестувати React:

    useState працює

    useEffect працює

    onClick викликається React-ом

    conditional rendering працює в React

Не потрібно тестувати внутрішню реалізацію без потреби.

Потрібно тестувати власну поведінку компонента:

    user action
        ↓
    application behavior
        ↓
    expected UI

---

# 73. Не тестуй DOM надто низькорівнево

Погано:

    expect(
      container.innerHTML,
    ).toContain("Hello");

Краще:

    expect(
      screen.getByRole("heading", {
        name: /hello/i,
      }),
    ).toBeInTheDocument();

---

# 74. `toHaveValue()`

Для input:

    expect(input).toHaveValue(
      "React",
    );

Для number input:

    expect(input).toHaveValue(25);

Для select:

    expect(select).toHaveValue(
      "react",
    );

---

# 75. `toBeChecked()`

Checkbox:

    expect(checkbox).toBeChecked();

Radio:

    expect(radio).toBeChecked();

Негативна перевірка:

    expect(checkbox).not.toBeChecked();

---

# 76. `toBeDisabled()`

Перевірка disabled:

    expect(button).toBeDisabled();

Негативна:

    expect(button).not.toBeDisabled();

---

# 77. `toHaveFocus()`

Перевірка focus:

    expect(input).toHaveFocus();

Корисно для:

- forms;
- modal;
- keyboard navigation;
- accessibility.

---

# 78. `toHaveAttribute()`

Наприклад:

    expect(input).toHaveAttribute(
      "type",
      "password",
    );

Або:

    expect(link).toHaveAttribute(
      "href",
      "/profile",
    );

---

# 79. Interaction + visible result

Основний принцип цього розділу:

    render()
        ↓
    find element
        ↓
    userEvent
        ↓
    React updates UI
        ↓
    assert visible result

Приклад:

    render(<Counter />);

    await user.click(
      screen.getByRole("button", {
        name: /increment/i,
      }),
    );

    expect(
      screen.getByText("Count: 1"),
    ).toBeInTheDocument();

---

# 80. Повний приклад

Компонент:

    import { useState } from "react";

    type TodoFormProps = {
      onAdd: (text: string) => void;
    };

    export default function TodoForm({
      onAdd,
    }: TodoFormProps) {
      const [text, setText] = useState("");

      const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>,
      ) => {
        event.preventDefault();

        if (!text.trim()) {
          return;
        }

        onAdd(text);

        setText("");
      };

      return (
        <form onSubmit={handleSubmit}>
          <label>
            Task
            <input
              value={text}
              onChange={(event) =>
                setText(event.target.value)
              }
            />
          </label>

          <button type="submit">
            Add task
          </button>
        </form>
      );
    }

Тест:

    import { render, screen } from "@testing-library/react";
    import userEvent from "@testing-library/user-event";
    import { describe, expect, it, vi } from "vitest";

    import TodoForm from "./TodoForm";

    describe("TodoForm", () => {
      it("allows user to enter task and submit form", async () => {
        const user = userEvent.setup();
        const onAdd = vi.fn();

        render(
          <TodoForm onAdd={onAdd} />,
        );

        const input = screen.getByRole(
          "textbox",
          {
            name: /task/i,
          },
        );

        await user.type(
          input,
          "Learn React Testing Library",
        );

        expect(input).toHaveValue(
          "Learn React Testing Library",
        );

        await user.click(
          screen.getByRole("button", {
            name: /add task/i,
          }),
        );

        expect(onAdd).toHaveBeenCalledWith(
          "Learn React Testing Library",
        );

        expect(input).toHaveValue("");
      });
    });

Цей тест перевіряє повний user flow:

    render form
        ↓
    find input
        ↓
    type text
        ↓
    verify input value
        ↓
    click submit
        ↓
    verify callback
        ↓
    verify input reset

---

# 81. Повний interaction flow

Корисно мислити тестами як сценаріями:

    User
      │
      ▼
    sees UI
      │
      ▼
    finds element
      │
      ▼
    interacts with element
      │
      ▼
    React updates state
      │
      ▼
    component re-renders
      │
      ▼
    user sees new UI
      │
      ▼
    test verifies result

---

# 82. Типовий шаблон interaction test

    import { render, screen } from "@testing-library/react";
    import userEvent from "@testing-library/user-event";
    import { describe, expect, it } from "vitest";

    describe("Component", () => {
      it("does something after user interaction", async () => {
        const user = userEvent.setup();

        render(<Component />);

        const button = screen.getByRole(
          "button",
          {
            name: /action/i,
          },
        );

        await user.click(button);

        expect(
          screen.getByText("Expected result"),
        ).toBeInTheDocument();
      });
    });

---

# 83. Найважливіші `userEvent` методи

| Метод | Призначення |
|---|---|
| `user.click()` | клік |
| `user.dblClick()` | подвійний клік |
| `user.type()` | введення тексту |
| `user.clear()` | очищення input |
| `user.selectOptions()` | вибір option |
| `user.tab()` | Tab-навігація |
| `user.keyboard()` | клавіатурні дії |
| `user.hover()` | наведення |
| `user.unhover()` | прибирання курсора |

---

# 84. Основні assertion-и для interaction

| Assertion | Що перевіряє |
|---|---|
| `toBeInTheDocument()` | елемент існує |
| `not.toBeInTheDocument()` | елемента немає |
| `toHaveValue()` | значення input/select |
| `toBeChecked()` | checkbox/radio вибраний |
| `toBeDisabled()` | елемент disabled |
| `toHaveFocus()` | елемент має focus |
| `toHaveAttribute()` | HTML attribute |
| `toHaveBeenCalled()` | callback викликаний |
| `toHaveBeenCalledTimes()` | кількість викликів |
| `toHaveBeenCalledWith()` | аргументи callback |

---

# 85. Типові помилки

## Помилка 1 — забули `await`

Погано:

    user.click(button);

Добре:

    await user.click(button);

---

## Помилка 2 — не створили user

Погано:

    await user.click(button);

Добре:

    const user = userEvent.setup();

    await user.click(button);

---

## Помилка 3 — тестують state

Погано:

    expect(state.isOpen).toBe(true);

Добре:

    expect(
      screen.getByRole("dialog"),
    ).toBeInTheDocument();

---

## Помилка 4 — використовують `fireEvent` для всього

Погано:

    fireEvent.click(button);

Краще:

    await user.click(button);

---

## Помилка 5 — використовують `queryBy` там, де елемент має існувати

Погано:

    const button = screen.queryByRole(
      "button",
    );

Якщо кнопка повинна існувати:

    const button = screen.getByRole(
      "button",
    );

---

## Помилка 6 — використовують `getBy` для перевірки відсутності

Погано:

    expect(
      screen.getByRole("dialog"),
    ).not.toBeInTheDocument();

Якщо dialog відсутній, `getByRole` одразу викине помилку.

Добре:

    expect(
      screen.queryByRole("dialog"),
    ).not.toBeInTheDocument();

---

## Помилка 7 — шукають кнопку через CSS class

Погано:

    container.querySelector(
      ".submit-button",
    );

Добре:

    screen.getByRole(
      "button",
      {
        name: /submit/i,
      },
    );

---

# 86. Практичний алгоритм написання interaction test

Коли пишеш тест, пройди ці кроки.

### Крок 1 — Render

    render(<Component />);

### Крок 2 — Створи user

    const user = userEvent.setup();

### Крок 3 — Знайди елемент

    const button = screen.getByRole(
      "button",
      {
        name: /save/i,
      },
    );

### Крок 4 — Виконай user action

    await user.click(button);

### Крок 5 — Перевір результат

    expect(
      screen.getByText("Saved"),
    ).toBeInTheDocument();

---

# 87. Як думати під час написання тесту

Не:

> Який state мені потрібно перевірити?

А:

> Що зробить користувач?

Не:

> Який handler повинен викликатися?

А:

> Який результат побачить користувач?

Не:

> Який DOM selector використати?

А:

> Як користувач знаходить цей елемент?

---

# 88. Правильна модель тестування

    User
      ↓
    Interaction
      ↓
    Component behavior
      ↓
    UI change
      ↓
    Assertion

Наприклад:

    User clicks "Show password"
      ↓
    password visibility changes
      ↓
    input type becomes "text"
      ↓
    test verifies visible behavior

---

# 89. Що входить у `03-user-interactions`

Основні навички:

- `userEvent`;
- `userEvent.setup()`;
- `click`;
- `dblClick`;
- `type`;
- `clear`;
- `selectOptions`;
- checkbox;
- radio;
- `tab`;
- keyboard;
- hover;
- focus;
- submit;
- callback testing;
- `vi.fn()`;
- positive/negative interaction scenarios;
- async UI updates;
- `findBy...`;
- `waitFor`;
- accessibility-first interactions.

---

# 90. Що буде далі

Після `03-user-interactions` логічно перейти до:

    04-testing-forms

Там interaction testing буде розширено до повноцінного тестування форм:

    input
      ↓
    validation
      ↓
    error messages
      ↓
    submit
      ↓
    success/error state

Пізніше:

    05-testing-hooks
        ↓
    06-mocking-api
        ↓
    07-integration-tests

---

# 91. Коротка шпаргалка

## Створити user

    const user = userEvent.setup();

## Render

    render(<Component />);

## Click

    await user.click(button);

## Double click

    await user.dblClick(button);

## Type

    await user.type(input, "React");

## Clear

    await user.clear(input);

## Select

    await user.selectOptions(
      select,
      "react",
    );

## Tab

    await user.tab();

## Keyboard

    await user.keyboard("{Enter}");

## Hover

    await user.hover(element);

## Unhover

    await user.unhover(element);

## Callback mock

    const onClick = vi.fn();

## Verify callback

    expect(onClick).toHaveBeenCalled();

## Verify arguments

    expect(onClick).toHaveBeenCalledWith(
      value,
    );

## Verify input

    expect(input).toHaveValue("React");

## Verify checkbox

    expect(checkbox).toBeChecked();

## Verify disabled

    expect(button).toBeDisabled();

## Verify focus

    expect(input).toHaveFocus();

## Element appears

    expect(
      await screen.findByText("Loaded"),
    ).toBeInTheDocument();

## Element disappears

    expect(
      screen.queryByText("Loading"),
    ).not.toBeInTheDocument();

---

# 92. Головні правила — запам'ятати

1. **Для user interactions використовуй `userEvent`.**

2. **Створюй окремий `user` у тесті:**

       const user = userEvent.setup();

3. **Методи `userEvent` зазвичай викликай через `await`:**

       await user.click(button);

4. **Тестуй поведінку, а не внутрішній state.**

5. **Користувач взаємодіє з UI — тест теж повинен взаємодіяти з UI.**

6. **Для пошуку interactive elements віддавай перевагу `getByRole()`.**

7. **Для перевірки відсутності використовуй `queryBy...`.**

8. **Для асинхронної появи використовуй `findBy...`.**

9. **Не використовуй `waitFor`, якщо `findBy...` вирішує задачу простіше.**

10. **Не використовуй `container.querySelector()` без необхідності.**

11. **Не зловживай `data-testid`.**

12. **Перевіряй реальний результат interaction:**

        click
          ↓
        state change
          ↓
        UI change
          ↓
        assertion

13. **Тести повинні описувати поведінку користувача.**

14. **Один тест — одна зрозуміла поведінка.**

15. **Хороший interaction test максимально наближений до реального сценарію користувача.**

---

# 93. Головна формула

    render()
        +
    userEvent
        +
    screen
        +
    assertions
        =
    User Interaction Test

Або ще простіше:

    Arrange
        ↓
    Act — user action
        ↓
    Assert — visible result

> **React Testing Library: не перевіряй, як компонент працює всередині — перевіряй, як він поводиться для користувача.**