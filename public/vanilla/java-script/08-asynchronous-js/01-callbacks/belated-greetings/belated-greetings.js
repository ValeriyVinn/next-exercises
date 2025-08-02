import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "08-asynchronous-js",
  exerciseName: "Belated greetings",
  statement:
    "Write a function greet(name, callback) that takes a name and a callback function. Print a 'Greeting complete!' after 3 seconds.",
});
// 09.05.2025 - 20:25 --score is: 6:39
// 09.05.2025 - 20:40 --score is: 4:30
// 10.05.2025 - 21:10 --score is: 6:37
// ! Рішення ----------

// function belatedGreeting(name, callback) {
//   console.log(`Where is ${name}?`)
//   setTimeout(() => {
//     callback()
//   },3000)
// }
// // function heIsSick() {
// //   console.log(`He is sick today.`);
// // }
// function behindYou() {
//   console.log(`Look around, he's behind you`);
// }

// // belatedGreeting("Alex", heIsSick)
// belatedGreeting("Brandon", behindYou)