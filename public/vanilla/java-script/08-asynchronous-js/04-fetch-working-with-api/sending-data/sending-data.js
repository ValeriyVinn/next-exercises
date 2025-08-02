import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "08-asynchronous-js",
  exerciseName: "Sending data",
  statement: "Send a POST request with the user object and print the response.",
});

// ! Рішення ----------
// async function createUser(data) {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   const result = await response.json();
//   console.log(result);
// }

// createUser({ name: "John", age: 30 });
