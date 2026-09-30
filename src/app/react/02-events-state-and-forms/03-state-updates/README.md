# React — State Updates

## 03. State Updates

State в React — це не просто змінна, якій ми присвоюємо нове значення.

Коли потрібно змінити state, ми повідомляємо React про це через setter, отриманий з `useState()`.

    const [count, setCount] = useState(0);

    setCount(1);

React планує оновлення state і після цього виконує новий render компонента.

Особливо важливо зрозуміти:

> State не змінюється безпосередньо. Ми передаємо React нове значення або функцію, яка обчислює нове значення.

---

## Ключові поняття

- `setState` — функція для оновлення state
- state update — оновлення стану компонента
- re-render — повторний виклик компонента після оновлення state
- state snapshot — state, який належить конкретному render
- updater function — функція виду `prev => next`
- batching — об'єднання кількох state updates в одне оновлення
- functional update — оновлення на основі попереднього state
- immutable update — створення нового об'єкта/масиву замість зміни існуючого
- state queue — черга запланованих оновлень
- stale state — застаріле значення state, отримане з поточного render

---

## Що потрібно пам'ятати

1. Не змінюємо state напряму.
2. Для оновлення використовуємо setter.
3. Значення state всередині конкретного render є незмінним snapshot.
4. `setState()` не змінює поточну змінну state миттєво.
5. Якщо нове значення залежить від попереднього — використовуємо updater function.
6. Кілька updates можуть бути оброблені React разом.
7. Для об'єктів і масивів створюємо нове значення замість mutation.
8. Не покладаємося на `state` одразу після `setState()`.
9. State update запускає новий render, якщо React визначає, що значення змінилося.
10. Setter можна викликати кілька разів.
11. Для послідовних залежних updates краще використовувати функціональний updater.
12. State update — це прохання React оновити state, а не звичайне присвоєння змінній.

---

# 1. Базове оновлення state

Розглянемо простий counter:

    import { useState } from "react";

    function Counter() {
        const [count, setCount] = useState(0);

        function handleClick() {
            setCount(count + 1);
        }

        return (
            <button onClick={handleClick}>
                {count}
            </button>
        );
    }

При натисканні:

    setCount(count + 1);

React отримує нове значення `count` і виконує новий render.

Послідовність:

    click
      ↓
    handleClick()
      ↓
    setCount(count + 1)
      ↓
    React schedules state update
      ↓
    component re-render
      ↓
    нове значення count
      ↓
    новий UI

---

# 2. State не змінюється як звичайна змінна

Звичайна JavaScript-змінна:

    let count = 0;

    count = count + 1;

Тут змінна одразу отримує нове значення.

React state працює інакше:

    const [count, setCount] = useState(0);

    setCount(count + 1);

Не потрібно думати про це як:

    count = count + 1;

Правильна модель:

    "React, наступного разу використай нове значення state."

---

# 3. State як snapshot

Одна з найважливіших концепцій React:

> Кожен render отримує свій snapshot state.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        function handleClick() {
            console.log(count);

            setCount(count + 1);

            console.log(count);
        }

        return (
            <button onClick={handleClick}>
                {count}
            </button>
        );
    }

Обидва `console.log(count)` у цьому handler покажуть одне й те саме значення.

Наприклад:

    0
    0

а не:

    0
    1

Чому?

Тому що `count` належить поточному render.

`setCount()` не переписує локальну змінну `count` всередині вже виконуваного render.

---

# 4. Render можна уявляти як snapshot

Наприклад, перший render:

    count = 0

Handler цього render "бачить":

    count === 0

Після:

    setCount(1);

React виконає наступний render:

    count = 1

Тепер handler нового render буде бачити:

    count === 1

Схематично:

    Render #1
        count = 0
             ↓
        setCount(1)
             ↓
    Render #2
        count = 1
             ↓
        setCount(2)
             ↓
    Render #3
        count = 2

---

# 5. Чому setState не змінює state одразу

Розглянемо:

    function handleClick() {
        setCount(count + 1);

        console.log(count);
    }

Якщо поточний `count` дорівнює `0`, результат:

    0

а не:

    1

Причина:

    setCount(count + 1);

планує наступне значення state.

Поточний render уже створений.

React не переписує його посеред виконання.

---

# 6. Послідовність оновлення

Наприклад:

    count = 0

Користувач натискає кнопку:

    setCount(1);

React планує оновлення.

Після завершення поточної роботи React виконує наступний render:

    count = 1

Тобто:

    current render
          ↓
    setState(...)
          ↓
    update scheduled
          ↓
    next render
          ↓
    new state
          ↓
    updated UI

---

# 7. Два способи передати нове значення

Setter `useState` може отримати:

1. нове значення;
2. функцію updater.

### Нове значення

    setCount(10);

### Функція updater

    setCount(prevCount => prevCount + 1);

Другий варіант особливо важливий, коли нове значення залежить від попереднього.

---

# 8. Коли достатньо передати значення

