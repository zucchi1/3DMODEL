// src/components/rendering/ThreeRenderer.js
import {
  WebGLRenderer,
  Scene,
  PerspectiveCamera,
  DirectionalLight,
  BoxGeometry,
  MeshBasicMaterial,
  Mesh,
  SRGBColorSpace,
  Color,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { useEffect, useState } from "react";
import { createPlate } from "./SpherePlate"; // 丸皿生成関数をインポート

function createCube() {
  const geometry = new BoxGeometry(400, 400, 400);
  const material = new MeshBasicMaterial({ color: 0x00ff00 });
  return new Mesh(geometry, material);
}

export function useThreeRenderer(glbPath, canvasId, isModelVisible) {
  const [renderer, setRenderer] = useState(null);
  const [scene, setScene] = useState(null);
  const [camera, setCamera] = useState(null);
  const [isRendererReady, setIsRendererReady] = useState(false);

  useEffect(() => {
    if (!isModelVisible) {
      return; // モデルが表示されていない場合、何もしない
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
    sceneInstance.background = new Color(0xf5f5f5);
    const cameraInstance = new PerspectiveCamera(45, width / height, 1, 10000);
    cameraInstance.position.set(0, 400, -1000);

    const controls = new OrbitControls(
      cameraInstance,
      rendererInstance.domElement
    );
    const light = new DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    sceneInstance.add(light);

    // 条件によって異なる3Dモデルを追加
    if (glbPath === "plate") {
      // glbPathが "plate" の場合、丸皿を追加
      const plate = createPlate();
      plate.position.set(0, -200, 0); // 位置調整
      sceneInstance.add(plate);
      setIsRendererReady(true);
    } else if (glbPath) {
      // GLBファイルが指定されている場合、そのファイルをロード
      const loader = new GLTFLoader();
      loader.load(glbPath, (gltf) => {
        const model = gltf.scene;
        model.scale.set(400.0, 400.0, 400.0);
        model.position.set(0, -400, 0);
        sceneInstance.add(model);
        setIsRendererReady(true);
      });
    } else {
      // GLBファイルもplateも指定されていない場合、立方体を追加
      const cube = createCube();
      cube.position.set(0, -400, 0);
      sceneInstance.add(cube);
      setIsRendererReady(true);
    }

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
      rendererInstance.dispose(); // クリーンアップ
    };
  }, [glbPath, canvasId, isModelVisible]);

  return { renderer, scene, camera, isRendererReady };
}
