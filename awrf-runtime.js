// AWRF Runtime — Rhythmic-Aware, Memoryless

const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

let width, height;
let particles = [];
const BASE_PARTICLE_COUNT = 900;

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

  update(drift, decayFactor) {
    this.x += this.vx + drift.x;
    this.y += this.vy + drift.y;
    this.life -= decayFactor;

    if (
      this.x < 0 || this.x > width ||
      this.y < 0 || this.y > height ||
      this.life <= 0
    ) {
      this.reset();
    }
  }

  draw(alpha) {
    ctx.fillStyle = `rgba(255,255,255,${alpha})`;
    ctx.fillRect(this.x, this.y, 1, 1);
  }
}

// init particles
function seed(count) {
  particles = [];
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}
seed(BASE_PARTICLE_COUNT);

function loop() {
  ctx.fillStyle = "rgba(0,0,0,0.08)";
  ctx.fillRect(0, 0, width, height);

  const baseDrift = window.AWRF_DRIFT
  ? window.AWRF_DRIFT.get()
  : { x: 0, y: 0 };

const resistance = rhythm?.driftResistance ?? 1;

const drift = {
  x: baseDrift.x / resistance,
  y: baseDrift.y / resistance
};

// --- Rhythmic Disclosure (Implicit, External Only) ---
const rhythm = window.RHYTHMIC_FIELD_PARAMETERS || null;

const densityFactor = rhythm?.density ?? 1;
const decayFactor = rhythm?.decay ?? 1;
const alpha = rhythm?.alpha ?? 0.035;
  
  const targetCount = Math.floor(BASE_PARTICLE_COUNT * densityFactor);
  if (targetCount !== particles.length) {
    seed(targetCount);
  }

  for (let p of particles) {
    p.update(drift, decayFactor);
    p.draw(alpha);
  }

  requestAnimationFrame(loop);
}

loop();
