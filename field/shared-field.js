// field/shared-field.js
// Holds instantaneous field state without persistence or recall.

(function () {
  const fieldState = {
    disturbance: 0,
    strain: 0
  };

  window.AWRF_FIELD = {
    read: () => ({ ...fieldState }),

    write: (partial) => {
      if (typeof partial.disturbance === "number") {
        fieldState.disturbance = Math.max(0, partial.disturbance);
      }

      if (typeof partial.strain === "number") {
        fieldState.strain = Math.max(0, partial.strain);
      }
    }
  };
})();
