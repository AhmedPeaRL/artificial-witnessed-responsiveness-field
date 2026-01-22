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
    response.innerText = "typing cadence.";
  } else {
    response.innerText =
      "A linguistic event was observed.\n presence duration";
  
  if (Math.random() > 0.6) {
  field.absorb(inputValue.length);
  
    if (fieldState.textUsed) return;
  fieldState.textUsed = true;

    if (Math.random() < 0.3) return; // no linguistic formation
  }

  used = true;
  input.disabled = true;
  input.length
 
    button.disabled = true;
  attachTemporalWitness(field);
};
