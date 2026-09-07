import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "08-asynchronous-js",
  exerciseName: "Sequence of promises",
  statement:
    "Create a sequence of two promises: the first waits for 1 second, the second for 2 seconds.",
});

// ! Рішення ----------
// function wait(seconds) {
//   return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
// }

// wait(1)
//   .then(() => {
//     console.log("1 second passed");
//     return wait(2);
//   })
//   .then(() => {
//     console.log("2 seconds passed");
//     return wait(4);
//   })
//   .then(() => console.log("4 seconds passed"));

// --------------------------------------------
// const ifSuccess = Math.random() > 0.5;
// console.log(ifSuccess);
// function wait(seconds) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (ifSuccess) {
//         resolve("Yes");
//       } else {
//         reject("No");
//       }
//     }, seconds * 1000);
//   });
// }

// wait(2)
//   .then(() => {
//     console.log("1 Yes");
//     return wait(4);
//   })
//   .then(() => console.log("2 Yes"))
//   .catch(() => console.log("2 No"));
// ----------------------------------------------

// function wait(name, seconds) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       if (Math.random() > 0.5) {
//         resolve(`${name}: Yes`);
//       } else {
//         reject(`${name}: No`);
//       }
//     }, seconds * 1000);
//   });
// }

// wait("Step 1", 2)
//   .then((msg) => {
//     console.log(msg);
//     return wait("Step 2", 3);
//   })
//   .then((msg) => {
//     console.log(msg);
//   })
//   .catch((err) => {
//     console.error("❌", err);
//   });

// const typingHeaderEl = document.getElementById("typing-header");

// function runningString(str) {
//   const arrayOfLetter = str.split("");
//   let index = 0;

//   const interval = setInterval(() => {
//     typingHeaderEl.insertAdjacentHTML("beforeend", arrayOfLetter[index]);
//     index += 1;
//     if (index >= arrayOfLetter.length) {
//       clearInterval(interval);
//     }
//   }, 200);
// }

// runningString("Чим я можу вам допомогти?");

// const typingHeaderEl = document.getElementById("typing-header-message");
// const typingHeaderAnswerEl = document.getElementById("typing-header-answer");
// const typingHeaderDollarEl = document.getElementById("typing-header-dollar");

// function runningString(str) {
//   if (!str) return;

//   typingHeaderEl.textContent = "";
//   const arrayOfLetter = str.split("");
//   let index = 0;

//   const interval = setInterval(() => {
//     typingHeaderEl.textContent += arrayOfLetter[index];
//     index += 1;
//     if (index >= arrayOfLetter.length) {
//       clearInterval(interval);
//     }
//   }, 150);

//   setTimeout(() => {
//     typingHeaderDollarEl.textContent = "$$$";
//   }, 4500);

//   setTimeout(() => {
//     typingHeaderAnswerEl.textContent = "you've got it";
//   }, 5500);
// }

// runningString("If you want code");


// const typing = {
//   messageEl: document.getElementById("typing-header-message"),
//   dollarEl: document.getElementById("typing-header-dollar"),
//   answerEl: document.getElementById("typing-header-answer"),

//   type(text, onComplete) {
//     this.messageEl.textContent = "";
//     const letters = text.split("");
//     let index = 0;

//     const interval = setInterval(() => {
//       this.messageEl.textContent += letters[index];
//       index++;
//       if (index >= letters.length) {
//         clearInterval(interval);
//         if (onComplete) onComplete();
//       }
//     }, 150);
//   },

//   run(messageText) {
//     this.dollarEl.textContent = "";
//     this.answerEl.textContent = "";
//     this.type(messageText, () => {
//       setTimeout(() => {
//         this.dollarEl.textContent = "$$$";
//       }, 1300);
//       setTimeout(() => {
//         this.answerEl.textContent = "you've got it";
//       }, 2000);
//     });
//   },
// };

// typing.run("If you want code");
