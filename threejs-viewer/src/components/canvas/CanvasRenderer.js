import React, { useRef, useEffect } from 'react';

function CanvasRenderer({ imagePath, onDraw }) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');

    // 背景画像を設定
    const image = new Image();
    image.src = imagePath;
    image.onload = () => {
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
    };
  }, [imagePath]);

  return (
    <canvas
      ref={canvasRef}
      width={500}
      height={500}
      onMouseDown={(e) => onDraw(e, canvasRef.current, 'start')}
      onMouseMove={(e) => onDraw(e, canvasRef.current, 'move')}
      onMouseUp={() => onDraw(null, canvasRef.current, 'end')}
      onMouseLeave={() => onDraw(null, canvasRef.current, 'end')} // キャンバスを離れたときも終了
      className="border"
    />
  );
}

export default CanvasRenderer;
