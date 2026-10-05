# 04. Testing Forms

> Практика тестування React-форм за допомогою **React Testing Library**, `userEvent`, `Vitest` та `jest-dom`.

---

# 1. Що таке Testing Forms

**Testing Forms** — це тестування поведінки форм з точки зору користувача.

Перевіряємо, що користувач може:

- побачити поля форми;
- ввести дані;
- змінити дані;
- очистити поле;
- вибрати option;
- поставити checkbox;
- вибрати radio;
- відправити форму;
- отримати validation errors;
- виправити помилки;
- побачити success state;
- отримати error state;
- побачити disabled/loading state;
- повторно відправити форму.

Основна ідея:

> Ми тестуємо **поведінку форми**, а не її внутрішню реалізацію.

---

# 2. Типовий flow форми

Більшість форм можна уявити так:

    Render form
        ↓
    Find fields
        ↓
    Enter data
        ↓
    Submit
        ↓
    Validation
        ↓
    Success / Error
        ↓
    Assert UI

Наприклад:

    User enters email
        ↓
    User enters password
        ↓
    User clicks Login
        ↓
    Form validates data
        ↓
    Login succeeds
        ↓
    User sees "Welcome"

---

# 3. Основний набір інструментів

Для тестування форм використовуємо:

    React Testing Library
        ↓
    @testing-library/react

    User interactions
        ↓
    @testing-library/user-event

    Assertions
        ↓
    @testing-library/jest-dom

    Test runner
        ↓
    Vitest

Типові імпорти:

    import {
      render,
      screen,
    } from "@testing-library/react";

    import userEvent from "@testing-library/user-event";

    import {
      describe,
      expect,
      it,
      vi,
    } from "vitest";

---

# 4. Базова структура form test

Типовий тест:

    it("submits form", async () => {
      const user = userEvent.setup();

      render(<LoginForm />);

      const email = screen.getByRole(
        "textbox",
        {
          name: /email/i,
        },
      );

      await user.type(
        email,
        "user@example.com",
      );

      await user.click(
        screen.getByRole("button", {
          name: /login/i,
        }),
      );

      expect(
        screen.getByText("Welcome"),
      ).toBeInTheDocument();
    });

Структура:

    Arrange
        ↓
    render
        ↓
    find fields
        ↓
    enter data
        ↓
    submit
        ↓
    Assert

---

# 5. Основний принцип

Не тестуємо:

    formState.email

    formState.password

    setErrors(...)

    handleSubmit(...)

Натомість тестуємо:

    input → user enters value

    button → user clicks

    error → user sees validation message

    success → user sees successful result

---

# 6. Простий компонент форми

Приклад:

    function LoginForm() {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      return (
        <form>
          <label>
            Email

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />
          </label>

          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />
          </label>

          <button type="submit">
            Login
          </button>
        </form>
      );
    }

---

# 7. Перевірка наявності полів

Спочатку можемо перевірити, що форма правильно відображається:

    it("renders login form", () => {
      render(<LoginForm />);

      expect(
        screen.getByRole("textbox", {
          name: /email/i,
        }),
      ).toBeInTheDocument();

      expect(
        screen.getByLabelText(/password/i),
      ).toBeInTheDocument();

      expect(
        screen.getByRole("button", {
          name: /login/i,
        }),
      ).toBeInTheDocument();
    });

Це базовий rendering test.

Але в `Testing Forms` нас особливо цікавить подальша взаємодія.

---

# 8. Тестування введення email

    it("allows user to enter email", async () => {
      const user = userEvent.setup();

      render(<LoginForm />);

      const email = screen.getByRole(
        "textbox",
        {
          name: /email/i,
        },
      );

      await user.type(
        email,
        "user@example.com",
      );

      expect(email).toHaveValue(
        "user@example.com",
      );
    });

---

# 9. Тестування password

Для `input[type="password"]` часто зручно використовувати `getByLabelText()`:

    const password = screen.getByLabelText(
      /password/i,
    );

    await user.type(
      password,
      "secret123",
    );

    expect(password).toHaveValue(
      "secret123",
    );

---

# 10. Повне заповнення форми

    it("allows user to fill login form", async () => {
      const user = userEvent.setup();

      render(<LoginForm />);

      const email = screen.getByRole(
        "textbox",
        {
          name: /email/i,
        },
      );

      const password =
        screen.getByLabelText(/password/i);

      await user.type(
        email,
        "user@example.com",
      );

      await user.type(
        password,
        "secret123",
      );

      expect(email).toHaveValue(
        "user@example.com",
      );

      expect(password).toHaveValue(
        "secret123",
      );
    });

---

# 11. `getByRole()` для form fields

Для доступних HTML-елементів використовуй semantic queries.

Наприклад:

    screen.getByRole("textbox");

    screen.getByRole("checkbox");

    screen.getByRole("radio");

    screen.getByRole("combobox");

    screen.getByRole("button");

Для конкретного поля:

    screen.getByRole(
      "textbox",
      {
        name: /email/i,
      },
    );

---

# 12. `getByLabelText()`

Для форм `getByLabelText()` особливо корисний.

HTML:

    <label>
      Email
      <input type="email" />
    </label>

Тест:

    const email = screen.getByLabelText(
      /email/i,
    );

Перевага:

> Ми шукаємо поле так, як його ідентифікує користувач — через label.

---

# 13. Чому label важливий

Погано:

    <input
      type="email"
      placeholder="Enter email"
    />

Краще:

    <label>
      Email
      <input type="email" />
    </label>

