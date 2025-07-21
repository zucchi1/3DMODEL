import React from 'react';
import { useNavigate } from 'react-router-dom';  // ページ遷移用のフック
import Update from './Update';
import ToUpdateButton from './buttons/ToUpdateButton';  // Updateボタンのコンポーネントをインポート

function Home() {
  const navigate = useNavigate();  // navigate関数を取得

  const handleNextClick = () => {
    navigate('/viewer');  // "/viewer" パスに遷移
  };
  const handleNextClick2 = () => {
    navigate('/viewer2');  // "/viewer" パスに遷移
  };
  const handleNextClick3 = () => {
    navigate('/test');  // "/test" パスに遷移
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <button 
        onClick={handleNextClick}  // ボタンクリックでページ遷移
        className="bg-blue-500 text-white px-6 py-3 rounded shadow-md hover:bg-blue-700"
      >
        ２次元画像との比較を行う
      </button>
      <button 
        onClick={handleNextClick2}  // ボタンクリックでページ遷移
        className="bg-green-500 text-white px-6 py-3 rounded shadow-md hover:bg-green-700"
      >
        デッサンとの比較を行う
      </button>
      <ToUpdateButton />  
       <button 
        onClick={handleNextClick3}  // ボタンクリックでページ遷移
        className="bg-purple-500 text-white px-6 py-3 rounded shadow-md hover:bg-purple-700"
      >
        test
      </button>
    </div>
    
  );
}

export default Home;
