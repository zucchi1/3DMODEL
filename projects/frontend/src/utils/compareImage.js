import React from 'react';

function CompareImages({ imageUrl, imageUrl2, onJudge }) {
  return (
    <div className="w-full items-center space-x-4">
      <p className="text-lg flex justify-center">どの画像の誤りを判定する？</p>
      <div className="flex justify-center items-center gap-4">
        {imageUrl && (
          <div className="flex-1 text-center">
            <h2 className="text-lg font-semibold mb-2">画像1:</h2>
            <img
              src={imageUrl}
              alt="Uploaded1"
              className="mt-4 max-w-full h-auto rounded border"
            />
            <div className="mt-2">
              <button
                onClick={() => onJudge(1)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                画像1を選択
              </button>
            </div>
          </div>
        )}
        {imageUrl2 && (
          <div className="flex-1 text-center">
            <h2 className="text-lg font-semibold mb-2">画像2:</h2>
            <img
              src={imageUrl2}
              alt="Uploaded2"
              className="mt-4 max-w-full h-auto rounded border"
            />
            <div className="mt-2">
              <button
                onClick={() => onJudge(2)}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
              >
                画像2を選択
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="flex-1 text-left overflow-x-auto max-h-96">
      </div>
    </div>
  );
}

export default CompareImages;