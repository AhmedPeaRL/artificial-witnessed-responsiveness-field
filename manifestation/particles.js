// manifestation/particles.js
export function manifest(disturbance) {
  const p = document.createElement("div");
  p.className = "particle";
  p.style.left = Math.random() * 100 + "vw";
  p.style.top = Math.random() * 100 + "vh";
  document.body.appendChild(p);

  setTimeout(() => {
    p.remove();
  }, disturbance.decay);
}
