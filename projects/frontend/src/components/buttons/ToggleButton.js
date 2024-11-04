import React from 'react';

function ToggleButton({ isModelVisible, setIsModelVisible }) {
  const handleClick = () => {
    setIsModelVisible(prev => !prev);
    console.log("toggle was pushed");
    console.log(isModelVisible);
  };

  return (
    <button
      onClick={handleClick}
      className="bg-red-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-700"
    >
      {isModelVisible ? 'デッサンに変更する' : '3次元モデルに変更する'}
    </button>
  );
}

export default ToggleButton;
