// const URL = " https://pokeapi.co/api/v2/nature/6/";

fetch(URL).then((response)=>{
  if(!response.ok){
    throw new Error (`HTTP Error! Status: ${response.status}`)
  }
  return response.json()
}).then((data)=>{
//   const fragment = document.createDocumentFragment()
//   data.forEach((user)=>{
//     // const liItem = document.createElement("li")
//     // liItem.textContent = user.name
//     // fragment.append(liItem)
//     console.log(user.name)
//   })
//   solutionsList.append(fragment)

console.log(data)
})