Або:

    <label htmlFor="email">
      Email
    </label>

    <input
      id="email"
      type="email"
    />

Тоді тест:

    screen.getByLabelText(/email/i);

---

# 14. Тестування placeholder

Якщо placeholder є важливою частиною UI:

    const input =
      screen.getByPlaceholderText(
        /enter email/i,
      );

Але для основних form fields краще мати label:

    screen.getByLabelText(/email/i);

Правило:

> `placeholder` — не заміна `label`.

---

# 15. Очищення поля

Використовуємо:

    await user.clear(input);

Наприклад:

    await user.type(
      email,
      "user@example.com",
    );

    expect(email).toHaveValue(
      "user@example.com",
    );

    await user.clear(email);

    expect(email).toHaveValue("");

---

# 16. Заміна значення

Можна очистити поле та ввести нове значення:

    await user.clear(email);

    await user.type(
      email,
      "new@example.com",
    );

    expect(email).toHaveValue(
      "new@example.com",
    );

---

# 17. Controlled input

Типовий React input:

    function Form() {
      const [email, setEmail] = useState("");

      return (
        <input
          value={email}
          onChange={(event) =>
            setEmail(event.target.value)
          }
        />
      );
    }

У тесті не потрібно перевіряти `setEmail`.

Тестуємо:

    await user.type(
      input,
      "user@example.com",
    );

    expect(input).toHaveValue(
      "user@example.com",
    );

---

# 18. Submit форми

Найтиповіша дія:

    await user.click(
      screen.getByRole("button", {
        name: /submit/i,
      }),
    );

Якщо кнопка:

    <button type="submit">
      Submit
    </button>

клік запускає submit форми.

---

# 19. Тестування `onSubmit`

Компонент:

    type LoginFormProps = {
      onSubmit: (data: {
        email: string;
        password: string;
      }) => void;
    };

    function LoginForm({
      onSubmit,
    }: LoginFormProps) {
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");

      const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>,
      ) => {
        event.preventDefault();

        onSubmit({
          email,
          password,
        });
      };

      return (
        <form onSubmit={handleSubmit}>
          <label>
            Email

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />
          </label>

          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />
          </label>

          <button type="submit">
            Login
          </button>
        </form>
      );
    }

---

# 20. Тестування submit callback

    it("submits form data", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();

      render(
        <LoginForm
          onSubmit={onSubmit}
        />,
      );

      await user.type(
        screen.getByRole("textbox", {
          name: /email/i,
        }),
        "user@example.com",
      );

      await user.type(
        screen.getByLabelText(/password/i),
        "secret123",
      );

      await user.click(
        screen.getByRole("button", {
          name: /login/i,
        }),
      );

      expect(onSubmit).toHaveBeenCalledWith({
        email: "user@example.com",
        password: "secret123",
      });
    });

---

# 21. `vi.fn()` для submit

У Vitest:

    const onSubmit = vi.fn();

Це mock function.

Після submit:

    expect(onSubmit).toHaveBeenCalled();

Або:

    expect(onSubmit).toHaveBeenCalledTimes(1);

Або:

    expect(onSubmit).toHaveBeenCalledWith({
      email: "user@example.com",
      password: "secret123",
    });

---

# 22. Перевірка кількості submit

Наприклад:

    await user.click(
      screen.getByRole("button", {
        name: /login/i,
      }),
    );

    expect(onSubmit).toHaveBeenCalledTimes(1);

Це допомагає виявити випадковий подвійний submit.

---

# 23. Validation

Форми часто перевіряють:

- required fields;
- мінімальну довжину;
- максимальну довжину;
- email;
- password;
- password confirmation;
- numeric values;
- checkbox agreement;
- business rules.

Наприклад:

    email is required

або:

    Email is invalid

---

# 24. Required field

Компонент:

    function LoginForm() {
      const [email, setEmail] = useState("");
      const [error, setError] = useState("");

      const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>,
      ) => {
        event.preventDefault();

        if (!email) {
          setError("Email is required");
          return;
        }

        setError("");
      };

      return (
        <form onSubmit={handleSubmit}>
          <label>
            Email

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />
          </label>

          <button type="submit">
            Submit
          </button>

          {error && (
            <p role="alert">
              {error}
            </p>
          )}
        </form>
      );
    }

---

# 25. Тест required validation

    it("shows error when email is empty", async () => {
      const user = userEvent.setup();

      render(<LoginForm />);

      await user.click(
        screen.getByRole("button", {
          name: /submit/i,
        }),
      );

      expect(
        screen.getByRole("alert"),
      ).toHaveTextContent(
        "Email is required",
      );
    });

---

# 26. Негативний сценарій

Це:

    User submits empty form
        ↓
    Validation runs
        ↓
    Error appears

Тест повинен перевіряти саме цей flow.

---

# 27. Позитивний сценарій

Після правильного введення:

    User enters valid email
        ↓
    User submits
        ↓
    No validation error
        ↓
    Form succeeds

Наприклад:

    it("submits valid email", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();

      render(
        <LoginForm
          onSubmit={onSubmit}
        />,
      );

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

      expect(onSubmit).toHaveBeenCalled();
    });

---

# 28. Required validation + valid value

Корисно перевіряти обидва шляхи.

### Empty

    submit
      ↓
    error

### Valid

    enter valid value
      ↓
    submit
      ↓
    success

Це дає значно кращий coverage поведінки форми.

---

# 29. Email validation

Наприклад, форма вимагає коректний email.

