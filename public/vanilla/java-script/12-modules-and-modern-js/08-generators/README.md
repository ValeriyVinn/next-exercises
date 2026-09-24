# 08. Generators

Генератори (`generators`) — спеціальний механізм JavaScript, який дозволяє створювати функції, виконання яких можна **призупиняти та продовжувати пізніше**.

Генератори тісно пов'язані з ітераторами:

    Generator Function
          ↓
       generator
          ↓
        next()
          ↓
    { value, done }

Головні ключові слова:

    function*
    yield

Наприклад:

    function* numbers() {
      yield 10;
      yield 20;
      yield 30;
    }

    const generator = numbers();

    console.log(generator.next());
    console.log(generator.next());
    console.log(generator.next());
    console.log(generator.next());

Результат:

    { value: 10, done: false }
    { value: 20, done: false }
    { value: 30, done: false }
    { value: undefined, done: true }

Генератори є одним із найважливіших прикладів використання iterator protocol.

---

# Ключові поняття

| Поняття | Що означає |
|---|---|
| `function*` | оголошення generator function |
| `yield` | призупиняє виконання та повертає значення |
| generator | об'єкт, створений generator function |
| `next()` | продовжує виконання generator |
| `value` | значення поточного `yield` |
| `done` | показує, чи завершений generator |
| `return` | завершує generator та повертає фінальне значення |
| `for...of` | автоматично перебирає generator |
| `Symbol.iterator` | generator реалізує iterable protocol |
| lazy evaluation | значення створюються лише при потребі |
| `yield*` | делегує виконання іншому iterable/generator |
| `next(value)` | передає значення всередину generator |
| `throw()` | передає помилку всередину generator |
| `return()` | достроково завершує generator |

---

# 1. Generator Function

Generator function створюється за допомогою:

    function*

Наприклад:

    function* numbers() {
      yield 10;
      yield 20;
      yield 30;
    }

Це **не звичайна функція**.

Виклик:

    numbers();

не повертає:

    10

Він повертає generator object.

    const generator = numbers();

---

# 2. Generator Object

    function* numbers() {
      yield 10;
      yield 20;
    }

    const generator = numbers();

`generator` має метод:

    next()

Тому:

    console.log(generator.next());

повертає:

    { value: 10, done: false }

---

# 3. `yield`

`yield`:

- повертає значення;
- призупиняє виконання generator;
- дозволяє продовжити виконання пізніше.

Наприклад:

    function* numbers() {
      yield 10;
      yield 20;
      yield 30;
    }

Перший:

    generator.next();

доходить до:

    yield 10;

Другий:

    generator.next();

продовжує виконання з місця після:

    yield 10;

і доходить до:

    yield 20;

---

# 4. Generator виконується не одразу

Розглянемо:

    function* test() {
      console.log("Start");

      yield 10;

      console.log("Middle");

      yield 20;

      console.log("End");
    }

Створення:

    const generator = test();

нічого з `console.log()` ще не виконає.

Тільки:

    generator.next();

виведе:

    Start

і поверне:

    { value: 10, done: false }

Наступний:

    generator.next();

виведе:

    Middle

і поверне:

    { value: 20, done: false }

---

# 5. Generator як paused function

Звичайна функція:

    function test() {
      console.log("A");
      console.log("B");
      console.log("C");
    }

виконується послідовно:

    A
    B
    C

Generator:

    function* test() {
      console.log("A");

      yield;

      console.log("B");

      yield;

      console.log("C");
    }

може зупинитися:

    A

потім продовжитися:

    B

і потім:

    C

---

# 6. `next()`

Кожен виклик:

    generator.next()

продовжує виконання до наступного:

    yield

або:

    return

або кінця функції.

Наприклад:

    function* numbers() {
      yield 1;
      yield 2;
      yield 3;
    }

    const generator = numbers();

    generator.next();
    generator.next();
    generator.next();
    generator.next();

---

# 7. `value`

`yield` визначає:

    value

Наприклад:

    function* numbers() {
      yield 100;
    }

    const generator = numbers();

    console.log(generator.next());

Результат:

    {
      value: 100,
      done: false
    }

---

# 8. `done`

Після завершення generator:

    done: true

Наприклад:

    function* numbers() {
      yield 10;
    }

    const generator = numbers();

    console.log(generator.next());
    console.log(generator.next());

