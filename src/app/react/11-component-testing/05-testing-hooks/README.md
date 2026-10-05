# 05. Testing Hooks

> Тестування React Hooks за допомогою **React Testing Library**, `renderHook`, `act`, `userEvent`, `Vitest` та `jest-dom`.

---

# 1. Що таке Testing Hooks

**Testing Hooks** — це перевірка поведінки власних React Hooks окремо від повного компонента.

Наприклад, ми можемо мати:

    useCounter()

    useToggle()

    useForm()

    useLocalStorage()

    useDebounce()

    useFetch()

    useAuth()

І хочемо перевірити, що Hook:

- правильно повертає початкове значення;
- правильно змінює state;
- правильно реагує на виклики функцій;
- правильно працює з props;
- правильно виконує side effects;
- правильно реагує на зміни dependencies;
- правильно очищає resources;
- правильно обробляє edge cases.

---

# 2. Основна ідея

Для компонентів:

    render(<Component />)
        ↓
    interact
        ↓
    assert UI

Для custom Hooks:

    renderHook(() => useCustomHook())
        ↓
    call returned function
        ↓
    assert result.current

Наприклад:

    const { result } = renderHook(
      () => useCounter(),
    );

    expect(result.current.count).toBe(0);

---

# 3. Що таке `renderHook()`

`renderHook()` дозволяє запустити Hook у спеціальному тестовому середовищі.

Приклад:

    import { renderHook } from "@testing-library/react";

    const { result } = renderHook(
      () => useCounter(),
    );

Після цього:

    result.current

містить поточне значення, яке повертає Hook.

---

# 4. Простий custom Hook

Hook:

    function useCounter() {
      const [count, setCount] = useState(0);

      const increment = () => {
        setCount((value) => value + 1);
      };

      const decrement = () => {
        setCount((value) => value - 1);
      };

      return {
        count,
        increment,
        decrement,
      };
    }

---

# 5. Перший тест Hook

    import {
      renderHook,
    } from "@testing-library/react";

    import {
      describe,
      expect,
      it,
    } from "vitest";

    describe("useCounter", () => {
      it("returns initial count", () => {
        const { result } = renderHook(
          () => useCounter(),
        );

        expect(result.current.count).toBe(0);
      });
    });

---

# 6. `result.current`

Найважливіша властивість:

    result.current

Якщо Hook повертає:

    {
      count: 0,
      increment: function,
      decrement: function,
    }

то:

    result.current.count

дасть:

    0

А:

    result.current.increment

дасть функцію.

---

# 7. Тестування функції Hook

Маємо:

    result.current.increment();

Після цього state зміниться.

Тому:

    act(() => {
      result.current.increment();
    });

    expect(
      result.current.count,
    ).toBe(1);

---

# 8. Що таке `act()`

`act()` повідомляє React:

> Виконується дія, яка може змінити state або викликати React update.

Ідея:

    action
      ↓
    React state update
      ↓
    React re-render
      ↓
    assertion

Наприклад:

    act(() => {
      result.current.increment();
    });

    expect(result.current.count).toBe(1);

---

# 9. Імпорт `act`

У сучасному React Testing Library:

    import {
      act,
      renderHook,
    } from "@testing-library/react";

У багатьох звичайних тестах `act()` може не знадобитися явно, тому що Testing Library сама обробляє його в user interactions.

Але для прямого виклику функцій, які змінюють Hook state, `act()` є важливим.

---

# 10. Повний тест `useCounter`

    import {
      act,
      renderHook,
    } from "@testing-library/react";

    import {
      describe,
      expect,
      it,
    } from "vitest";

    describe("useCounter", () => {
      it("increments counter", () => {
        const { result } = renderHook(
          () => useCounter(),
        );

        expect(result.current.count).toBe(0);

        act(() => {
          result.current.increment();
        });

        expect(result.current.count).toBe(1);
      });
    });

---

# 11. Тестування decrement

    it("decrements counter", () => {
      const { result } = renderHook(
        () => useCounter(),
      );

      act(() => {
        result.current.decrement();
      });

      expect(
        result.current.count,
      ).toBe(-1);
    });

---

# 12. Кілька state updates

Можна виконати декілька дій:

    act(() => {
      result.current.increment();
      result.current.increment();
      result.current.increment();
    });

    expect(
      result.current.count,
    ).toBe(3);

---

# 13. Краще тестувати поведінку, а не реалізацію

Погано:

    expect(setCount).toHaveBeenCalled();

Ми не повинні тестувати внутрішню реалізацію Hook.

Краще:

    act(() => {
      result.current.increment();
    });

    expect(
      result.current.count,
    ).toBe(1);

Тестуємо observable behavior.

---

# 14. Hook з initial value

Hook:

    function useCounter(
      initialValue = 0,
    ) {
      const [count, setCount] =
        useState(initialValue);

      const increment = () => {
        setCount((value) => value + 1);
      };

      return {
        count,
        increment,
      };
    }

Тест:

    it("uses initial value", () => {
      const { result } = renderHook(
        () => useCounter(10),
      );

      expect(
        result.current.count,
      ).toBe(10);
    });

---

# 15. Тестування різних initial values

    it("supports custom initial value", () => {
      const { result } = renderHook(
        () => useCounter(100),
      );

      expect(
        result.current.count,
      ).toBe(100);
    });

---

# 16. Hook з options

Наприклад:

    type UseCounterOptions = {
      initialValue?: number;
      step?: number;
    };

    function useCounter({
      initialValue = 0,
      step = 1,
    }: UseCounterOptions = {}) {
      const [count, setCount] =
        useState(initialValue);

      const increment = () => {
        setCount(
          (value) => value + step,
        );
      };

      return {
        count,
        increment,
      };
    }

Тест:

    const { result } = renderHook(
      () =>
        useCounter({
          initialValue: 10,
          step: 5,
        }),
    );

    expect(
      result.current.count,
    ).toBe(10);

---

# 17. Перевірка step

    act(() => {
      result.current.increment();
    });

    expect(
      result.current.count,
    ).toBe(15);

---

# 18. `renderHook()` з props

