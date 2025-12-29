


// function loadImage(src, callback) {
//   const img = new Image();
//   img.onload = () => callback(null, img);
//   img.onerror = (err) => callback(err);

//   img.src = src;
// }

// // Використання:
// loadImage("https://via.placeholder.com/400", (err, img) => {
//   if (err) {
//     console.error("Помилка завантаження:", err);
//   } else {
//     document.body.appendChild(img);
//     console.log("Зображення завантажено!");
//   }
// });


// function loadImage(src) {
//   return new Promise((resolve, reject) => {
//     const img = new Image();
//     img.onload = () => resolve(img);
//     img.onerror = (err) => reject(err);

//     img.src = src;
//   });
// }

// // Використання з .then():
// loadImage("https://via.placeholder.com/400")
//   .then(img => {
//     document.body.appendChild(img);
//     console.log("Зображення завантажено!");
//   })
//   .catch(err => console.error("Помилка завантаження:", err));

// // Використання з async/await:
// (async () => {
//   try {
//     const img = await loadImage("https://via.placeholder.com/500");
//     document.body.appendChild(img);
//     console.log("Зображення завантажено через await!");
//   } catch (err) {
//     console.error("Помилка завантаження:", err);
//   }
// })();
