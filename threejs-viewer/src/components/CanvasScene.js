import React, { useEffect, useState } from 'react';
import { WebGLRenderer, Scene, PerspectiveCamera, DirectionalLight, SRGBColorSpace } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import DownloadButton from './DownloadButton';  // ダウンロードボタンのインポート

function CanvasScene() {
  const [renderer, setRenderer] = useState(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    const canvas = document.querySelector('#canvas');
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

    loader.load('./glb/monkey.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(400.0, 400.0, 400.0);
      model.position.set(0, -400, 0);
      sceneInstance.add(model);
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
      rendererInstance.dispose();
    };
  }, []);

  return (
    <div id="main_canvas" className="w-full h-full">
      <canvas id="canvas" className="w-full h-full"></canvas>
      {/* ダウンロードボタンにrenderer, scene, cameraを渡す */}
      {renderer && scene && camera && <DownloadButton renderer={renderer} scene={scene} camera={camera} />}
    </div>
  );
}

export default CanvasScene;
