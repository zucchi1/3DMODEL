import * as THREE from "three";
import { CSG } from 'three-csg-ts';
import { SPHERE_PLATE_PARAMS } from "./SpherePlateDefeault";

export function createPlate1(shearValue) {
  shearValue = shearValue !== undefined ? shearValue : 0.5;
  const group = new THREE.Group();

  // スケール調整
  const scaleFactor = SPHERE_PLATE_PARAMS.scaleFactor;

  // メイン部分の設定
  const plateGeometry = new THREE.CylinderGeometry(
    SPHERE_PLATE_PARAMS.plate.topRadius * scaleFactor,
    SPHERE_PLATE_PARAMS.plate.bottomRadius * scaleFactor,
    SPHERE_PLATE_PARAMS.plate.height * scaleFactor,
    SPHERE_PLATE_PARAMS.plate.radialSegments,
    SPHERE_PLATE_PARAMS.plate.heightSegments,
    SPHERE_PLATE_PARAMS.plate.openEnded
  );
  const plateMaterial = new THREE.MeshPhongMaterial({
    color: SPHERE_PLATE_PARAMS.plate.color,
    shininess: SPHERE_PLATE_PARAMS.plate.shininess,
  });
  const plateMesh = new THREE.Mesh(plateGeometry, plateMaterial);
  plateMesh.position.y = (SPHERE_PLATE_PARAMS.plate.yOffset + SPHERE_PLATE_PARAMS.plate.height / 2) * scaleFactor;
  group.add(plateMesh);

  // リム
  const rimGeometry = new THREE.CylinderGeometry(
    SPHERE_PLATE_PARAMS.rim.topRadius * scaleFactor,
    SPHERE_PLATE_PARAMS.rim.bottomRadius * scaleFactor,
    SPHERE_PLATE_PARAMS.rim.height * scaleFactor,
    SPHERE_PLATE_PARAMS.rim.radialSegments,
    SPHERE_PLATE_PARAMS.rim.heightSegments,
    SPHERE_PLATE_PARAMS.rim.openEnded
  );
  const rimGeometry_trans = new THREE.CylinderGeometry(
    SPHERE_PLATE_PARAMS.rim.rimTransTopRadius * scaleFactor,
    SPHERE_PLATE_PARAMS.rim.rimTransBottomRadius * scaleFactor,
    SPHERE_PLATE_PARAMS.rim.height * scaleFactor,
    SPHERE_PLATE_PARAMS.rim.radialSegments,
    SPHERE_PLATE_PARAMS.rim.heightSegments,
    SPHERE_PLATE_PARAMS.rim.openEnded
  );

  const rimCSG = CSG.fromMesh(new THREE.Mesh(rimGeometry));
  const rimTransCSG = CSG.fromMesh(new THREE.Mesh(rimGeometry_trans));
  const rimSubtractedCSG = rimCSG.subtract(rimTransCSG);
  const rimSubtractedMesh = CSG.toMesh(rimSubtractedCSG, new THREE.Matrix4(), new THREE.MeshPhongMaterial({
    color: SPHERE_PLATE_PARAMS.rim.color,
    shininess: SPHERE_PLATE_PARAMS.rim.shininess,
  }));

  rimSubtractedMesh.position.y = (SPHERE_PLATE_PARAMS.plate.height + SPHERE_PLATE_PARAMS.plate.yOffset + SPHERE_PLATE_PARAMS.rim.height / 2) * scaleFactor;
  group.add(rimSubtractedMesh);

  // 糸底
  const footGeometry = new THREE.CylinderGeometry(
    SPHERE_PLATE_PARAMS.foot.topRadius * scaleFactor,
    SPHERE_PLATE_PARAMS.foot.bottomRadius * scaleFactor,
    SPHERE_PLATE_PARAMS.foot.height * scaleFactor,
    SPHERE_PLATE_PARAMS.foot.radialSegments,
    SPHERE_PLATE_PARAMS.foot.heightSegments,
    SPHERE_PLATE_PARAMS.foot.openEnded
  );
  const footMaterial = new THREE.MeshPhongMaterial({
    color: SPHERE_PLATE_PARAMS.foot.color,
    shininess: SPHERE_PLATE_PARAMS.foot.shininess,
  });
  const footMesh = new THREE.Mesh(footGeometry, footMaterial);
  footMesh.position.y = SPHERE_PLATE_PARAMS.foot.yOffset * scaleFactor;
  group.add(footMesh);

  // せん断変形行列を作成
  const shearMatrix = new THREE.Matrix4();
  shearMatrix.set(
    1, 0, 0, 0,
    0, 1, shearValue, 0,
    0, 0, 1, 0,
    0, 0, 0, 1
  );
  group.applyMatrix4(shearMatrix);

  // ライト
  const ambientLight = new THREE.AmbientLight(
    SPHERE_PLATE_PARAMS.light.ambient.color,
    SPHERE_PLATE_PARAMS.light.ambient.intensity
  );
  const spotLight = new THREE.SpotLight(
    SPHERE_PLATE_PARAMS.light.spot.color,
    SPHERE_PLATE_PARAMS.light.spot.intensity
  );
  spotLight.position.set(
    ...SPHERE_PLATE_PARAMS.light.spot.position.map(v => v * scaleFactor)
  );
  spotLight.castShadow = true;
  group.add(ambientLight);
  group.add(spotLight);

  return group;
}