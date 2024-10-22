import React, { useState, useRef } from "react";
import CanvasRenderer from "./CanvasRenderer";
import ToolButtons from "./ToolButtons";

function MainCanvas({ imagePath }) {
  const [isDrawing, setIsDrawing] = useState(false); // 描画中かどうか
  const [penActive, setPenActive] = useState(false); // 赤ペンがアクティブかどうか
  const drawingCanvasRef = useRef(null); // 描画用キャンバスの参照

  // 描画処理
  const handleDraw = (e, canvas, action) => {
    if (!canvas || !penActive) return; // 赤ペンがアクティブでない場合は描画しない
    const ctx = canvas.getContext("2d");

    if (action === "start") {
      // マウス押下時の処理（描画開始）
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      setIsDrawing(true); // 描画状態に設定
    } else if (action === "move" && isDrawing) {
      // マウス移動時の処理（ドラッグ中のみ描画）
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.strokeStyle = "red"; // 赤ペンで描画
      ctx.lineWidth = 5;
      ctx.stroke();
    } else if (action === "end") {
      // マウス解放時の処理（描画終了）
      setIsDrawing(false); // 描画状態を解除
    }
  };

  // 赤ペンボタンのトグル
  const togglePen = () => {
    setPenActive(!penActive);
  };

  // 消しゴムボタンの処理: 描画レイヤーをクリアする
  const clearDrawing = () => {
    const canvas = drawingCanvasRef.current;
    if (canvas) {
      const ctx = canvas.getContext("2d");
      ctx.clearRect(0, 0, canvas.width, canvas.height); // 描画内容をクリア
      console.log("クリア処理完了");
    }
  };

  // 画像のダウンロード処理
  const downloadImage = () => {
    const canvas = drawingCanvasRef.current;
    if (canvas) {
      const link = document.createElement("a");
      link.download = "annotated-image.png";
      link.href = canvas.toDataURL();
      link.click();
    }
  };

  return (
    <div>
      <CanvasRenderer
        imagePath={imagePath}
        onDraw={handleDraw}
        drawingCanvasRef={drawingCanvasRef} // 描画用キャンバスの参照を渡す
      />
      <ToolButtons
        penActive={penActive}
        onTogglePen={togglePen}
        onToggleEraser={clearDrawing} // 消しゴム機能をクリアに割り当て
        onDownload={downloadImage}
      />
    </div>
  );
}

export default MainCanvas;
