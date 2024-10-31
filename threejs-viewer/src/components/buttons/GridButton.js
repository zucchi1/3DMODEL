import React from 'react';


function GridButton({ isGridVisible, setIsGridVisible }) {
    const handleClick = () => {
        setIsGridVisible(prev => !prev);
        console.log("GridBTN was pushed");
        console.log(isGridVisible);
      };


  return (
    <button
      onClick={handleClick}
      className="bg-yellow-500 text-white px-4 py-2 rounded shadow-md hover:bg-yellow-700"
    >
      {isGridVisible ? 'グリッドを消す' : 'グリッドを表示する'}
    </button>
  );
}

export default GridButton;
