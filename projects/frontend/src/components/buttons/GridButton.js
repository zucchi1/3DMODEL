import React from 'react';
import { smallButtonStyle } from './styles/buttonStyles'; // スタイルをインポート

function GridButton({ isGridVisible, setIsGridVisible }) {
    const handleClick = () => {
        setIsGridVisible(prev => !prev);
        console.log("GridBTN was pushed");
        console.log(isGridVisible);
      };

  return (
    <button
      onClick={handleClick}
      className={smallButtonStyle}  // スタイルを適用
    >
      {isGridVisible ? 'グリッドを消す' : 'グリッドを表示する'}
    </button>
  );
}

export default GridButton;