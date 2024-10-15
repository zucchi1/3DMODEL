import React, { useState } from 'react';
import Home from './components/Home';
import ModelViewer from './components/ModelViewer';

function App() {
  const [showModels, setShowModels] = useState(false);

  const handleNextClick = () => {
    setShowModels(true);  // モデル表示画面に遷移
  };

  return (
    <div className="App">
      {!showModels ? (
        <Home onNextClick={handleNextClick} />
      ) : (
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
      )}
    </div>
  );
}

export default App;
