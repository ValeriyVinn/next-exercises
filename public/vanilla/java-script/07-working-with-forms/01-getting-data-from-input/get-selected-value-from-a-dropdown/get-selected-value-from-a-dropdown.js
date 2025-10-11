document.getElementById("showColorBtn").addEventListener("click", () => {
  const selectedColor = document.getElementById("colorSelect").value;
  const output = document.getElementById("colorOutput");

  if (selectedColor) {
    output.textContent = `You chose: ${selectedColor}`;
    output.style.color = selectedColor;
  } else {
    output.textContent = "Please select a color.";
  }
});