class Vehicle {
  constructor(type) {
    this.type = type;
  }

  describe() {
    console.log(`This is a ${this.type}.`);
  }
}

class Car extends Vehicle {
  constructor(type, brand) {
    super(type); // Call parent constructor
    this.brand = brand;
  }

  describe() {
    console.log(`This is a ${this.brand} ${this.type}.`);
  }
}

// Example
const myCar = new Car("car", "Toyota");
myCar.describe();
// Output: This is a Toyota car.
