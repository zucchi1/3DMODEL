import { BoxGeometry, MeshBasicMaterial, Mesh } from "three";

export function createCube() {
  const geometry = new BoxGeometry(400, 400, 400);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  return new Mesh(geometry, material);
}
