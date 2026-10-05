# 06. useCallback

`useCallback` — це React Hook, який дозволяє **мемоізувати функцію** між рендерами компонента.

Він повертає ту саму функцію між рендерами, поки не змінилися її залежності.

Основне призначення `useCallback`:

- зберегти стабільне посилання на функцію;
- передавати стабільну callback-функцію в дочірній компонент;
- працювати разом із `React.memo`;
- використовувати стабільні функції як dependencies інших Hook-ів;
- уникати непотрібного створення нових callback-посилань у сценаріях, де це реально впливає на продуктивність.

Важливо:

> `useCallback` — це **оптимізація функції**, а не спосіб зберігати стан.

---

# Основний синтаксис

    const handleClick = useCallback(() => {
      doSomething();
    }, [dependencies]);

React повертає мемоізовану функцію.

Якщо dependencies не змінилися, React може повернути те саме посилання на функцію.

---

# Ключові поняття

- `useCallback`
- callback function
- memoization
- function reference
- referential equality
- function identity
- dependencies
- `Object.is`
- `React.memo`
- `useMemo`
- `useEffect`
- child component
- parent component
- re-render
- performance optimization
- unnecessary optimization

---

# 1. Що робить useCallback

Розглянемо звичайну функцію:

    const handleClick = () => {
      console.log("Click");
    };

Під час кожного нового виконання компонента ця функція створюється заново.

З `useCallback`:

    const handleClick = useCallback(() => {
      console.log("Click");
    }, []);

React може зберігати те саме посилання на функцію між рендерами.

---

# 2. Функції — це значення

У JavaScript функція є значенням.

Наприклад:

    const first = () => {
      console.log("Hello");
    };

    const second = () => {
      console.log("Hello");
    };

Це дві різні функції.

Навіть якщо їхній код однаковий:

    console.log(first === second);

результат:

    false

Тому що це різні об'єкти-функції.

---

# 3. Referential equality

У React важливе не тільки:

    "Чи однаковий результат?"

але й:

    "Чи те саме посилання?"

Наприклад:

    const fn1 = () => {};
    const fn2 = () => {};

    console.log(fn1 === fn2);

Результат:

    false

`fn1` і `fn2` — різні function references.

---

# 4. Простий приклад useCallback

    import { useCallback } from "react";

    export default function App() {
      const handleClick = useCallback(() => {
        console.log("Button clicked");
      }, []);

      return (
        <button onClick={handleClick}>
          Click
        </button>
      );
    }

Тут:

    handleClick

має стабільне посилання між рендерами, поки dependencies:

    []

не змінюються.

---

# 5. useCallback і dependencies

Розглянемо:

    const handleClick = useCallback(() => {
      console.log(count);
    }, [count]);

Функція використовує:

    count

тому `count` є dependency.

Коли `count` змінюється, React створює нову callback-функцію.

Модель:

    count
      ↓
    useCallback
      ↓
    handleClick

---

# 6. Чому dependency важлива

Погано:

    const handleClick = useCallback(() => {
      console.log(count);
    }, []);

Тут функція використовує:

    count

але `count` не вказаний у dependencies.

Це може призвести до того, що callback використовуватиме застаріле значення.

Краще:

    const handleClick = useCallback(() => {
      console.log(count);
    }, [count]);

---

# 7. Що таке stale closure

Це важливе поняття для розуміння `useCallback`.

JavaScript-функція може "захоплювати" значення зі свого оточення.

Наприклад:

    function Component() {
      const [count, setCount] = useState(0);

      const handleClick = () => {
        console.log(count);
      };

      // ...
    }

`handleClick` бачить значення `count`, яке було доступне під час створення цієї функції.

Якщо неправильно налаштувати dependencies у `useCallback`, можна отримати **stale closure** — callback працюватиме зі старим значенням.

---

# 8. useCallback не означає "функція ніколи не створюється"

Це важливе уточнення.

Не потрібно думати:

    useCallback
    ↓
    функція створюється тільки один раз назавжди

Правильніше:

    useCallback
    ↓
    React може повернути попереднє
    function reference
    якщо dependencies не змінилися

Якщо dependency змінилася:

    dependency changed
          ↓
    нова callback function
          ↓
    нове reference

---

# 9. Головна причина використання useCallback

Найчастіше `useCallback` потрібен не сам по собі.

Він стає особливо корисним у поєднанні з:

    React.memo

Наприклад:

    const Button = memo(function Button({ onClick }) {
      console.log("Button render");

      return (
        <button onClick={onClick}>
          Click
        </button>
      );
    });

Тепер важлива стабільність:

    onClick

---

# 10. React.memo без useCallback

Розглянемо:

    const Button = memo(function Button({ onClick }) {
      console.log("Button render");

      return (
        <button onClick={onClick}>
          Click
        </button>
      );
    });

Батьківський компонент:

    function App() {
      const [count, setCount] = useState(0);

      const handleClick = () => {
        console.log("Clicked");
      };

      return (
        <div>
          <p>{count}</p>

          <button onClick={() => setCount(count + 1)}>
            Increment
          </button>

          <Button onClick={handleClick} />
        </div>
      );
    }

Проблема:

при кожному рендері `App` створюється нова:

    handleClick

Тобто:

    render 1 → function A
    render 2 → function B
    render 3 → function C

Навіть якщо код функції однаковий.

---

# 11. useCallback + React.memo

Можна зробити:

    function App() {
      const [count, setCount] = useState(0);

      const handleClick = useCallback(() => {
        console.log("Clicked");
      }, []);

      return (
        <div>
          <p>{count}</p>

          <button onClick={() => setCount(count + 1)}>
            Increment
          </button>

          <Button onClick={handleClick} />
        </div>
      );
    }

Тепер:

    handleClick

має стабільне посилання, поки dependencies не змінюються.

Тому `Button`, який використовує `memo`, може уникнути непотрібного ререндеру.

---

# 12. Важливе правило

`useCallback` сам по собі не зупиняє ререндер дочірнього компонента.

