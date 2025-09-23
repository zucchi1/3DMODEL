import React, { useState } from 'react';
import CompareImages from '../utils/compareImage';
import ShowEllipseInfo from '../utils/showEllipseInfo';
function base64ToBlob(base64) {
  const arr = base64.split(',');
  const mime = arr[0].match(/:(.*?);/)[1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while(n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], {type: mime});
}

function ImageUpload() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  const [ellipseInfo, setEllipseInfo] = useState(null);
  const [phase, setPhase] = useState(0); //0: アップロード前, 1: 二値化前, 2: アップロード後

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    const formData = new FormData();
    formData.append('file', selectedFile);
    setPhase(1); // 二値化前の状態に設定

    try {
      const response = await fetch('http://localhost:5000/binary', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      // 画像データ（base64）とJSON情報を取得
      setImageUrl(`data:image/png;base64,${data.image1}`);
      setImageUrl2(`data:image/png;base64,${data.image2}`);
    } catch (error) {
      console.error('Error:', error);
    }
  };

const handleUpload2 = async (selected) => {
    // 選択された画像のURLとファイル名を決定
    const base64 = selected === 1 ? imageUrl : imageUrl2;
    const filename = selected === 1 ? 'image1.png' : 'image2.png';
    const blob = base64ToBlob(base64);
    const formData = new FormData();
    formData.append('file', blob, filename);
    setPhase(2); // 二値化後の状態に設定

    try {
      const response = await fetch('http://localhost:5000/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      setImageUrl(`data:image/png;base64,${data.image}`);
      setEllipseInfo(data.ellipses);
    } catch (error) {
      console.error('Error:', error);
    }
};

// 楕円選択状態
const [checkedEllipse, setCheckedEllipse] = useState([]);

// 選択した楕円のみを表示ボタン押下時の処理
const handleChecked = async () => {
  // checkedEllipseは [key, value] の配列
  const selectedEllipses = checkedEllipse.map(([key, value]) => value.contour_index);
  const selectedInfos = Object.values(ellipseInfo).filter(
    info => selectedEllipses.includes(info.contour_index)
  );
  try {
    const response = await fetch('http://localhost:5000/fixEllipse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ ellipses: selectedInfos }),
    });
    if (!response.ok) {
      throw new Error('Network response was not ok');
    }
    const data = await response.json();
    // 必要に応じてデータを処理
    console.log('サーバーからの応答:', data);
    // 例: 画像更新や楕円情報更新など
    if (data.image) setImageUrl(`data:image/png;base64,${data.image}`);
    //if (data.ellipses) setEllipseInfo(data.ellipses);
  } catch (error) {
    console.error('Error:', error);
  }
}
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
        {phase === 1 ? (
          <CompareImages imageUrl={imageUrl} imageUrl2={imageUrl2} onJudge={handleUpload2} />
        ) : phase === 2 ? (
            <ShowEllipseInfo
              ellipseInfo={ellipseInfo}
              imageUrl={imageUrl}
              checkedEllipse={checkedEllipse}
              setCheckedEllipse={setCheckedEllipse}
              handleChecked={handleChecked}
            />
          ):(
          <div className="text-center text-gray-500">
            <p>無効な操作</p>
          </div>
          )
        }
    </div>
  );
}

export default ImageUpload;