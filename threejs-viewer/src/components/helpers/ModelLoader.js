import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createCube } from "../rendering/CubeModel";
import { createPlate } from "../rendering/SpherePlate";

export async function loadModel(glbPath, scene) {
  if (!glbPath) return createCube();

  if (glbPath === "plate") {
    const plate = createPlate();
    plate.position.set(0, 0, 0);
    return plate;
  }

  const loader = new GLTFLoader();
  return new Promise((resolve, reject) => {
    loader.load(glbPath, (gltf) => {
      const model = gltf.scene;
      model.scale.set(400.0, 400.0, 400.0);
      model.position.set(0, -400, 0);
      resolve(model);
    }, undefined, reject);
  });
}