Наприклад:

    const handleClick = useCallback(() => {
      console.log("Click");
    }, []);

Це лише стабілізує function reference.

Щоб це реально могло допомогти дочірньому компоненту пропустити ререндер, часто потрібна відповідна оптимізація самого дочірнього компонента:

    memo(Child)

Тобто:

    useCallback
          +
    React.memo
          ↓
    можливість уникнути
    зайвого ререндеру Child

---

# 13. useCallback без React.memo

Наприклад:

    function Child({ onClick }) {
      console.log("Child render");

      return (
        <button onClick={onClick}>
          Click
        </button>
      );
    }

Якщо `Child` не оптимізований через:

    memo

то стабільна функція може не дати очікуваного результату щодо пропуску ререндеру.

Тому не потрібно додавати:

    useCallback

автоматично до кожного handler.

---

# 14. useCallback і useMemo

Ці Hook дуже близькі.

`useMemo`:

    const value = useMemo(() => {
      return calculateValue();
    }, [dependencies]);

Мемоізує:

    value

`useCallback`:

    const handleClick = useCallback(() => {
      doSomething();
    }, [dependencies]);

Мемоізує:

    function

Можна запам'ятати:

    useMemo
    ↓
    value

    useCallback
    ↓
    function

---

# 15. useCallback концептуально пов'язаний з useMemo

У спрощеному вигляді:

    useCallback(fn, dependencies)

концептуально близький до:

    useMemo(() => fn, dependencies)

Тобто `useMemo` повертає результат функції:

    useMemo(() => {
      return calculate();
    }, []);

А `useCallback` повертає саму callback-функцію:

    useCallback(() => {
      doSomething();
    }, []);

На практиці для мемоізації callback-функції використовується саме:

    useCallback

---

# 16. useCallback і useEffect

`useCallback` також може бути корисним, якщо функція використовується як dependency іншого Hook.

Наприклад:

    useEffect(() => {
      fetchData();
    }, [fetchData]);

Якщо `fetchData` створюється заново на кожному рендері:

    const fetchData = () => {
      // ...
    };

то dependency:

    fetchData

також змінюється на кожному рендері.

Це може призводити до повторного запуску `useEffect`.

---

# 17. Проблема з функцією як dependency

Наприклад:

    function Component({ userId }) {
      const fetchUser = () => {
        console.log("Fetch user:", userId);
      };

      useEffect(() => {
        fetchUser();
      }, [fetchUser]);

      return <div>...</div>;
    }

На кожному рендері:

    fetchUser

отримує нове посилання.

Тому dependency:

    fetchUser

вважається зміненою.

---

# 18. useCallback + useEffect

Можна написати:

    function Component({ userId }) {
      const fetchUser = useCallback(() => {
        console.log("Fetch user:", userId);
      }, [userId]);

      useEffect(() => {
        fetchUser();
      }, [fetchUser]);

      return <div>...</div>;
    }

Тепер:

    userId
       ↓
    useCallback
       ↓
    fetchUser
       ↓
    useEffect

`fetchUser` зміниться тільки тоді, коли зміниться:

    userId

---

# 19. Але useCallback не завжди потрібен для useEffect

Іноді краще взагалі не створювати окрему функцію поза `useEffect`.

Наприклад:

    useEffect(() => {
      async function fetchUser() {
        // ...
      }

      fetchUser();
    }, [userId]);

Це часто простіше.

Тому не потрібно автоматично робити:

    useCallback

для кожної функції, яку можна локально визначити всередині effect.

---

# 20. useCallback і custom hooks

`useCallback` часто використовується всередині custom Hook.

Наприклад:

    function useCounter() {
      const [count, setCount] = useState(0);

      const increment = useCallback(() => {
        setCount(value => value + 1);
      }, []);

      return {
        count,
        increment,
      };
    }

Тепер custom Hook повертає стабільну функцію:

    increment

---

# 21. Чому functional update тут корисний

Можна написати:

    const increment = useCallback(() => {
      setCount(count + 1);
    }, [count]);

Але тоді:

    count

є dependency.

Можна використати functional update:

    const increment = useCallback(() => {
      setCount(value => value + 1);
    }, []);

Тепер callback не залежить безпосередньо від:

    count

і dependency array може залишатися:

    []

---

# 22. Практичний приклад custom Hook

    import { useCallback, useState } from "react";

    function useCounter(initialValue = 0) {
      const [count, setCount] = useState(initialValue);

      const increment = useCallback(() => {
        setCount(value => value + 1);
      }, []);

      const decrement = useCallback(() => {
        setCount(value => value - 1);
      }, []);

      const reset = useCallback(() => {
        setCount(initialValue);
      }, [initialValue]);

      return {
        count,
        increment,
        decrement,
        reset,
      };
    }

Тут:

    increment
    decrement

не залежать від поточного `count`.

А:

    reset

залежить від:

    initialValue

---

# 23. useCallback і state

Розглянемо:

    const [count, setCount] = useState(0);

    const increment = useCallback(() => {
      setCount(count + 1);
    }, [count]);

Коли `count` змінюється:

    count changes
         ↓
    callback changes

Це нормально.

Але якщо можна використати functional update:

    const increment = useCallback(() => {
      setCount(value => value + 1);
    }, []);

то callback може залишатися стабільним.

---

# 24. Functional update і useCallback

Це дуже корисний патерн:

    const handleAdd = useCallback(() => {
      setItems(items => [
        ...items,
        createItem(),
      ]);
    }, []);

Тут callback не читає зовнішній `items`.

Він отримує актуальний state через:

    items => [...]

Тому не потрібно:

    [items]

у dependencies.

---

# 25. useCallback і props

Уявімо компонент:

    function TodoList({ todos }) {
      const handleDelete = useCallback((id: number) => {
        console.log("Delete:", id);
      }, []);

      return (
        <ul>
          {todos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDelete}
            />
          ))}
        </ul>
      );
    }

Якщо `TodoItem` оптимізований через `memo`, стабільний:

    handleDelete

