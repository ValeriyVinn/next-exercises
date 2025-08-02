import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "08-asynchronous-js",
  exerciseName: "Asynchronous greeting",
  statement: "Write an asynchronous greet function with a delay of 1 second.",
});

// ! Рішення ----------
async function greet() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("Hello after 1 second!");
}

greet();
