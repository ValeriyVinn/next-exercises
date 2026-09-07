import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "09-algorithms-and-logic",
  exerciseName: "Reverse the string",
  statement: "Reverse the string.",
});

// ! Рішення ----------

// function reverseString(str, delimiter) {
// return str.split(delimiter).reverse().join(delimiter)  
// }

// console.log(reverseString("Racecar", ""))
// console.log(reverseString("one two three", " "))