import React from 'react';
import captureScreen from '../../utils/capture';

function DownloadButton({ renderer, scene, camera,glbPath}) {
  const handleClick = () => {
    if (renderer && scene && camera) {
      captureScreen(renderer, scene, camera,glbPath);
    }
  };

  return (
    <button
      onClick={handleClick}
      className="bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700"
    >
      2D画像をDLする
    </button>
  );
}

export default DownloadButton;
