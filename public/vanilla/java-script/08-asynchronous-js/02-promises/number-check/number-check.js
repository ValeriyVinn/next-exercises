import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "08-asynchronous-js",
  exerciseName: "Number check",
  statement:
    "Create a function isEven(number) that returns a promise. If the number is even, the promise is executed, otherwise, it is rejected.",
});

// ! Рішення ----------
// function isEven(number) {
//   return new Promise((resolve, reject) => {
//     if (number % 2 === 0) {
//       resolve("Even number");
//     } else {
//       reject("Odd number");
//     }
//   });
// }

// isEven(12).then(console.log).catch(console.error);


// function isEven(number) {
//   return new Promise((resolve, reject) => {
//     number%2===0? resolve("Even number") : reject("Something else")
//   })

// }
// isEven(5).then(console.log).catch(console.error)