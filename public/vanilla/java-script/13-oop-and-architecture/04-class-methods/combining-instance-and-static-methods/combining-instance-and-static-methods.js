class User {
  constructor(name, email) {
    this.name = name;
    this.email = email;
  }

  introduce() {
    console.log(`Hi, I'm ${this.name}. You can reach me at ${this.email}.`);
  }

  static compareUsers(u1, u2) {
    return u1.name.localeCompare(u2.name);
  }
}

// Example
const user1 = new User("Alice", "alice@mail.com");
const user2 = new User("Bob", "bob@mail.com");

user1.introduce(); // Hi, I'm Alice. You can reach me at alice@mail.com.
user2.introduce(); // Hi, I'm Bob. You can reach me at bob@mail.com.

console.log(User.compareUsers(user1, user2)); 
// Output: negative number because "Alice" < "Bob"
