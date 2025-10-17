class MathHelper {
  static add(a, b) {
    return a + b;
  }

  static subtract(a, b) {
    return a - b;
  }

  static multiply(a, b) {
    return a * b;
  }

  static divide(a, b) {
    if (b === 0) return "Cannot divide by zero!";
    return a / b;
  }
}

// Example
console.log(MathHelper.add(5, 3));       // 8
console.log(MathHelper.divide(10, 2));   // 5
console.log(MathHelper.divide(5, 0));    // Cannot divide by zero!
