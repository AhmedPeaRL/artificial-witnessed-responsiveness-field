export class TemporalInjector {
  constructor(field, config) {
    this.field = field;
    this.config = config;
  }

  inject(residual) {
    residual.state.forEach(rp => {
      const p = this.field.findNearest(rp.x, rp.y, this.config.influenceRadius);
      if (!p) return;

      p.vx += rp.vx * 0.4;
      p.vy += rp.vy * 0.4;
    });
  }
}
