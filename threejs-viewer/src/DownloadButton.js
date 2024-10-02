import React from 'react';
import captureScreen from './capture';  // キャプチャ処理を別ファイルからインポート

function DownloadButton() {
  const handleClick = () => {
    captureScreen();  // ボタンクリック時にキャプチャ処理を呼び出し
  };

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700"
    >
      2D画像をDLする  {/* ダウンロードボタンのラベル */}
    </button>
  );
}

export default DownloadButton;