`renderHook()` може отримати props.

Наприклад:

    const { result } = renderHook(
      ({ step }) =>
        useCounter({
          step,
        }),
      {
        initialProps: {
          step: 5,
        },
      },
    );

Тут:

    initialProps

передаються в callback:

    ({ step }) => useCounter({ step })

---

# 19. Тестування Hook з props

    it("uses props", () => {
      const { result } = renderHook(
        ({ step }) =>
          useCounter({ step }),
        {
          initialProps: {
            step: 5,
          },
        },
      );

      act(() => {
        result.current.increment();
      });

      expect(
        result.current.count,
      ).toBe(5);
    });

---

# 20. `rerender()`

`renderHook()` повертає:

    rerender()

Його можна використовувати для зміни props.

Наприклад:

    const { result, rerender } =
      renderHook(
        ({ step }) =>
          useCounter({ step }),
        {
          initialProps: {
            step: 1,
          },
        },
      );

Потім:

    rerender({
      step: 5,
    });

---

# 21. Тестування зміни props

    it("reacts to changed props", () => {
      const { result, rerender } =
        renderHook(
          ({ value }) => useValue(value),
          {
            initialProps: {
              value: "first",
            },
          },
        );

      expect(
        result.current,
      ).toBe("first");

      rerender({
        value: "second",
      });

      expect(
        result.current,
      ).toBe("second");
    });

---

# 22. `rerender()` не означає reset

Важливо розрізняти:

    rerender()

і:

    renderHook()

`rerender()` повторно рендерить той самий Hook instance.

State може зберігатися.

Новий:

    renderHook()

створює новий test instance.

---

# 23. Hook зі state + props

Наприклад:

    function useCounter(step: number) {
      const [count, setCount] =
        useState(0);

      const increment = () => {
        setCount(
          (value) => value + step,
        );
      };

      return {
        count,
        increment,
      };
    }

Тест:

    const { result, rerender } =
      renderHook(
        ({ step }) =>
          useCounter(step),
        {
          initialProps: {
            step: 1,
          },
        },
      );

    act(() => {
      result.current.increment();
    });

    expect(
      result.current.count,
    ).toBe(1);

    rerender({
      step: 10,
    });

    act(() => {
      result.current.increment();
    });

    expect(
      result.current.count,
    ).toBe(11);

---

# 24. `useState` Hook

Custom Hook:

    function useToggle(
      initialValue = false,
    ) {
      const [isOn, setIsOn] =
        useState(initialValue);

      const toggle = () => {
        setIsOn((value) => !value);
      };

      return {
        isOn,
        toggle,
      };
    }

Тест:

    const { result } = renderHook(
      () => useToggle(),
    );

    expect(result.current.isOn)
      .toBe(false);

---

# 25. Тестування toggle

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOn)
      .toBe(true);

    act(() => {
      result.current.toggle();
    });

    expect(result.current.isOn)
      .toBe(false);

---

# 26. `useReducer`

Custom Hook:

    function useCounter() {
      const [count, dispatch] =
        useReducer(
          (state: number, action: string) => {
            switch (action) {
              case "increment":
                return state + 1;

              case "decrement":
                return state - 1;

              default:
                return state;
            }
          },
          0,
        );

      return {
        count,
        increment: () =>
          dispatch("increment"),
        decrement: () =>
          dispatch("decrement"),
      };
    }

Тестуємо так само:

    const { result } = renderHook(
      () => useCounter(),
    );

    act(() => {
      result.current.increment();
    });

    expect(result.current.count)
      .toBe(1);

---

# 27. `useMemo`

Якщо Hook використовує `useMemo`, зазвичай не потрібно тестувати сам факт використання `useMemo`.

Погано:

    expect(useMemo).toHaveBeenCalled();

Краще тестувати результат:

    expect(result.current.total)
      .toBe(100);

Оптимізація — implementation detail.

---

# 28. `useCallback`

Так само не потрібно тестувати:

    useCallback(...)

сам по собі.

Перевіряємо behavior функції:

    act(() => {
      result.current.addItem("React");
    });

    expect(
      result.current.items,
    ).toContain("React");

---

# 29. `useEffect`

Hook:

    function useDocumentTitle(
      title: string,
    ) {
      useEffect(() => {
        document.title = title;
      }, [title]);
    }

Тест:

    it("updates document title", () => {
      renderHook(
        () =>
          useDocumentTitle(
            "React",
          ),
      );

      expect(document.title)
        .toBe("React");
    });

---

# 30. `useEffect` з dependencies

Hook:

    function useDocumentTitle(
      title: string,
    ) {
      useEffect(() => {
        document.title = title;
      }, [title]);
    }

Тест:

    const { rerender } =
      renderHook(
        ({ title }) =>
          useDocumentTitle(title),
        {
          initialProps: {
            title: "First",
          },
        },
      );

    expect(document.title)
      .toBe("First");

    rerender({
      title: "Second",
    });

    expect(document.title)
      .toBe("Second");

---

# 31. Що тестувати в `useEffect`

Не:

    effect was called

А:

    effect changed something

Наприклад:

    Hook updates document.title

або:

    Hook subscribes to event

або:

    Hook fetches data

або:

    Hook cleans up subscription

---

# 32. Cleanup у `useEffect`

Hook:

    function useWindowWidth() {
      const [width, setWidth] =
        useState(window.innerWidth);

      useEffect(() => {
        const handleResize = () => {
          setWidth(window.innerWidth);
        };

        window.addEventListener(
          "resize",
          handleResize,
        );

        return () => {
          window.removeEventListener(
            "resize",
            handleResize,
          );
        };
      }, []);

      return width;
    }

---

# 33. Тестування event listener

Для cleanup можна використати spy:

    const addSpy =
      vi.spyOn(
        window,
        "addEventListener",
      );

    const removeSpy =
      vi.spyOn(
        window,
        "removeEventListener",
      );

    const { unmount } =
      renderHook(
        () => useWindowWidth(),
      );

    expect(addSpy)
      .toHaveBeenCalled();

    unmount();

    expect(removeSpy)
      .toHaveBeenCalled();

