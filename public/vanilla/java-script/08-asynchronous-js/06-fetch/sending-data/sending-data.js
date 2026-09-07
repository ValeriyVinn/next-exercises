
// ! Рішення ----------
// async function createUser(data) {
//   const response = await fetch("https://jsonplaceholder.typicode.com/users", {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify(data),
//   });
//   const result = await response.json();
//   console.log(result);
// }

// createUser({ name: "Varvara", age: 27, id: 5, });


// fetch("https://jsonplaceholder.typicode.com/posts/1")
//   .then(response => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     console.log(response)
//     return response.json(); // перетворення в JS-об'єкт
//   })
//   .then(data => {
//     console.log(data);
//   })
//   .catch(error => {
//     console.error("Помилка:", error);
//   });
