export class ResidualBuffer {
  constructor(limit) {
    this.limit = limit;
    this.buffer = [];
  }

  record(snapshot) {
    this.buffer.push({
      time: Date.now(),
      state: snapshot
    });

    if (this.buffer.length > this.limit) {
      this.buffer.shift();
    }
  }

  extractDelayed(delay) {
    const now = Date.now();
    return this.buffer.filter(entry => now - entry.time >= delay);
  }

  decay(entry, factor) {
    return {
      ...entry,
      state: entry.state.map(p => ({
        ...p,
        vx: p.vx * (1 - factor),
        vy: p.vy * (1 - factor)
      }))
    };
  }
}
