import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "08-asynchronous-js",
  exerciseName: "Make Sheff",
  statement:
    "Write a function 'MakeCheff' with a parameter name that returns a function 'MakeDish' with a parameter dish so that when 'MakeCheff' is called, the console will display the string '{name} cooks {dish}'",
});

// ! Рішення ----------
// const makeSheff = function (name) {
//     const makeDish = function (dish) {
//         console.log(`${name} cooks ${dish}`)
//     }
//     return makeDish
// }

// const robert = makeSheff("Robert")
// console.log(robert)
// const zlatan = makeSheff("Zlatan")

// robert("spaghetti")
// zlatan("soup")