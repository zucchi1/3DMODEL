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
  AxesHelper,
  GridHelper,
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

export function useThreeRenderer(glbPath, canvasId, isModelVisible, isGridVisible) {
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
    cameraInstance.position.set(0, 100, -300);

    const controls = new OrbitControls(
      cameraInstance,
      rendererInstance.domElement
    );
    const light = new DirectionalLight(0xffffff);
    light.position.set(1, 1, 1);
    sceneInstance.add(light);

    // グリッドと軸をisGridVisibleの値に応じて追加
    let gridHelper, axesHelper;
    if (isGridVisible) {
      gridHelper = new GridHelper(2000, 50);
      gridHelper.rotation.x = Math.PI / 2;
      sceneInstance.add(gridHelper);

      axesHelper = new AxesHelper(1000);
      sceneInstance.add(axesHelper);
    }

    // 条件によって異なる3Dモデルを追加
    let model;
    if (glbPath === "plate") {
      model = createPlate();
      model.position.set(0, -200, 0);
      sceneInstance.add(model);
      setIsRendererReady(true);
    } else if (glbPath) {
      const loader = new GLTFLoader();
      loader.load(glbPath, (gltf) => {
        model = gltf.scene;
        model.scale.set(400.0, 400.0, 400.0);
        model.position.set(0, -400, 0);
        sceneInstance.add(model);
        setIsRendererReady(true);
      });
    } else {
      model = createCube();
      model.position.set(0, -400, 0);
      sceneInstance.add(model);
      setIsRendererReady(true);
    }

    // アニメーション関数の設定
    const animate = () => {
      requestAnimationFrame(animate);
      controls.update();
      rendererInstance.render(sceneInstance, cameraInstance);
    };
    animate();

    // 状態の更新
    setRenderer(rendererInstance);
    setScene(sceneInstance);
    setCamera(cameraInstance);

    // クリーンアップ処理
    return () => {
      if (gridHelper) sceneInstance.remove(gridHelper);
      if (axesHelper) sceneInstance.remove(axesHelper);
      if (model) sceneInstance.remove(model);
      rendererInstance.dispose();
    };
  }, [glbPath, canvasId, isModelVisible, isGridVisible]);

  return { renderer, scene, camera, isRendererReady };
}
