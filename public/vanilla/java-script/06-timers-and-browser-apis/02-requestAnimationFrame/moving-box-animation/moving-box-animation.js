const box = document.getElementById('box');
let pos = 0;

function moveBox() {
  pos += 2;
  box.style.left = pos + "px";

  if (pos < 400) {
    requestAnimationFrame(moveBox);
  }
}

moveBox();