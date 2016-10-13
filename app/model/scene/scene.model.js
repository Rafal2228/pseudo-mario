
const layersMap = {
  BACKGROUND: 1,
  MAP: 2,
  PLAYER: 3,
  TOP: 4
};

class Scene {
  constructor(canvas) {
    this.canvas = canvas;
    this.canvas.width = document.documentElement.clientWidth - 4;
    this.canvas.height = document.documentElement.clientHeight - 4;
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
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
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
