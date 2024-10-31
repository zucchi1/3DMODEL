import React from 'react';

export default function CameraPositionLogger({ camera }) {
  const logCameraPosition = () => {
    if (camera) {
      console.log('Camera Position:', camera.position);
    } else {
      console.warn('Camera not ready');
    }
  };

  return (
    <button 
        onClick={logCameraPosition}
        className='text-white bg-purple-700 hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 font-medium rounded-full text-sm px-5 py-2.5 text-center mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900'
        >
      カメラ位置をログ出力
    </button>
  );
}
