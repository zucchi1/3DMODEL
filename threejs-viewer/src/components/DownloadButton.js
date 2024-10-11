import React, { useState, useEffect } from 'react';
import captureScreen from '../utils/capture';

function DownloadButton({ renderer, scene, camera }) {
  const [isRendererReady, setIsRendererReady] = useState(false);

  useEffect(() => {
    if (renderer) {
      setIsRendererReady(true);
    }
  }, [renderer]);

  const handleClick = () => {
    console.log("Download button clicked");
    if (renderer && scene && camera) {
      console.log("Renderer, Scene, and Camera are initialized. Capturing screen...");
      captureScreen(renderer, scene, camera);  // sceneとcameraも渡してキャプチャ
    } else {
      console.error("Renderer, Scene, or Camera is not initialized.");
    }
  };

  return (
    isRendererReady && (
      <button
        onClick={handleClick}
        className="absolute bottom-5 right-5 bg-blue-500 text-white px-4 py-2 rounded shadow-md hover:bg-blue-700"
      >
        2D画像をDLする
      </button>
    )
  );
}

export default DownloadButton;
