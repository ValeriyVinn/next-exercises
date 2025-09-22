// import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

// setupExercise({
//   fileKey: "08-asynchronous-js",
//   exerciseName: "Countdown timer",
//   statement:
//     "Create a function countdown(start, callback) that counts down from a given number to zero at 1 second intervals.",
// });

// ! Рішення ----------

// const countdownTimerEl = document.getElementById("countdown-timer");

// const countdownTimer = function (start, todo, message) {
//   let current = start;
//   countdownTimerEl.textContent = "Get ready?";
//   const timer = setInterval(() => {
//     countdownTimerEl.textContent = current;

//     current -= 1;
//     if (current < 0) {
//       clearInterval(timer);
//       todo(message);
//     }
//   }, 1000);
// };

// const todo = function (message) {
//   countdownTimerEl.textContent = message;
// };

// // const play = "Let's play";
// // countdownTimer(3, todo, play);
// const sleep = "Let's sleep";
// countdownTimer(5, todo, sleep);


