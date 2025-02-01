import React from 'react';
import { useNavigate } from 'react-router-dom';  // ページ遷移用のフック
import { FaHome } from 'react-icons/fa';  // Homeアイコンをimport
import { smallButtonStyle, iconStyle } from './styles/buttonStyles'; // スタイルをインポート

function ToHomeButton({ buttonText = "Home画面へ遷移" }) {  // 引数としてボタンのテキストを受け取る
    const navigate = useNavigate();  // navigate関数を取得

    const handleClick = () => {
      navigate('/..');  // Home パスに遷移
    };

  return (
    <button
      onClick={handleClick}
      className={smallButtonStyle}  // スタイルを適用
    >
      <FaHome className={iconStyle} />  {/* アイコンを表示 */}
      <span>{buttonText}</span>  {/* 引数で受け取ったテキストを表示 */}
    </button>
  );
}

export default ToHomeButton;