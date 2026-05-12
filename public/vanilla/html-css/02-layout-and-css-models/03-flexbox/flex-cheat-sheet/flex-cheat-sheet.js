const selectEl = document.getElementById("displaySelect");
const content = document.getElementById("ui-container");

selectEl.addEventListener("change", (e) => {
  changeDirection(e.target.value);
});

class Direction {
  constructor(direction) {
    this.direction = direction;
  }
  setDirection(newDirection) {
    this.direction = newDirection;
  }
}

const article1 = new Direction("row");

function changeDirection(directionValue) {
  content.classList.remove("row", "column");
  content.classList.add(directionValue);
  article1.setDirection(directionValue);
}

document.addEventListener("DOMContentLoaded", () => {
  selectEl.value = "row";
content.classList.add("row");
});
