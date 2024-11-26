import React, { useState, useEffect } from "react";
import { useThreeRenderer } from "./rendering/ThreeRenderer";
import DownloadButton from "./buttons/DownloadButton";
import GridButton from "./buttons/GridButton";
import CameraPositionLogger from "./buttons/CameraPositionLogger";

function SuggestModelViewer({ glbPath, caption }) {
  const isModelVisible = true;
  const [isGridVisible, setIsGridVisible] = useState(false);
  const [tempShearValue, setTempShearValue] = useState(0); // シークバーの一時的な値
  const [shearValue, setShearValue] = useState(0); // 確定された値

  // Three.js Renderer Hook
  const { renderer, scene, camera, isRendererReady, updateShearValue } =
    useThreeRenderer(glbPath, `canvas-${caption}`, isModelVisible, isGridVisible);

  // シークバー操作時
  const handleShearChange = (event) => {
    setTempShearValue(parseFloat(event.target.value));
  };

  // 決定ボタンを押したときに shearValue を更新
  const applyShearValue = () => {
    setShearValue(tempShearValue);
    if (updateShearValue) updateShearValue(tempShearValue); // Three.js に反映
  };

  useEffect(() => {
    if (!isModelVisible && renderer) {
      renderer.dispose();
    }
  }, [isModelVisible, renderer]);

  return (
    <div className="relative">
      <canvas id={`canvas-${caption}`} className="w-full h-96"></canvas>

      {/* シークバーと値表示 */}
      <div className="flex flex-col items-center mt-4">
        {/* 現在のシークバーの値を表示 */}
        <div className="text-gray-700 mb-2">
          現在の値: <span className="font-bold">{tempShearValue.toFixed(2)}</span>
        </div>

        {/* シークバー */}
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={tempShearValue}
          onChange={handleShearChange}
          className="w-3/4"
        />

        {/* 決定ボタン */}
        <button
          onClick={applyShearValue}
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          決定
        </button>
      </div>

      {/* モデル操作ボタン */}
      <div className="flex justify-center space-x-4 mt-4">
        {isModelVisible && isRendererReady && (
          <>
            <DownloadButton
              renderer={renderer}
              scene={scene}
              camera={camera}
              glbPath={glbPath}
            />
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

export default SuggestModelViewer;
