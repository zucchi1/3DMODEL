export default function captureScreen() {
  const canvas = document.querySelector('#canvas');  // 画面キャプチャ対象のCanvas要素を取得
  const link = document.createElement('a');  // ダウンロード用リンクを生成
  link.download = 'canvas_image.png';  // ダウンロードファイル名
  link.href = canvas.toDataURL('image/png');  // Canvasの内容をPNG形式でエンコード
  link.click();  // 自動的にリンクをクリックして画像をダウンロード
}
