import { loaderService } from '../../service';

class StaticBackground {
  constructor(url, x=0, y=0) {
    loaderService.add();
    this.background = new Image();
    this.background.src = url;
    this.background.onload = () => loaderService.remove();
    this.x = x;
    this.y = y;
  }

  render(ctx) {
    ctx.drawImage(this.background, this.x, this.y, ctx.canvas.width, ctx.canvas.height);
  }
}

export default StaticBackground;
