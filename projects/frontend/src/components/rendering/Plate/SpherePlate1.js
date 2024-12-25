import * as THREE from "three";
import { CSG } from 'three-csg-ts';

export function createPlate1() {
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
    color: 0xdddddd,
    shininess: 60,
  }); // 白い色と光沢
  const plateMesh = new THREE.Mesh(plateGeometry, plateMaterial);
  plateMesh.position.y = 2.25 * scaleFactor;
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
  const rimGeometry_trans = new THREE.CylinderGeometry(
    15.0 * scaleFactor,
    13.0 * scaleFactor,
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

  rimSubtractedMesh.position.y = 4.5 * scaleFactor;
  group.add(rimSubtractedMesh);

  // 糸底（底部に滑らかに接続）
  const footGeometry = new THREE.CylinderGeometry(
    9.25 * scaleFactor,
    9.25 * scaleFactor,
    1.0 * scaleFactor,
    64,
    1,
    false
  );
  const footMaterial = new THREE.MeshPhongMaterial({
    color: 0xdddddd,
    shininess: 70,
  });
  const footMesh = new THREE.Mesh(footGeometry, footMaterial);
  footMesh.position.y = 0.25 * scaleFactor;
  group.add(footMesh);

  // せん断変形行列を作成
  const shearMatrix = new THREE.Matrix4();
  shearMatrix.set(
    1,0,0,0, // X軸の変形
    0,1,0.3,0, // Y軸の変形 (ここがせん断)
    0,0,1,0, // Z軸の変形
    0,0,0,1 // 平行移動
  );

  // ジオメトリにせん断変形を適用
  group.applyMatrix4(shearMatrix);

  // 環境光とスポットライトを追加してリアルに照らす
  const ambientLight = new THREE.AmbientLight(0x404040, 1.5); // 環境光
  const spotLight = new THREE.SpotLight(0xffffff, 2);
  spotLight.position.set(0 * scaleFactor, 0 * scaleFactor, 0 * scaleFactor);
  spotLight.castShadow = true;
  group.add(ambientLight);
  group.add(spotLight);

  return group;
}