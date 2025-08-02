import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "01-basics",
  exerciseName: "Type Checker",
  statement:
    "Create variables of each primitive type (string, number, boolean, undefined, null). Use typeof to print the type of each.",
});

// ! Рішення ----------

const number = 8;
const string = "Hello Cake";
const isMorning = true;
let find;
const value = null;

console.log(
  typeof number,
  typeof string,
  typeof isMorning,
  typeof find,
  typeof value
);
