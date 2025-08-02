import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "09-algorithms-and-logic",
  exerciseName: "Number of specific char",
  statement: "Count the number of occurrences of a specific character.",
});

// ! Рішення ----------

// function countChar(str, char) {
//   return str.toLowerCase().split("").filter((ch) => ch === char).length;
// }

// console.log(countChar("Ababagalamaga", "a"));
// console.log(
//   countChar("Count the number of occurrences of a specific character.", " ")
// );
