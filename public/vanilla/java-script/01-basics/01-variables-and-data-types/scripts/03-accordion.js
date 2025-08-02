import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

setupExercise({
  fileKey: "01-basics",
  exerciseName: "Task 3: Accordion",
  statement: "Create accordion",
});

// ! --- Рішення ---

// JS
const accordionHeaders = document.querySelectorAll(".accordion-header");
const accordionContents = document.querySelectorAll(".accordion-content");

accordionHeaders.forEach((header) => {
  header.addEventListener("click", () => {
    const accordionItem = header.parentElement;
    const accordionContent = accordionItem.querySelector(".accordion-content");

    accordionContents.forEach((content) => {
      if (content !== accordionContent) {
        content.classList.remove("active");
        content.style.maxHeight = "0";
      }
    });

    accordionContent.classList.toggle("active");

    if (accordionContent.classList.contains("active")) {
      accordionContent.style.maxHeight = accordionContent.scrollHeight + "px";
    } else {
      accordionContent.style.maxHeight = "0";
    }
  });
});
// ?---------------------

// const header = document.querySelector(".accordion-header");
// const content = document.querySelector(".accordion-content");

// header.addEventListener("click", () => {
//   if (content.classList.contains("active")) {
//     content.style.maxHeight = "0";
//     content.classList.remove("active");
//   } else {
//     content.style.maxHeight = content.scrollHeight + "px";
//     content.classList.add("active");
//   }
// });
// ?---------------------
// const header = document.querySelector(".accordion-header");
// const content = document.querySelector(".accordion-content");

// header.addEventListener("click", () => {
//   if (content.classList.contains("open")) {
//     // Закриття
//     content.style.maxHeight = content.scrollHeight + "px"; // спочатку виставляємо реальну висоту
//     requestAnimationFrame(() => {
//       // на наступному кадрі анімуємо до 0
//       content.style.maxHeight = "0";
//     });
//     content.classList.remove("open");
//   } else {
//     // Відкриття
//     content.style.maxHeight = content.scrollHeight + "px";
//     content.classList.add("open");

//     // Після завершення анімації прибираємо обмеження
//     content.addEventListener("transitionend", function handler() {
//       content.style.maxHeight = "none";
//       content.removeEventListener("transitionend", handler);
//     });
//   }
// });
