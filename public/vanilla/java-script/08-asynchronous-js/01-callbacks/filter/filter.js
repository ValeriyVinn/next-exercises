import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "08-asynchronous-js",
  exerciseName: "Filter",
  statement:
    "Write a function to filter an array that takes two parameters - an array and a callback that filters this array.",
});

// ! Рішення ----------

// const filter = function (array, test) {
//   const filteredArray = [];
//   for (const el of array) {
//     const passed = test(el);
//     if (passed) {
//       filteredArray.push(el);
//     }
//   }
//   return filteredArray;
// };

// function positive(value) {
//   return value > 0;
// }
// function negative(value) {
//   return value < 0;
// }

// const result1 = filter([3, -12, 34, -2], positive);
// console.log(result1);
// const result2 = filter([4, -64, 11, -56, 67, -2], negative);
// console.log(result2);

// const fruits = [
//   { name: "apple", quantity: 200, isFresh: true },
//   { name: "grape", quantity: 150, isFresh: false },
//   { name: "banana", quantity: 100, isFresh: true },
//   { name: "orange", quantity: 400, isFresh: true },
//   { name: "pear", quantity: 15, isFresh: false },
// ];
// const freshFruits = function (fruit) {
//   return fruit.isFresh === false;
// };
// const result3 = filter(fruits, freshFruits);
// console.log(result3);
