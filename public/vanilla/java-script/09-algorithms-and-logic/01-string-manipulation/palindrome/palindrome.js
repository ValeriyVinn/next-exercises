import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "09-algorithms-and-logic",
  exerciseName: "Palindrome",
  statement: "Check if a string is a palindrome.",
});

// ! Рішення ----------

// function isPalindrome(str) {
//   if (str.toLowerCase().split("").reverse().join("") === str.toLowerCase()) {
//     console.log(`${str} is a palindrome`);
//   } else {
//     console.log(`${str} is not a palindrome`);
//   }
// }

// isPalindrome("Racecar");
// isPalindrome("Hello");

// function isPalindrome(str) {
//   str.toLowerCase().split("").reverse().join("") === str.toLowerCase() ? console.log(`${str} is palindrome` ) : console.log(`${str} is not palindrome`)
// }
// isPalindrome("Racecar");
// isPalindrome("Hello");