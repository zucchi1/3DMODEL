import React, { createContext, useState, useContext } from 'react';

const CameraContext = createContext();//カメラ位置を保持し、他のコンポーネントに提供する

export const useCamera = () => useContext(CameraContext);// CameraContextからカメラ位置とその更新関数を取得するためのカスタムフック

export const CameraProvider = ({ children }) => {
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 0 });

  const resetCameraPosition = () => {
    setCameraPosition({ x: 0, y: 0, z: 0 });
  };

  return (
    <CameraContext.Provider value={{ cameraPosition, setCameraPosition, resetCameraPosition }}>
      {children}
    </CameraContext.Provider>//アプリケーション全体にカメラ位置の状態を提供するプロバイダーコンポーネント
  );
};