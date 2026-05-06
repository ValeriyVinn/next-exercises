const container = document.querySelector(".one-container");
const select = document.querySelector("#displayMode");

select.addEventListener("change", () => {
  container.style.display = select.value;
});