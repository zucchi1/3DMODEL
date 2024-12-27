import React from 'react';

function DrawingViewer({ imagePath, caption }) {

  return (
    <div className="relative">
        <img src={imagePath} alt={`${caption}のデッサン`} className="w-full h-48 object-contain" />
    </div>
  );
}

export default DrawingViewer;
