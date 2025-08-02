import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "08-asynchronous-js",
  exerciseName: "Consistent waiting",
  statement:
    "Create two asynchronous functions with different delays and call them sequentially.",
});

// ! Рішення ----------
// async function firstTask() {
//   await new Promise((resolve) => setTimeout(resolve, 1000));
//   console.log("First task done");
// }

// async function secondTask() {
//   await new Promise((resolve) => setTimeout(resolve, 2000));
//   console.log("Second task done");
// }

// async function runTasks() {
//   await firstTask();
//   await secondTask();
// }

// runTasks();
