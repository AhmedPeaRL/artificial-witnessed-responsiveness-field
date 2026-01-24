import { initField, disturbField } from "./witness.js";
import { attachSilenceWitness } from "./field/silence-witness/index.js";
import { attachTemporalWitness } from "./field/temporal-residual-witness/index.js";
import { observeField } from "./field/shared-field.js";

const canvas = document.getElementById("field-canvas");
const input = document.getElementById("witness-input");

initField(canvas);

// ربط الإدخال بالتشويه
let locked = false;
input.addEventListener("keydown", e => {
  if (e.key === "Enter" && !locked) {
    locked = true;
    disturbField(input.value);
    input.value = "";
    setTimeout(() => locked = false, 1200);
  }
});

// الشهود (مراقبة فقط)
attachSilenceWitness(6000);
attachTemporalWitness({
  snapshot: () => [],
  findNearest: () => null
});

// coupling صامت مع الواجهة
observeField(state => {
  document.body.classList.toggle("silence-state", state.silence);
});
