// src/components/MainApp.js
import React, { useState} from 'react';
import ModelViewer from "./ModelViewer";
import ToHomeButton from "./buttons/ToHomeButton";
import ToCorrectButton from "./buttons/ToCorrectButton";
import ToSuggestButton from "./buttons/ToSuggestButton";
import ModelSelecter from "./buttons/ModelSelecter";
import ToSuggestButton2 from './buttons/ToSuggestButton2';

function MainApp2() {
  const[RightGlbPath,setRightGlbPath] = useState("model1");
  return (
    <div className="App">
      <h1 className="mb-4 text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        MAIN_APP2
      </h1>
      <div className="flex justify-around mt-10">
        {/* 左側のモデル（monkeyTrue.glb） */}
        <div className="w-1/2 flex flex-col items-center">
          <h2 className="text-xl font-extrabold mb-2">モチーフ</h2>
          <h3>元のモチーフ</h3>
          <img src="./drawing/motif.jpg" alt="モチーフ" className="w-full h-48 object-contain" />
          <h3>3Dモデル</h3>
          <ModelViewer
            glbPath="model"
            imagePath="./drawing/model.png"
            caption="左"
            canvasId="leftModelCanvas" // 一意のIDを追加
           // cameraPosition={{ x: -500, y: 0, z: 0 }}
          />
        </div>

        {/* 右側の丸皿モデル */}
          <div className="w-1/2 flex flex-col items-center">
            <h2 className="text-xl font-extrabold mb-2">誤り</h2>
            <h3>あなたのデッサン</h3>
            <img src="./drawing/drawingEx1.jpg" alt="モチーフ" className="w-full h-48 object-contain" />
            <h3>3Dモデル</h3>
            <ModelViewer
            glbPath={RightGlbPath} 
            imagePath="./drawing/model1.png"
            caption="右"
            canvasId="rightModelCanvas" // 一意のIDを追加
           // cameraPosition={{ x: -500, y: 0, z: 0 }}
           />
            
        </div>
      </div>
      <ModelSelecter 
        RightGlbPath={RightGlbPath}
        setRightGlbPath={setRightGlbPath} />
      <div className="flex justify-center mb-10 space-x-4">
        <ToHomeButton buttonText="Home画面に戻る" />
        <ToCorrectButton buttonText="誤りに気が付いた" />
        <ToSuggestButton buttonText="修正過程を見る"/>
        <ToSuggestButton2 buttonText="修正過程を少しずつ見る"/>
      </div>
    </div>
  );
}

export default MainApp2;
