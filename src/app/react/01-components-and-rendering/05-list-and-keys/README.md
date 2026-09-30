# 05 — Lists and Keys

## Зміст

1. [Що таке списки в React](#що-таке-списки-в-react)
2. [Рендеринг списку через map()](#рендеринг-списку-через-map)
3. [JSX у map()](#jsx-у-map)
4. [key — навіщо він потрібен](#key--навіщо-він-потрібен)
5. [Правила для key](#правила-для-key)
6. [Унікальний key](#унікальний-key)
7. [Чому index як key — не завжди добре](#чому-index-як-key--не-завжди-добре)
8. [Коли index можна використовувати](#коли-index-можна-використовувати)
9. [key та ідентичність компонента](#key-та-ідентичність-компонента)
10. [Списки компонентів](#списки-компонентів)
11. [Вкладені списки](#вкладені-списки)
12. [Фільтрація та сортування перед рендерингом](#фільтрація-та-сортування-перед-рендерингом)
13. [Умовний рендеринг списку](#умовний-рендеринг-списку)
14. [Порожній список](#порожній-список)
15. [Список об'єктів](#список-обєктів)
16. [key не є звичайним prop](#key-не-є-звичайним-prop)
17. [Типові помилки](#типові-помилки)
18. [Практичний приклад](#практичний-приклад)
19. [Питання на співбесіді](#питання-на-співбесіді)
20. [Що потрібно вміти](#що-потрібно-вміти)
21. [Mini Cheat Sheet](#mini-cheat-sheet)
22. [Головне](#головне)


---

# Що таке списки в React

У React списки використовуються для відображення набору однотипних елементів:

- список користувачів;
- список товарів;
- список повідомлень;
- список статей;
- список завдань;
- список категорій;
- меню;
- рядки таблиці;
- картки;
- результати пошуку.

Наприклад, маємо масив:

    const fruits = ["Apple", "Banana", "Orange"];

Потрібно перетворити кожен елемент масиву на JSX:

    <ul>
      <li>Apple</li>
      <li>Banana</li>
      <li>Orange</li>
    </ul>

У React для цього найчастіше використовується JavaScript-метод `map()`.

Основна модель:

    data → map() → JSX → React render

Наприклад:

    const fruits = ["Apple", "Banana", "Orange"];

    function FruitList() {
      return (
        <ul>
          {fruits.map((fruit) => (
            <li key={fruit}>{fruit}</li>
          ))}
        </ul>
      );
    }


---

# Рендеринг списку через map()

## map()

`map()` проходить по масиву та створює новий масив.

Звичайний JavaScript:

    const numbers = [1, 2, 3];

    const doubled = numbers.map((number) => number * 2);

    console.log(doubled);
    // [2, 4, 6]

У React результатом `map()` може бути масив JSX-елементів:

    const numbers = [1, 2, 3];

    function NumberList() {
      return (
        <ul>
          {numbers.map((number) => (
            <li key={number}>{number}</li>
          ))}
        </ul>
      );
    }

React отримує приблизно таку структуру:

    [
      <li>1</li>,
      <li>2</li>,
      <li>3</li>
    ]

і відображає її як список DOM-елементів.


---

# JSX у map()

Типовий шаблон:

    {array.map((item) => (
      <Element key={item.id}>
        {item.name}
      </Element>
    ))}

Наприклад:

    const users = [
      { id: 1, name: "Anna" },
      { id: 2, name: "John" },
      { id: 3, name: "Peter" },
    ];

    function UserList() {
      return (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      );
    }

Тут відбувається:

    users
      ↓
    map()
      ↓
    user
      ↓
    <li key={user.id}>
      ↓
    JSX
      ↓
    React


---

# key — навіщо він потрібен

`key` — спеціальний атрибут React, який допомагає React визначати, **який елемент списку є яким**.

Наприклад:

    const users = [
      { id: 101, name: "Anna" },
      { id: 102, name: "John" },
      { id: 103, name: "Peter" },
    ];

    function UserList() {
      return (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      );
    }

`key` дає React стабільну ідентичність елемента.

Умовно:

    Anna  → key="101"
    John  → key="102"
    Peter → key="103"

Якщо порядок або склад списку зміниться, React може зрозуміти:

- який елемент залишився;
- який був видалений;
- який додався;
- який перемістився;
- який змінився.


---

# Чому React потрібен key

Уявімо список:

    A
    B
    C

Потім на початок додається:

    X
    A
    B
    C

Якщо React не має стабільної ідентичності елементів, йому складніше визначити, що саме змінилося.

З `key`:

    X → key="x"
    A → key="a"
    B → key="b"
    C → key="c"

React може побачити:

    + X
    A — той самий
    B — той самий
    C — той самий

Тому `key` — це не просто спосіб прибрати warning.

Він бере участь у визначенні **ідентичності елемента під час reconciliation**.


---

# Правила для key

Основні вимоги до `key`:

1. `key` повинен бути унікальним серед сусідніх елементів списку.
2. `key` повинен бути стабільним.
3. `key` повинен відповідати ідентичності елемента.
4. Не потрібно генерувати новий випадковий `key` під час кожного render.
5. `key` не повинен залежати від позиції елемента, якщо порядок може змінюватися.


---

# Унікальний key

Найкращий варіант — використовувати стабільний `id` з даних.

Наприклад:

    const products = [
      { id: "p101", name: "Laptop" },
      { id: "p102", name: "Phone" },
      { id: "p103", name: "Tablet" },
    ];

    function ProductList() {
      return (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              {product.name}
            </li>
          ))}
        </ul>
      );
    }

`id`:

    p101
    p102
    p103

є стабільним і пов'язаний саме з конкретним продуктом.

Це хороший `key`.


---

# key повинен бути унікальним серед сусідніх елементів

Не обов'язково, щоб `key` був глобально унікальним у всьому застосунку.

Наприклад:

    function App() {
      return (
        <>
          <UserList />
          <ProductList />
        </>
      );
    }

У `UserList` можуть бути:

    key="1"
    key="2"
    key="3"

і в `ProductList` теж:

    key="1"
    key="2"
    key="3"

Це нормально, тому що це різні списки.

Важлива унікальність **у межах одного набору sibling-елементів**.


---

# Чому index як key — не завжди добре

Можна написати:

    {users.map((user, index) => (
      <li key={index}>
        {user.name}
      </li>
    ))}

Це працює.

Але `index` описує **позицію**, а не самого користувача.

Наприклад:

    index 0 → Anna
    index 1 → John
    index 2 → Peter

Якщо додати нового користувача на початок:

    index 0 → Mike
    index 1 → Anna
    index 2 → John
    index 3 → Peter

Тепер той самий `index` відповідає іншому елементу.

Було:

    0 → Anna
    1 → John
    2 → Peter

Стало:

    0 → Mike
    1 → Anna
    2 → John
    3 → Peter

Тому React може сприймати:

    Anna → John
    John → Peter

як зміну існуючих елементів, а не просто переміщення.

Особливо це важливо, якщо елементи мають власний стан.


---

# Коли index можна використовувати

`index` не є абсолютно забороненим.

Його можна використовувати, якщо список:

- статичний;
- ніколи не сортується;
- ніколи не фільтрується;
- елементи не додаються;
- елементи не видаляються;
- порядок ніколи не змінюється;
- елементи не мають власного стану, чутливого до позиції.

Наприклад:

    const colors = ["red", "green", "blue"];

    function ColorList() {
      return (
        <ul>
          {colors.map((color, index) => (
            <li key={index}>
              {color}
            </li>
          ))}
        </ul>
      );
    }

Для простого статичного списку це може бути прийнятним.

Але якщо є реальний `id`, краще використовувати його:

    key={color.id}

а не:

    key={index}


---

# Поганий варіант: випадковий key

Не слід робити:

    key={Math.random()}

або:

    key={crypto.randomUUID()}

безпосередньо під час render.

Наприклад:

    {users.map((user) => (
      <User key={Math.random()} user={user} />
    ))}

Під час кожного render створюється новий `key`.

Було:

    Anna → abc123

Після наступного render:

    Anna → xyz789

React бачить інший `key` і може сприймати компонент як новий.

Це може призводити до:

- непотрібного перемонтування;
- втрати локального state;
- зайвої роботи;
- несподіваної поведінки.


---

# key та ідентичність компонента

`key` впливає не тільки на DOM-елементи.

Він також впливає на **ідентичність React-компонента**.

Наприклад:

    function UserCard({ user }) {
      const [count, setCount] = useState(0);

      return (
        <div>
          <h2>{user.name}</h2>
          <p>{count}</p>

          <button onClick={() => setCount(count + 1)}>
            Increment
          </button>
        </div>
      );
    }

Якщо компонент має:

    key={user.id}

React може зберігати його state за ідентичністю цього елемента.


---

# key може примусово змінити компонент

Це важлива особливість.

Наприклад:

    <UserForm key={user.id} user={user} />

Якщо:

    user.id = 1

потім:

    user.id = 2

для React це інший `key`.

Отже:

    UserForm(key=1)

і

    UserForm(key=2)

є різними екземплярами компонента.

React може:

    старий компонент → unmount
    новий компонент → mount

Цей механізм іноді свідомо використовується для скидання локального state.


---

# Списки компонентів

У реальних React-застосунках список часто складається не з HTML-елементів, а з компонентів.

Наприклад:

    const users = [
      { id: 1, name: "Anna", age: 25 },
      { id: 2, name: "John", age: 31 },
      { id: 3, name: "Peter", age: 28 },
    ];

    function UserList() {
      return (
        <div>
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
            />
          ))}
        </div>
      );
    }

Компонент:

    function UserCard({ user }) {
      return (
        <article>
          <h2>{user.name}</h2>
          <p>Age: {user.age}</p>
        </article>
      );
    }

Тут важливий момент:

    key={user.id}

потрібно вказувати там, де елементи списку створюються через `map()`.

Не обов'язково всередині `UserCard`.


---

# key належить списку, а не компоненту

Наприклад:

    function UserList() {
      return (
        <>
          {users.map((user) => (
            <UserCard
              key={user.id}
              user={user}
            />
          ))}
        </>
      );
    }

Це правильно.

А ось так:

    function UserCard({ user }) {
      return (
        <div key={user.id}>
          {user.name}
        </div>
      );
    }

не вирішує проблему `key` для зовнішнього списку.

`key` повинен бути заданий безпосередньо елементу, який повертає `map()`.


---

# key не є звичайним prop

Це дуже важливо.

Наприклад:

    <UserCard
      key={user.id}
      user={user}
    />

У компоненті:

    function UserCard(props) {
      console.log(props.key);
    }

`props.key` не буде доступний як звичайний prop.

`key` — спеціальна інформація для React.

Якщо компоненту потрібно знати `id`, передай його окремо:

    <UserCard
      key={user.id}
      userId={user.id}
      user={user}
    />

Тоді:

    function UserCard({ userId, user }) {
      console.log(userId);
    }

Отже:

    key={user.id}

і

    userId={user.id}

мають різне призначення.


---

# Вкладені списки

Список може містити інший список.

Наприклад:

    const categories = [
      {
        id: 1,
        name: "Frontend",
        technologies: [
          { id: 101, name: "HTML" },
          { id: 102, name: "CSS" },
          { id: 103, name: "React" },
        ],
      },
      {
        id: 2,
        name: "Backend",
        technologies: [
          { id: 201, name: "Node.js" },
          { id: 202, name: "PostgreSQL" },
        ],
      },
    ];

Рендеринг:

    function CategoryList() {
      return (
        <div>
          {categories.map((category) => (
            <section key={category.id}>
              <h2>{category.name}</h2>

              <ul>
                {category.technologies.map((technology) => (
                  <li key={technology.id}>
                    {technology.name}
                  </li>
                ))}
              </ul>
            </section>
          ))}
        </div>
      );
    }

Кожен рівень списку має власні `key`.

Зовнішній:

    key={category.id}

Внутрішній:

    key={technology.id}


---

# Фільтрація та сортування перед рендерингом

Часто потрібно не просто відобразити весь масив.

Наприклад:

    const users = [
      { id: 1, name: "Anna", active: true },
      { id: 2, name: "John", active: false },
      { id: 3, name: "Peter", active: true },
    ];

Потрібно показати тільки активних користувачів.

Можна:

    {users
      .filter((user) => user.active)
      .map((user) => (
        <UserCard
          key={user.id}
          user={user}
        />
      ))}

Логіка:

    users
      ↓
    filter()
      ↓
    map()
      ↓
    JSX

Це дуже поширений React-патерн.


---

# Краще підготувати дані окремо

Якщо логіка стає складнішою, її можна винести перед `return`.

    function UserList({ users }) {
      const activeUsers = users.filter(
        (user) => user.active
      );

      return (
        <div>
          {activeUsers.map((user) => (
            <UserCard
              key={user.id}
              user={user}
            />
          ))}
        </div>
      );
    }

Так JSX стає простішим.


---

# Сортування

Наприклад, сортуємо користувачів за ім'ям.

Не варто безпосередньо змінювати вихідний масив через `sort()`:

    users.sort(...)

Краще створити копію:

    const sortedUsers = [...users].sort(
      (a, b) => a.name.localeCompare(b.name)
    );

Потім:

    {sortedUsers.map((user) => (
      <UserCard
        key={user.id}
        user={user}
      />
    ))}

Загальний принцип:

    data
      ↓
    filter / sort / transform
      ↓
    map
      ↓
    JSX


---

# Умовний рендеринг списку

Можна комбінувати списки з умовним рендерингом.

Наприклад:

    {users.length > 0 && (
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    )}

Або:

    {users.length > 0 ? (
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.name}
          </li>
        ))}
      </ul>
    ) : (
      <p>No users found.</p>
    )}


---

# Порожній список

Поширений UI-патерн:

    function UserList({ users }) {
      if (users.length === 0) {
        return <p>No users found.</p>;
      }

      return (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name}
            </li>
          ))}
        </ul>
      );
    }

Це часто читабельніше, ніж складний JSX з великою кількістю умов.


---

# Важлива помилка з &&

Обережно з:

    {items.length && (
      <List items={items} />
    )}

Якщо:

    items.length === 0

результат:

    0

React може відобразити `0`.

Краще:

    {items.length > 0 && (
      <List items={items} />
    )}

Або:

    {items.length ? (
      <List items={items} />
    ) : (
      <p>No items.</p>
    )}


---

# Список об'єктів

У реальних застосунках дані зазвичай мають вигляд масиву об'єктів.

Наприклад:

    const products = [
      {
        id: 1,
        title: "Laptop",
        price: 1200,
      },
      {
        id: 2,
        title: "Phone",
        price: 800,
      },
      {
        id: 3,
        title: "Tablet",
        price: 500,
      },
    ];

Рендеринг:

    function ProductList() {
      return (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h2>{product.title}</h2>
              <p>${product.price}</p>
            </li>
          ))}
        </ul>
      );
    }


---

# TypeScript і списки

У TypeScript можна описати тип елемента.

    type User = {
      id: number;
      name: string;
      age: number;
    };

    type UserListProps = {
      users: User[];
    };

    function UserList({ users }: UserListProps) {
      return (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.name} — {user.age}
            </li>
          ))}
        </ul>
      );
    }

Це типовий підхід для `.tsx`.


---

# Практичний приклад

Уявімо простий список завдань.

Дані:

    type Todo = {
      id: number;
      title: string;
      completed: boolean;
    };

    const todos: Todo[] = [
      {
        id: 1,
        title: "Learn React",
        completed: true,
      },
      {
        id: 2,
        title: "Practice lists",
        completed: false,
      },
      {
        id: 3,
        title: "Learn hooks",
        completed: false,
      },
    ];

Компонент:

    function TodoList() {
      return (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>
              <span>
                {todo.title}
              </span>

              {todo.completed && (
                <span> — Done</span>
              )}
            </li>
          ))}
        </ul>
      );
    }

