class Draw {
  constructor() {
    this.el = document.createElement('canvas');
    this.ctx;
    this.drawing = false;
    this.point = { x: 0, y: 0 };
  }

  install(host = document.body) {
    this.el.width = 600;
    this.el.height = 600;

    this.lw = 10;

    this.ctx = this.el.getContext('2d');
    this.ctx.lineWidth = this.lw;
    this.ctx.lineJoin = 'round';
    this.ctx.lineCap = 'round';
    this.ctx.strokeStyle = theme.active.f_med;

    host.appendChild(this.el);
  }

  drawLine(x1, y1, x2, y2) {
    this.ctx.beginPath();
    this.ctx.moveTo(x1, y1);
    this.ctx.lineTo(x2, y2);
    this.ctx.stroke();
    this.ctx.closePath();
  }

  start() {
    this.el.addEventListener('pointerdown', e => {
      this.point.x = e.offsetX;
      this.point.y = e.offsetY;
      this.drawing = true;
    });

    this.el.addEventListener('pointermove', e => {
      if (this.drawing) {
        this.ctx.lineWidth = this.lw * e.pressure;
        this.drawLine(this.point.x, this.point.y, e.offsetX, e.offsetY);
        this.point.x = e.offsetX;
        this.point.y = e.offsetY;
      }
    });

    this.el.addEventListener('pointerup', e => {
      if (this.drawing) {
        this.drawLine(this.point.x, this.point.y, e.offsetX, e.offsetY);
        this.point.x = 0;
        this.point.y = 0;
        this.drawing = false;
      }
    });
  }
}