Результат:

    { value: 10, done: false }

    { value: undefined, done: true }

---

# 9. Generator як Iterator

Generator object є iterator.

    function* numbers() {
      yield 10;
      yield 20;
    }

    const generator = numbers();

У нього є:

    generator.next()

Отже generator відповідає iterator protocol.

---

# 10. Generator як Iterable

Generator також є iterable.

    function* numbers() {
      yield 10;
      yield 20;
      yield 30;
    }

Тому можна:

    for (const number of numbers()) {
      console.log(number);
    }

Результат:

    10
    20
    30

---

# 11. Generator + `for...of`

`for...of` автоматично викликає:

    next()

і працює з:

    value
    done

Тому:

    function* numbers() {
      yield 10;
      yield 20;
      yield 30;
    }

    for (const number of numbers()) {
      console.log(number);
    }

не потребує ручного:

    generator.next();

---

# 12. Generator і Iterator

У попередній темі власний iterator виглядав приблизно так:

    const range = {
      [Symbol.iterator]() {
        let current = 1;

        return {
          next() {
            if (current <= 5) {
              return {
                value: current++,
                done: false,
              };
            }

            return {
              value: undefined,
              done: true,
            };
          },
        };
      },
    };

Generator дозволяє написати майже ту саму логіку набагато простіше.

---

# 13. Generator замість ручного Iterator

    function* range(start, end) {
      for (let current = start; current <= end; current++) {
        yield current;
      }
    }

Використання:

    for (const number of range(1, 5)) {
      console.log(number);
    }

Результат:

    1
    2
    3
    4
    5

Generator приховує більшу частину iterator machinery.

---

# 14. Generator і Lazy Evaluation

Generator не створює всі значення одразу.

Наприклад:

    function* numbers() {
      console.log("Create 1");
      yield 1;

      console.log("Create 2");
      yield 2;

      console.log("Create 3");
      yield 3;
    }

До:

    generator.next();

значення не створюються.

При першому `next()` виконується тільки необхідна частина.

Це називається:

    lazy evaluation

---

# 15. Lazy Infinite Sequence

Generator особливо зручний для нескінченних послідовностей.

    function* counter() {
      let current = 1;

      while (true) {
        yield current++;
      }
    }

Можна отримувати значення поступово:

    const generator = counter();

    console.log(generator.next().value);
    console.log(generator.next().value);
    console.log(generator.next().value);

Результат:

    1
    2
    3

Generator не намагається створити нескінченний масив у пам'яті.

---

# 16. Infinite Generator + `break`

Оскільки generator може бути нескінченним, його потрібно використовувати контрольовано.

    function* counter() {
      let current = 1;

      while (true) {
        yield current++;
      }
    }

    for (const number of counter()) {
      console.log(number);

      if (number === 5) {
        break;
      }
    }

Результат:

    1
    2
    3
    4
    5

---

# 17. `return` у Generator

Generator може мати `return`.

    function* test() {
      yield 10;
      return 100;
      yield 20;
    }

Після:

    yield 10

виконується:

    return 100

Тому наступний результат:

    {
      value: 100,
      done: true
    }

`yield 20` вже не виконається.

---

# 18. `yield` vs `return`

Важлива різниця:

    yield

передає проміжне значення та дозволяє продовжити generator.

    return

завершує generator.

Наприклад:

    function* test() {
      yield 10;
      yield 20;
      return 30;
    }

Результати:

    { value: 10, done: false }

    { value: 20, done: false }

    { value: 30, done: true }

---

# 19. `for...of` і `return`

Цікавий момент:

    function* test() {
      yield 10;
      yield 20;
      return 30;
    }

    for (const value of test()) {
      console.log(value);
    }

Виведе:

    10
    20

А:

    30

не буде виведено.

Причина:

`for...of` перебирає значення, поки:

    done === false

Значення з фінального `return` не є звичайним iterable output.

---

# 20. Отримання `return` вручну

Якщо потрібно побачити фінальне значення:

    function* test() {
      yield 10;
      return 30;
    }

    const generator = test();

    console.log(generator.next());
    console.log(generator.next());

Результат:

    { value: 10, done: false }

    { value: 30, done: true }

---

# 21. `yield` як Expression

`yield` може отримувати значення.

Наприклад:

    function* test() {
      const value = yield 10;

      console.log(value);
    }

Тут:

    yield 10

не тільки повертає `10`.

