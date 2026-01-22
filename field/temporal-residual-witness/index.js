import { TemporalWitnessConfig } from "./witness.config.js";
import { ResidualBuffer } from "./residual-buffer.js";
import { TemporalInjector } from "./temporal-injector.js";

export function attachTemporalWitness(field) {
  const buffer = new ResidualBuffer(TemporalWitnessConfig.bufferSize);
  const injector = new TemporalInjector(field, TemporalWitnessConfig);

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
    });
  }, 2000);
}
