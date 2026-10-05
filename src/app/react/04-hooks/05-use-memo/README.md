# 05. useMemo

`useMemo` — це React Hook, який дозволяє **запам'ятати (мемоізувати) результат обчислення** між рендерами компонента.

Він використовується переважно для:

- уникнення дорогих повторних обчислень;
- стабілізації посилання на об'єкт або масив;
- передачі стабільного значення в `memo`-компонент;
- уникнення непотрібних змін `value` для Context;
- оптимізації компонентів, де повторне обчислення справді має помітну вартість.

Важливо:

> `useMemo` — це **оптимізація**, а не спосіб зберігати стан.

---

## Основний синтаксис

    const cachedValue = useMemo(() => {
      return calculation();
    }, [dependencies]);

React виконує функцію всередині `useMemo` і запам'ятовує отриманий результат.

При наступному рендері:

- якщо залежності **не змінилися** — React може використати попередній результат;
- якщо хоча б одна залежність змінилася — React повторно виконає обчислення.

---

# Ключові поняття

- `useMemo`
- memoization
- cached value
- dependencies
- expensive calculation
- referential equality
- object identity
- array identity
- `Object.is`
- `React.memo`
- `useCallback`
- Context
- optimization
- unnecessary optimization

---

# 1. Що робить useMemo

Без `useMemo`:

    const result = calculateSomething(value);

При кожному рендері компонента `calculateSomething()` виконується знову.

З `useMemo`:

    const result = useMemo(() => {
      return calculateSomething(value);
    }, [value]);

Тепер React може використати попередній результат, якщо `value` не змінився.

---

# 2. Простий приклад

    import { useMemo, useState } from "react";

    export default function App() {
      const [count, setCount] = useState(0);

      const doubled = useMemo(() => {
        return count * 2;
      }, [count]);

      return (
        <div>
          <p>Count: {count}</p>
          <p>Doubled: {doubled}</p>

          <button onClick={() => setCount(count + 1)}>
            +
          </button>
        </div>
      );
    }

Тут:

    count

є залежністю.

Коли `count` змінюється:

    count → useMemo → doubled

Коли `count` не змінюється, React може використати вже обчислений результат.

---

# 3. useMemo не запам'ятовує компонент

Це важливий момент.

`useMemo` запам'ятовує **значення**, а не компонент.

Наприклад:

    const result = useMemo(() => {
      return expensiveCalculation();
    }, []);

Тут запам'ятовується результат:

    result

а не функція-компонент.

Для мемоізації компонента використовується:

    React.memo

---

# 4. useMemo і дорогі обчислення

Основна причина використання `useMemo` — дорогі обчислення.

Наприклад:

    function calculateTotal(items) {
      console.log("Calculating...");

      return items.reduce((total, item) => {
        return total + item.price;
      }, 0);
    }

Компонент:

    import { useMemo, useState } from "react";

    export default function ShoppingCart() {
      const [items, setItems] = useState([
        { id: 1, name: "Book", price: 20 },
        { id: 2, name: "Pen", price: 5 },
        { id: 3, name: "Notebook", price: 10 },
      ]);

      const [count, setCount] = useState(0);

      const total = useMemo(() => {
        return calculateTotal(items);
      }, [items]);

      return (
        <div>
          <p>Total: {total}</p>
          <p>Count: {count}</p>

          <button onClick={() => setCount(count + 1)}>
            Increment
          </button>
        </div>
      );
    }

Коли змінюється тільки:

    count

`items` не змінюється.

Тому React може використати попередній:

    total

і не виконувати `calculateTotal(items)` повторно.

---

# 5. Що таке memoization

**Memoization** — це техніка оптимізації, при якій результат функції зберігається.

У спрощеному вигляді:

    input → calculation → result

Після мемоізації:

    input → calculation → result
                         ↓
                       cache

Якщо ми отримуємо той самий input:

    input → cache → result

і повторне обчислення не потрібне.

---

# 6. Залежності useMemo

Наприклад:

    const result = useMemo(() => {
      return calculate(a, b);
    }, [a, b]);

Залежності:

    [a, b]

означають:

> Перерахувати значення, якщо змінився `a` або `b`.

---

## Приклад

    const fullName = useMemo(() => {
      return `${firstName} ${lastName}`;
    }, [firstName, lastName]);

Якщо змінився:

    firstName

результат перераховується.

Якщо змінився:

    lastName

результат перераховується.

Якщо змінилася якась інша частина state, але:

    firstName
    lastName

залишилися такими самими, React може використати попередній результат.

---

# 7. Порожній масив залежностей

Можна написати:

    const value = useMemo(() => {
      return expensiveCalculation();
    }, []);

Це означає, що значення не залежить від props/state компонента.

