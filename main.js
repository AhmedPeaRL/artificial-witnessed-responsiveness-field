import { initField, disturbField } from "./witness.js";

const canvas = document.getElementById("field-canvas");
const input = document.getElementById("witness-input");
const response = document.getElementById("response");

initField(canvas);

// حضور حركي دائم
canvas.addEventListener("mousemove", e => {
  disturbField(".");
});

// إدخال لغوي = تشوه + أثر لفظي
input.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    const value = input.value.trim();
    input.value = "";

    if (!value) return;

    disturbField(value);

    // Output لغوي غير تراكمي
    response.textContent = generateWitnessLine(value);
    response.style.opacity = "1";

    setTimeout(() => {
      response.style.opacity = "0";
    }, 1400);
  }
});

function generateWitnessLine(seed) {
  const forms = [
    "The field registered a disturbance.",
    "Presence altered.",
    "No continuity preserved.",
    "An impulse passed through.",
    "The field absorbed without memory.",
    "A trace appeared and vanished."
  ];

  return forms[Math.floor(Math.random() * forms.length)];
}
