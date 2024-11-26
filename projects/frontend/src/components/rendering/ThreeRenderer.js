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

export function useThreeRenderer(
  glbPath,
  canvasId,
  isModelVisible,
  isGridVisible,
  shearValue // シークバーの値
) {
  const [renderer, setRenderer] = useState(null);
  const [scene, setScene] = useState(null);
  const isRendererReady = useRef(false);

  const cameraRef = useRef(null); // カメラを保持
  const controlsRef = useRef(null); // OrbitControlsを保持
  const modelRef = useRef(null); // 現在のモデルを保持
  console.log('ShearValue(useThreeRenderer)',shearValue);
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
    camera.position.set(0, 70, -400);
    cameraRef.current = camera;

    const controls = new OrbitControls(camera, rendererInstance.domElement);
    controlsRef.current = controls;

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
        isRendererReady.current = true;
      }
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
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
  }, [canvasId, glbPath, isModelVisible, isGridVisible]);

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

  return { renderer, scene, camera: cameraRef.current, isRendererReady: isRendererReady.current, controlsRef };
}
