import React from 'react';
import { FaPlay } from 'react-icons/fa';


function PlayButton({ StepValue, setStepValue ,cameraPosition, setCameraPosition}) {
    const cameraPosition_Before = { x: 0, y: 70, z: -700 };
    const handleClick = () => {
        setStepValue(StepValue + 1);
        if(StepValue === 2){
          setStepValue(0);
        }
        console.log("Step was pushed");
        console.log(StepValue);
        setCameraPosition(cameraPosition_Before);
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
