// src/components/MainApp.js
import React from "react";
import SuggestModelViewer from "./SuggestModelViewer";
import ToHomeButton from "./buttons/ToHomeButton";
import ToCorrectButton from "./buttons/ToCorrectButton";
import ToMainAppButton from "./buttons/ToMainAppButton";

function Suggest() {
  return (
    <div className="App">
      <h1 className="mb-4 text-center font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        示唆画面
      </h1>
      
      <div className="flex justify-around mt-10">

        {/* 右側の丸皿モデル */}
        <div className="w-1/2 flex flex-col items-center">
          <h2 className="text-xl mb-2">右</h2>
          <SuggestModelViewer
            glbPath="model7" // plateを指定して丸皿モデルを表示
            caption="右"
          />
        </div>
      </div>
      <div className="flex justify-center mb-10 space-x-4">
        <ToHomeButton buttonText="Home画面に戻る" />
        <ToCorrectButton buttonText="誤りに気が付いた" />
        <ToMainAppButton/>
      </div>
    </div>
    
  );
}

export default Suggest;
