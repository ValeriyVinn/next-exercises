import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "08-asynchronous-js",
  exerciseName: "Getting data from the API",
  statement:
    "Get a list of users from the API https://jsonplaceholder.typicode.com/users and print the names.",
});

// ! Рішення ----------
// async function fetchUsers() {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users");
//   const users = await response.json();
//   users.forEach((user) => console.log(user.name));
// }

// fetchUsers();
