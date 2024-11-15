import * as THREE from "three";

export function createGlass() {
  const group = new THREE.Group();

  // スケール調整
  const scaleFactor = 10;

  // グラス
  const glassGeometry = new THREE.CylinderGeometry(
    9.25 * scaleFactor,
    9.25 * scaleFactor,
    4.5 * scaleFactor,
    32
  );
  const glassMaterial = new THREE.MeshPhongMaterial({
    color: 0xdddddd,
    shininess: 30,
  });
  const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
  // glassMesh.position.y = -1.75 * scaleFactor;
  group.add(glassMesh);

  // 環境光とスポットライトを追加してリアルに照らす
  const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // 環境光
  const spotLight = new THREE.SpotLight(0xffffff, 2);
  spotLight.position.set(0 * scaleFactor, 0 * scaleFactor, 0 * scaleFactor);
  spotLight.castShadow = true;
  group.add(ambientLight);
  group.add(spotLight);

  return group;
}
