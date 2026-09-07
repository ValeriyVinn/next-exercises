import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "11-local-storage",
  exerciseName: "Saving username",
  statement:
    "Write a function saveName(name) that saves the username to localStorage. Also create a function getName() that prints the saved name or reports that the name is not specified.",
});

// ! Рішення ----------
// function saveName(name) {
//   localStorage.setItem("username", name);
//   console.log(`Name saved: ${name}`);
// }

// function getName() {
//   const name = localStorage.getItem("username");
//   console.log(name ? `Hello, ${name}!` : "No name found.");
// }

// // Збереження та отримання імені
// saveName("Alex");
// getName();
