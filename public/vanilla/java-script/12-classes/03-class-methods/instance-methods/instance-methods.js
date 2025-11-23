class Counter {
  constructor(displayElement) {
    this.count = 0;
    this.displayElement = displayElement;
    this.show();
  }

  increment() {
    this.count++;
    this.show();
  }

  decrement() {
    this.count--;
    this.show();
  }

  reset() {
    this.count = 0;
    this.show();
  }

  show() {
    this.displayElement.textContent = this.count;
  }
}

const display = document.getElementById("counter");
const counter = new Counter(display);

document.getElementById("increment").addEventListener("click", () => counter.increment());
document.getElementById("decrement").addEventListener("click", () => counter.decrement());
document.getElementById("reset").addEventListener("click", () => counter.reset());

const display1 = document.getElementById("counter1")
const counter1 = new Counter(display1);
document.getElementById("increment1").addEventListener("click", () => counter1.increment());
document.getElementById("decrement1").addEventListener("click", () => counter1.decrement());
document.getElementById("reset1").addEventListener("click", () => counter1.reset());

// const counter2 = new Counter(document.getElementById("counter2"));