---

# 34. `unmount()`

`renderHook()` повертає:

    unmount()

Він видаляє Hook.

Наприклад:

    const { unmount } =
      renderHook(
        () => useWindowWidth(),
      );

    unmount();

Після `unmount()` повинні виконатися cleanup functions.

---

# 35. Cleanup test

Типовий сценарій:

    renderHook()
        ↓
    effect subscribes
        ↓
    unmount()
        ↓
    cleanup runs

Наприклад:

    const cleanup = vi.fn();

    // Hook registers cleanup

    const { unmount } =
      renderHook(() => useHook());

    unmount();

    expect(cleanup)
      .toHaveBeenCalled();

---

# 36. `useRef`

Hook:

    function usePrevious<T>(
      value: T,
    ) {
      const ref = useRef<T>();

      useEffect(() => {
        ref.current = value;
      }, [value]);

      return ref.current;
    }

Тест:

    const { result, rerender } =
      renderHook(
        ({ value }) =>
          usePrevious(value),
        {
          initialProps: {
            value: "first",
          },
        },
      );

    expect(result.current)
      .toBeUndefined();

    rerender({
      value: "second",
    });

    expect(result.current)
      .toBe("first");

---

# 37. Generic Hooks

TypeScript Hook:

    function usePrevious<T>(
      value: T,
    ): T | undefined {
      const ref =
        useRef<T | undefined>();

      useEffect(() => {
        ref.current = value;
      }, [value]);

      return ref.current;
    }

Тест може використовувати:

    const { result } =
      renderHook(
        () => usePrevious(10),
      );

TypeScript визначає:

    T = number

---

# 38. Не використовуй `any`

У тестах так само:

    const value: any = ...

небажано.

Краще:

    const value: string = ...

або:

    const value: User = ...

або дозволити TypeScript вивести тип.

---

# 39. Hook з form state

Приклад:

    function useForm() {
      const [value, setValue] =
        useState("");

      const [error, setError] =
        useState("");

      const setField = (
        value: string,
      ) => {
        setValue(value);
      };

      const validate = () => {
        if (!value.trim()) {
          setError(
            "Value is required",
          );

          return false;
        }

        setError("");

        return true;
      };

      return {
        value,
        error,
        setField,
        validate,
      };
    }

---

# 40. Тестування form Hook

    it("validates empty value", () => {
      const { result } = renderHook(
        () => useForm(),
      );

      let isValid = false;

      act(() => {
        isValid =
          result.current.validate();
      });

      expect(isValid)
        .toBe(false);

      expect(
        result.current.error,
      ).toBe("Value is required");
    });

---

# 41. Тестування valid form Hook

    it("accepts valid value", () => {
      const { result } = renderHook(
        () => useForm(),
      );

      act(() => {
        result.current.setField(
          "React",
        );
      });

      let isValid = false;

      act(() => {
        isValid =
          result.current.validate();
      });

      expect(isValid)
        .toBe(true);

      expect(
        result.current.error,
      ).toBe("");
    });

---

# 42. Async Hook

Hook може повертати:

    data

    loading

    error

Наприклад:

    {
      data: null,
      loading: true,
      error: null,
    }

Після завершення:

    {
      data: [...],
      loading: false,
      error: null,
    }

---

# 43. Тестування async Hook

Для async Hook часто використовуються:

    renderHook()

    waitFor()

або:

    findBy...

Для самого Hook часто:

    waitFor()

Приклад:

    const { result } =
      renderHook(
        () => useUsers(),
      );

    await waitFor(() => {
      expect(
        result.current.loading,
      ).toBe(false);
    });

---

# 44. `waitFor()`

Імпорт:

    import {
      waitFor,
    } from "@testing-library/react";

Приклад:

    await waitFor(() => {
      expect(
        result.current.data,
      ).toEqual(users);
    });

`waitFor()` повторює callback, поки assertion не пройде або не завершиться timeout.

---

# 45. Async Hook: loading state

Одразу після render:

    const { result } =
      renderHook(
        () => useUsers(),
      );

    expect(
      result.current.loading,
    ).toBe(true);

Після завершення:

    await waitFor(() => {
      expect(
        result.current.loading,
      ).toBe(false);
    });

---

# 46. Async Hook: success

Наприклад:

    await waitFor(() => {
      expect(
        result.current.data,
      ).toEqual([
        {
          id: 1,
          name: "Anna",
        },
      ]);
    });

---

# 47. Async Hook: error

Якщо API повернув помилку:

    await waitFor(() => {
      expect(
        result.current.error,
      ).toBe("Request failed");
    });

---

# 48. Async actions

Hook:

    function useCounter() {
      const [count, setCount] =
        useState(0);

      const incrementAsync =
        async () => {
          await Promise.resolve();

          setCount(
            (value) => value + 1,
          );
        };

      return {
        count,
        incrementAsync,
      };
    }

Тест:

    const { result } =
      renderHook(
        () => useCounter(),
      );

    await act(async () => {
      await result.current
        .incrementAsync();
    });

    expect(
      result.current.count,
    ).toBe(1);

---

# 49. Async `act()`

Якщо action asynchronous:

    await act(async () => {
      await result.current
        .someAsyncAction();
    });

Після цього можна робити assertion.

---

# 50. Hook з timer

Наприклад `useDebounce`:

    function useDebounce<T>(
      value: T,
      delay: number,
    ) {
      const [debouncedValue, setDebouncedValue] =
        useState(value);

      useEffect(() => {
        const timer = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);

        return () => {
          clearTimeout(timer);
        };
      }, [value, delay]);

      return debouncedValue;
    }

Для такого Hook потрібно контролювати timers.

---

# 51. Fake timers

У Vitest:

    vi.useFakeTimers();

Наприкінці:

    vi.useRealTimers();

Приклад:

    beforeEach(() => {
      vi.useFakeTimers();
    });

    afterEach(() => {
      vi.useRealTimers();
    });

---