Він також може отримати значення при наступному:

    next(value)

---

# 22. `next(value)`

Generator підтримує передачу значення через:

    next(value)

Наприклад:

    function* test() {
      const value = yield 10;

      console.log(value);
    }

    const generator = test();

    console.log(generator.next());

    generator.next(100);

Перший `next()` запускає generator до:

    yield 10

Другий:

    next(100)

передає:

    100

у результат виразу:

    yield 10

Отже:

    value === 100

---

# 23. Дуже важливе правило `next(value)`

Значення, передане в:

    next(value)

потрапляє в попередній:

    yield

Наприклад:

    function* test() {
      const first = yield "A";
      const second = yield "B";

      console.log(first);
      console.log(second);
    }

    const generator = test();

    generator.next();
    generator.next(10);
    generator.next(20);

Тут:

    first === 10
    second === 20

---

# 24. Перший `next(value)`

Особливий момент.

Перший:

    generator.next(value)

не передає `value` у попередній `yield`, тому що generator ще не був запущений і попереднього `yield` немає.

Наприклад:

    function* test() {
      const value = yield 10;

      console.log(value);
    }

    const generator = test();

    generator.next(100);

У цьому випадку `100` не потрапляє в:

    value

Потрібно спочатку:

    generator.next();

а потім:

    generator.next(100);

---

# 25. Generator як двосторонній канал

Generator можна розглядати як механізм:

    generator
       ↕
    values

Назовні:

    yield value

Всередину:

    next(value)

Тому generator може не тільки видавати значення, а й отримувати значення назад.

---

# 26. Generator + Input

Наприклад:

    function* calculator() {
      const a = yield "Enter first number";
      const b = yield "Enter second number";

      return a + b;
    }

Використання:

    const generator = calculator();

    console.log(generator.next());

Результат:

    { value: "Enter first number", done: false }

Потім:

    console.log(generator.next(10));

Результат:

    { value: "Enter second number", done: false }

Потім:

    console.log(generator.next(20));

Результат:

    { value: 30, done: true }

---

# 27. `yield*`

`yield*` дозволяє передати виконання іншому iterable.

Наприклад:

    function* first() {
      yield 1;
      yield 2;
    }

    function* second() {
      yield* first();

      yield 3;
      yield 4;
    }

Тепер:

    console.log([...second()]);

Результат:

    [1, 2, 3, 4]

---

# 28. `yield*` з Array

`yield*` працює не тільки з generator.

    function* numbers() {
      yield* [10, 20, 30];
    }

Тепер:

    console.log([...numbers()]);

Результат:

    [10, 20, 30]

---

# 29. `yield*` з String

Оскільки string є iterable:

    function* letters() {
      yield* "ABC";
    }

Результат:

    console.log([...letters()]);

    ["A", "B", "C"]

---

# 30. `yield*` з Set

    function* numbers() {
      yield* new Set([10, 20, 30]);
    }

Тепер:

    console.log([...numbers()]);

Результат:

    [10, 20, 30]

---

# 31. Delegation

`yield*` називається delegation.

Наприклад:

    function* numbers() {
      yield* [1, 2, 3];

      yield* [4, 5, 6];
    }

Це можна прочитати як:

    "передай yield-значення іншому iterable"

---

# 32. Вкладені Generators

    function* frontend() {
      yield "HTML";
      yield "CSS";
      yield "JavaScript";
    }

    function* fullstack() {
      yield* frontend();

      yield "Node.js";
      yield "PostgreSQL";
    }

Використання:

    for (const technology of fullstack()) {
      console.log(technology);
    }

Результат:

    HTML
    CSS
    JavaScript
    Node.js
    PostgreSQL

---

# 33. `yield*` та return value

`yield*` може отримати фінальне значення делегованого generator.

Наприклад:

    function* inner() {
      yield 10;
      return 100;
    }

    function* outer() {
      const result = yield* inner();

      console.log(result);

      yield 20;
    }

Тут:

    result === 100

Фінальне значення `inner()` передається в `outer()`.

---

# 34. `generator.return()`

Generator має метод:

    return()

Він дозволяє достроково завершити generator.

    function* numbers() {
      yield 1;
      yield 2;
      yield 3;
    }

    const generator = numbers();

    console.log(generator.next());

    console.log(generator.return("Finished"));

Результат:

    { value: 1, done: false }

    { value: "Finished", done: true }

