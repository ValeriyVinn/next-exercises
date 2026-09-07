import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "10-date-and-time",
  exerciseName: "User's last login date",
  statement: "Retrieve the user's last login date from localStorage.",
});

// ! Рішення ----------
// const lastVisit = localStorage.getItem("lastVisit");

// if (lastVisit) {
//   console.log(
//     `Ваш останній візит був: ${new Date(lastVisit).toLocaleString("uk-UA")}`
//   );
// } else {
//   console.log("Вітаємо! Це ваш перший візит.");
// }

// localStorage.setItem("lastVisit", new Date());