Тест:

    it("shows error for invalid email", async () => {
      const user = userEvent.setup();

      render(<LoginForm />);

      const email = screen.getByRole(
        "textbox",
        {
          name: /email/i,
        },
      );

      await user.type(
        email,
        "invalid-email",
      );

      await user.click(
        screen.getByRole("button", {
          name: /submit/i,
        }),
      );

      expect(
        screen.getByText(
          "Enter a valid email",
        ),
      ).toBeInTheDocument();
    });

---

# 30. Перевірка HTML constraint validation

Якщо використовується:

    <input
      type="email"
      required
    />

можна перевірити attributes:

    expect(input).toBeRequired();

Або:

    expect(input).toHaveAttribute(
      "type",
      "email",
    );

Але важливо:

> Наявність `required` сама по собі не замінює тестування поведінки всієї форми.

---

# 31. `toBeRequired()`

Для required input:

    expect(
      screen.getByRole("textbox", {
        name: /email/i,
      }),
    ).toBeRequired();

Це перевіряє HTML constraint:

    required

---

# 32. Мінімальна довжина

HTML:

    <input
      type="password"
      minLength={8}
    />

Тест attribute:

    expect(password).toHaveAttribute(
      "minlength",
      "8",
    );

Але краще також перевірити поведінку:

    await user.type(
      password,
      "123",
    );

    await user.click(
      submitButton,
    );

    expect(
      screen.getByText(
        "Password must contain at least 8 characters",
      ),
    ).toBeInTheDocument();

---

# 33. Password confirmation

Приклад сценарію:

    password:
      secret123

    confirm password:
      secret456

Результат:

    Passwords do not match

Тест:

    it("shows error when passwords do not match", async () => {
      const user = userEvent.setup();

      render(<RegisterForm />);

      await user.type(
        screen.getByLabelText(/password/i),
        "secret123",
      );

      await user.type(
        screen.getByLabelText(
          /confirm password/i,
        ),
        "secret456",
      );

      await user.click(
        screen.getByRole("button", {
          name: /register/i,
        }),
      );

      expect(
        screen.getByText(
          "Passwords do not match",
        ),
      ).toBeInTheDocument();
    });

---

# 34. Перевірка, що submit НЕ відбувся

Якщо форма невалідна:

    expect(onSubmit).not.toHaveBeenCalled();

Наприклад:

    it("does not submit invalid form", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();

      render(
        <LoginForm
          onSubmit={onSubmit}
        />,
      );

      await user.click(
        screen.getByRole("button", {
          name: /login/i,
        }),
      );

      expect(onSubmit).not.toHaveBeenCalled();
    });

Це дуже важлива перевірка.

---

# 35. Validation error + no submit

Хороший validation test часто перевіряє дві речі:

    error is visible

і:

    submit callback was not called

Наприклад:

    expect(
      screen.getByRole("alert"),
    ).toHaveTextContent(
      "Email is required",
    );

    expect(onSubmit).not.toHaveBeenCalled();

---

# 36. Помилка зникає після виправлення

Сценарій:

    empty input
        ↓
    submit
        ↓
    error

Потім:

    enter valid value
        ↓
    submit
        ↓
    error disappears

Тест:

    it("removes validation error after valid input", async () => {
      const user = userEvent.setup();

      render(<LoginForm />);

      const email = screen.getByRole(
        "textbox",
        {
          name: /email/i,
        },
      );

      await user.click(
        screen.getByRole("button", {
          name: /submit/i,
        }),
      );

      expect(
        screen.getByRole("alert"),
      ).toBeInTheDocument();

      await user.type(
        email,
        "user@example.com",
      );

      await user.click(
        screen.getByRole("button", {
          name: /submit/i,
        }),
      );

      expect(
        screen.queryByRole("alert"),
      ).not.toBeInTheDocument();
    });

---

# 37. Тестування декількох validation errors

Форма:

    Email is required
    Password is required

Тест:

    it("shows errors for empty fields", async () => {
      const user = userEvent.setup();

      render(<LoginForm />);

      await user.click(
        screen.getByRole("button", {
          name: /login/i,
        }),
      );

      expect(
        screen.getByText(
          "Email is required",
        ),
      ).toBeInTheDocument();

      expect(
        screen.getByText(
          "Password is required",
        ),
      ).toBeInTheDocument();
    });

---

# 38. Не прив'язуйся до конкретного HTML

Наприклад, якщо validation message реалізовано як:

    <p role="alert">
      Email is required
    </p>

можна тестувати:

    screen.getByRole("alert");

Це краще, ніж:

    container.querySelector(
      ".email-error",
    );

---

# 39. `role="alert"`

Для важливих validation messages зручно використовувати:

    <p role="alert">
      Email is required
    </p>

Тест:

    expect(
      screen.getByRole("alert"),
    ).toHaveTextContent(
      "Email is required",
    );

Це одночасно корисно для accessibility.

---

# 40. `aria-invalid`

Для невалідного поля:

    <input
      aria-invalid="true"
    />

Тест:

    expect(input).toHaveAttribute(
      "aria-invalid",
      "true",
    );

Але ще краще перевірити видиму validation behavior:

    expect(
      screen.getByRole("alert"),
    ).toBeInTheDocument();

---

# 41. `aria-describedby`

Поле може бути пов'язане з error message:

    <input
      aria-describedby="email-error"
      aria-invalid="true"
    />

    <p id="email-error">
      Email is invalid
    </p>

Це хороший accessibility pattern.

Тест може перевірити:

    expect(input).toHaveAttribute(
      "aria-describedby",
      "email-error",
    );

---

# 42. Checkbox у формах

