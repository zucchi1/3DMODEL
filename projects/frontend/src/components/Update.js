import React, { useEffect, useState, useCallback } from 'react';
import ToHomeButton from './buttons/ToHomeButton';
import ImageUpload from './imageUpload';
import { checkBackend, BackendStatus } from '../utils/checkBackend';

function Update() {
  const [backendAlive, setBackendAlive] = useState(null);

  const handleCheckBackend = useCallback(() => {
    checkBackend(setBackendAlive);
  }, []);

  useEffect(() => {
    handleCheckBackend();
    // 例: 5秒ごとに自動チェックしたい場合は下記コメントアウトを外す
    // const intervalId = setInterval(handleCheckBackend, 5000);
    // return () => clearInterval(intervalId);
  }, [handleCheckBackend]);

  return (
    <div className="flex flex-col justify-center items-center h-screen">
      <h1 className="text-3xl font-bold mb-4">Update Page</h1>
      <p className="text-lg">デッサン画像をアップロードしてください。</p>
      <ImageUpload />
      <ToHomeButton />
      <BackendStatus backendAlive={backendAlive} onCheck={handleCheckBackend} />
    </div>
  );
}

export default Update;