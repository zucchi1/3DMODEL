import { DirectionalLight, GridHelper, AxesHelper } from "three";

export function addDirectionalLight(scene) {
  const light = new DirectionalLight(0xffffff);
  light.position.set(1, 1, 1);
  scene.add(light);
}

export function addGrid(scene) {
  const gridHelper = new GridHelper(2000, 50);
  gridHelper.rotation.x = Math.PI / 2;
  scene.add(gridHelper);
}

export function addAxes(scene) {
  const axesHelper = new AxesHelper(1000);
  scene.add(axesHelper);
}
