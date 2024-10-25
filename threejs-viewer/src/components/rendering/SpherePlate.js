import * as THREE from "three";

export function createPlate() {
  const group = new THREE.Group();

  // 1. プレートのメイン部分
  const plateGeometry = new THREE.CylinderGeometry(10, 12, 1, 32);
  const plateMaterial = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const plateMesh = new THREE.Mesh(plateGeometry, plateMaterial);
  plateMesh.position.y = 0.5; // 少し持ち上げる
  group.add(plateMesh);

  // 2. 縁の部分（リム）
  const rimGeometry = new THREE.TorusGeometry(11, 0.5, 16, 100);
  const rimMesh = new THREE.Mesh(rimGeometry, plateMaterial);
  rimMesh.rotation.x = Math.PI / 2; // トーラスを水平方向にする
  rimMesh.position.y = 1; // メイン部分と少し重ねる
  group.add(rimMesh);

  // 3. 糸底（皿の底の部分）
  const footRingGeometry = new THREE.TorusGeometry(6, 0.3, 16, 100);
  const footRingMesh = new THREE.Mesh(footRingGeometry, plateMaterial);
  footRingMesh.rotation.x = Math.PI / 2;
  footRingMesh.position.y = -0.5; // プレートの底に配置
  group.add(footRingMesh);

  return group;
}
