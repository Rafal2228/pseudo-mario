import EventEmitter from '../event-emitter/event-emitter.service.js';

const KEYS = {
  SPACE: 32,
  LEFT: 37,
  UP: 38,
  RIGHT: 39,
  DOWN: 40,
  CTRL: 17
}

class InputEmitter extends EventEmitter {
  constructor() {
    super();

    this.current = [];

    document.addEventListener('keydown', (event) => {
      switch (event.which) {
        case KEYS.SPACE : {
          if (this.current.indexOf(KEYS.SPACE) !== -1) return;

          this.emit('user:jump');
          this.current.push(KEYS.SPACE);
        } break;
        case KEYS.UP : {
          if (this.current.indexOf(KEYS.UP) !== -1) return;

          this.emit('user:up');
          this.current.push(KEYS.UP);
        } break;
        case KEYS.LEFT : {
          if (this.current.indexOf(KEYS.LEFT) !== -1) return;

          this.emit('user:left');
          this.current.push(KEYS.LEFT);
        } break;
        case KEYS.RIGHT : {
          if (this.current.indexOf(KEYS.RIGHT) !== -1) return;

          this.emit('user:right');
          this.current.push(KEYS.RIGHT);
        } break;
        case KEYS.DOWN : {
          if (this.current.indexOf(KEYS.DOWN) !== -1) return;

          this.emit('user:down');
          this.current.push(KEYS.DOWN);
        } break;
        case KEYS.CTRL : {
          if (this.current.indexOf(KEYS.CTRL) !== -1) return;

          this.emit('user:run');
          this.current.push(KEYS.CTRL);
        } break;
      }
    });

    document.addEventListener('keyup', (event) => {
      switch (event.which) {
        case KEYS.SPACE : {
          this.current = this.current.filter((item) => item !== KEYS.SPACE);
        } break;
        case KEYS.UP : {
          this.current = this.current.filter((item) => item !== KEYS.UP);
        } break;
        case KEYS.LEFT : {
          this.current = this.current.filter((item) => item !== KEYS.LEFT);
          if (this.current.indexOf(KEYS.RIGHT) === -1) break;

          this.emit('user:right');
        } break;
        case KEYS.RIGHT : {
          this.current = this.current.filter((item) => item !== KEYS.RIGHT);
          if (this.current.indexOf(KEYS.LEFT) === -1) break;

          this.emit('user:left');
        } break;
        case KEYS.DOWN : {
          this.current = this.current.filter((item) => item !== KEYS.DOWN);
        } break;
        case KEYS.CTRL : {
          this.emit('user:walk');
          this.current = this.current.filter((item) => item !== KEYS.CTRL);
        } break;
      }

      if (this.current.filter((item) => item !== KEYS.CTRL).length) return;

      this.emit('user:idle');
    });
  }
}

const inputEmitter = new InputEmitter();

export default inputEmitter;
