import React from 'react';
import { useNavigate } from 'react-router-dom';  // ページ遷移用のフック

function ToCorrectButton({ buttonText = "Correct画面へ遷移" }) {  // 引数としてボタンのテキストを受け取る
    const navigate = useNavigate();  // navigate関数を取得

    const handleClick = () => {
      navigate('/correction');  // "correction" パスに遷移
    };

  return (
    <button
      onClick={handleClick}
      className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-700"
    >
        {buttonText}  {/* 引数で受け取ったテキストを表示 */}
    </button>
  );
}

export default ToCorrectButton;
