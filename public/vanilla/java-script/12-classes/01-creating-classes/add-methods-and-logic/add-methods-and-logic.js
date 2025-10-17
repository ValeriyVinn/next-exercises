class BankAccount {
  constructor(owner) {
    this.owner = owner;
    this.balance = 0;
  }

  deposit(amount) {
    this.balance += amount;
    console.log(`${this.owner} deposited $${amount}.`);
  }

  withdraw(amount) {
    if (amount <= this.balance) {
      this.balance -= amount;
      console.log(`${this.owner} withdrew $${amount}.`);
    } else {
      console.log("Insufficient funds!");
    }
  }

  getBalance() {
    console.log(`Balance: $${this.balance}`);
  }
}

// Example
const account = new BankAccount("Alice");
account.deposit(100);
account.withdraw(30);
account.getBalance();
// Output:
// Alice deposited $100.
// Alice withdrew $30.
// Balance: $70