Якщо нове значення не залежить від попереднього:

    const [name, setName] = useState("");

    setName("Valeriy");

Або:

    const [isOpen, setIsOpen] = useState(false);

    setIsOpen(true);

Або:

    const [page, setPage] = useState(1);

    setPage(5);

Тут немає необхідності знати попередній state.

---

# 9. Коли потрібно використовувати updater function

Якщо нове значення залежить від попереднього:

    setCount(prevCount => prevCount + 1);

Або:

    setCount(prevCount => prevCount - 1);

Або:

    setPage(prevPage => prevPage + 1);

Загальна форма:

    setState(prevState => newState);

---

# 10. Чому updater function важлива

Припустимо:

    const [count, setCount] = useState(0);

Ми хочемо збільшити counter тричі:

    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);

На перший погляд здається, що результат буде:

    3

Але це не так.

Усі три updates використовують `count` з поточного render.

Якщо:

    count = 0

то фактично кожен update просить встановити:

    1

Тому результатом буде:

    1

---

# 11. Правильне потрійне збільшення

Використовуємо updater function:

    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);
    setCount(prevCount => prevCount + 1);

Тепер React може послідовно застосувати updates:

    0 → 1
    1 → 2
    2 → 3

Результат:

    3

Це одна з найважливіших причин використання updater function.

---

# 12. State update queue

React може обробляти updates як послідовність.

Наприклад:

    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);

Можна уявляти це так:

    initial state
        0

    update 1
        prev = 0
        next = 1

    update 2
        prev = 1
        next = 2

    update 3
        prev = 2
        next = 3

    final state
        3

Тому updater function особливо корисна для кількох залежних updates.

---

# 13. Batching

React може об'єднувати кілька state updates, які відбуваються під час однієї події або іншої роботи React, щоб не виконувати зайві renders.

Наприклад:

    function handleClick() {
        setFirstName("Valeriy");
        setLastName("Svystun");
    }

Не потрібно думати:

    setFirstName(...)
        ↓
    render

    setLastName(...)
        ↓
    render

У сучасному React updates часто обробляються разом.

Умовно:

    update 1
    update 2
    update 3
       ↓
    React processes updates
       ↓
    render

Головна ідея:

> Не потрібно вручну оптимізувати кожен `setState()` через страх перед окремим render.

---

# 14. Batching і updater function

Batching не означає, що updater function більше не потрібна.

Наприклад:

    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);

і:

    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);

— це різні ситуації.

У першому випадку всі updates можуть використовувати один і той самий snapshot `count`.

У другому випадку кожен updater отримує результат попереднього update.

---

# 15. Правило залежності від попереднього state

Запам'ятай просте правило:

> Якщо нове значення залежить від попереднього — використовуй updater function.

Наприклад:

    setCount(prev => prev + 1);

    setCount(prev => prev - 1);

    setPage(prev => prev + 1);

    setItems(prev => [...prev, newItem]);

    setUser(prev => ({
        ...prev,
        name: "Valeriy",
    }));

---

# 16. Оновлення boolean state

Для boolean часто використовують попереднє значення:

    const [isOpen, setIsOpen] = useState(false);

    function handleToggle() {
        setIsOpen(prevIsOpen => !prevIsOpen);
    }

Це дуже поширений патерн.

Наприклад:

    false → true
    true → false
    false → true

---

# 17. Toggle

Типовий React toggle:

    import { useState } from "react";

    function Toggle() {
        const [isOn, setIsOn] = useState(false);

        function handleToggle() {
            setIsOn(prevIsOn => !prevIsOn);
        }

        return (
            <button onClick={handleToggle}>
                {isOn ? "ON" : "OFF"}
            </button>
        );
    }

Тут новий state безпосередньо залежить від попереднього:

    false → true
    true → false

Тому updater function є природним рішенням.

---

# 18. Оновлення string state

Для string state часто передаємо нове значення:

    const [name, setName] = useState("");

    setName("Valeriy");

Якщо нове значення залежить від попереднього:

    setName(prevName => `${prevName}!`);

Наприклад:

    "Valeriy"
        ↓
    "Valeriy!"
        ↓
    "Valeriy!!"

---

# 19. Оновлення number state

Просте встановлення:

    setAge(56);

Залежність від попереднього:

    setAge(prevAge => prevAge + 1);

Зменшення:

    setAge(prevAge => prevAge - 1);

Множення:

    setNumber(prevNumber => prevNumber * 2);

---

# 20. Оновлення object state

Нехай маємо:

    const [user, setUser] = useState({
        name: "Valeriy",
        age: 56,
    });

Не потрібно змінювати:

    user.name = "Alex";

Це mutation.

Правильно створити новий object:

    setUser({
        ...user,
        name: "Alex",
    });

---

# 21. Object state + updater function

Якщо новий object залежить від попереднього:

    setUser(prevUser => ({
        ...prevUser,
        name: "Alex",
    }));

Це особливо корисно, коли кілька updates можуть бути заплановані послідовно.

