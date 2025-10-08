// import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

// const { kMaxLength } = require("buffer");

// setupExercise({
//   fileKey: "08-asynchronous-js",
//   exerciseName: "Make Sheff",
//   statement:
//     "Write a function 'MakeCheff' with a parameter name that returns a function 'MakeDish' with a parameter dish so that when 'MakeCheff' is called, the console will display the string '{name} cooks {dish}'",
// });

// ! Рішення ----------
// function makeSheff(name) {
//   function makeDish(dish) {
//     console.log(`${name} cooks ${dish}`);
//   }
//   return makeDish;
// }

// const robert = makeSheff("Robert");
// const zlatan = makeSheff("Zlatan");

// robert("spaghetti");
// zlatan("soup");

// ?---- практичні приклади використання замикань ---------

// 1. Інкапсуляція приватних змінних
// function createCounter() {
//   let count = 0;
//   return {
//     increment() {
//       count++;
//       return count;
//     },
//     decrement() {
//       count--;
//       return count;
//     }
//   };
// }

// const counter = createCounter();
// console.log(counter.increment());
// console.log(counter.decrement()); // 0

// count недоступний ззовні — це приватна змінна, захищена замиканням.

// 🎛️ 2. Фабрики функцій з параметрами
// function makeMultiplier(factor) {
//   return function (number) {
//     return number * factor;
//   };
// }

// const double = makeMultiplier(2);
// const triple = makeMultiplier(3);

// console.log(double(5)); // 10
// console.log(triple(5)); // 15

// Кожна функція пам’ятає свій factor, навіть після завершення makeMultiplier.

// 🧠 3. Мемоізація (кешування результатів)
// function memoize(fn) {
//   const cache = {};

//   return function (key) {
//     if (cache[key]) return cache[key];
//     const result = fn(key);
//     cache[key] = result;
//     return result;
//   };
// }

// const slowSquare = memoize((x) => x * x);
// console.log(slowSquare(4)); // 16 (обчислюється)
// console.log(slowSquare(4)); // 16 (з кешу)

// cache живе в замиканні — і не доступний ззовні.

// ⏱️ 4. Таймери та асинхронні операції
// function delayedLogger(message, delay) {
//   setTimeout(function () {
//     console.log(message);
//   }, delay);
// }

// delayedLogger("Привіт із майбутнього!", 1000);

// Функція в setTimeout замикає message, навіть якщо delayedLogger вже завершилася.

// 🧩 5. Обробники подій з контекстом
// function setupButton(id, label) {
//   const button = document.getElementById(id);
//   button.addEventListener("click", function () {
//     console.log(`Clicked: ${label}`);
//   });
// }

// setupButton("saveBtn", "Зберегти");
// setupButton("cancelBtn", "Скасувати");

// Кожен обробник пам’ятає свій label, навіть якщо setupButton викликано давно.

// 🧪 6. Імітація приватних класів до ES6
// function SecretHolder(secret) {
//   return {
//     reveal() {
//       return secret;
//     }
//   };
// }

// const vault = SecretHolder("🔐 Секретний код");
// console.log(vault.reveal()); // 🔐 Секретний код

// До появи #private в класах, замикання були єдиним способом зробити змінні приватними.

// 🧠 Хочеш більше?
// Можу показати, як замикання використовуються в React (наприклад, у хуках), або як вони лежать в основі middleware у Next.js. Або навіть створити власну міні-бібліотеку з замиканням для керування станом.
// Ти хочеш приклад, який ближче до твоїх проєктів — скажімо, локалізація, роутинг чи обробка помилок?

// const scores = {};
// const player = "Andriy";
// scores[player] = 100
// console.log(scores)

// function validateUser(isAdmin) {
//   if (isAdmin === "Valeriy") {
//     const secretKey = "ABC123";
//     console.log(secretKey); // ✅ працює
//   }
//   // console.log(secretKey); // ❌ ReferenceError: Cannot access 'secretKey'
// }
// validateUser("Valeriy")
