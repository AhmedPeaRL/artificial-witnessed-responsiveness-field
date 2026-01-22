let driftCounter = 0;

export function registerMisalignment(signalStrength = 1) {
  driftCounter += signalStrength;

  if (driftCounter > threshold()) {
    emitTrace();
    driftCounter = 0;
  }
}

function threshold() {
  return 3 + Math.random() * 4;
}

function emitTrace() {
  const trace = document.createElement("div");
  trace.innerText = "Perceptual coherence briefly destabilized.";
  trace.style.position = "fixed";
  trace.style.bottom = "12px";
  trace.style.left = "12px";
  trace.style.opacity = "0.6";
  trace.style.fontSize = "11px";
  trace.style.pointerEvents = "none";
  trace.style.transition = "opacity 2.5s ease";

  document.body.appendChild(trace);

  setTimeout(() => {
    trace.style.opacity = "0";
  }, 50);

  setTimeout(() => {
    trace.remove();
  }, 3000);
}
