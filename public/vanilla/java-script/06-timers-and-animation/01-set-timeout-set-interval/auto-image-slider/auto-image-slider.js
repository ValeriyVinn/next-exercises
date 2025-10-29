const images = [
  "https://images.pexels.com/photos/140134/pexels-photo-140134.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/213399/pexels-photo-213399.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
  "https://images.pexels.com/photos/219943/pexels-photo-219943.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260",
];

let index = 0;
const img = document.getElementById("slider");

function changeImage() {
  img.src = images[index];
  index = (index + 1) % images.length; // loop
}

changeImage(); // show first image
setInterval(changeImage, 3000);
