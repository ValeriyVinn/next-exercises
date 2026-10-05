# 07. useReducer

`useReducer` — це React Hook для керування state через **actions** і **reducer function**.

Він особливо корисний тоді, коли state:

- має складну структуру;
- змінюється різними способами;
- має багато пов'язаних полів;
- має складну логіку оновлення;
- потребує чітко описаних дій;
- зручніше керується через `action → reducer → new state`, ніж через багато `setState`.

Основна модель:

    state
      ↓
    dispatch(action)
      ↓
    reducer(state, action)
      ↓
    new state
      ↓
    re-render

---

# Основний синтаксис

    const [state, dispatch] = useReducer(reducer, initialState);

де:

- `state` — поточний state;
- `dispatch` — функція для відправлення action;
- `reducer` — функція, яка визначає, як змінюється state;
- `initialState` — початковий state.

Приклад:

    function reducer(state, action) {
      // визначаємо новий state
    }

    const [state, dispatch] = useReducer(
      reducer,
      initialState
    );

---

# Ключові поняття

- `useReducer`
- reducer
- state
- action
- `dispatch`
- `initialState`
- `switch`
- action `type`
- action `payload`
- pure function
- immutable update
- state transition
- functional programming
- `useState`
- `useContext`
- Context + Reducer
- custom Hook
- TypeScript
- discriminated union
- state machine
- complex state

---

# 1. Що таке reducer

**Reducer** — це функція, яка отримує:

    current state
    +
    action

і повертає:

    new state

Загальна форма:

    function reducer(state, action) {
      return newState;
    }

Ментальна модель:

    reducer(currentState, action)
                ↓
             newState

---

# 2. Найпростіший reducer

Наприклад, counter:

    function reducer(state, action) {
      if (action.type === "increment") {
        return state + 1;
      }

      if (action.type === "decrement") {
        return state - 1;
      }

      return state;
    }

Тут reducer може отримати:

    state = 5
    action = { type: "increment" }

і повернути:

    6

---

# 3. useReducer

Тепер використаємо reducer у компоненті:

    import { useReducer } from "react";

    function reducer(state, action) {
      if (action.type === "increment") {
        return state + 1;
      }

      if (action.type === "decrement") {
        return state - 1;
      }

      return state;
    }

    export default function Counter() {
      const [count, dispatch] = useReducer(
        reducer,
        0
      );

      return (
        <div>
          <p>Count: {count}</p>

          <button
            onClick={() => dispatch({ type: "increment" })}
          >
            +
          </button>

          <button
            onClick={() => dispatch({ type: "decrement" })}
          >
            -
          </button>
        </div>
      );
    }

---

# 4. Що таке dispatch

`dispatch` — це функція, через яку ми повідомляємо reducer:

> "Відбулася така дія."

Наприклад:

    dispatch({
      type: "increment",
    });

або:

    dispatch({
      type: "decrement",
    });

`dispatch` не змінює state безпосередньо.

Він передає:

    action

до:

    reducer

---

# 5. Що таке action

**Action** — це звичайний JavaScript object, який описує, що сталося.

Наприклад:

    {
      type: "increment"
    }

Або:

    {
      type: "delete"
    }

Або:

    {
      type: "set-name",
      payload: "Valeriy"
    }

Основне поле:

    type

Часто додаткові дані передаються через:

    payload

---

# 6. Action — це опис події

Дуже важливо розуміти:

Action не повинен описувати:

> "Як змінити state."

Він повинен описувати:

> "Що сталося."

Наприклад:

    {
      type: "increment"
    }

краще, ніж:

    {
      type: "set-count",
      value: 11
    }

для сценарію, де користувач натиснув кнопку "збільшити".

---

# 7. Потік даних у useReducer

Основний потік:

    User interaction
          ↓
       dispatch
          ↓
        action
          ↓
       reducer
          ↓
      new state
          ↓
       re-render

Наприклад:

    Click "+"
       ↓
    dispatch({
      type: "increment"
    })
       ↓
    reducer(state, action)
       ↓
    state + 1
       ↓
    React re-render

---

# 8. useReducer vs useState

Простий `useState`:

    const [count, setCount] = useState(0);

    setCount(count + 1);

`useReducer`:

    const [count, dispatch] = useReducer(
      reducer,
      0
    );

    dispatch({
      type: "increment",
    });

Обидва можуть керувати state.

Різниця переважно в організації логіки.

---

# 9. useState для простого state

Наприклад:

    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
      setIsOpen(true);
    };

Для такого state `useState` простий і зрозумілий.

Немає необхідності використовувати `useReducer`.

---

# 10. useReducer для складнішої логіки

Наприклад, форма:

    {
      name: "",
      email: "",
      password: "",
      isLoading: false,
      error: null,
      isSuccess: false
    }

Тут можуть бути дії:

    set-name
    set-email
    set-password
    submit
    success
    error
    reset

Для такої логіки `useReducer` може зробити state transitions більш структурованими.

---

# 11. Простий counter з switch

Найпоширеніший стиль reducer:

    function reducer(state, action) {
      switch (action.type) {
        case "increment":
          return state + 1;

        case "decrement":
          return state - 1;

        default:
          return state;
      }
    }

`switch` добре підходить для reducer, коли є багато типів actions.

---

# 12. default у reducer

Reducer повинен мати зрозумілу поведінку для невідомої action.

Наприклад:

    function reducer(state, action) {
      switch (action.type) {
        case "increment":
          return state + 1;

        case "decrement":
          return state - 1;

        default:
          return state;
      }
    }

У TypeScript при правильному типізуванні можна зробити ще суворішу перевірку.

---

# 13. Reducer повинен бути pure function

Reducer має бути **чистою функцією**.

Тобто результат повинен залежати від:

    state
    +
    action

а не від прихованих зовнішніх side effects.

Наприклад:

    function reducer(state, action) {
      switch (action.type) {
        case "increment":
          return state + 1;

        default:
          return state;
      }
    }

Це хороший reducer.

---

# 14. Що не потрібно робити в reducer

Не потрібно виконувати side effects всередині reducer.

Наприклад, не варто:

    function reducer(state, action) {
      localStorage.setItem("data", "value");

      return state;
    }

Також не потрібно робити:

    fetch("/api/users");

або:

    alert("Hello");

або:

    console.log("important side effect");

Логування для debugging можливе, але reducer за концепцією має залишатися pure function.

---

# 15. Reducer не повинен робити fetch

Погано:

    function reducer(state, action) {
      if (action.type === "load") {
        fetch("/api/users");

        return state;
      }

      return state;
    }

Reducer повинен визначати:

    state transition

А data fetching — це side effect.

Його краще виконувати в:

- event handler;
- `useEffect`;
- custom Hook;
- іншому відповідному шарі.

---

# 16. Async logic і useReducer

`useReducer` сам по собі не є async state manager.

Наприклад:

    const [state, dispatch] = useReducer(
      reducer,
      initialState
    );

`dispatch` не означає:

    "виконай async operation"

Він означає:

    "відправ action reducer-у".

Async логіка може бути зовні:

    async function loadUsers() {
      dispatch({ type: "loading" });

      try {
        const response = await fetch("/api/users");

        const users = await response.json();

        dispatch({
          type: "success",
          payload: users,
        });
      } catch {
        dispatch({
          type: "error",
        });
      }
    }

---

# 17. Практичний async state

Наприклад, state:

    type State = {
      status: "idle" | "loading" | "success" | "error";
      data: User[];
      error: string | null;
    };

Actions:

    idle
    loading
    success
    error

Reducer:

    function reducer(state, action) {
      switch (action.type) {
        case "loading":
          return {
            status: "loading",
            data: [],
            error: null,
          };

        case "success":
          return {
            status: "success",
            data: action.payload,
            error: null,
          };

        case "error":
          return {
            status: "error",
            data: [],
            error: action.payload,
          };

        default:
          return state;
      }
    }

