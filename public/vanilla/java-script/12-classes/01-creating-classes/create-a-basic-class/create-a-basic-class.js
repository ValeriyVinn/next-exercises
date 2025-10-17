class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    console.log(`Hi, my name is ${this.name} and I am ${this.age} years old.`);
  }
}

// Example
const john = new Person("John", 25);
john.introduce(); 
// Output: Hi, my name is John and I am 25 years old.