Тут одночасно використовуються:

- масив;
- `map()`;
- `key`;
- об'єкти;
- властивості об'єкта;
- умовний рендеринг.


---

# Винесення елемента списку в компонент

Якщо елемент складний, його краще винести.

    type TodoItemProps = {
      todo: Todo;
    };

    function TodoItem({ todo }: TodoItemProps) {
      return (
        <li>
          <strong>{todo.title}</strong>

          {todo.completed && (
            <span> — Done</span>
          )}
        </li>
      );
    }

Список:

    function TodoList() {
      return (
        <ul>
          {todos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          ))}
        </ul>
      );
    }

Це вже типовий компонентний підхід React.


---

# List rendering і дані з API

У реальному застосунку масив часто приходить з backend:

    API
      ↓
    fetch()
      ↓
    JSON
      ↓
    state
      ↓
    map()
      ↓
    components

Наприклад:

    const [users, setUsers] = useState<User[]>([]);

Після отримання даних:

    setUsers(data);

Потім:

    {users.map((user) => (
      <UserCard
        key={user.id}
        user={user}
      />
    ))}

Таким чином `map()` є одним з основних механізмів перетворення даних backend у UI.


---

# Типові помилки

## 1. Відсутній key

Погано:

    {users.map((user) => (
      <li>{user.name}</li>
    ))}

