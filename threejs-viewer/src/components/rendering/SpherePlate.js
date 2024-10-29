import * as THREE from "three";

export function createPlate() {
  const group = new THREE.Group();

  // 1. プレートのメイン部分（全体のサイズを6倍に）red
  const plateGeometry = new THREE.CylinderGeometry(300, 30, 300, 32); //円柱
  //THREE.CylinderGeometry ( radiusTop, radiusBottom, height, radiusSegments, heightSegments, openEnded );
  const plateMesh = new THREE.Mesh(
    plateGeometry,
    new THREE.MeshStandardMaterial({ color: 0xff0000 })
  );
  plateMesh.position.y = 15; // 少し持ち上げる
  group.add(plateMesh);

  // 2. 縁の部分（リム）（6倍サイズに拡大）blue
  const rimGeometry = new THREE.TorusGeometry(100, 15, 16, 100);
  const rimMesh = new THREE.Mesh(
    rimGeometry,
    new THREE.MeshStandardMaterial({ color: 0x00ffff })
  );
  rimMesh.rotation.x = Math.PI / 2; // トーラスを水平方向にする
  rimMesh.position.y = 30; // メイン部分と少し重ねる
  group.add(rimMesh);

  // 3. 糸底（皿の底の部分）（6倍サイズに拡大）黄色
  const footRingGeometry = new THREE.TorusGeometry(180, 2, 16, 50);
  const footRingMesh = new THREE.Mesh(
    footRingGeometry,
    new THREE.MeshStandardMaterial({ color: 0xffff00 })
  );
  footRingMesh.rotation.x = Math.PI / 2;
  footRingMesh.position.y = -15; // プレートの底に配置
  group.add(footRingMesh);

  return group;
}
