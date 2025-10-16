const emailInput = document.getElementById("emailInput");
const message = document.getElementById("message");
const button = document.getElementById("checkEmail");

button.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (regex.test(email)) {
    message.textContent = "Valid email!";
    message.style.color = "green";
  } else {
    message.textContent = "Invalid email format.";
    message.style.color = "red";
  }
});