---

# 18. Action з payload

Action може містити додаткові дані:

    dispatch({
      type: "set-name",
      payload: "Valeriy",
    });

Reducer:

    function reducer(state, action) {
      switch (action.type) {
        case "set-name":
          return {
            ...state,
            name: action.payload,
          };

        default:
          return state;
      }
    }

Тут:

    type

описує дію, а:

    payload

містить дані для цієї дії.

---

# 19. Payload може бути будь-яким потрібним значенням

Наприклад:

    {
      type: "set-count",
      payload: 10
    }

Або:

    {
      type: "set-user",
      payload: user
    }

Або:

    {
      type: "add-todo",
      payload: {
        id: 1,
        title: "Learn React"
      }
    }

Тип payload залежить від action.

---

# 20. Reducer зі state object

У реальних компонентах state часто є object.

Наприклад:

    const initialState = {
      count: 0,
      step: 1,
    };

Reducer:

    function reducer(state, action) {
      switch (action.type) {
        case "increment":
          return {
            ...state,
            count: state.count + state.step,
          };

        case "decrement":
          return {
            ...state,
            count: state.count - state.step,
          };

        default:
          return state;
      }
    }

---

# 21. Immutable updates

Reducer повинен оновлювати state **іммутабельно**.

Погано:

    function reducer(state, action) {
      state.count += 1;

      return state;
    }

Тут ми змінюємо існуючий object.

Краще:

    function reducer(state, action) {
      return {
        ...state,
        count: state.count + 1,
      };
    }

Ми створюємо новий object.

---

# 22. Чому не можна мутувати state

React та його механізми оновлення покладаються на зміну reference.

Було:

    state → Object A

Потрібно:

    new state → Object B

А не:

    state → Object A
             ↑
          mutated

Immutable update:

    old state
        ↓
    new object
        ↓
    React can detect
    changed state reference

---

# 23. Оновлення масиву в reducer

Погано:

    state.todos.push(newTodo);

Краще:

    return {
      ...state,
      todos: [
        ...state.todos,
        newTodo,
      ],
    };

---

# 24. Видалення елемента

Наприклад:

    case "delete-todo":
      return {
        ...state,
        todos: state.todos.filter(todo => {
          return todo.id !== action.payload;
        }),
      };

`filter()` створює новий масив.

---

# 25. Оновлення елемента

Наприклад:

    case "toggle-todo":
      return {
        ...state,
        todos: state.todos.map(todo => {
          if (todo.id !== action.payload) {
            return todo;
          }

          return {
            ...todo,
            completed: !todo.completed,
          };
        }),
      };

Тут:

- створюється новий state object;
- створюється новий array;
- для зміненого todo створюється новий object;
- інші todo залишаються без змін.

---

# 26. Повний Todo reducer

    type Todo = {
      id: number;
      title: string;
      completed: boolean;
    };

    type State = {
      todos: Todo[];
    };

    const initialState: State = {
      todos: [],
    };

    function reducer(state: State, action: TodoAction): State {
      switch (action.type) {
        case "add":
          return {
            ...state,
            todos: [
              ...state.todos,
              action.payload,
            ],
          };

        case "delete":
          return {
            ...state,
            todos: state.todos.filter(todo => {
              return todo.id !== action.payload;
            }),
          };

        case "toggle":
          return {
            ...state,
            todos: state.todos.map(todo => {
              if (todo.id !== action.payload) {
                return todo;
              }

              return {
                ...todo,
                completed: !todo.completed,
              };
            }),
          };

        default:
          return state;
      }
    }

---

# 27. TypeScript і useReducer

Для TypeScript `useReducer` особливо корисний, тому що actions можна описати через типи.

Наприклад:

    type Action =
      | {
          type: "increment";
        }
      | {
          type: "decrement";
        };

Тепер TypeScript знає, які actions дозволені.

---

# 28. Discriminated union

Це дуже важливе поняття для reducer у TypeScript.

Наприклад:

    type Action =
      | {
          type: "increment";
        }
      | {
          type: "decrement";
        }
      | {
          type: "set";
          payload: number;
        };

Поле:

    type

є discriminator.

TypeScript може визначати форму action залежно від:

    action.type

---

# 29. TypeScript reducer

    type State = {
      count: number;
    };

    type Action =
      | {
          type: "increment";
        }
      | {
          type: "decrement";
        }
      | {
          type: "set";
          payload: number;
        };

    function reducer(
      state: State,
      action: Action
    ): State {
      switch (action.type) {
        case "increment":
          return {
            ...state,
            count: state.count + 1,
          };

        case "decrement":
          return {
            ...state,
            count: state.count - 1,
          };

        case "set":
          return {
            ...state,
            count: action.payload,
          };

        default:
          return state;
      }
    }

---

# 30. TypeScript розуміє payload

У цьому case:

    case "set":
      return {
        ...state,
        count: action.payload,
      };

TypeScript знає, що:

    action.type === "set"

тому `action` має:

    payload: number

А в:

    case "increment":

payload взагалі не потрібен.

Це одна з головних переваг discriminated unions.

---

# 31. Типізація initialState

    const initialState: State = {
      count: 0,
    };

Потім:

    const [state, dispatch] = useReducer(
      reducer,
      initialState
    );

TypeScript може вивести типи state та dispatch із reducer.

---

# 32. Повний TypeScript приклад

    import { useReducer } from "react";

    type State = {
      count: number;
    };

    type Action =
      | {
          type: "increment";
        }
      | {
          type: "decrement";
        }
      | {
          type: "reset";
        }
      | {
          type: "set";
          payload: number;
        };

    const initialState: State = {
      count: 0,
    };

    function reducer(
      state: State,
      action: Action
    ): State {
      switch (action.type) {
        case "increment":
          return {
            count: state.count + 1,
          };

        case "decrement":
          return {
            count: state.count - 1,
          };

        case "reset":
          return initialState;

        case "set":
          return {
            count: action.payload,
          };

        default:
          return state;
      }
    }

    export default function Counter() {
      const [state, dispatch] = useReducer(
        reducer,
        initialState
      );

      return (
        <div>
          <p>{state.count}</p>

          <button
            onClick={() => {
              dispatch({
                type: "increment",
              });
            }}
          >
            +
          </button>

          <button
            onClick={() => {
              dispatch({
                type: "decrement",
              });
            }}
          >
            -
          </button>

          <button
            onClick={() => {
              dispatch({
                type: "reset",
              });
            }}
          >
            Reset
          </button>

          <button
            onClick={() => {
              dispatch({
                type: "set",
                payload: 10,
              });
            }}
          >
            Set 10
          </button>
        </div>
      );
    }

---

# 33. Неправильний action у TypeScript

Якщо Action:

    type Action =
      | {
          type: "increment";
        }
      | {
          type: "decrement";
        };

то так не можна:

    dispatch({
      type: "delete",
    });

TypeScript повідомить про помилку.

Це добре.

Reducer стає більш передбачуваним.

---

# 34. Action creators

Іноді actions створюються окремими функціями.

Наприклад:

    const increment = () => ({
      type: "increment" as const,
    });

    const decrement = () => ({
      type: "decrement" as const,
    });

Тоді:

    dispatch(increment());

    dispatch(decrement());

Для невеликих компонентів це часто зайва абстракція.

Але у великих reducer-ах action creators можуть бути корисними.

---

# 35. Action creators з payload

Наприклад:

    const setCount = (value: number) => ({
      type: "set" as const,
      payload: value,
    });

Використання:

    dispatch(setCount(10));

Але з TypeScript discriminated union важливо правильно зберегти literal type.

---

# 36. Чи потрібні action creators завжди?

Ні.

Для простого reducer:

    dispatch({
      type: "increment",
    });

часто простіше і зрозуміліше.

Action creators можуть бути корисними, коли:

- actions складні;
- вони використовуються в багатьох місцях;
- потрібно централізувати створення actions;
- проект має окрему архітектуру для actions.

---

# 37. useReducer і форма

`useReducer` дуже добре підходить для складних форм.

Наприклад state:

    type FormState = {
      name: string;
      email: string;
      password: string;
      isSubmitting: boolean;
      error: string | null;
    };

Actions:

    set-name
    set-email
    set-password
    submit
    success
    error
    reset

---

# 38. Reducer для форми

    type FormState = {
      name: string;
      email: string;
      password: string;
      isSubmitting: boolean;
      error: string | null;
    };

    type FormAction =
      | {
          type: "set-name";
          payload: string;
        }
      | {
          type: "set-email";
          payload: string;
        }
      | {
          type: "set-password";
          payload: string;
        }
      | {
          type: "submit";
        }
      | {
          type: "success";
        }
      | {
          type: "error";
          payload: string;
        }
      | {
          type: "reset";
        };

---

# 39. Form reducer

    const initialState: FormState = {
      name: "",
      email: "",
      password: "",
      isSubmitting: false,
      error: null,
    };

    function reducer(
      state: FormState,
      action: FormAction
    ): FormState {
      switch (action.type) {
        case "set-name":
          return {
            ...state,
            name: action.payload,
          };

        case "set-email":
          return {
            ...state,
            email: action.payload,
          };

        case "set-password":
          return {
            ...state,
            password: action.payload,
          };

        case "submit":
          return {
            ...state,
            isSubmitting: true,
            error: null,
          };

        case "success":
          return {
            ...state,
            isSubmitting: false,
          };

        case "error":
          return {
            ...state,
            isSubmitting: false,
            error: action.payload,
          };

        case "reset":
          return initialState;

        default:
          return state;
      }
    }

---

# 40. Використання reducer у формі

    const [state, dispatch] = useReducer(
      reducer,
      initialState
    );

    return (
      <form>
        <input
          value={state.name}
          onChange={event => {
            dispatch({
              type: "set-name",
              payload: event.target.value,
            });
          }}
        />

        <input
          value={state.email}
          onChange={event => {
            dispatch({
              type: "set-email",
              payload: event.target.value,
            });
          }}
        />

        <button
          type="submit"
          disabled={state.isSubmitting}
        >
          Submit
        </button>
      </form>
    );

---

# 41. useReducer і loading/error/success

Один із дуже практичних сценаріїв:

    idle
      ↓
    loading
      ↓
    success

або:

    idle
      ↓
    loading
      ↓
    error

State:

    type State = {
      status: "idle" | "loading" | "success" | "error";
      data: User[];
      error: string | null;
    };

Reducer централізовано визначає переходи між станами.

---

# 42. State transition

`useReducer` добре підходить для мислення через **переходи state**.

Наприклад:

    idle
      ↓
    FETCH_START
      ↓
    loading
      ↓
    FETCH_SUCCESS
      ↓
    success

Або:

    loading
      ↓
    FETCH_ERROR
      ↓
    error

Тобто reducer описує:

    state + action → next state

---

# 43. Reducer як state transition function

Математично reducer можна уявити як:

    (state, action) → newState

Наприклад:

    (0, { type: "increment" })
          ↓
          1

Потім:

    (1, { type: "increment" })
          ↓
          2

Потім:

    (2, { type: "decrement" })
          ↓
          1

Це дуже корисна модель для складних state.

---

# 44. useReducer і передбачуваність

Замість багатьох:

    setName(...)
    setEmail(...)
    setPassword(...)
    setLoading(...)
    setError(...)

можна мати:

    dispatch({
      type: "submit",
    });

Reducer централізовано визначає:

    що саме повинно змінитися.

Це робить state transitions більш явними.

---

# 45. useReducer не означає "один setState замість багатьох"

Не потрібно думати:

    useReducer
    =
    advanced useState

Це спрощене пояснення.

Краще:

    useState
    → пряме оновлення state

    useReducer
    → state transitions через actions

---

# 46. useState vs useReducer

## useState

Добре для:

    const [isOpen, setIsOpen] = useState(false);

    const [name, setName] = useState("");

    const [count, setCount] = useState(0);

---

## useReducer

Добре для:

    {
      status,
      data,
      error,
      filters,
      selectedId,
      isEditing
    }

коли між цими значеннями є пов'язана логіка.

---

# 47. Коли useReducer краще за useState

`useReducer` часто доречний, якщо:

- state складний;
- багато actions;
- багато взаємопов'язаних полів;
- оновлення state мають складну логіку;
- одна дія змінює кілька частин state;
- потрібно централізувати state transitions;
- reducer можна протестувати окремо.

---

# 48. Коли useState краще

`useState` краще, якщо:

    const [isOpen, setIsOpen] = useState(false);

або:

    const [name, setName] = useState("");

або:

    const [count, setCount] = useState(0);

Логіка проста.

Не потрібно використовувати `useReducer` тільки тому, що це "більш професійний" Hook.

---

# 49. Типова помилка №1 — надмірне використання useReducer

Погано:

    const [isOpen, dispatch] = useReducer(
      reducer,
      false
    );

для простого boolean.

Набагато простіше:

    const [isOpen, setIsOpen] = useState(false);

---

# 50. Типова помилка №2 — мутація state

Погано:

    state.user.name = "Valeriy";

    return state;

Потрібно:

    return {
      ...state,
      user: {
        ...state.user,
        name: "Valeriy",
      },
    };

---

# 51. Типова помилка №3 — side effects у reducer

Погано:

    function reducer(state, action) {
      fetch("/api/data");

      return state;
    }

Reducer повинен описувати state transition.

Side effects повинні бути поза reducer.

---

# 52. Типова помилка №4 — занадто багато логіки в component

Погано:

    function Component() {
      // 200 lines of state logic
      // many conditions
      // many setState calls
      // many related transitions
    }

Якщо state logic стає складною, її можна винести в:

    reducer

Тоді компонент більше відповідає за:

    UI
    +
    dispatch actions

---

# 53. Типова помилка №5 — reducer знає про UI

Reducer не повинен бути прив'язаний до JSX.

Погано:

    function reducer(state, action) {
      if (action.type === "button-clicked") {
        // complicated UI-specific logic
      }

      return state;
    }

Краще описувати бізнес-подію:

    {
      type: "increment"
    }

або:

    {
      type: "todo-added",
      payload: todo
    }

---

# 54. Типова помилка №6 — action описує implementation

Наприклад:

    {
      type: "set-state-to-10"
    }

Це занадто прив'язано до конкретного способу зміни state.

Краще:

    {
      type: "set-count",
      payload: 10
    }

Або для іншої бізнес-логіки:

    {
      type: "order-completed"
    }

---

# 55. Типова помилка №7 — один величезний reducer

Не потрібно створювати reducer на сотні рядків для state, який насправді складається з незалежних частин.

Іноді краще:

    useState

або кілька окремих reducer/state.

Також можна винести частини логіки в окремі функції.

---

# 56. Типова помилка №8 — мутувати вкладені об'єкти

Погано:

    state.user.name = "New name";

Краще:

    return {
      ...state,
      user: {
        ...state.user,
        name: "New name",
      },
    };

Потрібно оновити всі рівні, які змінюються.

---

# 57. useReducer і nested state

Наприклад:

    type State = {
      user: {
        name: string;
        email: string;
      };
    };

Оновлення:

    return {
      ...state,
      user: {
        ...state.user,
        name: action.payload,
      },
    };

Не можна просто:

    state.user.name = action.payload;

---

# 58. useReducer і масиви

Наприклад:

    type State = {
      items: Item[];
    };

Додавання:

    return {
      ...state,
      items: [
        ...state.items,
        action.payload,
      ],
    };

Видалення:

    return {
      ...state,
      items: state.items.filter(item => {
        return item.id !== action.payload;
      }),
    };