# 52. Тест `useDebounce`

    it("updates value after delay", () => {
      const { result, rerender } =
        renderHook(
          ({ value }) =>
            useDebounce(
              value,
              500,
            ),
          {
            initialProps: {
              value: "first",
            },
          },
        );

      rerender({
        value: "second",
      });

      expect(
        result.current,
      ).toBe("first");

      act(() => {
        vi.advanceTimersByTime(500);
      });

      expect(
        result.current,
      ).toBe("second");
    });

---

# 53. Timer cleanup

Для debounce важливо перевіряти:

    new value
        ↓
    old timer cleared
        ↓
    new timer started
        ↓
    final value

Інакше старі timers можуть оновити state.

---

# 54. Тест multiple rerenders

    rerender({
      value: "second",
    });

    rerender({
      value: "third",
    });

    act(() => {
      vi.advanceTimersByTime(500);
    });

    expect(
      result.current,
    ).toBe("third");

Це перевіряє, що попередній timer був очищений.

---

# 55. `useContext` у custom Hook

Hook:

    function useAuth() {
      return useContext(AuthContext);
    }

Якщо Hook залежить від Context Provider, простого:

    renderHook(
      () => useAuth(),
    );

може бути недостатньо.

Потрібно передати wrapper.

---

# 56. `wrapper`

Приклад:

    function AuthProviderWrapper({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <AuthProvider>
          {children}
        </AuthProvider>
      );
    }

Потім:

    const { result } =
      renderHook(
        () => useAuth(),
        {
          wrapper:
            AuthProviderWrapper,
        },
      );

---

# 57. Hook + Context

Приклад:

    const AuthContext = createContext<{
      user: User | null;
    }>({
      user: null,
    });

    function useAuth() {
      return useContext(
        AuthContext,
      );
    }

Тест:

    const wrapper = ({
      children,
    }: {
      children: React.ReactNode;
    }) => (
      <AuthContext.Provider
        value={{
          user: {
            id: 1,
            name: "Valeriy",
          },
        }}
      >
        {children}
      </AuthContext.Provider>
    );

    const { result } =
      renderHook(
        () => useAuth(),
        {
          wrapper,
        },
      );

    expect(
      result.current.user?.name,
    ).toBe("Valeriy");

---

# 58. Wrapper

`wrapper` корисний, якщо Hook потребує:

- Context;
- Router;
- Theme;
- Query Client;
- Provider;
- інше React environment.

Наприклад:

    renderHook(
      () => useCustomHook(),
      {
        wrapper,
      },
    );

---

# 59. Не копіюй production provider logic у test

Якщо Hook залежить від:

    AuthProvider

краще використати реальний provider або спеціальний test wrapper.

Не потрібно дублювати всю бізнес-логіку provider у тесті.

---

# 60. Hook + Router

Якщо custom Hook використовує router:

    useNavigate()

    useLocation()

    useParams()

йому може знадобитися Router provider.

Наприклад:

    function Wrapper({
      children,
    }: {
      children: React.ReactNode;
    }) {
      return (
        <MemoryRouter>
          {children}
        </MemoryRouter>
      );
    }

Тест:

    renderHook(
      () => useCustomRouterHook(),
      {
        wrapper: Wrapper,
      },
    );

---

# 61. Hook + external dependency

Наприклад:

    useQuery()

    useMutation()

    useTranslation()

    useAuth()

Такі Hooks часто залежать від Provider.

Тому схема:

    Hook
      ↓
    required Provider
      ↓
    wrapper
      ↓
    renderHook()

---

# 62. Тестування custom Hook через компонент

`renderHook()` — не єдиний варіант.

Можна створити test component:

    function TestComponent() {
      const result = useCounter();

      return (
        <div>
          <span>
            {result.count}
          </span>

          <button
            onClick={result.increment}
          >
            Increment
          </button>
        </div>
      );
    }

Потім:

    render(<TestComponent />);

    await user.click(
      screen.getByRole("button", {
        name: /increment/i,
      }),
    );

---

# 63. Коли тестувати Hook через компонент

Це корисно, коли:

- Hook тісно пов'язаний з UI;
- важлива інтеграція Hook + component;
- Hook використовує багато context;
- потрібно перевірити реальну user behavior.

Але якщо треба протестувати custom Hook ізольовано:

    renderHook()

зазвичай простіший.

---

# 64. `renderHook()` vs component test

### `renderHook()`

    Hook
      ↓
    result.current
      ↓
    assertion

### Component

    Component
      ↓
    Hook
      ↓
    UI
      ↓
    user interaction
      ↓
    assertion

Вибір залежить від того, що саме потрібно перевірити.

---

# 65. Не тестуй React built-in Hooks напряму

Не потрібно створювати окремі тести для:

    useState()

    useEffect()

    useMemo()

    useCallback()

    useRef()

самих по собі.

Тестуй власний Hook, який використовує ці API.

Наприклад:

    useCounter()

а не:

    useState()

---

# 66. Не тестуй implementation details

Погано:

    expect(useEffect).toHaveBeenCalled();

Погано:

    expect(setState).toHaveBeenCalled();

Погано:

    expect(useMemo).toHaveBeenCalled();

Краще:

    expect(result.current.value)
      .toBe(expectedValue);

---

# 67. Test observable behavior

Основний принцип:

    internal implementation
          ↓
       irrelevant

    returned value
          ↓
       important

Наприклад:

    Hook internally uses
    useState + useMemo + useCallback

Нам важливо:

    returned data
    returned functions
    side effects
    state transitions

---

# 68. Test state transitions

Для stateful Hook важливо перевіряти transition:

    initial
      ↓
    action
      ↓
    new state

Наприклад:

    0
      ↓ increment
    1
      ↓ increment
    2
      ↓ decrement
    1

Тест:

    expect(result.current.count)
      .toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count)
      .toBe(1);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count)
      .toBe(2);

---

# 69. Edge cases

Hook tests повинні враховувати важливі edge cases.

Наприклад:

    empty value

    null

    undefined

    zero

    negative number

    maximum value

    repeated action

    rapid changes

    unmount

    prop changes

    async failure

---

# 70. Hook з null

Наприклад:

    function useUserName(
      user: User | null,
    ) {
      return user?.name ?? "Guest";
    }

