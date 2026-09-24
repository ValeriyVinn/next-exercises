# 07. Iterators

Ітератори (`iterators`) — механізм JavaScript, який дозволяє послідовно отримувати елементи з колекції або іншого джерела даних.

Ітератори лежать в основі багатьох можливостей сучасного JavaScript:

- `for...of`;
- `Array`;
- `String`;
- `Map`;
- `Set`;
- `...spread`;
- destructuring;
- `Array.from()`;
- генераторів (`generators`);
- протоколу ітерації (`iteration protocol`).

Головна ідея:

    об'єкт → iterator → next() → value + done

Наприклад:

    const numbers = [10, 20, 30];

    const iterator = numbers[Symbol.iterator]();

    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());

Результат:

    { value: 10, done: false }
    { value: 20, done: false }
    { value: 30, done: false }
    { value: undefined, done: true }

---

# Ключові поняття

| Поняття | Що означає |
|---|---|
| `iterator` | об'єкт, який послідовно видає значення |
| `iterable` | об'єкт, який можна ітерувати |
| `Symbol.iterator` | спеціальний метод для отримання iterator |
| `next()` | отримує наступний результат ітерації |
| `value` | поточне значення |
| `done` | показує, чи завершена ітерація |
| iteration protocol | правила роботи iterable та iterator |
| `for...of` | автоматично використовує iterator |
| spread | використовує iterator для розгортання значень |
| destructuring | може використовувати iterator |
| `Array.from()` | може створити масив із iterable |

---

# 1. Що таке Iterator

Iterator — це об'єкт, який має метод:

    next()

Метод `next()` повертає об'єкт:

    {
      value: ...,
      done: ...
    }

Наприклад:

    const iterator = {
      next() {
        return {
          value: 10,
          done: false,
        };
      },
    };

Тут `next()` існує, але iterator ніколи не завершується, тому що завжди повертає:

    done: false

---

# 2. `next()`

`next()` переходить до наступного елемента ітерації.

Наприклад:

    const iterator = [10, 20, 30][Symbol.iterator]();

    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());

Результат:

    { value: 10, done: false }
    { value: 20, done: false }
    { value: 30, done: false }
    { value: undefined, done: true }

---

# 3. `value`

`value` містить поточне значення.

    const numbers = [10, 20, 30];

    const iterator = numbers[Symbol.iterator]();

    const result = iterator.next();

    console.log(result.value);

Результат:

    10

---

# 4. `done`

`done` показує, чи завершена ітерація.

    const numbers = [10];

    const iterator = numbers[Symbol.iterator]();

    console.log(iterator.next());
    console.log(iterator.next());

Результат:

    { value: 10, done: false }
    { value: undefined, done: true }

Отже:

    done: false

означає:

    "ще є значення"

А:

    done: true

означає:

    "ітерація завершена"

---

# 5. Iterable

Iterable — це об'єкт, який має спеціальний метод:

    [Symbol.iterator]()

Цей метод повинен повертати iterator.

Приклад:

    const numbers = [10, 20, 30];

    console.log(typeof numbers[Symbol.iterator]);

Результат:

    "function"

Отже, масив є iterable.

---

# 6. Iterator Protocol

Iterator protocol визначає, як працює iterator.

Iterator повинен мати метод:

    next()

Який повертає об'єкт із:

    value
    done

Наприклад:

    {
      next() {
        return {
          value: 1,
          done: false,
        };
      },
    }

---

# 7. Iterable Protocol

Iterable protocol визначає, як об'єкт стає iterable.

Об'єкт повинен мати:

    [Symbol.iterator]()

який повертає iterator.

Схема:

    iterable
        ↓
    [Symbol.iterator]()
        ↓
    iterator
        ↓
    next()
        ↓
    { value, done }

---

# 8. `Symbol.iterator`

`Symbol.iterator` — спеціальний well-known Symbol, який використовується JavaScript для отримання iterator.

Наприклад:

    const numbers = [10, 20, 30];

    const iterator = numbers[Symbol.iterator]();

Тепер:

    iterator.next();

отримає:

    { value: 10, done: false }

---

# 9. Масив як Iterable

Масиви є iterable:

    const numbers = [10, 20, 30];

Можна:

    for (const number of numbers) {
      console.log(number);
    }

