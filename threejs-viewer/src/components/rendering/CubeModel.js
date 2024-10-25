// src/components/rendering/CubeModel.js
import * as THREE from 'three';

function CubeModel(scene) {
  const geometry = new THREE.BoxGeometry(1, 1, 1);
  const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
  const cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  return cube;
}

export default CubeModel;
