class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }

  introduce() {
    console.log(`Hi, I'm ${this.name}, ${this.age} years old.`);
  }
}

class Student extends Person {
  constructor(name, age, grade) {
    super(name, age);
    this.grade = grade;
  }

  study() {
    console.log(`${this.name} is studying for grade ${this.grade}.`);
  }
}

class Teacher extends Person {
  constructor(name, age, subject) {
    super(name, age);
    this.subject = subject;
  }

  teach() {
    console.log(`${this.name} is teaching ${this.subject}.`);
  }
}

// Example
const student = new Student("Leo", 16, "10th");
const teacher = new Teacher("Mrs. Smith", 40, "Math");

student.introduce();
student.study();
teacher.introduce();
teacher.teach();

// Output:
// Hi, I'm Leo, 16 years old.
// Leo is studying for grade 10th.
// Hi, I'm Mrs. Smith, 40 years old.
// Mrs. Smith is teaching Math.
