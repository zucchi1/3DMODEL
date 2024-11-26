import React from 'react';
import ReactDOM from 'react-dom/client';
import './css/index.css';  // 修正されたCSSパス
import MainApp from './components/MainApp';  // メインアプリケーション
import Home from './components/Home';  // HOME画面
import Correct from './components/Correct';  // HOME画面
import Suggest from './components/Suggest';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />  {/* HOME画面 */}
        <Route path="/viewer" element={<MainApp />} />  {/* 3Dモデル描画画面 */}
        <Route path="/correction" element={<Correct />} />  {/* 誤り修正画面 */}
        <Route path="/suggest" element={<Suggest />} />  {/* 誤り示唆画面 */}
      </Routes>
    </Router>
  </React.StrictMode>
);
