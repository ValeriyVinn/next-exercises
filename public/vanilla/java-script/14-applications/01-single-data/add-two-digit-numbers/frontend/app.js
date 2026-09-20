const numberOne = document.getElementById("number1");
const numberTwo = document.getElementById("number2");
const result = document.getElementById("result");
const answer = document.getElementById("answer");
const generateBtn = document.getElementById("generate-button");
const checkBtn = document.getElementById("check-button");

generateBtn.addEventListener("click", () => {
  numberOne.textContent = Math.floor(Math.random() * 90) + 10;
  numberTwo.textContent = Math.floor(Math.random() * 90) + 10;

  answer.value = "";
  answer.style.backgroundColor = "";
  result.textContent = "";
});

checkBtn.addEventListener("click", async () => {
  if (answer.value.trim() === "") {
    result.textContent = "Please, give me answer!";
    return;
  }

  const num1 = parseInt(numberOne.textContent, 10);
  const num2 = parseInt(numberTwo.textContent, 10);
  const userAnswer = parseInt(answer.value, 10);

  const isCorrect = userAnswer === num1 + num2;

  try {
    const response = await fetch(
      `http://localhost:3000/api/answer-color?isCorrect=${isCorrect}`
    );

    if (!response.ok) {
      throw new Error("Failed to get answer color");
    }

    const data = await response.json();

    answer.style.backgroundColor = data.color;

    if (isCorrect) {
      result.textContent = "Answer is correct";
    } else {
      result.textContent = "Answer is not correct";
    }
  } catch (error) {
    console.error(error);
    result.textContent = "Server error";
  }
});