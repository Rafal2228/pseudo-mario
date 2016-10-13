import wizardAnimationJSON from './wizard.animation.json';
import { AnimationService } from '../../service';

const animations = AnimationService.loadImageFromJSON(wizardAnimationJSON);
const FRAME_DURATION = 10;

class Wizard {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.animation = {
      name: 'idle',
      frame: 0,
      showed: 0
    };
  }

  render(ctx) {
    ctx.drawImage(animations[this.animation.name][this.animation.frame], this.x, this.y);
    this.animation.showed++;
    if (this.animation.showed < FRAME_DURATION) return;

    this.animation.showed = 0;
    this.animation.frame++;
    if (this.animation.frame < animations[this.animation.name].length) return;

    this.animation.frame = 0;
  }
}

export default Wizard;
