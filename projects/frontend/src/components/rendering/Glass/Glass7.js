import * as THREE from "three";

export function createGlass7(shearValue) {
  shearValue = shearValue !== undefined ? shearValue : 0.5;
  const group = new THREE.Group();

  // スケール調整
  const scaleFactor = 10;

  // グラス(ダイソービールグラス400ml)
  const glassGeometry = new THREE.CylinderGeometry(
    4.2 * scaleFactor,
    2.9 * scaleFactor,
    12.3 * scaleFactor,
    32
  );

  // せん断変形の行列を作成
  const shearMatrix = new THREE.Matrix4();
  shearMatrix.set(
    1,shearValue*0.5,0,0, // X軸の変形
    0,1,0,0, // Y軸の変形 (ここがせん断)
    0,0,1,0, // Z軸の変形
    0,0,0,1 // 平行移動
  );

  // ジオメトリにせん断変形を適用
  glassGeometry.applyMatrix4(shearMatrix);

  const glassMaterial = new THREE.MeshPhongMaterial({
    color: 0xdddddd,
    shininess: 30,
  });
  const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
  glassMesh.position.y = 6.15 * scaleFactor;
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
