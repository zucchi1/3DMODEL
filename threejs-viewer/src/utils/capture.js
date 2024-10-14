export default function captureScreen(renderer, scene, camera) {
  // 再レンダリングしてからキャプチャ
  renderer.render(scene, camera);

  const canvas = renderer.domElement;
  const link = document.createElement('a');
  link.download = 'canvas_image.png';
  link.href = canvas.toDataURL('image/png');
  link.click();
}
