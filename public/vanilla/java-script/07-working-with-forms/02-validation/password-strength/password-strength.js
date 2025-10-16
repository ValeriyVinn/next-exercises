const passwordInput = document.getElementById("passwordInput");
const message = document.getElementById("strengthMessage");

passwordInput.addEventListener("input", () => {
  const pwd = passwordInput.value;
  let strength = 0;

  if (pwd.length >= 8) strength++;
  if (/[A-Za-z]/.test(pwd) && /\d/.test(pwd)) strength++;
  if (/[^A-Za-z0-9]/.test(pwd)) strength++;

  if (strength === 0) {
    message.textContent = "";
  } else if (strength === 1) {
    message.textContent = "Weak";
    message.style.color = "red";
  } else if (strength === 2) {
    message.textContent = "Medium";
    message.style.color = "orange";
  } else {
    message.textContent = "Strong";
    message.style.color = "green";
  }
});