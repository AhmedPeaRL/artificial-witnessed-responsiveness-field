// AWRF Runtime — Witnessed Responsiveness Without Addressability
// Stateless by design. Memoryless by enforcement.

const canvas = document.getElementById("field");
const ctx = canvas.getContext("2d");

if (!ctx) {
  throw new Error("Rendering context unavailable");
}

let width = 0;
let height = 0;

const BASE_PARTICLE_COUNT = 900;
let particles = [];

// --- Canvas Initialization (Idempotent) ---
function resizeCanvas() {
  const dpr = window.devicePixelRatio || 1;

  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * dpr;
  canvas.height = height * dpr;

  ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
}

window.addEventListener("resize", resizeCanvas);
resizeCanvas();

// --- Non-addressable Presence Capture ---
let ambientImpulse = { x: 0, y: 0 };

canvas.addEventListener("pointermove", (e) => {
  ambientImpulse.x = (Math.random() - 0.5) * 0.05;
  ambientImpulse.y = (Math.random() - 0.5) * 0.05;
});

canvas.addEventListener("pointerdown", () => {
  ambientImpulse.x = (Math.random() - 0.5) * 0.1;
  ambientImpulse.y = (Math.random() - 0.5) * 0.1;
});

// --- Particle Definition ---
class Particle {
  constructor() {
    this.reset();
  }

  reset() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.15;
    this.vy = (Math.random() - 0.5) * 0.15;
    this.life = Math.random() * 700 + 300;
  }

  update(drift, decay) {
    this.x += this.vx + drift.x;
    this.y += this.vy + drift.y;
    this.life -= decay;

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

// --- Seeding ---
function seed(count) {
  particles.length = 0;
  for (let i = 0; i < count; i++) {
    particles.push(new Particle());
  }
}

seed(BASE_PARTICLE_COUNT);

// --- Main Loop ---
function loop() {
  ctx.fillStyle = "rgba(0,0,0,0.09)";
  ctx.fillRect(0, 0, width, height);

  const rhythm = window.RHYTHMIC_FIELD_PARAMETERS ?? {};

  const density = rhythm.density ?? 1;
  const decay = rhythm.decay ?? 1;
  const alpha = rhythm.alpha ?? 0.03;
  const resistance = rhythm.driftResistance ?? 1;

  const drift = {
    x: ambientImpulse.x / resistance,
    y: ambientImpulse.y / resistance
  };

  ambientImpulse.x *= 0.92;
  ambientImpulse.y *= 0.92;

  const targetCount = Math.floor(BASE_PARTICLE_COUNT * density);
  if (targetCount !== particles.length) {
    seed(targetCount);
  }

  for (const p of particles) {
    p.update(drift, decay);
    p.draw(alpha);
  }

  requestAnimationFrame(loop);
}

loop();
