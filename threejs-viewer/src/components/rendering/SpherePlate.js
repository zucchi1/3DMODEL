import * as THREE from "three";

export function createPlate() {
  const group = new THREE.Group();

  // 比率を保持しつつ、自然に見えるように設定
  const scaleFactor = 10;

  // プレートのメイン部分 (M2の直径 27.0 cm、高さ M4 4.5 cm)
  const plateGeometry = new THREE.CylinderGeometry(13.5 * scaleFactor, 13.5 * scaleFactor, 4.0 * scaleFactor, 64, 1, true);
  const plateMaterial = new THREE.MeshBasicMaterial({ color: 0xffcc99, side: THREE.DoubleSide }); // 柔らかな色
  const plateMesh = new THREE.Mesh(plateGeometry, plateMaterial);
  plateMesh.position.y = 2.0 * scaleFactor;
  group.add(plateMesh);

  // リムの部分（メイン部分とスムーズに接続）
  const rimGeometry = new THREE.RingGeometry(13.5 * scaleFactor, 15.5 * scaleFactor, 64);
  const rimMaterial = new THREE.MeshBasicMaterial({ color: 0xdddddd, side: THREE.DoubleSide }); // 薄い灰色
  const rimMesh = new THREE.Mesh(rimGeometry, rimMaterial);
  rimMesh.rotation.x = Math.PI / 2;
  rimMesh.position.y = 4.05 * scaleFactor; // メイン部分の上に接続
  group.add(rimMesh);

  // リムの厚みを持たせるためのリング
  const rimEdgeGeometry = new THREE.CylinderGeometry(15.5 * scaleFactor, 15.5 * scaleFactor, 0.2 * scaleFactor, 64, 1);
  const rimEdgeMaterial = new THREE.MeshBasicMaterial({ color: 0xdddddd });
  const rimEdgeMesh = new THREE.Mesh(rimEdgeGeometry, rimEdgeMaterial);
  rimEdgeMesh.position.y = 4.5 * scaleFactor;
  group.add(rimEdgeMesh);

  // 糸底（自然に底部と接続）
  const footRingGeometry = new THREE.CylinderGeometry(12.5 * scaleFactor, 12.5 * scaleFactor, 0.1 * scaleFactor, 64, 1);
  const footRingMaterial = new THREE.MeshBasicMaterial({ color: 0xffffcc });
  const footRingMesh = new THREE.Mesh(footRingGeometry, footRingMaterial);
  footRingMesh.position.y = -2.0 * scaleFactor;
  group.add(footRingMesh);

  return group;
}
