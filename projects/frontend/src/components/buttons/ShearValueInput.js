import React, { useState } from "react";

function ShearValueInput({shearValue, setShearValue}) {
  const [tempShearValue, setTempShearValue] = useState(0.1); // シークバーの一時的な値
  // シークバー操作時のイベント
  const handleShearChange = (event) => {
    setTempShearValue(parseFloat(event.target.value));
  };
  const applyShearValue = () => {
    console.log("changed");
    setShearValue(tempShearValue.value); // 一時的な値を確定させる
    console.log("changed shear"+shearValue);
  };
  

  return (
    <div className="flex flex-col items-center mt-4">
      {/* 現在のシークバーの値を表示 */}
      <div className="text-gray-700 mb-2">
        現在の値: <span className="font-bold">{tempShearValue.toFixed(2)}</span>
      </div>

      {/* シークバー */}
      <input
        type="range"
        min="0"
        max="0.5"
        step="0.1"
        value={tempShearValue}
        onChange={handleShearChange}
        className="w-3/4"
      />

      {/* 決定ボタン */}
      <button
        onClick={applyShearValue}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        決定
      </button>
    </div>
  );
}

export default ShearValueInput;