Оновлення:

    return {
      ...state,
      items: state.items.map(item => {
        if (item.id !== action.payload.id) {
          return item;
        }

        return {
          ...item,
          ...action.payload,
        };
      }),
    };

---

# 59. useReducer + useContext

Це дуже важливий патерн.

Можна поєднати:

    useReducer
        +
    useContext

і отримати state management для цілого subtree.

Модель:

    Context
       ↓
    state
       +
    dispatch
       ↓
    components

---

# 60. Context + Reducer

Наприклад:

    const [state, dispatch] = useReducer(
      reducer,
      initialState
    );

    return (
      <AppContext.Provider
        value={{
          state,
          dispatch,
        }}
      >
        {children}
      </AppContext.Provider>
    );

Тепер дочірні компоненти можуть отримати:

    state

і:

    dispatch

через Context.

---

# 61. Context + Reducer: ментальна модель

    User action
         ↓
      dispatch
         ↓
       reducer
         ↓
      new state
         ↓
      Provider
         ↓
     consumers
         ↓
      UI update

Це одна з класичних архітектур React.

---

# 62. Приклад Context + Reducer

    "use client";

    import {
      createContext,
      useContext,
      useReducer,
    } from "react";

    type State = {
      count: number;
    };

    type Action =
      | {
          type: "increment";
        }
      | {
          type: "decrement";
        };

    const initialState: State = {
      count: 0,
    };

    function reducer(
      state: State,
      action: Action
    ): State {
      switch (action.type) {
        case "increment":
          return {
            count: state.count + 1,
          };

        case "decrement":
          return {
            count: state.count - 1,
          };

        default:
          return state;
      }
    }

    type CounterContextValue = {
      state: State;
      dispatch: React.Dispatch<Action>;
    };

    const CounterContext =
      createContext<CounterContextValue | null>(null);

    export function CounterProvider({
      children,
    }: {
      children: React.ReactNode;
    }) {
      const [state, dispatch] = useReducer(
        reducer,
        initialState
      );

      return (
        <CounterContext.Provider
          value={{
            state,
            dispatch,
          }}
        >
          {children}
        </CounterContext.Provider>
      );
    }

    export function useCounter() {
      const context = useContext(CounterContext);

      if (!context) {
        throw new Error(
          "useCounter must be used inside CounterProvider"
        );
      }

      return context;
    }

---

# 63. Використання Context + Reducer

Компонент:

    function Counter() {
      const {
        state,
        dispatch,
      } = useCounter();

      return (
        <div>
          <p>{state.count}</p>

          <button
            onClick={() => {
              dispatch({
                type: "increment",
              });
            }}
          >
            +
          </button>

          <button
            onClick={() => {
              dispatch({
                type: "decrement",
              });
            }}
          >
            -
          </button>
        </div>
      );
    }

Тепер компонент не має власного:

    useReducer

Він використовує reducer через Context.

---

# 64. useReducer + custom Hook

Дуже часто reducer ховають у custom Hook.

Наприклад:

    function useCounter() {
      const [state, dispatch] = useReducer(
        reducer,
        initialState
      );

      const increment = () => {
        dispatch({
          type: "increment",
        });
      };

      const decrement = () => {
        dispatch({
          type: "decrement",
        });
      };

      return {
        count: state.count,
        increment,
        decrement,
      };
    }

Компонент:

    function Counter() {
      const {
        count,
        increment,
        decrement,
      } = useCounter();

      return (
        <div>
          <p>{count}</p>

          <button onClick={increment}>
            +
          </button>

          <button onClick={decrement}>
            -
          </button>
        </div>
      );
    }

---

# 65. Reducer можна тестувати окремо

Одна з великих переваг reducer — його можна тестувати як звичайну функцію.

Наприклад:

    const state = {
      count: 0,
    };

    const action = {
      type: "increment",
    };

    const result = reducer(
      state,
      action
    );

Очікуємо:

    {
      count: 1
    }

Reducer не потребує React для перевірки самої state transition логіки.

---

# 66. Тестування reducer концептуально

Можна перевірити:

    reducer(
      {
        count: 0
      },
      {
        type: "increment"
      }
    )

і очікувати:

    {
      count: 1
    }

Потім:

    reducer(
      {
        count: 1
      },
      {
        type: "decrement"
      }
    )

очікувати:

    {
      count: 0
    }

---

# 67. Reducer як документація логіки

Наприклад:

    case "login-start":
    case "login-success":
    case "login-error":
    case "logout":

Навіть без JSX можна побачити:

    які стани та переходи існують.

Тому reducer може бути не тільки технічним кодом, але й способом описати state machine компонента.

---

# 68. useReducer і state machine

Наприклад:

    idle
      ↓
    loading
      ↓
    success

або:

    idle
      ↓
    loading
      ↓
    error

Reducer описує дозволені переходи:

    state + action
          ↓
    next state

Для дуже складних state machines можуть використовуватися спеціалізовані бібліотеки, але для багатьох компонентів звичайного `useReducer` достатньо.

---

# 69. Actions як події

Хороший стиль:

    {
      type: "todo-added",
      payload: todo
    }

    {
      type: "todo-removed",
      payload: todoId
    }

    {
      type: "todo-completed",
      payload: todoId
    }

Тобто action відповідає на питання:

> Що сталося?

---

# 70. Reducer як центральна логіка

Наприклад:

    Component
       ↓
    dispatch({
      type: "todo-added",
      payload: todo
    })
       ↓
    reducer
       ↓
    new state

Компоненту не потрібно знати всі деталі того, як саме додається todo.

Він лише повідомляє:

    todo-added

---

# 71. Separation of concerns

`useReducer` допомагає розділити:

### UI

    button
    input
    form
    list

від:

### State logic

    reducer
    actions
    transitions

Наприклад:

    button
      ↓
    dispatch(action)
      ↓
    reducer
      ↓
    state
      ↓
    UI

---

# 72. useReducer і React rendering

Коли виконується:

    dispatch(action);

React запускає відповідну state update логіку.

Reducer отримує:

    current state
    +
    action

і повертає:

    next state

Після цього React може виконати повторний render компонента з новим state.

---

# 73. dispatch не змінює state прямо

Не потрібно думати:

    dispatch({
      type: "increment"
    });

як:

    state.count++;

Насправді:

    dispatch(action)
        ↓
    reducer(state, action)
        ↓
    new state
        ↓
    render

---

# 74. dispatch і action object

Наприклад:

    dispatch({
      type: "set-name",
      payload: "Valeriy",
    });

`dispatch` передає action reducer-у.

Reducer:

    function reducer(state, action) {
      switch (action.type) {
        case "set-name":
          return {
            ...state,
            name: action.payload,
          };

        default:
          return state;
      }
    }

---

# 75. Не потрібно передавати весь state в action

Погано:

    dispatch({
      type: "update",
      payload: {
        ...state,
        count: state.count + 1,
      },
    });

Це переносить логіку reducer у компонент.

Краще:

    dispatch({
      type: "increment",
    });

А reducer сам вирішує:

    count: state.count + 1

---

# 76. Action повинен бути простим

Хороший action:

    {
      type: "increment"
    }

Хороший action:

    {
      type: "set-name",
      payload: "Valeriy"
    }

Хороший action:

    {
      type: "delete-todo",
      payload: 10
    }

Компонент повідомляє про подію.

Reducer визначає, як змінити state.

---

# 77. useReducer і складні залежності між state

Наприклад:

    {
      selectedProduct,
      cart,
      total,
      discount,
      isCheckoutOpen
    }

Одна action:

    {
      type: "checkout"
    }

може змінити кілька частин state.

Це один із випадків, де reducer може бути значно зрозумілішим, ніж багато незалежних `setState`.

---