---

# 35. `generator.return()` з `finally`

Generator може виконувати cleanup через `finally`.

    function* test() {
      try {
        yield 10;
        yield 20;
      } finally {
        console.log("Cleanup");
      }
    }

    const generator = test();

    generator.next();

    generator.return();

При завершенні виконається:

    Cleanup

---

# 36. `generator.throw()`

Generator має метод:

    throw()

який дозволяє передати помилку всередину generator.

    function* test() {
      try {
        yield 10;
      } catch (error) {
        console.log(error.message);
      }
    }

    const generator = test();

    generator.next();

    generator.throw(new Error("Something went wrong"));

Generator може перехопити цю помилку через:

    try...catch

---

# 37. Generator і `try...catch`

    function* test() {
      try {
        yield 10;
      } catch (error) {
        yield `Error: ${error.message}`;
      }
    }

    const generator = test();

    console.log(generator.next());

    console.log(
      generator.throw(new Error("Failed"))
    );

---

# 38. Generator і `finally`

Generator підтримує стандартний:

    try
    catch
    finally

Наприклад:

    function* test() {
      try {
        yield 10;
        yield 20;
      } finally {
        console.log("Cleanup");
      }
    }

Це особливо корисно, коли generator пов'язаний із ресурсом або процесом, який потрібно коректно завершити.

---

# 39. Generator State

Generator зберігає свій стан між викликами `next()`.

    function* counter() {
      let count = 0;

      while (count < 3) {
        yield ++count;
      }
    }

    const generator = counter();

Після першого:

    generator.next();

стан містить:

    count === 1

Після другого:

    generator.next();

стан:

    count === 2

Таким чином generator "пам'ятає", де він зупинився.

---

# 40. Generator створює окремий стан

Кожен виклик generator function створює окремий generator.

    function* counter() {
      let count = 0;

      yield ++count;
      yield ++count;
    }

    const first = counter();
    const second = counter();

    console.log(first.next());
    console.log(first.next());

    console.log(second.next());

Результат:

    { value: 1, done: false }
    { value: 2, done: false }

    { value: 1, done: false }

Кожен generator має власний state.

---

# 41. Generator і Array

Можна перетворити generator на array:

    function* numbers() {
      yield 10;
      yield 20;
      yield 30;
    }

    const array = [...numbers()];

Результат:

    [10, 20, 30]

Або:

    const array = Array.from(numbers());

---

# 42. Generator і destructuring

Оскільки generator є iterable:

    function* numbers() {
      yield 10;
      yield 20;
      yield 30;
    }

можна:

    const [a, b] = numbers();

Результат:

    a === 10
    b === 20

---

# 43. Generator і Spread

    function* numbers() {
      yield 10;
      yield 20;
      yield 30;
    }

    const result = [...numbers()];

Результат:

    [10, 20, 30]

Spread виконує iteration protocol.

---

# 44. Generator і `for...of`

    function* technologies() {
      yield "HTML";
      yield "CSS";
      yield "JavaScript";
      yield "Node.js";
    }

    for (const technology of technologies()) {
      console.log(technology);
    }

Це один із найприродніших способів використання generators.

---

# 45. Generator vs Array

Array:

    const numbers = [1, 2, 3, 4, 5];

вже містить усі значення.

Generator:

    function* numbers() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    }

створює значення поступово.

Тобто:

    Array → eager

    Generator → lazy

Це не означає, що generator завжди кращий.

Це різні інструменти для різних задач.

---

# 46. Generator vs Function

Звичайна функція:

    function getNumber() {
      return 10;
    }

завершується після:

    return

Generator:

    function* getNumbers() {
      yield 10;
      yield 20;
      yield 30;
    }

може призупинятися та продовжувати виконання.

---

# 47. Generator vs Iterator

Ручний iterator:

    const iterator = {
      current: 1,

      next() {
        return {
          value: this.current++,
          done: false,
        };
      },
    };

Generator:

    function* counter() {
      let current = 1;

      while (true) {
        yield current++;
      }
    }

Generator реалізує iterator protocol автоматично.

Тому generator часто дозволяє писати iterator logic значно простіше.

---

# 48. Generator Function Expressions

Generator можна створити як expression.

    const numbers = function* () {
      yield 10;
      yield 20;
    };

Використання:

    const generator = numbers();

---

# 49. Generator Methods

