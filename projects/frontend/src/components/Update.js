import React, { useEffect, useState, useCallback } from 'react';
import ToHomeButton from './buttons/ToHomeButton';
import ImageUpload from '../utils/imageUpload';

// バックエンドの状態を取得する関数を分離
const fetchBackendStatus = async (setBackendAlive) => {
  try {
    const res = await fetch('http://localhost:5000/');
    setBackendAlive(res.ok);
  } catch {
    setBackendAlive(false);
  }
};

function Update() {
  const [backendAlive, setBackendAlive] = useState(null);

  // コールバックとして再利用できるように
  const checkBackend = useCallback(() => {
    fetchBackendStatus(setBackendAlive);
  }, []);

  // 初回レンダリング時と、checkBackendが変わった時に実行
  useEffect(() => {
    checkBackend();
    // 例: 5秒ごとに自動チェックしたい場合は下記コメントアウトを外す
    // const intervalId = setInterval(checkBackend, 5000);
    // return () => clearInterval(intervalId);
  }, [checkBackend]);

  // 状態表示部分も関数化
  const renderBackendStatus = () => {
    if (backendAlive === null) {
      return <p className="text-gray-500 mt-4">バックエンドの状態を確認中...</p>;
    }
    if (backendAlive) {
      return <p className="text-green-500 mt-4">バックエンドは有効です。</p>;
    }
    return <p className="text-red-500 mt-4">バックエンドは無効です。</p>;
  };

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Update Page</h1>
      <p className="text-lg">このページは更新のためのページです。</p>
      <ImageUpload />
      <ToHomeButton />
      {renderBackendStatus()}
      <button onClick={checkBackend} className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition">
        再チェック
      </button>
    </div>
  );
}

export default Update;