Наприклад:

    <label>
      I agree to the terms

      <input
        type="checkbox"
      />
    </label>

Тест:

    const checkbox =
      screen.getByRole("checkbox", {
        name: /agree to the terms/i,
      });

    await user.click(checkbox);

    expect(checkbox).toBeChecked();

---

# 43. Required checkbox

Наприклад:

    <input
      type="checkbox"
      required
    />

Тест:

    expect(checkbox).toBeRequired();

А поведінка:

    await user.click(submitButton);

    expect(
      screen.getByText(
        "You must accept the terms",
      ),
    ).toBeInTheDocument();

---

# 44. Radio buttons у формах

Наприклад:

    <fieldset>
      <legend>Payment method</legend>

      <label>
        Card
        <input
          type="radio"
          name="payment"
          value="card"
        />
      </label>

      <label>
        Cash
        <input
          type="radio"
          name="payment"
          value="cash"
        />
      </label>
    </fieldset>

Тест:

    const card = screen.getByRole(
      "radio",
      {
        name: /card/i,
      },
    );

    await user.click(card);

    expect(card).toBeChecked();

---

# 45. Select у формах

Компонент:

    <label>
      Country

      <select>
        <option value="">
          Choose country
        </option>

        <option value="ua">
          Ukraine
        </option>

        <option value="pl">
          Poland
        </option>
      </select>
    </label>

Тест:

    const country = screen.getByRole(
      "combobox",
      {
        name: /country/i,
      },
    );

    await user.selectOptions(
      country,
      "ua",
    );

    expect(country).toHaveValue("ua");

---

# 46. Перевірка submit після select

    await user.selectOptions(
      country,
      "ua",
    );

    await user.click(
      screen.getByRole("button", {
        name: /submit/i,
      }),
    );

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        country: "ua",
      }),
    );

---

# 47. Disabled submit button

Форма може блокувати submit:

    <button
      type="submit"
      disabled={!isValid}
    >
      Submit
    </button>

Тест:

    const button = screen.getByRole(
      "button",
      {
        name: /submit/i,
      },
    );

    expect(button).toBeDisabled();

Після заповнення:

    await user.type(
      input,
      "valid value",
    );

    expect(button).not.toBeDisabled();

---

# 48. Loading state

Після submit форма може перейти у:

    submitting
        ↓
    loading
        ↓
    success

Наприклад:

    <button
      type="submit"
      disabled={isSubmitting}
    >
      {isSubmitting
        ? "Submitting..."
        : "Submit"}
    </button>

Тест:

    await user.click(
      screen.getByRole("button", {
        name: /submit/i,
      }),
    );

    expect(
      screen.getByRole("button", {
        name: /submitting/i,
      }),
    ).toBeDisabled();

---

# 49. Success state

Наприклад:

    await user.click(
      screen.getByRole("button", {
        name: /submit/i,
      }),
    );

    expect(
      await screen.findByText(
        "Form submitted successfully",
      ),
    ).toBeInTheDocument();

Для асинхронного success state:

    findBy...

часто є найзручнішим варіантом.

---

# 50. Error state після submit

Наприклад:

    await user.click(
      screen.getByRole("button", {
        name: /submit/i,
      }),
    );

    expect(
      await screen.findByRole("alert"),
    ).toHaveTextContent(
      "Something went wrong",
    );

Детальне mocking API буде розглядатися в:

    06-mocking-api

---

# 51. Async form

Форма може мати:

    user input
        ↓
    submit
        ↓
    async operation
        ↓
    success/error

Тест:

    it("shows success after submit", async () => {
      const user = userEvent.setup();

      render(<Form />);

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

      expect(
        await screen.findByText(
          "Success",
        ),
      ).toBeInTheDocument();
    });

---

# 52. `findBy...` після submit

Якщо результат з'являється не одразу:

    await user.click(submitButton);

    expect(
      await screen.findByText("Success"),
    ).toBeInTheDocument();

Не потрібно одразу писати:

    await waitFor(() => {
      expect(
        screen.getByText("Success"),
      ).toBeInTheDocument();
    });

Якщо `findBy...` достатньо, він простіший.

---

# 53. `waitFor` у form tests

`waitFor` корисний, коли потрібно чекати певну асинхронну умову.

Наприклад:

    await user.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalled();
    });

Але якщо можна використати:

    expect(
      await screen.findByText("Success"),
    ).toBeInTheDocument();

краще використовувати простіший варіант.

---

# 54. Тестування reset

Якщо форма має reset:

    <button type="reset">
      Reset
    </button>

Тест:

    it("resets form", async () => {
      const user = userEvent.setup();

      render(<Form />);

      const input = screen.getByRole(
        "textbox",
        {
          name: /name/i,
        },
      );

      await user.type(
        input,
        "Valeriy",
      );

      expect(input).toHaveValue(
        "Valeriy",
      );

      await user.click(
        screen.getByRole("button", {
          name: /reset/i,
        }),
      );

      expect(input).toHaveValue("");
    });

---

# 55. Тестування form reset після submit

Іноді форма очищається після успішного submit:

    submit
      ↓
    success
      ↓
    inputs reset

Тест:

    await user.type(
      input,
      "React",
    );

    await user.click(
      submitButton,
    );

    expect(input).toHaveValue("");

---

# 56. Form validation на blur

Деякі форми перевіряють поле після втрати focus.

Наприклад:

    user types invalid email
        ↓
    user leaves input
        ↓
    validation error appears