# 78. Практичний приклад Cart reducer

    type Product = {
      id: number;
      name: string;
      price: number;
    };

    type CartItem = Product & {
      quantity: number;
    };

    type State = {
      items: CartItem[];
    };

    type Action =
      | {
          type: "add";
          payload: Product;
        }
      | {
          type: "remove";
          payload: number;
        }
      | {
          type: "clear";
        };

---

# 79. Cart reducer

    function reducer(
      state: State,
      action: Action
    ): State {
      switch (action.type) {
        case "add": {
          const existingItem = state.items.find(
            item => item.id === action.payload.id
          );

          if (existingItem) {
            return {
              items: state.items.map(item => {
                if (item.id !== action.payload.id) {
                  return item;
                }

                return {
                  ...item,
                  quantity: item.quantity + 1,
                };
              }),
            };
          }

          return {
            items: [
              ...state.items,
              {
                ...action.payload,
                quantity: 1,
              },
            ],
          };
        }

        case "remove":
          return {
            items: state.items.filter(item => {
              return item.id !== action.payload;
            }),
          };

        case "clear":
          return {
            items: [],
          };

        default:
          return state;
      }
    }

---

# 80. useReducer і похідні значення

Не потрібно зберігати в reducer все, що можна обчислити.

Наприклад, якщо є:

    items

не обов'язково зберігати окремо:

    total

якщо його легко обчислити:

    const total = items.reduce(
      (sum, item) => {
        return sum + item.price * item.quantity;
      },
      0
    );

Можна уникнути дублювання state.

---

# 81. Derived state

Наприклад:

    state.items

є основним state.

А:

    total

є derived value.

Тоді:

    const total = state.items.reduce(
      (sum, item) => {
        return sum + item.price;
      },
      0
    );

Це часто краще, ніж зберігати і:

    items

і:

    total

та постійно синхронізувати їх.

---

# 82. Reducer і derived state

Reducer повинен зберігати те, що справді є state.

Не потрібно додавати:

    total
    itemCount
    hasItems

якщо їх легко отримати з:

    items

Наприклад:

    const itemCount = state.items.length;

---

# 83. Lazy initialization

`useReducer` має третій аргумент для lazy initialization:

    const [state, dispatch] = useReducer(
      reducer,
      initialArg,
      init
    );

Наприклад:

    function init(initialCount: number) {
      return {
        count: initialCount,
      };
    }

    const [state, dispatch] = useReducer(
      reducer,
      10,
      init
    );

---

# 84. Навіщо потрібен init

Lazy initialization корисний, якщо початковий state потрібно обчислити.

Наприклад:

    function init(initialValue: string) {
      return {
        value: initialValue.trim(),
        isValid: initialValue.trim().length > 0,
      };
    }

Тоді:

    const [state, dispatch] = useReducer(
      reducer,
      initialValue,
      init
    );

---

# 85. useReducer з localStorage

Наприклад, initial state можна отримати з localStorage через initializer.

Але потрібно враховувати середовище виконання.

Для браузерного API:

    localStorage

у Next.js потрібно бути уважним до Server/Client Components.

Наприклад:

    "use client";

    function init() {
      const saved = localStorage.getItem("todos");

      if (!saved) {
        return {
          todos: [],
        };
      }

      return {
        todos: JSON.parse(saved),
      };
    }

---

# 86. Side effects і localStorage

Важливо відрізняти:

    reading initial state

від:

    saving state

Для збереження змін краще використовувати:

    useEffect

Наприклад:

    useEffect(() => {
      localStorage.setItem(
        "todos",
        JSON.stringify(state.todos)
      );
    }, [state.todos]);

Reducer при цьому залишається чистою функцією.

---

# 87. useReducer і useEffect

Типовий сценарій:

    dispatch({
      type: "loading",
    });

    useEffect(() => {
      // side effect
    }, []);

Reducer:

    state transitions

Effect:

    side effects

Це різні відповідальності.

---

# 88. useReducer і useCallback

`dispatch` часто передають у callback:

    const handleIncrement = useCallback(() => {
      dispatch({
        type: "increment",
      });
    }, []);

У багатьох випадках це може бути корисно при передачі handler у memoized child.

Але, як і завжди з `useCallback`, не потрібно використовувати його без конкретної причини.

---

# 89. useReducer і memoized child

Наприклад:

    const Child = memo(function Child({
      onIncrement,
    }: {
      onIncrement: () => void;
    }) {
      return (
        <button onClick={onIncrement}>
          +
        </button>
      );
    });

У parent:

    const handleIncrement = useCallback(() => {
      dispatch({
        type: "increment",
      });
    }, []);

    return (
      <Child onIncrement={handleIncrement} />
    );

Це поєднання:

    useReducer
    +
    useCallback
    +
    React.memo

може використовуватися для оптимізації складного дерева компонентів.

---

# 90. useReducer і Context — коли це корисно

Цей патерн може бути корисним для:

- authentication state;
- shopping cart;
- theme settings;
- application preferences;
- complex forms;
- wizard/multi-step forms;
- shared UI state;
- dashboard state.

Наприклад:

    App
     ↓
    Provider
     ↓
    useReducer
     ↓
    state + dispatch
     ↓
    many components

---

# 91. Context + Reducer не є автоматично Redux

Важливо:

    useReducer + useContext

не означає:

    Redux

Це просто React API, з яких можна побудувати певну архітектуру shared state.

Redux — окрема бібліотека зі своєю екосистемою та правилами.

---

# 92. useReducer і великий application state

Для невеликого локального state:

    useReducer

чудово підходить.

Але не потрібно автоматично переносити весь application state в один reducer.

Для великих застосунків можуть бути корисні:

- розділені Context;
- кілька reducer-ів;
- custom Hooks;
- зовнішні state management libraries;
- server state libraries;
- інші архітектурні рішення.

---

# 93. Local state vs global state

`useReducer` не робить state глобальним.

Наприклад:

    function TodoList() {
      const [state, dispatch] = useReducer(
        reducer,
        initialState
      );

      // ...
    }

Цей state належить конкретному компоненту та його subtree через звичайне React rendering.

Щоб зробити його доступним ширше, можна використати:

    Context

---

# 94. useReducer і separation of concerns

Корисна архітектура:

    Component
       │
       ├── UI
       │
       └── dispatch(action)
                  ↓
               reducer
                  ↓
               state

Reducer відповідає за:

    state logic

Компонент відповідає за:

    UI
    events
    dispatching actions

---

# 95. Reducer можна винести в окремий файл

Наприклад:

    src/
    ├── components/
    │   └── TodoList.tsx
    │
    └── reducers/
        └── todoReducer.ts

У `todoReducer.ts`:

    export type Todo = {
      id: number;
      title: string;
      completed: boolean;
    };

    export type TodoState = {
      todos: Todo[];
    };

    export type TodoAction =
      | {
          type: "add";
          payload: Todo;
        }
      | {
          type: "delete";
          payload: number;
        }
      | {
          type: "toggle";
          payload: number;
        };

    export function todoReducer(
      state: TodoState,
      action: TodoAction
    ): TodoState {
      // ...
    }

Це корисно, коли reducer стає достатньо великим.

---

# 96. Структура feature

Для більшого компонента можна організувати:

    todo/
    ├── TodoList.tsx
    ├── todoReducer.ts
    ├── todoTypes.ts
    └── todoUtils.ts

Наприклад:

    todoReducer.ts
    → state transitions

    todoTypes.ts
    → State / Action / Todo types

    todoUtils.ts
    → pure helper functions

    TodoList.tsx
    → UI

Це вже наближається до feature-oriented структури.

---

# 97. Reducer і helper functions

Якщо reducer стає складним, можна винести частину логіки:

    function addTodo(
      todos: Todo[],
      todo: Todo
    ): Todo[] {
      return [
        ...todos,
        todo,
      ];
    }

Reducer:

    case "add":
      return {
        ...state,
        todos: addTodo(
          state.todos,
          action.payload
        ),
      };

Helper також має бути pure function.

---

# 98. Exhaustive checking у TypeScript

