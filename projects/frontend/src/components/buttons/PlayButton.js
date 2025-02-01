import React from 'react';
import { FaPlay } from 'react-icons/fa';
import { useCamera } from '../../context/CameraContext'; // useCameraをインポート

function PlayButton({ StepValue , setStepValue,new_cameraPosition, setCameraPosition})  {
    const { cameraPosition } = useCamera();

    const handleClick = () => {
        const newStepValue = (StepValue + 1) % 3; // 0, 1, 2の範囲で循環
        setStepValue(newStepValue);
        console.log("Step was pushed");
        console.log("New Step Value:", newStepValue);
        console.log("Current Camera Position:", cameraPosition);
        setCameraPosition(cameraPosition); // カメラ位置をリセット
        console.log("Camera Position was reset",cameraPosition);
    };

    return (
        <button
            onClick={handleClick}
            className="bg-yellow-500 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-700 flex items-center justify-center"
        >
            <FaPlay className="mr-2" />
            次のステップ
        </button>
    );
}

export default PlayButton;