import React, { useState } from 'react';
import { useThreeRenderer } from './rendering/ThreeRenderer';
import DownloadButton from './buttons/DownloadButton';
import ToggleButton from './buttons/ToggleButton';

function ModelViewer({ glbPath, imagePath, caption }) {
  const [isModelVisible, setIsModelVisible] = useState(true);
  const { renderer, scene, camera, isRendererReady } = useThreeRenderer(glbPath, `canvas-${caption}`);

  return (
    <div className="relative">
      {isModelVisible ? (
        <>
          <canvas id={`canvas-${caption}`} className="w-full h-96"></canvas>
        </>
      ) : (
        <img src={imagePath} alt={`${caption}のデッサン`} className="w-full h-96 object-contain" />
      )}

      {/* ボタンをフレックスボックスで水平に並べる */}
      <div className="flex justify-center space-x-4 mt-4">
        <ToggleButton 
          isModelVisible={isModelVisible} 
          setIsModelVisible={setIsModelVisible} 
        />
        {/* モデルが表示されている時だけダウンロードボタンを表示 */}
        {isModelVisible && isRendererReady && (
          <DownloadButton renderer={renderer} scene={scene} camera={camera} />
        )}
      </div>
    </div>
  );
}

export default ModelViewer;