Або вручну:

    const iterator = numbers[Symbol.iterator]();

    console.log(iterator.next().value);
    console.log(iterator.next().value);
    console.log(iterator.next().value);

---

# 10. String як Iterable

Рядки також є iterable.

    const text = "ABC";

    const iterator = text[Symbol.iterator]();

    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());

Результат:

    { value: "A", done: false }
    { value: "B", done: false }
    { value: "C", done: false }
    { value: undefined, done: true }

---

# 11. Map як Iterable

`Map` є iterable.

    const map = new Map([
      ["name", "Valeriy"],
      ["age", 56],
    ]);

    for (const entry of map) {
      console.log(entry);
    }

Кожна ітерація повертає пару:

    ["name", "Valeriy"]

    ["age", 56]

---

# 12. Set як Iterable

`Set` також є iterable.

    const numbers = new Set([10, 20, 30]);

    for (const number of numbers) {
      console.log(number);
    }

---

# 13. `for...of`

`for...of` автоматично використовує iterable protocol.

    const numbers = [10, 20, 30];

    for (const number of numbers) {
      console.log(number);
    }

Концептуально JavaScript робить приблизно:

    const iterator = numbers[Symbol.iterator]();

    let result = iterator.next();

    while (!result.done) {
      console.log(result.value);

      result = iterator.next();
    }

`for...of` приховує цю механіку від розробника.

---

# 14. `for...of` і `for...in`

Це дуже важлива різниця.

`for...of`:

    for (const value of array) {
      console.log(value);
    }

отримує **значення**.

`for...in`:

    for (const key in object) {
      console.log(key);
    }

перебирає **ключі/імена властивостей**.

Тобто:

    for...of → values
    for...in → keys

---

# 15. Spread і Iterator

Spread operator:

    ...

також використовує iterable protocol.

Наприклад:

    const numbers = [10, 20, 30];

    const copy = [...numbers];

JavaScript отримує iterator масиву та послідовно отримує його значення.

---

# 16. Spread для String

Оскільки string iterable:

    const text = "Hello";

    const letters = [...text];

Результат:

    ["H", "e", "l", "l", "o"]

---

# 17. Spread для Set

    const numbers = new Set([10, 20, 30]);

    const array = [...numbers];

Результат:

    [10, 20, 30]

---

# 18. Spread для Map

    const map = new Map([
      ["name", "Valeriy"],
      ["age", 56],
    ]);

    const entries = [...map];

Результат:

    [
      ["name", "Valeriy"],
      ["age", 56]
    ]

---

# 19. Destructuring та Iterator

Array destructuring також може працювати через iterator.

    const numbers = [10, 20, 30];

    const [first, second] = numbers;

Результат:

    first === 10
    second === 20

JavaScript отримує значення через iterator.

---

# 20. `Array.from()`

`Array.from()` може створювати масив із iterable.

    const set = new Set([10, 20, 30]);

    const array = Array.from(set);

Результат:

    [10, 20, 30]

Також:

    const text = "ABC";

    const letters = Array.from(text);

Результат:

    ["A", "B", "C"]

---

# 21. Iterable vs Array

Не кожен iterable є масивом.

Наприклад:

    const numbers = new Set([10, 20, 30]);

`numbers` можна перебирати:

    for (const number of numbers) {
      console.log(number);
    }

Але це не Array:

    Array.isArray(numbers);

Результат:

    false

---

# 22. Iterable vs Iterator

Це одна з найважливіших відмінностей.

Iterable має:

    [Symbol.iterator]()

Iterator має:

    next()

Наприклад, масив:

    const array = [10, 20, 30];

є iterable.

Його iterator:

    const iterator = array[Symbol.iterator]();

є iterator.

Отже:

    array
      ↓
    iterable

    array[Symbol.iterator]()
      ↓
    iterator

---

# 23. Iterator сам може бути Iterable

Iterator часто також реалізує:

    [Symbol.iterator]()

який повертає самого себе.

Наприклад:

    const array = [10, 20, 30];

    const iterator = array[Symbol.iterator]();

    console.log(iterator[Symbol.iterator]() === iterator);

Результат:

    true

Це дозволяє використовувати iterator там, де очікується iterable.

---

# 24. Створення власного Iterable

Можна створити власний iterable object.

    const collection = {
      values: [10, 20, 30],

      [Symbol.iterator]() {
        return this.values[Symbol.iterator]();
      },
    };

