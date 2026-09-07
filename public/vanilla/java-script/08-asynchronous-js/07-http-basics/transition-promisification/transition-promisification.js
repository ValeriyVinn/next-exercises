// function animateElement(el, newStyles, callback) {
//   Object.assign(el.style, newStyles);
//   el.addEventListener("transitionend", () => {
//     callback();
//   }, { once: true });
// }

const box = document.getElementById("box");
animateElement(box, { width: "300px", backgroundColor: "blue" }, () => {
  console.log("Анімація завершена");
});

function animateElement(el, newStyles) {
  return new Promise(resolve => {
    Object.assign(el.style, newStyles);
    el.addEventListener("transitionend", () => resolve(), { once: true });
  });
}

async function runAnimation() {
  const box = document.getElementById("box");
  console.log("Анімація почалась");
  await animateElement(box, { width: "300px", backgroundColor: "blue" });
  console.log("Анімація завершена");
}

runAnimation();