У типовому випадку обчислення буде виконано під час першого рендера і результат буде повторно використаний на наступних рендерах.

Але не слід сприймати `[]` як гарантію довічного кешу.

React може в окремих ситуаціях викинути мемоізоване значення.

Тому:

> `useMemo` не повинен використовуватися як механізм зберігання критично важливих даних.

---

# 8. Без useMemo

Розглянемо:

    function ProductList({ products }) {
      const sortedProducts = products.sort((a, b) => {
        return a.price - b.price;
      });

      return (
        <ul>
          {sortedProducts.map(product => (
            <li key={product.id}>
              {product.name}: {product.price}
            </li>
          ))}
        </ul>
      );
    }

Якщо компонент часто ререндериться, сортування може виконуватися знову.

---

# 9. З useMemo

    function ProductList({ products }) {
      const sortedProducts = useMemo(() => {
        return [...products].sort((a, b) => {
          return a.price - b.price;
        });
      }, [products]);

      return (
        <ul>
          {sortedProducts.map(product => (
            <li key={product.id}>
              {product.name}: {product.price}
            </li>
          ))}
        </ul>
      );
    }

Тепер сортування виконується знову, коли змінюється:

    products

---

# 10. Чому тут потрібна копія масиву

У прикладі:

    [...products].sort(...)

ми створюємо новий масив.

Це важливо, тому що:

    sort()

змінює сам масив.

Тому краще не робити:

    products.sort(...)

якщо `products` отриманий через props.

Правильніше:

    [...products].sort(...)

---

# 11. useMemo і фільтрація

Один із дуже поширених випадків:

    const filteredProducts = useMemo(() => {
      return products.filter(product => {
        return product.name
          .toLowerCase()
          .includes(search.toLowerCase());
      });
    }, [products, search]);

Залежності:

    [products, search]

означають:

> Перерахувати список, якщо змінилися `products` або `search`.

---

# 12. Практичний приклад пошуку

    import { useMemo, useState } from "react";

    const products = [
      { id: 1, name: "Laptop", price: 1000 },
      { id: 2, name: "Phone", price: 700 },
      { id: 3, name: "Keyboard", price: 100 },
      { id: 4, name: "Mouse", price: 50 },
    ];

    export default function ProductSearch() {
      const [search, setSearch] = useState("");
      const [count, setCount] = useState(0);

      const filteredProducts = useMemo(() => {
        console.log("Filtering products...");

        return products.filter(product => {
          return product.name
            .toLowerCase()
            .includes(search.toLowerCase());
        });
      }, [search]);

      return (
        <div>
          <input
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search..."
          />

          <button onClick={() => setCount(count + 1)}>
            Count: {count}
          </button>

          <ul>
            {filteredProducts.map(product => (
              <li key={product.id}>
                {product.name} — ${product.price}
              </li>
            ))}
          </ul>
        </div>
      );
    }

При зміні:

    search

список фільтрується.

При зміні:

    count

фільтрація не повинна виконуватися повторно через зміну `count`.

---

# 13. useMemo не зупиняє ререндер компонента

Це дуже важливо.

`useMemo`:

    const value = useMemo(...);

не означає:

> "Компонент більше не буде ререндеритися."

Компонент все одно може ререндеритися.

`useMemo` лише дозволяє повторно використати конкретне мемоізоване значення.

---

# 14. useMemo і referential equality

Особливо важлива властивість `useMemo` — можливість зберегти **посилання на об'єкт або масив**.

Наприклад:

    const value = {
      name: "Valeriy",
      age: 56,
    };

На кожному рендері створюється новий об'єкт.

Навіть якщо значення однакові:

    {
      name: "Valeriy",
      age: 56
    }

і

    {
      name: "Valeriy",
      age: 56
    }

це два різні об'єкти.

---

# 15. Об'єкти порівнюються за посиланням

Наприклад:

    const a = { name: "Valeriy" };
    const b = { name: "Valeriy" };

    console.log(a === b);

Результат:

    false

Тому що:

    a → object A
    b → object B

Це різні об'єкти.

---

# 16. useMemo може стабілізувати об'єкт

Наприклад:

    const user = useMemo(() => {
      return {
        name: "Valeriy",
        role: "developer",
      };
    }, []);

Тепер React може зберігати те саме посилання на об'єкт між рендерами.

---

# 17. Навіщо це потрібно

Особливо це важливо при використанні:

    React.memo

або:

    Context

або інших механізмів, де важлива стабільність посилання.

---

# 18. useMemo + React.memo

Припустимо, є дочірній компонент:

    const UserCard = memo(function UserCard({ user }) {
      console.log("UserCard render");

      return (
        <div>
          <h2>{user.name}</h2>
          <p>{user.role}</p>
        </div>
      );
    });

