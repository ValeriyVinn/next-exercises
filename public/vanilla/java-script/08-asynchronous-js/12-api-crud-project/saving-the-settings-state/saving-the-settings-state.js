import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "08-asynchronous-js",
  exerciseName: "Saving the settings state",
  statement:
    "Implement a settingsManager() function that stores and updates settings. The settings are passed as an object.",
});

// ! Рішення ----------
// function settingsManager() {
//   let settings = {};

//   return {
//     set: function (key, value) {
//       settings[key] = value;
//       console.log(`Setting updated: ${key} = ${value}`);
//     },
//     get: function (key) {
//       return settings[key] || "Not found";
//     },
//     getAll: function () {
//       return { ...settings };
//     },
//   };
// }

// const manager = settingsManager();
// manager.set("theme", "dark"); // Setting updated: theme = dark
// manager.set("volume", 50); // Setting updated: volume = 50
// console.log(manager.get("theme")); // dark
// console.log(manager.getAll()); // { theme: "dark", volume: 50 }