Тест:

    const email = screen.getByRole(
      "textbox",
      {
        name: /email/i,
      },
    );

    await user.type(
      email,
      "invalid",
    );

    await user.tab();

    expect(
      screen.getByText(
        "Enter a valid email",
      ),
    ).toBeInTheDocument();

---

# 57. Form validation on change

Деякі форми перевіряють значення під час введення.

Сценарій:

    type invalid value
        ↓
    error appears

Після виправлення:

    type valid value
        ↓
    error disappears

Тест:

    await user.type(
      email,
      "invalid",
    );

    expect(
      screen.getByText(
        "Enter a valid email",
      ),
    ).toBeInTheDocument();

    await user.clear(email);

    await user.type(
      email,
      "user@example.com",
    );

    expect(
      screen.queryByText(
        "Enter a valid email",
      ),
    ).not.toBeInTheDocument();

---

# 58. Validation on submit vs validation on change

Це різні сценарії.

### On submit

    enter invalid data
        ↓
    click submit
        ↓
    error

### On change

    enter invalid data
        ↓
    error appears immediately

### On blur

    enter invalid data
        ↓
    leave field
        ↓
    error

Тести повинні відповідати реальній поведінці компонента.

---

# 59. Тестування multiple fields

Наприклад:

    Name
    Email
    Password
    Confirm password

Не обов'язково перевіряти кожну клавішу.

Краще перевірити сценарій:

    fill required fields
        ↓
    submit
        ↓
    expected result

Наприклад:

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

    await user.type(
      screen.getByLabelText(/password/i),
      "secret123",
    );

---

# 60. Перевірка помилки конкретного поля

Якщо є багато помилок:

    Email is required
    Password is required

краще прив'язати error до конкретного поля через accessibility attributes.

Наприклад:

    <input
      aria-describedby="email-error"
      aria-invalid="true"
    />

    <p id="email-error">
      Email is required
    </p>

Тоді тест може перевіряти зв'язок:

    expect(email).toHaveAttribute(
      "aria-describedby",
      "email-error",
    );

---

# 61. Тестування password visibility

Форма:

    password input
        +
    Show password button

