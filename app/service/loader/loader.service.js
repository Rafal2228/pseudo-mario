class Loader {
  constructor() {
    this.items = 0;
    this.doneCallback = [];
  }

  done(callback) {
    this.doneCallback.push(callback);
  }

  add() {
    this.items++;
  }

  remove() {
    this.items--;

    if (this.items) return;

    this.doneCallback.forEach((callback) => callback());
    this.doneCallback = [];
  }
}

const loader = new Loader();

export default loader;
