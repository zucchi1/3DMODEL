import React, { useState, useEffect } from 'react';
import { useThreeRenderer } from './rendering/ThreeRenderer';
import DownloadButton from './buttons/DownloadButton';
import ToggleButton from './buttons/ToggleButton';
import GridButton from './buttons/GridButton';
import CameraPositionLogger from './buttons/CameraPositionLogger';

function ModelViewer({ glbPath, imagePath, caption }) {
  const [isModelVisible, setIsModelVisible] = useState(false);
  const [isGridVisible, setIsGridVisible]=useState(false);
  const { renderer, scene, camera, isRendererReady } = useThreeRenderer(glbPath, `canvas-${caption}`, isModelVisible , isGridVisible);  // isModelVisibleを依存関係に追加

  useEffect(() => {
    if (!isModelVisible && renderer) {
      // 3Dモデルが表示されていない時、レンダラーを停止してメモリリークを防ぐ
      renderer.dispose();
    }
  }, [isModelVisible, renderer]);

  return (
    <div className="relative">
      {isModelVisible ? (
        <canvas id={`canvas-${caption}`} className="w-full h-96"></canvas>
      ) : (
        <img src={imagePath} alt={`${caption}のデッサン`} className="w-full h-96 object-contain" />
      )}

      {/* ボタンをフレックスボックスで水平に並べる */}
      <div className="flex justify-center space-x-4 mt-4">
        <ToggleButton 
          isModelVisible={isModelVisible} 
          setIsModelVisible={setIsModelVisible} 
        />
        {/* モデルが表示されている時だけ機能ボタンを表示 */}
        {isModelVisible && isRendererReady && (
          <>
          <DownloadButton renderer={renderer} scene={scene} camera={camera} glbPath={glbPath}/>
          <GridButton
            isGridVisible={isGridVisible}
            setIsGridVisible={setIsGridVisible} />
          <CameraPositionLogger camera={camera}/>
          </>
        )}
      </div>
    </div>
  );
}

export default ModelViewer;
