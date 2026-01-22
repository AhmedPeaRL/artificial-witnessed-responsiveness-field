import { TemporalWitnessConfig } from "./witness.config.js";
import { ResidualBuffer } from "./residual-buffer.js";
import { TemporalInjector } from "./temporal-injector.js";
import { observeField, writeField } from "../shared-field.js";

export function attachTemporalWitness(field) {
  const buffer = new ResidualBuffer(TemporalWitnessConfig.bufferSize);
  const injector = new TemporalInjector(field, TemporalWitnessConfig);

  let residue = 0;
  
  // تسجيل الأثر فقط
  setInterval(() => {
    buffer.record(field.snapshot());
  }, 300);

  // الحقن المتأخر
  setInterval(() => {
    const delayed = buffer.extractDelayed(TemporalWitnessConfig.injectionDelay);
    delayed.forEach(entry => {
      const faded = buffer.decay(entry, TemporalWitnessConfig.decayFactor);
      injector.inject(faded);
      observeField((state) => {
  if (state.presence) {
    residue = residue * 0.95 + 0.05;
    writeField({ strain: residue });
  } else {
    residue *= 0.98;
  }
    });
  }, 2000);
}
