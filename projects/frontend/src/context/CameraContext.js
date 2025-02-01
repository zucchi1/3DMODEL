import React, { createContext, useState, useContext } from 'react';

const CameraContext = createContext();

export const useCamera = () => useContext(CameraContext);

export const CameraProvider = ({ children }) => {
  const [cameraPosition, setCameraPosition] = useState({ x: 0, y: 0, z: 0 });

  return (
    <CameraContext.Provider value={{ cameraPosition, setCameraPosition }}>
      {children}
    </CameraContext.Provider>
  );
};