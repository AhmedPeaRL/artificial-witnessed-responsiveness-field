// field/contradiction-registry/index.js

const contradictions = [];

export function registerContradiction(source, description) {
  contradictions.push({
    source,
    description,
    timestamp: Date.now(),
  });

  console.warn(
    `[Contradiction] ${source}: ${description}`
  );
}

export function readContradictions() {
  return [...contradictions];
}
