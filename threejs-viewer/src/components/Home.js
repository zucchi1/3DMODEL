import React from 'react';

function Home({ onNextClick }) {  // ここで onNextClick を受け取る
  return (
    <div className="flex justify-center items-center h-screen">
      <button 
        onClick={onNextClick}  // onClick イベントで呼び出す
        className="bg-blue-500 text-white px-6 py-3 rounded shadow-md hover:bg-blue-700"
      >
        次へ進む
      </button>
    </div>
  );
}

export default Home;