---

# 22. Чому spread operator важливий

Було:

    {
        name: "Valeriy",
        age: 56,
    }

Потрібно змінити тільки `name`.

Створюємо новий object:

    {
        ...user,
        name: "Alex",
    }

Результат:

    {
        name: "Alex",
        age: 56,
    }

`age` залишився без змін.

---

# 23. Оновлення array state

Нехай:

    const [items, setItems] = useState<string[]>([]);

Додати елемент:

    setItems(prevItems => [
        ...prevItems,
        "React",
    ]);

Видалити елемент:

    setItems(prevItems =>
        prevItems.filter(item => item !== "React")
    );

Замінити елемент:

    setItems(prevItems =>
        prevItems.map(item =>
            item === "React"
                ? "Next.js"
                : item
        )
    );

Головний принцип:

> Не змінюємо існуючий array. Створюємо новий.

---

# 24. Mutation vs immutable update

### ❌ Mutation

    items.push("React");

    user.name = "Alex";

### ✅ Immutable update

    setItems(prevItems => [
        ...prevItems,
        "React",
    ]);

    setUser(prevUser => ({
        ...prevUser,
        name: "Alex",
    }));

React state потрібно оновлювати через створення нового значення.

---

# 25. State update для вкладених об'єктів

Наприклад:

    const [user, setUser] = useState({
        name: "Valeriy",
        address: {
            city: "Vinnytsia",
            country: "Ukraine",
        },
    });

Потрібно змінити `city`.

Правильно:

    setUser(prevUser => ({
        ...prevUser,
        address: {
            ...prevUser.address,
            city: "Kyiv",
        },
    }));

Потрібно створити нові об'єкти на відповідному рівні.

---

# 26. Не мутуй state

Погано:

    const [user, setUser] = useState({
        name: "Valeriy",
    });

    user.name = "Alex";

Це змінює існуючий object.

Правильно:

    setUser(prevUser => ({
        ...prevUser,
        name: "Alex",
    }));

---

# 27. State update і re-render

Коли setter отримує нове state:

    setCount(10);

React може виконати новий render компонента.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        console.log("render");

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

Після натискання:

    render
    render
    render
    ...

Кожен render виконує function component заново.

Але state не починається з нуля, тому що React зберігає state між renders.

---

# 28. Function component виконується заново

Це важливий mental model.

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        console.log("component executed");

        return (
            <button onClick={() => setCount(count + 1)}>
                {count}
            </button>
        );
    }

При першому render:

    component executed

Після update:

    setCount(1);

React знову викликає:

    Counter()

Але тепер:

    count === 1

---

# 29. React не "перезапускає" state з initial value

Це:

    const [count, setCount] = useState(0);

не означає:

    кожен render → count = 0

`0` — це initial state.

React зберігає state між renders.

Схематично:

    first render
        useState(0)
        ↓
        count = 0

    setCount(1)
        ↓

    second render
        useState(0)
        ↓
        count = 1

---

# 30. Initial state і наступні renders

Наприклад:

    const [count, setCount] = useState(100);

`100` використовується для initial state.

Після:

    setCount(200);

наступний render має:

    count = 200

React не повертається до:

    count = 100

---

# 31. State update не означає "змінити DOM вручну"

У React ми не робимо:

    document.querySelector(".counter").textContent = count;

Замість цього:

    setCount(prev => prev + 1);

React:

    state update
        ↓
    render
        ↓
    compare/update UI
        ↓
    DOM

React відповідає за оновлення UI.

---

# 32. Коли нове значення не залежить від старого

Можна:

    setStatus("success");

    setPage(2);

    setIsOpen(true);

    setName("Valeriy");

---

# 33. Коли нове значення залежить від старого

Використовуємо:

    setCount(prev => prev + 1);

    setIsOpen(prev => !prev);

    setPage(prev => prev + 1);

    setItems(prev => [...prev, item]);

Це хороший загальний принцип для React:

    previous state
          ↓
    updater function
          ↓
    next state

---

# 34. Не покладайся на state після setState

Погано мислити так:

    setCount(count + 1);

    // тут count вже новий

Це не гарантується.

Правильніше:

    setCount(count + 1);

    // count тут належить поточному render

Нове значення буде доступне під час наступного render.

---

# 35. Як отримати реакцію на нове значення

Якщо потрібно виконати певну логіку після зміни state, у React для цього існують Effects.

Наприклад, концептуально:

    state changed
        ↓
    render
        ↓
    effect

Це буде детально розглядатися в темах:

    03-component-lifecycle-and-effects
    04-hooks

Не варто використовувати `setState()` як спосіб виконати callback "після зміни state".

---

# 36. Не роби так

Не потрібно:

    setCount(count + 1);

    doSomething(count);

якщо `doSomething()` має отримати вже нове значення.

`count` тут все ще є snapshot поточного render.

Краще спочатку обчислити потрібне значення:

    const nextCount = count + 1;

    setCount(nextCount);

    doSomething(nextCount);

