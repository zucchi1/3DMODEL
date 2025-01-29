import React from 'react';
import { FaPlay } from 'react-icons/fa';


function PlayButton({ StepValue, setStepValue }) {
    const handleClick = () => {
        setStepValue(StepValue + 1);
        if(StepValue === 2){
          setStepValue(0);
        }
        console.log("GridBTN was pushed");
        console.log(StepValue);

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