Тест:

    it("toggles password visibility", async () => {
      const user = userEvent.setup();

      render(<PasswordField />);

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

# 62. Тестування form submit через Enter

Користувач може відправити форму клавішею Enter.

Тест:

    it("submits form with Enter", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();

      render(
        <LoginForm
          onSubmit={onSubmit}
        />,
      );

      const email = screen.getByRole(
        "textbox",
        {
          name: /email/i,
        },
      );

      await user.type(
        email,
        "user@example.com",
      );

      await user.keyboard("{Enter}");

      expect(onSubmit).toHaveBeenCalled();
    });

---

# 63. Не припускай, що submit працює тільки через кнопку

Реальний користувач може:

- натиснути кнопку;
- натиснути Enter;
- використовувати клавіатуру.

Якщо це важлива поведінка форми, її варто протестувати.

---

# 64. Accessibility у form tests

Форми особливо тісно пов'язані з accessibility.

Перевіряй:

- label;
- accessible name;
- role;
- required;
- disabled;
- error message;
- focus;
- `aria-invalid`;
- `aria-describedby`.

Наприклад:

    expect(
      screen.getByRole("textbox", {
        name: /email/i,
      }),
    ).toBeInTheDocument();

Це краще, ніж:

    container.querySelector(
      "#email",
    );

---

# 65. Accessible error message

Хороший варіант:

    <p role="alert">
      Email is required
    </p>

Тест:

    expect(
      screen.getByRole("alert"),
    ).toHaveTextContent(
      "Email is required",
    );

---

# 66. Accessible form structure

Хороша форма:

    <form>
      <label htmlFor="email">
        Email
      </label>

      <input
        id="email"
        type="email"
      />

      <button type="submit">
        Submit
      </button>
    </form>

Тест:

    const email = screen.getByRole(
      "textbox",
      {
        name: /email/i,
      },
    );

    const button = screen.getByRole(
      "button",
      {
        name: /submit/i,
      },
    );

---

# 67. Form role

HTML:

    <form>
      ...
    </form>

У деяких випадках form можна знайти за:

    screen.getByRole("form");

Але доступність `form` залежить від accessible name та структури документа.

Для конкретних полів краще використовувати:

    getByRole()

    getByLabelText()

---

# 68. `name` для form controls

Для interaction tests особливо важливий accessible name.

Наприклад:

    screen.getByRole(
      "button",
      {
        name: /register/i,
      },
    );

або:

    screen.getByRole(
      "textbox",
      {
        name: /email/i,
      },
    );

Це робить тест максимально наближеним до реальної взаємодії користувача.

---

# 69. Test IDs у формах

Іноді складний компонент неможливо зручно знайти через semantic queries.

Тоді можна:

    <div data-testid="registration-form">
      ...
    </div>

Тест:

    screen.getByTestId(
      "registration-form",
    );

Але для полів форми краще:

    getByRole()

    getByLabelText()

`data-testid` — запасний інструмент.

---

# 70. Не перевіряй CSS validation state без потреби

Наприклад, замість:

    expect(input).toHaveClass(
      "input-error",
    );

краще перевірити:

    expect(input).toHaveAttribute(
      "aria-invalid",
      "true",
    );

та:

    expect(
      screen.getByRole("alert"),
    ).toBeInTheDocument();

CSS може змінитися, а поведінка форми залишитися тією самою.

---

# 71. Тестування form state через UI

Якщо форма має:

    isSubmitting
    isValid
    errors
    values

не потрібно безпосередньо перевіряти ці змінні.

Перевіряємо їх прояв у UI.

Наприклад:

    isSubmitting
        ↓
    button disabled
        +
    "Submitting..." text

Тест:

    expect(button).toBeDisabled();

    expect(button).toHaveTextContent(
      "Submitting...",
    );

---

# 72. Form test як user story

Дуже корисно писати тест як маленьку user story:

    User opens registration form.

    User enters name.

    User enters email.

    User enters password.

    User accepts terms.

    User clicks Register.

    User sees success message.

У тесті:

    it("allows user to register", async () => {
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

      await user.type(
        screen.getByLabelText(/password/i),
        "secret123",
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
        screen.getByText(
          "Registration successful",
        ),
      ).toBeInTheDocument();
    });

---

# 73. Happy path

**Happy path** — правильний сценарій:

    valid input
        ↓
    submit
        ↓
    success

Наприклад:

    it("submits valid registration", async () => {
      // valid data
      // submit
      // success
    });

---

# 74. Error path

**Error path** — сценарій з помилкою:

    invalid input
        ↓
    submit
        ↓
    error

Наприклад:

    it("shows validation errors", async () => {
      // invalid data
      // submit
      // error
    });

---

# 75. Edge cases

Форми часто мають edge cases.

Наприклад:

- порожній рядок;
- тільки пробіли;
- дуже довгий текст;
- неправильний email;
- короткий password;
- різні password;
- unchecked required checkbox;
- невибраний select option.

Приклад:

    await user.type(
      input,
      "   ",
    );

    await user.click(
      submitButton,
    );

    expect(
      screen.getByRole("alert"),
    ).toBeInTheDocument();

---

# 76. Не тестуй кожен можливий символ

Не потрібно робити десятки тестів:

    "a"

    "ab"

    "abc"

    "abcd"

якщо поведінка однакова.

Тестуй значущі boundary cases:

    empty

    minimum valid

    below minimum

    maximum valid

    above maximum

    invalid format

---

# 77. Boundary testing

Наприклад, password має мінімум 8 символів.

Тоді корисні сценарії:

    7 characters
        ↓
    error

    8 characters
        ↓
    valid

Не обов'язково тестувати:

    1
    2
    3
    4
    5
    6
    7

---

# 78. Тестування form reset після error

Сценарій:

    submit empty
        ↓
    error

    fill field
        ↓
    submit
        ↓
    success

Такий тест корисний, якщо форма повинна дозволяти користувачу виправити помилки.

---

# 79. Не дублюй однакові interaction tests

Погано:

    test 1:
      type email
      check email

    test 2:
      type email
      check email

    test 3:
      type email
      check email

Краще мати один чіткий тест на введення і використовувати це як частину більших сценаріїв лише там, де це необхідно.

---

# 80. Helper function для заповнення форми

Якщо форма велика, можна створити helper:

    async function fillLoginForm(
      user: ReturnType<typeof userEvent.setup>,
    ) {
      await user.type(
        screen.getByRole("textbox", {
          name: /email/i,
        }),
        "user@example.com",
      );

      await user.type(
        screen.getByLabelText(/password/i),
        "secret123",
      );
    }

Тоді:

    it("submits valid form", async () => {
      const user = userEvent.setup();

      render(<LoginForm />);

      await fillLoginForm(user);

      await user.click(
        screen.getByRole("button", {
          name: /login/i,
        }),
      );

      expect(
        screen.getByText("Welcome"),
      ).toBeInTheDocument();
    });

Не потрібно створювати helpers занадто рано.

Спочатку краще написати простий тест.

---

# 81. Коли helper корисний

Helper доречний, якщо:

- форма велика;
- однакове заповнення повторюється;
- багато тестів використовують один valid state;
- helper робить тест коротшим і зрозумілішим.

Helper не потрібен, якщо він приховує основну поведінку тесту.

---

# 82. Не приховуй важливі user actions

Погано:

    await fillEverything();

    await submitEverything();

Незрозуміло, що саме робить користувач.

Краще:

    await user.type(
      email,
      "user@example.com",
    );

    await user.type(
      password,
      "secret123",
    );

    await user.click(
      submitButton,
    );

Тест читається як user story.

---

# 83. Тестування form submission з callback

Корисний універсальний шаблон:

    it("submits form data", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();

      render(
        <Form
          onSubmit={onSubmit}
        />,
      );

      await user.type(
        screen.getByLabelText(/name/i),
        "Valeriy",
      );

      await user.click(
        screen.getByRole("button", {
          name: /submit/i,
        }),
      );

      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          name: "Valeriy",
        }),
      );
    });

---

# 84. `expect.objectContaining()`

Коли callback отримує великий об'єкт:

    {
      name: "Valeriy",
      email: "user@example.com",
      age: 56,
      country: "UA",
      ...
    }

не обов'язково перевіряти все.

Можна:

    expect(onSubmit).toHaveBeenCalledWith(
      expect.objectContaining({
        email: "user@example.com",
      }),
    );

Це робить тест менш крихким.

---

# 85. Тестування checkbox + submit

Сценарій:

    checkbox unchecked
        ↓
    submit blocked

Після:

    checkbox checked
        ↓
    submit allowed

Тест:

    it("requires terms acceptance", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();

      render(
        <RegistrationForm
          onSubmit={onSubmit}
        />,
      );

      await user.click(
        screen.getByRole("button", {
          name: /register/i,
        }),
      );

      expect(onSubmit).not.toHaveBeenCalled();

      expect(
        screen.getByText(
          "You must accept the terms",
        ),
      ).toBeInTheDocument();

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

      expect(onSubmit).toHaveBeenCalled();
    });

