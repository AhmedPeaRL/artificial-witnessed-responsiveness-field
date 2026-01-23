import { observeField } from "../shared-field.js";
import { registerContradiction } from "../contradiction-registry/index.js";

export function registerPerceptualFailure() {
  registerContradiction(
    "PerceptualFailureWitness",
    "Perceptual instability detected"
  );
}
