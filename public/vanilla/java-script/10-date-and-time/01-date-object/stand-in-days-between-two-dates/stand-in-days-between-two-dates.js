import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "10-date-and-time",
  exerciseName: "Stand in days between two dates",
  statement: "Calculate how many days are left until the New Year.",
});

// ! Рішення ----------

// const event = "Pampi"
// const daysEl = document.getElementById("days");
// const eventEl = document.getElementById("event")

// const dateTheNY = new Date("2025-06-10 00:00:00")
// const dateNow = new Date()
// const diff = dateTheNY-dateNow
// const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

// eventEl.textContent = event
// daysEl.textContent = `${days} days`