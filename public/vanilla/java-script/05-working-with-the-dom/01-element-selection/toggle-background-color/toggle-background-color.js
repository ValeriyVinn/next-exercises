import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "05-working-with-the-dom",
  exerciseName: "Toggle background color",
  statement:
    "There are several buttons on a page. Write a script that toggled the color of the button to yellow or antiquewhite when clicked.",
});

// ! Рішення ----------

const highlightButtons = document.querySelectorAll(".action-btn");

highlightButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    btn.classList.toggle("yellow");
  });
});
