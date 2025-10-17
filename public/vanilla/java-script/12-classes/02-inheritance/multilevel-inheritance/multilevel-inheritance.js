class Person {
  constructor(name) {
    this.name = name;
  }

  introduce() {
    console.log(`Hi, I'm ${this.name}.`);
  }
}

class Employee extends Person {
  constructor(name, position) {
    super(name);
    this.position = position;
  }

  work() {
    console.log(`${this.name} is working as a ${this.position}.`);
  }
}

class Manager extends Employee {
  constructor(name, position, teamSize) {
    super(name, position);
    this.teamSize = teamSize;
  }

  manage() {
    console.log(`${this.name} manages a team of ${this.teamSize} people.`);
  }
}

// Example
const manager = new Manager("Alice", "Project Manager", 5);
manager.introduce();
manager.work();
manager.manage();
// Output:
// Hi, I'm Alice.
// Alice is working as a Project Manager.
// Alice manages a team of 5 people.
