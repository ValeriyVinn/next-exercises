// ! Рішення ----------
// const URL = "https://jsonplaceholder.typicode.com/users";

// const solutionsList = document.getElementById("solutions-list");

// fetch(URL).then((response) => {
//   if (!response.ok) {
//     throw new error(`${response.status}`);
//   }
//   return response.json();
// }).then((data)=>{
//     const fragment = document.createDocumentFragment()

//     data.forEach((user)=>{
//       const liItem = document.createElement("li")  
//       liItem.textContent = user.name 
//       fragment.appendChild(liItem)
//     })
//     solutionsList.appendChild(fragment)

// });

  function delay(ms, callback) {
    setTimeout(() => {
      callback(`Минуло ${ms} мс`);
    }, ms);
  }

  document.getElementById("btn").addEventListener("click", () => {
    delay(2000, (msg) => {
      console.log(msg);
    });
  });




// async function getData() {
//   try {
//     const response = await fetch(URL);
//     if (!response.ok) {
//       throw new Error(`HTTP error! Status: ${response.status}`);
//     }
//     const data = await response.json();
//     const fragment = document.createDocumentFragment();
//     data.forEach((user) => {
//       const liItem = document.createElement("li");
//       liItem.textContent = user.name;
//       fragment.appendChild(liItem);
//     });
//     solutionsList.appendChild(fragment);
//   } catch (error) {
//     console.error("Помилка:", error);
//   }
// }
// getData()

// const URL = "https://jsonplaceholder.typicode.com/users";

// fetch(URL).then((response)=>{
//   if(!response.ok){
//     throw new Error (`HTTP Error! Status: ${response.status}`)
//   }
//   return response.json()
// }).then((data)=>{
// console.log(data)
//   })

// fetch(URL).then((response)=>{
//   if(!response.ok){
//     throw new Error(`This error is ${response.status}`)
//   }
//   return response.json()
// }).then((data)=>{
//  const fragment = document.createDocumentFragment()
//   data.forEach(element => {
//   const li = document.createElement("li")
//   li.textContent = element.name
//   fragment.appendChild(li);
//   });
//   solutionsList.appendChild(fragment);
// }).catch((error)=> console.log(error))

// getUser()
// axios
//   .get(URL)
//   .then((res) => {
//     const fragment = document.createDocumentFragment()

//     res.data.forEach((user) => {
//     const li = document.createElement("li")
//     li.textContent = user.name
//     fragment.appendChild(li)
//     });
//     solutionsList.appendChild(fragment)
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