Тест:

    const { result } =
      renderHook(
        () => useUserName(null),
      );

    expect(result.current)
      .toBe("Guest");

---

# 71. Hook з object input

Наприклад:

    type User = {
      id: number;
      name: string;
    };

    function useUserName(
      user: User,
    ) {
      return user.name;
    }

Тест:

    const user: User = {
      id: 1,
      name: "Valeriy",
    };

    const { result } =
      renderHook(
        () => useUserName(user),
      );

    expect(result.current)
      .toBe("Valeriy");

---

# 72. Referential equality

Іноді Hook повертає object або function.

Наприклад:

    return {
      value,
      increment,
    };

Не потрібно автоматично тестувати:

    result.current === previousResult

якщо referential stability не є частиною API/contract.

Тестуй reference equality тільки тоді, коли це справді важлива поведінка Hook.

---

# 73. Hook API як contract

Якщо Hook:

    return {
      data,
      loading,
      error,
      refetch,
    };

то це фактично його API.

Тести повинні перевірити:

    initial state

    success state

    error state

    refetch behavior

---

# 74. Приклад `useFetch` contract

Очікуваний flow:

    initial
      ↓
    loading = true
      ↓
    request
      ↓
    success
      ↓
    data available
      ↓
    loading = false

або:

    request
      ↓
    error
      ↓
    error available
      ↓
    loading = false

---

# 75. Async Hook error handling

Приклад:

    it("handles request error", async () => {
      const { result } =
        renderHook(
          () => useUsers(),
        );

      await waitFor(() => {
        expect(
          result.current.error,
        ).toBe(
          "Request failed",
        );
      });

      expect(
        result.current.loading,
      ).toBe(false);
    });

---

# 76. `waitFor()` не замінює правильну assertion

Погано:

    await waitFor(() => {
      expect(true).toBe(true);
    });

Це нічого не перевіряє.

Краще:

    await waitFor(() => {
      expect(
        result.current.data,
      ).toHaveLength(3);
    });

---

# 77. Не роби зайвих delays

Погано:

    await new Promise(
      (resolve) =>
        setTimeout(resolve, 1000),
    );

Краще:

    await waitFor(() => {
      expect(...).toBe(...);
    });

Тест не повинен чекати фіксований час, якщо можна чекати конкретну умову.

---

# 78. Fake timers та `act`

Якщо timer змінює React state:

    act(() => {
      vi.advanceTimersByTime(500);
    });

Це важливо.

Не:

    vi.advanceTimersByTime(500);

без `act()`, якщо timer спричиняє React update.

---

# 79. Cleanup після fake timers

Після тесту:

    afterEach(() => {
      vi.useRealTimers();
    });

Щоб fake timers не впливали на наступні тести.

---

# 80. Mocking dependencies

Hook може використовувати:

    fetch()

    localStorage

    Date

    timers

    external module

    API client

Такі dependencies іноді потрібно mock-ати.

Але:

> Mock-уй зовнішню залежність, а не внутрішню логіку Hook.

---

# 81. `localStorage` Hook

Наприклад:

    function useLocalStorage(
      key: string,
      initialValue: string,
    ) {
      const [value, setValue] =
        useState(() => {
          return (
            localStorage.getItem(key)
            ?? initialValue
          );
        });

      useEffect(() => {
        localStorage.setItem(
          key,
          value,
        );
      }, [key, value]);

      return [
        value,
        setValue,
      ] as const;
    }

---

# 82. Тест `localStorage` Hook

    it("reads initial value from localStorage", () => {
      localStorage.setItem(
        "theme",
        "dark",
      );

      const { result } =
        renderHook(
          () =>
            useLocalStorage(
              "theme",
              "light",
            ),
        );

      expect(result.current[0])
        .toBe("dark");
    });

---

# 83. Тест запису в localStorage

    it("writes value to localStorage", () => {
      const { result } =
        renderHook(
          () =>
            useLocalStorage(
              "theme",
              "light",
            ),
        );

      act(() => {
        result.current[1]("dark");
      });

      expect(
        localStorage.getItem("theme"),
      ).toBe("dark");
    });

---

# 84. Browser APIs

Hooks можуть використовувати:

    window

    document

    localStorage

    sessionStorage

    matchMedia

    ResizeObserver

    IntersectionObserver

Потрібно пам'ятати:

> Тестове середовище може не реалізовувати всі browser APIs повністю.

У таких випадках може знадобитися mock.

---

# 85. Не mock-уй усе

Погано:

    mock every function
    mock every React API
    mock every browser API

Тоді тест перестає бути реальним.

Правило:

> Mock-уй тільки зовнішні залежності, які потрібні для ізоляції тесту.

---

# 86. Hook + callback

Hook:

    function useCounter(
      onChange?: (
        value: number,
      ) => void,
    ) {
      const [count, setCount] =
        useState(0);

      const increment = () => {
        const next =
          count + 1;

        setCount(next);

        onChange?.(next);
      };

      return {
        count,
        increment,
      };
    }

Тест:

    const onChange = vi.fn();

    const { result } =
      renderHook(
        () =>
          useCounter(
            onChange,
          ),
      );

    act(() => {
      result.current.increment();
    });

    expect(onChange)
      .toHaveBeenCalledWith(1);

---

# 87. Hook з callback dependencies

Якщо Hook реагує на callback:

    useEffect(() => {
      onChange(value);
    }, [value, onChange]);

тестуй observable behavior.

Наприклад:

    rerender({
      value: "second",
      onChange,
    });

    expect(onChange)
      .toHaveBeenCalledWith(
        "second",
      );

Не перевіряй сам dependency array.

---

# 88. Custom Hook з Context + state

Складніший Hook може мати:

    Context
      +
    useState
      +
    useEffect

Тестова схема:

    wrapper
      ↓
    renderHook
      ↓
    result.current
      ↓
    act
      ↓
    assertion

Це типовий pattern для production custom Hooks.

---

# 89. Test wrapper pattern