Generator можна використовувати як метод об'єкта.

    const collection = {
      *values() {
        yield 10;
        yield 20;
        yield 30;
      },
    };

Виклик:

    for (const value of collection.values()) {
      console.log(value);
    }

---

# 50. Generator Method у Class

Generator methods можна використовувати і в класах.

    class Numbers {
      *values() {
        yield 10;
        yield 20;
        yield 30;
      }
    }

Використання:

    const numbers = new Numbers();

    for (const value of numbers.values()) {
      console.log(value);
    }

---

# 51. Generator як `Symbol.iterator`

Generator можна використовувати для реалізації iterable.

    const collection = {
      values: [10, 20, 30],

      *[Symbol.iterator]() {
        yield* this.values;
      },
    };

Тепер:

    for (const value of collection) {
      console.log(value);
    }

---

# 52. Це простіше за ручний Iterator

Без generator потрібно писати:

    [Symbol.iterator]() {
      let index = 0;

      return {
        next() {
          // iterator logic
        },
      };
    }

З generator:

    *[Symbol.iterator]() {
      yield* this.values;
    }

Це одна з практичних переваг generators.

---

# 53. Generator і алгоритми

Generator може бути корисним для створення послідовностей:

- чисел;
- сторінок;
- записів;
- ID;
- токенів;
- команд;
- результатів обробки;
- lazy collections.

Наприклад:

    function* ids() {
      let id = 1;

      while (true) {
        yield id++;
      }
    }

---

# 54. Generator для Fibonacci

Класичний приклад:

    function* fibonacci() {
      let a = 0;
      let b = 1;

      while (true) {
        yield a;

        [a, b] = [b, a + b];
      }
    }

Використання:

    const generator = fibonacci();

    console.log(generator.next().value);
    console.log(generator.next().value);
    console.log(generator.next().value);
    console.log(generator.next().value);
    console.log(generator.next().value);

Результат:

    0
    1
    1
    2
    3

---

# 55. Generator для пагінації

Generator можна концептуально використовувати для послідовного проходження сторінок:

    function* pages(totalPages) {
      for (let page = 1; page <= totalPages; page++) {
        yield page;
      }
    }

Використання:

    for (const page of pages(5)) {
      console.log(`Load page ${page}`);
    }

У реальному async API-коді для мережевих запитів частіше потрібні async generators.

---

# 56. Generator як State Machine

Generator добре підходить для послідовних станів.

Наприклад:

    function* workflow() {
      yield "start";
      yield "loading";
      yield "processing";
      yield "finished";
    }

Кожен:

    next()

переходить до наступного стану.

Це робить generator корисним для деяких workflow/state-machine задач.

---

# 57. Generator і побудова Pipeline

Generators можна комбінувати.

Наприклад:

    function* numbers() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
    }

    function* doubled(iterable) {
      for (const value of iterable) {
        yield value * 2;
      }
    }

Використання:

    const result = [...doubled(numbers())];

Результат:

    [2, 4, 6, 8]

Це приклад lazy processing pipeline.

---

# 58. Generator для Filter

    function* filter(iterable, predicate) {
      for (const value of iterable) {
        if (predicate(value)) {
          yield value;
        }
      }
    }

Використання:

    const numbers = [1, 2, 3, 4, 5];

    const evenNumbers = filter(
      numbers,
      number => number % 2 === 0
    );

    console.log([...evenNumbers]);

Результат:

    [2, 4]

---

# 59. Generator для Map

    function* map(iterable, callback) {
      for (const value of iterable) {
        yield callback(value);
      }
    }

Використання:

    const numbers = [1, 2, 3];

    const doubled = map(
      numbers,
      number => number * 2
    );

    console.log([...doubled]);

Результат:

    [2, 4, 6]

---

# 60. Generator Pipeline

Можна комбінувати generators:

    function* numbers() {
      yield 1;
      yield 2;
      yield 3;
      yield 4;
      yield 5;
    }

    function* doubled(iterable) {
      for (const value of iterable) {
        yield value * 2;
      }
    }

    function* even(iterable) {
      for (const value of iterable) {
        if (value % 2 === 0) {
          yield value;
        }
      }
    }

    const result = even(doubled(numbers()));

    console.log([...result]);

Результат:

    [2, 4, 6, 8, 10]

Перевага такого підходу — значення можна обробляти поступово.

---

