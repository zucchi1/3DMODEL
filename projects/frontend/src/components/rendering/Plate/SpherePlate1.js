import * as THREE from "three";
import { createPlateGroup } from './SpherePlate';

export function createPlate1(shearValue) {
  shearValue = shearValue !== undefined ? shearValue : 0.5;
  const scaleFactor = 10;
  const group = createPlateGroup(scaleFactor);

  // せん断変形行列を作成
  const shearMatrix = new THREE.Matrix4();
  shearMatrix.set(
    1, 0, 0, 0, // X軸の変形
    0, 1, shearValue, 0, // Y軸の変形 (ここがせん断)
    0, 0, 1, 0, // Z軸の変形
    0, 0, 0, 1 // 平行移動
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