Батьківський компонент:

    function App() {
      const [count, setCount] = useState(0);

      const user = {
        name: "Valeriy",
        role: "developer",
      };

      return (
        <div>
          <button onClick={() => setCount(count + 1)}>
            {count}
          </button>

          <UserCard user={user} />
        </div>
      );
    }

На кожному рендері `App` створюється новий:

    user

Тому для `UserCard` prop `user` має нове посилання.

---

# 19. useMemo + React.memo

Можна зробити:

    function App() {
      const [count, setCount] = useState(0);

      const user = useMemo(() => {
        return {
          name: "Valeriy",
          role: "developer",
        };
      }, []);

      return (
        <div>
          <button onClick={() => setCount(count + 1)}>
            {count}
          </button>

          <UserCard user={user} />
        </div>
      );
    }

Тепер `user` має стабільне посилання між рендерами.

Якщо `UserCard` мемоізований через `memo`, це може дозволити йому пропустити непотрібний ререндер.

---

# 20. useMemo + Context

Це ще один важливий випадок.

Наприклад:

    const value = {
      user,
      logout,
    };

    return (
      <AuthContext.Provider value={value}>
        {children}
      </AuthContext.Provider>
    );

Об'єкт:

    value

створюється заново під час кожного рендера Provider.

Це може призводити до оновлень споживачів Context через нове посилання.

---

# 21. Оптимізація Context через useMemo

Можна написати:

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

Тепер `value` змінюється, коли змінюються його залежності.

Це може бути корисно в оптимізації Context.

---

# 22. useMemo не замінює useCallback

Ці два Hook дуже схожі, але працюють з різними речами.

`useMemo`:

    const value = useMemo(() => {
      return calculateValue();
    }, [dependencies]);

Запам'ятовує **результат обчислення**.

`useCallback`:

    const handleClick = useCallback(() => {
      console.log("Click");
    }, []);

Запам'ятовує **функцію**.

---

# 23. useMemo може мемоізувати функцію

Технічно можна написати:

    const handleClick = useMemo(() => {
      return () => {
        console.log("Click");
      };
    }, []);

Але для цього існує спеціальний Hook:

    useCallback

Тому краще:

    const handleClick = useCallback(() => {
      console.log("Click");
    }, []);

Запам'ятай:

    useMemo     → значення
    useCallback → функція

---

# 24. useMemo не потрібен для кожного значення

Поганий підхід:

    const sum = useMemo(() => {
      return a + b;
    }, [a, b]);

Якщо:

    a
    b

звичайні числа, обчислення:

    a + b

дуже дешеве.

Мемоізація тут може бути складнішою за саме обчислення.

Простіше:

    const sum = a + b;

---

# 25. Надмірне використання useMemo

Не потрібно автоматично писати:

    useMemo(() => ..., []);

для кожного обчислення.

Наприклад:

    const fullName = useMemo(() => {
      return `${firstName} ${lastName}`;
    }, [firstName, lastName]);

У більшості випадків це зайве.

Простіше:

    const fullName = `${firstName} ${lastName}`;

---

# 26. Коли useMemo дійсно доречний

`useMemo` може бути корисним, якщо:

- обчислення справді дороге;
- великий масив потрібно сортувати;
- великий масив потрібно фільтрувати;
- складні дані потрібно трансформувати;
- обчислення виконується дуже часто;
- стабільність посилання на об'єкт/масив потрібна для оптимізації;
- потрібно передати стабільний `value` у Context;
- `React.memo` залежить від стабільних props.

---

# 27. Коли useMemo, швидше за все, не потрібен

Не потрібно використовувати його тільки тому, що:

> "useMemo швидше".

Наприклад:

    const age = useMemo(() => 56, []);

Це безглуздо.

Так само:

    const name = useMemo(() => "Valeriy", []);

Звичайне:

    const name = "Valeriy";

набагато простіше.

---

# 28. useMemo має свою вартість

`useMemo` теж не безкоштовний.

React повинен:

- зберігати значення;
- зберігати залежності;
- перевіряти залежності;
- підтримувати мемоізацію.

Тому не можна виходити з принципу:

    більше useMemo = швидший React

Правильніше:

    useMemo = інструмент оптимізації,
    який потрібно застосовувати там,
    де він дійсно дає користь.

---

# 29. useMemo і dependency array

Розглянемо:

    const result = useMemo(() => {
      return calculate(a, b, c);
    }, [a, b, c]);

Усі значення, від яких залежить результат, повинні бути враховані.

Неправильно:

    const result = useMemo(() => {
      return calculate(a, b);
    }, [a]);

Тут `b` використовується всередині обчислення, але відсутній у залежностях.

Це може призвести до неправильного результату.

