const bankAccountEl = document.getElementById("bank-account");

class BankAccaunt {
  constructor(owner, balance) {
    this.balance = balance;
    this.owner = owner;
  }
  showOwner() {
    return this.owner;
  }
  getBalance(){
    return this.balance
  }

}

const user = new BankAccaunt("Diego", "0");
// console.log(user.showAmmount());

function renderUI() {
  const account = `
    
    <h2>Account Details</h2>
    <div id="account-details" class="account-details">sdfg</div>
<input type="number" id="account-number" placeholder="Account Number" />
    <button class="button">show ammount</button>
    `;

  bankAccountEl.innerHTML = account;
}
renderUI();

const buttonEl = document.querySelector(".button");
buttonEl.addEventListener("click", () => {
  alert (`${user.showOwner()}, сьогодні в тебе: ${user.getBalance()}$`);
});
