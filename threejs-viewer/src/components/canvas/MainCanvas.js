import React, { useState } from 'react';
import CanvasRenderer from './CanvasRenderer';
import ToolButtons from './ToolButtons';

function MainCanvas({ imagePath }) {
  const [isDrawing, setIsDrawing] = useState(false); // 描画中かどうか
  const [penActive, setPenActive] = useState(false); // 赤ペンがアクティブかどうか
  const [eraserActive, setEraserActive] = useState(false); // 消しゴムがアクティブかどうか

  // 描画処理
  const handleDraw = (e, canvas, action) => {
    if (!canvas || (!penActive && !eraserActive)) return;  // 赤ペン・消しゴムがアクティブでない場合は描画しない
    const ctx = canvas.getContext('2d');

    if (action === 'start') {
      // マウス押下時の処理（描画開始）
      ctx.beginPath();
      ctx.moveTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      setIsDrawing(true); // 描画状態に設定
    } else if (action === 'move' && isDrawing) {
      // マウス移動時の処理（ドラッグ中のみ描画）
      ctx.lineTo(e.nativeEvent.offsetX, e.nativeEvent.offsetY);
      ctx.strokeStyle = eraserActive ? 'white' : 'red'; // 消しゴムかペンか
      ctx.lineWidth = 5;
      ctx.stroke();
    } else if (action === 'end') {
      // マウス解放時の処理（描画終了）
      setIsDrawing(false); // 描画状態を解除
    }
  };

  // 赤ペンボタンのトグル
  const togglePen = () => {
    setPenActive(!penActive);
    setEraserActive(false);
  };

  // 消しゴムボタンのトグル
  const toggleEraser = () => {
    setEraserActive(!eraserActive);
    setPenActive(false);
  };

  // 画像のダウンロード処理
  const downloadImage = () => {
    const canvas = document.querySelector('canvas');
    const link = document.createElement('a');
    link.download = 'annotated-image.png';
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div>
      <CanvasRenderer
        imagePath={imagePath}
        onDraw={handleDraw}
      />
      <ToolButtons
        penActive={penActive}
        eraserActive={eraserActive}
        onTogglePen={togglePen}
        onToggleEraser={toggleEraser}
        onDownload={downloadImage}
      />
    </div>
  );
}

export default MainCanvas;
