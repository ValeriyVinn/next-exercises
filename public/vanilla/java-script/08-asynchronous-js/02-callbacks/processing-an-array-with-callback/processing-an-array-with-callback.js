import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "08-asynchronous-js",
  exerciseName: "Processing an array with callback",
  statement:
    "Write a function processArray(arr, callback) that processes each element of the array through a callback function.",
});
// 09.05.2025 - 20:40 --score is: 20:13
// 10.05.2025 - 21:30 --score is: 06:57
// ! Рішення ----------
// function processArray(arr, callback) {
//   arr.forEach((item, index) => {
//     callback(item, index);
//   });
// }

// processArray([1, 2, 3], (item, index) => {
//   console.log(`Item ${index + 1}: ${item}`);
// });
