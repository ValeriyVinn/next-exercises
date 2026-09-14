import { setupExercise } from "../../../../scripts/html-css-exercise-handler.js";

setupExercise({
  fileKey: "03-interactivity-and-effects",
  exerciseName: "Fixed header",
  statement: "Create a fixed header.",
});

// ! Рішення ----------

const {height: pageHeaderHeight} = document.getElementById("page-header").getBoundingClientRect()
console.log(pageHeaderHeight)
const qwer = document.body.style.paddingTop = `${pageHeaderHeight}px`
