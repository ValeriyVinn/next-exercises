"use strict";

const button = document.getElementById("button");
const answer = document.getElementById("answer");
const isSuccess = document.getElementById("is-success");

const API_URL = "http://localhost:4000/api/answer-color";

button.addEventListener("click", () => {
  answer.textContent =
    "Пан Степан — володар першого створеного промісу цього застосунку.";

  isSuccess.textContent = "Проміс виконується...";
  isSuccess.className = "pending";

  button.disabled = true;

  const myPromise = new Promise((resolve, reject) => {
    setTimeout(async () => {
      try {
        const response = await fetch(API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status}`);
        }

        const result = await response.json();

        if (result.is_correct) {
          resolve(result);
        } else {
          reject(result);
        }
      } catch (error) {
        reject(error);
      }
    }, 1000);
  });

  myPromise
    .then((result) => {
      isSuccess.textContent = "І його проміс працює!";
      isSuccess.className = "success";
      isSuccess.style.color = result.color;
    })
    .catch((error) => {
      if (error instanceof Error) {
        isSuccess.textContent =
          "Технічна помилка: не вдалося отримати результат.";

        console.error(error);
        isSuccess.className = "failure";
        return;
      }

      isSuccess.textContent =
        "Але його проміс поки що не працює!";

      isSuccess.className = "failure";
      isSuccess.style.color = error.color;
    })
    .finally(() => {
      button.disabled = false;
    });
});