Для більш строгого reducer можна зробити helper:

    function assertNever(
      value: never
    ): never {
      throw new Error(
        `Unhandled action: ${JSON.stringify(value)}`
      );
    }

Reducer:

    function reducer(
      state: State,
      action: Action
    ): State {
      switch (action.type) {
        case "increment":
          return {
            count: state.count + 1,
          };

        case "decrement":
          return {
            count: state.count - 1,
          };

        default:
          return assertNever(action);
      }
    }

Якщо додати новий action type і забути обробити його в reducer, TypeScript допоможе виявити проблему.

---

# 99. Навіщо потрібна exhaustiveness checking

Припустимо:

    type Action =
      | { type: "increment" }
      | { type: "decrement" }
      | { type: "reset" };

А reducer обробляє тільки:

    increment
    decrement

З `assertNever` TypeScript може показати, що:

    reset

не оброблений.

Це особливо корисно у великих reducer-ах.

---

# 100. Reducer повинен повертати state

Не потрібно:

    function reducer(state, action) {
      if (action.type === "unknown") {
        return;
      }
    }

Reducer повинен повертати відповідний state.

Для невідомої action у типізованому reducer правильніше мати exhaustiveness checking.

У простішому JavaScript reducer:

    default:
      return state;

---

# 101. Практичний приклад: Auth reducer

State:

    type AuthState = {
      user: User | null;
      status: "idle" | "loading" | "authenticated" | "error";
      error: string | null;
    };

Actions:

    type AuthAction =
      | {
          type: "login-start";
        }
      | {
          type: "login-success";
          payload: User;
        }
      | {
          type: "login-error";
          payload: string;
        }
      | {
          type: "logout";
        };

---

# 102. Auth reducer

    function reducer(
      state: AuthState,
      action: AuthAction
    ): AuthState {
      switch (action.type) {
        case "login-start":
          return {
            user: null,
            status: "loading",
            error: null,
          };

        case "login-success":
          return {
            user: action.payload,
            status: "authenticated",
            error: null,
          };

        case "login-error":
          return {
            user: null,
            status: "error",
            error: action.payload,
          };

        case "logout":
          return {
            user: null,
            status: "idle",
            error: null,
          };

        default:
          return state;
      }
    }

---

# 103. Auth flow

    login button
         ↓
    dispatch({
      type: "login-start"
    })
         ↓
      loading
         ↓
      API request
         ↓
    ┌────┴─────┐
    ↓          ↓
 success      error
    ↓          ↓
 login-success login-error
    ↓          ↓
authenticated error

Це дуже зручна модель для складних async flows.

---

# 104. useReducer і wizard form

Наприклад, multi-step form:

    {
      step: 1,
      name: "",
      email: "",
      completed: false
    }

Actions:

    next
    previous
    set-name
    set-email
    complete
    reset

Reducer централізовано визначає:

    step → step + 1
    step → step - 1
    completed → true

---

# 105. useReducer і pagination

State:

    {
      page: 1,
      pageSize: 20,
      status: "idle",
      items: []
    }

Actions:

    next-page
    previous-page
    set-page
    loading
    success
    error

Це може бути зручніше, ніж багато незалежних state variables.

---

# 106. useReducer і filters

State:

    {
      search: "",
      category: "all",
      sort: "name",
      page: 1
    }

Actions:

    set-search
    set-category
    set-sort
    next-page
    previous-page
    reset-filters

Reducer централізує правила зміни filter state.

---

# 107. useReducer і складний UI

Наприклад modal workflow:

    closed
      ↓
    open
      ↓
    editing
      ↓
    saving
      ↓
    success

Actions:

    open
    edit
    save
    success
    cancel

Такі переходи легко представити через reducer.

---

# 108. useReducer і бізнес-логіка

Одна з сильних сторін reducer:

    UI event
       ↓
    business action
       ↓
    reducer
       ↓
    state transition

Наприклад:

    dispatch({
      type: "order-submitted",
      payload: order,
    });

Reducer визначає:

    що відбувається зі state.

---

# 109. Reducer не повинен знати про DOM

Reducer не повинен працювати з:

    document
    window
    DOM elements
    refs

Його задача:

    state + action → new state

DOM logic залишається в React components/hooks.

---

# 110. Reducer не повинен знати про HTTP

Reducer не повинен робити:

    fetch()
    axios()
    XMLHttpRequest()

Він може обробити результат:

    {
      type: "fetch-success",
      payload: data
    }

А сам HTTP request виконується поза reducer.

---

# 111. Reducer не повинен знати про localStorage

Не потрібно:

    function reducer(state, action) {
      localStorage.setItem(...);

      return state;
    }

Краще:

    reducer
      ↓
    state
      ↓
    useEffect
      ↓
    localStorage

---

# 112. Reducer і pure functions

Хороший reducer:

    function reducer(state, action) {
      switch (action.type) {
        case "increment":
          return {
            ...state,
            count: state.count + 1,
          };

        default:
          return state;
      }
    }

Його можна викликати:

    reducer(state, action)

і отримувати передбачуваний результат.

---

# 113. useReducer і predictability

Велика перевага:

    action
      ↓
    reducer
      ↓
    next state

Логіка зміни state знаходиться в одному місці.

Це полегшує:

- debugging;
- testing;
- code review;
- підтримку;
- розширення функціональності.

---

# 114. useReducer і debugging

Замість:

    setCount(...)
    setLoading(...)
    setError(...)
    setData(...)

можна бачити:

    dispatch({
      type: "fetch-success",
      payload: data,
    });

Це часто краще пояснює:

> що саме відбулося.

---

# 115. useReducer і action naming

Хороші назви:

    "increment"
    "decrement"
    "todo-added"
    "todo-removed"
    "login-start"
    "login-success"
    "login-error"
    "logout"

Намагайся називати actions зрозуміло.

---

# 116. Подія vs команда

У reducer architecture корисно думати:

    "Що сталося?"

Наприклад:

    "todo-added"

замість:

    "add-todo-to-array"

Перше описує подію.

Друге описує implementation detail.

---

# 117. useReducer і event sourcing — не те саме

Actions можуть нагадувати події, але:

    useReducer

не означає автоматично:

    event sourcing

Не потрібно плутати ці концепції.

Reducer просто використовує action для визначення нового state.

---

# 118. useReducer і immutable update — коротко

Object:

    return {
      ...state,
      name: "New",
    };

Array:

    return [
      ...items,
      newItem,
    ];

Remove:

    return items.filter(...);

Update:

    return items.map(...);

Nested object:

    return {
      ...state,
      user: {
        ...state.user,
        name: "New",
      },
    };

---

# 119. useReducer і Immer

Для дуже складного nested state можна використовувати бібліотеки, які спрощують immutable updates.

Наприклад, Immer дозволяє писати mutation-like syntax, яка перетворюється на immutable update.

Але для базового React важливо спочатку добре знати звичайні:

    spread
    map
    filter

Не потрібно додавати бібліотеку, якщо state простий.

---

# 120. useReducer і performance

`useReducer` не є автоматично швидшим за `useState`.

Вибір між ними — насамперед питання:

    state complexity
    +
    organization
    +
    maintainability

Не:

    useReducer = faster

---

# 121. useReducer і React Compiler / оптимізація

Не потрібно використовувати `useReducer` як спосіб оптимізації rendering.

Його основне призначення:

    structured state logic

Для rendering performance існують інші інструменти та підходи:

    component structure
    memoization
    React.memo
    useMemo
    useCallback
    profiling

---

# 122. Коли reducer стає занадто великим

Якщо reducer має:

    500+ lines

це сигнал переглянути структуру.

Можливо:

- state можна розділити;
- reducer можна розділити;
- helper functions можна винести;
- custom Hook можна розділити;
- Context можна розділити;
- частину state можна локалізувати.

Не потрібно створювати "God reducer".

---

