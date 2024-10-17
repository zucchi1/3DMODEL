import React, { useState } from 'react';
import Home from './components/Home';
import ModelViewer from './components/ModelViewer';
import App2Home from './components/buttons/app2Home';

function App() {



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

          {/* 右側のモデル（monkeyFalse.glb） */}
          <div className="w-1/2 flex flex-col items-center">
            <h2 className="text-xl mb-2">右</h2>

            <ModelViewer 
              glbPath="./glb/monkeyFalse.glb" 
              imagePath="./drawing/monkeyFalse.png" 
              caption="右" 
            />

          </div>
        </div>
        <div className="flex justify-center">
          <App2Home/>
        </div>
    </div>
  );
}

export default App;
