import React from 'react';
import ToUpdateButton from '../components/buttons/ToUpdateButton'; 

function ShowEllipseInfo({ ellipseInfo, imageUrl, checkedEllipse, setCheckedEllipse, handleChecked }) {
    // 中心座標を「x: ..., y: ...」形式で返す関数
    const formatCenter = (center) => {
        if (Array.isArray(center) && center.length === 2) {
            return `x: ${center[0].toFixed(2)}, y: ${center[1].toFixed(2)}`;
        } else if (Array.isArray(center)) {
            return center.map((v, i) => `#${i}: ${typeof v === 'number' ? v.toFixed(2) : v}`).join(', ');
        }
        return center;
    };
  if (!ellipseInfo) return null;
  return (
    <div className="w-full flex flex-row space-x-4">
        <div className="basis-3/10 text-center">
            <h2 className="text-lg font-semibold mb-2">画像:</h2>
            <img
                src={imageUrl}
                alt="Uploaded"
                className="mt-4 max-w-full h-auto rounded border"
            />
        </div>
        <div className="basis-7/10 text-left overflow-x-auto max-h-96">
                <h2 className="text-lg font-semibold mb-2">楕円情報(JSON):</h2>
                <table className="bg-gray-100 p-2 rounded text-xs">
                    <thead>
                        <tr>
                            <th className="px-2 py-1 border"></th>
                            <th className="px-2 py-1 border">No.</th>
                            <th className="px-2 py-1 border">中心座標</th>
                            <th className="px-2 py-1 border">長軸</th>
                            <th className="px-2 py-1 border">短軸</th>
                            <th className="px-2 py-1 border">ラベル</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Object.entries(ellipseInfo).map(([key, value]) => {
                            const center = formatCenter(value.center);
                            const major = typeof value.major_axis === 'number' ? value.major_axis.toFixed(2) : value.major_axis;
                            const minor = typeof value.minor_axis === 'number' ? value.minor_axis.toFixed(2) : value.minor_axis;
                            return (
                            <tr key={key}>
                                <td className="px-2 py-1 border">
                                    <input
                                        type="checkbox"
                                        checked={checkedEllipse.some(([k]) => k === key)}
                                        onChange={e => {
                                            if (e.target.checked) {
                                                setCheckedEllipse(prev => [...prev, [key, value]]);
                                            } else {
                                                setCheckedEllipse(prev => prev.filter(([k]) => k !== key));
                                            }
                                        }}
                                    />
                                </td>
                                <td className="px-2 py-1 border">{value.contour_index}</td>
                                <td className="px-2 py-1 border">{center}</td>
                                <td className="px-2 py-1 border">{major}</td>
                                <td className="px-2 py-1 border">{minor}</td>
                                <td className="px-2 py-1 border">{value.label}</td>
                            </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="w-full flex flex-row space-x-4">
                <button 
                    className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={handleChecked}
                    >選択した楕円のみを表示
                </button>
                <ToUpdateButton />
                </div>
            </div>
    </div>
  );
}

export default ShowEllipseInfo;