може допомогти уникнути непотрібних оновлень через зміну function reference.

---

# 26. Практичний Todo приклад

    import { memo, useCallback, useState } from "react";

    type Todo = {
      id: number;
      title: string;
    };

    type TodoItemProps = {
      todo: Todo;
      onDelete: (id: number) => void;
    };

    const TodoItem = memo(function TodoItem({
      todo,
      onDelete,
    }: TodoItemProps) {
      console.log("TodoItem render:", todo.id);

      return (
        <li>
          {todo.title}

          <button onClick={() => onDelete(todo.id)}>
            Delete
          </button>
        </li>
      );
    });

    export default function TodoList() {
      const [todos, setTodos] = useState<Todo[]>([
        { id: 1, title: "Learn React" },
        { id: 2, title: "Learn TypeScript" },
      ]);

      const [count, setCount] = useState(0);

      const handleDelete = useCallback((id: number) => {
        setTodos(currentTodos => {
          return currentTodos.filter(todo => {
            return todo.id !== id;
          });
        });
      }, []);

      return (
        <div>
          <button onClick={() => setCount(value => value + 1)}>
            Count: {count}
          </button>

          <ul>
            {todos.map(todo => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onDelete={handleDelete}
              />
            ))}
          </ul>
        </div>
      );
    }

Тут є кілька важливих речей.

`handleDelete`:

    useCallback(..., [])

має стабільне посилання.

`TodoItem`:

    memo(...)

може пропускати ререндер, якщо його props не змінилися.

А state оновлюється через:

    setTodos(currentTodos => ...)

тому callback не залежить від поточного `todos`.

---

# 27. useCallback і event handlers

Не потрібно думати, що кожен event handler повинен бути через `useCallback`.

Звичайний код:

    function Button() {
      const handleClick = () => {
        console.log("Click");
      };

      return (
        <button onClick={handleClick}>
          Click
        </button>
      );
    }

цілком нормальний.

`useCallback` потрібен тільки тоді, коли стабільність function reference має практичне значення.

---

# 28. Inline callback

Наприклад:

    <button onClick={() => setCount(count + 1)}>
      +
    </button>

Це абсолютно нормальний React-код.

Не потрібно автоматично перетворювати його на:

    const handleClick = useCallback(() => {
      setCount(count + 1);
    }, [count]);

Якщо немає конкретної причини — простіший код кращий.

---

# 29. useCallback не робить функцію "швидшою"

Це важливо.

`useCallback` не означає:

    "ця функція тепер виконується швидше"

Він допомагає зберігати:

    function reference

Тобто оптимізує не саме виконання функції, а можливі наслідки створення нового callback reference.

---

# 30. useCallback і React.memo — основний сценарій

Одна з найважливіших схем:

    Parent
      │
      │ callback
      ↓
    Child
      │
    React.memo

Якщо Parent ререндериться:

    Parent re-render
          ↓
    callback reference changed?
          ↓
       ┌──┴──┐
      yes    no
       ↓      ↓
    Child    Child
    may      may skip
    re-render render

`useCallback` допомагає зробити:

    callback reference

стабільним.

---

# 31. useCallback і кілька dependencies

Наприклад:

    const handleSearch = useCallback(() => {
      searchProducts(query, category);
    }, [query, category]);

Тут callback залежить від:

    query
    category

Якщо змінюється будь-яке з них:

    query
    або
    category

створюється нове callback reference.

---

# 32. Dependency array — це не список "коли викликати"

Це дуже важлива різниця.

Наприклад:

    const handleClick = useCallback(() => {
      console.log(count);
    }, [count]);

`[count]` не означає:

> "викликати функцію, коли зміниться count".

Воно означає:

> "створити/отримати актуальну мемоізовану функцію з урахуванням нового `count`, коли `count` змінився."

Сама функція виконується тільки тоді, коли її викликають:

    handleClick();

---

# 33. useCallback не викликає функцію

Наприклад:

    const handleClick = useCallback(() => {
      console.log("Clicked");
    }, []);

Це не виконує:

    console.log("Clicked");

Під час створення Hook.

Воно створює callback.

Функція виконається при:

    handleClick();

або:

    <button onClick={handleClick}>

---

# 34. useCallback і object/array dependencies

Наприклад:

    const options = {
      category: "books",
    };

    const handleSearch = useCallback(() => {
      search(options);
    }, [options]);

Проблема:

    options

створюється заново на кожному рендері.

Тому dependency:

    options

також змінюється.

В результаті callback може створюватися заново на кожному рендері.

---

# 35. Як працювати з object dependency

Іноді можна залежати від конкретного примітивного значення:

    const category = "books";

    const handleSearch = useCallback(() => {
      search({
        category,
      });
    }, [category]);

Тут:

    category

має стабільне значення, якщо не змінюється.

---

# 36. useMemo + useCallback

Іноді разом використовуються:

    const options = useMemo(() => {
      return {
        category,
        sortBy,
      };
    }, [category, sortBy]);

    const handleSearch = useCallback(() => {
      search(options);
    }, [options]);

Тепер:

    category
    sortBy
        ↓
    useMemo
        ↓
    options
        ↓
    useCallback
        ↓
    handleSearch

Але таку конструкцію не потрібно створювати без реальної необхідності.

---

# 37. Краще іноді залежати від примітивів

Замість:

    const options = {
      category,
      sortBy,
    };

    const handleSearch = useCallback(() => {
      search(options);
    }, [options]);

можна:

    const handleSearch = useCallback(() => {
      search({
        category,
        sortBy,
      });
    }, [category, sortBy]);

Це часто простіше.

---

# 38. useCallback і TypeScript

Наприклад:

    const handleSelect = useCallback((id: number) => {
      console.log(id);
    }, []);

TypeScript розуміє:

    id: number

і тип callback:

    (id: number) => void

---

# 39. Тип callback у props

Наприклад:

    type ButtonProps = {
      onClick: () => void;
    };

Компонент:

    function Button({ onClick }: ButtonProps) {
      return (
        <button onClick={onClick}>
          Click
        </button>
      );
    }

