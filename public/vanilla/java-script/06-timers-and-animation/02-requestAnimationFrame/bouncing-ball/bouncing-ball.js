const ball = document.getElementById('ball');
let x = 0, y = 0;
let dx = 3, dy = 2;

function animate() {
  x += dx;
  y += dy;

  if (x <= 0 || x >= window.innerWidth - 40) dx = -dx;
  if (y <= 0 || y >= window.innerHeight - 40) dy = -dy;

  ball.style.left = x + "px";
  ball.style.top = y + "px";

  requestAnimationFrame(animate);
}

animate();