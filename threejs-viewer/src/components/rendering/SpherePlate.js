// src/components/rendering/SpherePlate.js
import { CylinderGeometry, Mesh, MeshStandardMaterial } from 'three';

export function createPlate() {
  // 丸皿の形状とマテリアル
  const geometry = new CylinderGeometry(300, 300, 20, 32); // 円盤の形状（円柱の薄い形状）
  const material = new MeshStandardMaterial({ color: 0xaaaaaa });
  
  return new Mesh(geometry, material);
}
