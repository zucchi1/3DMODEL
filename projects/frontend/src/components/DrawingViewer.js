import React, { useEffect } from 'react';
import { useThreeRenderer } from './rendering/ThreeRenderer';

function DrawingViewer({ glbPath, caption, canvasId ,shearValue}) {
  const isModelVisible = true;
  const isGridVisible = false;
  const isOrbitControlsEnabled = false; // OrbitControlsを有効にするかどうかのフラグ
  const { renderer } = useThreeRenderer(glbPath, canvasId, isModelVisible, isGridVisible, isOrbitControlsEnabled,shearValue); // isModelVisibleを依存関係に追加

  useEffect(() => {
    if (!isModelVisible && renderer) {
      // 3Dモデルが表示されていない時、レンダラーを停止してメモリリークを防ぐ
      renderer.dispose();
    }
  }, [isModelVisible, renderer]);

  return (
    <div className="relative">
      <canvas id={canvasId} className="w-full h-48"></canvas>
    </div>
  );
}

export default DrawingViewer;
