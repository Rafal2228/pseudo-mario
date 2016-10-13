import { Wizard, Scene } from "./model";
import { loaderService } from "./service";

// Setup scene and loader callback
const canvas = document.getElementById('content');
const scene = new Scene(canvas);

loaderService.done(() => {
  scene.start();
});

const wizard = new Wizard();
scene.addItem(wizard);
