let count = 5;
const counter = document.getElementById('count');

const timer = setInterval(() => {
  counter.textContent = count;
  console.log(count);
  count--;

  if (count < 0) {
    clearInterval(timer);
    counter.textContent = "Time’s up!";
    console.log("Time’s up!");
  }
}, 1000);