Зручно створити reusable wrapper:

    function createWrapper() {
      return function Wrapper({
        children,
      }: {
        children: React.ReactNode;
      }) {
        return (
          <AuthProvider>
            <ThemeProvider>
              {children}
            </ThemeProvider>
          </AuthProvider>
        );
      };
    }

Тест:

    const { result } =
      renderHook(
        () => useSomething(),
        {
          wrapper:
            createWrapper(),
        },
      );

---

# 90. Hook tests не повинні знати зайве

Якщо Hook API:

    {
      isOpen,
      open,
      close,
    }

тест:

    expect(result.current.isOpen)
      .toBe(false);

    act(() => {
      result.current.open();
    });

    expect(result.current.isOpen)
      .toBe(true);

Не потрібно знати, що всередині використовується:

    useState

або:

    useReducer

---

# 91. Порівняння Hook test та component test

### Hook

    renderHook(
      () => useCounter(),
    );

    act(() => {
      result.current.increment();
    });

    expect(
      result.current.count,
    ).toBe(1);

### Component

    render(<Counter />);

    await user.click(
      screen.getByRole("button", {
        name: /increment/i,
      }),
    );

    expect(
      screen.getByText("1"),
    ).toBeInTheDocument();

Обидва підходи можуть тестувати ту саму логіку з різних рівнів.

---

# 92. Коли `renderHook()` — хороший вибір

Використовуй `renderHook()`, коли:

- тестуєш reusable custom Hook;
- Hook має складну state logic;
- Hook має API з functions + state;
- Hook використовується багатьма компонентами;
- UI не є важливою частиною тесту.

---

# 93. Коли краще тестувати через компонент

Краще component test, коли:

- behavior проявляється через UI;
- Hook є дуже простим;
- важлива user interaction;
- потрібно перевірити accessibility;
- важлива інтеграція Hook з компонентом.

---

# 94. Не створюй Hook тільки заради тестування

Погано:

    function useAdd(a, b) {
      return a + b;
    }

Якщо це проста pure function, краще:

    function add(
      a: number,
      b: number,
    ) {
      return a + b;
    }

І тестувати її як звичайну JavaScript function.

`renderHook()` потрібен саме для логіки, яка залежить від React Hooks.

---

# 95. Pure function vs Hook

### Pure function

    function add(
      a: number,
      b: number,
    ) {
      return a + b;
    }

Тест:

    expect(add(2, 3))
      .toBe(5);

### Custom Hook

    function useCounter() {
      const [count, setCount] =
        useState(0);

      // ...
    }

Тут:

    renderHook()

є доречним.

---

# 96. Testing Hook with `userEvent`

Якщо Hook повертає functions, що використовуються UI, зазвичай component test може бути природнішим.

Наприклад:

    const {
      increment,
    } = useCounter();

Компонент:

    <button
      onClick={increment}
    >
      Increment
    </button>

Тоді можна тестувати через:

    await user.click(button);

а не напряму викликати:

    result.current.increment();

Це залежить від рівня тесту.

---

# 97. Основний принцип Testing Library

Testing Library орієнтується на поведінку користувача.

Тому:

    component test
        ↓
    user behavior

а:

    renderHook test
        ↓
    Hook API / behavior

У обох випадках не потрібно тестувати implementation details.

---

# 98. Типова структура Hook test

    describe("useCounter", () => {
      it("returns initial value", () => {
        // arrange
      });

      it("increments value", () => {
        // arrange
        // act
        // assert
      });

      it("decrements value", () => {
        // arrange
        // act
        // assert
      });
    });

---

# 99. Arrange / Act / Assert

Класична структура:

    Arrange
        ↓
    renderHook

    Act
        ↓
    call Hook function

    Assert
        ↓
    inspect result.current

Наприклад:

    const { result } =
      renderHook(
        () => useCounter(),
      );

    act(() => {
      result.current.increment();
    });

    expect(
      result.current.count,
    ).toBe(1);

---

# 100. AAA pattern

## Arrange

    const { result } =
      renderHook(
        () => useCounter(),
      );

## Act

    act(() => {
      result.current.increment();
    });

## Assert

    expect(
      result.current.count,
    ).toBe(1);

Цей pattern варто використовувати майже завжди.

---

# 101. Один test — одна поведінка

Добре:

    it("starts with zero", ...);

    it("increments counter", ...);

    it("decrements counter", ...);

    it("uses custom initial value", ...);

Погано:

    it("tests everything", ...);

---

# 102. Назви Hook tests

Добре:

    it("returns initial value", ...);

    it("increments count", ...);

    it("updates document title", ...);

    it("cleans up event listener", ...);

    it("handles request error", ...);

    it("uses updated props", ...);

Погано:

    it("works", ...);

    it("hook test", ...);

    it("test 1", ...);

---

# 103. Test state machine

Для складного Hook корисно описати state transitions.

Наприклад `useRequest`:

    IDLE
      ↓
    LOADING
      ↓
    SUCCESS

або:

    IDLE
      ↓
    LOADING
      ↓
    ERROR

Тести повинні перевіряти ці transitions.

---

# 104. Приклад `useRequest`

Умовний API:

    const {
      data,
      error,
      loading,
      execute,
    } = useRequest();

Тест:

    const { result } =
      renderHook(
        () => useRequest(),
      );

    expect(result.current.loading)
      .toBe(false);

Після execute:

    act(() => {
      result.current.execute();
    });

Далі очікуємо:

    loading
        ↓
    success/error

---

# 105. Testing Hook API

Для кожного custom Hook корисно визначити:

### Inputs

    arguments
    props
    context

### Outputs

    returned values
    returned functions

### Side effects

    API
    localStorage
    DOM
    subscriptions
    timers

### Transitions

    initial
    loading
    success
    error

---

# 106. Hook testing checklist

Перед завершенням тестів перевір:

- [ ] initial state;
- [ ] основну action;
- [ ] протилежну action;
- [ ] props;
- [ ] prop changes;
- [ ] edge cases;
- [ ] async state;
- [ ] error state;
- [ ] cleanup;
- [ ] side effects;
- [ ] dependencies;
- [ ] context/provider, якщо потрібен.

Не кожен Hook потребує всіх пунктів.

