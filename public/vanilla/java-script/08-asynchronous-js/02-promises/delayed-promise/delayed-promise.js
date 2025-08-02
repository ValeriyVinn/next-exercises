import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "08-asynchronous-js",
  exerciseName: "Delayed promise",
  statement:
    "Write a function delay(ms) that returns a promise that will be fulfilled after a given time.",
});

// ! Рішення ----------

// const fetchUserFromServer = (username) => {
//   return new Promise((resolve, reject) => {
//     console.log(`I promise you, ${username}`);
    
//     setTimeout(() => {
//      const isSuccess = Math.random() > 0.5; 
//       if (isSuccess) {
//         resolve("Here's a star for you, Chunga!");
//       } else {
//         reject("Sorry, all the stars have gone out, Chunga!");
//       }
//     }, 3000);
//   });
// };
// fetchUserFromServer("Chunga")
//   .then((user) => console.log(user))
//   .catch((error) => console.error(error));
