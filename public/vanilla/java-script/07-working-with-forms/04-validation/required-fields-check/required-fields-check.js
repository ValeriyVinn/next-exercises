const form = document.getElementById("userForm");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const inputs = form.querySelectorAll("input");
  let allFilled = true;

  inputs.forEach((input) => {
    const existingError = input.nextElementSibling;
    if (existingError && existingError.classList.contains("error")) {
      existingError.remove();
    }

    if (input.value.trim() === "") {
      allFilled = false;
      const error = document.createElement("span");
      error.textContent = "This field is required";
      error.style.color = "red";
      error.classList.add("error");
      input.insertAdjacentElement("afterend", error);
    }
  });

  if (allFilled) alert("Form submitted successfully!");
});