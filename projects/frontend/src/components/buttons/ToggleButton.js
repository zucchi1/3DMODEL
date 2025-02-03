import React from 'react';
import { smallButtonStyle } from './styles/buttonStyles'; // スタイルをインポート

function ToggleButton({ isModelVisible, setIsModelVisible }) {
  const handleClick = () => {
    setIsModelVisible(prev => !prev);
    console.log("toggle was pushed");
    console.log(isModelVisible);
  };

  return (
    <button
      onClick={handleClick}
      className={smallButtonStyle}  // スタイルを適用
    >
      {isModelVisible ? 'デッサンに変更する' : '3次元モデルに変更する'}
    </button>
  );
}

export default ToggleButton;