Батьківський компонент:

    const handleClick = useCallback(() => {
      console.log("Click");
    }, []);

    return <Button onClick={handleClick} />;

---

# 40. Callback з параметром

Наприклад:

    type User = {
      id: number;
      name: string;
    };

    type UserListProps = {
      onSelect: (userId: number) => void;
    };

Компонент:

    function UserList({ onSelect }: UserListProps) {
      return (
        <button onClick={() => onSelect(10)}>
          Select
        </button>
      );
    }

Батьківський компонент:

    const handleSelect = useCallback((userId: number) => {
      console.log("Selected:", userId);
    }, []);

    return (
      <UserList onSelect={handleSelect} />
    );

---

# 41. useCallback і Context

`useCallback` може бути корисним разом із Context Provider.

Наприклад:

    const logout = useCallback(() => {
      setUser(null);
    }, []);

    const value = useMemo(() => {
      return {
        user,
        logout,
      };
    }, [user, logout]);

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );

Тут:

    useCallback
        ↓
    logout
        ↓
    useMemo
        ↓
    context value

Це може допомогти стабілізувати `value`.

Але потрібно пам'ятати:

> оптимізація Context має сенс тоді, коли є реальна проблема з оновленнями споживачів.

---

# 42. useCallback і custom event handlers

У складніших компонентах може бути багато callback:

    const handleAdd = useCallback(() => {
      // ...
    }, []);

    const handleRemove = useCallback((id: number) => {
      // ...
    }, []);

    const handleUpdate = useCallback((id: number) => {
      // ...
    }, []);

Не потрібно автоматично мемоізувати кожен callback.

Потрібно дивитися:

    чи передається функція вниз?
    чи є Child мемоізованим?
    чи використовується функція як dependency?
    чи є реальна проблема продуктивності?

---

# 43. Типова помилка №1 — useCallback всюди

Погано:

    const handleA = useCallback(() => {
      console.log("A");
    }, []);

    const handleB = useCallback(() => {
      console.log("B");
    }, []);

    const handleC = useCallback(() => {
      console.log("C");
    }, []);

якщо жодна з цих функцій не потребує стабільного reference.

Це просто додає складність.

---

# 44. Типова помилка №2 — useCallback без React.memo

Наприклад:

    const handleClick = useCallback(() => {
      console.log("Click");
    }, []);

    return <Child onClick={handleClick} />;

Якщо `Child` звичайний компонент і немає іншої причини для стабільного callback, `useCallback` може не дати очікуваної оптимізації.

---

# 45. Типова помилка №3 — неправильні dependencies

Погано:

    const handleClick = useCallback(() => {
      console.log(user.name);
    }, []);

Тут:

    user

використовується всередині callback.

Потрібно врахувати dependency:

    const handleClick = useCallback(() => {
      console.log(user.name);
    }, [user]);

Або, залежно від логіки, можна використовувати конкретніше:

    const handleClick = useCallback(() => {
      console.log(user.name);
    }, [user.name]);

---

# 46. Типова помилка №4 — свідомо прибирати dependencies

Не потрібно видаляти dependency тільки для того, щоб отримати:

    []

Наприклад:

    const handleClick = useCallback(() => {
      console.log(count);
    }, []);

це не стає правильним лише тому, що callback тепер стабільний.

Стабільність не важливіша за правильність.

---

# 47. Типова помилка №5 — плутати useCallback з useMemo

Погано думати:

    useMemo = функції
    useCallback = значення

Правильно:

    useMemo
    → мемоізує результат

    useCallback
    → мемоізує функцію

---

# 48. Типова помилка №6 — очікувати прискорення самої функції

Наприклад:

    const calculate = useCallback(() => {
      veryExpensiveCalculation();
    }, []);

Це не робить:

    veryExpensiveCalculation()

швидшим.

Якщо потрібно мемоізувати результат дорогого обчислення, дивимося в бік:

    useMemo

---

# 49. Типова помилка №7 — useCallback для кожного onClick

Це нормально:

    <button onClick={() => setCount(count + 1)}>
      +
    </button>

Не потрібно робити:

    const handleClick = useCallback(() => {
      setCount(count + 1);
    }, [count]);

тільки тому, що це `onClick`.

---

# 50. Типова помилка №8 — забувати про functional update

Замість:

    const handleIncrement = useCallback(() => {
      setCount(count + 1);
    }, [count]);

іноді краще:

    const handleIncrement = useCallback(() => {
      setCount(value => value + 1);
    }, []);

Це дозволяє callback не залежати від зовнішнього `count`.

---

# 51. useCallback і stale state

Неправильно:

    const handleClick = useCallback(() => {
      setCount(count + 1);
    }, []);

Якщо `count` змінюється, callback може працювати зі старим значенням.

Краще:

    const handleClick = useCallback(() => {
      setCount(value => value + 1);
    }, []);

або:

    const handleClick = useCallback(() => {
      setCount(count + 1);
    }, [count]);

Обидва варіанти можуть бути правильними, залежно від логіки.

---

# 52. useCallback і closure

Потрібно розуміти:

    useCallback

не скасовує JavaScript closures.

Наприклад:

    const handleClick = useCallback(() => {
      console.log(name);
    }, [name]);

Callback захоплює:

    name

і при зміні `name` створюється актуальна callback-функція.

---

# 53. useCallback і функція updater

Це один із найкорисніших патернів:

    const addTodo = useCallback((title: string) => {
      setTodos(currentTodos => {
        return [
          ...currentTodos,
          {
            id: Date.now(),
            title,
          },
        ];
      });
    }, []);

Тут callback не залежить від:

    todos

тому що отримує актуальний state через:

    currentTodos

---

