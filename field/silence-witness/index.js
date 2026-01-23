import { observeField, writeField } from "../shared-field.js";
import { registerContradiction } from "../contradiction-registry/index.js";

export function attachSilenceWitness(timeout = 6000) {
  let lastPresence = Date.now();

  observeField((state) => {
    if (state.presence) {
      lastPresence = Date.now();
      writeField({ silence: false });
    }

    if (Date.now() - lastPresence > timeout) {
      if (state.motionEnergy > 0.2) {
        registerContradiction(
          "SilenceWitness",
          "Silence detected while motion energy persists"
        );
      }
      writeField({ silence: true });
    }
  });
}
