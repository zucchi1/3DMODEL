import React, { useState } from 'react';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [ellipseInfo, setEllipseInfo] = useState(null);

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // 画像データ（base64）とJSON情報を取得
      setImageUrl(`data:image/png;base64,${data.image}`);
      setEllipseInfo(data.ellipses);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-white rounded shadow-md w-full max-w-2xl">
      <div className="flex-1">
          <input
            type="file"
            accept="image/png, image/jpeg"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-700 border border-gray-300 rounded cursor-pointer focus:outline-none"
          />
          <button
            onClick={handleUpload}
            className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition w-full"
          >
            Upload
          </button>
        </div>
        <div className="w-full flex flex-row space-x-4">
        {imageUrl && (
          <div className="flex-1 text-center">
            <h2 className="text-lg font-semibold mb-2">画像:</h2>
            <img
              src={imageUrl}
              alt="Uploaded"
              className="mt-4 max-w-full h-auto rounded border"
            />
          </div>
        )}
        {ellipseInfo && (
          <div className="flex-1 text-left overflow-x-auto max-h-96">
            <h2 className="text-lg font-semibold mb-2">楕円情報(JSON):</h2>
            <pre className="bg-gray-100 p-2 rounded text-xs">
              {JSON.stringify(ellipseInfo, null, 2)}
            </pre>
          </div>
        )}
      </div>
    </div>
  );
}

export default ImageUpload;