// import { setupExercise } from "../../../../scripts/vanilla-exercise-handler.js";

// const { error } = require("console")

// setupExercise({
//   fileKey: "08-asynchronous-js",
//   exerciseName: "Getting data from the API",
//   statement:
//     "Get a list of users from the API https://jsonplaceholder.typicode.com/users and print the names.",
// });

// ! Рішення ----------
// fetch("https://jsonplaceholder.typicode.com/users")
//   .then((response) => {
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     return response.json(); // перетворення в JS-об'єкт
//   })
//   .then((data) => {
//     data.forEach((user) => console.log(user.name));
//     console.log("---------");
//   })
// .catch((error) => {
//     console.error("Помилка:", error);
//   });

// async function fetchUsers() {
//   try {
//     const response = await fetch("https://jsonplaceholder.typicode.com/users");
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }

//     const users = await response.json();
//     users.forEach((user) => console.log(user.name));
//     console.log("---------");
//   } catch (error) {
//     console.error("Помилка:", error);
//   }
// }
// fetchUsers();


// axios
//   .get("https://jsonplaceholder.typicode.com/users")
//   .then((res) => {
//     res.data.forEach((user) => console.log(user.name));
//     console.log("---------");
//   })
//   .catch((err) => console.error(err));

// async function getData() {
//   try {
//     const response = await axios.get(
//       "https://jsonplaceholder.typicode.com/users"
//     );
//     response.data.forEach((element) => {
//       console.log(element.name);
//     });
//   } catch (error) {
//     if (axios.isAxiosError(error)) {
//       console.error("Axios error:", error.message);
//       if (error.response) {
//         console.error("Status:", error.response.status);
//         console.error("Data:", error.response.data);
//       }
//     } else {
//       console.error("Unexpected error:", error);
//     }
//     throw error; // щоб можна було обробити вище
//   }
// }

// getData();
// ---------------------------------------------------
// import axios from 'axios';

// const API_URL = 'http://localhost:5000/api';

// // GET
// export const getData = async (endpoint: string) => {
//   try {
//     const response = await axios.get(`${API_URL}/${endpoint}`);
//     return response.data;
//   } catch (error: any) {
//     handleAxiosError(error);
//   }
// };

// // POST
// export const postData = async (endpoint: string, data: any) => {
//   try {
//     const response = await axios.post(`${API_URL}/${endpoint}`, data);
//     return response.data;
//   } catch (error: any) {
//     handleAxiosError(error);
//   }
// };

// // PUT
// export const putData = async (endpoint: string, data: any) => {
//   try {
//     const response = await axios.put(`${API_URL}/${endpoint}`, data);
//     return response.data;
//   } catch (error: any) {
//     handleAxiosError(error);
//   }
// };

// // DELETE
// export const deleteData = async (endpoint: string) => {
//   try {
//     const response = await axios.delete(`${API_URL}/${endpoint}`);
//     return response.data;
//   } catch (error: any) {
//     handleAxiosError(error);
//   }
// };

// // Універсальна обробка помилок
// const handleAxiosError = (error: any) => {
//   if (error.response) {
//     // Сервер відповів з кодом помилки
//     throw new Error(`HTTP error! Status: ${error.response.status}, Message: ${error.response.data?.message || 'Unknown error'}`);
//   } else if (error.request) {
//     // Запит був зроблений, але відповіді не отримано
//     throw new Error('No response received from the server');
//   } else {
//     // Щось інше пішло не так
//     throw new Error(`Request setup error: ${error.message}`);
//   }
// };
