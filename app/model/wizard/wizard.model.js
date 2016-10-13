import wizardAnimationJSON from './wizard.animation.json';
import { AnimationService } from '../../service';

const animations = AnimationService.loadImageFromJSON(wizardAnimationJSON);

class Wizard {
  constructor() {

  }
}

export default Wizard;
