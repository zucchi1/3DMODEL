// src/components/MainApp.js
import React, { useState} from 'react';
import DrawingViewer from './DrawingViewer';
import ModelViewer from "./ModelViewer";
import ToHomeButton from "./buttons/ToHomeButton";
import ToCorrectButton from "./buttons/ToCorrectButton";
import ToSuggestButton from "./buttons/ToSuggestButton";
import ModelSelecter from "./buttons/ModelSelecter";

function MainApp() {
  const[RightGlbPath,setRightGlbPath] = useState("model7");
  return (
    <div className="App">
      <h1 className="mb-4 text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        比較画面
      </h1>
      <div className="flex justify-around mt-10">
        {/* 左側のモデル（monkeyTrue.glb） */}
        <div className="w-1/2 flex flex-col items-center">
          <h2 className="text-xl font-extrabold mb-2">モチーフ</h2>
          <h3>デッサン</h3>
          <DrawingViewer
            glbPath="model"
            caption="左"
            canvasId="leftDrawingCanvas" // 一意のIDを追加
          />
          <h3>3Dモデル</h3>
          <ModelViewer
            glbPath="model"
            imagePath="./drawing/model.png"
            caption="左"
            canvasId="leftModelCanvas" // 一意のIDを追加
          />
        </div>

        {/* 右側の丸皿モデル */}
          <div className="w-1/2 flex flex-col items-center">
            <h2 className="text-xl font-extrabold mb-2">誤り</h2>
            <h3>デッサン</h3>
            <DrawingViewer
              glbPath={RightGlbPath}
              caption="右"
              canvasId="rightDrawingCanvas" // 一意のIDを追加
            />
            <h3>3Dモデル</h3>
            <ModelViewer
              glbPath={RightGlbPath} 
            imagePath="./drawing/model1.png"
            caption="右"
            canvasId="rightModelCanvas" // 一意のIDを追加
           />
            
        </div>
      </div>
      <div className="flex justify-center mb-10 space-x-4">
        <ToHomeButton buttonText="Home画面に戻る" />
        <ToCorrectButton buttonText="誤りに気が付いた" />
        <ToSuggestButton buttonText="シークバーを用いる"/>
        <ModelSelecter 
        RightGlbPath={RightGlbPath}
        setRightGlbPath={setRightGlbPath} />
      </div>
    </div>
  );
}

export default MainApp;
