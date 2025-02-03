import React from 'react';
import { useNavigate } from 'react-router-dom';  // ページ遷移用のフック
import { secondaryButtonStyle } from './styles/buttonStyles'; // スタイルをインポート

function ToSuggestButton2({ buttonText = "修正過程を少しずつ見る"}) {  // 引数としてボタンのテキストを受け取る
    const navigate = useNavigate();  // navigate関数を取得

    const handleClick = () => {
      navigate('/suggest2');  // "suggest" パスに遷移
    };

  return (
    <button
      onClick={handleClick}
      className={secondaryButtonStyle}  // スタイルを適用
    >
        {buttonText}  {/* 引数で受け取ったテキストを表示 */}
    </button>
  );
}

export default ToSuggestButton2;