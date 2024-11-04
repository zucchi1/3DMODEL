import React, { useEffect, useRef } from "react";

function CanvasRenderer({ imagePath, onDraw, drawingCanvasRef }) {
  const backgroundCanvasRef = useRef(null);

  useEffect(() => {
    const backgroundCanvas = backgroundCanvasRef.current;
    const ctx = backgroundCanvas.getContext("2d");

    const image = new Image();
    image.src = imagePath;

    image.onload = () => {
      backgroundCanvas.width = 500;
      backgroundCanvas.height = 500;

      // 背景画像をキャンバスに描画
      ctx.drawImage(
        image,
        0,
        0,
        backgroundCanvas.width,
        backgroundCanvas.height
      );
    };

    image.onerror = () => {
      console.error("画像の読み込みに失敗しました:", imagePath);
    };
  }, [imagePath]);

  return (
    <div style={{ position: "relative", width: 500, height: 500 }}>
      {/* 背景Canvas */}
      <canvas
        ref={backgroundCanvasRef}
        width={500}
        height={500}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 0,
        }}
      />
      {/* 描画用Canvas */}
      <canvas
        ref={drawingCanvasRef}
        width={500}
        height={500}
        onMouseDown={(e) => onDraw(e, drawingCanvasRef.current, "start")}
        onMouseMove={(e) => onDraw(e, drawingCanvasRef.current, "move")}
        onMouseUp={() => onDraw(null, drawingCanvasRef.current, "end")}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          zIndex: 1,
        }}
      />
    </div>
  );
}

export default CanvasRenderer;
