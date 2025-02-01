import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { useCamera } from '../../context/CameraContext'; // カメラ位置取得
import { warningButtonStyle, iconStyle } from './styles/buttonStyles'; // スタイルをインポート

// ログ出力を関数化
const logStepChange = (newStepValue, cameraPosition) => {
    console.log("Step was pushed");
    console.log("New Step Value:", newStepValue);
    console.log("Current Camera Position:", cameraPosition);
};

// handleClick関数をコンポーネント外に分離
const handleClick = (StepValue, setStepValue, cameraPosition, setCameraPosition) => {
    const newStepValue = (StepValue + 1) % 3; // 0, 1, 2の範囲で循環
    setStepValue(newStepValue);
    logStepChange(newStepValue, cameraPosition);
    setCameraPosition(cameraPosition); // カメラ位置をリセット
};

function PlayButton({ StepValue, setStepValue, stepLabels,setCameraPosition}) {
    const { cameraPosition } = useCamera();

    return (
        <button
            onClick={() => handleClick(StepValue, setStepValue, cameraPosition, setCameraPosition)}
            className={warningButtonStyle}
        >
            <FaPlay className={iconStyle} />
            次のステップ ({stepLabels[(StepValue + 1) % 3]})
        </button>
    );
}

export default PlayButton;