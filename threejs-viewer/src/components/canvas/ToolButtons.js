import React from "react";
import {
  FaDownload,
  FaEraser,
  FaPen,
  FaPenAlt,
  FaTrashAlt,
} from "react-icons/fa";
import { FaDownLeftAndUpRightToCenter } from "react-icons/fa6";

function ToolButtons({
  penActive,
  eraserActive,
  onTogglePen,
  onToggleEraser,
  onDownload,
}) {
  return (
    <div className="mt-4 flex space-x-4">
      {" "}
      {/* ボタン同士にスペースを追加 */}
      {/* 赤ペンボタン */}
      <button
        onClick={onTogglePen}
        className={`px-2 py-1 font-semibold rounded border 
          ${
            penActive
              ? "bg-red-500 text-white border-red-500"
              : "text-red-500 border-red-500 hover:bg-red-100"
          }`}
      >
        <FaPen />
        {penActive ? "ペンをオフ" : "赤ペン"}
      </button>
      {/* 消しゴムボタン */}
      <button
        onClick={onToggleEraser}
        className={`px-2 py-1 font-semibold rounded border 
              : "text-gray-500 border-gray-500 hover:bg-gray-100"`}
      >
        <FaTrashAlt />
        クリア
      </button>
      {/* 画像ダウンロードボタン */}
      <button
        onClick={onDownload}
        className="px-2 py-1 text-red-500 border border-red-500 font-semibold rounded hover:bg-red-100"
      >
        <FaDownload />
        画像をダウンロード
      </button>
    </div>
  );
}

export default ToolButtons;
