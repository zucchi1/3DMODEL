import React from 'react';
import captureScreen from '../utils/capture';  // インポートのパスを確認

function DownloadButton({ renderer, scene, camera }) {
  const handleClick = () => {
    captureScreen(renderer, scene, camera);  // キャプチャ機能を呼び出し
  };

  return (
    <button
      onClick={handleClick}
      className="absolute bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700"
    >
      2D画像をDLする
    </button>
  );
}

export default DownloadButton;