# 54. Практичний приклад Todo App

    import { memo, useCallback, useState } from "react";

    type Todo = {
      id: number;
      title: string;
    };

    type TodoFormProps = {
      onAdd: (title: string) => void;
    };

    const TodoForm = memo(function TodoForm({
      onAdd,
    }: TodoFormProps) {
      const handleSubmit = () => {
        onAdd("Learn useCallback");
      };

      return (
        <button onClick={handleSubmit}>
          Add Todo
        </button>
      );
    });

    export default function TodoApp() {
      const [todos, setTodos] = useState<Todo[]>([]);

      const addTodo = useCallback((title: string) => {
        setTodos(currentTodos => {
          return [
            ...currentTodos,
            {
              id: Date.now(),
              title,
            },
          ];
        });
      }, []);

      return (
        <div>
          <TodoForm onAdd={addTodo} />

          <ul>
            {todos.map(todo => (
              <li key={todo.id}>
                {todo.title}
              </li>
            ))}
          </ul>
        </div>
      );
    }

Тут `addTodo` має стабільне посилання.

Це може бути корисно, оскільки:

    TodoForm

мемоізований через:

    memo

---

# 55. useCallback і список компонентів

Уявімо:

    function ProductList({ products }) {
      const handleSelect = useCallback((id: number) => {
        console.log("Selected:", id);
      }, []);

      return (
        <ul>
          {products.map(product => (
            <ProductItem
              key={product.id}
              product={product}
              onSelect={handleSelect}
            />
          ))}
        </ul>
      );
    }

Якщо:

    ProductItem

оптимізований через:

    memo

стабільний:

    handleSelect

може допомогти уникнути зайвих оновлень дочірніх компонентів через callback prop.

---

# 56. useCallback і великий список

Уявімо:

    1000 ProductItem

Кожен отримує:

    onSelect

Якщо на кожному рендері батьківського компонента створюється нова функція:

    onSelect

то всі дочірні компоненти можуть бачити зміну цього prop.

Якщо:

    ProductItem = memo(...)

і:

    onSelect = useCallback(...)

стабільне посилання може мати значення для продуктивності.

---

# 57. Але useCallback не вирішує все

Навіть якщо:

    onSelect

стабільний, `ProductItem` може ререндеритися через:

- зміну `product`;
- зміну інших props;
- власний state;
- Context;
- батьківську структуру;
- інші причини.

Тому `useCallback` — лише один інструмент.

---

# 58. useCallback і React.memo: повна схема

    Parent
       │
       ├── state
       │
       ├── useCallback
       │      ↓
       │   stable callback
       │
       ↓
    Child
       │
       └── React.memo

При зміні іншого state:

    Parent re-render
          ↓
    callback reference unchanged
          ↓
    Child props unchanged
          ↓
    Child may skip render

Саме слово:

    may

дуже важливе.

Мемоізація — це оптимізація, а не абсолютна гарантія того, що компонент ніколи не ререндериться.

---

# 59. useCallback і Context

Наприклад:

    const increment = useCallback(() => {
      setCount(value => value + 1);
    }, []);

    const value = useMemo(() => {
      return {
        count,
        increment,
      };
    }, [count, increment]);

    return (
      <CounterContext.Provider value={value}>
        {children}
      </CounterContext.Provider>
    );

Тут:

    increment

стабільний.

Але:

    value

все одно змінюється при зміні:

    count

і це очікувано.

---

# 60. useCallback і Next.js

У Next.js App Router `useCallback` використовується в Client Components.

Наприклад:

    "use client";

    import { useCallback, useState } from "react";

    export default function Counter() {
      const [count, setCount] = useState(0);

      const increment = useCallback(() => {
        setCount(value => value + 1);
      }, []);

      return (
        <button onClick={increment}>
          {count}
        </button>
      );
    }

Компонент є Client Component, тому що використовує React Hook:

    useCallback

---

# 61. useCallback не потрібен для Server Component

У Next.js Server Component не використовується як місце для клієнтських React Hook-ів:

    useState
    useEffect
    useCallback
    useMemo
    useContext

Якщо потрібен `useCallback`, відповідну логіку потрібно перенести в Client Component.

---

# 62. useCallback і data fetching

`useCallback` сам по собі не є механізмом data fetching.

Наприклад:

    const loadProducts = useCallback(async () => {
      const response = await fetch("/api/products");

      return response.json();
    }, []);

Це просто мемоізована функція.

Вона не виконується автоматично.

Її потрібно викликати:

    const products = await loadProducts();

А для effect:

    useEffect(() => {
      loadProducts();
    }, [loadProducts]);

Але перед таким кодом потрібно оцінити, чи дійсно `useCallback` тут необхідний.

---

# 63. useCallback і event handlers у формах

Наприклад:

    const handleSubmit = useCallback(
      (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        console.log("Submit");
      },
      []
    );

    return (
      <form onSubmit={handleSubmit}>
        <button type="submit">
          Save
        </button>
      </form>
    );

Але якщо форма не є частиною оптимізованої структури, звичайний handler може бути простішим:

    const handleSubmit = (
      event: React.FormEvent<HTMLFormElement>
    ) => {
      event.preventDefault();

      console.log("Submit");
    };

---

# 64. useCallback і чистота коду

Не потрібно робити код складнішим заради оптимізації.

Простий:

    function App() {
      const handleClick = () => {
        console.log("Click");
      };

      return <button onClick={handleClick}>Click</button>;
    }

може бути кращим за:

    function App() {
      const handleClick = useCallback(() => {
        console.log("Click");
      }, []);

      return <button onClick={handleClick}>Click</button>;
    }

якщо стабільність `handleClick` не має значення.

---

# 65. Premature optimization

**Premature optimization** — передчасна оптимізація.

Наприклад:

    "Я тільки створив кнопку,
     тому одразу використаю useCallback."

Це неправильний підхід.

Краще:

    1. Написати простий код.
    2. Виміряти продуктивність.
    3. Знайти bottleneck.
    4. Оптимізувати.
    5. Знову виміряти.

---

# 66. Профілювання

Для аналізу React rendering performance можна використовувати:

    React DevTools Profiler

Загальна схема:

    application
        ↓
    measure
        ↓
    find slow component
        ↓
    understand why
        ↓
    optimize
        ↓
    measure again

