import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "08-asynchronous-js",
  exerciseName: "Checking the status of the response",
  statement:
    "Implement a function that displays the response status after a request.",
});

// ! Рішення ----------
// async function fetchData(url) {
//   try {
//     const response = await fetch(url);
//     console.log(`Status: ${response.status}`);
//     const data = await response.json();
//     console.log(data);
//   } catch (error) {
//     console.error("Fetch failed:", error);
//   }
// }

// fetchData("https://jsonplaceholder.typicode.com/todos/1");