# 61. Generator і Memory

Generator може бути корисним для великих послідовностей.

Замість:

    const numbers = [];

    for (let i = 0; i < 1_000_000; i++) {
      numbers.push(i);
    }

можна генерувати значення поступово.

    function* numbers() {
      for (let i = 0; i < 1_000_000; i++) {
        yield i;
      }
    }

Але важливо:

якщо зробити:

    [...numbers()]

усі значення знову будуть матеріалізовані в масив.

Тому перевага lazy evaluation залежить від способу використання generator.

---

# 62. Generator не робить код автоматично швидшим

Generator:

- може економити пам'ять;
- дозволяє lazy processing;
- зручний для послідовностей;
- дозволяє призупиняти виконання.

Але він має власну механіку та overhead.

Тому не потрібно використовувати generator просто тому, що він "advanced".

Використовуй його там, де його модель дійсно корисна.

---

# 63. Синхронні Generators

Звичайний generator:

    function* numbers() {
      yield 1;
      yield 2;
      yield 3;
    }

називається синхронним generator.

Він працює з:

    next()

і:

    for...of

---

# 64. Async Generators

Окрема конструкція:

    async function*

Async generator використовується для асинхронної ітерації.

Наприклад:

    async function* data() {
      yield await getData();
    }

Для нього використовують:

    for await...of

Async generators — наступний advanced рівень після звичайних generators.

---

# 65. Generator та Asynchronous Code

Звичайний generator сам по собі:

    не є async

Не потрібно плутати:

    function*

і:

    async function*

Це різні механізми.

---

# 66. Типові помилки

## 1. Забувати `*`

Неправильно:

    function numbers() {
      yield 10;
    }

Правильно:

    function* numbers() {
      yield 10;
    }

---

## 2. Очікувати значення від виклику generator function

    function* numbers() {
      yield 10;
    }

    console.log(numbers());

це не:

    10

Це generator object.

---

## 3. Плутати `yield` і `return`

    yield

призупиняє generator.

    return

завершує generator.

---

## 4. Забувати викликати `next()`

Generator не починає виконання автоматично:

    const generator = numbers();

Потрібно:

    generator.next();

---

## 5. Плутати generator із масивом

Generator:

    const generator = numbers();

не має поведінки звичайного Array.

Наприклад, не можна просто:

    generator.map(...)

---

## 6. Забувати про lazy execution

Generator function не виконується повністю під час:

    numbers();

---

## 7. Плутати `next()` та `next(value)`

    next()

продовжує виконання.

    next(value)

продовжує виконання та передає `value` у попередній `yield`.

---

## 8. Передавати значення першим `next(value)`

Перший `next(value)` не має попереднього `yield`, у який можна передати значення.

---

## 9. Очікувати `return` у `for...of`

Фінальне значення:

    return value

не перебирається `for...of`.

---

## 10. Створювати нескінченний generator без умови завершення

Наприклад:

    function* counter() {
      let i = 0;

      while (true) {
        yield i++;
      }
    }

Його потрібно використовувати з обмеженням.

---

# Питання зі співбесіди

### 1. Що таке generator?

Generator — спеціальна функція, яка може призупиняти та продовжувати виконання за допомогою `yield`.

---

### 2. Як оголошується generator function?

Через:

    function*

---

### 3. Що повертає виклик generator function?

Generator object.

---

### 4. Що таке `yield`?

`yield` повертає значення та призупиняє виконання generator.

---

### 5. Що повертає `next()`?

Об'єкт:

    {
      value,
      done
    }

---

### 6. Чим generator відрізняється від звичайної функції?

Звичайна функція виконується до завершення або `return`.

Generator може призупинятися на `yield` і продовжуватися через `next()`.

---

### 7. Чи є generator iterator?

Так.

Generator object реалізує iterator protocol.

---

### 8. Чи є generator iterable?

Так.

Generator object є iterable.

---

### 9. Що робить `yield*`?

Делегує ітерацію іншому iterable або generator.

---

### 10. Різниця між `yield` і `return`?

    yield → pause + value

    return → finish + final value

---

### 11. Що робить `next(value)`?

Передає `value` у попередній `yield`.

---

### 12. Що станеться при першому `next(value)`?

Передане значення не буде отримане попереднім `yield`, тому що generator ще не був запущений.

---

### 13. Чи можна зробити нескінченний generator?

