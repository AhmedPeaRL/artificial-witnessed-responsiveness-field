const button = document.getElementById("enter");
const input = document.getElementById("input");
const response = document.getElementById("response");
import { attachTemporalWitness } from "./temporal-residual-witness/index.js";
import { PerceptualDriftBoundary } from './field/perceptual-drift-boundary.js';

let used = false;

button.onclick = () => {
  if (used) return;

  const value = input.value.trim();

  if (!value) {
    response.innerText = "No linguistic structure observed.";
  } else {
    response.innerText =
      "A linguistic event was observed.\nNo semantic continuity was retained.";
  }

  used = true;
  input.disabled = true;
  button.disabled = true;
  attachTemporalWitness(field);
};
