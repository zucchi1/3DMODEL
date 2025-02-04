export default function captureScreen2(renderer, scene, camera) {
  if (!renderer || !scene || !camera) {
    console.error('Renderer, scene, or camera is not defined');
    return;
  }

  // 再レンダリングしてからキャプチャ
  renderer.render(scene, camera);

  const canvas = renderer.domElement;
  return canvas.toDataURL('image/png');
}