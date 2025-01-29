import * as THREE from "three";

export function createGlass4(shearValue) {
  shearValue = shearValue !== undefined ? shearValue : 0.5;
  const group = new THREE.Group();
  console.log("shearValue", shearValue);
  // スケール調整
  const scaleFactor = 10;

  // グラス(ダイソービールグラス400ml)傾きのないグラス
    const glassGeometry = new THREE.CylinderGeometry(
      3.9 * scaleFactor,
      2.9 * scaleFactor,
      9.3 * scaleFactor,
      32
    );
  
    const glassMaterial = new THREE.MeshPhongMaterial({
      color: 0xdddddd,
      shininess: 30,
    });
    const glassMesh = new THREE.Mesh(glassGeometry, glassMaterial);
    glassMesh.position.y = -1.6 * scaleFactor;
    group.add(glassMesh);

  //傾きのあるグラス
  const glassGeometry_lean = new THREE.CylinderGeometry(
    4.2 * scaleFactor,
    3.6 * scaleFactor,
    6.2 * scaleFactor,
    32
  );
  // せん断変形の行列を作成
  const shearMatrix = new THREE.Matrix4();
  shearMatrix.set(
    1,0,0,0, // X軸の変形
    0,1,shearValue,0, // Y軸の変形 (ここがせん断)
    0,0,1,0, // Z軸の変形
    0,0,0,1 // 平行移動
  );

  // ジオメトリにせん断変形を適用
  glassGeometry_lean.applyMatrix4(shearMatrix);

  const glassMaterial_lean = new THREE.MeshPhongMaterial({ 
    color: 0xdddddd,
    shininess: 30,});
  const glassMesh_lean = new THREE.Mesh(glassGeometry_lean, glassMaterial_lean);
  glassMesh_lean.position.y = 3.1 * scaleFactor;
  group.add(glassMesh_lean);

  return group;
}