# 123. Один reducer чи кілька?

Можна мати:

    useReducer(userReducer, ...)
    useReducer(cartReducer, ...)
    useReducer(uiReducer, ...)

замість:

    useReducer(
      giantApplicationReducer,
      ...
    )

Для локального state це часто простіше.

---

# 124. useReducer і composition

Наприклад:

    function App() {
      const [userState, userDispatch] =
        useReducer(userReducer, userInitialState);

      const [cartState, cartDispatch] =
        useReducer(cartReducer, cartInitialState);

      // ...
    }

Тепер кожна область має власну state logic.

---

# 125. useReducer і custom hooks

Можна сховати reducer:

    function useTodos() {
      const [state, dispatch] = useReducer(
        todoReducer,
        initialState
      );

      return {
        todos: state.todos,

        addTodo(todo: Todo) {
          dispatch({
            type: "add",
            payload: todo,
          });
        },

        deleteTodo(id: number) {
          dispatch({
            type: "delete",
            payload: id,
          });
        },
      };
    }

Компонент отримує простий API.

---

# 126. Custom Hook як API

Компоненту не обов'язково знати:

    reducer
    action types
    state structure

Він може отримати:

    const {
      todos,
      addTodo,
      deleteTodo,
    } = useTodos();

Це допомагає приховати implementation details.

---

# 127. Reducer + custom Hook

Ментальна модель:

    Component
       ↓
    useTodos()
       ↓
    useReducer()
       ↓
    reducer
       ↓
    state

Custom Hook стає шаром між UI та state logic.

---

# 128. useReducer і TypeScript: хороший шаблон

    type State = {
      // state
    };

    type Action =
      | {
          type: "action-one";
        }
      | {
          type: "action-two";
          payload: SomeType;
        };

    const initialState: State = {
      // ...
    };

    function reducer(
      state: State,
      action: Action
    ): State {
      switch (action.type) {
        case "action-one":
          return {
            // ...
          };

        case "action-two":
          return {
            // ...
          };

        default:
          return state;
      }
    }

---

# 129. useReducer і `any`

Не потрібно писати:

    function reducer(
      state: any,
      action: any
    ) {
      // ...
    }

Краще явно описати:

    type State = {
      count: number;
    };

    type Action =
      | {
          type: "increment";
        }
      | {
          type: "set";
          payload: number;
        };

    function reducer(
      state: State,
      action: Action
    ): State {
      // ...
    }

Це дає TypeScript можливість перевіряти reducer.

---

