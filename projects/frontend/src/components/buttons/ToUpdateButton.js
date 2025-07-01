import React from 'react';
import { useNavigate } from 'react-router-dom';  // ページ遷移用のフック
import { dangerButtonStyle } from './styles/buttonStyles'; // スタイルをインポート

function ToUpdateButton({ buttonText = "Update画面へ遷移" }) {  // 引数としてボタンのテキストを受け取る
    const navigate = useNavigate();  // navigate関数を取得

    const handleClick = () => {
      navigate('/update');  // "correction" パスに遷移
    };

  return (
    <button
      onClick={handleClick}
      className={dangerButtonStyle}  // スタイルを適用
    >
        {buttonText}  {/* 引数で受け取ったテキストを表示 */}
    </button>
  );
}

export default ToUpdateButton;