  const products = [
    { name: "Keyboard", price: 1200, available: true },
    { name: "Mouse", price: 600, available: true },
    { name: "Monitor", price: 4500, available: false },
  ];

  const list = document.getElementById("productsList");

  products.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} — ${item.price} грн ${item.available ? "(в наявності)" : "(немає в наявності)"}`;
    list.appendChild(li);
  });