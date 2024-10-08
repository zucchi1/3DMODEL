// 画面キャプチャ機能をエクスポート
export default function captureScreen(renderer, scene, camera) {
  renderer.render(scene, camera); // レンダリングしてからキャプチャ
  const canvas = renderer.domElement; // Three.jsのcanvas要素を取得
  const link = document.createElement('a'); // ダウンロード用リンクを生成
  link.download = 'canvas_image.png'; // ダウンロードファイル名
  link.href = canvas.toDataURL('image/png'); // Canvasの内容をPNG形式でエンコード
  link.click(); // 自動的にリンクをクリックして画像をダウンロード
}
