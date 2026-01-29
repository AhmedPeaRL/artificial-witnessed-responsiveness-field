// TRACE_OCCURRENCE_MINIMAL
// Presence without promise — Occurrence without memory

(function () {
  const canvas = document.getElementById("field");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  if (!ctx) return;

  const now = performance.now();
  const entropy = Math.sin(now * 0.0001) * Math.cos(now * 0.00037);

  // Narrow existential window
  if (Math.abs(entropy) < 0.0003) {
    const w = canvas.width;
    const h = canvas.height;

    const x = Math.floor(Math.random() * w);
    const y = Math.floor(Math.random() * h);

    ctx.fillStyle = "rgba(255,255,255,0.035)";
    ctx.fillRect(x, y, 1, 1);
  }
})();
