import React, { useState, useEffect } from "react";
import { useThreeRenderer } from "./rendering/ThreeRenderer";
import DownloadButton from "./buttons/DownloadButton";
import GridButton from "./buttons/GridButton";
import CameraPositionLogger from "./buttons/CameraPositionLogger";

function ModelViewer({ glbPath, caption }) {
  const isModelVisible = true;
  const [isGridVisible, setIsGridVisible] = useState(false);
  const [shearValue, setShearValue] = useState(0.5); // 初期値を設定
  const { renderer, scene, camera, isRendererReady } = useThreeRenderer(
    glbPath,
    `canvas-${caption}`,
    isModelVisible,
    isGridVisible,
    shearValue // shearValueを依存関係に追加
  );

  // シークバー変更時の処理
  const handleShearChange = (e) => {
    setShearValue(parseFloat(e.target.value));
  };

  useEffect(() => {
    if (!isModelVisible && renderer) {
      renderer.dispose();
    }
  }, [isModelVisible, renderer]);

  return (
    <div className="relative">
      <canvas id={`canvas-${caption}`} className="w-full h-96"></canvas>

      {/* シークバーを追加 */}
      <div className="flex flex-col items-center mt-4">
        <label htmlFor="shear-slider">Shear Value: {shearValue.toFixed(2)}</label>
        <input
          id="shear-slider"
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={shearValue}
          onChange={handleShearChange}
          className="w-full mt-2"
        />
      </div>

      <div className="flex justify-center space-x-4 mt-4">
        {isModelVisible && isRendererReady && (
          <>
            <DownloadButton renderer={renderer} scene={scene} camera={camera} glbPath={glbPath} />
            <GridButton
              isGridVisible={isGridVisible}
              setIsGridVisible={setIsGridVisible}
            />
            <CameraPositionLogger camera={camera} />
          </>
        )}
      </div>
    </div>
  );
}

export default ModelViewer;
