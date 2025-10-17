class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  introduce() {
    console.log(`Hi, I'm ${this.name} (${this.email}).`);
  }
}

class Admin extends User {
  deleteUser(user) {
    console.log(`${this.name} deleted the user: ${user.name}`);
  }
}

class Guest extends User {
  requestAccess() {
    console.log(`${this.name} requested temporary access.`);
  }
}

// Example
const alice = new Admin("Alice", "admin@mail.com");
const bob = new Guest("Bob", "guest@mail.com");

alice.introduce();
bob.introduce();
bob.requestAccess();
alice.deleteUser(bob);

// Output:
// Hi, I'm Alice (admin@mail.com).
// Hi, I'm Bob (guest@mail.com).
// Bob requested temporary access.
// Alice deleted the user: Bob
