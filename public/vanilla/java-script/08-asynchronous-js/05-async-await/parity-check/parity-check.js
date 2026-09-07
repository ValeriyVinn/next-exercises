import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "08-asynchronous-js",
  exerciseName: "Parity check",
  statement:
    "Implement a checkNumber function that returns the result after 2 seconds.",
});

// ! Рішення ----------
// async function checkNumber(num) {
//   return new Promise((resolve) =>
//     setTimeout(() => resolve(num % 2 === 0 ? "Even" : "Odd"), 2000)
//   );
// }

// async function run() {
//   const result = await checkNumber(5);
//   console.log(result);
// }

// run();
