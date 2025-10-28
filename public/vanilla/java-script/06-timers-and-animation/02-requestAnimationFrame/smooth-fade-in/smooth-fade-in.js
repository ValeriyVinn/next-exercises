const box = document.getElementById('fadeBox');
let opacity = 0;

function fadeIn() {
  opacity += 0.02;
  box.style.opacity = opacity;

  if (opacity < 1) {
    requestAnimationFrame(fadeIn);
  }
}

fadeIn();