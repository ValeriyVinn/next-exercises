const phones = [
  {
    brand: "Sony",
    models: [
      { name: "Model 1", price: 500 },
      { name: "Model 2", price: 600 },
      { name: "Model 3", price: 750 },
    ],
  },
  {
    brand: "Samsung",
    models: [
      { name: "Galaxy S20", price: 800 },
      { name: "Galaxy A52", price: 350 },
    ],
  },
  {
    brand: "Apple",
    models: [
      { name: "iPhone 13", price: 900 },
      { name: "iPhone 14", price: 1100 },
    ],
  },
  {
    brand: "Xiaomi",
    models: [
      { name: "Mi 11", price: 500 },
      { name: "Redmi Note 11", price: 250 },
    ],
  },
];

const input = document.getElementById("filterInput");
const results = document.getElementById("results");

// ⭐ ФУНКЦІЯ ПОКАЗУ РЕЗУЛЬТАТУ
function renderResults(filtered) {
  results.innerHTML = ""; // очищаємо

  filtered.forEach((item) => {
    const div = document.createElement("div");
    div.className = "result";

    const brand = document.createElement("div");
    brand.className = "brand";
    brand.textContent = `В наявності ${item.brand}`;

    const modelsDiv = document.createElement("div");
    modelsDiv.className = "models";

    item.models.forEach((model) => {
      const p = document.createElement("p");
      p.textContent = `${model.name} — ${model.price}$`;
      modelsDiv.appendChild(p);
    });

    div.appendChild(brand);
    div.appendChild(modelsDiv);

    results.appendChild(div);
  });
}

// ⭐ ОБРОБКА ВВОДУ
input.addEventListener("input", () => {
  const text = input.value.toLowerCase();

  const filtered = phones.filter((item) =>
    item.brand.toLowerCase().includes(text)
  );

  renderResults(filtered);
});

// Показати все при першому завантаженні
renderResults(phones);
