const layersMap = {
  BACKGROUND: 0,
  MAP: 1,
  PLAYER: 2,
  TOP: 3
};

class Scene {
  constructor(canvas) {
    canvas.width = document.documentElement.clientWidth - 4;
    canvas.height = document.documentElement.clientHeight - 4;
    this.ctx = canvas.getContext('2d');
    this.ctx.save();
    this.layers = Object.keys(layersMap).map(() => []);
  }

  start() {
    setInterval(() => {
      this.render();
    }, Math.floor(1000/60));
  }

  render() {
    this.ctx.clearRect(0, 0, this.ctx.canvas.width, this.ctx.canvas.height);
    this.layers.forEach((layer) => {
      layer.forEach((item) => {
        item.render(this.ctx);
      });
    });
  }

  addItem(item, layerName = "BACKGROUND") {
    this.layers[layersMap[layerName]].push(item);
  }
}

export default Scene;
