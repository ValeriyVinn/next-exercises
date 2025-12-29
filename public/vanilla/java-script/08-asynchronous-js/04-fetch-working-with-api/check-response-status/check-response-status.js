// ! Рішення ----------



const URI = "https://jsonplaceholder.typicode.com/todos/3";

// async function fetchData(url) {
//   try {
//     const response = await fetch(url);
//     console.log(`Response status: ${response.status}`);
//   } catch (error) {
//     console.log(error);
//   }
// }
// fetchData(URI)




// function checkResponseStatus(url) {
//   try {
//     fetch(url).then((response) => {
//       if (!response.ok) {
//         throw new Error(`Status: ${response.status}`);
//       }
//       console.log(`Status: ${response.status}`);
//     });
//   } catch (error) {
//     console.log(error);
//   }
// }
// checkResponseStatus(URI)