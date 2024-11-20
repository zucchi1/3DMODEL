import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createCube } from "../rendering/CubeModel";
import { createPlate } from "../rendering/SpherePlate";
import { createPlate1 } from "../rendering/SpherePlate1";
import { createGlass } from "../rendering/Glass";

export async function loadModel(glbPath, scene) {
  if (!glbPath) return createCube();

  switch (glbPath) {
    case "plate": {
      const plate = createPlate();
      plate.position.set(0, 0, 0);
      return plate;
    }
    case "plate1": {
      const plate = createPlate1();
      plate.position.set(0, 0, 0);
      return plate;
    }
    case "glass": {
      const glass = createGlass();
      glass.position.set(0, 0, 0);
      return glass;
    }
    case "model": {
      const group = new THREE.Group();
      const glass = createGlass();
      const plate = createPlate();
      glass.position.set(-100, 0, 0);
      group.add(glass);
      plate.position.set(100, 0, 0);
      group.add(plate);
      return group;
    }
    default: {
      const loader = new GLTFLoader();
      return new Promise((resolve, reject) => {
        loader.load(
          glbPath,
          (gltf) => {
            const model = gltf.scene;
            model.scale.set(400.0, 400.0, 400.0);
            model.position.set(0, -400, 0);
            resolve(model);
          },
          undefined,
          reject
        );
      });
    }
  }
}