Або використати відповідний Effect, якщо логіка повинна реагувати саме на зміну state.

---

# 37. Кілька state variables

Компонент може мати кілька незалежних state:

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);
    const [isActive, setIsActive] = useState(false);

Кожен state має власний setter:

    setName(...);
    setAge(...);
    setIsActive(...);

Це нормальний і дуже поширений підхід.

---

# 38. Коли використовувати кілька state

Якщо значення логічно незалежні:

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [isSubscribed, setIsSubscribed] = useState(false);

Це може бути зрозуміліше, ніж один великий object.

---

# 39. Один object або кілька state

### Варіант 1 — окремі state

    const [name, setName] = useState("");
    const [age, setAge] = useState(0);

### Варіант 2 — object

    const [user, setUser] = useState({
        name: "",
        age: 0,
    });

Обидва варіанти можливі.

Вибір залежить від логічного зв'язку між даними.

Якщо значення часто оновлюються разом і представляють одну сутність — object може бути зручним.

Якщо значення незалежні — окремі state часто простіші.

---

# 40. Derived state

Не потрібно зберігати в state те, що можна легко обчислити з іншого state.

Наприклад:

    const [firstName, setFirstName] = useState("Valeriy");
    const [lastName, setLastName] = useState("Svystun");

Не потрібно:

    const [fullName, setFullName] = useState("");

Якщо:

    fullName = firstName + " " + lastName

краще обчислити:

    const fullName = `${firstName} ${lastName}`;

Тоді маємо одне джерело правди.

---

# 41. Один source of truth

Поганий підхід:

    const [price, setPrice] = useState(100);
    const [quantity, setQuantity] = useState(2);
    const [total, setTotal] = useState(200);

Тепер потрібно синхронізувати:

    price
    quantity
    total

Краще:

    const [price, setPrice] = useState(100);
    const [quantity, setQuantity] = useState(2);

    const total = price * quantity;

Тепер:

    price
    quantity

є state, а:

    total

є derived value.

---

# 42. Не дублюй state без необхідності

Чим більше незалежних копій одних і тих самих даних, тим більше можливостей для розсинхронізації.

Наприклад:

    const [items, setItems] = useState([]);
    const [itemCount, setItemCount] = useState(0);

Можна отримати:

    items.length

замість окремого:

    itemCount

якщо немає спеціальної причини зберігати його окремо.

---

# 43. Updater function і попередній state

Типова форма:

    setState(prevState => {
        return newState;
    });

Наприклад:

    setCount(prevCount => {
        return prevCount + 1;
    });

Короткий запис:

    setCount(prevCount => prevCount + 1);

---

# 44. Updater function з object

    setUser(prevUser => {
        return {
            ...prevUser,
            age: prevUser.age + 1,
        };
    });

Короткий варіант:

    setUser(prevUser => ({
        ...prevUser,
        age: prevUser.age + 1,
    }));

Зверни увагу на:

    ({

        ...

    })

Дужки потрібні, щоб arrow function повернула object.

---

# 45. Updater function з array

    setItems(prevItems => [
        ...prevItems,
        newItem,
    ]);

Тут:

    prevItems

— попередній array.

А:

    [
        ...prevItems,
        newItem,
    ]

— новий array.

---

# 46. Lazy initialization

`useState` може отримувати функцію для обчислення initial state.

Наприклад:

    const [items, setItems] = useState(() => createInitialItems());

Форма:

    useState(initialValue);

або:

    useState(() => initialValue);

Функція використовується для обчислення initial state.

Це може бути корисним, якщо початкове значення потрібно отримати в результаті більш складного обчислення.

---

# 47. Приклад lazy initialization

Без функції:

    const [items, setItems] = useState(createItems());

Тут `createItems()` викликається під час виконання цього виразу.

З initializer function:

    const [items, setItems] = useState(() => createItems());

Тут React отримує функцію, яка використовується для отримання initial state.

Для простих значень:

    useState(0);

    useState("");

    useState(false);

не потрібно використовувати lazy initialization.

---

# 48. TypeScript і state

React + TypeScript дозволяє явно визначати тип state.

Наприклад:

    const [count, setCount] = useState<number>(0);

Але для простих випадків TypeScript часто сам визначає тип:

    const [count, setCount] = useState(0);

Тип:

    number

буде виведений автоматично.

---

# 49. String state з TypeScript

    const [name, setName] = useState("");

TypeScript визначає:

    name: string

і:

    setName: (value: string) => void

---

# 50. Boolean state з TypeScript

    const [isOpen, setIsOpen] = useState(false);

TypeScript визначає:

    isOpen: boolean

---

# 51. Array state з TypeScript

Наприклад:

    const [items, setItems] = useState<string[]>([]);

Тепер:

    items

має тип:

    string[]

Можна додати:

    setItems(prevItems => [
        ...prevItems,
        "React",
    ]);

Але не можна:

    setItems(prevItems => [
        ...prevItems,
        100,
    ]);

