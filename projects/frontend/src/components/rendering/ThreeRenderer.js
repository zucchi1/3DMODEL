import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Color,
  SRGBColorSpace,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { useEffect, useState, useRef } from "react";
import { addDirectionalLight, addGrid, addAxes } from "../helpers/SceneHelpers";
import { loadModel } from "../helpers/ModelLoader";
import { useCamera } from '../../context/CameraContext'; // useCameraをインポート

export function useThreeRenderer(
  glbPath,
  canvasId,
  isModelVisible,
  isGridVisible,
  isOrbitControlsEnabled,
  shearValue, // シークバーの値
  cameraPosition // カメラ位置
) {
  const { setCameraPosition } = useCamera(); // setCameraPositionを取得
  const [renderer, setRenderer] = useState(null);
  const [scene, setScene] = useState(null);
  const [isRendererReady, setIsRendererReady] = useState(false);
  const cameraRef = useRef(null); // カメラを保持
  const controlsRef = useRef(null); // OrbitControlsを保持
  const modelRef = useRef(null); // 現在のモデルを保持

  useEffect(() => {
    if (!isModelVisible) return;

    const canvas = document.getElementById(canvasId);
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    // Renderer setup
    const rendererInstance = new WebGLRenderer({ canvas });
    rendererInstance.setSize(canvas.clientWidth, canvas.clientHeight);
    rendererInstance.outputColorSpace = SRGBColorSpace;

    // Scene setup
    const sceneInstance = new Scene();
    sceneInstance.background = new Color(0xf5f5f5);

    // Camera setup
    const aspect = canvas.clientWidth / canvas.clientHeight;
    const camera = new PerspectiveCamera(45, aspect, 1, 10000);
    if (cameraPosition) {
      camera.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
    } else {
      camera.position.set(0, 194, -461);
    }
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, rendererInstance.domElement);
    controls.enabled = isOrbitControlsEnabled; // ここで有効/無効を設定
    controlsRef.current = controls;

    // カメラ位置が変更されたときにCameraContextを更新
    controls.addEventListener('change', () => {
      setCameraPosition({
        x: camera.position.x,
        y: camera.position.y,
        z: camera.position.z,
      });
    });

    // Lighting setup
    addDirectionalLight(sceneInstance);

    // Grid and axes helpers
    if (isGridVisible) {
      addGrid(sceneInstance);
      addAxes(sceneInstance);
    }

    // Model loading
    loadModel(glbPath, sceneInstance, shearValue).then((model) => {
      if (model) {
        sceneInstance.add(model);
        modelRef.current = model; // モデルを保持
        setIsRendererReady(true); // レンダラーが準備完了
      }
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      if (isOrbitControlsEnabled) {
        controls.update();
      }
      rendererInstance.render(sceneInstance, camera);
    };
    animate();

    // Set state
    setRenderer(rendererInstance);
    setScene(sceneInstance);

    // Cleanup
    return () => {
      rendererInstance.dispose();
      sceneInstance.clear();
    };
  }, [canvasId, glbPath, isModelVisible, isGridVisible, isOrbitControlsEnabled, shearValue, cameraPosition, setCameraPosition]);

  useEffect(() => {
    if (controlsRef.current) {
      controlsRef.current.enabled = isOrbitControlsEnabled; // isOrbitControlsEnabledの変更に対応
    }
  }, [isOrbitControlsEnabled]);

  useEffect(() => {
    if (!scene || !modelRef.current) return;

    // 既存モデルを削除して新しいモデルを読み込む
    scene.remove(modelRef.current);

    loadModel(glbPath, scene, shearValue).then((model) => {
      if (model) {
        scene.add(model);
        modelRef.current = model; // 新しいモデルを保持
      }
    });
  }, [shearValue, scene, glbPath]);

  useEffect(() => {
    if (cameraRef.current && cameraPosition) {
      cameraRef.current.position.set(cameraPosition.x, cameraPosition.y, cameraPosition.z);
      setCameraPosition(cameraPosition); // カメラ位置を更新
    }
  }, [cameraPosition, setCameraPosition]);

  return { renderer, scene, camera: cameraRef.current, isRendererReady, controlsRef };
}