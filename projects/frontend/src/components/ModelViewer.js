import React, { useState, useEffect, useRef } from 'react';
import { useThreeRenderer } from './rendering/ThreeRenderer';
//import DownloadButton from './buttons/DownloadButton';
import GridButton from './buttons/GridButton';
//port CameraPositionLogger from './buttons/CameraPositionLogger';

function ModelViewer({ glbPath, imagePath, caption, canvasId, shearValue, cameraPosition }) {
  const isModelVisible = true;
  const [isGridVisible, setIsGridVisible] = useState(false);
  const canvasRef = useRef(null);
  const { renderer, scene, camera, isRendererReady } = useThreeRenderer(glbPath, canvasId, isModelVisible, isGridVisible, true, shearValue, cameraPosition);

  useEffect(() => {
    if (!isModelVisible && renderer) {
      // 3Dモデルが表示されていない時、レンダラーを停止してメモリリークを防ぐ
      console.log("dispose");
      renderer.dispose();
    }
  }, [isModelVisible, renderer]);

  useEffect(() => {
    if (renderer && scene && camera && isRendererReady) {
      const canvas = canvasRef.current;
      if (canvas) {
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        renderer.render(scene, camera);
      }
    }
  }, [renderer, scene, camera, isRendererReady]);

  return (
    <div className="relative">
      {isModelVisible ? (
        <canvas id={canvasId} ref={canvasRef} className="w-full h-64"></canvas>
      ) : (
        <img src={imagePath} alt={`${caption}のデッサン`} className="w-full h-96 object-contain" />
      )}

      {/* ボタンをフレックスボックスで水平に並べる */}
      <div className="flex justify-center space-x-4 mt-4">
        
        {isModelVisible && isRendererReady && (
          <><GridButton
              isGridVisible={isGridVisible}
              setIsGridVisible={setIsGridVisible} />
          {/*
            <DownloadButton renderer={renderer} scene={scene} camera={camera} glbPath={glbPath} />
            
            <CameraPositionLogger camera={camera} />
          */}</>
          
        )}
        
      </div>
    </div>
  );
}

export default ModelViewer;