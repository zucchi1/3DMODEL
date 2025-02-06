import React, { useState } from "react";
import ToHomeButton from "./buttons/ToHomeButton";
import ToCorrectButton from "./buttons/ToCorrectButton";
import ToMainAppButton from "./buttons/ToMainAppButton";
import ModelSelecter from "./buttons/ModelSelecter";
import DrawingViewer from "./DrawingViewer";
import ModelViewer from "./ModelViewer";
import PlayButton from "./buttons/PlayButton";
import ToMainAppButton2 from "./buttons/ToMainAppButton2";
//import ShearValueInput from "./buttons/ShearValueInput";

function Suggest2() {
  const [RightGlbPath, setRightGlbPath] = useState("model1");
  const [StepValue, setStepValue] = useState(0);
  //const [shearValue, setShearValue] = useState(0.35);
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 125, z: -485 });
  const shearValue = 0.2;

  const stepLabels = ["誤り", "中間", "モチーフ"];

  return (
    <div className="App">
      <h1 className="mb-4 text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        修正過程画面
      </h1>
      <div className="flex justify-around mt-5">
        {StepValue === 0 && (
          <div className="w-full md:w-1/3 flex flex-col items-center bg-white p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-xl font-extrabold mb-2">誤り</h2>
            <h3 className="text-lg font-semibold mb-2">デッサン</h3>
            <DrawingViewer
              glbPath={RightGlbPath}
              caption="右"
              canvasId="rightDrawingCanvas" // 一意のIDを追加
            />
            <h3 className="text-lg font-semibold mt-4 mb-2">3Dモデル</h3>
            <ModelViewer
              glbPath={RightGlbPath}
              imagePath="./drawing/model1.png"
              caption="右"
              canvasId="rightModelCanvas" // 一意のIDを追加
              cameraPosition={cameraPosition}
            />
          </div>
        )}
        {StepValue === 1 && (
          <div className="w-full md:w-1/3 flex flex-col items-center bg-white p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-xl font-extrabold mb-2">中間</h2>
            <h3 className="text-lg font-semibold mb-2">デッサン</h3>
            <DrawingViewer
              glbPath={RightGlbPath}
              caption="中間"
              canvasId="ProcessDrawingCanvas" // 一意のIDを追加
              shearValue={shearValue}
            />
            <h3 className="text-lg font-semibold mt-4 mb-2">3Dモデル</h3>
            <ModelViewer
              glbPath={RightGlbPath} // plateを指定して丸皿モデルを表示
              caption="モチーフ+2"
              canvasId="ProcessModelCanvas" // 一意のIDを追加
              shearValue={shearValue}
              cameraPosition={cameraPosition}
            />
          </div>
        )}
        {StepValue === 2 && (
          <div className="w-full md:w-1/3 flex flex-col items-center bg-white p-5 rounded-lg shadow-lg transition-transform transform hover:scale-105">
            <h2 className="text-xl font-extrabold mb-2">モチーフ</h2>
            <h3 className="text-lg font-semibold mb-2">デッサン</h3>
            <DrawingViewer
              glbPath="model"
              caption="左"
              canvasId="leftDrawingCanvas" // 一意のIDを追加
            />
            <h3 className="text-lg font-semibold mt-4 mb-2">3Dモデル</h3>
            <ModelViewer
              glbPath="model"
              imagePath="./drawing/model.png"
              caption="左"
              canvasId="leftModelCanvas" // 一意のIDを追加
              cameraPosition={cameraPosition}
            />
          </div>
        )}
      </div>
      <div className="flex justify-center mt-10 space-x-4">
        <PlayButton
          StepValue={StepValue}
          setStepValue={setStepValue}
          new_cameraPosition={cameraPosition}
          setCameraPosition={setCameraPosition}
          stepLabels={stepLabels}
        />
        <ModelSelecter
          RightGlbPath={RightGlbPath}
          setRightGlbPath={setRightGlbPath}
        />
       <br />
        <ToHomeButton buttonText="Home画面に戻る" />
        <ToCorrectButton buttonText="誤りに気が付いた" />
        <ToMainAppButton />
        <ToMainAppButton2 />
      </div>
    </div>
  );
}

export default Suggest2;