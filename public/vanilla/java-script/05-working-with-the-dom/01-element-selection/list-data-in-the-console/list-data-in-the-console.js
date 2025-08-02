import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "05-working-with-the-dom",
  exerciseName: "List data in the console",
  statement:
    "Log to the console the number and text of the headers according to the condition.",
});
// 10.05.2025 - 21:45 --score is: 08:13
// ! Рішення ----------

// const numberOfCategories = document.querySelectorAll(".item");

// console.log(`Number of categories: ${numberOfCategories.length}`);

// numberOfCategories.forEach((elem) => {
//   console.log(`Category: ${elem.firstElementChild.textContent}`);
//   console.log(`Elements: ${elem.lastElementChild.children.length}`);
// });