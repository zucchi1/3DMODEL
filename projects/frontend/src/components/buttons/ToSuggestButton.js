import React from 'react';
import { useNavigate } from 'react-router-dom';  // ページ遷移用のフック

function ToSuggestButton({ buttonText = "示唆性画面へ遷移"}) {  // 引数としてボタンのテキストを受け取る
    const navigate = useNavigate();  // navigate関数を取得

    const handleClick = () => {
      navigate('/suggest');  // "suggest" パスに遷移
    };

  return (
    <button
      onClick={handleClick}
      className="bg-purple-500 text-white px-4 py-2 rounded shadow-md hover:bg-purple-700"
    >
        {buttonText}  {/* 引数で受け取ったテキストを表示 */}
    </button>
  );
}

export default ToSuggestButton;
