
function waitForClick(el, callback) {
  el.addEventListener("click", () => {
    callback("Клік відбувся");
  }, { once: true });
}

const btn = document.getElementById("btn");
waitForClick(btn, (msg) => {
  console.log(msg);
});





// function waitForClick(el) {
//   return new Promise(resolve => {
//     el.addEventListener("click", () => resolve("Клік відбувся"), { once: true });
//   });
// }

// async function run() {
//   const btn = document.getElementById("btn");
//   console.log("Очікую на клік...");
//   const msg = await waitForClick(btn);
//   console.log(msg);
// }

// run();