`useCallback` — лише один із можливих інструментів.

---

# 67. Коли useCallback дійсно доречний

`useCallback` може бути корисним, коли:

- callback передається в `memo`-компонент;
- стабільність function reference має значення;
- callback використовується як dependency іншого Hook;
- custom Hook повертає callback, який має бути стабільним;
- компонент має багато дочірніх компонентів;
- callback передається глибоко вниз;
- профілювання показало проблему, пов'язану з нестабільними callback props.

---

# 68. Коли useCallback, швидше за все, не потрібен

Не потрібно використовувати його лише тому, що:

- функція є event handler;
- функція коротка;
- функція викликається один раз;
- компонент маленький;
- ви "хочете оптимізувати все".

Наприклад:

    const handleClick = () => {
      setCount(value => value + 1);
    };

може бути повністю достатнім.

---

# 69. useCallback і продуктивність

Важлива ментальна модель:

    useCallback
    ≠
    automatically faster

Правильніше:

    useCallback
    →
    stable function reference
    →
    може допомогти іншим оптимізаціям
    →
    наприклад React.memo

---

# 70. Практичний приклад: Parent + Child

    import { memo, useCallback, useState } from "react";

    type ChildProps = {
      onAction: () => void;
    };

    const Child = memo(function Child({
      onAction,
    }: ChildProps) {
      console.log("Child render");

      return (
        <button onClick={onAction}>
          Action
        </button>
      );
    });

    export default function Parent() {
      const [count, setCount] = useState(0);

      const handleAction = useCallback(() => {
        console.log("Action");
      }, []);

      return (
        <div>
          <p>Count: {count}</p>

          <button onClick={() => setCount(value => value + 1)}>
            Increment
          </button>

          <Child onAction={handleAction} />
        </div>
      );
    }

Коли змінюється:

    count

`Parent` ререндериться.

Але:

    handleAction

має стабільне посилання.

Тому `Child`, який використовує:

    memo

може пропустити ререндер, якщо інші його props не змінилися.

---

# 71. Варіант без useCallback

    export default function Parent() {
      const [count, setCount] = useState(0);

      const handleAction = () => {
        console.log("Action");
      };

      return (
        <div>
          <p>Count: {count}</p>

          <button onClick={() => setCount(value => value + 1)}>
            Increment
          </button>

          <Child onAction={handleAction} />
        </div>
      );
    }

Тут при кожному ререндері:

    handleAction

отримує нове function reference.

Тому для:

    memo(Child)

це може мати значення.

---

# 72. useCallback і стабільність API custom Hook

Custom Hook може повертати:

    {
      data,
      refresh
    }

Якщо:

    refresh

створюється заново на кожному рендері, компоненти, які використовують цей callback, можуть отримувати нове посилання.

Тому іноді:

    const refresh = useCallback(() => {
      // ...
    }, [dependencies]);

є хорошим API-рішенням для custom Hook.

---

# 73. Приклад custom Hook для API

    function useProducts() {
      const [products, setProducts] = useState<Product[]>([]);

      const reload = useCallback(async () => {
        const response = await fetch("/api/products");

        const data: Product[] = await response.json();

        setProducts(data);
      }, []);

      return {
        products,
        reload,
      };
    }

Компонент:

    function ProductsPage() {
      const {
        products,
        reload,
      } = useProducts();

      return (
        <div>
          <button onClick={reload}>
            Reload
          </button>

          {/* products */}
        </div>
      );
    }

Тут `reload` є callback-функцією, яку можна передавати далі.

---

# 74. useCallback і Promise

`useCallback` може мемоізувати async-функцію:

    const loadData = useCallback(async () => {
      const response = await fetch("/api/data");

      return response.json();
    }, []);

Але:

    useCallback

мемоізує саме функцію.

Він не кешує результат:

    response.json()

Для кешування даних потрібні інші механізми.

---

# 75. useCallback не є data cache

Це дуже важливо.

Є:

    useCallback

і є:

    data caching

Це різні поняття.

`useCallback`:

    function → stable reference

Data cache:

    request/data → cached data

Не потрібно плутати їх.

---

# 76. useCallback і state updater — важливий патерн

Замість:

    const handleAdd = useCallback(() => {
      setItems([...items, newItem]);
    }, [items]);

можна:

    const handleAdd = useCallback(() => {
      setItems(currentItems => [
        ...currentItems,
        newItem,
      ]);
    }, [newItem]);

Якщо `newItem` також стабільний або створений відповідним чином, callback може мати менше dependencies.

Головна ідея:

> Functional state update дозволяє не читати поточний state із closure.

---

# 77. useCallback і immutable updates

Наприклад:

    const removeItem = useCallback((id: number) => {
      setItems(currentItems => {
        return currentItems.filter(item => {
          return item.id !== id;
        });
      });
    }, []);

Тут:

    currentItems

є актуальним state.

Ми не мутуємо масив.

Створюємо новий:

    filter()

---

# 78. useCallback і складні callback

Наприклад:

    const handleSave = useCallback(() => {
      const data = {
        name,
        email,
        role,
      };

      saveUser(data);
    }, [name, email, role]);

Тут dependencies:

    name
    email
    role

бо вони використовуються всередині callback.

Це нормальна ситуація.

Не потрібно намагатися штучно зробити:

    []

якщо callback реально залежить від цих значень.

---

# 79. useCallback і правильність важливіша за оптимізацію

Головний принцип:

    Correctness > optimization

Спочатку callback повинен працювати правильно.

Потім можна оптимізувати його reference.

Не можна жертвувати актуальністю даних заради:

    []

---

# 80. useCallback — короткий алгоритм

Перед використанням запитай:

### 1. Чи це функція?

Так → `useCallback` потенційно може бути застосований.

### 2. Чи важлива стабільність function reference?

Наприклад:

    React.memo
    dependency
    custom Hook API

Якщо ні → можливо, `useCallback` не потрібен.

### 3. Чи є реальна performance problem?

Якщо ні → простий callback часто кращий.

