import React from 'react';

export const checkBackend = async (setBackendAlive) => {
  try {
    const res = await fetch('http://localhost:5000/');
    setBackendAlive(res.ok);
  } catch {
    setBackendAlive(false);
  }
};

// バックエンド状態表示＋再チェックボタンのコンポーネント
export function BackendStatus({ backendAlive, onCheck }) {
  return (
    <div className="flex justify-center items-center flex-col mt-4">
      {backendAlive === null ? (
        <p className="text-gray-500 mt-4">バックエンドの状態を確認中...</p>
      ) : backendAlive ? (
        <p className="text-green-500 mt-4">バックエンドは有効です。</p>
      ) : (
        <p className="text-red-500 mt-4">バックエンドは無効です。</p>
      )}
      <button
        onClick={onCheck}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        再チェック
      </button>
    </div>
  );
}