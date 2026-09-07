// const valueEl = document.getElementById("counter-value");
// const incrementEl = document.getElementById("increment");
// const decrementEl = document.getElementById("decrement");
// const resetEl = document.getElementById("reset");
// const counterNameEl = document.getElementById("counter-name");


// class Counter {
//   constructor({ name, value = 0, step }) {
//     this.name = name;
//     this.value = value;
//     this.step = step;
//   }

//   increment() {
//     this.value += this.step;
//   }

//   decrement() {
//     this.value -= this.step;
//   }

//   reset() {
//     this.value = 0;
//   }
// }

// const stepOne = new Counter({ name: "Step * 1", value: 0, step: 1 });
// // const stepTwo = new Counter({ name: "Step * 2", value: 0, step: 2 });
// // const stepThree = new Counter({name: "Step * 3", value: 0, step: 3})

// function render() {
//   counterNameEl.textContent = stepOne.name;
//   valueEl.textContent = stepOne.value;
// }
// render();

// incrementEl.addEventListener("click", () => {
//   stepOne.increment();
//   render();
// });
// decrementEl.addEventListener("click", () => {
// stepOne.decrement();
//   render();
// });
// resetEl.addEventListener("click", () => {
//   stepOne.reset();
//   render();
// });



class Counter {
  constructor({ name, value = 0, step }) {
    this.name = name;
    this.value = value;
    this.step = step;
  }

  increment() {
    this.value += this.step;
  }

  decrement() {
    this.value -= this.step;
  }

  reset() {
    this.value = 0;
  }
}



const counters = [
  { name: "Step * 1", step: 1 },
  { name: "Step * 2", step: 2 },
  { name: "Step * 3", step: 3 },
  { name: "Step * 4", step: 4 }
];

const fragment = document.createDocumentFragment();

counters.forEach(cfg => {
  const counter = new Counter({ name: cfg.name, value: 0, step: cfg.step });

  const wrapper = document.createElement("div");
  wrapper.className = "counter-wrapper";

  const h2 = document.createElement("h2");
  h2.className = "counter-name";
  h2.textContent = counter.name;

  const valueDiv = document.createElement("div");
  valueDiv.className = "counter-value";
  valueDiv.textContent = counter.value;

  const buttonWrapper = document.createElement("div");
  buttonWrapper.className = "button-wrapper";

  const inc = document.createElement("button");
  inc.textContent = "Increment";
  inc.addEventListener("click", () => {
    counter.increment();
    valueDiv.textContent = counter.value;
  });

  const dec = document.createElement("button");
  dec.textContent = "Decrement";
  dec.addEventListener("click", () => {
    counter.decrement();
    valueDiv.textContent = counter.value;
  });

  const reset = document.createElement("button");
  reset.textContent = "Reset";
  reset.addEventListener("click", () => {
    counter.reset();
    valueDiv.textContent = counter.value;
  });

  buttonWrapper.append(inc, dec, reset);
  wrapper.append(h2, valueDiv, buttonWrapper);
  fragment.appendChild(wrapper);
});

document.getElementById("counter-fragment").appendChild(fragment);


