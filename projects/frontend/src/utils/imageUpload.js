import React, { useState } from 'react';

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');

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

      const data = await response.blob();
      const imageUrl = URL.createObjectURL(data);
      setImageUrl(imageUrl);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <div className="flex flex-col items-center space-y-4 p-4 bg-white rounded shadow-md w-full max-w-xs">
      <input
        type="file"
        accept="image/png, image/jpeg" // 画像ファイルのみを受け入れる
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-700 border border-gray-300 rounded cursor-pointer focus:outline-none"
      />
      <button
        onClick={handleUpload}
        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Upload
      </button>
      {imageUrl && (
        <img
          src={imageUrl}
          alt="Uploaded"
          className="mt-4 max-w-full h-auto rounded border"
        />
      )}
    </div>
  );
}

export default ImageUpload;