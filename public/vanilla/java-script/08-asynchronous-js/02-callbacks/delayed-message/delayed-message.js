
function belatedAnswer(sheff, staff, callback){
  console.log(`My name is ${sheff}. What is in your head, ${staff}?`)
  setTimeout(()=> {
    callback(sheff)
  }, 5000)

  
}



const majesticPhenomenon = function (staff){
  console.log(`There is burning majestic phenomenon, ${staff}`)
}
belatedAnswer ("Grusin", "Darja", majesticPhenomenon)