тому що `100` — це `number`, а не `string`.

---

# 52. Object state з TypeScript

Можна описати тип:

    type User = {
        name: string;
        age: number;
    };

Потім:

    const [user, setUser] = useState<User>({
        name: "Valeriy",
        age: 56,
    });

Оновлення:

    setUser(prevUser => ({
        ...prevUser,
        age: prevUser.age + 1,
    }));

---

# 53. State з union type

Наприклад, статус:

    type Status = "idle" | "loading" | "success" | "error";

    const [status, setStatus] = useState<Status>("idle");

Тепер дозволені:

    setStatus("loading");

    setStatus("success");

    setStatus("error");

Але:

    setStatus("pending");

буде помилкою TypeScript.

---

# 54. State може бути null

Наприклад:

    type User = {
        id: number;
        name: string;
    };

    const [user, setUser] = useState<User | null>(null);

Спочатку:

    user === null

Після завантаження:

    setUser({
        id: 1,
        name: "Valeriy",
    });

Тип state:

    User | null

Тому під час використання потрібно враховувати `null`.

---

# 55. Практичний приклад — Counter

    import { useState } from "react";

    function Counter() {
        const [count, setCount] = useState(0);

        function increment() {
            setCount(prevCount => prevCount + 1);
        }

        function decrement() {
            setCount(prevCount => prevCount - 1);
        }

        function reset() {
            setCount(0);
        }

        return (
            <div>
                <p>Count: {count}</p>

                <button onClick={increment}>
                    +
                </button>

                <button onClick={decrement}>
                    -
                </button>

                <button onClick={reset}>
                    Reset
                </button>
            </div>
        );
    }

Тут присутні три різних типи state updates:

    setCount(prev => prev + 1);

    setCount(prev => prev - 1);

    setCount(0);

---

# 56. Практичний приклад — Toggle

    import { useState } from "react";

    function Toggle() {
        const [isVisible, setIsVisible] = useState(false);

        function handleToggle() {
            setIsVisible(prev => !prev);
        }

        return (
            <div>
                <button onClick={handleToggle}>
                    {isVisible ? "Hide" : "Show"}
                </button>

                {isVisible && (
                    <p>
                        Content is visible
                    </p>
                )}
            </div>
        );
    }

---

