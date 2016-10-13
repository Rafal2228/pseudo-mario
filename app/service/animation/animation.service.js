import { loaderService } from '../.';

class AnimationService {
  static loadImageFromJSON(json) {
    const result = {};
    Object.keys(json).forEach((key) => {
      result[key] = json[key].map((path) => {
        loaderService.add();
        const image = new Image();
        image.src = path;
        image.onload = () => loaderService.remove();
        return image;
      });
    });

    return result;
  }
}

export default AnimationService;
