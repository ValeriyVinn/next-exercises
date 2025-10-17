class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }

  showInfo() {
    console.log(`${this.name} costs $${this.price}`);
  }

  static comparePrices(p1, p2) {
    return p1.price - p2.price;
  }
}

class DiscountedProduct extends Product {
  constructor(name, price, discount) {
    super(name, price);
    this.discount = discount;
  }

  getFinalPrice() {
    return this.price - (this.price * this.discount) / 100;
  }
}

// Example
const phone = new DiscountedProduct("Phone", 1000, 10);
const laptop = new DiscountedProduct("Laptop", 2000, 15);

phone.showInfo();
console.log("Final price:", phone.getFinalPrice());

const cheaper = Product.comparePrices(phone, laptop) < 0 ? phone.name : laptop.name;
console.log(`${cheaper} is cheaper.`);

// Output:
// Phone costs $1000
// Final price: 900
// Phone is cheaper.