---

# 30. Основне правило dependencies

Якщо значення використовується всередині функції:

    () => {
      return calculate(a, b);
    }

і це значення може змінюватися між рендерами, воно зазвичай має бути серед dependencies:

    [a, b]

Тобто:

    useMemo(
      () => calculate(a, b),
      [a, b]
    );

---

# 31. useMemo і props

Приклад:

    function ProductList({ products, category }) {
      const filteredProducts = useMemo(() => {
        return products.filter(product => {
          return product.category === category;
        });
      }, [products, category]);

      return (
        <ul>
          {filteredProducts.map(product => (
            <li key={product.id}>
              {product.name}
            </li>
          ))}
        </ul>
      );
    }

Тут результат залежить від:

    products
    category

тому обидва значення знаходяться в dependencies.

---

# 32. useMemo і state

`useMemo` може залежати від state:

    const [numbers, setNumbers] = useState([
      10,
      20,
      30,
      40,
    ]);

    const total = useMemo(() => {
      return numbers.reduce((sum, number) => {
        return sum + number;
      }, 0);
    }, [numbers]);

Коли:

    numbers

змінюється, `total` перераховується.

---

# 33. useMemo і масиви

Приклад:

    const visibleItems = useMemo(() => {
      return items.filter(item => item.visible);
    }, [items]);

`visibleItems` буде мати стабільне посилання між рендерами, поки `items` не змінився і React використовує кешоване значення.

Це може бути корисно, якщо:

    <Child items={visibleItems} />

а `Child` оптимізований через:

    memo

---

# 34. useMemo і об'єкти

Наприклад:

    const options = useMemo(() => {
      return {
        sortBy: "price",
        direction: "asc",
      };
    }, []);

Так можна створити стабільний об'єкт.

Без `useMemo`:

    const options = {
      sortBy: "price",
      direction: "asc",
    };

новий об'єкт створюватиметься на кожному рендері.

---

# 35. Але useMemo не потрібен лише через створення об'єкта

Сам факт створення об'єкта не означає, що потрібно використовувати `useMemo`.

Потрібно запитати:

> Чи має стабільність цього посилання реальне значення?

Якщо ні — простий об'єкт часто кращий.

---

# 36. useMemo і чисті обчислення

Функція всередині `useMemo` повинна бути звичайним обчисленням:

    const total = useMemo(() => {
      return items.reduce((sum, item) => {
        return sum + item.price;
      }, 0);
    }, [items]);

Не потрібно використовувати `useMemo` для побічних ефектів.

Погано:

    useMemo(() => {
      localStorage.setItem("theme", theme);
      return theme;
    }, [theme]);

`useMemo` не призначений для side effects.

Для побічних ефектів використовується:

    useEffect

---

# 37. useMemo ≠ useEffect

`useMemo`:

> обчислити і отримати значення.

`useEffect`:

> виконати side effect після рендера.

Наприклад:

    const total = useMemo(() => {
      return calculateTotal(items);
    }, [items]);

Це обчислення.

А:

    useEffect(() => {
      document.title = `Total: ${total}`;
    }, [total]);

це side effect.

---

# 38. useMemo ≠ useState

`useState` зберігає стан:

    const [count, setCount] = useState(0);

`useMemo` кешує результат обчислення:

    const doubled = useMemo(() => {
      return count * 2;
    }, [count]);

Не потрібно використовувати `useMemo` як заміну `useState`.

---

# 39. useMemo ≠ useRef

`useRef`:

    const valueRef = useRef(value);

використовується для збереження mutable reference між рендерами.

`useMemo`:

    const value = useMemo(() => calculate(), []);

використовується для мемоізації обчисленого значення.

Вони мають різне призначення.

---

# 40. useMemo і Strict Mode

У development mode, особливо при використанні:

    <StrictMode>

React може викликати певні функції більше одного разу для перевірки проблем у коді.

Тому не потрібно покладатися на те, що функція всередині `useMemo` виконається рівно один раз.

Наприклад:

    const value = useMemo(() => {
      console.log("calculate");

      return expensiveCalculation();
    }, []);

У development результат у консолі може відрізнятися від production-поведінки.

Це нормально.

---

# 41. useMemo не є гарантією збереження значення назавжди

Дуже важливо розуміти концепцію.

`useMemo` — це оптимізація.

Не потрібно будувати логіку програми так:

    "Якщо useMemo не перерахував значення,
     програма зламається."

Краще думати:

    "Якщо React може використати
     попередній результат — це оптимізація."

Ваш код повинен залишатися правильним і без покладання на кеш як на сховище стану.

---

# 42. Практичний приклад: список студентів

