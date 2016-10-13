class AnimationService {
  static loadImageFromJSON(json) {
    const result = {};
    Object.keys(json).forEach((key) => {
      result[key] = json[key].map((path) => {
        const image = new Image();
        image.src = path;
        return image;
      });
    });

    return result;
  }
}

export default AnimationService;
