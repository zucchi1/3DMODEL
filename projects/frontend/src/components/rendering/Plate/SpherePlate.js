import * as THREE from "three";
import { CSG } from 'three-csg-ts';

export function createPlate() {
  const group = new THREE.Group();

  // スケール調整
  const scaleFactor = 10;

  // メイン部分の設定 (中央からリムまで滑らかに上がる)
  const plateGeometry = new THREE.CylinderGeometry(
    16.5 * scaleFactor,
    12.5 * scaleFactor,
    3.3 * scaleFactor,
    64,
    1,
    false
  );
  const plateMaterial = new THREE.MeshPhongMaterial({
    color: 0xdddddd,
    shininess: 60,
  }); // 白い色と光沢
  const plateMesh = new THREE.Mesh(plateGeometry, plateMaterial);
  plateMesh.position.y = 1.75 * scaleFactor;
  group.add(plateMesh);

  // リム（皿の外縁に自然なカーブを追加）
  const rimGeometry = new THREE.CylinderGeometry(
    24.0 * scaleFactor,
    16.5 * scaleFactor,
    1.0 * scaleFactor,
    64,
    1,
    true
  );
  const rimGeometry_trans = new THREE.CylinderGeometry(
    23.5 * scaleFactor,
    16.0 * scaleFactor,
    1.0 * scaleFactor,
    64,
    1,
    true
  );

  // ブール演算を使用してrimGeometryからrimGeometry_transの共通部分を削除
  const rimCSG = CSG.fromMesh(new THREE.Mesh(rimGeometry));
  const rimTransCSG = CSG.fromMesh(new THREE.Mesh(rimGeometry_trans));
  const rimSubtractedCSG = rimCSG.subtract(rimTransCSG);
  const rimSubtractedMesh = CSG.toMesh(rimSubtractedCSG, new THREE.Matrix4(), new THREE.MeshPhongMaterial({
    color: 0xf0f0f0,
    shininess: 70,
  }));

  rimSubtractedMesh.position.y = 3.9 * scaleFactor;
  group.add(rimSubtractedMesh);

  // 糸底（底部に滑らかに接続）
  const footGeometry = new THREE.CylinderGeometry(
    10.0 * scaleFactor,
    10.0 * scaleFactor,
    0.2 * scaleFactor,
    64,
    1,
    false
  );
  const footMaterial = new THREE.MeshPhongMaterial({
    color: 0xdddddd,
    shininess: 70,
  });
  const footMesh = new THREE.Mesh(footGeometry, footMaterial);
  footMesh.position.y = 0.1 * scaleFactor;
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