Уявімо великий список:

    const students = [
      { id: 1, name: "Anna", grade: 95 },
      { id: 2, name: "Ivan", grade: 82 },
      { id: 3, name: "Olena", grade: 91 },
      // ...
    ];

Потрібно показати тільки студентів з оцінкою >= 90.

Без мемоізації:

    const excellentStudents = students.filter(student => {
      return student.grade >= 90;
    });

З `useMemo`:

    const excellentStudents = useMemo(() => {
      return students.filter(student => {
        return student.grade >= 90;
      });
    }, [students]);

Для невеликого масиву різниці може практично не бути.

Але для великого списку і частих ререндерів оптимізація може мати сенс.

---

# 43. Практичний приклад: сортування

    const sortedStudents = useMemo(() => {
      return [...students].sort((a, b) => {
        return b.grade - a.grade;
      });
    }, [students]);

Тепер:

    students

є залежністю.

Якщо змінюється інший state:

    count

сортування не потрібно виконувати повторно.

---

# 44. Практичний приклад: кілька умов

    const visibleStudents = useMemo(() => {
      return students
        .filter(student => student.grade >= minGrade)
        .filter(student => student.name
          .toLowerCase()
          .includes(search.toLowerCase())
        )
        .sort((a, b) => b.grade - a.grade);
    }, [students, minGrade, search]);

Тут обчислення складається з:

    filter
    filter
    sort

Тому мемоізація може бути більш виправданою.

---

# 45. Повний приклад

    import { useMemo, useState } from "react";

    type Student = {
      id: number;
      name: string;
      grade: number;
    };

    const students: Student[] = [
      { id: 1, name: "Anna", grade: 95 },
      { id: 2, name: "Ivan", grade: 82 },
      { id: 3, name: "Olena", grade: 91 },
      { id: 4, name: "Petro", grade: 76 },
      { id: 5, name: "Maria", grade: 98 },
    ];

    export default function Students() {
      const [search, setSearch] = useState("");
      const [minGrade, setMinGrade] = useState(80);
      const [count, setCount] = useState(0);

      const visibleStudents = useMemo(() => {
        console.log("Calculating students...");

        return students
          .filter(student => student.grade >= minGrade)
          .filter(student =>
            student.name
              .toLowerCase()
              .includes(search.toLowerCase())
          )
          .sort((a, b) => b.grade - a.grade);
      }, [search, minGrade]);

      return (
        <div>
          <input
            value={search}
            onChange={event => setSearch(event.target.value)}
            placeholder="Search student..."
          />

          <input
            type="number"
            value={minGrade}
            onChange={event =>
              setMinGrade(Number(event.target.value))
            }
          />

          <button onClick={() => setCount(count + 1)}>
            Render count: {count}
          </button>

          <ul>
            {visibleStudents.map(student => (
              <li key={student.id}>
                {student.name}: {student.grade}
              </li>
            ))}
          </ul>
        </div>
      );
    }

Тут:

    search
    minGrade

впливають на результат.

Тому вони знаходяться в:

    [search, minGrade]

А:

    count

не впливає на результат.

Тому `count` не є залежністю.

---

# 46. useMemo і React.memo — різні речі

Це одна з найважливіших відмінностей.

`useMemo`:

    const value = useMemo(() => {
      return calculate();
    }, [dependencies]);

Мемоізує значення.

`React.memo`:

    const UserCard = memo(function UserCard(props) {
      return <div>...</div>;
    });

Мемоізує компонент щодо його props.

Можна використовувати їх разом:

    const data = useMemo(() => {
      return createData();
    }, [dependency]);

    <Child data={data} />

де:

    const Child = memo(function Child({ data }) {
      return <div>...</div>;
    });

---

# 47. useMemo і useCallback — разом

Іноді компонент отримує і значення, і функцію:

    const options = useMemo(() => {
      return {
        sortBy: "price",
      };
    }, []);

    const handleSelect = useCallback((id: number) => {
      console.log(id);
    }, []);

Тоді:

    <ProductList
      options={options}
      onSelect={handleSelect}
    />

може отримувати стабільні props.

Але не потрібно додавати ці оптимізації автоматично.

---

# 48. Порівняння Hook

| Hook | Що робить |
|---|---|
| `useState` | зберігає state |
| `useEffect` | виконує side effects |
| `useRef` | зберігає mutable reference |
| `useMemo` | кешує результат обчислення |
| `useCallback` | кешує функцію |
| `useContext` | читає Context |
| `useReducer` | керує складнішим state |

---

# 49. Як думати про useMemo

Корисна модель:

    Component render
          ↓
    expensive calculation
          ↓
        result

З `useMemo`:

    Component render
          ↓
    dependencies changed?
       ↙          ↘
     yes           no
      ↓             ↓
    calculate     cached result
      ↓
    result