React повідомить про відсутність `key`.

Правильно:

    {users.map((user) => (
      <li key={user.id}>
        {user.name}
      </li>
    ))}


---

## 2. key неунікальний

Погано:

    const users = [
      { id: 1, name: "Anna" },
      { id: 1, name: "John" },
    ];

    {users.map((user) => (
      <UserCard
        key={user.id}
        user={user}
      />
    ))}

Тут два елементи мають:

    key="1"

`key` повинен бути унікальним серед сусідів.


---

## 3. Використання index без потреби

    {users.map((user, index) => (
      <UserCard
        key={index}
        user={user}
      />
    ))}

Якщо користувачі можуть:

- додаватися;
- видалятися;
- сортуватися;
- фільтруватися;
- переміщатися;

краще використовувати:

    key={user.id}


---

## 4. Генерація випадкового key

Погано:

    key={Math.random()}

Це руйнує стабільність ідентичності елементів.


---

## 5. Використання key всередині компонента

Погано:

    function UserCard({ user }) {
      return (
        <div key={user.id}>
          {user.name}
        </div>
      );
    }

Якщо `UserCard` створюється через `map()`, `key` потрібно передати на самому місці створення:

    {users.map((user) => (
      <UserCard
        key={user.id}
        user={user}
      />
    ))}


