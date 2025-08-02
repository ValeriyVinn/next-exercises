import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "01-basics",
  exerciseName: "Personal Info Card",
  statement:
    "Create variables to store your name, age, and whether you’re a student (true/false). Print a message to the console using these values.",
});

// ! Рішення ----------

// import { differenceInYears } from "https://cdn.skypack.dev/date-fns/differenceInYears.mjs";

// const firstName = "Valeriy";
// const age = differenceInYears(new Date(), new Date("1970-02-22"));
// let isStudent = false;

// console.log(
//   `My name is ${firstName}, ${age} years old, my student status is "${isStudent}"`
// );
