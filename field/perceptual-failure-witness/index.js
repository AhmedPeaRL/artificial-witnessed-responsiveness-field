import { observeField } from "../shared-field.js";

observeField((state) => {
  if (state.motionEnergy > 0.9 && state.silence === false) {
    console.warn("Perceptual strain detected.");
  }
});
