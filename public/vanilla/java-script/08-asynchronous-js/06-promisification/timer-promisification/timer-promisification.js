// function delay(ms, callback) {
//   setTimeout(() => {
//     callback(`Минуло ${ms} мс`);
//   }, ms);
// }

// // Використання:
// delay(2000, (msg) => {
//   console.log(msg);
// });


function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Використання:
async function run() {
  console.log("Старт");
  await delay(2000); // чекаємо 2 секунди
  console.log("Минуло 2 секунди");
}

run();

