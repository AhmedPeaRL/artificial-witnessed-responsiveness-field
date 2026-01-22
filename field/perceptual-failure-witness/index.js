import { observeField } from "../shared-field.js";
import { registerContradiction } from "../contradiction-registry/index.js";

observeField((state) => {
  if (state.motionEnergy > 0.9 && state.silence === true) {
    registerContradiction(
      "PerceptualFailureWitness",
      "High motion energy during declared silence"
    );
  }
});