---

## 6. Очікування key у props

Погано:

    function UserCard(props) {
      console.log(props.key);
    }

`key` не є звичайним prop.

Якщо потрібен id:

    <UserCard
      key={user.id}
      userId={user.id}
    />

---

## 7. Mutating array перед render

Обережно:

    users.sort(...)

`sort()` змінює вихідний масив.

Краще:

    const sortedUsers = [...users].sort(...);


---

# List та Fragment

Іноді один елемент списку повинен повертати кілька сусідніх елементів.

Наприклад:

    {users.map((user) => (
      <React.Fragment key={user.id}>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </React.Fragment>
    ))}

Скорочений Fragment:

    {users.map((user) => (
      <>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </>
    ))}

Але тут є проблема:

скорочений синтаксис `<>...</>` не дозволяє написати `key`.

Тому для списків, де Fragment є кореневим елементом, потрібно використовувати:

    <React.Fragment key={user.id}>
      ...
    </React.Fragment>

або імпортований `Fragment`.


---

# List і CSS Modules

У твоєму Next.js-проєкті з CSS Modules це може виглядати так:

    import styles from "./UserList.module.css";

    function UserList({ users }: UserListProps) {
      return (
        <ul className={styles.list}>
          {users.map((user) => (
            <li
              key={user.id}
              className={styles.item}
            >
              {user.name}
            </li>
          ))}
        </ul>
      );
    }

