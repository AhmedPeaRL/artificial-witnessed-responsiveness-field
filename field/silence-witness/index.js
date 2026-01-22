import { observeField, writeField } from "../shared-field.js";

let lastPresence = Date.now();

observeField((state) => {
  if (state.presence) {
    lastPresence = Date.now();
    writeField({ silence: false });
  }

  if (Date.now() - lastPresence > 6000) {
  if (state.motionEnergy > 0.2) {
    registerContradiction(
      "SilenceWitness",
      "Silence detected while motion energy persists"
    );
  }

  writeField({ silence: true });
  }
});
