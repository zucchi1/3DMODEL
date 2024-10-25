// src/components/MainApp.js
import React from 'react';
import Home from './Home';
import ModelViewer from './ModelViewer';
import ToHomeButton from './buttons/ToHomeButton';
import ToCorrectButton from './buttons/ToCorrectButton';

function MainApp() {
  return (
    <div className="App">
      <h1 className="text-xl mb-5 underline decoration-solid">
        比較画面
      </h1>
      <div className="flex justify-around mt-10">
        {/* 左側のモデル（monkeyTrue.glb） */}
        <div className="w-1/2 flex flex-col items-center">
          <h2 className="text-xl mb-2">左</h2>
          <ModelViewer 
            glbPath="./glb/monkeyTrue.glb" 
            imagePath="./drawing/monkeyTrue.png" 
            caption="左" 
          />
        </div>

        {/* 右側の丸皿モデル */}
        <div className="w-1/2 flex flex-col items-center">
          <h2 className="text-xl mb-2">右</h2>
          <ModelViewer 
          //  glbPath="plate"  // plateを指定して丸皿モデルを表示
            imagePath="./drawing/monkeyFalse.png" 
            caption="右" 
          />
        </div>
      </div>
      <div className="flex justify-center">
        <ToHomeButton buttonText='Home画面に戻る' />
        <ToCorrectButton buttonText='誤りに気が付いた' />
      </div>
    </div>
  );
}

export default MainApp;
