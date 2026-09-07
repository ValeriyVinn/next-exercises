// import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

// setupExercise({
//   fileKey: "08-asynchronous-js",
//   exerciseName: "Counter with memory",
//   statement:
//     "Implement a function createCounter() that returns another function. This inner function increments the counter by 1 each time it is called.",
// });

// ! Рішення ----------
// function createCounter() {
//   let count = 0;
//   return function () {
//     count += 1;
//     console.log(`Current count: ${count}`);
//   };
// }

// const counter = createCounter();
// console.log(counter);
// counter();
// counter();
// counter();
// counter()

function createCounter() {
  let count = 0;
  return () => {
    count += 1;
    console.log(`Current count ${count}`);
  };
}

const counter = createCounter();
counter()
counter()
