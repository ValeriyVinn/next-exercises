const btn = document.getElementById('btn');

btn.addEventListener('click', () => {
  console.log("Waiting...");
  setTimeout(() => {
    console.log("Hello there!");
  }, 2000);
});