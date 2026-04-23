const titleEl = document.querySelector(".title");
const priceEl = document.querySelector(".price");
const stockEl = document.querySelector(".stock");
const discountStockBtnEl = document.querySelector(".discount-btn");
const toggleBtnEl = document.querySelector(".toggle-btn");
const priceBtnEl = document.querySelector(".price-btn");

class Product {
  constructor({ title, stock, price }) {
    this.title = title;
    this.price = price;
    this.stock = stock;
  }
  getPrice() {
    return `$${this.price}`;
  }

  toggleStock() {
    this.stock = !this.stock;
  }

  applyDiscount(percent) {
    this.price = this.price - (this.price * percent) / 100;
    if (this.price < 0) this.price = 0;
  }
}

const iPhone = new Product({
  title: "iPhone",
  price: 1000,
  stock: true,
});

function updateStockUI() {
  stockEl.classList.remove("in-stock", "out-stock");
  if (iPhone.stock) {
    stockEl.textContent = "In Stock";
    stockEl.classList.add("in-stock");
    priceBtnEl.disabled = false;
    discountStockBtnEl.disabled = false;
  } else {
    stockEl.textContent = "Out of Stock";
    stockEl.classList.add("out-stock");
    priceBtnEl.disabled = true;
    discountStockBtnEl.disabled = true;
  }
}

function renderProduct() {
  titleEl.textContent = iPhone.title;
  priceEl.textContent = `${iPhone.getPrice()}`;
  updateStockUI();
}
renderProduct();

priceBtnEl.addEventListener("click", () => {
  alert(iPhone.getPrice());
});

discountStockBtnEl.addEventListener("click", () => {
  iPhone.applyDiscount(10);
  renderProduct();
});

toggleBtnEl.addEventListener("click", () => {
  iPhone.toggleStock();
  renderProduct();
});
