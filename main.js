window.onerror = function(msg, src, line, col) {
  document.body.innerHTML =
    "<pre style='color:red;white-space:pre-wrap'>" +
    msg + "\n" + src + ":" + line + ":" + col +
    "</pre>";
};

const canvas = document.getElementById("field-canvas");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let particles = Array.from({ length: 150 }, () => ({
  x: Math.random() * canvas.width,
  y: Math.random() * canvas.height,
  vx: 0,
  vy: 0
}));

document.getElementById("witness-input")
  .addEventListener("keydown", e => {
    if (e.key === "Enter") {
      particles.forEach(p => {
        const a = Math.random() * Math.PI * 2;
        p.vx += Math.cos(a) * 2;
        p.vy += Math.sin(a) * 2;
      });
      e.target.value = "";
    }
  });

function loop() {
  ctx.clearRect(0,0,canvas.width,canvas.height);

  particles.forEach(p => {
    p.x += p.vx;
    p.y += p.vy;
    p.vx *= 0.95;
    p.vy *= 0.95;

    if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
    if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

    ctx.beginPath();
    ctx.arc(p.x, p.y, 1.5, 0, Math.PI*2);
    ctx.fillStyle = "white";
    ctx.fill();
  });

  requestAnimationFrame(loop);
}

loop();
