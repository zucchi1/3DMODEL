import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useThreeRenderer } from './rendering/ThreeRenderer';

function DrawingViewer({ glbPath, caption, canvasId, shearValue }) {
  const isModelVisible = true;
  const isGridVisible = false;
  const isOrbitControlsEnabled = false; // OrbitControlsを有効にするかどうかのフラグ
  const { renderer, scene, camera, isRendererReady } = useThreeRenderer(glbPath, canvasId, isModelVisible, isGridVisible, isOrbitControlsEnabled, shearValue); // isModelVisibleを依存関係に追加
  const canvasRef = useRef(null);
  const [processedImageUrl, setProcessedImageUrl] = useState('');

  useEffect(() => {
    if (!isModelVisible && renderer) {
      // 3Dモデルが表示されていない時、レンダラーを停止してメモリリークを防ぐ
      renderer.dispose();
    }
  }, [isModelVisible, renderer]);

  const handleCapture = useCallback(async () => {
    if (renderer && scene && camera && isRendererReady) {
      // レンダリングが完了するのを待つ
      await new Promise((resolve) => {
        requestAnimationFrame(() => {
          renderer.render(scene, camera);
          resolve();
        });
      });

      const canvas = renderer.domElement;
      canvas.toBlob(async (blob) => {
        const formData = new FormData();
        formData.append('file', blob);

        try {
          const uploadResponse = await fetch('http://10.30.45.125:5000/upload', { // ここを変更
            method: 'POST',
            body: formData,
          });

          if (!uploadResponse.ok) {
            throw new Error('Network response was not ok');
          }

          const processedBlob = await uploadResponse.blob();
          const imageUrl = URL.createObjectURL(processedBlob);
          setProcessedImageUrl(imageUrl);
        } catch (error) {
          console.error('Error:', error);
        }
      }, 'image/png');
    }
  }, [renderer, scene, camera, isRendererReady]);

  useEffect(() => {
    if (isRendererReady) {
      handleCapture();
    }
  }, [handleCapture, isRendererReady]);

  return (
    <div className="relative">
      {!processedImageUrl && <canvas id={canvasId} ref={canvasRef} className="w-full h-48" style={{visibility: 'hidden'}}></canvas>}
      {processedImageUrl && <img src={processedImageUrl} alt="Processed" />}
    </div>
  );
}

export default DrawingViewer;