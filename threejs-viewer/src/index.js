import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';  // 修正されたCSSパス
import App from './App';  // メインアプリケーション
import Home from './components/Home';  // HOME画面
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* HOME画面 */}
        <Route path="/viewer" element={<App />} />  {/* 3Dモデル描画画面 */}
      </Routes>
    </Router>
  </React.StrictMode>
);