---

# 86. Form interaction + disabled state

Корисний сценарій:

    invalid form
        ↓
    submit disabled

    valid form
        ↓
    submit enabled

Тест:

    expect(
      screen.getByRole("button", {
        name: /submit/i,
      }),
    ).toBeDisabled();

    await user.type(
      email,
      "user@example.com",
    );

    expect(
      screen.getByRole("button", {
        name: /submit/i,
      }),
    ).not.toBeDisabled();

---

# 87. Тестування форми з кількома станами

Типова state machine:

    EMPTY
      ↓
    INVALID
      ↓
    VALID
      ↓
    SUBMITTING
      ↓
    SUCCESS

або:

    SUBMITTING
        ↓
      ERROR

Тести повинні покривати важливі переходи між цими станами.

---

# 88. Form testing та integration testing

Не плутай:

### Component form test

    render(<LoginForm />)
        ↓
    user fills form
        ↓
    submit
        ↓
    callback/UI

### Integration test

    Form
      ↓
    API
      ↓
    Server response
      ↓
    UI

Integration tests будуть розглядатися окремо в:

    07-integration-tests

---

# 89. Form testing та API mocking

У цьому розділі можна тестувати:

    submit
        ↓
    loading
        ↓
    success/error UI

Але детальне моделювання:

    fetch
    API response
    network error
    server error

краще винести в:

    06-mocking-api

---

# 90. Не роби form tests надто великими

Погано:

    test everything about registration form

Один тест перевіряє:

- rendering;
- typing;
- validation;
- checkbox;
- select;
- API;
- error;
- success;
- reset;
- redirect.

Краще розділити:

    renders form

    allows user to enter data

    shows validation error

    submits valid data

    shows server error

    shows success state

---

# 91. Один тест — одна основна поведінка

Наприклад:

    it("shows validation error for empty email", ...);

    it("allows user to enter email", ...);

    it("submits valid form", ...);

    it("shows success message after submit", ...);

Такі назви одразу пояснюють, що тестуємо.

---

# 92. Хороші назви тестів

Добре:

    it("shows email error when email is empty", ...);

    it("allows user to enter password", ...);

    it("submits form with valid data", ...);

    it("does not submit invalid form", ...);

    it("resets form after successful submission", ...);

Погано:

    it("works", ...);

    it("form test", ...);

    it("test submit", ...);

---

# 93. Повний приклад RegistrationForm

Компонент:

    type RegistrationFormProps = {
      onSubmit: (data: {
        name: string;
        email: string;
        password: string;
      }) => void;
    };

    function RegistrationForm({
      onSubmit,
    }: RegistrationFormProps) {
      const [name, setName] = useState("");
      const [email, setEmail] = useState("");
      const [password, setPassword] = useState("");
      const [error, setError] = useState("");

      const handleSubmit = (
        event: React.FormEvent<HTMLFormElement>,
      ) => {
        event.preventDefault();

        if (!name.trim()) {
          setError("Name is required");
          return;
        }

        if (!email.trim()) {
          setError("Email is required");
          return;
        }

        if (password.length < 8) {
          setError(
            "Password must contain at least 8 characters",
          );
          return;
        }

        setError("");

        onSubmit({
          name,
          email,
          password,
        });
      };

      return (
        <form onSubmit={handleSubmit}>
          <label>
            Name

            <input
              value={name}
              onChange={(event) =>
                setName(event.target.value)
              }
            />
          </label>

          <label>
            Email

            <input
              type="email"
              value={email}
              onChange={(event) =>
                setEmail(event.target.value)
              }
            />
          </label>

          <label>
            Password

            <input
              type="password"
              value={password}
              onChange={(event) =>
                setPassword(event.target.value)
              }
            />
          </label>

          <button type="submit">
            Register
          </button>

          {error && (
            <p role="alert">
              {error}
            </p>
          )}
        </form>
      );
    }

---

# 94. Тест empty form

    it("shows validation error for empty form", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();

      render(
        <RegistrationForm
          onSubmit={onSubmit}
        />,
      );

      await user.click(
        screen.getByRole("button", {
          name: /register/i,
        }),
      );

      expect(
        screen.getByRole("alert"),
      ).toHaveTextContent(
        "Name is required",
      );

      expect(onSubmit).not.toHaveBeenCalled();
    });

---

# 95. Тест invalid password

    it("rejects short password", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();

      render(
        <RegistrationForm
          onSubmit={onSubmit}
        />,
      );

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

      await user.type(
        screen.getByLabelText(/password/i),
        "123",
      );

      await user.click(
        screen.getByRole("button", {
          name: /register/i,
        }),
      );

      expect(
        screen.getByRole("alert"),
      ).toHaveTextContent(
        "Password must contain at least 8 characters",
      );

      expect(onSubmit).not.toHaveBeenCalled();
    });

---

# 96. Тест valid registration

    it("submits valid registration data", async () => {
      const user = userEvent.setup();
      const onSubmit = vi.fn();

      render(
        <RegistrationForm
          onSubmit={onSubmit}
        />,
      );

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

      await user.type(
        screen.getByLabelText(/password/i),
        "secret123",
      );

      await user.click(
        screen.getByRole("button", {
          name: /register/i,
        }),
      );

      expect(onSubmit).toHaveBeenCalledWith({
        name: "Valeriy",
        email: "user@example.com",
        password: "secret123",
      });
    });

---

# 97. Що перевіряє хороший form test

Хороший тест відповідає на питання:

