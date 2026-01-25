const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];
const PARTICLE_COUNT = 900;

function resize() {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
}
window.addEventListener("resize", resize);
resize();

class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.2;
    this.vy = (Math.random() - 0.5) * 0.2;
    this.life = Math.random() * 800 + 400;
  }

  update(drift) {
    this.x += this.vx + drift.x;
    this.y += this.vy + drift.y;
    this.life--;

    if (
      this.x < 0 || this.x > width ||
      this.y < 0 || this.y > height ||
      this.life <= 0
    ) {
      this.reset();
    }
  }

  draw() {
    ctx.fillStyle = "rgba(255,255,255,0.035)";
    ctx.fillRect(this.x, this.y, 1, 1);
  }
}

for (let i = 0; i < PARTICLE_COUNT; i++) {
  particles.push(new Particle());
}

function loop() {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0, 0, width, height);

  const drift = window.AWRF_DRIFT.get();

  for (let p of particles) {
    p.update(drift);
    p.draw();
  }

  requestAnimationFrame(loop);
}

loop();