Так.

    function* counter() {
      let i = 0;

      while (true) {
        yield i++;
      }
    }

---

### 14. Чи можна перебирати generator через `for...of`?

Так.

---

### 15. Що станеться після `done: true`?

Generator завершений.

Подальші виклики `next()` не продовжать його виконання.

---

### 16. Чи можна достроково завершити generator?

Так:

    generator.return();

---

### 17. Чи можна передати помилку в generator?

Так:

    generator.throw(error);

---

### 18. Чи є generator lazy?

Так, його значення отримуються поступово при запиті через `next()` або через механізм ітерації.

---

### 19. Чим generator відрізняється від iterator?

Iterator потрібно реалізувати через `next()`.

Generator автоматично створює iterator behavior на основі:

    function*
    yield

---

### 20. Для чого використовують generators?

Основні випадки:

- lazy sequences;
- custom iterables;
- великі послідовності;
- stateful iteration;
- iterator abstractions;
- data pipelines;
- workflow/state-machine patterns.

---

# Практичні вправи

## Вправа 1 — простий Generator

Створи:

    function* numbers()

який повертає:

    10
    20
    30

Перевір через `next()`.

---

## Вправа 2 — `for...of`

Використай той самий generator через:

    for...of

---

## Вправа 3 — Range Generator

Створи:

    function* range(start, end)

який повертає числа від `start` до `end`.

Наприклад:

    [...range(1, 5)]

повинно дати:

    [1, 2, 3, 4, 5]

---

## Вправа 4 — парні числа

Створи generator:

    evenNumbers(start, end)

який повертає тільки парні числа.

---

## Вправа 5 — Fibonacci

Створи generator Fibonacci sequence.

Перевір перші 10 значень.

---

## Вправа 6 — Infinite Counter

Створи:

    counter()

який генерує:

    1
    2
    3
    ...

Зупини `for...of` після 10 значень.

---

## Вправа 7 — `next(value)`

Створи generator:

    function* calculator()

який через `yield` отримує два числа та повертає їх суму.

---

## Вправа 8 — `yield*`

Створи:

    frontend()

який повертає:

    HTML
    CSS
    JavaScript

і:

    fullstack()

який через `yield*` додає:

    Node.js
    PostgreSQL

---

## Вправа 9 — Generator Iterable

Створи об'єкт:

    collection

з масивом:

    [10, 20, 30]

і реалізуй:

    *[Symbol.iterator]()

---

## Вправа 10 — Lazy Pipeline

Створи три generators:

    numbers()
    doubled()
    even()

та побудуй pipeline:

    numbers
      ↓
    doubled
      ↓
    even

---

# Міні-проєкт

## Lazy Number Pipeline

Створи систему lazy processing для чисел.

### 1. Generator numbers

Генерує числа:

    1 → 100

### 2. Generator doubled

Помножує кожне число на:

    2

### 3. Generator filtered

Залишає тільки значення:

    > 100

### 4. Використання

    const result = filtered(
      doubled(
        numbers()
      )
    );

    for (const value of result) {
      console.log(value);
    }

Важливо:

- не створювати проміжний масив;
- обробляти значення поступово;
- використовувати `yield`;
- зберегти lazy behavior.

---

# Рівні володіння

## Core

Потрібно розуміти:

- `function*`;
- `yield`;
- generator object;
- `next()`;
- `value`;
- `done`;
- generator як iterator;
- generator як iterable;
- `for...of`.

---

## Junior

Потрібно вміти:

- створювати generators;
- використовувати `yield`;
- створювати range generator;
- створювати infinite generator;
- використовувати spread;
- використовувати destructuring;
- використовувати `yield*`;
- розуміти lazy evaluation.

---

## Middle

Потрібно розуміти:

- `next(value)`;
- `return()`;
- `throw()`;
- `try/catch/finally`;
- generator delegation;
- stateful generators;
- lazy pipelines;
- custom iterable implementation;
- memory advantages;
- generator lifecycle.

---

## Senior

Варто розуміти:

- внутрішню модель generator execution;
- suspension/resumption;
- iterator protocol;
- delegation semantics;
- lazy computation;
- generator composition;
- async generators;
- `for await...of`;
- streams;
- resource management;
- складні iterator pipelines.

---

