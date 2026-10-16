"use strict";

function blockThread(ms) {
  const start = Date.now();
  while (Date.now() - start < ms) {}
}

console.log("1. Початок скрипту");

setTimeout(() => {
  console.log("3. Асинхронна операція виконана (setTimeout)");
}, 6000);

console.log("2. Запуск блокуючої операції на 3 секунди...");

blockThread(3000);

console.log("4. Блокуюча операція завершена, потік звільнено");
