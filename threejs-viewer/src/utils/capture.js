export default function captureScreen(renderer, scene, camera) {
  // 現在のシーンをレンダリング
  renderer.render(scene, camera);

  // レンダリングされたcanvasを取得
  const canvas = renderer.domElement;

  // Canvasの内容をPNG画像として取得
  const link = document.createElement('a');
  link.download = 'canvas_image.png';  // ダウンロードするファイル名
  link.href = canvas.toDataURL('image/png');  // canvasの内容をPNGデータURLとして取得
  link.click();  // 自動的にリンクをクリックしてダウンロード
}