Тепер:

    for (const value of collection) {
      console.log(value);
    }

---

# 25. Власний Iterator

Можна створити iterator вручну.

    const iterator = {
      current: 1,
      last: 3,

      next() {
        if (this.current <= this.last) {
          return {
            value: this.current++,
            done: false,
          };
        }

        return {
          value: undefined,
          done: true,
        };
      },
    };

Використання:

    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());

Результат:

    { value: 1, done: false }
    { value: 2, done: false }
    { value: 3, done: false }
    { value: undefined, done: true }

---

# 26. Власний Iterable + Iterator

Щоб використовувати об'єкт із `for...of`, потрібно зробити його iterable.

    const range = {
      start: 1,
      end: 5,

      [Symbol.iterator]() {
        let current = this.start;

        return {
          next: () => {
            if (current <= this.end) {
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

Тепер:

    for (const number of range) {
      console.log(number);
    }

Результат:

    1
    2
    3
    4
    5

---

# 27. Як працює наш Iterable

Коли виконується:

    for (const number of range) {
      console.log(number);
    }

JavaScript концептуально:

1. отримує `range[Symbol.iterator]()`;
2. отримує iterator;
3. викликає `next()`;
4. читає `value`;
5. перевіряє `done`;
6. повторює процес;
7. зупиняється при `done: true`.

Схема:

    range
      ↓
    Symbol.iterator
      ↓
    iterator
      ↓
    next()
      ↓
    value
      ↓
    done?
      ↓
    next()
      ↓
    ...

---

# 28. Iterator може мати стан

Iterator може зберігати поточний стан.

    function createCounter(max) {
      let current = 0;

      return {
        next() {
          if (current < max) {
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
    }

    const counter = createCounter(3);

Стан:

    current = 0

Після:

    counter.next();

стає:

    current = 1

Таким чином iterator пам'ятає, де він знаходиться.

---

# 29. Iterator — це stateful object

На відміну від простої функції:

    iterator

зберігає поточний стан проходження.

Наприклад:

    const iterator = [10, 20, 30][Symbol.iterator]();

Після:

    iterator.next();

iterator знаходиться після першого елемента.

Наступний:

    iterator.next();

поверне вже:

    20

---

# 30. Два Iterator для одного Array

Один iterable може створити кілька незалежних iterator.

    const numbers = [10, 20, 30];

    const first = numbers[Symbol.iterator]();
    const second = numbers[Symbol.iterator]();

    console.log(first.next());
    console.log(first.next());

    console.log(second.next());

Результат:

    { value: 10, done: false }
    { value: 20, done: false }
    { value: 10, done: false }

Кожен iterator має власний стан.

---

# 31. Iterator після завершення

Після:

    done: true

iterator зазвичай продовжує повертати:

    {
      value: undefined,
      done: true
    }

Наприклад:

    const iterator = [10][Symbol.iterator]();

    console.log(iterator.next());
    console.log(iterator.next());
    console.log(iterator.next());

Результат:

    { value: 10, done: false }
    { value: undefined, done: true }
    { value: undefined, done: true }

---

# 32. Які об'єкти iterable

Типові built-in iterables:

- `Array`;
- `String`;
- `Map`;
- `Set`;
- `TypedArray`;
- `arguments`;
- деякі DOM collections.

Також можна створювати власні iterable objects.

---

# 33. Plain Object не є Iterable

Звичайний об'єкт:

    const user = {
      name: "Valeriy",
      age: 56,
    };

не має стандартного:

    user[Symbol.iterator]

Тому:

    for (const value of user) {
      console.log(value);
    }

викличе:

    TypeError

---

# 34. Як перебрати Object

Для plain object можна використати:

    Object.keys(user)

або:

    Object.values(user)

або:

    Object.entries(user)

Наприклад:

    for (const [key, value] of Object.entries(user)) {
      console.log(key, value);
    }

`Object.entries()` повертає масив, який є iterable.

---

# 35. Зробити Object Iterable

Можна додати:

    [Symbol.iterator]

власноруч.

    const user = {
      name: "Valeriy",
      age: 56,

      *[Symbol.iterator]() {
        yield this.name;
        yield this.age;
      },
    };

Після цього:

    for (const value of user) {
      console.log(value);
    }

Цей приклад уже використовує generator syntax.

До генераторів повернемося в наступній темі.

---

# 36. Iterator може повертати будь-які значення

Iterator не обмежений числами.

    const iterator = {
      values: ["HTML", "CSS", "JavaScript"],
      index: 0,

      next() {
        if (this.index < this.values.length) {
          return {
            value: this.values[this.index++],
            done: false,
          };
        }

        return {
          value: undefined,
          done: true,
        };
      },
    };

---

# 37. Iterator для діапазону

Практичний pattern:

    function range(start, end) {
      return {
        [Symbol.iterator]() {
          let current = start;

          return {
            next() {
              if (current <= end) {
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
    }

Використання:

    for (const number of range(1, 5)) {
      console.log(number);
    }

---

# 38. Iterator і Lazy Evaluation

Iterator може створювати значення тільки тоді, коли вони потрібні.

Наприклад:

    const iterator = {
      current: 1,

      next() {
        return {
          value: this.current++,
          done: false,
        };
      },
    };

Значення не створюються всі одразу.

Вони з'являються при:

    next()

Це називається lazy evaluation.

---

# 39. Lazy vs Eager

Eager approach:

    const numbers = [1, 2, 3, 4, 5];

Усі значення вже знаходяться в пам'яті.

Lazy iterator:

    next()

створює або повертає наступне значення лише тоді, коли воно потрібне.

Це особливо важливо для:

- великих послідовностей;
- потоків даних;
- генераторів;
- обробки великих обсягів інформації.

---

# 40. Infinite Iterator

Iterator технічно може бути нескінченним.

    const counter = {
      current: 1,

      next() {
        return {
          value: this.current++,
          done: false,
        };
      },
    };

Такий iterator ніколи не повертає:

    done: true

Тому не можна безконтрольно передавати його в:

    for...of

і чекати завершення.

---

# 41. Infinite Iterable

Можна створити iterable, який генерує нескінченну послідовність.

    const numbers = {
      [Symbol.iterator]() {
        let current = 1;

        return {
          next() {
            return {
              value: current++,
              done: false,
            };
          },
        };
      },
    };

Такий iterable потрібно використовувати з обмеженням.

Наприклад:

    let count = 0;

    for (const number of numbers) {
      console.log(number);

      count++;

      if (count === 5) {
        break;
      }
    }

---

# 42. `break` і Iterator

`for...of` підтримує ранній вихід:

    const numbers = [10, 20, 30, 40, 50];

    for (const number of numbers) {
      console.log(number);

      if (number === 30) {
        break;
      }
    }

У цьому випадку ітерація завершується достроково.

Для iterator protocol існує додатковий механізм:

    return()

який може бути використаний для cleanup.

---

# 43. Iterator `return()`

Iterator може мати метод:

    return()

Наприклад:

    const iterable = {
      [Symbol.iterator]() {
        let current = 1;

        return {
          next() {
            return {
              value: current++,
              done: false,
            };
          },

          return() {
            console.log("Iterator closed");

            return {
              done: true,
            };
          },
        };
      },
    };

Якщо `for...of` завершується через `break`, JavaScript може викликати `return()` iterator для завершення роботи.

---

# 44. Cleanup

`return()` особливо корисний, якщо iterator пов'язаний із ресурсом або станом, який потрібно звільнити.

Наприклад:

- закриття ресурсу;
- cleanup;
- завершення потоку;
- очищення внутрішнього стану.

У звичайних масивах про це зазвичай не потрібно думати.

---

# 45. Iterator і `return()`

Iterator protocol допускає додаткові методи:

    next()
    return()
    throw()

Для базового рівня найважливіший:

    next()

`return()` і `throw()` більше стосуються advanced iteration та generators.

---

# 46. `Symbol.iterator` — це Symbol

`Symbol.iterator` не є рядком:

    "iterator"

Це Symbol:

    typeof Symbol.iterator

Результат:

    "symbol"

Тому:

    object[Symbol.iterator]

є спеціальним властивістю/методом.

---

# 47. Чому використовують Symbol

Symbols дозволяють створювати спеціальні ключі, які не конфліктують зі звичайними string properties.

Наприклад:

    object[Symbol.iterator] = function () {
      // ...
    };

Це частина стандартного JavaScript protocol system.

---

# 48. Iterator та протоколи JavaScript

Iterator — приклад того, як JavaScript використовує протоколи.

Протокол визначає не конкретний клас, а набір правил.

Для iterable:

    [Symbol.iterator]()

Для iterator:

    next()

Це duck typing:

    "Якщо об'єкт має потрібну структуру,
    JavaScript може використовувати його відповідно до протоколу."

---

# 49. Duck Typing

JavaScript не питає:

    "Чи є цей об'єкт екземпляром класу Iterator?"

Він перевіряє поведінку, необхідну протоколом.

Наприклад:

    object[Symbol.iterator]

повинен бути функцією, яка повертає iterator.

Це один із важливих принципів JavaScript.

---

# 50. Практичний приклад: Pagination

Iterator можна використовувати для послідовної обробки сторінок даних.

Концептуально:

    page 1
      ↓
    next()
      ↓
    page 2
      ↓
    next()
      ↓
    page 3
      ↓
    ...

У реальному frontend/backend коді для цього часто використовуються async iterators, які будуть окремою advanced темою.

---

# 51. Практичний приклад: Range

Створимо reusable iterable:

    function createRange(start, end) {
      return {
        [Symbol.iterator]() {
          let current = start;

          return {
            next() {
              if (current > end) {
                return {
                  value: undefined,
                  done: true,
                };
              }

              return {
                value: current++,
                done: false,
              };
            },
          };
        },
      };
    }

Використання:

    const range = createRange(5, 10);

    for (const number of range) {
      console.log(number);
    }

Результат:

    5
    6
    7
    8
    9
    10

---

# 52. Практичний приклад: Words

Створимо iterable для слів:

    const sentence = {
      text: "JavaScript is powerful",

      [Symbol.iterator]() {
        const words = this.text.split(" ");
        let index = 0;

        return {
          next() {
            if (index < words.length) {
              return {
                value: words[index++],
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

Тепер:

    for (const word of sentence) {
      console.log(word);
    }

---

# 53. Iterable може бути повторно використаний

У більшості стандартних iterable:

    array
    string
    set
    map

можна створювати новий iterator багато разів.

Наприклад:

    const numbers = [10, 20, 30];

    for (const number of numbers) {
      console.log(number);
    }

    for (const number of numbers) {
      console.log(number);
    }

Обидва цикли почнуть ітерацію з початку.

---

# 54. Iterator може бути одноразовим

Сам iterator має стан.

    const iterator = [10, 20, 30][Symbol.iterator]();

    for (const value of iterator) {
      console.log(value);
    }

Після завершення iterator уже знаходиться в кінці.

Повторне використання:

    for (const value of iterator) {
      console.log(value);
    }

нічого не виведе.

Тому потрібно розрізняти:

    iterable → може створювати iterator

і:

    iterator → має поточний стан

---

# 55. Дуже важлива модель

Запам'ятай:

    Iterable
        ↓
    [Symbol.iterator]()
        ↓
    Iterator
        ↓
    next()
        ↓
    { value, done }

Це одна з найважливіших схем цього розділу.

---

# 56. `for...of` — високорівневий API

Коли пишемо:

    for (const value of iterable) {
      console.log(value);
    }

нам не потрібно вручну працювати з:

    Symbol.iterator
    next()
    value
    done

JavaScript робить це автоматично.

Тому в повсякденному коді:

    for...of

використовується значно частіше, ніж ручний iterator.

---

# 57. Коли потрібно знати Iterator вручну

Розуміння iterator важливе, коли потрібно:

- створювати власні iterable;
- працювати з generators;
- розуміти `for...of`;
- розуміти spread;
- розуміти destructuring;
- працювати з `Map` / `Set`;
- створювати lazy sequences;
- працювати з потоками;
- розуміти async iterators.

---

# 58. Типові помилки

## 1. Плутати iterable та iterator

Iterable:

    [Symbol.iterator]()

Iterator:

    next()

---

## 2. Вважати всі об'єкти iterable

Plain object:

    {
      name: "Valeriy"
    }

не є стандартним iterable.

---

## 3. Плутати `for...of` та `for...in`

    for...of → values

    for...in → keys

---

## 4. Забувати про `done`

Потрібно перевіряти:

    result.done

щоб знати, коли ітерація завершилася.

---

## 5. Використовувати нескінченний iterator без умови

Наприклад:

    for (const value of infiniteIterable) {
      console.log(value);
    }

може ніколи не завершитися.

---

## 6. Вважати iterator звичайним масивом

Iterator не обов'язково має:

    length
    map()
    filter()
    push()

Iterator — це об'єкт із протоколом `next()`.

---

## 7. Забувати, що iterator має стан

    const iterator = array[Symbol.iterator]();

Після викликів `next()` він рухається вперед.

---

# Питання зі співбесіди

### 1. Що таке iterator?

Об'єкт, який має метод:

    next()

і повертає:

    {
      value,
      done
    }

---

### 2. Що таке iterable?

Об'єкт, який має:

    [Symbol.iterator]()

і цей метод повертає iterator.

---

### 3. Що таке `Symbol.iterator`?

Спеціальний well-known Symbol, який визначає метод отримання iterator.

---

### 4. Що повертає `next()`?

Об'єкт:

    {
      value,
      done
    }

---

### 5. Що означає `done: true`?

Ітерація завершена.

---

### 6. Які стандартні типи є iterable?

Серед основних:

    Array
    String
    Map
    Set
    TypedArray

та деякі DOM collections.

---

### 7. Чи є plain object iterable?

За замовчуванням — ні.

---

### 8. Як зробити object iterable?

Реалізувати:

    [Symbol.iterator]()

який повертає iterator.

---

### 9. Чим відрізняється `for...of` від `for...in`?

    for...of → values

    for...in → keys

---

### 10. Чи використовує spread iterator?

Так.

Наприклад:

    [...iterable]

отримує значення через iterable protocol.

---

### 11. Чи використовує destructuring iterator?

Array destructuring може використовувати iterator.

    const [first, second] = iterable;

---

### 12. Чи є iterator iterable?

Iterator може бути iterable, і стандартні iterator objects зазвичай реалізують:

    [Symbol.iterator]()

який повертає самого себе.

---

### 13. Чи може iterator бути нескінченним?

Так.

Він може ніколи не повертати:

    done: true

---

### 14. Для чого потрібен `return()`?

Для завершення iterator та можливого cleanup при достроковому завершенні ітерації.

---

### 15. Чим iterable відрізняється від iterator?

Коротко:

    iterable → "можна отримати iterator"

    iterator → "можна отримати наступне значення"

---

# Практичні вправи

## Вправа 1 — ручний iterator

Створи iterator, який повертає:

    10
    20
    30

Перевір його через:

    next()

---

## Вправа 2 — range iterator

Створи iterator для:

    1 → 10

який повертає числа по одному.

---

## Вправа 3 — власний iterable

Створи:

    numbers

із:

    [10, 20, 30, 40]

і реалізуй:

    [Symbol.iterator]()

---

## Вправа 4 — String iterator

Отримай iterator рядка:

    "JavaScript"

і вручну виклич `next()` кілька разів.

---

## Вправа 5 — Map iterator

Створи `Map`:

    name → Valeriy
    age → 56

Отримай:

    map[Symbol.iterator]()

і досліди результати `next()`.

---

## Вправа 6 — Set iterator

Створи:

    new Set([10, 20, 30])

та отримай його iterator.

---

## Вправа 7 — Iterable Range

Створи функцію:

    createRange(start, end)

яка повертає iterable, придатний для:

    for...of

---

## Вправа 8 — Infinite iterator

Створи iterator:

    1
    2
    3
    4
    ...

Зупини його після п'яти значень.

---

## Вправа 9 — `Object.entries()`

Візьми:

    const user = {
      name: "Valeriy",
      age: 56,
    };

Перебери його через:

    Object.entries(user)

і:

    for...of

---

## Вправа 10 — власний словник

Створи об'єкт, який містить:

    HTML
    CSS
    JavaScript
    TypeScript

і зроби його iterable.

---

# Міні-проєкт

## Range Collection

Створи reusable iterable:

    createRange(start, end)

Вимоги:

1. повертає iterable;
2. підтримує `for...of`;
3. має внутрішній iterator;
4. кожен iterator має незалежний стан;
5. завершується через `done: true`;
6. підтримує spread.

Наприклад:

    const range = createRange(1, 5);

    console.log([...range]);

Результат:

    [1, 2, 3, 4, 5]

І:

    for (const number of range) {
      console.log(number);
    }

---

# Рівні володіння

## Core

Потрібно розуміти:

- що таке iterable;
- що таке iterator;
- `Symbol.iterator`;
- `next()`;
- `value`;
- `done`;
- `for...of`;
- `for...in`;
- Array / String / Map / Set як iterable.

---

## Junior

Потрібно вміти:

- отримувати iterator;
- вручну викликати `next()`;
- створювати простий iterator;
- створювати власний iterable;
- розуміти spread через iterable;
- розуміти destructuring через iterable;
- використовувати `Array.from()`.

---

## Middle

Потрібно розуміти:

- iterable protocol;
- iterator protocol;
- prototype та Symbol-based protocols;
- stateful iterators;
- lazy evaluation;
- infinite iterators;
- `return()`;
- cleanup;
- взаємодію iterator з generators;
- різницю між iterable та iterator lifecycle.

---

## Senior

Варто розуміти:

- внутрішню модель iteration protocols;
- custom iteration abstractions;
- lazy data processing;
- iterator composition;
- sync vs async iteration;
- generators;
- async generators;
- streams;
- resource management;
- performance implications.

---

# Міні-шпаргалка

    // Iterable
    const numbers = [10, 20, 30];

    numbers[Symbol.iterator]();


    // Iterator
    const iterator = numbers[Symbol.iterator]();


    // next()
    iterator.next();


    // Result
    {
      value: 10,
      done: false
    }


    // Finished
    {
      value: undefined,
      done: true
    }


    // for...of
    for (const value of numbers) {
      console.log(value);
    }


    // Spread
    const copy = [...numbers];


    // Array.from()
    const array = Array.from(new Set([10, 20, 30]));


    // Custom iterator
    const iterator = {
      current: 1,
      last: 3,

      next() {
        if (this.current <= this.last) {
          return {
            value: this.current++,
            done: false,
          };
        }

        return {
          value: undefined,
          done: true,
        };
      },
    };


    // Custom iterable
    const collection = {
      values: [10, 20, 30],

      [Symbol.iterator]() {
        return this.values[Symbol.iterator]();
      },
    };


    // Iterate custom iterable
    for (const value of collection) {
      console.log(value);
    }


    // Check iterable
    typeof object[Symbol.iterator] === "function"


    // Core model

    Iterable
        ↓
    Symbol.iterator
        ↓
    Iterator
        ↓
    next()
        ↓
    { value, done }

---

# Головне

Iterator — це механізм **послідовного отримання значень**.

Найважливіша модель:

    Iterable
        ↓
    [Symbol.iterator]()
        ↓
    Iterator
        ↓
    next()
        ↓
    { value, done }

Потрібно чітко розрізняти:

    iterable
    iterator

`Iterable`:

    має Symbol.iterator

`Iterator`:

    має next()

---

## Запам'ятай зв'язок із повсякденним JavaScript

    for...of
        ↓
    Symbol.iterator
        ↓
    iterator
        ↓
    next()

    [...iterable]
        ↓
    iterator

    const [a, b] = iterable
        ↓
    iterator

    Array.from(iterable)
        ↓
    iterator

Тобто iterator — це не просто окрема advanced feature.

Він є **внутрішньою основою багатьох знайомих конструкцій сучасного JavaScript**.

---

# Що потрібно вміти пояснити своїми словами

Після цієї теми ти повинен без підглядання пояснити:

    1. Що таке iterable?
    2. Що таке iterator?
    3. Для чого потрібен Symbol.iterator?
    4. Що повертає next()?
    5. Що означають value і done?
    6. Як працює for...of?
    7. Чому Array можна використовувати з for...of?
    8. Чому plain Object не можна напряму використовувати з for...of?
    9. Як створити власний iterable?
    10. Чому iterator має стан?
    11. Чим iterator відрізняється від iterable?
    12. Як spread використовує iteration protocol?

Якщо ти можеш це пояснити і написати простий `range()` iterable — основна частина теми засвоєна.

---

# Наступний крок

Після `07-iterators` логічно перейти до:

    08-generators

Генератори значно спрощують написання iterator logic.

Замість ручного:

    next()
    value
    done
    current

можна використовувати:

    function*
    yield

Наприклад:

    function* numbers() {
      yield 10;
      yield 20;
      yield 30;
    }

    for (const number of numbers()) {
      console.log(number);
    }

Генератори фактично дозволяють писати складну iterator-логіку значно простіше.