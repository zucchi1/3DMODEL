import React from 'react';
import { Link } from 'react-router-dom';  // Linkを使ってページ遷移

function Home() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-3xl font-bold mb-4">Welcome to the 3D Viewer</h1>
      <Link to="/viewer">
        <button className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-700">
          次へ進む
        </button>
      </Link>
    </div>
  );
}

export default Home;
