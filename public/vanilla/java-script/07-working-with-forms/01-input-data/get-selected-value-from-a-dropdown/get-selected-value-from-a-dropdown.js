// document.getElementById("showColorBtn").addEventListener("click", () => {
//   const selectedColor = document.getElementById("colorSelect").value;
//   const output = document.getElementById("colorOutput");

//   if (selectedColor) {
//     output.textContent = `You chose: ${selectedColor}`;
//     output.style.color = selectedColor;
//   } else {
//     output.textContent = "Please select a color.";
//   }
// });

document.getElementById("showColorBtn").addEventListener("click", ()=>{
   const getColor = document.getElementById("colorSelect").value
const output = document.getElementById("colorOutput")
if(getColor){
    
    output.textContent = `As you see, color is ${getColor}`
    output.style.color = getColor
}else{
    output.style.color = "inherit"
    output.textContent = "You catch an empty sring :)"
}

})