import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { createCube } from "../rendering/CubeModel";
import { createPlate } from "../rendering/Plate/SpherePlate";
import { createPlate1 } from "../rendering/Plate/SpherePlate1";
import { createPlate2 } from "../rendering/Plate/SpherePlate2";
import { createGlass } from "../rendering/Glass/Glass";
import { createGlass4 } from "../rendering/Glass/Glass4";
import { createGlass7 } from "../rendering/Glass/Glass7";

export async function loadModel(glbPath,sceneInstance, shareValue) {
  if (!glbPath) return createCube();
 // console.log("shareValue", shareValue);

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
      glass.position.set(-250, 0, 100);
      group.add(glass);
      plate.position.set(0, 0, 0);
      group.add(plate);
      return group;
    }
    case "model1": {
      const group = new THREE.Group();
      const glass = createGlass();
      const plate = createPlate1(shareValue);
      glass.position.set(-250, 0, 100);
      group.add(glass);
      plate.position.set(0, 0, 0);
      group.add(plate);
      return group;
    }
    case "model2": {
      const group = new THREE.Group();
      const glass = createGlass();
      const plate = createPlate2(shareValue);
      glass.position.set(-250, 0, 100);
      group.add(glass);
      plate.position.set(0, 0, 0);
      group.add(plate);
      return group;
    }
    case "model3": {
      const cube = createCube();
      cube.position.set(0, 0, 0);
      return cube;
    }
    case "model4": {
      const group = new THREE.Group();
      const glass = createGlass4(shareValue);
      const plate = createPlate();
      glass.position.set(-250, 61, 100);
      group.add(glass);
      plate.position.set(0, 0, 0);
      group.add(plate);
      return group;
    }
    case "model5": {
      const cube = createCube();
      cube.position.set(0, 0, 0);
      return cube;
    }
    case "model6": {
      const cube = createCube();
      cube.position.set(0, 0, 0);
      return cube;
    }
    case "model7": {
      const group = new THREE.Group();
      const glass = createGlass7(shareValue);
      const plate = createPlate();
      glass.position.set(-250, 0, 100);
      group.add(glass);
      plate.position.set(0, 0, 0);
      group.add(plate);
      return group;
    }
    case "model8": {
      const cube = createCube();
      cube.position.set(0, 0, 0);
      return cube;
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
