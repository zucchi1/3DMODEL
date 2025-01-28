import React, { useState } from 'react';
import Select from 'react-select';

function ModelSelecter({ RightGlbPath,setRightGlbPath }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleModelChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const handleLoadModel = () => {
        if (selectedOption) {
            console.log("changed");
            setRightGlbPath(selectedOption.value);
            console.log("changed model"+RightGlbPath);
        }
    };

    const options = [
        { value: 'plate1', label: 'plate1' },
        { value: 'model', label: 'model/正解のモデル' },
        { value: 'model1', label: 'model1/皿を丸く描いてしまう誤り' },
        { value: 'model2', label: 'model2/皿を大きく描いてしまう誤り' },
        { value: 'model4', label: 'model4/グラスの上部を丸く描いてしまう誤り/断面間の誤り' },
        { value: 'model7', label: 'model7/グラスを傾けて描く誤り' },
        // Add more options as needed
    ];

    return (
        <div>
            <Select
                value={selectedOption}
                onChange={handleModelChange}
                options={options}
                placeholder="Select a model　　　　　　　　　"
            />
            <button onClick={handleLoadModel}
            className="bg-gray-200 text-gray px-4 py-2 rounded shadow-md hover:bg-gray-100">Load Model</button>
        </div>
    );
}

export default ModelSelecter;