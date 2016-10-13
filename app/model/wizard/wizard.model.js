import wizardAnimationJSON from './wizard.animation.json';
import { AnimationService, inputEmitter } from '../../service';

const animations = AnimationService.loadImageFromJSON(wizardAnimationJSON);
const FRAME_DURATION = 10;
const BASE_HEIGHT = 500;
const DIRECTION = {
  LEFT: -1,
  RIGHT: 1
}
const SPEED = {
  WALK: 10,
  RUN: 20,
  JUMP: 30,
  FALL: -1
}

class Wizard {
  constructor() {
    this.x = 0;
    this.y = BASE_HEIGHT;
    this.speedX = SPEED.WALK;
    this.speedY = 0;
    this.animation = {
      name: 'idle',
      frame: 0,
      showed: 0,
      direction: DIRECTION.RIGHT
    };

    inputEmitter.on('user:left', () => {
      this.animation.direction = DIRECTION.LEFT;
      this.speedX === SPEED.WALK ? this.walk() : this.run();
    });

    inputEmitter.on('user:right', () => {
      this.animation.direction = DIRECTION.RIGHT;
      this.speedX === SPEED.WALK ? this.walk() : this.run();
    });

    inputEmitter.on('user:idle', () => {
      this.idle();
    });

    inputEmitter.on('user:run', () => {
      this.speedX = SPEED.RUN;
      if (this.animation.name !== 'walk') return;

      this.run();
    });

    inputEmitter.on('user:walk', () => {
      this.speedX = SPEED.WALK;
      if (this.animation.name !== 'run') return;

      this.walk();
    });

    inputEmitter.on('user:jump', () => {
      if (!this.canJump()) return;

      this.jump();
    });
  }

  render(ctx) {
    if (this.animation.name !== 'idle') {
      this.x += this.animation.direction * this.speedX;
    }

    this.y -= this.speedY;
    this.speedY += SPEED.FALL;

    if (this.y >= BASE_HEIGHT) {
      this.y = BASE_HEIGHT;
      this.speedY = 0;
    }

    if (this.animation.direction === DIRECTION.LEFT) {
      ctx.scale(-1, 1);
      const posX = this.x + animations[this.animation.name][this.animation.frame].naturalWidth;
      ctx.drawImage(animations[this.animation.name][this.animation.frame], -posX, this.y);
      ctx.setTransform(1, 0, 0, 1, 0, 0);
    } else {
      ctx.drawImage(animations[this.animation.name][this.animation.frame], this.x, this.y);
    }

    this.animation.showed++;
    if (this.animation.showed < FRAME_DURATION) return;

    this.animation.showed = 0;
    this.animation.frame++;
    if (this.animation.frame < animations[this.animation.name].length) return;

    this.animation.frame = 0;
  }

  canJump() {
    return this.y >= BASE_HEIGHT;
  }

  jump() {
    this.speedY = SPEED.JUMP;
  }

  walk() {
    this.animation.name = 'walk';
    this.animation.frame = 0;
    this.animation.showed = 0;
  }

  run() {
    this.animation.name = 'run';
    this.animation.frame = 0;
    this.animation.showed = 0;
  }

  idle() {
    this.animation.name = 'idle';
    this.animation.frame = 0;
    this.animation.showed = 0;
  }
}

export default Wizard;
