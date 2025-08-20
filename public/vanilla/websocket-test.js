

const socket = new WebSocket("ws://localhost:8080");
const log = document.getElementById("log");
const typingInput = document.getElementById("typing");
const timerDisplay = document.getElementById("timer");

let startTime = null;
let timerInterval = null;

// WebSocket events
socket.onopen = () => {
  log.innerHTML += "✅ Connected to server<br>";
};

socket.onmessage = (event) => {
  log.innerHTML += `📨 Message: ${event.data}<br>`;
};

socket.onerror = (err) => {
  log.innerHTML += `❌ Error: ${err.message}<br>`;
};

socket.onclose = () => {
  log.innerHTML += `🔌 Disconnected from server<br>`;
};

document.getElementById("send").onclick = () => {
  if (socket.readyState === WebSocket.OPEN) {
    socket.send("Hello from client");
  }
};

// Таймер — запуск при першому введенні
typingInput.addEventListener("keydown", () => {
  if (startTime !== null) return; // вже запущено

  startTime = performance.now();

  timerInterval = setInterval(() => {
    const elapsed = (performance.now() - startTime) / 1000;
    timerDisplay.textContent = elapsed.toFixed(3);
  }, 10);
});

// Таймер — зупинка при кліку в будь-яке місце сторінки
document.body.addEventListener("click", () => {
  if (startTime === null) return; // ще не почалося

  clearInterval(timerInterval);
  const total = (performance.now() - startTime) / 1000;
  timerDisplay.textContent = total.toFixed(3);
  log.innerHTML += `⏹ Зупинено таймер: ${total.toFixed(3)} с<br>`;

  // можна надіслати результат на сервер
  if (socket.readyState === WebSocket.OPEN) {
    socket.send(`Таймер: ${total.toFixed(3)} с`);
  }

  // скидаємо
  startTime = null;
});