---

# 50. Алгоритм прийняття рішення

Перед використанням `useMemo` постав собі питання:

### Крок 1

Чи є тут обчислення?

    filter
    sort
    reduce
    map
    complex calculation

### Крок 2

Чи є воно достатньо дорогим?

Якщо:

    a + b

то, швидше за все, ні.

Якщо:

    великий масив
    складне сортування
    складна трансформація

можливо, так.

### Крок 3

Чи виконується воно часто?

Якщо компонент майже не ререндериться, оптимізація може бути непотрібною.

### Крок 4

Чи потрібна стабільність посилання?

Наприклад:

    object
    array

які передаються в оптимізований дочірній компонент.

### Крок 5

Чи вимірював я проблему?

Найкраще оптимізувати реальну проблему, а не уявну.

---

# 51. Типова помилка №1 — useMemo всюди

Погано:

    const name = useMemo(() => "Valeriy", []);

    const age = useMemo(() => 56, []);

    const sum = useMemo(() => a + b, [a, b]);

Це створює зайву складність.

Краще:

    const name = "Valeriy";
    const age = 56;
    const sum = a + b;

---

# 52. Типова помилка №2 — неправильні dependencies

Погано:

    const total = useMemo(() => {
      return price * quantity;
    }, [price]);

Тут:

    quantity

використовується, але відсутній у dependencies.

Правильно:

    const total = useMemo(() => {
      return price * quantity;
    }, [price, quantity]);

---

# 53. Типова помилка №3 — side effects всередині useMemo

Погано:

    const value = useMemo(() => {
      localStorage.setItem("name", name);

      return name;
    }, [name]);

`useMemo` не призначений для side effects.

Краще:

    useEffect(() => {
      localStorage.setItem("name", name);
    }, [name]);

---

# 54. Типова помилка №4 — використовувати useMemo як state

Погано:

    const value = useMemo(() => {
      return initialValue;
    }, []);

і потім очікувати, що:

    setValue(...)

може змінити його.

`useMemo` не має setter.

Для state:

    const [value, setValue] = useState(initialValue);

---

# 55. Типова помилка №5 — думати, що useMemo гарантує відсутність ререндеру

Наприклад:

    const value = useMemo(() => {
      return expensiveCalculation();
    }, [data]);

Це не означає, що компонент перестане ререндеритися.

Мемоізується лише:

    value

---

# 56. Типова помилка №6 — мутувати дані

Погано:

    const sorted = useMemo(() => {
      return products.sort((a, b) => a.price - b.price);
    }, [products]);

`sort()` змінює `products`.

Краще:

    const sorted = useMemo(() => {
      return [...products].sort((a, b) => {
        return a.price - b.price;
      });
    }, [products]);

---

# 57. Типова помилка №7 — використовувати useMemo без вимірювання

Не варто думати:

    "У мене є filter → потрібен useMemo."

Правильніше:

    "У мене є дорогий filter,
     він часто виконується,
     і я хочу перевірити,
     чи мемоізація покращить ситуацію."

---

# 58. Профілювання

Для пошуку реальних проблем продуктивності використовують:

    React DevTools Profiler

Спочатку:

    measure

потім:

    identify bottleneck

потім:

    optimize

після цього:

    measure again

Тобто:

    Виміряти
       ↓
    Знайти проблему
       ↓
    Оптимізувати
       ↓
    Перевірити результат

---

# 59. useMemo у React-проєктах

У реальному проєкті `useMemo` часто можна зустріти при:

- фільтрації списків;
- сортуванні таблиць;
- пошуку;
- агрегації даних;
- складних розрахунках;
- підготовці даних для графіків;
- побудові великих списків;
- Context Provider;
- взаємодії з `React.memo`.

---

# 60. useMemo у Next.js

`useMemo` — React Hook.

Якщо компонент у Next.js App Router використовує:

    useMemo

він має бути Client Component.

На початку файлу:

    "use client";

Наприклад:

    "use client";

    import { useMemo } from "react";

    export default function ProductList() {
      const products = [
        { id: 1, name: "Laptop", price: 1000 },
        { id: 2, name: "Phone", price: 700 },
      ];

      const sortedProducts = useMemo(() => {
        return [...products].sort((a, b) => {
          return a.price - b.price;
        });
      }, []);

      return (
        <ul>
          {sortedProducts.map(product => (
            <li key={product.id}>
              {product.name}
            </li>
          ))}
        </ul>
      );
    }

У Next.js потрібно розуміти різницю між:

    Server Component
    Client Component

і пам'ятати, що Hook-и на кшталт `useMemo` використовуються в Client Components.

---

# 61. Чи потрібно використовувати useMemo в кожному Client Component?

Ні.

Сам факт використання:

    "use client"

