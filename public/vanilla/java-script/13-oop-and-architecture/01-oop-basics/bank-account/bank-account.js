const bankAccountEl = document.getElementById("bank-account");

function layout() {
  const account = `
    <div class="ui-container" id="ui-container">
      <h2 class="account-name" id="account-name">Welcome to the app</h2>
      <div id="account-details" class="account-details">0</div>
      <div id="account-message" class="account-message">Account Details </div>
      <input type="number" class="account-input" id="account-input" placeholder="Enter the transaction amount" />
      <div class="button-wrapper">
        <button class="button" id="btn-deposit">Deposit</button>
        <button class="button" id="btn-withdraw">Withdraw</button>
      </div>
    </div>
    `;

  bankAccountEl.innerHTML = account;
}
layout();

const accoutnNameEl = document.getElementById("account-name");
const accountDetailsEl = document.getElementById("account-details");
const accountMessage = document.getElementById("account-message");
const accountInputEl = document.getElementById("account-input");
const depositBtnEl = document.getElementById("btn-deposit");
const withdrawBtnEl = document.getElementById("btn-withdraw");

class BankAccount {
  constructor({ owner, balance }) {
    this.balance = balance;
    this.owner = owner;
  }

  showOwner() {
    return this.owner;
  }
  getBalance() {
    return this.balance;
  }
  deposit(amount) {
    this.balance = this.balance + amount;
  }
  withdraw(amount) {
    this.balance = this.balance - amount;
  }
}

const diego = new BankAccount({ owner: "Diego", balance: 1000 });

function deposit() {
  const amount = Number(accountInputEl.value);
  if (accountInputEl.value === "") {
    accountMessage.textContent = "Please enter numbers.";
  } else if (amount === 0) {
    accountMessage.textContent = "You entered 0 - you did it in vain.";
  } else if (amount < 0) {
    accountMessage.textContent =
      "You entered less than zero - you did it in vain.";
  } else {
    diego.deposit(amount);
    accountMessage.textContent = "Now you have more money.";
    accountDetailsEl.textContent = diego.getBalance();
  }
}

function withdraw() {
  const amount = Number(accountInputEl.value);
  if (accountInputEl.value === "") {
    accountMessage.textContent = "Please enter numbers.";
  } else if (diego.getBalance() < amount) {
    accountMessage.textContent = "There aren't enough funds in the account.";
  } else if (amount === 0) {
    accountMessage.textContent = "You entered 0 - you did it in vain.";
  } else if (amount < 0) {
    accountMessage.textContent =
      "You entered less than zero - you did it in vain.";
  } else {
    diego.withdraw(amount);
    accountMessage.textContent = "Now you're a little poorer.";
    accountDetailsEl.textContent = diego.getBalance();
  }
}

depositBtnEl.addEventListener("click", () => {
  deposit();
  accountInputEl.value = "";
});

withdrawBtnEl.addEventListener("click", () => {
  withdraw();
  accountInputEl.value = "";
});

accoutnNameEl.textContent = diego.owner;
accountDetailsEl.textContent = diego.balance;
