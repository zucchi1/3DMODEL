import React from 'react';
import CanvasScene from './CanvasScene';  // 3Dシーンのコンポーネント
import DownloadButton from './DownloadButton';  // ダウンロードボタンのコンポーネント

function App() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      {/* 3Dモデル表示用のCanvasシーン */}
      <div className="w-full h-[500px] bg-white shadow-md rounded-lg overflow-hidden relative">
        <CanvasScene />  {/* Three.jsの3Dシーン */}
        <DownloadButton />  {/* 画面キャプチャボタン */}
      </div>
    </div>
  );
}

export default App;
