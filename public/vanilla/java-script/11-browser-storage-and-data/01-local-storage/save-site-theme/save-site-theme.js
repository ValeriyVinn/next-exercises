import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "11-local-storage",
  exerciseName: "Saving the site theme",
  statement:
    "Implement switching the site theme ('light' / 'dark') and saving the selection in localStorage. When loading the page, set the previously saved theme.",
});

// ! Рішення ----------
// function toggleTheme() {
//   const currentTheme = localStorage.getItem("theme") || "light";
//   const newTheme = currentTheme === "light" ? "dark" : "light";
//   localStorage.setItem("theme", newTheme);
//   document.body.className = newTheme;
//   console.log(`Theme switched to: ${newTheme}`);
// }

// // Встановлення теми при завантаженні сторінки
// document.body.className = localStorage.getItem("theme") || "light";
// document.querySelector("#toggle-btn").addEventListener("click", toggleTheme);
