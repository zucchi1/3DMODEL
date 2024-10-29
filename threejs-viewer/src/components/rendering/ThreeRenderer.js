import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  Color,
  SRGBColorSpace,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useState } from "react";
import { addDirectionalLight, addGrid, addAxes } from "../helpers/SceneHelpers";
import { loadModel } from "../helpers/ModelLoader"; // モデルローダー関数のインポート

export function useThreeRenderer(glbPath, canvasId, isModelVisible, isGridVisible) {
  const [renderer, setRenderer] = useState(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [isRendererReady, setIsRendererReady] = useState(false);

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
    const cameraInstance = createCamera(canvas);
    const controls = new OrbitControls(cameraInstance, rendererInstance.domElement);

    // Lighting setup
    addDirectionalLight(sceneInstance);

    // Grid and axes helpers
    if (isGridVisible) {
      addGrid(sceneInstance);
      addAxes(sceneInstance);
    }

    // Model loading
    loadModel(glbPath, sceneInstance).then((model) => {
      if (model) {
        sceneInstance.add(model);
        setIsRendererReady(true);
      }
    });

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      rendererInstance.render(sceneInstance, cameraInstance);
    };
    animate();

    // State updates
    setRenderer(rendererInstance);
    setScene(sceneInstance);
    setCamera(cameraInstance);

    // Cleanup
    return () => {
      sceneInstance.clear();
      rendererInstance.dispose();
    };
  }, [glbPath, canvasId, isModelVisible, isGridVisible]);

  return { renderer, scene, camera, isRendererReady };
}

// Camera creation helper
function createCamera(canvas) {
  const aspect = canvas.clientWidth / canvas.clientHeight;
  const camera = new PerspectiveCamera(45, aspect, 1, 10000);
  camera.position.set(0, 100, -300);
  return camera;
}
