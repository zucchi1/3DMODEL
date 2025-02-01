import React from 'react';
import { useNavigate } from 'react-router-dom';  // ページ遷移用のフック
import { primaryButtonStyle } from './styles/buttonStyles'; // スタイルをインポート

function ToMainAppButton2({ buttonText = "デッサンとの比較画面へ遷移"}) {  // 引数としてボタンのテキストを受け取る
    const navigate = useNavigate();  // navigate関数を取得

    const handleClick = () => {
      navigate('/viewer2');  // "viewer" パスに遷移
    };

  return (
    <button
      onClick={handleClick}
      className={primaryButtonStyle}  // スタイルを適用
    >
        {buttonText}  {/* 引数で受け取ったテキストを表示 */}
    </button>
  );
}

export default ToMainAppButton2;