Тут:

    className={styles.list}

відповідає стилізації,

а:

    key={user.id}

відповідає ідентичності елемента для React.

Це дві абсолютно різні задачі.


---

# Практична модель мислення

Коли бачиш масив даних, думай:

    Які дані?
        ↓
    Який елемент UI відповідає одному item?
        ↓
    Який стабільний id має item?
        ↓
    map()
        ↓
    JSX
        ↓
    key={item.id}

Наприклад:

    const courses = [
      {
        id: 1,
        title: "HTML",
      },
      {
        id: 2,
        title: "CSS",
      },
      {
        id: 3,
        title: "React",
      },
    ];

Мислення:

    courses
      ↓
    один course
      ↓
    <CourseCard />
      ↓
    key={course.id}


---

# Interview Questions

## 1. Для чого потрібен map() у React?

`map()` використовується для перетворення елементів масиву на JSX-елементи або React-компоненти.

Наприклад:

    {users.map((user) => (
      <UserCard
        key={user.id}
        user={user}
      />
    ))}


---

## 2. Що таке key?

`key` — спеціальний атрибут React, який дозволяє React визначати ідентичність елементів списку між render'ами.


---

## 3. Чому key повинен бути стабільним?

Тому що React використовує `key` для визначення, чи є елемент тим самим елементом, чи це новий елемент.

