document.getElementById("calcBtn").addEventListener("click", () => {
  const price = parseFloat(document.getElementById("price").value);
  const qty = parseInt(document.getElementById("quantity").value);
  const total = document.getElementById("total");

  if (!isNaN(price) && !isNaN(qty)) {
    total.textContent = `Total: $${(price * qty).toFixed(2)}`;
  } else {
    total.textContent = "Please enter valid numbers.";
  }
});