# Міні-шпаргалка

    // Generator function
    function* numbers() {
      yield 10;
      yield 20;
      yield 30;
    }


    // Create generator
    const generator = numbers();


    // next()
    generator.next();


    // Result
    {
      value: 10,
      done: false
    }


    // Continue
    generator.next();


    // Finished
    {
      value: undefined,
      done: true
    }


    // for...of
    for (const value of numbers()) {
      console.log(value);
    }


    // Spread
    const array = [...numbers()];


    // Destructuring
    const [a, b] = numbers();


    // return
    function* test() {
      yield 10;
      return 100;
    }


    // next(value)
    function* test() {
      const value = yield 10;

      console.log(value);
    }

    const generator = test();

    generator.next();
    generator.next(100);


    // yield*
    function* numbers() {
      yield* [10, 20, 30];
    }


    // Infinite generator
    function* counter() {
      let current = 1;

      while (true) {
        yield current++;
      }
    }


    // Early return
    generator.return();


    // Throw error
    generator.throw(new Error("Failed"));


    // Generator method
    const object = {
      *values() {
        yield 10;
        yield 20;
      },
    };


    // Generator as Symbol.iterator
    const collection = {
      values: [10, 20, 30],

      *[Symbol.iterator]() {
        yield* this.values;
      },
    };

---

# Головне

Generator — це спосіб створити **iterator через зручний синтаксис** і водночас отримати можливість призупиняти та продовжувати виконання функції.

Головна схема:

    function*
        ↓
    generator()
        ↓
    generator object
        ↓
    next()
        ↓
    yield
        ↓
    { value, done }

Потрібно запам'ятати:

    yield → pause

    next() → resume

    done: false → ще працює

    done: true → завершений

---

## Найважливіший зв'язок із попередньою темою

У `07-iterators` ми вручну створювали:

    [Symbol.iterator]()
        ↓
    next()
        ↓
    { value, done }

У `08-generators` JavaScript дозволяє описати цю логіку значно простіше:

    function* numbers() {
      yield 10;
      yield 20;
      yield 30;
    }

Тобто:

    Generator
        ↓
    автоматично реалізує Iterator
        ↓
    автоматично підтримує Iterable
        ↓
    працює з for...of
        ↓
    працює зі spread
        ↓
    працює з destructuring

---

# Що потрібно вміти пояснити своїми словами

Після цієї теми ти повинен без підглядання пояснити:

    1. Що таке generator?
    2. Чим generator function відрізняється від звичайної функції?
    3. Що робить function*?
    4. Що робить yield?
    5. Що повертає generator.next()?
    6. Що означають value і done?
    7. Чому generator є iterator?
    8. Чому generator є iterable?
    9. Як generator працює з for...of?
    10. Що таке lazy evaluation?
    11. Чим yield відрізняється від return?
    12. Що робить next(value)?
    13. Що робить yield*?
    14. Для чого потрібні return() і throw()?
    15. Як створити infinite generator?
    16. Чим generator відрізняється від ручного iterator?
    17. Чому generator може бути корисним для великих послідовностей?

Якщо ти можеш написати `range()`, `counter()`, Fibonacci generator і пояснити `next(value)` — основна частина теми засвоєна.

---

# Зв'язок усіх трьох тем

У цьому блоці:

    05-map-and-set
          ↓
    06-advanced-object-features
          ↓
    07-iterators
          ↓
    08-generators

формується важливий ланцюжок сучасного JavaScript.

### Map / Set

    collections
        ↓
    iterable

### Advanced Objects

    objects
        ↓
    Symbol.iterator
        ↓
    custom iterable

### Iterators

    iterable
        ↓
    iterator
        ↓
    next()
        ↓
    { value, done }

### Generators

    function*
        ↓
    yield
        ↓
    generator
        ↓
    iterator + iterable
        ↓
    lazy sequence

Це вже хороший фундамент для розуміння внутрішньої механіки сучасного JavaScript.

---

# Наступний крок

Після:

    07-iterators
    08-generators

логічно перейти до наступного рівня:

    Async Iteration

Ключові конструкції там:

    async function*
    yield
    for await...of
    AsyncIterator

Це дозволяє працювати з послідовностями асинхронних даних, наприклад:

    API requests
    pagination
    streams
    WebSocket-like data flows
    asynchronous data processing

Але спочатку важливо добре засвоїти синхронну модель:

    iterable
        ↓
    iterator
        ↓
    generator
        ↓
    async iterator
        ↓
    async generator