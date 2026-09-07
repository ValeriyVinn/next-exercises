import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "11-local-storage",
  exerciseName: "Saving an object to localStorage",
  statement:
    "Save the user object with name and age to localStorage in JSON format. Print it back to the console as an object.",
});

// ! Рішення ----------
// const user = { name: "John", age: 30 };
// localStorage.setItem("user", JSON.stringify(user));

// const storedUser = JSON.parse(localStorage.getItem("user"));
// console.log(storedUser);
