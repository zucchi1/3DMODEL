import React from 'react';
import { useNavigate } from 'react-router-dom';  // ページ遷移用のフック

function App2Home() {  // コンポーネント名を大文字で始める
    const navigate = useNavigate();  // navigate関数を取得

    const handleClick = () => {
      navigate('/..');  // "Home" パスに遷移
    };

  return (
    <button
      onClick={handleClick}
      className="bg-green-500 text-white px-4 py-2 rounded shadow-md hover:bg-red-700"
    >
        Homeに戻る
    </button>
  );
}

export default App2Home;
