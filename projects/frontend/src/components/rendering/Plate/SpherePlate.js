import * as THREE from "three";

export function createPlate() {
  const group = new THREE.Group();

  // スケール調整
  const scaleFactor = 10;

  // メイン部分の設定 (中央からリムまで滑らかに上がる)
  const plateGeometry = new THREE.CylinderGeometry(
    13.5 * scaleFactor,
    12.5 * scaleFactor,
    3.5 * scaleFactor,
    64,
    1,
    false
  );
  const plateMaterial = new THREE.MeshPhongMaterial({
    color: 0xff0000,
    shininess: 80,
  }); // 白い色と光沢
  const plateMesh = new THREE.Mesh(plateGeometry, plateMaterial);
  plateMesh.position.y = 2.25* scaleFactor;
  group.add(plateMesh);

  // リム（皿の外縁に自然なカーブを追加）
  const rimGeometry = new THREE.CylinderGeometry(
    15.5 * scaleFactor,
    13.5 * scaleFactor,
    1.0 * scaleFactor,
    64,
    1,
    true
  );
  const rimMaterial = new THREE.MeshPhongMaterial({
    color: 0xf0f0f0,
    shininess: 70,
  });
  const rimMesh = new THREE.Mesh(rimGeometry, rimMaterial);
  rimMesh.position.y = 4.5 * scaleFactor;
  group.add(rimMesh);

  // 糸底（底部に滑らかに接続）
  const footGeometry = new THREE.CylinderGeometry(
    9.25 * scaleFactor,
    9.25 * scaleFactor,
    0.5 * scaleFactor,
    32
  );
  const footMaterial = new THREE.MeshPhongMaterial({
    color: 0xdddddd,
    shininess: 30,
  });
  const footMesh = new THREE.Mesh(footGeometry, footMaterial);
  footMesh.position.y = 0.25 * scaleFactor;
  group.add(footMesh);

  // 環境光とスポットライトを追加してリアルに照らす
  const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // 環境光
  const spotLight = new THREE.SpotLight(0xffffff, 2);
  spotLight.position.set(0 * scaleFactor, 0 * scaleFactor, 0 * scaleFactor);
  spotLight.castShadow = true;
  group.add(ambientLight);
  group.add(spotLight);

  return group;
}
