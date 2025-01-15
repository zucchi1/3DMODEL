import React, { useState, useEffect } from "react";
import { useThreeRenderer } from "./rendering/ThreeRenderer";
import DownloadButton from "./buttons/DownloadButton";
import GridButton from "./buttons/GridButton";
import CameraPositionLogger from "./buttons/CameraPositionLogger";
import ShearValueInput from "./buttons/ShearValueInput";
import * as THREE from "three";

function SuggestModelViewer({ glbPath, caption }) {
  const isModelVisible = true;
  const [isGridVisible, setIsGridVisible] = useState(false);
  const isOrbitControlsEnabled = false; // OrbitControlsを有効にするかどうかのフラグ

  // Three.js Renderer Hook
  const { renderer, scene, camera, isRendererReady} =
    useThreeRenderer(glbPath, `canvas-${caption}`, isModelVisible, isGridVisible, isOrbitControlsEnabled);

  useEffect(() => {
    if (!isModelVisible && renderer) {
      renderer.dispose();
    }
  }, [isModelVisible, renderer]);

  return (
    <div className="relative">
      <canvas id={`canvas-${caption}`} className="w-full h-96"></canvas>

      {/* シークバーと値表示 */}
      <ShearValueInput/>

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