Якщо `key` змінюється без зміни самої сутності елемента, React може створити новий компонент замість оновлення існуючого.


---

## 4. Чому не рекомендується index як key?

Тому що index описує позицію, а не сутність елемента.

При зміні порядку списку той самий index може відповідати вже іншому елементу.


---

## 5. Чи можна використовувати index як key?

Так, якщо список стабільний і його порядок не змінюється.

Але якщо існує стабільний `id`, зазвичай краще використовувати його.


---

## 6. Чи повинен key бути глобально унікальним?

Ні.

Він повинен бути унікальним серед сусідніх елементів одного списку.


---

## 7. Чи є key звичайним prop?

Ні.

`key` — спеціальний механізм React і не передається компоненту через `props`.

Якщо потрібне значення, його потрібно передати окремим prop.


---

## 8. Де потрібно ставити key?

На елементі, який безпосередньо повертається з `map()`.

Наприклад:

    {users.map((user) => (
      <UserCard
        key={user.id}
        user={user}
      />
    ))}


---

## 9. Що станеться, якщо key однаковий?

React не отримує однозначної ідентичності елементів.

Це може призвести до неправильного reconciliation і попереджень у development.


---

## 10. Чому key={Math.random()} — погана ідея?

Тому що значення змінюється при кожному render.

React бачить новий `key` і може сприймати елемент як новий компонент.


---

## 11. Чи можна використовувати key для скидання state?

Так.

Зміна `key` може змусити React розглядати компонент як новий екземпляр:

    <Form key={user.id} />

При зміні `user.id` компонент може бути перемонтований і його локальний state буде створений заново.


---

# Практичні вправи

## Вправа 1 — простий список

Створи:

    const languages = [
      "JavaScript",
      "TypeScript",
      "Python",
      "Kotlin",
    ];

Відобрази список через `map()`.


---

## Вправа 2 — список об'єктів

Створи:

    type Student = {
      id: number;
      name: string;
      age: number;
    };

Відобрази студентів через окремий компонент `StudentCard`.


---

## Вправа 3 — key

Зроби список:

    const products = [
      { id: 1, name: "Laptop" },
      { id: 2, name: "Phone" },
      { id: 3, name: "Tablet" },
    ];

Використай:

    key={product.id}


---

## Вправа 4 — фільтрація

