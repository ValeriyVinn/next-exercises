  const users = [
    { id: 1, name: "Olena", age: 23 },
    { id: 2, name: "Ivan", age: 31 },
    { id: 3, name: "Taras", age: 19 },
  ];

  const names = users.map(user => user.name);

  document.getElementById("namesOutput").textContent = JSON.stringify(names, null, 2);