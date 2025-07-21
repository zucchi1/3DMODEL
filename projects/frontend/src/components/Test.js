import React, { useEffect, useState, useCallback } from 'react';
import { checkBackend, BackendStatus } from '../utils/checkBackend';

function Test() {
    const [backendAlive, setBackendAlive] = useState(null);
    const [sum, setSum] = useState(null);

    const handleCheckBackend = useCallback(() => {
        checkBackend(setBackendAlive);
    }, []);

  useEffect(() => {
    handleCheckBackend();
    // 例: 5秒ごとに自動チェックしたい場合は下記コメントアウトを外す
    // const intervalId = setInterval(handleCheckBackend, 5000);
    // return () => clearInterval(intervalId);
  }, [handleCheckBackend]);

  const sendBackend = async () => {
    const inputA = document.getElementById('inputA').value;
    const inputB = document.getElementById('inputB').value;
    //バックエンドにa,bを送信して、合計を取得し、sumにセット
    try {
        const response = await fetch('http://localhost:5000/test', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ a: inputA, b: inputB })
        });

        if (response.ok) {
            const data = await response.json();
            setSum(data.sum);
        } else {
            console.error('Error fetching sum:', response.statusText);
        }
    } catch (error) {
        console.error('Error fetching sum:', error);
    }
  };


  return (
    <div className="flex justify-center items-center h-screen flex-col space-y-4">
        <h1 className="text-3xl font-bold mb-4">Test Page</h1>
        <form className="flex flex-col items-center space-y-4">
            <input
                type="number"
                placeholder="Aの値"
                id ="inputA"
                name="inputA"
                className="p-2 border border-gray-300 rounded w-full max-w-xs"
            />
            <input
                type="number"
                placeholder="Bの値"
                id ="inputB"
                name="inputB"
                className="p-2 border border-gray-300 rounded w-full max-w-xs"
            />
            <button
                type="button"
                onClick={sendBackend}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
                Click Me
            </button>
        </form>
        <p className="text-lg">{sum}</p>
      <BackendStatus backendAlive={backendAlive} onCheck={handleCheckBackend} />
    </div>
    );
}

export default Test;