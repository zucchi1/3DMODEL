import React, { useState } from 'react';
import Select from 'react-select';

function ModelSelecter({ RightGlbPath, setRightGlbPath }) {
    const [selectedOption, setSelectedOption] = useState(null);

    const handleModelChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const handleLoadModel = () => {
        if (selectedOption) {
            setRightGlbPath(selectedOption.value);
        }
    };

    const options = [
        { value: 'plate1', label: 'plate1' },
        { value: 'model1', label: 'model1' },
        { value: 'model7', label: 'model7' },
        // Add more options as needed
    ];

    return (
        <div>
            <Select
                value={selectedOption}
                onChange={handleModelChange}
                options={options}
                placeholder="Select a model"
            />
            <button onClick={handleLoadModel}>Load Model</button>
        </div>
    );
}

export default ModelSelecter;