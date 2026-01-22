import { observeField, writeField } from "../shared-field.js";

let lastPresence = Date.now();

observeField((state) => {
  if (state.presence) {
    lastPresence = Date.now();
    writeField({ silence: false });
  }

  if (Date.now() - lastPresence > 6000) {
    writeField({ silence: true });
  }
});
