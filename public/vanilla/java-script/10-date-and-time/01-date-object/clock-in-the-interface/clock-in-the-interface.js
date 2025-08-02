import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "10-date-and-time",
  exerciseName: "Сlock in the interface",
  statement: "Create a clock that updates every second in the browser.",
});

// ! Рішення ----------
// const clockEl = document.getElementById("clock");

// setInterval(() => {
//   clockEl.textContent = new Date().toLocaleTimeString();
// }, 1000);
