import React from 'react';

function ShowEllipseInfo({ ellipseInfo, imageUrl }) {
  if (!ellipseInfo) return null;
  return (
    <div className="w-full flex flex-row space-x-4">
        <div className="flex-1 text-center">
            <h2 className="text-lg font-semibold mb-2">画像:</h2>
            <img
                src={imageUrl}
                alt="Uploaded"
                className="mt-4 max-w-full h-auto rounded border"
            />
        </div>
        <div className="flex-1 text-left overflow-x-auto max-h-96">
            <h2 className="text-lg font-semibold mb-2">楕円情報(JSON):</h2>
            <pre className="bg-gray-100 p-2 rounded text-xs">
                {JSON.stringify(ellipseInfo, null, 2)}
            </pre>
        </div>
    </div>
  );
}

export default ShowEllipseInfo;