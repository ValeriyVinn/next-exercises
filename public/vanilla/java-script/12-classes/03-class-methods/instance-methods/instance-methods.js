
// class Counter {
//   constructor() {
//     this.count = 0;
//   }

//   increment() {
//     this.count++;
//   }

//   decrement() {
//     this.count--;
//   }

//   reset() {
//     this.count = 0;
//   }

//   show() {
//    document.getElementById("counter").textContent = `${this.count}`
//   }
// }

// const counter = new Counter();

// document.getElementById("increment").addEventListener("click", ()=> {
//   counter.increment();
//   counter.show()
// })
// document.getElementById("decrement").addEventListener("click", ()=> {
//   counter.decrement();
//   counter.show()
// })
// document.getElementById("reset").addEventListener("click", ()=> {
//   counter.reset();
//   counter.show()
// })


class Counter {
  constructor(displayElement) {
    this.count = 0;
    this.displayElement = displayElement;
    // this.show();
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

// const counter1 = new Counter(document.getElementById("counter1"));
// const counter2 = new Counter(document.getElementById("counter2"));