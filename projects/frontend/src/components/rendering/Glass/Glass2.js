import * as THREE from "three";
import { createGlassGroup } from './Glass';
import { CSG } from 'three-csg-ts';
//Glass2を定義する理由：グラスと丸皿の共通部分の前後関係を整えるためです
export function createGlass2(shearValue) {
  shearValue = shearValue !== undefined ? shearValue : 0.5;
  const scaleFactor = 10;
  const new_group = new THREE.Group();
  const { group, glassGeometry } = createGlassGroup(scaleFactor);
  // せん断変形の行列を作成
  const glassMatrix = new THREE.Matrix4();
  glassMatrix.set(
    1, 0, 0, 0, // X軸の変形，(0.9+shearValue)はマジックナンバー
    0, 1, 0, 61, // Y軸の変形 (ここがせん断)
    0, 0, 1, 0, // Z軸の変形
    0, 0, 0, 1 // 平行移動
  );
  // ジオメトリにせん断変形を適用
  glassGeometry.applyMatrix4(glassMatrix);

  // リムのそとの部分
  const rimGeometry = new THREE.CylinderGeometry(
      13.0 * scaleFactor,
      9.25 * scaleFactor,
      1.5 * scaleFactor,
      64,
  );
  
  // せん断変形の行列を作成
  const shearMatrix = new THREE.Matrix4();
  shearMatrix.set(
    (0.9 + shearValue), 0, 0, 125, // X軸の変形，(0.9+shearValue)はマジックナンバー
    0, (0.9 + shearValue), 0, 27*(1+shearValue), // Y軸の変形 (ここがせん断)
    0, 0, 1 * (0.9 + shearValue), -100, // Z軸の変形
    0, 0, 0, 1 // 平行移動
  );
  // ジオメトリにせん断変形を適用
  rimGeometry.applyMatrix4(shearMatrix);

  const rimGeometryMaterial = new THREE.MeshPhongMaterial({
    color: 0xee44ff,
    shininess: 70,
  });
  const rimGeometryMesh = new THREE.Mesh(rimGeometry, rimGeometryMaterial);
  group.add(rimGeometryMesh);

  const glassCSG = CSG.fromMesh(new THREE.Mesh(glassGeometry));
  const rimCSG = CSG.fromMesh(new THREE.Mesh(rimGeometry));
  const glassSubtractedCSG = glassCSG.subtract(rimCSG);
  const glassSubtractedMesh = CSG.toMesh(glassSubtractedCSG, new THREE.Matrix4(), new THREE.MeshPhongMaterial({
    color: 0xdddddd,
    shininess: 30,
  }));

  //glassSubtractedMesh.position.y = -3.15 * scaleFactor;
  new_group.add(glassSubtractedMesh);

  

  // 環境光とスポットライトを追加してリアルに照らす
  const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // 環境光
  const spotLight = new THREE.SpotLight(0xffffff, 2);
  spotLight.position.set(0 * scaleFactor, 0 * scaleFactor, 0 * scaleFactor);
  spotLight.castShadow = true;
  new_group.add(ambientLight);
  new_group.add(spotLight);
  return new_group;
}