# 130. Практичний повний Todo App

    import {
      useReducer,
    } from "react";

    type Todo = {
      id: number;
      title: string;
      completed: boolean;
    };

    type State = {
      todos: Todo[];
    };

    type Action =
      | {
          type: "add";
          payload: Todo;
        }
      | {
          type: "toggle";
          payload: number;
        }
      | {
          type: "delete";
          payload: number;
        }
      | {
          type: "clear-completed";
        }
      | {
          type: "clear-all";
        };

    const initialState: State = {
      todos: [],
    };

    function reducer(
      state: State,
      action: Action
    ): State {
      switch (action.type) {
        case "add":
          return {
            todos: [
              ...state.todos,
              action.payload,
            ],
          };

        case "toggle":
          return {
            todos: state.todos.map(todo => {
              if (todo.id !== action.payload) {
                return todo;
              }

              return {
                ...todo,
                completed: !todo.completed,
              };
            }),
          };

        case "delete":
          return {
            todos: state.todos.filter(todo => {
              return todo.id !== action.payload;
            }),
          };

        case "clear-completed":
          return {
            todos: state.todos.filter(todo => {
              return !todo.completed;
            }),
          };

        case "clear-all":
          return {
            todos: [],
          };

        default:
          return state;
      }
    }

    export default function TodoApp() {
      const [state, dispatch] = useReducer(
        reducer,
        initialState
      );

      const handleAdd = () => {
        const todo: Todo = {
          id: Date.now(),
          title: "Learn useReducer",
          completed: false,
        };

        dispatch({
          type: "add",
          payload: todo,
        });
      };

      return (
        <div>
          <button onClick={handleAdd}>
            Add
          </button>

          <button
            onClick={() => {
              dispatch({
                type: "clear-completed",
              });
            }}
          >
            Clear completed
          </button>

          <button
            onClick={() => {
              dispatch({
                type: "clear-all",
              });
            }}
          >
            Clear all
          </button>

          <ul>
            {state.todos.map(todo => (
              <li key={todo.id}>
                <button
                  onClick={() => {
                    dispatch({
                      type: "toggle",
                      payload: todo.id,
                    });
                  }}
                >
                  {todo.completed ? "✓" : "○"}
                </button>

                {todo.title}

                <button
                  onClick={() => {
                    dispatch({
                      type: "delete",
                      payload: todo.id,
                    });
                  }}
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      );
    }

---

# 131. Що відбувається у Todo App

Користувач натискає:

    Add

Виконується:

    dispatch({
      type: "add",
      payload: todo,
    });

Reducer отримує:

    state
    +
    action

і виконує:

    case "add":

Повертає новий state:

    {
      todos: [
        ...state.todos,
        todo
      ]
    }

React оновлює UI.

---

# 132. Порівняння setState і dispatch

## useState

    setTodos(currentTodos => [
      ...currentTodos,
      todo,
    ]);

Тут компонент безпосередньо визначає:

    як змінити state.

---

## useReducer

    dispatch({
      type: "add",
      payload: todo,
    });

А reducer визначає:

    як змінити state.

Тобто логіка переходу state переноситься в reducer.

---

# 133. useReducer і великий компонент

До reducer:

    function TodoApp() {
      const [todos, setTodos] = useState([]);
      const [isLoading, setIsLoading] = useState(false);
      const [error, setError] = useState(null);
      const [filter, setFilter] = useState("all");

      // many handlers
      // many state updates
      // many conditions
    }

Після:

    const [state, dispatch] = useReducer(
      reducer,
      initialState
    );

Компонент працює через:

    dispatch({
      type: "..."
    });

А state transitions зібрані в одному місці.

---

# 134. Але useReducer не завжди робить компонент коротшим

Наприклад, замість:

    setName(value);

можна отримати:

    dispatch({
      type: "set-name",
      payload: value,
    });

Для простого state це може бути навіть довше.

Перевага з'являється тоді, коли state logic достатньо складна, щоб централізація її спростила.

---

# 135. Коли useReducer — хороший вибір

Запитай себе:

### 1. Чи багато способів змінити state?

Якщо так — reducer може бути корисним.

### 2. Чи пов'язані між собою різні state fields?

Якщо так — reducer може спростити transitions.

### 3. Чи одна action змінює кілька полів?

Якщо так — reducer може бути дуже зручним.

### 4. Чи потрібно тестувати state logic окремо?

Якщо так — pure reducer добре підходить.

### 5. Чи стає багато `setState`?

Якщо так — можна розглянути `useReducer`.

---

# 136. Коли useReducer не потрібен

Якщо є:

    const [isOpen, setIsOpen] = useState(false);

не потрібно робити:

    const [state, dispatch] = useReducer(...);

Простий state повинен залишатися простим.

---

# 137. Питання зі співбесіди

### Що таке useReducer?

`useReducer` — React Hook для керування state через reducer function та actions.

---

### Який синтаксис useReducer?

    const [state, dispatch] = useReducer(
      reducer,
      initialState
    );

---

### Що таке reducer?

Функція:

    (state, action) => newState

яка визначає, як state переходить у новий стан.

---

### Що таке action?

Об'єкт, який описує подію або дію:

    {
      type: "increment"
    }

---

### Що таке dispatch?

Функція, яка передає action reducer-у:

    dispatch({
      type: "increment",
    });

---

### Чим useReducer відрізняється від useState?

`useState` зручний для простого state та прямого оновлення.

`useReducer` централізує складні state transitions через actions і reducer.

---

### Чи useReducer швидший за useState?

Ні. Вибір між ними не повинен ґрунтуватися на припущенні, що `useReducer` автоматично швидший.

---

### Чи reducer може виконувати fetch?

Не повинен.

Reducer має бути pure function.

Fetch — side effect і має виконуватися поза reducer.

---

### Чи можна мутувати state у reducer?

Ні.

Потрібно повертати новий state із immutable updates.

---

### Навіщо потрібен payload?

Для передачі додаткових даних action:

    {
      type: "set-name",
      payload: "Valeriy"
    }

---

### Що таке discriminated union?

TypeScript-патерн, де спільне поле, наприклад:

    type

визначає конкретний варіант union і дозволяє TypeScript правильно звузити тип.

---

### Чи можна використовувати useReducer з Context?

Так.

Поширений патерн:

    useReducer
    +
    useContext

---

### Чи useReducer робить state глобальним?

Ні.

State стає доступним ширше тільки якщо його передати, наприклад, через Context.

---

### Чи можна тестувати reducer окремо від React?

Так.

Reducer — звичайна функція, тому його state transitions можна тестувати окремо.

---

### Чому reducer повинен бути pure?

Щоб однакові:

    state
    +
    action

давали передбачуваний:

    new state

і щоб side effects не були змішані з state logic.

---

# 138. Шлях вивчення

## 🟢 Core

Потрібно добре знати:

- що таке `useReducer`;
- reducer;
- state;
- action;
- `dispatch`;
- `initialState`;
- `payload`;
- `switch`;
- immutable updates;
- різницю між `useState` та `useReducer`.

---

## 🔵 Junior

Потрібно вміти:

- створити reducer;
- створити actions;
- використовувати `dispatch`;
- працювати з object state;
- працювати з arrays;
- не мутувати state;
- типізувати reducer у TypeScript;
- використовувати discriminated unions;
- розуміти async flow через actions.

---

## 🟠 Middle

Потрібно розуміти:

- pure functions;
- state transitions;
- complex forms;
- async state;
- Context + Reducer;
- custom Hooks;
- derived state;
- reducer testing;
- separation of concerns;
- state machine thinking.

---

## 🔴 Senior

Потрібно вміти:

- проектувати складні state transitions;
- розділяти reducer-и;
- визначати межі state;
- уникати надмірної складності;
- проектувати actions як domain events;
- оптимізувати структуру Context + Reducer;
- визначати, коли потрібен зовнішній state manager;
- підтримувати reducer architecture у великих застосунках.

---

# 139. Міні-шпаргалка

    import { useReducer } from "react";

    const initialState = {
      count: 0,
    };

    function reducer(state, action) {
      switch (action.type) {
        case "increment":
          return {
            ...state,
            count: state.count + 1,
          };

        case "decrement":
          return {
            ...state,
            count: state.count - 1,
          };

        default:
          return state;
      }
    }

    function Counter() {
      const [state, dispatch] = useReducer(
        reducer,
        initialState
      );

      return (
        <div>
          <p>{state.count}</p>

          <button
            onClick={() => {
              dispatch({
                type: "increment",
              });
            }}
          >
            +
          </button>

          <button
            onClick={() => {
              dispatch({
                type: "decrement",
              });
            }}
          >
            -
          </button>
        </div>
      );
    }

---

# 140. Міні-шпаргалка TypeScript

    type State = {
      count: number;
    };

    type Action =
      | {
          type: "increment";
        }
      | {
          type: "decrement";
        }
      | {
          type: "set";
          payload: number;
        };

    function reducer(
      state: State,
      action: Action
    ): State {
      switch (action.type) {
        case "increment":
          return {
            count: state.count + 1,
          };

        case "decrement":
          return {
            count: state.count - 1,
          };

        case "set":
          return {
            count: action.payload,
          };

        default:
          return state;
      }
    }

---

# 141. Міні-шпаргалка потоку

    User action
         ↓
    dispatch(action)
         ↓
    reducer(state, action)
         ↓
    new state
         ↓
    React render
         ↓
    updated UI

---

# 142. Міні-шпаргалка immutable update

## Object

    return {
      ...state,
      count: state.count + 1,
    };

## Array — add

    return {
      ...state,
      items: [
        ...state.items,
        newItem,
      ],
    };

## Array — delete

    return {
      ...state,
      items: state.items.filter(item => {
        return item.id !== id;
      }),
    };

## Array — update

    return {
      ...state,
      items: state.items.map(item => {
        if (item.id !== id) {
          return item;
        }

        return {
          ...item,
          completed: true,
        };
      }),
    };

---

# 143. Міні-шпаргалка Context + Reducer

    Provider
       ↓
    useReducer
       ↓
    state + dispatch
       ↓
    Context
       ↓
    components
       ↓
    dispatch(action)
       ↓
    reducer
       ↓
    new state

Це дозволяє побудувати shared state для певного subtree без введення окремої state management бібліотеки.

---

# 144. Міні-шпаргалка: useState чи useReducer?

    Простий state?
        ↓
       так
        ↓
    useState

    Складна state logic?
        ↓
       так
        ↓
    useReducer

    Багато пов'язаних transitions?
        ↓
       так
        ↓
    useReducer

    Одна проста boolean?
        ↓
       так
        ↓
    useState

---

# 145. Головне, що потрібно запам'ятати

1. `useReducer` — React Hook для керування складним state.

2. Основна модель:

       state
         ↓
       action
         ↓
       reducer
         ↓
       new state

3. Синтаксис:

       const [state, dispatch] = useReducer(
         reducer,
         initialState
       );

4. `dispatch` відправляє action.

5. Action описує, що відбулося.

6. Reducer визначає, як змінюється state.

7. Reducer має вигляд:

       (state, action) => newState

8. Reducer повинен бути pure function.

9. Side effects не повинні виконуватися в reducer.

10. Не потрібно робити `fetch()` у reducer.

11. Не потрібно працювати з `localStorage` у reducer.

12. Не потрібно працювати з DOM у reducer.

13. State потрібно оновлювати immutable способом.

14. Не можна мутувати:

       state.count++

15. Потрібно створювати новий state:

       {
         ...state,
         count: state.count + 1
       }

16. `action.type` описує тип дії.

17. `payload` містить дані action.

18. У TypeScript дуже корисні discriminated unions.

19. `useReducer` особливо корисний для:

       complex forms
       async state
       todo lists
       shopping carts
       filters
       multi-step flows
       authentication state

20. `useReducer` не робить state глобальним.

21. `useReducer + useContext` може бути використаний для shared state.

22. Reducer можна тестувати окремо від React.

23. Не потрібно використовувати `useReducer` для кожного state.

24. Простий state краще залишати з `useState`.

25. Головна ментальна модель:

       dispatch(action)
              ↓
       reducer(state, action)
              ↓
          new state
              ↓
           render

---

# 146. Фінальна ментальна модель

Думай про `useReducer` як про маленьку систему переходів стану:

    CURRENT STATE
          │
          │
          │ dispatch(action)
          ↓
        ACTION
          │
          ↓
       REDUCER
          │
          │
          ↓
      NEW STATE
          │
          ↓
        REACT
          │
          ↓
          UI

Наприклад:

    {
      status: "idle",
      data: [],
      error: null
    }

        ↓

    dispatch({
      type: "loading"
    })

        ↓

    reducer

        ↓

    {
      status: "loading",
      data: [],
      error: null
    }

        ↓

    dispatch({
      type: "success",
      payload: users
    })

        ↓

    reducer

        ↓

    {
      status: "success",
      data: users,
      error: null
    }

Це і є головна ідея `useReducer`:

> **Не змінюй складний state у десятках місць. Описуй події через actions, а правила переходу state зосередь у reducer.**

А найважливіша формула:

    state + action → new state

Саме ця формула є основою мислення при роботі з `useReducer`.