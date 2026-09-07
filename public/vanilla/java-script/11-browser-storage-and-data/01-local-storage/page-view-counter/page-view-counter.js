import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "11-local-storage",
  exerciseName: "Page view counter",
  statement:
    "Every time the page loads, increment a counter in sessionStorage and print its value. If the page is closed and reopened, the counter should reset to zero.",
});

// ! Рішення ----------
// function visitCounter() {
//   let count = sessionStorage.getItem("visitCount") || 0;
//   count = Number(count) + 1;
//   sessionStorage.setItem("visitCount", count);
//   console.log(`Visit count: ${count}`);
// }

// visitCounter();
