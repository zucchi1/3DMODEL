import React from 'react';
import captureScreen from '../../utils/capture';
import { primaryButtonStyle } from './styles/buttonStyles'; // スタイルをインポート

function DownloadButton({ renderer, scene, camera, glbPath }) {
  const handleClick = () => {
    if (renderer && scene && camera) {
      captureScreen(renderer, scene, camera, glbPath);
    }
  };

  return (
    <button
      onClick={handleClick}
      className={primaryButtonStyle}  // スタイルを適用
    >
      2D画像をDLする
    </button>
  );
}

export default DownloadButton;