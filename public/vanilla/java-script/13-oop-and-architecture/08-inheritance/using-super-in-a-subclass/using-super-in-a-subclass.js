// class Vehicle {
//   constructor(type) {
//     this.type = type;
//   }

//   describe() {
//     console.log(`This is a ${this.type}.`);
//   }
// }

// class Car extends Vehicle {
//   constructor(type, brand) {
//     super(type); // Call parent constructor
//     this.brand = brand;
//   }

//   describe() {
//     console.log(`This is a ${this.brand} ${this.type}.`);
//   }
// }

// const myCar = new Car("car", "Toyota");
// myCar.describe();

class Vehicle {
  constructor(name){
    this.name = name
  }
  describe(){
    console.log(`this is a ${this.name}`)
  }
}

class Car extends Vehicle{
  constructor(name, brand){
    super(name)
    this.brand = brand
  }
  describe(){
    console.log(`${this.brand} is japan ${this.name}`)
  }
}

const toyota = new Car("car", "Toyota")
toyota.describe()