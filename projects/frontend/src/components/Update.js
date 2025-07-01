import React from 'react';
import ToHomeButton from './buttons/ToHomeButton';
import ImageUpload from '../utils/imageUpload'; // 画像アップロードコンポーネントをインポート


function Update() {

  return (
    
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Update Page</h1>
        <p className="text-lg">このページは更新のためのページです。</p> 
        <ImageUpload />
        <ToHomeButton />  
    </div>
  );
}

export default Update;
