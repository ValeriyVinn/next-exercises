import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "01-basics",
  exerciseName: "Task 4: Modal Window",
  statement: "Create modal window",
});

// ! --- Рішення ---
const exampleOpenModalBtn = document.getElementById("example-openModal");
const exampleCloseModalBtn = document.getElementById("example-closeModal");
const exampleBackdrop = document.getElementById("example-backdrop");

function exampleOpenModal() {
  exampleBackdrop.classList.add("active");
}
function exampleCloseModal() {
  exampleBackdrop.classList.remove("active");
}
exampleOpenModalBtn.addEventListener("click", exampleOpenModal);
exampleCloseModalBtn.addEventListener("click", exampleCloseModal);
exampleBackdrop.addEventListener("click", (e) => {
  if (e.target === exampleBackdrop) {
    exampleCloseModal();
  }
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    exampleCloseModal();
  }
});