Показуй тільки товари, ціна яких більша за 500.

Модель:

    products
      ↓
    filter()
      ↓
    map()
      ↓
    JSX


---

## Вправа 5 — порожній список

Зроби:

    if (products.length === 0) {
      return <p>No products.</p>;
    }

Після цього відображай список.


---

## Вправа 6 — вкладені списки

Створи категорії:

    Frontend
      HTML
      CSS
      React

    Backend
      Node.js
      Express
      PostgreSQL

Відобрази обидва рівні через `map()`.


---

## Вправа 7 — Todo List

Створи:

    type Todo = {
      id: number;
      title: string;
      completed: boolean;
    };

Зроби компонент:

    TodoList

і:

    TodoItem

Використовуй:

    key={todo.id}


---

# Що потрібно вміти

## Core

Потрібно знати:

- `map()`;
- JSX у `map()`;
- `key`;
- масиви об'єктів;
- `key={item.id}`;
- умовний рендеринг списку;
- порожній список.


## Junior

Потрібно вміти:

- створювати компоненти списку;
- створювати компоненти елемента списку;
- використовувати TypeScript;
- фільтрувати перед `map()`;
- сортувати дані;
- працювати з API-даними;
- пояснити проблему `index` як `key`.


## Middle

Потрібно розуміти:

- reconciliation;
- identity компонентів;
- стабільність `key`;
- вплив `key` на mount/unmount;
- state preservation;
- вкладені списки;
- складні трансформації даних;
- правильну структуру компонентів для великих списків.


## Senior

Потрібно розуміти:

- reconciliation algorithm;
- identity model React;
- ефект зміни `key`;
- state preservation;
- продуктивність великих списків;
- virtualization;
- стабільність даних;
- архітектуру компонентів списків;
- оптимізацію rendering.


---

# Mini Cheat Sheet

## Простий список

    {items.map((item) => (
      <li key={item.id}>
        {item.name}
      </li>
    ))}


## Список компонентів

    {users.map((user) => (
      <UserCard
        key={user.id}
        user={user}
      />
    ))}


## Фільтрація

    {users
      .filter((user) => user.active)
      .map((user) => (
        <UserCard
          key={user.id}
          user={user}
        />
      ))}


## Сортування

    const sortedUsers = [...users].sort(
      (a, b) => a.name.localeCompare(b.name)
    );


## Порожній список

    {items.length > 0 ? (
      <List items={items} />
    ) : (
      <p>No items.</p>
    )}


## Не робити

    key={Math.random()}

    key={crypto.randomUUID()}

    key={index}

якщо список може змінювати порядок.


## key ≠ prop

    <UserCard
      key={user.id}
      userId={user.id}
    />

`key` використовується React.

`userId` доступний компоненту.


---

# Головне

Списки в React — це насамперед поєднання **масивів JavaScript і JSX**.

Базова конструкція:

    array.map((item) => (
      <Component key={item.id}>
        ...
      </Component>
    ))

Найважливіше:

1. Для рендерингу списків найчастіше використовується `map()`.
2. Кожен елемент списку повинен мати стабільний `key`.
3. Найкращий `key` — стабільний ідентифікатор самого елемента.
4. `index` як `key` допустимий лише для стабільних списків, де порядок не змінюється.
5. Не використовуй `Math.random()` як `key`.
6. `key` не є звичайним prop.
7. `key` потрібно ставити на елемент, який безпосередньо створюється через `map()`.
8. `key` допомагає React визначати ідентичність елементів між render'ами.
9. `key` впливає не тільки на DOM, а й на збереження state компонентів.
10. Типовий потік даних у React:

        API / state
            ↓
        array
            ↓
        filter / sort
            ↓
        map()
            ↓
        JSX
            ↓
        React UI

Головна формула:

    DATA → MAP → JSX → KEY → UI

Для реального React-коду найчастіше потрібно мислити саме так:

    "У мене є масив даних.
     Кожен item перетворюється на компонент.
     Кожен item має стабільний id.
     id використовується як key."