не означає, що всі обчислення потрібно обгорнути в:

    useMemo

`useMemo` використовується тоді, коли є конкретна причина для оптимізації.

---

# 62. useMemo і великі дані

Уявімо:

    10 000 products

і компонент виконує:

    filter
    sort
    map

при кожному рендері.

Тоді:

    const visibleProducts = useMemo(() => {
      return products
        .filter(...)
        .sort(...)
        .map(...);
    }, [products, search, sortBy]);

може бути корисним.

Але якщо у вас:

    5 products

і простий:

    filter()

то `useMemo` може не дати помітної користі.

---

# 63. useMemo і асинхронність

`useMemo` не призначений для асинхронного отримання даних.

Не потрібно робити:

    const data = useMemo(async () => {
      const response = await fetch("/api/products");

      return response.json();
    }, []);

Це не правильний спосіб отримання даних.

Для data fetching використовуються відповідні механізми React/Next.js або спеціалізовані бібліотеки.

`useMemo` призначений насамперед для синхронного обчислення значення.

---

# 64. useMemo і fetch

Погано:

    const data = useMemo(() => {
      return fetch("/api/products");
    }, []);

`fetch()` повертає Promise.

`useMemo` не перетворює асинхронне отримання даних у state.

Для класичного Client Component можна використовувати:

    useEffect(() => {
      async function loadProducts() {
        const response = await fetch("/api/products");
        const data = await response.json();

        setProducts(data);
      }

      loadProducts();
    }, []);

А потім `useMemo` може використовувати вже отримані дані:

    const visibleProducts = useMemo(() => {
      return products.filter(product => {
        return product.active;
      });
    }, [products]);

Тобто:

    fetch → data → useMemo → derived data

---

# 65. Derived data

Дуже важливе поняття.

Наприклад, маємо state:

    products

і можемо отримати:

    filteredProducts

Це **derived data** — дані, які можна обчислити з іншого state/props.

Не завжди потрібно зберігати derived data окремо в state.

Наприклад, не обов'язково:

    const [filteredProducts, setFilteredProducts] = useState([]);

Можна:

    const filteredProducts = useMemo(() => {
      return products.filter(product => {
        return product.active;
      });
    }, [products]);

Але якщо обчислення просте:

    const filteredProducts = products.filter(...);

може бути достатньо і без `useMemo`.

---

# 66. useMemo і derived state

Небажано без необхідності дублювати дані:

    products
    filteredProducts

як два незалежні state.

Це створює ризик розсинхронізації.

Краще мати:

    products

і обчислювати:

    filteredProducts

з `products`.

Якщо обчислення дороге:

    useMemo

---

# 67. useMemo — це не "магічна оптимізація"

Не потрібно сприймати:

    useMemo

як універсальну кнопку:

    "Зробити React швидшим"

Правильна модель:

    useMemo
       ↓
    cache expensive calculation
       ↓
    avoid unnecessary recalculation

---

# 68. Міні-порівняння

### Звичайне обчислення

    const total = items.reduce(
      (sum, item) => sum + item.price,
      0
    );

### Мемоізоване

    const total = useMemo(() => {
      return items.reduce(
        (sum, item) => sum + item.price,
        0
      );
    }, [items]);

Перше — простіше.

Друге — потенційно корисніше, якщо:

- `items` великий;
- компонент часто ререндериться;
- обчислення дійсно дороге.

---

# 69. Питання зі співбесіди

### Що таке useMemo?

`useMemo` — React Hook для мемоізації результату обчислення між рендерами.

---

### Що повертає useMemo?

Він повертає мемоізоване значення:

    const value = useMemo(() => {
      return calculate();
    }, []);

---

### Для чого потрібен dependency array?

Він визначає, від яких значень залежить обчислення.

    [a, b]

означає, що при зміні `a` або `b` значення потрібно перерахувати.

---

### Чи useMemo зупиняє ререндер компонента?

Ні.

Він мемоізує конкретне значення, а не весь компонент.

---

### Чим useMemo відрізняється від useCallback?

    useMemo     → мемоізує результат
    useCallback → мемоізує функцію

---

### Чим useMemo відрізняється від React.memo?

    useMemo     → Hook для мемоізації значення
    React.memo  → мемоізація компонента щодо props

---

### Чи потрібно використовувати useMemo всюди?

Ні.

Це оптимізація, яку потрібно використовувати за потреби.

---

### Чи можна виконувати side effects у useMemo?

Ні.

Для side effects використовується `useEffect`.

---

### Чи можна використовувати useMemo для fetch?

Не як механізм data fetching.

`useMemo` призначений для мемоізації обчислених значень, а не для керування асинхронним отриманням даних.

---

### Чи useMemo зберігає значення назавжди?

