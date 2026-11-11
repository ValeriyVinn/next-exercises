"use strict";


const colorInput = document.getElementById("colorInput");
const searchButton = document.getElementById("searchButton");
const answer = document.getElementById("answer");

const API_URL = "http://localhost:4000/api/colors";

searchButton.addEventListener("click", () => {
  const colorName = colorInput.value.trim();

  // Перевіряємо, чи введено назву кольору
  if (!colorName) {
    answer.textContent = "Please enter a color name.";
    answer.className = "answer failure";
    return;
  }

  // Очищуємо попередню відповідь
  answer.textContent = "Jupiter is looking for your color...";
  answer.className = "answer pending";

  searchButton.disabled = true;

  // Створюємо власний Promise
  const myPromise = new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fetch(
          `${API_URL}/${encodeURIComponent(colorName)}`,
        );

        const result = await response.json();

        // Якщо сервер повідомив про помилку
        if (!response.ok) {
          const error = new Error(
            result.message || "Something went wrong.",
          );

          error.status = response.status;

          reject(error);
          return;
        }

        // Якщо колір знайдено
        resolve(result);
      } catch (error) {
        // Помилка мережі або інша технічна помилка
        reject(error);
      }
    }, 1000);
  });

  // Успішне завершення Promise
  myPromise
    .then((result) => {
      const color = result.color;

      const rgb = `rgb(${color.rgb_r}, ${color.rgb_g}, ${color.rgb_b})`;

      answer.textContent =
        `The color is ${color.name}. HEX: ${color.hex}; RGB: ${rgb}.`;

      answer.className = "answer success";
      answer.style.color = color.hex;
      answer.style.backgroundColor = `${color.hex}20`;
    })

    // Відхилення Promise
    .catch((error) => {
      answer.style.color = "";
      answer.style.backgroundColor = "";

      if (error.status === 404) {
        answer.textContent = error.message;
      } else {
        answer.textContent =
          "Technical error: could not get the color from the server.";

        console.error(error);
      }

      answer.className = "answer failure";
    })

    // Виконується незалежно від результату
    .finally(() => {
      searchButton.disabled = false;
    });
});