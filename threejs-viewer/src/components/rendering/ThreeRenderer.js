import { WebGLRenderer, Scene, PerspectiveCamera, DirectionalLight, SRGBColorSpace } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import { useEffect, useState } from 'react';

export function useThreeRenderer(glbPath, canvasId, isModelVisible) {
  const [renderer, setRenderer] = useState(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [isRendererReady, setIsRendererReady] = useState(false);

  useEffect(() => {
    if (!isModelVisible) {
      return;  // モデルが表示されていない場合、何もしない
    }

    const canvas = document.querySelector(`#${canvasId}`);
    if (!canvas) {
      console.error("Canvas element not found");
      return;
    }

    const rendererInstance = new WebGLRenderer({ canvas });
    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    rendererInstance.setSize(width, height);
    rendererInstance.outputColorSpace = SRGBColorSpace;

    const sceneInstance = new Scene();
    const cameraInstance = new PerspectiveCamera(45, width / height, 1, 10000);
    cameraInstance.position.set(0, 400, -1000);

    const controls = new OrbitControls(cameraInstance, rendererInstance.domElement);
    const loader = new GLTFLoader();

    loader.load(glbPath, (gltf) => {
      const model = gltf.scene;
      model.scale.set(400.0, 400.0, 400.0);
      model.position.set(0, -400, 0);
      sceneInstance.add(model);

      setIsRendererReady(true);
    });

    const light = new DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    sceneInstance.add(light);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      rendererInstance.render(sceneInstance, cameraInstance);
    };
    animate();

    setRenderer(rendererInstance);
    setScene(sceneInstance);
    setCamera(cameraInstance);

    return () => {
      rendererInstance.dispose();  // クリーンアップ
    };
  }, [glbPath, canvasId, isModelVisible]);

  return { renderer, scene, camera, isRendererReady };
}