Ні.

Це оптимізаційний кеш, а не постійне сховище.

---

### Чи useMemo потрібен для простого `a + b`?

Зазвичай ні.

Просте:

    const sum = a + b;

краще за:

    const sum = useMemo(() => a + b, [a, b]);

---

# 70. Шлях вивчення

## 🟢 Core

Потрібно добре знати:

- що таке `useMemo`;
- синтаксис;
- dependency array;
- memoization;
- derived data;
- expensive calculation;
- різницю між state і derived data.

---

## 🔵 Junior

Потрібно вміти:

- мемоізувати filter;
- мемоізувати sort;
- мемоізувати reduce;
- правильно вказувати dependencies;
- пояснити, навіщо потрібен `useMemo`;
- розуміти referential equality;
- розуміти різницю `useMemo` / `useCallback`;
- розуміти різницю `useMemo` / `React.memo`.

---

## 🟠 Middle

Потрібно розуміти:

- оптимізацію великих списків;
- object identity;
- array identity;
- `Object.is`;
- `React.memo` + `useMemo`;
- Context + `useMemo`;
- реальні bottlenecks;
- профілювання;
- trade-offs мемоізації.

---

## 🔴 Senior

Потрібно вміти:

- визначати, де мемоізація дійсно потрібна;
- не робити premature optimization;
- аналізувати rendering performance;
- використовувати React DevTools Profiler;
- розуміти взаємодію memoization з архітектурою компонентів;
- оцінювати вартість кешування;
- оптимізувати не тільки окремий Hook, а весь rendering pipeline.

---

# 71. Міні-шпаргалка

    import { useMemo } from "react";

    const value = useMemo(() => {
      return expensiveCalculation(data);
    }, [data]);

Головна ідея:

    useMemo
       ↓
    запам'ятати результат
       ↓
    dependencies не змінилися?
       ↓
    використовувати cached value

---

# 72. Шпаргалка: useMemo vs useCallback

    useMemo

    const value = useMemo(() => {
      return calculate();
    }, [dependencies]);

    ↓

    value


    useCallback

    const handleClick = useCallback(() => {
      doSomething();
    }, [dependencies]);

    ↓

    function

---

# 73. Шпаргалка: useMemo vs React.memo

    useMemo
    └── мемоізує значення

    React.memo
    └── мемоізує компонент

---

# 74. Шпаргалка: коли використовувати

    Дороге обчислення?
          │
       ┌──┴──┐
      так    ні
       │      │
    useMemo   без useMemo

    Потрібне стабільне
    посилання на object/array?
          │
       ┌──┴──┐
      так    ні
       │      │
    можливо   без useMemo

    Просте обчислення?
          │
        так
          ↓
    без useMemo

---

# 75. Головне, що потрібно запам'ятати

1. `useMemo` мемоізує **результат обчислення**.

2. Основний синтаксис:

       const value = useMemo(() => {
         return calculate();
       }, [dependencies]);

3. Якщо dependencies не змінилися, React може використати попередній результат.

4. `useMemo` не зупиняє ререндер компонента.

5. `useMemo` — це оптимізація, а не state.

6. `useMemo` не призначений для side effects.

7. Для side effects використовується `useEffect`.

8. Для мемоізації функції використовується `useCallback`.

9. Для мемоізації компонента використовується `React.memo`.

10. `useMemo` особливо корисний для дорогих:
    
        filter
        sort
        reduce
        calculations

11. `useMemo` може бути корисним для стабілізації посилання на:

        object
        array

12. Не потрібно використовувати `useMemo` для кожного простого обчислення.

13. Надмірне використання `useMemo` збільшує складність коду.

14. Спочатку потрібно знайти реальну проблему продуктивності, а потім оптимізувати.

15. Найкраща модель мислення:

        useMemo
           ↓
        expensive calculation
           ↓
        cache result
           ↓
        reuse when dependencies are unchanged

---

# 76. Коротка ментальна модель

Думай про `useMemo` так:

> "У мене є обчислення, яке може бути дорогим. Якщо його вхідні дані не змінилися, я хочу використати попередній результат замість повторного обчислення."

Тобто:

    dependencies
         ↓
    ┌───────────────┐
    │ useMemo       │
    │               │
    │ calculation() │
    └───────┬───────┘
            ↓
         result
            ↓
      cached value

Але завжди пам'ятай:

    useMemo ≠ state
    useMemo ≠ effect
    useMemo ≠ component memoization
    useMemo ≠ data fetching

Найважливіше:

> **`useMemo` — це інструмент оптимізації дорогих обчислень і, за потреби, стабілізації посилань на значення. Його не потрібно використовувати автоматично — спочатку має бути реальна причина для оптимізації.**