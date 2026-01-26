// Optional rhythmic adaptor for AWRF
// If absent, AWRF runs autonomously

let externalParameters = null;

try {
  externalParameters = window.RHYTHMIC_FIELD_PARAMETERS || null;
} catch (_) {
  externalParameters = null;
}

export function readRhythmicParameters() {
  return externalParameters;
}
