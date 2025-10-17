class Counter {
  constructor() {
    this.count = 0;
  }

  increment() {
    this.count++;
  }

  decrement() {
    this.count--;
  }

  reset() {
    this.count = 0;
  }

  show() {
    console.log(`Current count: ${this.count}`);
  }
}

// Example
const counter = new Counter();
counter.increment();
counter.increment();
counter.show(); // Current count: 2
counter.decrement();
counter.show(); // Current count: 1
counter.reset();
counter.show(); // Current count: 0