---

# 107. Найчастіші помилки

## Помилка 1 — забути `act()`

Погано:

    result.current.increment();

    expect(
      result.current.count,
    ).toBe(1);

Краще:

    act(() => {
      result.current.increment();
    });

    expect(
      result.current.count,
    ).toBe(1);

---

# 108. Помилка 2 — тестувати implementation details

Погано:

    expect(setState)
      .toHaveBeenCalled();

Краще:

    expect(
      result.current.value,
    ).toBe(expected);

---

# 109. Помилка 3 — тестувати `useEffect` напряму

Погано:

    expect(useEffect)
      .toHaveBeenCalled();

Краще:

    expect(document.title)
      .toBe("React");

---

# 110. Помилка 4 — тестувати `useMemo`

Погано:

    expect(useMemo)
      .toHaveBeenCalled();

Краще:

    expect(
      result.current.total,
    ).toBe(100);

---

# 111. Помилка 5 — використовувати delays

Погано:

    await new Promise(
      (resolve) =>
        setTimeout(resolve, 1000),
    );

Краще:

    await waitFor(() => {
      expect(...).toBe(...);
    });

---

# 112. Помилка 6 — забути cleanup

Якщо Hook створює:

    event listener

    timer

    subscription

    observer

перевір cleanup.

Сценарій:

    renderHook
        ↓
    subscribe
        ↓
    unmount
        ↓
    unsubscribe

---

# 113. Помилка 7 — надмірне mocking

Не потрібно mock-ати:

    useState

    useEffect

    useMemo

    useCallback

Вони є частиною React implementation.

Mock-уй external dependencies, коли це необхідно.

---

# 114. Помилка 8 — тестувати просту функцію як Hook

Якщо:

    function multiply(
      a: number,
      b: number,
    ) {
      return a * b;
    }

не потрібно:

    renderHook(
      () => useMultiply(),
    );

Просту функцію тестуй напряму:

    expect(
      multiply(2, 3),
    ).toBe(6);

---

# 115. Помилка 9 — занадто багато assertions

Не роби тест:

    it("does everything", () => {
      // 50 assertions
    });

Краще розділити поведінку на кілька тестів.

---

# 116. Помилка 10 — тестувати internal state

Не потрібно:

    expect(
      internalState,
    ).toBe(...);

Тестуй public Hook API:

    result.current

---

# 117. Публічний API Hook

Якщо Hook повертає:

    {
      value,
      setValue,
      reset,
    }

це його public API.

Тест:

    result.current.value

    result.current.setValue()

    result.current.reset()

Саме це потрібно перевіряти.

---

# 118. Приклад `useToggle` повністю

Hook:

    function useToggle(
      initialValue = false,
    ) {
      const [value, setValue] =
        useState(initialValue);

      const toggle = () => {
        setValue(
          (current) => !current,
        );
      };

      const reset = () => {
        setValue(initialValue);
      };

      return {
        value,
        toggle,
        reset,
      };
    }

Тести:

    describe("useToggle", () => {
      it("returns initial value", () => {
        const { result } =
          renderHook(
            () => useToggle(),
          );

        expect(result.current.value)
          .toBe(false);
      });

      it("toggles value", () => {
        const { result } =
          renderHook(
            () => useToggle(),
          );

        act(() => {
          result.current.toggle();
        });

        expect(result.current.value)
          .toBe(true);
      });

      it("resets value", () => {
        const { result } =
          renderHook(
            () => useToggle(true),
          );

        act(() => {
          result.current.toggle();
        });

        expect(result.current.value)
          .toBe(false);

        act(() => {
          result.current.reset();
        });

        expect(result.current.value)
          .toBe(true);
      });
    });

---

# 119. Приклад `usePrevious` повністю

Hook:

    function usePrevious<T>(
      value: T,
    ): T | undefined {
      const ref =
        useRef<T | undefined>();

      useEffect(() => {
        ref.current = value;
      }, [value]);

      return ref.current;
    }

Тест:

    describe("usePrevious", () => {
      it("returns undefined initially", () => {
        const { result } =
          renderHook(
            () => usePrevious("first"),
          );

        expect(result.current)
          .toBeUndefined();
      });

      it("returns previous value", () => {
        const { result, rerender } =
          renderHook(
            ({ value }) =>
              usePrevious(value),
            {
              initialProps: {
                value: "first",
              },
            },
          );

        rerender({
          value: "second",
        });

        expect(result.current)
          .toBe("first");

        rerender({
          value: "third",
        });

        expect(result.current)
          .toBe("second");
      });
    });

---

# 120. Приклад `useDebounce` повністю

Hook:

    function useDebounce<T>(
      value: T,
      delay: number,
    ) {
      const [debouncedValue, setDebouncedValue] =
        useState(value);

      useEffect(() => {
        const timer = setTimeout(() => {
          setDebouncedValue(value);
        }, delay);

        return () => {
          clearTimeout(timer);
        };
      }, [value, delay]);

      return debouncedValue;
    }

Тест:

    describe("useDebounce", () => {
      beforeEach(() => {
        vi.useFakeTimers();
      });

      afterEach(() => {
        vi.useRealTimers();
      });

      it("returns initial value", () => {
        const { result } =
          renderHook(
            () =>
              useDebounce(
                "first",
                500,
              ),
          );

        expect(result.current)
          .toBe("first");
      });

      it("updates value after delay", () => {
        const { result, rerender } =
          renderHook(
            ({ value }) =>
              useDebounce(
                value,
                500,
              ),
            {
              initialProps: {
                value: "first",
              },
            },
          );

        rerender({
          value: "second",
        });

        expect(result.current)
          .toBe("first");

        act(() => {
          vi.advanceTimersByTime(500);
        });

        expect(result.current)
          .toBe("second");
      });
    });

---

# 121. Мінімальний шаблон Hook test

    import {
      act,
      renderHook,
    } from "@testing-library/react";

    import {
      describe,
      expect,
      it,
    } from "vitest";

    describe("useSomething", () => {
      it("works", () => {
        const { result } =
          renderHook(
            () => useSomething(),
          );

        expect(
          result.current,
        ).toBeDefined();

        act(() => {
          result.current.doSomething();
        });

        expect(
          result.current.value,
        ).toBe(expectedValue);
      });
    });

