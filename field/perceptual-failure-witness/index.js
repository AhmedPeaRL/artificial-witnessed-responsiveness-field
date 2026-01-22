let failures = 0;

export function registerPerceptualFailure() {
  failures++;

  if (failures >= 2) {
    revealFailure();
    failures = 0;
  }
}

function revealFailure() {
  const msg = document.createElement("div");
  msg.innerText = "Perception failed to stabilize.";
  msg.style.position = "fixed";
  msg.style.top = "50%";
  msg.style.left = "50%";
  msg.style.transform = "translate(-50%, -50%)";
  msg.style.opacity = "0.7";
  msg.style.fontSize = "12px";
  msg.style.pointerEvents = "none";

  document.body.appendChild(msg);

  setTimeout(() => msg.remove(), 2000);
}