# 57. Практичний приклад — список

    import { useState } from "react";

    function TodoList() {
        const [items, setItems] = useState<string[]>([]);

        function addItem() {
            setItems(prevItems => [
                ...prevItems,
                `Item ${prevItems.length + 1}`,
            ]);
        }

        return (
            <div>
                <button onClick={addItem}>
                    Add item
                </button>

                <ul>
                    {items.map(item => (
                        <li key={item}>
                            {item}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }

---

# 58. Практичний приклад — object state

    import { useState } from "react";

    type User = {
        name: string;
        age: number;
    };

    function UserProfile() {
        const [user, setUser] = useState<User>({
            name: "Valeriy",
            age: 56,
        });

        function increaseAge() {
            setUser(prevUser => ({
                ...prevUser,
                age: prevUser.age + 1,
            }));
        }

        return (
            <div>
                <p>
                    {user.name}, {user.age}
                </p>

                <button onClick={increaseAge}>
                    Increase age
                </button>
            </div>
        );
    }

---

# 59. Практичний приклад — кілька updates

    function handleClick() {
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
    }

Після одного click:

    0 → 1 → 2 → 3

Якщо:

    count = 0

результатом буде:

    count = 3

---

# 60. Типова помилка — три рази `count + 1`

Проблемний варіант:

    function handleClick() {
        setCount(count + 1);
        setCount(count + 1);
        setCount(count + 1);
    }

Очікування:

    0 → 3

Фактична логіка може бути:

    0 → 1
    0 → 1
    0 → 1

Тому фінальний state:

    1

Правильно:

    function handleClick() {
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
        setCount(prev => prev + 1);
    }

---

# 61. Типова помилка — mutation object

❌

    user.name = "Alex";

    setUser(user);

Проблема в тому, що ми змінили існуючий object.

✅

    setUser(prevUser => ({
        ...prevUser,
        name: "Alex",
    }));

Створюється новий object.

---

# 62. Типова помилка — mutation array

❌

    items.push("React");

    setItems(items);

Краще:

    setItems(prevItems => [
        ...prevItems,
        "React",
    ]);

---

# 63. Типова помилка — очікування нового state одразу

❌

    setCount(count + 1);

    console.log(count);

Не потрібно очікувати:

    1

якщо до update було:

    0

Поточний render все ще має:

    count = 0

---

# 64. Типова помилка — дублювання derived state

❌

    const [firstName, setFirstName] = useState("Valeriy");
    const [lastName, setLastName] = useState("Svystun");
    const [fullName, setFullName] = useState("Valeriy Svystun");

Тут три значення потрібно підтримувати синхронізованими.

Краще:

    const [firstName, setFirstName] = useState("Valeriy");
    const [lastName, setLastName] = useState("Svystun");

    const fullName = `${firstName} ${lastName}`;

---

# 65. Типова помилка — використовувати state для всього

Не кожне значення повинно бути state.

Наприклад:

    const [price, setPrice] = useState(100);

    const quantity = 3;

`quantity` не обов'язково повинен бути state, якщо він ніколи не змінюється.

State потрібен, коли зміна значення повинна впливати на наступний render.

---

# 66. State update і event handler

Найчастіше setter викликається всередині event handler:

    function handleClick() {
        setCount(prev => prev + 1);
    }

або:

    function handleChange(event) {
        setName(event.target.value);
    }

або:

    function handleToggle() {
        setIsOpen(prev => !prev);
    }

---

# 67. State update і функції

Зручно винести update в окрему функцію:

    function increment() {
        setCount(prev => prev + 1);
    }

    function decrement() {
        setCount(prev => prev - 1);
    }

Потім:

    <button onClick={increment}>
        +
    </button>

    <button onClick={decrement}>
        -
    </button>

---

# 68. Не викликай setter під час render без причини

Не потрібно:

    function Counter() {
        const [count, setCount] = useState(0);

        setCount(count + 1);

        return <p>{count}</p>;
    }

Це може створити нескінченний цикл оновлень.

Замість цього state update повинен відбуватися у відповідній реакції:

    event handler

або, для side effects:

    effect

---

# 69. State updates у правильному mental model

Не думай:

    setState()
        =
    змінити JavaScript-змінну

Думай:

    setState()
        ↓
    запланувати новий state
        ↓
    React виконує render
        ↓
    компонент отримує новий snapshot
        ↓
    UI оновлюється

---

# 70. State snapshot — головний mental model

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        function handleClick() {
            setCount(count + 1);
        }

        return (
            <button onClick={handleClick}>
                {count}
            </button>
        );
    }

Під час render:

    count = 0

Handler цього render працює з:

    count = 0

Після:

    setCount(1)

React створює наступний render:

    count = 1

Новий handler вже працюватиме з:

    count = 1

---

# 71. `setState(value)` vs `setState(updater)`

| Варіант | Коли використовувати |
|---|---|
| `setCount(10)` | коли відоме конкретне нове значення |
| `setCount(count + 1)` | коли простий update базується на поточному snapshot |
| `setCount(prev => prev + 1)` | коли update залежить від попереднього state |
| `setItems(prev => [...prev, item])` | коли додаємо до попереднього array |
| `setUser(prev => ({ ...prev, name }))` | коли змінюємо частину object |

Головне правило:

> Якщо update залежить від попереднього state — updater function є найбільш надійним і зрозумілим варіантом.

---

# 72. State update для primitive values

### Number

    setCount(prev => prev + 1);

### String

    setName("Valeriy");

### Boolean

    setIsOpen(prev => !prev);

---

# 73. State update для reference values

### Object

    setUser(prev => ({
        ...prev,
        name: "Alex",
    }));

### Array

    setItems(prev => [
        ...prev,
        newItem,
    ]);

Для object і array особливо важливо не мутувати існуюче значення.

---

# 74. Загальний алгоритм state update

Коли потрібно змінити state:

### Крок 1

Визнач:

> Чи залежить нове значення від попереднього?

Якщо ні:

    setState(newValue);

Якщо так:

    setState(prev => newValue);

### Крок 2

Якщо state — object або array:

> Чи створюю я новий object/array?

### Крок 3

Не очікуй, що state зміниться всередині поточного render.

### Крок 4

Пам'ятай, що після update React виконає наступний render.

---

# 75. State update і immutable data

React-стиль:

    old state
        ↓
    create new value
        ↓
    setState(new value)
        ↓
    new render

Наприклад:

    const newItems = [
        ...items,
        newItem,
    ];

    setItems(newItems);

Або коротко:

    setItems(prevItems => [
        ...prevItems,
        newItem,
    ]);

---

# 76. State update і посилання

Object і array у JavaScript є reference values.

Наприклад:

    const user = {
        name: "Valeriy",
    };

Якщо зробити:

    const newUser = user;

то:

    newUser === user

дасть:

    true

А spread створює новий object:

    const newUser = {
        ...user,
    };

Тепер:

    newUser === user

дасть:

    false

Це важливо для immutable state updates.

---

# 77. Чому mutation небезпечна

Наприклад:

    const user = {
        name: "Valeriy",
    };

    user.name = "Alex";

Ми змінили старий object.

У React краще:

    setUser(prevUser => ({
        ...prevUser,
        name: "Alex",
    }));

Тепер існують:

    old object
    new object

і React отримує нове значення state.

---

# 78. State updates і компонентне дерево

State належить конкретному екземпляру компонента.

Якщо один компонент використовується двічі:

    <Counter />
    <Counter />

кожен `Counter` має власний state.

Схематично:

    Counter #1
        count = 5

    Counter #2
        count = 10

State не є автоматично спільним між ними.

---

# 79. State не є глобальною змінною

Наприклад:

    function Counter() {
        const [count, setCount] = useState(0);

        // ...
    }

`count` належить конкретному компоненту.

Інший компонент:

    function AnotherCounter() {
        const [count, setCount] = useState(0);

        // ...
    }

має окремий state.

Для спільного state використовуються інші React-підходи:

    lifting state up
    Context
    external state management

Ці теми розглядатимуться далі.

---

# 80. State update і props

Props приходять від батьківського компонента:

    <Counter initialCount={10} />

State належить самому компоненту:

    const [count, setCount] = useState(10);

Важливо розуміти:

    props
        ↓
    input від parent

    state
        ↓
    local data component

Якщо state залежить від props, потрібно уважно визначити, чи дійсно потрібна окрема копія даних у state.

---

# 81. State update — не callback

Не варто думати:

    setCount(newCount, callback);

У функціональному React setter `useState` не працює як класовий `setState` із callback другим аргументом.

Якщо потрібно реагувати на зміну state, використовуються інші механізми React, зокрема Effects.

---

# 82. State update і pure rendering

Component function повинна бути максимально передбачуваною:

    state + props
        ↓
    UI

State update:

    event
        ↓
    setState
        ↓
    new state
        ↓
    render
        ↓
    UI

Не потрібно змінювати state прямо під час render.

---

# 83. Практичний mental model

Уявляй React component як функцію:

    UI = Component(props, state)

Коли state змінюється:

    old state
        ↓
    update
        ↓
    new state
        ↓
    Component(props, new state)
        ↓
    new UI

Це значно корисніша модель, ніж уявлення про React state як звичайну змінну.

---

# 84. Common Mistakes

## ❌ Mutation

    user.name = "Alex";

## ✅ Immutable update

    setUser(prev => ({
        ...prev,
        name: "Alex",
    }));

---

## ❌ Очікування нового state одразу

    setCount(count + 1);
    console.log(count);

## ✅ Розуміння snapshot

    setCount(count + 1);

    // count тут належить поточному render

---

## ❌ Кілька залежних updates через поточний snapshot

    setCount(count + 1);
    setCount(count + 1);
    setCount(count + 1);

## ✅ Updater function

    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);

---

## ❌ Mutation array

    items.push(newItem);

## ✅ Новий array

    setItems(prev => [
        ...prev,
        newItem,
    ]);

---

## ❌ Зберігати derived data в state

    const [firstName, setFirstName] = useState("Valeriy");
    const [lastName, setLastName] = useState("Svystun");
    const [fullName, setFullName] = useState("Valeriy Svystun");

## ✅ Обчислювати

    const fullName = `${firstName} ${lastName}`;

---

# 85. Питання для співбесіди

### 🟢 Junior

**1. Як оновити state в React?**

Через setter, який повертає `useState()`:

    setCount(10);

---

**2. Що відбувається після `setState`?**

React планує оновлення state і виконує новий render компонента, після чого UI може бути оновлений.

---

**3. Чому не можна змінювати state напряму?**

Тому що React повинен отримати нове значення через setter, а mutation існуючого object або array порушує очікувану модель immutable updates.

---

**4. Що таке updater function?**

Функція, яка отримує попередній state і повертає новий:

    setCount(prev => prev + 1);

---

**5. Коли використовувати updater function?**

Коли новий state залежить від попереднього.

---

**6. Чому після `setCount()` `count` не змінюється одразу?**

Тому що поточний render працює зі своїм snapshot state. Нове значення буде доступне під час наступного render.

---

### 🔵 Strong Junior

**7. Чому три `setCount(count + 1)` можуть дати `+1`, а не `+3`?**

Тому що всі три updates можуть використовувати один і той самий `count` із поточного render.

Правильний варіант:

    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);

---

**8. Що таке batching?**

Це механізм, за допомогою якого React може обробляти кілька state updates разом, зменшуючи кількість необхідних renders.

---

**9. Чому потрібно створювати новий object при оновленні state?**

Тому що React працює з immutable state patterns, а mutation існуючого object не створює нового reference.

---

**10. Як додати елемент у state array?**

    setItems(prevItems => [
        ...prevItems,
        newItem,
    ]);

---

### 🟠 Middle

**11. Що таке state snapshot?**

Це значення state, яке доступне конкретному render компонента. Event handler, створений цим render, працює з відповідним snapshot.

---

**12. Чому updater function вирішує проблему залежних updates?**

Тому що React може послідовно передавати результат попереднього update наступному updater:

    0
    ↓
    prev => prev + 1
    ↓
    1
    ↓
    prev => prev + 1
    ↓
    2

---

**13. Чому derived state часто не потрібно зберігати окремо?**

Тому що це створює дублювання даних і можливість розсинхронізації.

---

**14. Чим відрізняються `setCount(count + 1)` і `setCount(prev => prev + 1)`?**

Перший варіант використовує `count` із поточного render.

Другий отримує актуальне попереднє значення як аргумент updater function і тому краще підходить для послідовних залежних updates.

---

**15. Чому mutation state object може створювати проблеми?**

Тому що старе значення змінюється без створення нового object reference, що суперечить immutable-моделі роботи React state.

---

# 86. Mini Cheat Sheet

## useState

    const [state, setState] = useState(initialState);

---

## Просте оновлення

    setState(newValue);

---

## Update від попереднього state

    setState(prev => newValue);

---

## Increment

    setCount(prev => prev + 1);

---

## Decrement

    setCount(prev => prev - 1);

---

## Toggle

    setIsOpen(prev => !prev);

---

## Object

    setUser(prev => ({
        ...prev,
        name: "Alex",
    }));

---

## Array — add

    setItems(prev => [
        ...prev,
        newItem,
    ]);

---

## Array — remove

    setItems(prev =>
        prev.filter(item => item.id !== id)
    );

---

## Array — update

    setItems(prev =>
        prev.map(item =>
            item.id === id
                ? { ...item, completed: true }
                : item
        )
    );

---

## Multiple dependent updates

    setCount(prev => prev + 1);
    setCount(prev => prev + 1);
    setCount(prev => prev + 1);

---

## Derived value

    const total = price * quantity;

Не потрібно:

    const [total, setTotal] = useState(price * quantity);

якщо `total` повністю залежить від інших state.

---

# 87. Рівні знань

## 🟢 Core

Потрібно знати обов'язково:

- `useState`
- setter
- state update
- re-render
- state snapshot
- state не змінюється миттєво
- простий `setState(value)`
- updater function
- `setState(prev => ...)`
- immutable updates
- object state
- array state
- mutation vs immutable update

---

## 🔵 Junior

Потрібно впевнено розуміти:

- чому `setCount(count + 1)` не дає `+3` при трьох викликах
- updater function
- state update queue
- batching
- derived state
- single source of truth
- кілька state variables
- TypeScript state types
- `useState<User | null>`
- lazy initialization

---

## 🟠 Middle

Потрібно добре розуміти:

- state як snapshot
- state identity
- immutable data
- reference equality
- batching
- послідовні state updates
- state/props взаємодію
- структуру state
- мінімальне представлення state
- уникнення дублювання state
- підняття state
- локальний vs shared state

---

## 🔴 Senior

На цьому рівні важливо розуміти:

- як структура state впливає на архітектуру компонента
- як уникати зайвих state dependencies
- коли локальний state стає shared state
- state ownership
- state synchronization
- state machines / reducer-based state
- performance implications state updates
- granular state design
- external state management
- React rendering model

---

# 88. Практичний алгоритм для задач

Коли бачиш задачу:

> "Потрібно змінити значення state"

постав собі питання.

### 1. Який тип state?

    number
    string
    boolean
    object
    array

### 2. Нове значення залежить від попереднього?

Якщо ні:

    setState(newValue);

Якщо так:

    setState(prev => newValue);

### 3. Це object або array?

Якщо так:

    не мутувати

Створити:

    new object
    або
    new array

### 4. Чи є це derived value?

Якщо значення можна отримати з існуючого state:

    const derivedValue = calculate(state);

а не обов'язково:

    useState(derivedValue);

### 5. Чи очікую я новий state всередині поточного handler?

Якщо так — перевір mental model.

Поточний handler працює зі snapshot поточного render.

---

# 89. Mental Model

Найважливіша схема цього розділу:

    state
      ↓
    render
      ↓
    snapshot
      ↓
    user interaction
      ↓
    setState(...)
      ↓
    update scheduled
      ↓
    React processes updates
      ↓
    next render
      ↓
    new snapshot
      ↓
    updated UI

А якщо state update залежить від попереднього:

    previous state
          ↓
    updater function
          ↓
    next state
          ↓
    next render

---

# 90. Головне

> `useState` дає компоненту state і setter для його оновлення.

> `setState()` не змінює state-змінну поточного render.

> Кожен render має свій snapshot state.

> Якщо нове значення залежить від попереднього — використовуй updater function:

    setCount(prev => prev + 1);

> Для object і array не використовуй mutation.

> Створюй новий object або array:

    setUser(prev => ({
        ...prev,
        name: "Alex",
    }));

    setItems(prev => [
        ...prev,
        newItem,
    ]);

> Не зберігай у state те, що можна просто обчислити з іншого state.

> React може об'єднувати кілька updates через batching.

> Головна модель:

    state
      ↓
    render
      ↓
    snapshot
      ↓
    setState
      ↓
    next render
      ↓
    new snapshot

---

# 91. Що вивчати далі

Після розуміння state updates наступний крок:

    04-controlled-components

Перед ним важливо впевнено володіти:

- `useState`
- state snapshot
- setter
- updater function
- batching
- immutable updates
- object state
- array state
- derived state

Далі ці принципи будуть використані для побудови:

    state
      ↓
    input
      ↓
    controlled component
      ↓
    form
      ↓
    validation
      ↓
    real application