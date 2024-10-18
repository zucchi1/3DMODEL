import React, { useRef, useState } from 'react';

function DrawingCanvas({ imagePath }) {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [penActive, setPenActive] = useState(false);
  const [eraserActive, setEraserActive] = useState(false);

  const startDrawing = (e) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.beginPath();
    ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    setIsDrawing(true);
  };

  const draw = (e) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
    ctx.strokeStyle = eraserActive ? 'white' : 'red'; // 赤ペン or 消しゴム
    ctx.lineWidth = 5;
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const togglePen = () => {
    setPenActive(!penActive);
    setEraserActive(false); // 消しゴムモードを解除
  };

  const toggleEraser = () => {
    setEraserActive(!eraserActive);
    setPenActive(false); // ペンモードを解除
  };

  const downloadImage = () => {
    const canvas = canvasRef.current;
    const link = document.createElement('a');
    link.download = 'annotated-image.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div>
      <canvas
        ref={canvasRef}
        width={500}
        height={500}
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={stopDrawing}
        className="border"
        style={{ background: `url(${imagePath})`, backgroundSize: 'cover' }}
      />
      <div className="mt-4">
        <button onClick={togglePen} className="mr-2">
          {penActive ? 'ペンをオフ' : '赤ペン'}
        </button>
        <button onClick={toggleEraser} className="mr-2">
          {eraserActive ? '消しゴムをオフ' : '消しゴム'}
        </button>
        <button onClick={downloadImage}>画像をダウンロード</button>
      </div>
    </div>
  );
}

export default DrawingCanvas;
