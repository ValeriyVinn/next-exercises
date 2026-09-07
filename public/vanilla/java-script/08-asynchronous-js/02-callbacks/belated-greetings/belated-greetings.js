// import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

// setupExercise({
//   fileKey: "08-asynchronous-js",
//   exerciseName: "Belated greetings",
//   statement:
//     "Write a function greet(name, callback) that takes a name and a callback function. Print a 'Greeting complete!' after 3 seconds.",
// });
// 09.05.2025 - 20:25 --score is: 6:39
// 09.05.2025 - 20:40 --score is: 4:30
// 10.05.2025 - 21:10 --score is: 6:37
// ! Рішення ----------

// function belatedAnswer(sheff, staff, callback){
//   console.log(`My name is ${sheff}. What is in your ass, ${staff}?`)
//   setTimeout(()=> {
//     callback(sheff)
//   }, 3000)
// }

// const onlyPenny = function (staff){
//   console.log(`It's only penny ${staff}`)
// }
// belatedAnswer("John", "Bob", onlyPenny)

// const majesticPhenomenon = function (staff){
//   console.log(`It's burning majestic phenomenon, ${staff}`)
// }
// belatedAnswer ("Grusin", "Darja", majesticPhenomenon)