> Чи може реальний користувач успішно взаємодіяти з формою?

Наприклад:

    Can user find field?
        ↓
    Can user enter data?
        ↓
    Can user submit?
        ↓
    Does validation work?
        ↓
    Does UI show correct result?

---

# 98. Основні категорії form tests

## Rendering

    fields are visible

## Input

    user can type

## Selection

    user can select option

## Checkbox

    user can check/uncheck

## Validation

    invalid data produces error

## Submit

    valid data is submitted

## Negative submit

    invalid data is rejected

## Loading

    button becomes disabled

## Success

    success UI appears

## Error

    error UI appears

## Reset

    form returns to initial state

---

# 99. Практичний алгоритм

Коли тестуєш форму:

### Крок 1

Render:

    render(<Form />);

### Крок 2

Create user:

    const user = userEvent.setup();

### Крок 3

Find fields:

    screen.getByRole(...)

    screen.getByLabelText(...)

### Крок 4

Fill fields:

    await user.type(...);

### Крок 5

Interact:

    await user.click(...);

### Крок 6

Check validation:

    expect(...)

### Крок 7

Check submit:

    expect(onSubmit).toHaveBeenCalled(...);

### Крок 8

Check visible result:

    expect(
      screen.getByText(...),
    ).toBeInTheDocument();

---

# 100. Що не треба робити

Не потрібно:

- тестувати React `useState`;
- тестувати `setState`;
- тестувати внутрішні handler-и;
- перевіряти кожну клавішу окремо;
- використовувати CSS selectors без необхідності;
- зловживати `data-testid`;
- перевіряти implementation details;
- робити один величезний test для всієї форми;
- використовувати `waitFor` там, де достатньо `findBy...`;
- використовувати `fireEvent` для звичайних user interactions.

---

# 101. Основні правила

1. **Створюй `user` через `userEvent.setup()`.**

       const user = userEvent.setup();

2. **Взаємодії виконуй через `await`.**

       await user.type(input, "React");

       await user.click(button);

3. **Шукай поля через accessible queries.**

       getByRole()

       getByLabelText()

4. **Тестуй поведінку користувача, а не state.**

5. **Для validation перевіряй видиму помилку.**

6. **Для invalid form перевіряй, що submit не відбувся.**

       expect(onSubmit).not.toHaveBeenCalled();

7. **Для valid form перевіряй submit.**

       expect(onSubmit).toHaveBeenCalledWith(...);

8. **Для async result використовуй `findBy...`.**

9. **Перевіряй accessibility form controls.**

10. **Один тест — одна основна поведінка.**

---

# 102. Коротка шпаргалка

## Render

    render(<Form />);

## User

    const user = userEvent.setup();

## Find input

    screen.getByRole(
      "textbox",
      {
        name: /email/i,
      },
    );

## Find by label

    screen.getByLabelText(
      /password/i,
    );

## Type

    await user.type(
      input,
      "React",
    );

## Clear

    await user.clear(input);

## Checkbox

    await user.click(checkbox);

    expect(checkbox).toBeChecked();

## Select

    await user.selectOptions(
      select,
      "ua",
    );

## Submit

    await user.click(
      screen.getByRole("button", {
        name: /submit/i,
      }),
    );

## Input value

    expect(input).toHaveValue(
      "React",
    );

## Required

    expect(input).toBeRequired();

## Disabled

    expect(button).toBeDisabled();

## Error

    expect(
      screen.getByRole("alert"),
    ).toHaveTextContent(
      "Email is required",
    );

## No submit

    expect(onSubmit).not.toHaveBeenCalled();

## Submit callback

    expect(onSubmit).toHaveBeenCalled();

## Submit arguments

    expect(onSubmit).toHaveBeenCalledWith({
      email: "user@example.com",
    });

## Async success

    expect(
      await screen.findByText("Success"),
    ).toBeInTheDocument();

---

# 103. Головна формула Testing Forms

    render form
        ↓
    find fields
        ↓
    user fills fields
        ↓
    user submits
        ↓
    validation
        ↓
    success / error
        ↓
    assert visible behavior

---

# 104. Найважливіше для Junior React Developer

Ти повинен впевнено вміти написати тест, у якому:

    const user = userEvent.setup();

    render(<LoginForm />);

    await user.type(
      screen.getByRole("textbox", {
        name: /email/i,
      }),
      "user@example.com",
    );

    await user.type(
      screen.getByLabelText(/password/i),
      "secret123",
    );

    await user.click(
      screen.getByRole("button", {
        name: /login/i,
      }),
    );

    expect(
      screen.getByText("Welcome"),
    ).toBeInTheDocument();

І окремо:

    invalid data
        ↓
    submit
        ↓
    validation error

Наприклад:

    expect(
      screen.getByRole("alert"),
    ).toHaveTextContent(
      "Email is required",
    );

---

# 105. Що потрібно запам'ятати перед наступними темами

    03-user-interactions
        ↓
    userEvent

    04-testing-forms
        ↓
    userEvent + validation + submit

    05-testing-hooks
        ↓
    hooks behavior

    06-mocking-api
        ↓
    API/network behavior

    07-integration-tests
        ↓
    several parts working together

---

# 106. Головна ідея

> **Тестуй форму так, як нею користується людина.**

Не:

    setEmail(...)
    setPassword(...)
    setErrors(...)

А:

    user types email
        ↓
    user types password
        ↓
    user clicks submit
        ↓
    validation runs
        ↓
    user sees success/error

Саме такий підхід робить React Testing Library-тести стійкими до змін внутрішньої реалізації компонента.