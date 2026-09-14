const selectEl = document.getElementById("displaySelect");
const container1 = document.getElementById("container1");
const container2 = document.getElementById("container2");

selectEl.addEventListener("change", (e) => {
  changeDisplay(e.target.value);
});

class Display {
  constructor(display) {
    this.display = display;
  }
  setDisplay(newDisplay) {
    this.display = newDisplay;
  }
}

const article1 = new Display("inline-grid");

function changeDisplay(displayValue) {
  container1.classList.remove("inline-grid", "grid");
  container2.classList.remove("inline-grid", "grid");

  container1.classList.add(displayValue);
  container2.classList.add(displayValue);

  article1.setDisplay(displayValue);
}

document.addEventListener("DOMContentLoaded", () => {
  selectEl.value = "inline-grid";
  changeDisplay("inline-grid");
});
