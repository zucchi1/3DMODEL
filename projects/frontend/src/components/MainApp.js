// src/components/MainApp.js
import React from "react";
import ModelViewer from "./ModelViewer";
import ToHomeButton from "./buttons/ToHomeButton";
import ToCorrectButton from "./buttons/ToCorrectButton";

function MainApp() {
  return (
    <div className="App">
      <h1 className="mb-4 text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        比較画面
      </h1>
      <div className="flex justify-around mt-10">
        {/* 左側のモデル（monkeyTrue.glb） */}
        <div className="w-1/2 flex flex-col items-center">
          <h2 className="text-xl mb-2">左</h2>
          <ModelViewer
            glbPath="plate"
            imagePath="./drawing/monkeyTrue.png"
            caption="左"
          />
        </div>

        {/* 右側の丸皿モデル */}
        <div className="w-1/2 flex flex-col items-center">
          <h2 className="text-xl mb-2">右</h2>
          <ModelViewer
            glbPath="model" // plateを指定して丸皿モデルを表示
            imagePath="./drawing/monkeyFalse.png"
            caption="右"
          />
        </div>
      </div>
      <div className="flex justify-center mb-10 space-x-4">
        <ToHomeButton buttonText="Home画面に戻る" />
        <ToCorrectButton buttonText="誤りに気が付いた" />
      </div>
    </div>
  );
}

export default MainApp;
