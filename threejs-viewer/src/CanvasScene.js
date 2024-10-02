import React, { useEffect } from 'react';
import { WebGLRenderer, Scene, PerspectiveCamera, DirectionalLight, SRGBColorSpace } from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

function CanvasScene() {
  useEffect(() => {
    const canvas = document.querySelector('#canvas');  
    const renderer = new WebGLRenderer({ canvas });

    // 親要素の幅と高さを基にキャンバスのサイズを設定
    const resizeRendererToDisplaySize = () => {
      const canvas = renderer.domElement;
      const width = canvas.clientWidth;
      const height = canvas.clientHeight;
      if (canvas.width !== width || canvas.height !== height) {
        renderer.setSize(width, height, false);
        return true;
      }
      return false;
    };

    const scene = new Scene();
    const camera = new PerspectiveCamera(45, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 400, -1000);

    const controls = new OrbitControls(camera, renderer.domElement);
    const loader = new GLTFLoader();

    loader.load('./glb/monkey.glb', (gltf) => {
      const model = gltf.scene;
      model.scale.set(400.0, 400.0, 400.0);
      model.position.set(0, -400, 0);
      scene.add(model);
    });

    const light = new DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    scene.add(light);

    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();

      // 画面リサイズ時にキャンバスのサイズを調整
      if (resizeRendererToDisplaySize()) {
        const canvas = renderer.domElement;
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
      }

      renderer.render(scene, camera);
    };
    animate();

    return () => {
      renderer.dispose();
    };
  }, []);

  return (
    <div id="main_canvas" className="w-full h-full">
      <canvas id="canvas" className="w-full h-full"></canvas>
    </div>
  );
}

export default CanvasScene;