### 4. Чи правильні dependencies?

Якщо функція використовує:

    value

потрібно врахувати його в dependencies або змінити структуру коду так, щоб актуальність була забезпечена іншим правильним способом.

---

# 81. Порівняння основних інструментів

| Інструмент | Що мемоізує / робить |
|---|---|
| `useMemo` | значення |
| `useCallback` | функцію |
| `React.memo` | компонент щодо props |
| `useState` | state |
| `useRef` | mutable reference |
| `useEffect` | side effects |
| `useContext` | читання Context |

---

# 82. useMemo vs useCallback

### useMemo

    const filteredProducts = useMemo(() => {
      return products.filter(product => product.active);
    }, [products]);

Результат:

    filteredProducts

---

### useCallback

    const handleSelect = useCallback((id: number) => {
      console.log(id);
    }, []);

Результат:

    handleSelect

---

# 83. useCallback vs React.memo

`useCallback`:

    const handleClick = useCallback(() => {
      // ...
    }, []);

мемоізує:

    function reference

`React.memo`:

    const Child = memo(function Child(props) {
      // ...
    });

оптимізує:

    component rendering

Їх можна використовувати разом.

---

# 84. useCallback vs useEffect

`useCallback`:

    const handleClick = useCallback(() => {
      // ...
    }, []);

створює стабільний callback reference.

`useEffect`:

    useEffect(() => {
      // side effect
    }, []);

виконує side effect після рендера.

---

# 85. Типові сценарії useCallback

## Сценарій 1 — memoized child

    const handleClick = useCallback(() => {
      // ...
    }, []);

    <MemoizedChild onClick={handleClick} />

---

## Сценарій 2 — dependency іншого Hook

    const fetchData = useCallback(() => {
      // ...
    }, [id]);

    useEffect(() => {
      fetchData();
    }, [fetchData]);

---

## Сценарій 3 — custom Hook

    const refresh = useCallback(() => {
      // ...
    }, []);

    return {
      data,
      refresh,
    };

---

## Сценарій 4 — Context

    const logout = useCallback(() => {
      setUser(null);
    }, []);

    const value = useMemo(() => {
      return {
        user,
        logout,
      };
    }, [user, logout]);

---

# 86. Що потрібно пам'ятати про dependencies

Пам'ятай не:

    "Я хочу []"

а:

    "Від чого залежить ця функція?"

Наприклад:

    const handleSave = useCallback(() => {
      saveUser(name, email);
    }, [name, email]);

Питання:

> Що використовує callback?

Відповідь:

    name
    email

Тому:

    [name, email]

---

# 87. Що потрібно пам'ятати про closures

Якщо callback читає:

    count

то він пов'язаний із конкретним значенням `count` з відповідного рендера.

Тому:

    useCallback(..., [])

не означає:

> "всередині callback завжди буде актуальний state".

Навпаки, неправильні dependencies можуть призвести до stale closure.

---

# 88. Що потрібно пам'ятати про functional update

Якщо callback змінює state на основі попереднього значення:

    setCount(count + 1);

можна часто використати:

    setCount(value => value + 1);

Це дозволяє callback не залежати від зовнішнього `count`.

Наприклад:

    const increment = useCallback(() => {
      setCount(value => value + 1);
    }, []);

---

# 89. Чи потрібно мемоізувати всі callback?

Ні.

Правильний підхід:

    simple component
         ↓
    simple callback

Якщо немає проблеми:

    не оптимізуємо

Якщо є проблема:

    profile
       ↓
    identify
       ↓
    useCallback
       ↓
    measure again

---

# 90. React DevTools і useCallback

Якщо ви підозрюєте performance problem:

    Parent
      ↓
    Child
      ↓
    Child renders too often

не потрібно відразу додавати `useCallback`.

Спочатку потрібно з'ясувати:

    Why does Child render?

Причиною може бути:

- зміна props;
- новий object;
- новий array;
- нова function;
- Context;
- state;
- структура компонентів.

Тільки після цього можна вибрати правильний інструмент.

---

# 91. useCallback — не універсальна оптимізація

Не потрібно робити:

    useCallback
    useMemo
    memo
    useRef

усюди тільки тому, що вони існують.

Кожен інструмент має свою задачу.

Для `useCallback`:

    function reference

Для `useMemo`:

    computed value

Для `memo`:

    component rendering optimization

---

# 92. Питання зі співбесіди

### Що таке useCallback?

`useCallback` — React Hook, який мемоізує callback-функцію і дозволяє зберігати стабільне посилання на неї між рендерами, поки не змінюються dependencies.

---

### Що повертає useCallback?

Він повертає функцію:

    const handleClick = useCallback(() => {
      console.log("Click");
    }, []);

---

### Чим useCallback відрізняється від useMemo?

    useMemo
    → мемоізує результат

    useCallback
    → мемоізує функцію

---

### Чим useCallback відрізняється від React.memo?

    useCallback
    → стабілізує function reference

    React.memo
    → дозволяє компоненту пропускати ререндер,
      якщо його props не змінилися
      за відповідними правилами порівняння

---

### Чи useCallback зупиняє ререндер компонента?

Ні.

Він мемоізує функцію, а не весь компонент.

---

### Чи потрібно використовувати useCallback для кожного handler?

Ні.

Тільки коли стабільність callback має реальне значення.

---

### Коли useCallback особливо корисний?

Найчастіше:

    useCallback
        +
    React.memo

або коли callback є dependency іншого Hook.

---

### Чи useCallback робить функцію швидшою?

Ні.

Він не прискорює виконання функції.

Він допомагає зберігати стабільне посилання на неї.

---

### Чи можна використовувати useCallback з async функцією?

Так.

Наприклад:

    const loadData = useCallback(async () => {
      const response = await fetch("/api/data");

      return response.json();
    }, []);

Але `useCallback` не кешує результат Promise.

---

### Що буде, якщо dependency зміниться?

React отримає нову callback-функцію, актуальну для нових dependencies.

---

### Чи можна використовувати useCallback без React.memo?

