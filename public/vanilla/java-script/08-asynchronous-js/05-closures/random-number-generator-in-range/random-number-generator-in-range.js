import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "08-asynchronous-js",
  exerciseName: "Random number generator in range",
  statement:
    "Write a function randomInRange(min, max) that returns another function to generate random numbers in a given range.",
});

// ! Рішення ----------
// function randomInRange(min, max) {
//   return function () {
//     return Math.floor(Math.random() * (max - min + 1)) + min;
//   };
// }

// const randomFrom1To10 = randomInRange(1, 10);
// console.log(randomFrom1To10()); // Наприклад, 7
// console.log(randomFrom1To10()); // Наприклад, 3
