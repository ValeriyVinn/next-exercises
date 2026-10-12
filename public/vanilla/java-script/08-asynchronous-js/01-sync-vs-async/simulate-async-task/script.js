"use strict";

function fetchUserData(userId, callback) {
  console.log(`[1] Запит даних для користувача з ID: ${userId}...`);

  setTimeout(() => {
    const user = {
      id: userId,
      name: "Valeriy",
      role: "Developer",
    };

    console.log("[2] Дані успішно отримані від сервера!");

    callback(user);
  }, 5000);
}

console.log("Початок програми");

fetchUserData(42, (data) => {
  console.log("[3] Колбек спрацював. Отримані дані:", data);
});

console.log("Кінець програми (код продовжує виконуватися далі)");