Так.

Але потрібно мати конкретну причину, чому стабільність function reference важлива.

---

### Що таке stale closure?

Це ситуація, коли функція використовує застаріле значення зі свого closure через неправильну структуру dependencies або логіки.

---

# 93. Шлях вивчення

## 🟢 Core

Потрібно добре знати:

- що таке `useCallback`;
- що він мемоізує функцію;
- dependency array;
- function reference;
- referential equality;
- різницю між `useCallback` і `useMemo`.

---

## 🔵 Junior

Потрібно вміти:

- використовувати `useCallback`;
- правильно вказувати dependencies;
- використовувати functional state updates;
- розуміти stale closure;
- пояснити `useCallback` + `React.memo`;
- розуміти, чому inline function не є автоматично проблемою.

---

## 🟠 Middle

Потрібно розуміти:

- rendering optimization;
- `React.memo`;
- function identity;
- Context + callbacks;
- custom Hooks;
- dependencies інших Hook-ів;
- referential equality;
- performance profiling;
- premature optimization.

---

## 🔴 Senior

Потрібно вміти:

- знаходити реальні rendering bottlenecks;
- визначати, коли `useCallback` дійсно потрібен;
- уникати over-memoization;
- аналізувати component tree;
- розуміти взаємодію `memo`, `useMemo`, `useCallback`;
- проектувати custom Hooks зі стабільним API;
- оптимізувати rendering без погіршення читабельності коду.

---

# 94. Міні-шпаргалка

    import { useCallback } from "react";

    const handleClick = useCallback(() => {
      doSomething();
    }, [dependencies]);

Головна ідея:

    useCallback
         ↓
    function reference
         ↓
    dependencies unchanged?
         ↓
       yes
         ↓
    reuse previous callback

Якщо dependency змінилася:

    dependency changed
         ↓
    new callback reference

---

# 95. Шпаргалка: useCallback + memo

    const Child = memo(function Child({
      onClick,
    }) {
      return (
        <button onClick={onClick}>
          Click
        </button>
      );
    });

    function Parent() {
      const handleClick = useCallback(() => {
        console.log("Click");
      }, []);

      return (
        <Child onClick={handleClick} />
      );
    }

Модель:

    Parent
       ↓
    useCallback
       ↓
    stable function
       ↓
    React.memo Child
       ↓
    may skip unnecessary render

---

# 96. Шпаргалка: state updater

Замість:

    const increment = useCallback(() => {
      setCount(count + 1);
    }, [count]);

можна:

    const increment = useCallback(() => {
      setCount(value => value + 1);
    }, []);

Це дозволяє не включати `count` у dependencies, якщо callback більше від нього не залежить.

---

# 97. Шпаргалка: useMemo vs useCallback

    useMemo

    const value = useMemo(() => {
      return calculate();
    }, [dependencies]);

    ↓

    computed value


    useCallback

    const callback = useCallback(() => {
      doSomething();
    }, [dependencies]);

    ↓

    function

---

# 98. Шпаргалка: коли НЕ використовувати

    Простий handler
          ↓
    useCallback не обов'язковий

    Маленький компонент
          ↓
    useCallback не обов'язковий

    Немає memoized child
          ↓
    useCallback може бути непотрібним

    Немає performance problem
          ↓
    не оптимізуємо автоматично

---

# 99. Головне, що потрібно запам'ятати

1. `useCallback` — React Hook для мемоізації функції.

2. Основний синтаксис:

       const handleClick = useCallback(() => {
         doSomething();
       }, [dependencies]);

3. `useCallback` повертає функцію.

4. Основна мета — зберегти стабільне function reference між рендерами.

5. Якщо dependencies не змінилися, React може використати попередню callback-функцію.

6. Якщо dependency змінилася, callback може отримати нове посилання.

7. `useCallback` не зупиняє ререндер компонента.

8. `useCallback` не робить функцію швидшою.

9. `useCallback` часто має сенс разом із:

       React.memo

10. `useCallback` може бути корисним, коли callback передається в memoized child.

11. `useCallback` може бути корисним, коли функція використовується як dependency іншого Hook.

12. `useCallback` часто використовується в custom Hooks.

13. Не потрібно використовувати `useCallback` для кожного `onClick`.

14. Не потрібно використовувати `useCallback` без реальної причини.

15. Правильні dependencies важливіші за бажання отримати:

       []

16. Якщо callback залежить від state, потрібно врахувати це в dependencies або використати правильний functional state update.

17. Functional update:

       setCount(value => value + 1);

   часто дозволяє зробити callback незалежним від поточного state.

18. `useCallback` не є кешем даних.

19. `useCallback` не замінює `useMemo`.

20. Найважливіша ментальна модель:

       useCallback
            ↓
       memoized function
            ↓
       stable reference
            ↓
       може допомогти
       оптимізації rendering
            ↓
       особливо разом з React.memo

---

# 100. Коротка ментальна модель

Думай про `useCallback` так:

> "У мене є функція, яку я передаю кудись далі, і для оптимізації мені важливо, щоб її посилання не змінювалося без потреби."

Тобто:

    render
      ↓
    create callback
      ↓
    useCallback
      ↓
    ┌──────────────────────┐
    │ dependencies changed?│
    └──────────┬───────────┘
               │
          ┌────┴────┐
          │         │
         yes       no
          │         │
          ↓         ↓
       new fn    same reference
          │         │
          └────┬────┘
               ↓
          callback

Але завжди пам'ятай:

    useCallback ≠ useMemo
    useCallback ≠ React.memo
    useCallback ≠ useState
    useCallback ≠ useEffect
    useCallback ≠ data cache

Найважливіше:

> **`useCallback` — це інструмент для мемоізації функцій. Його основна практична цінність з'являється тоді, коли стабільне посилання на callback має значення — наприклад, при передачі функції в `React.memo`-компонент, використанні її як dependency або поверненні зі складного custom Hook. Не потрібно використовувати його автоматично: спочатку правильність і простота коду, потім — оптимізація реальної проблеми.**