---

# 122. Мінімальний шаблон Hook з props

    const { result, rerender } =
      renderHook(
        ({ value }) =>
          useSomething(value),
        {
          initialProps: {
            value: "first",
          },
        },
      );

    expect(result.current)
      .toBe(...);

    rerender({
      value: "second",
    });

    expect(result.current)
      .toBe(...);

---

# 123. Мінімальний шаблон async Hook

    const { result } =
      renderHook(
        () => useSomethingAsync(),
      );

    expect(
      result.current.loading,
    ).toBe(true);

    await waitFor(() => {
      expect(
        result.current.loading,
      ).toBe(false);
    });

    expect(
      result.current.data,
    ).toEqual(expectedData);

---

# 124. Мінімальний шаблон cleanup test

    const { unmount } =
      renderHook(
        () => useSomething(),
      );

    expect(
      subscribe,
    ).toHaveBeenCalled();

    unmount();

    expect(
      unsubscribe,
    ).toHaveBeenCalled();

---

# 125. Рівні тестування Hooks

## Level 1 — basic state

    initial state
    ↓
    action
    ↓
    new state

## Level 2 — props

    initialProps
    ↓
    rerender
    ↓
    changed behavior

## Level 3 — effects

    render
    ↓
    side effect
    ↓
    cleanup

## Level 4 — async

    loading
    ↓
    success/error

## Level 5 — providers

    wrapper
    ↓
    context/router/provider
    ↓
    Hook

---

# 126. Що потрібно знати Junior React Developer

Потрібно впевнено розуміти:

- що таке custom Hook;
- навіщо тестувати Hook;
- `renderHook()`;
- `result.current`;
- `act()`;
- `rerender()`;
- `unmount()`;
- `waitFor()`;
- `wrapper`;
- testing initial state;
- testing state updates;
- testing props;
- testing async behavior;
- testing cleanup;
- testing observable behavior;
- різницю між Hook test та component test.

---

# 127. Що потрібно вміти написати без підказки

Тест такого Hook:

    function useCounter() {
      const [count, setCount] =
        useState(0);

      return {
        count,
        increment: () =>
          setCount(
            (value) => value + 1,
          ),
      };
    }

Тест:

    const { result } =
      renderHook(
        () => useCounter(),
      );

    expect(result.current.count)
      .toBe(0);

    act(() => {
      result.current.increment();
    });

    expect(result.current.count)
      .toBe(1);

Це базовий шаблон, який потрібно знати.

---

# 128. Interview questions

### Що таке `renderHook()`?

> Інструмент React Testing Library для ізольованого тестування custom Hooks.

### Що таке `result.current`?

> Поточне значення, яке повертає Hook.

### Навіщо `act()`?

> Щоб коректно обробити React state updates та інші updates, спричинені тестовою дією.

### Для чого `rerender()`?

> Щоб повторно відрендерити той самий Hook з новими props.

### Для чого `unmount()`?

> Щоб перевірити поведінку Hook під час unmount та cleanup.

### Для чого `wrapper`?

> Щоб надати Hook необхідний React context/provider environment.

### Коли використовувати `waitFor()`?

> Коли потрібно дочекатися асинхронної зміни стану або іншої умови.

### Чи потрібно тестувати `useState`?

> Ні. Потрібно тестувати behavior custom Hook, який використовує `useState`.

---

# 129. Найважливіші правила

1. **Custom Hook тестується через його public API.**

2. **`renderHook()` запускає Hook.**

3. **`result.current` містить поточний результат Hook.**

4. **State-changing actions обгортаємо в `act()`.**

5. **Props передаємо через `initialProps`.**

6. **Для зміни props використовуємо `rerender()`.**

7. **Для cleanup використовуємо `unmount()`.**

8. **Для async updates використовуємо `waitFor()` або відповідний async pattern.**

9. **Provider dependencies передаємо через `wrapper`.**

10. **Не тестуємо implementation details.**

11. **Не mock-уємо React Hooks без крайньої необхідності.**

12. **Тестуємо observable behavior.**

---

# 130. Коротка шпаргалка

## Import

    import {
      act,
      renderHook,
      waitFor,
    } from "@testing-library/react";

## Render Hook

    const { result } =
      renderHook(
        () => useCounter(),
      );

## Current value

    result.current

## Initial state

    expect(
      result.current.count,
    ).toBe(0);

## State update

    act(() => {
      result.current.increment();
    });

## Rerender

    rerender({
      value: "new",
    });

## Unmount

    unmount();

## Async

    await waitFor(() => {
      expect(
        result.current.loading,
      ).toBe(false);
    });

## Wrapper

    renderHook(
      () => useAuth(),
      {
        wrapper,
      },
    );

## Fake timers

    vi.useFakeTimers();

    act(() => {
      vi.advanceTimersByTime(500);
    });

    vi.useRealTimers();

---

# 131. Головна формула

    renderHook()
        ↓
    result.current
        ↓
    act()
        ↓
    state update
        ↓
    result.current
        ↓
    expect()

Для props:

    initialProps
        ↓
    renderHook()
        ↓
    rerender(newProps)
        ↓
    expect()

Для effects:

    renderHook()
        ↓
    effect
        ↓
    observable result
        ↓
    unmount()
        ↓
    cleanup

Для async:

    renderHook()
        ↓
    loading
        ↓
    async operation
        ↓
    waitFor()
        ↓
    success/error

---

# 132. Головна ідея

> **Тестуй Custom Hook через його поведінку та public API, а не через його внутрішню реалізацію.**

Не:

    useState was called

    useEffect was called

    useMemo was called

    setState was called

А:

    initial value is correct
        ↓
    action changes value
        ↓
    props change behavior
        ↓
    side effect produces expected result
        ↓
    async operation reaches expected state
        ↓
    cleanup happens on unmount

Саме це робить тести Hooks корисними, зрозумілими та стійкими до змін внутрішньої реалізації.