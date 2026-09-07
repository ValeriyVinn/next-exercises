import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "11-local-storage",
  exerciseName: "Saving a task list",
  statement:
    "Implement the addTask(task) and getTasks() functions to work with the list of tasks in localStorage. Add a new task to the array. Get all saved tasks.",
});

// ! Рішення ----------
// function addTask(task) {
//   const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//   tasks.push(task);
//   localStorage.setItem("tasks", JSON.stringify(tasks));
//   console.log(`Task added: ${task}`);
// }

// function getTasks() {
//   const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
//   console.log("Tasks:", tasks);
// }

// // Додавання завдання та виведення списку
// addTask("Learn JS");
// addTask("Build a project");
// getTasks();